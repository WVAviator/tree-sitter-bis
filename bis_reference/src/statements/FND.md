# F and @FND — Find

## Overview

Searches for character strings in specified fields in a report or drawer.

- The **`F` manual function** finds and displays the report at the first occurrence. Press Resume to see additional occurrences.
- The **`@FND` statement** searches a report or drawer for data and loads variables with information about the search. Use a [`@RDL`](RDL.md) (Read Line) statement followed by a [`@RLN`](RLN.md) (Read Line Next) statement to read the found lines.

> **Note:** The Search (`S`), Find (`F`), and Binary Find (`BF`) manual functions no longer require a minus sign (`-`) to indicate the report or result currently on display. A minus sign is still accepted.

You can use the Iterative Find (IFND) run to save and reuse Find function masks containing options and parameters and to create `@FND` statements.

---

## Manual Function

```
F {report | drawer} [f]
```

| Field | Description |
|-------|-------------|
| `report` | Report to process. For more details, see *Specifying Reports or Drawers to Process*. |
| `drawer` | Drawer to process. Use to search all reports in a given drawer. For more details, see *Specifying Reports or Drawers to Process*. |
| `f` | Report format in which to search for data. Enables searching fields beyond column 80 if those columns are not already on display. |

---

## Syntax

```
@FND,c,d[,r,l,lab] o cc ltyp,p [vrpt,vlno,vcab,vdrw] .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `c,d,r` | Required | Report or drawer to search. For more details, see *Specifying Reports or Drawers to Process*. |
| `l` | Optional | Line number at which to start the search. |
| `lab` | Optional | Label to branch to if no finds are made, or if the line or report does not exist. If omitted, the run continues. Use `LIN1` to continue on the next line instead of specifying a label number. |
| `o` | Optional | Options field. See [Options](#options). |
| `cc` | Required | Column-character positions or names of the fields to search. |
| `ltyp` | Required | Line type to search. If using the `A` option, leave this subfield blank but include the comma. |
| `p` | Required | Character string to find. See [Parameters](#parameters). |
| `vrpt` | Optional | Variable to capture the report number where the first find was made. |
| `vlno` | Optional | Variable to capture the line number where the first find was made. |
| `vcab` | Optional | Variable to capture the cabinet number where the first find was made. |
| `vdrw` | Optional | Variable to capture the drawer number where the first find was made. |

---

## Options

| Option | Platform | Description |
|--------|----------|-------------|
| `A` | All | Processes all line types. |
| `C(S)` | Windows / Linux / UNIX | Distinguishes between uppercase and lowercase letters. |
| `C(x)` | 2200 | Alters the find process based on character set order. `C(F)` = full character set (FCS), `C(L)` = limited character set (LCS), `C(S)` = strict comparison (case-sensitive). |
| `F` | All | Finds numeric data in report fields regardless of justification or numeric format. Ignored for fields using a `Y` option parameter. |
| `G` | All | Searches backwards through the report. If no starting line is specified, starts at the last line and ends at the first. |
| `N` | All | Finds the first data line *not* meeting the search criteria. The target line type still determines which line types are searched. |
| `Rx-y` | All | Searches a range of reports from report `x` through report `y`. |
| `Rx,y` | All | Searches reports `x` and `y`. |
| `Rx-y,z` | All | Searches reports `x` through `y` and also report `z`. |
| `S` | 2200 | Starts the search at the first line on the screen. Not available for statements. |
| `Y[(x)]` | All | Searches for dates in fields defined by the date format parameter line. Optionally specifies the line type of the parameter line (cannot be `R`, defaults to `Y`). |
| `@` | Windows / Linux / UNIX | Indicates that `@` characters on the parameter line specify a search for spaces. |
| `@[(x)]` | 2200 | Same as above, with an option to redefine the `@` character to another character using the optional character in parentheses. |
| `/` | All | Searches for the slant (`/`) character. |

---

## Parameters

| Parameter | Description |
|-----------|-------------|
| `/` | Searches for a slant (`/`) character when used with the `/` option. Without the `/` option, a slant in a parameter line shortens that field (the partial field is processed). |
| `@` | Searches for spaces. Use with the `@` option or results may be unpredictable. Type `@` in the columns where you want to search for spaces. To find a blank field, type `@` in the first column of the field. |
| `R` | Searches for data within a range. |
| `Y` or `x` | Identifies the line type of the date parameter line. Place a date format in the field being searched. The date parameter line should be placed after all other parameter lines. |
| `0`–`20` *(Windows / Linux / UNIX)* / `0`–`21` *(2200)* | Specifies the numeric date format. Alphabetic date formats may also be used (e.g., `YYMMDD` in place of `1`). For a complete list, see *Entering Dates and Times in the DC Statement*. |

---

## Outcome

### `F` Manual Function

- If data is found, the report is displayed starting at the line where the data is located. Press **Resume** to continue to the next find.
- If the string exists on the same screen as a previous find, that line is not displayed as the next find.
- If data is not found, a system message is displayed.

### `@FND` Statement

- **If found:** Renames the report where the find was made to `-0` (any previous `-0` result is released), and loads the specified variables with find information.
- **If not found:** Does not create a `-0` result, loads variables with `0`, and branches to the specified label.

---

## Guidelines

- To update a single line, using `@FND` followed by [`@WRL`](WRL.md) (Write Line) is more efficient than using [`@SRU`](SRU.md) (Search Update) with [`@TOT`](TOT.md) (Totalize).
- Avoid using `R` line types — they conflict with the Range (`R`) parameter.
- The parameters available for Find and Search are very similar. See [`@SRH`](SRH.md) (Search) and [`@SRU`](SRU.md) (Search Update) for additional examples.

> **Note:** Since the Find command does not create a result containing finds, some Search command options are not available with Find.

---

## Procedures

**Search for multiple strings in the same field:** Enter each string on a separate line under the field heading in the mask. A find is made when either string is found.

**Search for multiple strings in different fields:** Enter the strings under different headings on the same line. A find is made when all specified fields contain their respective strings.

**Search for multiple strings in different fields with OR logic:** Enter the strings under different headings on different lines. A find is made when either specified field contains its string.

**Search for a range of character strings:**

1. Type the characters for the lower end of the range in the first line under the mask in the correct field.
2. Type `r` in the first character position of the next line.
3. On the same line as the `r`, type the characters for the higher end of the range in the same field.
4. Transmit. A find is made at the first data that falls within the range.

---

## Examples

### Finding Data in a Range of Reports

Display the first report where a find was made, at the line containing the searched data.

Function mask:
```
r2-10,14
*St.Status.By.
*Cd. Date .In.
*==.======.==.
** ****** **
ip
sh
```

Equivalent statement:
```
@fnd,'drawerb' r2-10,14 2-2 |,ip/|,sh <report>i4,<line>i6 .
```

| | Description |
|-|-------------|
| `r2-10,14` | Search reports 2 through 10 and report 14. |
| `ip`, `sh` | Search for these parameters in the St Cd field. |

---

### Finding Spaces

Use the `@` option and `@` parameter to find spaces in the Serial Number field.

Function mask:
```
@
*St.Status.By. Product .Serial.
*Cd. Date .In. Type .Number.
*==.======.==.=========.======.
** ****** ** ********* ******
@@@@@@
```

Equivalent statement:
```
@fnd,'report2b' @ 25-6 |,@@@@@@ <report>i4,<line>i6 .
```

---

### Finding Data Within a Range of Dates

Find the first line of data within a date range. The `Y` option indicates the presence of a date format parameter line; `YYMMDD` specifies the alphabetic date format.

Function mask:
```
Y
*St.Status.By. Product  .Serial.Produc.Order.Cust.Produc.Produc. Ship .
*Cd. Date .In. Type     .Number. Cost .Numbr.Code. Plan .Actual. Date .
*==.======.==.=========.======.======.=====.====.======.======.======.
** ****** ** ********* ****** ****** ***** **** ****** ****** ******
sh 970101
Rsh 101231
Y YYMMDD
```

Equivalent statement:
```
@fnd,'drawerb' y 2-2,5-6 |,sh,970101/r,sh,101231/y,,YYMMDD .
```
