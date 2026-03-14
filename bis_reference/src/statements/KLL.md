# KILL and @KLL — Kill

## Overview

Terminates active tasks (runs or functions). You may only terminate your own tasks.

> *(2200 only)* The command also signs you off the system and terminates the station session.

> **Note:** `KILL` will not terminate an activity held due to a suspended resource (e.g. a full audit trail file). The administrator must resolve the suspension before `KILL` can take effect — then `KILL` must be executed again.

---

## Manual Function

**2200:**
```
KILL {run | ,sn | run,sn}
```

**Windows / Linux / UNIX:**
```
KILL {run | ,sn | run,sn}[,terminate?]
```

---

## Syntax

**Windows / Linux / UNIX:**
```
@KLL,{run | ,sn | run,sn}[,terminate?] .
```

**2200:**
```
@KLL,{run | ,sn | run,sn}[,,,terminate?,lab] .
```

### Parameters

| Field | Platform | Required | Description |
|-------|----------|----------|-------------|
| `run` | All | Required* | Name of the run to terminate. |
| `sn` | All | Required* | Station number where the run is executing. |
| `terminate?` | All | Optional | `Y` = terminate the selected sessions. `N` (default) = terminate the active task only. |
| `lab` | 2200 | Optional | Label to branch to if an error occurs. If not specified and an error occurs, the run errors. |

*Specify `run`, `sn`, or both. See [Procedures](#procedures).

---

## Reserved Words

*(2200 only)*

- If stations are stopped, the run continues at the next statement with `STAT1$` = `0` and `STAT2$` = the number of stations affected.
- If no stations are found, the run jumps to `lab` with `STAT1$` = `1`.
- If any other error occurs, the run jumps to `lab` with `STAT1$` = `2` and `STAT2$` containing the system error message value, retrievable with [`@LSM`](LSM.md).

---

## Guidelines

- *(Windows / Linux / UNIX)* Use the System command to locate the run name and station number of the run to terminate. A queued background run can only be terminated by the administrator. `KILL` has no effect if the target session's underlying process has exited or is hung due to an unrecoverable software or hardware defect.
- *(2200)* Use the Run Status (`RS`) command to locate the run name and station number of the run to terminate.

---

## Procedures

**Terminate by run name:** Enter the run name alone to terminate all background runs with that name that you started on any station.

**Terminate by station number:** Enter the station number alone to terminate the background run you started at that station.

**Terminate by both:** Enter both the run name and station number to terminate a specific run at a specific station.
