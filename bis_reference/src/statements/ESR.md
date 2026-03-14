# @ESR — Exit Subroutine

## Overview

Exits a subroutine and returns to a specified line in the run control report, relative to the line containing the calling [`@RSR`](RSR.md) (Run Subroutine) statement. Use `@ESR` in conjunction with the corresponding `@RSR` statement.

> **Note:** When `@RSR` calls another `@CALL` function that has an `@RER` statement within it, any command failure inside the `@CALL` function causes the `@ESR` statement to fail. This error occurs when an `@RSR`, `@CSR`, or `RETURN` statement is encountered but does not match the current subroutine type. For example, if an `@RSR` is issued and that subroutine contains a `@CALL` statement, a `RETURN` must be processed before an `@ESR` or `@CSR` can be issued. Similarly, if a `@CALL` subroutine contains an `@RSR` statement, an `@ESR` or `@CSR` must be processed before a `RETURN` can be performed.

---

## Syntax

```
@ESR[{,q | ,-q}] .
```

where `q` is the relative number of lines after or before the `@RSR` statement to return to. Use positive numbers for lines following the `@RSR` statement, negative numbers for lines preceding it. Default = the line immediately after the `@RSR` statement.

---

## Guidelines

Do not place other statements on the same line after `@ESR` — they will be ignored. Put the next statement on a new line.

---

## Example

Execute the subroutine at label `1`. When the subroutine ends, return to the line following the `@RSR` statement (run statement A):

```
@ rsr 001 .
. run statement A .
. run statement B .
. run statement C .
@ gto end .
@001: . (subroutine)
.
. (other processing)
.
@ esr .
```

To return to run statement B instead (one line after the `@RSR` statement), use:

```
@ esr,1 .
```
