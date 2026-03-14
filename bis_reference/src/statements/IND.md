# I and @IND — Index

## Overview

Creates a listing of a specified number of lines from all reports in a drawer, starting at the date line of each report.

---

## Manual Function

```
I [qd]
```

| Field | Description |
|-------|-------------|
| `q` | Number of lines to display from each report. Default = heading lines (up to eight) from each report. |
| `d` | Drawer to index. For more details, see *Specifying Reports or Drawers to Process*. |

---

## Syntax

```
@IND,c,d[,q,lab] .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `c,d` | Required | Cabinet and drawer to index. For more details, see *Specifying Reports or Drawers to Process*. |
| `q` | Optional | Number of lines to display from each report. Default = heading lines (up to eight). |
| `lab` | Optional | Label to branch to if there are no reports in the drawer, or if report `0` is the only report. Also branches if the drawer does not exist. |

---

## Reserved Words

- `STAT1$` contains the number of reports in the drawer.
- `STAT2$` contains the total number of lines in the drawer.

---

## Outcome

The command creates a result containing:

- The date line for the result.
- A line showing the number of reports in the drawer and the total number of lines.
- The specified number of lines from each report, starting with each report's date line. The right side of each date line contains the number of lines in that report.
- A blank line with a period in column one between each report's information, to aid readability.

If indexing reports fewer than 80 characters wide, the command adds trailer lines containing the line count for each report.

> **Note:** For limited-access reports (read-protected or encoded), only the date line and title line are displayed — the report contents are not included in the result.

---

## Guidelines

- The control line is not counted as part of a report when determining how many lines to include.
- To see only heading lines from each report, omit `q`.
- To see all lines in each report, specify a `q` value larger than the size of any report.

> **Note:** There is no maximum for `q`, but indexing many lines from large drawers can affect system performance — use caution.

---

## Example

Index the first four lines from each report in cabinet `0`, drawer `B`. Branch to label `2` if drawer `B` does not exist:

```
@ind,0,b,4,2 .
```
