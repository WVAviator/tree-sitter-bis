# LOC and @LOC — Locate

## Overview

The `LOC` function finds a character string anywhere within a report and displays the report starting at the first occurrence. Press Resume to see additional occurrences.

The `@LOC` statement searches for a character string within a report and loads variables with information about the located data.

---

## Control Line Syntax

```
LOC [report f;/tgtstr/o]
LOC tgtstr
```

### Parameters

| Field | Description |
|-------|-------------|
| `report` | Report to process. See *Specifying Reports or Drawers to Process* for details. |
| `f` | Report format in which to search — enables searching fields beyond column 80 if those columns are not already on display. |
| `;` | Required character when using the full format. |
| `/` | Delimiter identifying the boundaries of the target string. Can be any character except those used in the target string or a caret (`^`). See [Using Hyphen as Delimiter](#using-hyphen-as-delimiter). |
| `tgtstr` | Character string to locate. |
| `o` | Options field. See [Options](#options). When using the control line, the `A`, `F`, and `M` options are always assumed. |

For quick string searches, use the simplified format:
```
LOC tgtstr
```

When the target string resembles a report identifier (e.g. `2b0`), or if a named report exists whose name matches the string followed by `;`, use:
```
LOC ;/tgtstr/
```

*(Windows / Linux / UNIX)* For negative numbers use `LOC ;/-tgtstr/`; for strings preceded by `+` that resemble a RID, use `LOC ;/+tgtstr/`.

---

## Statement Syntax

```
@LOC,c,d,r[,l,lab] o cc tgtstr [vcol,vlno,vrpt,vcab,vdrw] .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `c,d,r` | Required | Report to search. See *Specifying Reports or Drawers to Process* for details. |
| `l` | Optional | Line number at which to begin the search. Processes data lines only — if a heading line is specified, the scan begins at the first data line. |
| `lab` | Optional | Label to branch to if no finds are made. Use `LIN1` here to continue on the next line without specifying a label number. |
| `o` | Required | Options field. See [Options](#options). Use `A`, `F`, and `M` to locate strings regardless of line type. |
| `cc` | Required | Column-character positions or field names to search. |
| `tgtstr` | Required | Character string to locate. |
| `vcol` | Optional | Variable to capture the column number preceding the column where the find starts. |
| `vlno` | Optional | Variable to capture the line number where the find is made. |
| `vrpt` | Optional | Variable to capture the report number where the find is made. |
| `vcab` | Optional | Variable to capture the cabinet number where the find is made. |
| `vdrw` | Optional | Variable to capture the drawer number where the find is made. |

---

## Options

| Option | Platform | Description |
|--------|----------|-------------|
| `A` | All | Processes all line types, ignoring the character in column 1 of the function mask (or the first character of `tgtstr`). For example, if the target string is `\|abc`, the `A` option looks for `abc` on all line types. Always assumed when using the control line. |
| `B[n]` | All | Includes `n` (1–9) lines above the data match when the report is displayed. Do not use with the `O` option. Not applicable to the `@LOC` statement. Default: `1`. |
| `C` | All *(2200: FCS reports only)* | Distinguishes between uppercase and lowercase letters. |
| `F` | All | Processes all line types and includes the character in column 1 of the function mask (or the first character of `tgtstr`) in the target. Always assumed when using the control line. |
| `G` | 2200 only | Searches backwards through the report. If no starting line is specified, the search starts at the last line and ends at the first. |
| `M` | All | Designates the first character of the target string as the line type designator. Use with `F` to find the string on all line types, even when it starts in column 1. Always assumed when using the control line. |
| `O` | All | Creates a result containing each line where the string occurs. When used with `@LOC`, loads variables as follows: `vcol` = `0`; `vlno` = number of matching lines; `vrpt`, `vcab`, `vdrw` = report, cabinet, and drawer of the find. |
| `OU` | All | Creates an update result of each matching line, enabling [`@DEL`](DEL.md) (Delete), [`@EXT`](EXT.md) (Extract), or [`@UPD`](UPD.md) (Update) operations on the found lines. Can only be used with reports, not results. |
| `S` | Function only | Starts the search at the first line on screen. Not available for the `@LOC` statement. |
| `Sx` | All | Starts the search at line `x` (positive number). |
| `Sx-y` | All | Searches lines `x` through `y`. If using `G`, `x` must be greater than `y`. |
| `Sx,n` | All | Starts the search at line `x` and searches `n` lines. |
| `Tx` | All | Specifies `x` as the wildcard character. Default wildcard: blank. Do not use the wildcard as the first character in the string. Useful for locating spaces — see [Locating Strings Containing Spaces](#locating-strings-containing-spaces). |
| `U` | Function only | Resumes the search beyond the lines currently on display, rather than from the next line. Not applicable to the `@LOC` statement. |

---

## Outcome

### Manual Function

- **Found:** The report is displayed starting at the first data line containing the string. If `O` or `OU` is used, a result or update result is displayed instead. Press Resume to continue searching.
- **Not found:** A system message is displayed.

### @LOC Statement

- **Found:** Variables are loaded as described in the parameter table. The previous `-0` result is left intact unless `O` or `OU` is used.
- **Not found:** All variables are loaded with `0` and control passes to the specified label.

---

## Procedures

To fill in the function mask:
1. On the first line under the mask, type the line type to process in the first column, followed by the target string.
2. Press the Erase to End of Line key.
3. Move the cursor to the next line and transmit.

To find a string in a specific field, erase all asterisks in the function mask except those in the field you want to search.

---

## Examples

### Locating a String in the Current Report

Locate the string `arco` in the current report.

```
loc arco
```

Equivalent statement:
```
@loc,'report2b',,99 afm 2-79 arco <col>i2,<line>i4 .
```

---

### Locating Strings Starting at a Specific Line

Locate `green` in report `2B0`, starting at line 30.

```
loc 2b0;/green/s30
```

Equivalent statements:
```
@loc,'report2b',,99 afms30 2-79 green <col>i2,<line>i4 .
```
or:
```
@loc,'report2b',30,99 afm 2-79 green <col>i2,<line>i4 .
```

---

### Using Hyphen as Delimiter

Locate all occurrences of the string `89/11`, using `-` as the delimiter instead of `/` (since `/` appears in the target string). The `O` option creates a result containing all finds.

```
loc ;-89/11-o
```

Equivalent statement:
```
@loc,'report3a',,99 afmo 2-79 '89/11' .
```

---

### Locating Strings Using a Space as a Wildcard

Locate the string `a o` (A, two spaces, O) in report `2B0`. Since spaces are wildcards by default, both `AMCO` and `ARCO` are valid matches.

```
loc 2b0;/a o/
```

Equivalent statement:
```
@loc,'report2b',,99 afm 2-79 'a o' <col>i2,<line>i4 .
```

---

### Locating Strings Containing Spaces

Locate all dates in `DATE1$` format (`YYMMDD`) for the year 1996 with any month but no day (spaces in the `DD` portion). The `T$` option changes the wildcard to `$`, allowing spaces to be matched literally.

```
loc ;/96$$ /t$
```

Equivalent statement:
```
@loc,'report3a',,99 afmt$ 2-79 '93$$ ' <col>i2,<line>i4 .
```

---

### Locating Strings Containing Negative Numbers

*(Windows / Linux / UNIX)* Locate the string `-4` in report `2B0`.

```
loc ;/-4/
```

Equivalent statement:
```
@loc,'report2b',,99 afm 2-79 '-4' <col>i2,<line>i4 .
```
