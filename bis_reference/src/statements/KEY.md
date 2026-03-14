# @KEY — Function Key Input

## Overview

Obtains a number via `FKEY$` indicating which function key the run user pressed to move on from a noninterim [`@DSP`](DSP.md), [`@DSM`](DSM.md), [`@OUT`](OUT.md), or [`@SC`](SC.md) display. Place `@KEY` before the display statement.

> **Note:** A noninterim display remains on screen until the run user transmits or resumes.

Use `@KEY` only with output displays that do not use a function key bar — the functions on a function key bar override the effect of `@KEY`. For information on function key bars, see [`@SC`](SC.md) (Screen Control) and [`@FKY`](FKY.md) (Function Key).

When the run user presses a function key after a noninterim display, the run continues executing at the statement following the `@DSP`, `@DSM`, `@OUT`, or `@SC` statement.

---

## Syntax

```
@KEY .
```

---

## Reserved Words

`FKEY$` contains a number indicating which function key was pressed. Contains `0` if the run user pressed **Transmit** with the cursor positioned below the control line.

---

## Example

Request function key input, then display a report using `@OUT`. After these statements, test `FKEY$` to proceed accordingly:

```
@key .
@out,-0,4,1 .
```
