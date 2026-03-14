# IU and @IDU — Index User

## Overview

Creates a listing of a specified number of lines from selected reports in a drawer. You can filter by any combination of:

- Reports created or updated by a specific user, or by any user.
- Reports with specific last update start dates, end dates, or both.
- A range of report numbers.

---

## Manual Function

```
IU [qd]
```

| Field | Description |
|-------|-------------|
| `q` | Number of lines to display from each report. Default = heading lines (up to eight). |
| `d` | Drawer to index. For more details, see *Specifying Reports or Drawers to Process*. |

---

## Syntax

```
@IDU,c,d[,q,user,sdate,endate,srpt,endrpt
    vrpts,vlines,vrptsd,vhirptd] .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `c,d` | Required | Drawer to index. For more details, see *Specifying Reports or Drawers to Process*. |
| `q` | Optional | Number of lines to display from each report. Default = heading lines (up to eight). |
| `user` | Optional | User ID to index, or `all` to index all users. Default = current user ID. |
| `sdate` | Optional | First update date in the date range (`DDMMMYY` or `DDMMMYYYY` format; spaces optional). Default = all dates. This is the date of the most recent update, or the creation date if no updates exist. *(Windows / Linux / UNIX)* Enter dates in the user language for the manual function; for `@IDU`, enter dates in the language of the report or drawer being processed. |
| `endate` | Optional | Last update date in the date range (`DDMMMYY` or `DDMMMYYYY` format; spaces optional). Default = current date. When specifying November (`NOV`), enclose the date in apostrophes to prevent `V` from being interpreted as a variable name (e.g. `'30NOV93'`). Same language rules as `sdate`. |
| `srpt` | Optional | First report number in the range. Default = `1`. |
| `endrpt` | Optional | Last report number in the range. Default = highest report number. |
| `vrpts` | Optional | Variable to capture the number of reports found. |
| `vlines` | Optional | Variable to capture the total number of lines in the reports found. |
| `vrptsd` | Optional | Variable to capture the total number of reports in the drawer. |
| `vhirptd` | Optional | Variable to capture the highest report number in the drawer. |

---

## Outcome

The command creates a `-0` result containing:

- The date line for the result.
- Lines showing the number of reports meeting the selection criteria and the requested user ID.
- Column headings (e.g. USER, UPDATE DATE) and a heading divider line.
- The specified number of lines from each report, starting with each report's date line. The right side of each date line shows the number of lines in that report.
- A blank line with a period in column 1 between each report's information.

If indexing reports fewer than 80 characters wide, trailer lines containing each report's line count are added.

The `@IDU` statement also loads the specified variables with information about the reports and drawer.

> **Note:** For limited-access reports (read-protected or encoded), only the date line and title line are displayed — report contents are not included.

---

## Guidelines

- The control line is not counted as part of a report when determining how many lines to include.
- To see only heading lines, omit `q`.
- To see all lines in each report, specify a `q` value larger than the size of any report.
- *(Windows / Linux / UNIX)* For the manual function, always enter dates in your user language. For the `@IDU` statement, enter dates in the language of the report or drawer being processed.

> **Note:** There is no maximum for `q`, but indexing many lines from large drawers can affect system performance — use caution.

---

## Examples

Index cabinet `0`, drawer `A`, showing the first three lines from all reports updated by `newuser`:

```
@idu,0,a,3,newuser .
```

Index a range of reports in cabinet `0`, drawer `B`, updated by `newuser` between January 1 and November 30, 1996, reports `5` through `10`:

```
@idu,0,b,7,newuser,01jan93,'30nov93',5,10
    <numreports>i3,<numlines>i9,<repsdrwr>i4,<hireport>i4 .
```

| Subfield | Description |
|----------|-------------|
| `0,b` | Cabinet `0`, drawer `B`. |
| `7` | Include seven lines from each report. |
| `newuser` | Reports last updated by `newuser`. |
| `01jan96` | Start date: January 1, 1996. |
| `'30nov96'` | End date: November 30, 1996. Enclosed in apostrophes to prevent `V` in `nov` from being read as a variable name. |
| `5,10` | Report range: `5` through `10`. |
| `<numreports>i3` | Capture number of reports found. |
| `<numlines>i9` | Capture total lines found. |
| `<repsdrwr>i4` | Capture total reports in the drawer. |
| `<hireport>i4` | Capture highest report number. |
