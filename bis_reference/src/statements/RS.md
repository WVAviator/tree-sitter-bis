# RS and @RS — Run Status

## Overview

Use the `RS` function or `@RS` statement to create a result showing the status of runs started on the system, including background and remote runs.

> **Note:** Do not place other statements on the same line after an `@RS` statement — any statements following it on the same line will be ignored. Put the next statement on a new line.

- *(Windows / Linux / UNIX)* You can request status of all runs or just your own.
- *(2200 only)* You can view the status of all runs started with your user-id, including background and remote runs.

When using the manual Run Status function, press **Resume** to display a new result with updated status.

---

## Syntax

### Control Line (Windows / Linux / UNIX)

```
RS[,o]
```

### Control Line (2200)

```
RS[,o,run,sn]
```

### Statement (Windows / Linux / UNIX)

```
@RS,o .
```

### Statement (2200)

```
@RS[,o,run,sn] .
```

### Parameters

| Field | Platform | Required | Description |
|-------|----------|----------|-------------|
| `o` | All | Optional | Options field. See [Options](#options). |
| `run` | 2200 only | Optional | Run name. Leave blank for the status of all runs. |
| `sn` | 2200 only | Optional | Station number. Returns status of only those runs at this station. |

---

## Options

### 2200

| Option | Description |
|--------|-------------|
| *(blank)* | All active and suspended runs |
| `A` | Active runs only |
| `B` | Background runs only |
| `S` | Suspended runs only |

### Windows / Linux / UNIX

| Option | Description |
|--------|-------------|
| `A` | All scheduled or active runs |
| `Y` | Scheduled or active runs for current user |

---

## Sample Results

### Windows / Linux / UNIX

```
* . . . START .START .S. . RUN CNTRL .RUN .
*RUN-NAME .USER-ID .DEPN. TIME .DATE .T. CMND .
REPORT .LINE .
*============.==========.====.========.======.=.==========.============.=====.
RS        NEWUSER   7    11:59:50
MYRUN     NEWUSER   7    11:59:46  030101  R
```

| Field | Description |
|-------|-------------|
| `RunName` | Name of the run. |
| `User-id` | User-id of the user who started the run. |
| `Depn` | Department number of the user who started the run. |
| `Start Time` | Time the command was started or the run was scheduled to start. |
| `Start Date` | Date the run was started. |
| `St` | Status of run processing: `D` = delayed, `R` = running, `S` = ready to start. |
| `Cmnd` | Last statement executed on the station. An asterisk (`*`) indicates the command is active. |
| `Run Cntrl Report` | Report (drawer/cabinet) of the active run or subroutine. |
| `Run Line` | Line number of the active run or subroutine. |

### 2200 — A and S Options

```
* . .P. . . . Start. Start . . . . Run Cntrl. . . . COMM . COMM .
* Sta .Sts.r. Run-name . User-ID .Depn. Time . Date .Tp. Cmnd . Line . Report . I/O . LLP . IPSecs . Time . Date .
*=====.===.=.============.===========.====.======.========.==.======.======.==========.========.======.==========.======.========.
```

### 2200 — B Option

```
* . .P. . . . Start. Start . Org . Msg .Err .
* Sta .Status.r. Run-Name . User-id .Depn. Time . Date . Sta . Sta .Num .
*=====.======.=.============.===========.====.======.========.=====.=====.====.
```

| Field | Description |
|-------|-------------|
| `Sta` | Station number that started the run. |
| `Sts` | Run status: `ACT` = active, `SUS` = suspended, `WAT` = waiting. |
| `PR` | Priority: blank = normal, `*` = batch, `A`–`G` = TIP priority level (A=1 through G=7). |
| `RunName` | Name of the run. |
| `User-id` | User-id of the user who started the run. |
| `Depn` | Department number of the user who started the run. |
| `Start Time` | Time the run was started. |
| `Start Date` | Date the run was started. |
| `Tp` | Type of run: blank = normal, `BP` = batch port, `BG` = background, `RR` = remote. (Not displayed when `B` option is specified.) |
| `CMND` | Last statement executed on the station. |
| `LINE` | Line number in the run control report where it is executing. |
| `Run Cntrl Report` | Report (drawer/cabinet) of the active run or subroutine. |
| `I/O` | Current I/O count accumulated by the run. |
| `LLP` | Current LLP count (number of lines processed) accumulated by the run. |
| `IP-Secs` | Accumulated CPU time in seconds. |
| `COMM Time` | Time of last communication to a terminal or networking interface. |
| `COMM Date` | Date of last communication to a terminal or networking interface. |
| `Status` | Run status: `ACTIVE` = active, `FACIL` = background waiting for facilities, `COMPLT` = scheduled background run is complete. |
| `Org Sta` | Station number originating the background run. |
| `Msg Sta` | Station number to notify when the background run completes. |
| `Err Num` | Error number if the background run had an error. |

---

## Examples

```bismapper
@rs .
```
Creates a result containing the status of all runs.

```bismapper
@rs,b,myrun .
```
*(2200)* Obtains the status of the background run `MYRUN`.

```bisparser
@rs,,,123 .
```
*(2200)* Obtains the status of all runs at station `123`.

---

## See Also

- [`@SCH`](SCH.md) — Schedule
- [`@BR`](BR.md) — Execute a Background Script
