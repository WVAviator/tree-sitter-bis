# CHG and @LCH — Locate and Change

## Overview

Finds and replaces character strings anywhere within a report, creating a result containing both changed and unchanged lines. Use the `O` option to create a result containing only changed lines.

Available as both an interactive **control line function** (`CHG`) and a **run statement** (`@LCH`).

---

## Syntax

**Control line (interactive):**
```
CHG [report f];/tgtstr/replstr/[o]
```

**Statement (in a run):**
```
@LCH,c,d,r[,l,lab] o cc tgtstr/replstr [,vlines,vrpt] .
```

### Control Line Parameters

| Field | Description |
|-------|-------------|
| `report` | Report in which to locate and change data. See *Specifying Reports or Drawers to Process*. |
| `f` | Report format to search in (allows searching fields beyond column 80 if not already on display). |
| `;` | Required separator character. |
| `/` | Delimiter identifying character string boundaries. Can be any character except those used in the target/replacement strings or a caret (`^`). |
| `tgtstr` | Character string to locate. |
| `replstr` | Replacement string. Does not need to be the same length as the target string. |
| `o` | Options field. See [Options](#options). When using the control line, the `A`, `F`, and `M` options are always assumed. |

### Statement Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `c,d,r` | Required | Report in which to locate and change data. See *Specifying Reports or Drawers to Process*. |
| `l` | Optional | Line number at which to start the search. If a heading line is specified, the scan begins with the first data line. |
| `lab` | Optional | Label to branch to if no matches are found. |
| `o` | Required | Options field. Use `A`, `F`, and `M` to change strings regardless of line type. See [Options](#options). |
| `cc` | Required | Column-character positions or field names to search. |
| `tgtstr` | Required | Character string to locate. |
| `replstr` | Required | Replacement string. Does not need to be the same length as the target string. If this field contains `''`, a single space is assumed. The following two statements are equivalent: `@lch,-0 afm 1-80 TAB$/''` and `@lch,-0 afm 1-80 TAB$/' '` |
| `,` | — | Skipped subfield, not currently used. |
| `vlines` | Optional | Variable to capture the number of lines found containing the target string. |
| `vrpt` | Optional | Variable to capture the report number where the target string is located. |

---

## Options

| Option | Description |
|--------|-------------|
| `A` | Processes all line types, ignoring column 1 of the function mask (or the first character of `tgtstr`). Changes the line type of all lines with matches to the first character of the replacement string. Always assumed when using the control line. |
| `C` | Distinguishes between uppercase and lowercase letters. *(2200: applies only to full character set (FCS) reports.)* |
| `F` | Processes all line types and locates/changes the entire string. Does not locate strings starting in column 1. *(Windows/Linux/UNIX: uses the first column under the function mask as part of the target and replacement strings.)* Always assumed when using the control line. |
| `G` | Searches backwards through the report. *(2200 only)* |
| `M` | Designates the first character of the target string as the line type designator. Used primarily in runs to locate specific line types. Always assumed when using the control line. |
| `O` | Creates a result containing only the lines where strings were changed. |
| `OU` | Creates an update result of changed lines, enabling [`@DEL`](DEL.md), [`@EXT`](EXT.md), or [`@UPD`](UPD.md) operations on those lines. |
| `S` | Starts the search at the first line on the screen. Not available with the `@LCH` statement. |
| `Sx` | Starts the search at line `x` (positive number). |
| `Sx-y` | Searches lines `x` through `y`. |
| `Sx,n` | Starts at line `x` and searches `n` lines. |
| `Tx` | Designates character `x` as a wildcard in `tgtstr`. Default wildcard = blank space. Do not use the wildcard as the first character in the string. *(2200: if the replacement string is shorter than the target string, the far-right characters are filled with the transparent character.)* |

---

## Behavior

### Interactive (Control Line)

- **Found:** A result is displayed containing all lines of the report, with the target string replaced at each occurrence. With `O`, only changed lines are shown; with `OU`, an update result is created.
- If the replacement string is **longer** than the target, remaining characters shift right on changed lines. If **shorter**, characters shift left.
- **Not found:** An unchanged result is displayed.

### Statement (`@LCH`)

- **Found:** Creates a `-0` result with the target string replaced by the replacement string wherever found. Loads `vlines` and `vrpt` as specified. With `O`, only changed lines are included; with `OU`, an update result is created.
- **Not found:** Loads `vlines` and `vrpt` with `0` and branches to `lab`.

---

## Procedures

### Filling in the Function Mask

1. On the first line under the mask, type the line type to process in column 1, followed by the target string.
2. Press **Erase to End of Line**.
3. Move the cursor to the next line.
4. Type the line type to process in column 1, followed by the replacement string.
5. Press **Erase to End of Line**.
6. Move the cursor to the next line and transmit.

To change a string in a specific field only, erase all asterisks in the function mask except those in the target field.

For a quick freeform find-and-replace with a report on display:
```
CHG ;/tgtstr/replstr/
```

---

## Examples

### Locating and Changing a String

Changes all occurrences of `blackbox` to `greenbox` in `report2b`.

Control line:
```
chg 2b0;/blackbox/greenbox/
```
Equivalent statement:
```
@lch,'report2b' afm 2-79 blackbox/greenbox ,<lines>i4 .
```

### Using the Control Line

Changes all occurrences of `ip` to `sh` in report `2b0`.

Control line:
```
chg 2b0;/ip/sh/
```
Equivalent statement:
```
@lch,'report2b' afm 2-79 ip/sh ,<lines>i4 .
```

### Starting at a Specific Line

Changes all occurrences of `BLACK` to `WHITE` starting at line 20.

Control line:
```
chg ;/BLACK/WHITE/s20
```
Equivalent statement:
```
@lch,'report2b' afms20 2-79 BLACK/WHITE ,<lines>i4 .
```

### Using Space as a Wildcard

Changes the string `a o` (letter A, two spaces, letter O) to `abcd`. Because spaces are the default wildcard, this matches both `AMCO` and `ARCO` in the report.

Control line:
```
chg 2b0;/a o/abcd/
```
Equivalent statement:
```
@lch,'report2b' afm 2-79 'a o'/abcd ,<lines>i4 .
```
