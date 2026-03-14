# @CHD — Command Handler

## Overview

Registers a routine to be executed whenever the user enters information on the control line after a [`@DSP`](DSP.md) (Display Report), [`@DSM`](DSM.md) (Display Message), [`@OUT`](OUT.md) (Output), or [`@SC`](SC.md) (Screen Control) statement.

> **Advanced Use Only:** The `@CHD` statement is intended primarily for intercepting and interpreting commands that are normally processed by the software. Use only if you are an advanced application designer.

---

## Syntax

```
@CHD[,c,d,r,rel?] lab .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `c,d,r` | Optional | Report containing the command handler routine. Specify only if the routine is in another run control report. On 2200 systems, this report must be in the same character set type as the calling run control report. |
| `rel?` | Optional | Transfer release control to the run? `Y` or `N`. If `Y`, the run user cannot execute the Release Display (`^`) command because the caret is intercepted by the run. Default = `N`. |
| `lab` | Required | Label where the command handler routine starts. Use `0` to cancel the currently registered handler. Use `LIN1` to begin at the first line of an external run control report. |

---

## Behavior

With a `@CHD` statement active, the run intercepts and processes control line input rather than the software — with the following specifics:

- **Release Display (`^`)** is still handled by the software unless `rel?` is set to `Y`.
- **Function key pressed:** The run continues at the next line after the `@DSP`/`@DSM`/`@OUT`/`@SC` statement (not in the CHD routine). If function key mapping is in effect, the run does not continue unless the key is mapped to `rsm` or `KEY`. When mapped function keys are used with `@CHD`, the key is processed and results are returned to `@CHD`. See [`@SC`](SC.md) and [`@FKY`](FKY.md) for key mapping information.
- **Control line transmit:** The run continues at the specified CHD routine and cancels any active subroutines.
- **SOE updates:** Any SOE updates to reports while `@CHD` is active will resume the run, and no updates occur to the displayed report.

---

## Reserved Words

### `ICVAR$`
Captures user input from the control line on transmit.

- Use only with a `@CHD` statement.
- Place `ICVAR$` before the variable in a [`@CHG`](CHG.md) statement, and put the `@CHG` statement before the `@DSP`, `@DSM`, `@OUT`, or `@SC` statement.
- Use an `S`-type variable. `A`-type or `H`-type variables may also be used if the data fits. All input (except leading tab characters) is copied into the variable up to its length.

### `FKEY$`
Captures the number of the function key pressed.

- Contains the function key number when a function key is pressed.
- Contains `0` if the user pressed **Transmit** with the cursor positioned below the control line.
- When a function key is pressed, execution continues at the statement following the `@DSP`/`@DSM`/`@OUT`/`@SC` statement — not at the CHD routine.

---

## Guidelines

- Use `@CHD` only in an application's **initial run control report**. Do not invoke it from within a subroutine (`CALL` or `RSR`) — doing so leads to unpredictable results.
- The [`@INP`](INP.md) (Accept Input) statement intercepts and interprets control line data, overriding the effect of `@CHD`.

---

## Examples

Transfer control to label `52` when the user transmits from the control line:
```
@chd 052 .
```

Transfer control to label `100` when the user enters a caret (`^`) and transmits (caret intercepted by the run):
```
@chd,,,,y 100 .
```

Cancel the currently registered command handler routine:
```
@chd 0 .
```

### Using `ICVAR$`, `INVAR$`, and `FKEY$`

```
@chd 010 .
@chg icvar$ <controlln>s80 .
@chg invar$ <input1>a5,<input2>a5 .
@brk .
data1| data2|
@brk out,-0,2,2,,1,y .
@if fkey$ = 0,(030),1,(040),2,(050) ; .
```

**Outcomes:**

| Trigger | Result |
|---------|--------|
| User presses **Transmit** from the control line | Run goes to label `10`; `<controlln>` captures control line input (from last SOE character or home position). |
| User presses **Transmit** with cursor below the control line | Run goes to label `30`; `<input1>` and `<input2>` capture data input. |
| User presses **F1** | Run goes to label `40`. |
| User presses **F2** | Run goes to label `50`. |
