# @RER (Register Error Routine)

## Overview

Registers a routine to be executed if the script encounters an error. Since all variables, temporary results, and the current output area remain unaltered and accessible to the error routine, the routine can be used to help debug the script.

If an error occurs, the system runs the registered error routine and cancels any previously registered abort and error routines and update locks.

> **Note:** *(2200 only)* External error routines must be in the same character set type as the calling run control report. See also `DIAG` for collecting diagnostic information.

---

## Syntax

*(Windows / Linux / UNIX)*
```
@RER[,c,d,r] lab .
```

*(2200 only)*
```
@RER[,c,d,r] lab[,opts] .
```

### Parameters

| Field | Platform | Description |
|-------|----------|-------------|
| `c,d,r` | All | Report containing the external routine. Defaults to the current `c,d,r`. |
| `lab` | All | Label in the report where the error routine begins. Use `LIN1` to begin at the first line of the external run control report. |
| `opts` | 2200 only | Diagnostic options. See [Diagnostic Options](#diagnostic-options). |

---

## Diagnostic Options *(2200 only)*

| Option | Description |
|--------|-------------|
| `C` | Call stack compatibility with BIS for Windows. When a script error occurs, do not unwind the call stack and local variables back to the call level of the original RER registration. |
| `J` | Enable Jump History collection. See [Jump History Collection](#jump-history-collection). |
| `H` | Halt Jump History collection. |
| `P` | Protect the variables at this call level from examination by the `DIAG` statement at higher call levels. |

### Jump History Collection *(2200 only)*

Jump History tracks the most recent jumps in the script — including jumps to labels, jumps to lines, calls to subroutines, jumps to error routines (RER target), and abort routines (RAR target). The number of entries tracked is never less than 100.

Jump History can be retrieved at any time by the `DIAG` statement. If `DIAG` is executed inside an RER routine, it reports a snapshot of the Jump History at the time of the error.

Once activated, Jump History stays active until the script exits the CALL level where it was activated. For example, if activated at CALL level 2, it remains active through CALL levels 3 and above. When control returns to CALL level 1 (which did not have collection active), Jump History collection is halted.

To enable Jump History for an entire application, add the `J` option to the RER in the main body (CALL level 0) of the script only — subroutines at higher CALL levels do not need to re-specify it.

> **Note:** Enabling Jump History has a minor performance impact. Testing showed approximately 2.2% degradation in a tight loop executed 500,000 times. Scripts that include database access (`SRH`/`CAL`/`SOR`/`TOT`) spend more wall time on I/O, so the practical impact is typically much less.

---

## Reserved Words

The following reserved words contain zero until a script fails:

| Word | Description |
|------|-------------|
| `AXDRW$` | Drawer letter of the run control report where the script erred. |
| `XDRW$` | Drawer number of the run control report where the script erred. |
| `XERR$` | Message number of the error. Use with [`@LSM`](LSM.md) to retrieve the message text. |
| `XFUN$` | Run function call of the statement that erred. |
| `XLINE$` | Line number in the run control report where the script erred. |
| `XRPT$` | Report number of the run control report where the script erred. |

The system resets these reserved words to zero when:

- *(Windows / Linux / UNIX)* The script references `CERR$`, or executes a noninterim display with [`@DSG`](DSG.md), [`@DSM`](DSM.md), [`@DSP`](DSP.md), [`@OUT`](OUT.md), or [`@SC`](SC.md).
- *(2200 only)* The script executes a noninterim display with [`@DSG`](DSG.md), [`@DSM`](DSM.md), [`@DSP`](DSP.md), [`@INP`](INP.md), [`@MBX`](MBX.md), [`@OUT`](OUT.md), or [`@SC`](SC.md).

---

## Guidelines

- Place `@RER` as close as possible to the beginning of the script. If an error occurs before `@RER` executes, the script has no error routine to go to.
- The system cancels the error routine when the script terminates. You can also cancel it explicitly with the [`@CER`](CER.md) (Clear Error Routine) statement.
- If an error occurs while an error routine is executing, the script terminates with a normal system message.
- Every called routine (via [`@CALL`](CALL.md)) should have an error routine registered; otherwise results may be unpredictable.
- Error routines registered in called routines override previously registered routines. When control returns to the calling script, the system automatically re-registers the original error routine.
- If no error routine is registered in the called routine and an error occurs, control goes to the error routine in the calling script.
- You can use an [`@RSR`](RSR.md) statement in an error routine only if it starts an internal subroutine.
- Cabinet restrictions from the script also apply to the error routine.
- A noninterim display in the error routine (via `DSG`, `DSM`, `DSP`, `INP`, `MBX`, `OUT`, or `SC`) continues normal script processing.
- *(Windows / Linux / UNIX)* The error routine cannot contain `GTO`, `RPX`, `RAR`, `RUN`, or `RER`. `IO$` and `LLP$` reflect I/Os and LLPs used in both the error routine and the script. Any reference to `CERR$` clears both `CERR$` and `XERR$` and continues normal script processing.
- *(2200 only)* The error routine cannot contain `GTO`, `RPX`, `LNK`, `RAR`, `RTN`, `RUN`, or `RER`. `IO$` and `LLP$` reflect I/Os and LLPs used in the error routine itself only.

---

## Example

Register the external error routine at label `5` in report `2E0`:

```
@RER,0,E,2 0005 .
```

---

## Using the RUNERR Routine

The RUNERR error subroutine can be used as a debugging tool during development or as an error notification routine in production scripts. It provides the following information on error:

- System message
- Failing script name and run control report location
- Failing line number and statement
- User-ID, station, and department of the script user
- Date and time of the failure
- Variable definitions and contents at the time of failure
- First 25 lines of the output area, `-0`, and all existing renamed reports

### Setup

Register the routine at the beginning of your script:

*(2200 only)*
```
@RER,0,F,2 0001 .   \ Full character set or JavaScript script
@RER,0,E,2 0001 .   \ Limited character set script
```

*(Windows / Linux / UNIX)*
```
@RSR,0,E,2 0100 .   \ Optional — reserves necessary space
@RER,0,E,2 0001 .   \ Required — registers the RER
```

### Configuration Variables

**`v190`** — Controls where the error dump is sent. If not loaded, the dump is displayed on the user's screen.

- *(Windows / Linux / UNIX)* Load with `user-id[,dept,sl]` to send to a user (no spaces allowed). Example: `@LDV,wp v190H18='mapcoord,2' .`
- *(2200 only)* Load with `user-id`. Example: `@LDV,wp v190H18='mapcoord' .`
- All platforms: Load with a station number to send to a specific station. Example: `@LDV v190I5=999 .`

> **Note:** *(2200 only)* Variables `v192` through `v199` are used internally by RUNERR — do not use them in your script.

> **Note:** *(Windows / Linux / UNIX)* RUNERR uses global variables only. The global variable requirement is 25 variables and 2000 bytes. Reserved global variable names include `<*calldate>`, `<*calltime>`, `<*callmsec>`, `<*Sessionid>`, `<*lgc>`, and variables with the `<*RER#...>` prefix — avoid these names in your scripts. RUNERR also references `v190` and `v191`.

**`v191`** — Load with a text string containing contact information for the script designer (displayed to the user on error). Example: `@LDV v191s80='J.Doe -- Ext 7418' .`

### Outcome

The error dump is sent to the station specified by `v190`, or displayed on the screen that executed the script if `v190` is blank. If `v190` contains a valid user-ID or station number, the dump is routed accordingly.

To toggle the display between the error dump and the failing run control report, press **Resume**.

> **Note:** *(Windows / Linux / UNIX)* RUNERR does not send error message `MGRX73` (script exceeded maximum LLP limit) as an RER error dump. Add 5,000–10,000 extra lines to the run registration LLP limit to allow for error dump processing.
