# RSLT and @RSL — Create Result Copy

## Overview

Use the `RSLT` function to create and display a copy of a report as a result. Use the `@RSL` statement to create a copy of a report as the new `-0` result, including copies of previously renamed results.

With the new result, you can:

- Make changes to the result without disturbing the data in the original report.
- Save the result as a new report using the **Duplicate Report** command.
- Replace the original report or another existing report with the result data using the **Replace Report** command.

> **Tip:** To replace the original report with updated data from the result, use an [`@LOK`](LOK.md) statement to lock the original report for the exclusive use of your run before creating a result with `@RSL`.

---

## Syntax

### Control Line (Windows / Linux / UNIX)

```
RSLT [report]
```

### Control Line (2200)

```
RSLT [report,output-dc]
```

### Statement (Windows / Linux / UNIX)

```
@RSL,c,d,r .
```

### Statement (2200)

```
@RSL,c,d,r[,rc,rd] .
```

### Parameters

| Field | Platform | Required | Description |
|-------|----------|----------|-------------|
| `report` | All | Optional | The report to be created as a result. See *Specifying Reports or Drawers to Process* for details. |
| `output-dc` | 2200 only | Optional | Drawer and cabinet for the output result. Defaults to the drawer of the input report. |
| `c,d,r` | All | Required | The report to copy as a result. See *Specifying Reports or Drawers to Process* for details. |
| `rc,rd` | 2200 only | Optional | Cabinet and drawer for the output result. Defaults to the drawer of the input report. |

---

## STAT1$ Values (2200)

After execution of `@RSL`, `STAT1$` is loaded with one of the following values:

| Value | Description |
|-------|-------------|
| `0` | No warnings. |
| `1` | Output report lines have been truncated to accommodate the output drawer. |
| `2` | The report has been converted to a different character set (LCS, FCS, FCSU). |
| `3` | Report lines have been truncated and the character set has changed. |

---

## Example

This example locks report `3B0`, creates a result copy, and replaces report `3B0` with the updated result:

```bismapper
@lok,0,b,3 .
@rsl,0,b,3 .
.
.
.
@rep,0,b,3 .
```

---

## See Also

- [`@LOK`](LOK.md) — Lock Report
- [`@REP`](REP.md) — Replace Report
