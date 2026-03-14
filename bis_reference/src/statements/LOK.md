# @LOK — Update Lock

## Overview

Establishes update control of a report, preventing other users from updating it until the run releases control with the [`@ULK`](ULK.md) (Unlock) statement.

The following statements require a `@LOK` statement before executing:

[`@LNI`](LNI.md), [`@LNM`](LNM.md), [`@LNP`](LNP.md), [`@LNX`](LNX.md), [`@LN+`](LN+.md), [`@LN-`](LN-.md), [`@WRL`](WRL.md)

---

## Syntax

```
@LOK,c,d,r[,lab] .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `c,d,r` | Required | Report on which to set an update lock. |
| `lab` | Optional | Label to branch to if another user already has update control of the report. If omitted, the run stalls. |

---

## Reserved Words

`STAT1$` is set when the run branches to `lab`:

| Platform | STAT1$ Value |
|----------|-------------|
| Windows / Linux / UNIX | Station number of the user updating the report, or `0` if the report being locked is an executing run control report (RCR). |
| 2200 | Station number of the user who has the report locked. |

---

## Guidelines

- Always specify a label on `@LOK` so the run can continue if another user holds update control — otherwise the run stalls.
- *(2200 only)* When no label is specified, the run stalls for the duration set by the `UPWAIT` start parameter, then retries the `@LOK` statement. See your administrator for details.
- Update control is automatically released by [`@ULK`](ULK.md), another `@LOK` statement, or any of the following statements: [`@ADR`](ADR.md), [`@DEL`](DEL.md), [`@DFU`](DFU.md), [`@DLR`](DLR.md), [`@DUP`](DUP.md), [`@EXT`](EXT.md), `@GTO END`, [`@REP`](REP.md), [`@UPD`](UPD.md).
- *(2200 only)* The following statements also release update control: [`@AUX`](AUX.md), [`@SEN`](SEN.md), [`@SNU`](SNU.md), [`@SOR`](SOR.md).
- If the run is a linked run, `@GTO END` does **not** release update control.
- The system also releases update control whenever a run terminates.

---

## Example

Request update control of report `3B0`. If another user holds update control, branch to label 99 and check `STAT1$` for the station number:

```
@lok,0,b,3,099 .
.
. (other processing)
.
@099:if stat1$ EQ 1 gto 100 ; .
```

| Part | Description |
|------|-------------|
| `0,b,3` | Lock report `3B0` |
| `099` | Branch to label 99 if another user has update control |
| `stat1$` | Contains the station number of the user who holds update control |
