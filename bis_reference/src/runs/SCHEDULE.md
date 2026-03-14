# SCHEDULE — Schedule Script

## Overview

Use the `SCHEDULE` script to set up a script for automatic execution at scheduled times. You can schedule a script to execute once, or on a recurring basis — daily, weekly, monthly, periodically throughout the day, or when the system is initialized.

The script must already be registered as a background script before it can be scheduled using `SCHEDULE`. The `SCHEDULE` script is also used to display or delete scripts that are currently scheduled for automatic execution.

> *(2200 only)* Administrators can use `SCHEDULE` (or link to `SCHEDULEX`) to add or delete the scheduled registration for any user-id. On systems configured to use OS 2200 user-ids, `SCHEDULE` may also be used to modify the user-id, department, and password for scripts already scheduled for execution.

---

## Syntax

### Windows / Linux / UNIX

```
SCHEDULE [{script,time,date,stnum,restart,inp1,…,inp40 | D | H}]
```

### 2200

```
SCHEDULE [{script,time,date,stnum,restart,inp1,…,inp35 | D}]
```

### Parameters

| Field | Platform | Required | Description |
|-------|----------|----------|-------------|
| `script` | All | Optional | Name of the script to schedule. |
| `time` | All | Optional | Time to start the script in `HHMM` format. |
| `date` | Windows / Linux / UNIX | Optional | Date to start the script in `YYYYMMDD` format. |
| `date` | 2200 only | Optional | Date to start the script in `YYMMDD` or `YYYYMMDD` format. |
| `stnum` | All | Optional | Station number to receive the script completion message. |
| `restart` | All | Optional | Restart the script if incomplete when BIS is taken offline? `Y` or `N`. Default = `N`. |
| `inp1,...,inpn` | All | Optional | Input parameters for the script being scheduled. Maximum of 40 parameters (Windows / Linux / UNIX) or 35 parameters (2200). Each parameter can contain up to 18 characters. |
| `D` | All | Optional | Display or delete a currently scheduled script. |
| `H` | Windows / Linux / UNIX | Optional | Change the maximum number of lines in the scheduled scripts report. Available to administrators only; used with the fast-access command format. |
| `U` | 2200 only | Optional | Modify the credentials (user-id, department, password) for a scheduled script. |

---

## Outcome

`SCHEDULE` either queues the background script for execution on the requested days and times, or displays an information screen about the currently scheduled script — enabling you to remove it from the schedule.

---

## See Also

- [`@SCH`](../statements/SCH.md) — Schedule Run Statements
- [`@BR`](../statements/BR.md) — Background Run
- [`@RS`](../statements/RS.md) — Run Status
