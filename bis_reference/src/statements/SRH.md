# S and @SRH (Search), SU and @SRU (Search Update)

## Overview

Use the `S` function or `@SRH` statement to find a character string in specified fields of one or more reports in a drawer, creating a result containing all lines on which the string is found.

Use the `SU` function or `@SRU` statement to create an **update result**, which enables you to [`@DEL`](DEL.md) (Delete) or [`@EXT`](EXT.md) (Extract) the found lines from the report, or [`@UPD`](UPD.md) (Update) the found lines and blend them back into the report.

> **Note:** The `S`, `F`, and `BF` manual functions no longer require a minus sign (`-`) to indicate the report or result currently on display — though a minus sign is still accepted. These functions will prompt the user for a report if one is not on display.

You can use the [`ISRH`](../runs/ISRH.md) run to save and reuse Search function masks containing options and parameters, and to create `@SRH` statements.

---

## Syntax

### Control Line

```
S {report|drawer}[ f]
SU {report|drawer}[ f]
```

### Statement

```
@SRH,c,d[,r,l,q,lab] o cc ltyp,p [vlines,vls,vrpt] .
@SRU,c,d[,r,l,q,lab] o cc ltyp,p [vlines,vls,vrpt] .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `report` / `drawer` | Required | Report or drawer to search. Use `drawer` to search all reports in a given drawer. See *Specifying Reports or Drawers to Process* for details. |
| `f` | Optional | Report format in which to process data. Allows processing of data in fields beyond column 80 if those columns are not already on display. |
| `c,d,r` | Required | Report or drawer to search (statement form). See *Specifying Reports or Drawers to Process* for details. |
| `l` | Optional | Line number at which to start the search. |
| `q` | Optional | Number of lines to search. |
| `lab` | Optional | Label to go to if no finds are made. |
| `o` | Optional | Options field. See [Options](#options). |
| `cc` | Required | Column-character positions or names of the fields to search. |
| `ltyp` | Required | Line type to search. If using the `A` option, leave this subfield blank but include the comma. |
| `p` | Required | Character string to find. See [Parameters](#parameters). Maximum of 11 parameters allowed in the same field. |
| `vlines` | Optional | Variable to capture the number of lines found. |
| `vls` | Optional | Variable to capture the number of lines searched. If `l` is specified, all lines searched are included (not just the specified line type). |
| `vrpt` | Optional | Variable to capture the report number where the find was made. With `@SRH`, only useful when using the `B` option across multiple reports (otherwise `vrpt` = 0). With `@SRU`, always useful when searching more than one report. |

---

## Options

| Option | Platform | Description |
|--------|----------|-------------|
| `A` | All | Processes all line types. Do not use with `T` or `U`. |
| `B[(n)]` | All | Stops search after the nth find. Default = first find. Search continues until items are found or end of report is reached. |
| `C(S)` | Windows / Linux / UNIX | Distinguishes between uppercase and lowercase letters. |
| `C(x)` | 2200 only | Alters the search based on character set order. Options: `C(F)` = full character set (FCS), `C(L)` = limited character set (LCS), `C(S)` = strict comparison (case-sensitive). |
| `D` | All | Omits search information lines from the result. |
| `E(n)` | 2200 only | Estimates the number of lines in the result, where `n` is an integer. Improves efficiency when the output result contains more than 500 lines. |
| `F` | All | Searches for a numeric value instead of a character string. Use to search for a range of negative or floating point numbers. Ignored for fields using the `Y` option parameter. |
| `H` | All | In a multiple report search, includes heading lines of the first report only. |
| `L(x)` | All | Omits lines of type `x` from the result. For example, `L(*.a)` omits asterisk, period, and A-type lines. If the omitted line type matches the type being searched, those lines are still counted in the total finds. |
| `N` | All | Includes only lines *not* meeting the search criteria. Do not use with `A`, `T`, or `U`. |
| `P` | All | Extracts paragraphs from the report. A paragraph consists of data on a specified line type and all subsequent lines until the next occurrence of that line type. |
| `Q[(n)]` | All | Extracts the first `n` paragraphs; stops after the nth paragraph. Default = first paragraph. |
| `R x-y` | All | Searches a range of reports from report number `x` through `y`. |
| `R x,y` | All | Searches reports `x` and `y` specifically. |
| `R x-y,z` | All | Searches reports `x` through `y` and also `z`. |
| `S` | All | Groups lines found in search parameter order. Use with `H` to avoid repeating report headings for each group. Does not apply to the Search Update command. Results may differ between 2200 and Windows platforms. |
| `T[(x)]` | All | Includes data found on the processed line type and the preceding `x` type line. Default = tab line. Do not use with `A`, `N`, or `U`. |
| `U[(x)]` | All | Includes data found on the processed line type and its surrounding data unit. A data unit starts at line type `x` and runs to the next line of that type. Default = tab line. Do not use with `A`, `N`, or `T`. |
| `Y[(x)]` | All | Searches for dates using the date format parameter line. Optionally specifies the line type of the parameter line (cannot be `R`, defaults to `Y`). Lines with invalid dates are excluded from the result. |
| `@` | Windows / Linux / UNIX | Indicates that `@` characters on the parameter line specify a search for space characters. |
| `@[(x)]` | 2200 only | Same as above; optionally redefines the `@` character to another character using the value in parentheses. |
| `/` | All | Searches for a slant (`/`) character as data when used with the `/` parameter. |

---

## Parameters

| Parameter | Description |
|-----------|-------------|
| `/` | Searches for a slant (`/`) character when used with the `/` option. Without the `/` option, a slant in a parameter line shortens that field and a partial field is processed. In the `@SRH` statement, place the slant within apostrophes in the parameter subfield to process a partial field. |
| `@` | Searches for spaces. Use with the `@` option or results may be unpredictable. Type `@` in the columns where you want to search for spaces. To find a blank field, type `@` in the first column of the field. Also helps find all lines of a specific type when used with the `@` option. |
| `R` | Searches for a range of data. |
| `Y` or `x` | Identifies the line type of the date parameter line. Use `Y` or the value of `x` from the `Y` option. Place a date format in the field being searched. The date parameter line should be placed after all other parameter lines. |
| `0`–`20` (Windows / Linux / UNIX) | Specifies the numeric date format. You can also use an alphabetic date format (e.g., `YYMMDD` in place of `1`). See *Entering Dates and Times in the DC Statement* for a complete list. |
| `0`–`21` (2200 only) | Same as above, with one additional format supported. |

---

## Search Outcome

Executing this command causes the following:

- A result is created containing all lines found, including trailer lines. Trailer line hierarchy: asterisk and period lines are trailers to tab lines; period lines are trailers to asterisk lines.
- If the specified data is not found, the search information lines state that no finds were made. With the `D` option, information lines are omitted but heading lines are retained.
- The top of the result includes: number of finds, number of lines searched, and the search mask showing the options and parameters specified. Use the `D` option to omit this.
- The `*=` line must appear within the first eight lines of the report being searched for headers to appear in the search result.

### @SRH Statement Outcome

In addition to the above, `@SRH` also:

- Loads `vlines`, `vls`, and `vrpt` variables as described in [Parameters](#parameters).
- If no finds are made, loads `vls` with the number of lines searched, sets all other variables to `0`, and passes control to the specified label.

> **Note:** If the search parameter is not specified, the search is not processed. No error or message is displayed — control simply passes to the next statement in the script.

---

## Guidelines

### Searching with the Manual Function

- **Multiple strings in the same field:** Enter each string on a separate line under the field heading in the mask.
- **Multiple strings in different fields:** Enter strings under different headings on the same line. A line is included when *all* specified fields match. To include lines where *either* field matches, enter strings under different headings on *different* lines.
- **Range of character strings:** Enter the lower end of the range on the first line, then `r` in the first character position of the next line followed by the upper end of the range in the same field.
- **Certain line types:** Specify the line type to process, then search for a range of characters encompassing the entire character set. Do not use `R` line types as they conflict with the range `R` parameter.
- **Update results:** Use the Search Update (`SU`) command. You can then Delete, Extract, or Update (blend) the found lines. When searching multiple reports with `SU`, update results are displayed one at a time — press **Resume** to advance to the next.
- **Large sorted reports:** If the report is already sorted and you only need to search on the sorted field, use [`@BFN`](BFN.md) with the `O` option for better efficiency.

### Searching with @SRH / @SRU Statements

- **Multiple strings:** Use a slant (`/`) to separate multiple parameters.
- **Range of character strings:** Use `/` to separate parameters and `R` in the second `ltyp` subfield to indicate a range search.
- **Processing update results from @SRU:** Set up a loop to process update results individually and repeat the `@SRU` statement for each report in the range.

---

## Examples

### Searching for One String

Searches for `amco` in the Cust Code field (columns 45–4):

```bismapper
@srh,'report2b' '' 45-4 |,amco .
```

```
. 9 LINE(S) FOUND OUT OF 42 LINES
.
* ****
* amco
```

### Searching for Multiple Strings

A line must contain both `ip` and `blackbox1`, or both `sc` and `greenbox6`, in the St Cd and Product Type fields:

```bismapper
@srh,'report2b' '' 2-2,15-9 |,ip,blackbox1/|,sc,greenbox6 .
```

### Searching for a Range of Data

Searches for order numbers between `80000` and `90000`:

```bismapper
@srh,'report2b' '' 39-5 |,80000/r,90000 .
```

### Searching a Range of Reports

Searches for status code `ip` in reports 2–5, 19, and 100:

```bismapper
@srh,'report2b' hr2-5,19,100 2-2 |,ip .
```

### Searching a Partial Field

Searches for `blackbox` followed by any character (slant indicates partial field — stops processing before the last column):

```bismapper
@srh,'report2b' '' 15-8 |,blackbox .
```

### Searching for Spaces

Searches for a space in the first column of Serial Number and across the entire Product Cost field:

```bismapper
@srh,'report2b' @ 25-1,32-6 |,@'/',@@@@@@ .
```

### Searching for Multiple Data in a Range

Includes lines with any 1980s status date and a serial number ending in 1–4, or lines with `sh` and `blackbox0`:

```bismapper
@srh,'report2b' '' 2-2,5-1,15-9,30-1 |,,8,,1/r,,8,,4/|,sh,,blackbox0 .
```

### Including the Previous Line Type (T Option)

Includes the preceding tab line along with any finds of `*or` on asterisk lines:

```bismapper
@srh,'report3b' t 2-2 *,or .
```

### Omitting Certain Line Types (L Option)

Omits asterisk trailer lines from the result while including period trailer lines:

```bismapper
@srh,'report3b' l(*) 2-2 |,ip .
```

### Searching for a Paragraph of Data (P Option)

Finds all lines between each occurrence of `*or` and the next asterisk line:

```bismapper
@srh,'report3a' p 2-2 *,or .
```

### Omitting Line Types from a Paragraph

Extracts paragraphs as above, but omits A and B type lines. To also omit the searched `*or` lines themselves, use `L(*ab)`:

```bismapper
@srh,'report3a' pl(ab) 2-2 *,or .
```

### Searching for a Paragraph Using U Option

Finds data of a line type different from the one defining the paragraph boundary. Here, `u(*)` defines asterisk lines as paragraph boundaries, searching for `ip` within:

```bismapper
@srh,'report3a' u(*) 2-2 |,ip .
```

### Searching for All Characters on a Specific Line Type

Searches all period lines by specifying a range from space (`@`) to tilde (`~`) — the full ASCII range. The slant limits processing to the first character in the St Cd field:

```bismapper
@srh,'report1b' @ 2-1 .,@/r,~ .
```

*(2200 only)* For LCS reports, the range is space (`@`) through period (`.`):

```bismapper
@srh,'report7e' @ 2-1 .,@/r,. .
```

### Grouping Lines (S Option)

Groups results by search parameter order using the `S` and `H` options:

```bismapper
@srh,'report2b' sh 2-2 |,sh/|,sc .
```

### Searching and Updating All Reports in a Drawer

Searches all reports in a drawer; when a match is found, deletes the line and continues to the next report:

```bismapper
@sru,<cab>,<drw>,,,,0089 dh 'columns','alias' ,<cdr>,<delt> .
@del gto lin -1 .
@0089 gto end .
```

### Searching and Updating a Range of Reports (R Option)

Displays every matching report as an update result:

```bismapper
@ldv v1i4=1 .
@010:sru,20,b,,,,100 adhrv1-5000 2-4 ,1234 ,,v1 .
@dsp,-0 .
@upd .
@inc v1 if v1 < 5001 gto 010 .
@100 .
```

### Searching a Report and Updating It

Uses Search Update to find data, Totalize to change it, and Update to blend changes back into report `10B0`:

```bismapper
@sru,'report10b' '' 20-4 |,box1 .
@tot,-0 '' 20-4 |,=car1 .
@upd .
```

### Finding Data Within a Range of Dates (Y Option)

Finds all `sh` records with status dates between `970101` and `001231`, using date format `1`:

```bismapper
@srh,'drawerb' y 2-2,5-6 |,sh,970101/r,sh,001231/y,,1 .
```

---

## See Also

- [`@BFN`](BFN.md) — Binary Find
- [`@DEL`](DEL.md) — Delete
- [`@EXT`](EXT.md) — Extract
- [`@UPD`](UPD.md) — Update
- [`@TOT`](TOT.md) — Totalize
- [`@FND`](FND.md) — Find
- [`@WRL`](WRL.md) — Write Line
- [`ISRH`](../runs/ISRH.md) — Iterative Search
