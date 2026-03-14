# @RAR (Register Abort Routine)

## Overview

Registers a routine to be executed if the user aborts a run by pressing Abort. Since all variables, temporary results, and the current output area remain unaltered and accessible to the abort routine, the routine can capture information being processed at the time of the abort. `@RAR` can also be used in a background run to register an abort routine for use with the Stop function.

If a user aborts a run that has an abort routine registered, the system runs the abort routine and cancels any previously registered abort and error routines and update locks.

> **Note:** *(2200 only)* External abort routines must be in the same character set type as the calling run control report.

---

## Syntax

```
@RAR[,c,d,r] lab .
```

### Parameters

| Field | Description |
|-------|-------------|
| `c,d,r` | Report containing the external routine. Default = current `c,d,r`. |
| `lab` | Label in the report where the abort routine begins. Use `LIN1` to begin at the first line of the external run control report. |

---

## Reserved Words

The following reserved words contain zero until a run aborts:

| Word | Description |
|------|-------------|
| `ACTINP$` | Handle of the main window (`WND$`). |
| `AXDRW$` | Drawer letter of the run control report where the run aborted. |
| `XDRW$` | Drawer number of the run control report where the run aborted. |
| `XFUN$` | Run function call last executed before the run aborted. |
| `XLINE$` | Line number in the run control report where the run aborted. |
| `XRPT$` | Report number of the run control report where the run aborted. |

The system resets these reserved words to zero whenever the run executes a noninterim display with the following statements:

- *(Windows / Linux / UNIX)* [`@DSG`](DSG.md), [`@DSM`](DSM.md), [`@DSP`](DSP.md), [`@OUT`](OUT.md), [`@SC`](SC.md)
- *(2200 only)* [`@DSG`](DSG.md), [`@DSM`](DSM.md), [`@DSP`](DSP.md), [`@INP`](INP.md), [`@MBX`](MBX.md), [`@OUT`](OUT.md), [`@SC`](SC.md)

---

## Guidelines

- Place `@RAR` as close as possible to the beginning of the run. If the user aborts before `@RAR` executes, no abort routine is registered.
- The system cancels the abort routine when the run terminates. You can also cancel it explicitly with the [`@CAR`](CAR.md) (Clear Abort Routine) statement.
- If a user presses Abort while an abort routine is already executing, the run aborts immediately.
- Every called routine (via the [`@CALL`](CALL.md) statement) should have its own abort routine registered; otherwise results may be unpredictable.
- Abort routines registered in called routines override previously registered routines. When control returns to the calling run, the system automatically re-registers the original abort routine.
- If no abort routine is registered in a called routine and the user aborts, control goes to the abort routine in the calling run.
- Cabinet restrictions from the run also apply to the abort routine.
- A noninterim display in the abort routine (via `DSG`, `DSM`, `DSP`, `INP`, `MBX`, `OUT`, or `SC`) continues normal run processing when a user tries to abort during the abort routine.
- *(Windows / Linux / UNIX)* `IO$` and `LLP$` reflect the number of I/Os and LLPs used in both the abort routine and the run.
- *(2200 only)* `IO$` and `LLP$` reflect the number of I/Os and LLPs used in the abort routine itself only.
- *(Windows / Linux / UNIX)* The abort routine cannot contain `GTO`, `RPX`, `RAR`, `RER`, or `RUN`. An `RSR` statement may be used only if it starts an internal subroutine.
- *(2200 only)* The abort routine cannot contain `GTO`, `RPX`, `LNK`, `RAR`, `RER`, or `RUN`. An `RSR` statement may be used only if it starts an internal subroutine.

---

## Example

Register the external abort routine at label `5` in report `4E0`:

```
@RAR,0,E,4 0005 .
```
