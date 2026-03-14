# @LCV — Locate and Change Variable

## Overview

Finds and optionally replaces data within a variable. With `@LCV`, you can:

- Locate a string
- Change a string
- Count the number of occurrences
- Compare two variables literally

`@LCV` is to variables what [`@LOC`](LOC.md) (Locate) or [`@LCH`](LCH.md) (Locate and Change) are to data in reports, and is more efficient than a comparable `IF`/`GTO` sequence.

---

## Syntax

```
@LCV[,lab] o v tgtstr[/replstr vpos,voccs] .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `lab` | Optional | Label to continue execution at when no finds are made, or when `n` occurrences are not found (see `Bn` option). Use the `N` option to instead branch to the label when a find *is* made. Use `LIN1` here to continue on the next line without specifying a label number. |
| `o` | Required | Option controlling how the variable is searched. See [Options](#options). |
| `v` | Required | Variable to search. Any type is accepted; substrings and array members are supported. |
| `tgtstr` | Required | The target string to locate within the variable. Can be a variable, literal, constant, or reserved word. The transparent character acts as a wildcard (default: space). Use the `Tx` option to change the transparent character when you need to locate spaces. |
| `replstr` | Optional | Replacement data (0 to maximum line length) to substitute for the target string. Omitting this performs a locate only. To remove the target string entirely, specify nothing after the `/` delimiter (e.g. `target/`). |
| `vpos` | Optional | Variable to capture the character position of the first (or nth, with `Bn`) occurrence of the target string within the variable. |
| `voccs` | Optional | Variable to capture the total number of occurrences of the target string. Useful when using the `B` option for counting. |

---

## Options

| Option | Description |
|--------|-------------|
| `Bn` | Locates only the nth occurrence of the target string. `vpos` captures the character position of the nth occurrence. When used with a replacement string, changes only the nth occurrence; `vpos` contains the position of the first changed occurrence. |
| `Bn-x` | Locates and changes from occurrence `n` through `n+x` occurrences. `n` is the first occurrence to process; `x` is the number of subsequent occurrences to process. `vpos` captures the position of the first changed occurrence. |
| `C` | Distinguishes between uppercase and lowercase letters (case-sensitive matching). |
| `Lx` | Locates a specific line type where `x` is the line type designator. The first character of the variable must match `x` or the statement stops processing. |
| `M` | Uses the transparent character (see `Tx`) as a mask to inhibit replacements. Characters in the variable at positions corresponding to transparent characters in the target string are not replaced. |
| `N` | Branches to the specified label when a find *is* made, rather than when no finds are made. |
| `Tx` | Specifies the character to use as the transparent (wildcard) character. Also used as a mask character when `M` is specified. Default: space character. |

---

## Examples

### Locating the Second Occurrence of an Item

Variable `v1` contains:
```
doghorsecowpigbirdcatcatcatcatmouse
               ^                  ^
            col 15             col 34
```

Locate the second occurrence of `cat` in `v1` starting at column 15 for 20 characters:

```
@lcv,001 b2 v1(15-20) cat v2i6 .
```

| Part | Description |
|------|-------------|
| `001` | Goes to label 1 if fewer than two occurrences of `cat` are found |
| `b2` | Bails out on the second occurrence of `cat` |
| `v1(15-20)` | Scans `v1` starting at column 15 for 20 characters |
| `cat` | Target string |
| `v2i6` | Loads `v2` with the character position where the second occurrence begins |

**Result:** `v2` contains `22` (the column in `v1` where the second `cat` was found).

---

### Counting Occurrences of an Item

Variable `v1` contains:
```
CATdogCATDOGCATDogCATDOGCATdog
```

Count the number of times `dog` occurs in `v1`:

```
@lcv b99 v1 dog ,v3i6 .
```

| Part | Description |
|------|-------------|
| `b99` | Bails out on the 99th occurrence — set higher than expected count to avoid early exit |
| `v1` | Scans the entire variable |
| `dog` | Target string |
| `v3i6` | Loads `v3` with the number of occurrences found |

**Result:** `v3` contains `5`.

---

### Changing a Character String

Variable `v1` contains:
```
*CATDOGCATDOGCATDOGCATDOGCATDOG
```

Change the 2nd, 3rd, and 4th occurrences of `DOG` to `cat`:

```
@lcv l*b2-3 v1 DOG/cat v2i6 .
```

| Part | Description |
|------|-------------|
| `l*` | Only makes the change if the first character of `v1` is `*` (the line type indicator) |
| `b2-3` | Starts at the second occurrence and processes three occurrences |
| `v1` | Scans `v1` |
| `DOG/cat` | Replaces target string `DOG` with `cat` |
| `v2i6` | Loads `v2` with the position of the first changed occurrence |

**Result:** `v2` equals `11` and `v1` contains:
```
*CATDOGCATcatCATcatCATcatCATDOG
```

---

### Comparing Strings

`<string1>` contains `abc123`, `<string2>` contains `abc+++`.

```
@lcv,001 '' <string1> <string2> .
```

| Part | Description |
|------|-------------|
| `001` | Goes to label 1 if `<string1>` is not equal to `<string2>` |
| `''` | No options |
| `<string1> <string2>` | Compares the two variables |

**Result:** Since `<string1>` does not equal `<string2>`, the run branches to label 1. With the `N` option, the branch would only occur if the variables *are* equal.

---

### Masking Transparent Characters

Variable `v1` contains:
```
blackbox1*blackcan1*blackbag1*blackcup1
```

Locate each occurrence of `black` followed by any three characters, then `1`. Replace `black` → `green` and `1` → `2`, leaving the three middle characters unchanged:

```
@lcv m v1 'black 1'/'green 2' v2i6,v3i6 .
```

| Part | Description |
|------|-------------|
| `m` | Specifies the mask option — transparent characters in the replacement string are not inserted into the variable |
| `v1` | Scans `v1` |
| `'black 1'` | Target string — spaces act as wildcards matching any character |
| `'green 2'` | Replacement string — spaces in this string are masked and will not overwrite the matched characters |
| `v2i6` | Loads `v2` with the column of the first occurrence changed |
| `v3i6` | Loads `v3` with the total number of occurrences changed |

**Result:** `v1` contains:
```
greenbox2*greencan2*greenbag2*greencup2
```

---

### Using an Unknown Trailing Substring

Variable `v1` contains:
```
feature010101
```

Locate the second occurrence of `01` within the last 6 characters of `v1`:

```
@lcv,001 b2 v1(0-6) 01 v2i3 .
```

| Part | Description |
|------|-------------|
| `001` | Goes to label 1 if no finds are made |
| `b2` | Bails out after the second occurrence |
| `v1(0-6)` | Scans the last 6 characters of `v1` — the `0` starting position indicates the starting character position is unknown |
| `01` | Target string |
| `v2i3` | Loads `v2` with the character position of the second occurrence within the substring |

**Result:** `v2` contains `10` (the second `01` begins at column 10 of `v1`).

---

### Using a Known Trailing Substring

Variable `<money>` contains:
```
$$$dollars
```

Scan from column 4 through the end of the field and replace all occurrences of `dollars` with `yen`:

```
@lcv,001 '' <money>(4-0) dollars/yen .
```

| Part | Description |
|------|-------------|
| `001` | Goes to label 1 if no finds are made |
| `''` | No options |
| `<money>(4-0)` | Scans `<money>` from column 4 through the end — the `4-0` specifies a known start with the `0` indicating end of field |
| `dollars/yen` | Replaces `dollars` with `yen` |
