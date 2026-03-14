# XR and @DUP — Duplicate Report

## Overview

Copies a report or result, creating a new report. The new report has the following characteristics:

- Report number is the next available number in the destination drawer.
- Current date is displayed in the date line.
- Title of the original report is used unless a new title is specified.

If the report being duplicated contains non-displayable data (binary, encoded, or runtime), the line length must match the receiving drawer.

---

## Syntax

### Control Line
```
XR [report,drawer,title]
```

| Field | Platform | Description |
|-------|----------|-------------|
| `report` | All | Report to duplicate. Default = report on display. See *Specifying Reports or Drawers to Process*. |
| `drawer` | Windows / Linux / UNIX | Drawer and cabinet to receive the new report. Default drawer = drawer of the report being duplicated. Default cabinet = current cabinet. |
| `drawer` | OS 2200 | Drawer to receive the new report. The receiving cabinet is always the current cabinet. Default = same drawer letter as the report being duplicated. |
| `title` | All | Title for the new report (up to 43 alphanumeric characters). Default = title of the report being duplicated. See [Guidelines](#guidelines) for notes on save dates (OS 2200). |

### Statement
```
@DUP,c,d,r[,rc,rd,DFA <vtitle>]
```

| Field | Description |
|-------|-------------|
| `c,d,r` | Report to duplicate. See [Guidelines](#guidelines). |
| `rc,rd` | Receiving cabinet and drawer in which to place the new report. |
| `DFA` | Add the new report to an existing deferred update sequence. |
| `vtitle` | Variable containing the title of the new report (up to 43 alphanumeric characters). |

---

## Reserved Words

`RPT$` and `STAT1$` contain the new report number after the duplication.

---

## Guidelines

- Use a unique title for the new report to distinguish it from other reports in the cabinet.

*(Windows / Linux / UNIX)* If the manual Duplicate Report function is used to duplicate a currently displayed result that was created by a function or run accessing a different cabinet, the new report is created in that other cabinet — unless a drawer and cabinet are specified in the `drawer` field.

*(OS 2200)* You may duplicate a report into your currently active cabinet only. Some functions and runs display reports or results from other cabinets; if duplicated, they are placed into the current cabinet. Enter a valid drawer in the `drawer` field to specify the destination. If your system retains save dates when duplicating reports, either omit the title or include a save date (`@YYMMDD`) at the beginning of the title to prevent the save date from being overwritten.

---

## Example

Duplicates report `2B0` and displays the new report.

Control line:
```
XR 2b0,,This is the title
```

Equivalent statements:
```
@ldv <title>s40='This is the title' .
@dup,0,b,2 <title> .
@dsp,0,b,rpt$ .
```
