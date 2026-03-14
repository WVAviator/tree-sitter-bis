# REP and @REP (Replace Report)

## Overview

Replaces a report (the *receiving* report) with the current or issuing report. The receiving report can be either an existing report or a new one. The Replace Report command can be used to save results as permanent reports.

For the manual function, the issuing report (containing the replacement data) must be on display, and you can only replace the receiving report if you were the last person to update it.

### Outcome

- The specified report is replaced with the current report, and the newly replaced report is displayed.
- If the receiving report does not exist, it is created with the specified number.
- If no title is specified, the title of the current report is added to the receiving report.
- If the reports have unequal line lengths, lines from the current report are space-filled or truncated to match the line length of the receiving report.
- If the issuing report contains non-displayable data (binary, encoded, or run-time), the line lengths must match.
- Any read and write passwords on the report being replaced are cleared.
- *(2200 only)* If your system is set up to retain save dates when replacing reports, either omit the title or include a save date (`@YYMMDD`) at the beginning of the title to prevent it from being overwritten.
- To regain the original report immediately after replacing it using the manual function, press **Undo**.

---

## Manual Function Syntax

```
REP [report ,title]
```

| Field | Description |
|-------|-------------|
| `report` | Receiving report. See Specifying Reports or Drawers to Process. |
| `title` | New title of the receiving report (up to 43 alphanumeric characters). |

---

## Statement Syntax

```
@REP[,ic,id,ir],rc,rd,rr[,rt] [vtitle] .
```

| Field | Description |
|-------|-------------|
| `ic,id,ir` | Issuing report. If the issuing report is the current (`-0`) result, these subfields need not be specified. |
| `rc,rd,rr` | Receiving report. |
| `rt` | Place `Y` here to create a source-protected version of the report being replaced. |
| `vtitle` | Variable containing the title of the receiving report (up to 43 alphanumeric characters). |

---

## Example

Replace the contents of report `3B20` with report `2B0`:

```
@ldv <title>s43=`this is the title' .
@rep,0,b,2,20,b,3 <title> .
```
