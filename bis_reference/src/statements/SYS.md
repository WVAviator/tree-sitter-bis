# SYSTEM and @SYS — System

## Overview

Displays a result listing the current system activity. Press **Resume** to display a new result reflecting the most current activity.

> **Notes:**
> - When debugging non-registered scripts from the Developer Workshop, the run name appears as the Report Drawer Cabinet (e.g., `65A1`) and an asterisk (`*`) appears in the last column of the **RUN NAME** field.
> - The `@SYS` statement is only available on Windows Server, Windows Client, Linux, and UNIX systems.

---

## Syntax

### Control Line
```
SYSTEM
```

### Statement *(Windows / Linux / UNIX only)*
```
@SYS .
```

---

## Output Examples

### Current Output — Windows / Linux / UNIX (columns 1–80)

```
.CURRENT SYSTEM ACTIVITY
* . USER .DEPT. MAPPER . STA . START .RUN . WAIT .
* TYPE . ID . NO . FUNCTION. NUM . TIME .NAME .STATUS.
*==============.===========.====.===========.=====.========.===========.======.
Active User * MAPCOORD   2  SYS-STATUS   1002  22:36:53
Backgrnd User  DISPATCHER  2  wat *         -76  22:36:01  DISPATCHER
Backgrnd User  MAPQUE      2  wat *         -77  22:36:49  MAPQUE
```

### Expanded Output — Windows / Linux / UNIX (columns 81–154)

```
* LOCK .LOCK .LOCK . STA .LOCK .LOCK .LOCK .ELAPSED.USER .
* TYPE .NUMBER .DEVICE .READ .OWNER .DRAWER .REPORT .QTIME .PID .
*===========.========.===========.=====.======.=======.=======.=======.=======.
10407
9468
9466
```

### Expanded Output — Windows / Linux / UNIX (columns 155–170)

```
*RUN CNTRL.RUN .
* REPORT  .LINE .
*=========.=====.
```

### Current Output — OS 2200

```
.CURRENT SYSTEM ACTIVITY
* . USER .DEPT. MAPPER . STA . START .RUN .
* TYPE . ID . NO . FUNCTION . NUM . TIME .NAME .
*==============.===========.====.===========.=====.========.==========.
Active User    MAPCOORD    2    Display      99987  15:17:06
Active User  * MAPQUE      2    SRU *        99981  05:55:32  MAPQUE
```

---

## Screen Fields

| Field | Platform | Description |
|-------|----------|-------------|
| **Type** | All | Type of system activity. `Active User` = currently signed on; `Inactive User` = accessing the system but not signed on. An `*` in the last column indicates the station is currently processing. |
| **User-id** | All | User-id of the user signed on to the system. |
| **Dept No** | All | Department number of the signed-on user. |
| **MAPPER Function** | Linux / UNIX | Last function executed. An `*` in the last column indicates a run is currently processing. `Wrt Bkup xx` / `Rd Bkup xx` displayed for tape backups, where `xx` is the sequence number of the next tape to mount. `Memory wait` — notify the administrator to reconfigure more shared memory if this status persists. |
| **MAPPER Function** | Windows | Same as above. `Load tape!` — notify the operator to load the next backup media during timed purge. `Memory wait` — notify the administrator to reconfigure more shared memory if this status persists. |
| **MAPPER Function** | OS 2200 | Last function executed. An `*` in the last column indicates a run is currently processing. |
| **Sta Num** | All | Station number at which the user is signed on. |
| **Start Time** | All | Time the last run or function started. |
| **Run Name** | All | Run (if any) being executed at each station. |
| **Wait Status** | Windows / Linux / UNIX | Numeric code indicating why the function is in a wait status. Meaningful only as a system diagnostic tool for support personnel. |
| **Lock Type** | Windows / Linux / UNIX | Type of lock the user is waiting for. Values: `UNIT LOCK` (Unit Table), `RPT_TAB_LCK` (Conflict Table), `RID_TAB_LCK` (RID Table Entry), `ALLOCAT_LCK` (device), `TYP_TAB_LCK` (Type Table), `INIT_LCK` (Initialization), `MB_LOCK` (Master Block), `LOG_LOCK` (logging), `RPT_ENT_LCK` (Conflict Table Entry), `AUD_LCK` (Auditing). |
| **Lock Number** | Windows / Linux / UNIX | Number of a specific lock type. |
| **Lock Device** | Windows / Linux / UNIX | Device type for a lock type of `ALLOCAT_LCK`. Values: `CORE` (shared memory), `CACHE` (cache), `MASTER` (Master file), `RESULT` (Result file space), `RESERVED` (Reserved files), `SHARED` (Shared files), `AUDIT` (Audit files). |
| **Sta Read** | Windows / Linux / UNIX | Station that last opened the locked report. |
| **Lock Owner** | Windows / Linux / UNIX | Station holding the lock the user is waiting for. |
| **Lock Drawer** | Windows / Linux / UNIX | Drawer and cabinet of the Lock Type. |
| **Lock Report** | Windows / Linux / UNIX | Report number of the Lock Type. |
| **Elapsed Qtime** | Windows / Linux / UNIX | Amount of time waiting for a Lock Type. |
| **User PID** | Windows / Linux / UNIX | Process identifier. |
| **Run Cntrl Report** | Windows / Linux / UNIX | Cabinet, drawer, and report of the active run or subroutine. |
| **Run Line** | Windows / Linux / UNIX | Line number of the active run or subroutine. |

> **Note:** Some locking fields and run fields are not used at all times.

---

## Guidelines *(Windows / Linux / UNIX)*

Lock-related information is presented in columns 81–154 of the result produced by the System statement. The output format for the first 80 columns remains unchanged for compatibility.

The System statement uses drawer D of cabinet 4, generated with a line width of 256 characters. The zero report contains header information. Three output formats are defined:

- **Format 0** — Presents the current System statement information.
- **Format 1** — Presents the station number and lock-related fields (lock type, lock number, lock device, Sta Read, lock owner, lock drawer, lock report, and elapsed queue time).
- **Format 2** — Presents Run Cntrl Report and Run Line, replacing Type in the Format 0 display.

Since a format switch holds across resumes, you can track lock type information by switching to Format 1 and continuously pressing **Resume**.

Since drawer D cabinet 4 is the default result type for the System statement and a zero report defines header information, all System header information has been removed from the local language rid (`4G6`). However, user type (Active User and Background User) can still be modified using the local language rid.
