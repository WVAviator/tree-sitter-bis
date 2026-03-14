# AR and @ADR — Add Report

## Overview

Use the Add Report (AR) function or `@ADR` statement to add a new report to a specified drawer or to a specified report number in a drawer.

---

## Syntax

### Add Report Control Line Format

```
AR {report|drawer}title
```

| Field | Description |
|-------|-------------|
| `report` | Report to add. For more details, see Specifying Reports or Drawers to Process. |
| `drawer` | Drawer and cabinet in which to add the report. Use only if you do not specify the report in the `report` field. The system assigns the next available report number in the drawer and cabinet. For more details, see Specifying Reports or Drawers to Process. |
| `title` | The title that will be placed in line 2 of the report, as well as in the Report Select menu. The title may be up to 43 alphanumeric characters, including spaces. |

### Add Report Statement Format

```
@ADR,c,d[,r,lab vtitle] .
```

or

```
@ADR,c,d[,DFA,lab vtitle] .
```

| Field | Description |
|-------|-------------|
| `c,d,r` | Report to add. For more details, see Specifying Reports or Drawers to Process. |
| `DFA` | Adds the newly added report (`RPT$`) to the defer update list. For more details, see [`@DFA`](DFA.md) (Defer Add). |
| `lab` | Label to go to if the specified report number already exists, the report number exceeds the highest report allowed, or the drawer specified contains the maximum number of reports. If the report number exceeds the maximum number of reports for the system, the command limit will not process the label. |
| `vtitle` | A variable containing the title of the new report (up to 43 alphanumeric characters). |

---

## Behavior

Using the Add Report function causes the following actions to occur:

- The command creates the new report. The report contains the column headings and any predefined lines for the drawer. Data lines are blank unless predefined in report 0.
- If you specify a report in your request, that report is added, provided it does not already exist. If it already exists, the system displays a message.
- If you do not specify a report, the system selects the next available report number in the drawer you specify.
- When in a script running under deferred updates, you may specify a report of `DFA`. The system will select the next available report number in the drawer you specify and add it to the list of reports with deferred updates. See the [`@DFA`](DFA.md) statement.
- If the report already exists, the run continues at the label or fails if you did not specify a label.

---

## @ADR Reserved Words

`RPT$` and `STAT1$` contain the number of the added report.

---

## Guidelines

- When creating a title for your new report, use a unique title so that you can distinguish it from other reports in the cabinet.
- After you create the report, you can delete any predefined lines that the system added, if you wish to, and then begin to enter data in the report.
- When using the `@ADR` statement, create a new report for use as a scratch area only if you also intend to use it for permanent storage of the run results. It is inefficient to use an added report as a scratch area and then delete it at the end of a run. Use renamed results instead.

---

## Examples

This example adds a new report in cabinet 0, drawer B, then displays the new report:

```
@ldv <title>s40='This is the title' .
@adr,0,b <title> .
@dsp,0,b,rpt$ .
```

This statement adds report 10B0 and branches to label 99 if report 10B0 already exists or if drawer B is full:

```
@adr,0,b,10,099 .
```
