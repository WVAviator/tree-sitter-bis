# CLT and @CLT — Clear Label Table

## Overview

Clears label tables from run control reports. Available as both an interactive **control line function** (`CLT`) and a **run statement** (`@CLT`).

Clearing the label table before adding, deleting, or modifying labels in a run control report prevents the need to rebuild the label table after every change before the run can be executed.

---

## Syntax

**Control line (interactive):**
```
CLT
```
> The run control report must be on display. If the report does not contain a label table, the report is redisplayed as a result unchanged.

**Statement (in a run):**
```
@CLT,c,d,r[,lab] .
```

### Statement Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `c,d,r` | Required | Run control report in which to clear label tables. See *Specifying Reports or Drawers to Process*. |
| `lab` | Optional | Label to branch to if an error condition exists (e.g., nonexistent report). |

---

## Behavior

Removes the label table from the specified run control report and creates a result.

> **Note:** Remember to save the result using the Replace Report or Duplicate Report commands.

---

## Guidelines

- For a single report, use the interactive `CLT` function (enter `clt` on the control line).
- To clear label tables across multiple run control reports quickly, use `@CLT` in a loop — for example, when processing an entire drawer or several drawers of run control reports.
- For an example of processing label tables across multiple reports, see [`BLT and @BLT`](BLT.md) (Build Label Table).
