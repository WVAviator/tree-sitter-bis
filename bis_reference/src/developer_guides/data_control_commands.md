# Control Commands for Transferring Data

## Overview

Data control commands let you control the format of data in reports you transfer to the host. Use these commands with the [`@FIL`](../statements/FIL.md) (Create File) statement when you do not want files in Business Information Server format, or with the [`@STR`](../statements/STR.md) (Start) statement to control data sent to the host.

> **Note:** Since the transferred file is not in BIS format, tab characters in the report become spaces in the file. To preserve tab characters, use `$TABA$` to translate them to another character first, then translate them back later.

Commands are entered beginning in **column 1** on any line in the report being transferred. They take effect from that point onward. The line containing the control command does not appear in the transferred output.

---

## Command Format

Except for `$INCL$`, `$TABA$`, and `$TRNA$`, the format of each command is the command keyword itself.

---

## Data Control Commands

### `$CLRT$`

Clears any character and tab code translation initialized by `$TRNA$` or `$TABA$`. Restores the default behavior of translating tab characters to spaces.

---

### `$DATA$`

Suspends data translation by the `$TRNA$` command and uses the original data. Does not affect `$TABA$` translations.

Tab character behavior under `$DATA$`:

| Prior Command | Without `$DATA$` | With `$DATA$` |
|---------------|-----------------|---------------|
| *(none)* | Space | Tab |
| `$TABA$ 'x'` | `x` | `x` |
| `$CLRT$` | Space | Tab |

*(x = any character)*

---

### `$DCML$`

Deletes all asterisk lines.

---

### `$DFFL$`

Deletes all period lines.

---

### `$ICML$`

Includes all asterisk lines. Use after a `$DCML$` command to resume including asterisk lines.

---

### `$IFFL$`

Includes all period-type lines. Use after a `$DFFL$` command to resume including period lines.

---

### `$INCL$`

Transfers reports from a specified drawer. You can nest `$INCL$` commands only one level deep — an included report may itself contain a `$INCL$` command, but that report cannot.

```
$INCL$ [H] DnnnnR{n,n,n-n}
```
or
```
$INCL$ [H] Dnnnn A
```

| Field | Description |
|-------|-------------|
| `H` | Optional. Include report headings. |
| `Dnnnn` | The letter `D` followed by the drawer number. Use the [`@LZR`](../statements/LZR.md) (Line Zero) command to obtain the drawer number. |
| `Rn` | The letter `R` followed by report number(s). Separate individual reports with commas; use a hyphen for a range. |
| `A` | Include all reports in the drawer. |

**Example:** `$INCL$ h d2 r3-6,11,40-53` includes reports 3–6, 11, and 40–53 from drawer 2, with headings.

---

### `$TABA$`

Translates tab characters to a specified character.

```
$TABA$ {nnn | 'y'}
```

| Field | Description |
|-------|-------------|
| `nnn` | ASCII octal code of the target character. See [Character Sets and Sorting Orders](character_sets.md). |
| `'y'` | The target character, enclosed in apostrophes. |

**Example:** `$TABA$ '&'` translates tab characters to ampersands (`&`).

---

### `$TABC$`

*(2200 only)*

Translates tab characters to the character represented by a Fieldata code.

```
$TABC$ nn
```

| Field | Description |
|-------|-------------|
| `nn` | Fieldata code of the target character. See [Character Sets and Sorting Orders](character_sets.md). |

**Example:** `$TABC$ 50` translates tab characters to asterisks.

---

### `$TRAN$`

*(2200 only)*

Translates a character to the character represented by a Fieldata code, or re-establishes translation previously suspended by `$DATA$`.

```
$TRAN$ x,nn
```
or
```
$TRAN$ .
```

| Field | Description |
|-------|-------------|
| `x,nn` | Translates character `x` to the character with Fieldata code `nn`. See [Character Sets and Sorting Orders](character_sets.md). Multiple pairs can be specified. |
| ` . ` | Space-period-space (or blank to end of line). Re-establishes translation suspended by `$DATA$`. |

**Example:** `$TRAN$ &,05 $,03` translates `&` to space (Fieldata `05`) and `$` to `#` (Fieldata `03`).

---

### `$TRNA$`

Translates characters to specified ASCII characters, or re-establishes translation previously suspended by `$DATA$`.

```
$TRNA$ {x,nnn | x,'y' ...}
```
or
```
$TRNA$ .
```

| Field | Description |
|-------|-------------|
| `x,nnn` | Translates character `x` to the character with ASCII octal code `nnn`. See [Character Sets and Sorting Orders](character_sets.md). |
| `x,'y'` | Translates character `x` to literal character `y`. |
| ` . ` | Space-period-space (or blank to end of line). Re-establishes translation suspended by `$DATA$`. |

Multiple translation pairs can be specified in any combination and order.

**Example:** `$TRNA$ &,040 $,'?'` translates `&` to space (ASCII octal `040`) and `$` to `?`.
