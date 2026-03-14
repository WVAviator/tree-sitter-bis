# @FDR — Find and Read Line

## Overview

Searches for a character string and loads variables with information about the search. Use a [`@RLN`](RLN.md) (Read Line Next) or [`@RDL`](RDL.md) (Read Line) statement afterward to read the line containing the found string.

`@FDR` differs from [`@FND`](FND.md) (Find) in that it can be followed by `@RLN` instead of requiring `@RDL`. It is generally more efficient to use an `@FDR`/`@RLN` combination instead of an `@FND`/`@RLN` combination.

---

## Syntax

```
@FDR,c,d[,r,l,q,lab] o cc ltyp,p [vrpt,vlno,vcab,vdrw] .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `c,d,r` | Required | Report in which to find a line to be read with `@RDL` or `@RLN`. |
| `l` | Optional | Line number at which to start the search. |
| `q` | Optional | Number of lines to search. Default = all lines. |
| `lab` | Optional | Label to branch to if no finds are made. Use `LIN1` to continue on the next line instead of a label number. **Windows Server / Linux / UNIX / Windows Client:** if omitted and no finds are made (or the line or report does not exist), the run fails. **2200:** if omitted and no finds are made, the run continues. |
| `o` | Optional | Options field. See [Options](#options). |
| `cc` | Required | Column-character positions or names of the fields to search. |
| `ltyp` | Required | Line type to search. If using the `A` option, leave this subfield blank but include the comma. |
| `p` | Required | Find parameters. See [Parameters](#parameters). |
| `vrpt` | Optional | Variable to capture the report number where the first find is made. |
| `vlno` | Optional | Variable to capture the line number where the first find is made. |
| `vcab` | Optional | Variable to capture the cabinet number where the first find is made. |
| `vdrw` | Optional | Variable to capture the drawer number where the first find is made. |

---

## Options

| Option | Platform | Description |
|--------|----------|-------------|
| `A` | All | Begins the search on line 2 of the report unless a start line is specified. Processes all line types. |
| `C(S)` | Windows Server / Linux / UNIX / Windows Client | Distinguishes between uppercase and lowercase letters. |
| `C(x)` | 2200 | Alters the find process based on character set order. `C(F)` = full character set (FCS), `C(L)` = limited character set (LCS), `C(S)` = strict comparison (case-sensitive). |
| `F` | All | Finds numeric data regardless of justification or numeric format. Ignored for fields using a `Y` option parameter. |
| `G` | 2200 | Searches backwards through the report. |
| `N` | All | Finds the first data line *not* meeting the search criteria. The target line type still determines which line types are searched. |
| `Rx{-y\|,y}` | All | Scans a range of reports. Examples: `r2,5` (reports 2 and 5), `r2-10` (reports 2 through 10), `r2-10,14` (reports 2 through 10 and 14). |
| `Y[(x)]` | All | Searches for dates in fields defined by the date format parameter line. Optionally specifies the line type of the parameter line (cannot be `R`, defaults to `Y`). |
| `@` | Windows Server / Linux / UNIX / Windows Client | Indicates that `@` characters on the parameter line specify a search for spaces. |
| `@[(x)]` | 2200 | Same as above, with an option to redefine the `@` character using the optional character in parentheses. |
| `/` | All | Searches for the slant (`/`) character. |

---

## Parameters

| Parameter | Description |
|-----------|-------------|
| `/` | Searches for a slant (`/`) character when used with the `/` option. Without the `/` option, a slant in a parameter line shortens that field. |
| `@` | Searches for spaces. Use with the `@` option or results may be unpredictable. Type `@` in columns where you want to search for spaces; use `@` in the first column of a field to find a blank field. |
| `R` | Searches for data within a range. |
| `Y` or `x` | Identifies the line type of the date parameter line. Place a date format in the field being searched. |
| `0`–`20` | Specifies the numeric date format. Alphabetic formats may also be used (e.g. `YYMMDD` in place of `1`). For a complete list, see *Entering Dates and Times in the DC Statement*. |

---

## Outcome

- **If found:** Renames the report where the find was made to `-0` (any previous `-0` result is released) and loads the specified variables with find information.
- **If not found:** Does not create a `-0` result, loads variables with `0`, and branches to the specified label.

---

## Examples

### Basic Find and Read

Search for the string `ip` in the `St Cd` field and read the order number from the found line:

```
@fdr,0,b '' 'stcd' |,ip <report>i6,<line>i6 .
@rln,<line>,099 'order' <ord>i .
```

| Subfield | Description |
|----------|-------------|
| `0,b` | Search drawer `B` in cabinet `0`. |
| `''` | No options. |
| `'stcd'` | Search the St Cd field. |
| `\|` | Process tab lines only. |
| `ip` | Search for the string `ip`. |
| `<report>i6` | Capture the report number where the find is made. |
| `<line>i6` | Capture the line number where the find is made. |
| `rln,<line>,099 'order' <ord>i` | Read the Order Number field on the found line and load `<ord>` with the order number. |

---

### Finding Data Within a Range of Dates

Find data within a date range using the `Y` option and `YYMMDD` alphabetic date format:

```
@fdr,'drawerb' y 2-2,5-6 |,sh,970101/r,sh,101231/y,,YYMMDD .
```
