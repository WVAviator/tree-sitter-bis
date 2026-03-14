# @LNK — Link to Another Script

## Overview

Starts one script from another. Unlike the [`@RUN`](RUN.md) (Execute a Script) statement, when the called script executes a `GTO END` statement, control returns to the calling script.

---

## Syntax

```
@LNK[,lab] script[,vld] .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `lab` | Optional | Label to branch to if the script to be started is not registered. |
| `script` | Required | Registered name of the Business Information Server script to start. |
| `vld` | Optional | Input parameters (variables, literals, reserved words, constants, or any combination) sent to the called script. The called script uses these to initialize variables via `INPUT$`. Pack or right-justify all variables. Maximum: 80 input parameters. |

---

## Outcome

- The calling script resumes when the called script executes a `GTO END` statement.
- If the called script terminates with a [`@REL`](REL.md) (Release Display) or [`@DSX`](DSX.md) (Display Report and Exit) statement, or due to an error condition that does not execute an error routine ([`@RER`](RER.md)), control does **not** return to the calling script.
- Miscellaneous error conditions can occur where the label is not used — for example, if the script report does not exist or has an update lock.
- The `@LNK` statement clears the output area of the calling script. The `GTO END` statement clears the output area of the called script before returning control.
- Global script variables are not passed to the called script, but are restored to their previous state when the called script executes `GTO END`.

---

## Reserved Words

| Variable | Description |
|----------|-------------|
| `LINK$` | Contains `0` if the script was not started by a `@LNK` statement; `1` otherwise. Examine `LINK$` before ending a script to determine whether to execute `GTO END` to return to the calling script. |
| `STAT1$` | Integer status code returned from the called script via `GTO END`. |
| `STAT2$` | Integer status code returned from the called script via `GTO END`. |
| `STAT3$` | Integer status code returned from the called script via `GTO END`. |

---

## Guidelines

- The called script can return up to three numeric status codes via `GTO END`. The current `-0` result is also available to the calling script.
- Examine `STAT1$`, `STAT2$`, and `STAT3$` in the calling script to capture the returned status codes.
- A script started by `@LNK` cannot itself contain another `@LNK` statement unless the [`@CLK`](CLK.md) (Clear Link) statement is used to clear the original link.
- You can link to system utility scripts, but control only returns if the utility script contains a `GTO END` statement.
- Function keys set up with the [`@FKY`](FKY.md) (Function Key) statement in the calling script must be set up again in the called script — they are not retained across a link.
- Up to 80 input parameters and the current `-0` result can be sent to the called script.
- *(Windows / Linux / UNIX)* You cannot link to a script registered for a greater number of variables, labels, or variable characters.
- *(Windows / Linux / UNIX)* Do not place other statements on the same line after `@LNK` — they will be ignored. Place the next statement on a new line.
- You cannot link to a JavaScript script using `@LNK`. Use the [`@CALL`](CALL.md) (Call Subroutine) statement instead.

---

## Examples

### Basic Link

Start the `TEST` script, passing the contents of `<first>`, `<second>`, and the literal `sam` as input parameters:

```
@lnk test,<first>,<second>,sam .
```

The `TEST` script returns control and passes three status codes:

```
@gto end,5,10,20 .
```

Back in the calling script, handle the returned status codes:

```
@if stat1$ EQ 5 gto 100 ; .
```

---

## Linking to the SCHEDULE Script

The `@LNK` statement can call the `SCHEDULE` script to schedule a registered background script to run at a later time.

### Syntax

**Format 1 (all platforms):**
```
@LNK SCHEDULE,script,time[,date,sn,restart?,vld,...,vld]
```

**Format 2 (2200 only):**
```
@LNK SCHEDULEX,script,time[,date,sn,restart?,uid,dpt,pwd,vld,...,vld]
```

### Parameters

| Field | Platform | Required | Description |
|-------|----------|----------|-------------|
| `script` | All | Required | Name of the script to schedule. Must be registered as a background script for the person starting your script. |
| `time` | All | Required | Time to start the script in `HHMM` format, or `NOW` for the current time. |
| `date` | All | Optional | Date to start the script in `YYMMDD` or `YYYYMMDD` format. Default: current date. |
| `sn` | All | Optional | Station number to notify when the SCHEDULE script completes, or `N` for no notification. Default: user's station number. |
| `restart?` | All | Optional | Restart the script if the system goes down while it is processing? `Y` or `N`. Default: `N`. |
| `uid` | 2200 only | Optional | User ID to execute the script with. |
| `dpt` | 2200 only | Optional | Department to execute the script with. |
| `pwd` | 2200 only | Optional | Password for the user ID specified in `uid`. |
| `vld,...,vld` | All | Optional | Up to 35 variables, literals, reserved words, constants, or any combination, to send to the scheduled script. |

### Outcome

The system schedules the script to execute in the background at the requested time and date.

### Reserved Words

`STAT1$` contains one of the following status codes after linking to the `SCHEDULE` script:

| Code | Platform | Description |
|------|----------|-------------|
| `0` | All | The background script has been scheduled. |
| `1` | All | The specified script name is not a registered background script for the person executing your script. |
| `2` | All | The specified time is invalid. |
| `3` | All | The specified date is invalid. |
| `4` | All | The specified time and date has already passed. |
| `5` | Windows / Linux / UNIX | The specified station number is invalid. |
| `6` | Windows / Linux / UNIX | DISPATCHER is not running or has been aborted; the script was not scheduled. |
| `5` | 2200 only | Only administrators can schedule with the credentials of another user. |
| `6` | 2200 only | The department number is invalid. |

### Example

Schedule the `RUNIT` script to run at 1:30 PM on June 5, 1996, notifying station 123 on completion:

```
@lnk schedule,runit,1330,960605,123 .
```

---

## Linking to Chart Scripts

For subfield descriptions and more information on chart scripts, see `CHART`.

### Syntax

**Format 1** — Use when the `-0` result or a specified report contains the chart script name on line 2:
```
@LNK CHART[,,report] .
```

**Format 2:**
```
@LNK chartscript[,report,dev,sn,psiz?,transpcy?] .
```

### Outcome

- **Format 1:** Links to the chart script specified on line 2 of the `-0` result or the specified report.
- **Format 2:** If a chart report is specified in `report`, the input report is displayed. After pressing Resume, the `-0` result contains the graphics primitive code. If no chart report is specified, the chart script returns graphics primitive code directly to the calling script in the `-0` result. Use the [`@DSG`](DSG.md) (Display Graphics) statement to display the chart.

### Guidelines

The default for the `report` subfield is the current result (`-0`). If no chart report is specified, ensure the current result is a chart report before calling.

### Reserved Words

`STAT1$` contains a non-zero value if an error occurs in the chart script. Line 8 of the current result contains the system message — check it or start a display at line 8 to handle errors.

### Example

Start the `BARG` script using chart data in the `-0` result, then display the returned graphics:

```
@lnk barg .
@dsg,-0 .
```
