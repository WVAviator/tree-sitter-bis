# @RSR — Run Subroutine

## Overview

Use the `@RSR` statement to execute an external or internal subroutine starting at a specified label. The system transfers control to a subroutine within the same run control report (an **internal subroutine**) or to one in another report (an **external subroutine**).

> *(2200 only)* External subroutines must be in the same character set type as the calling run control report.

> **Note:** Do not place other statements on the same line after `@RSR` — any statements following it on the same line will be ignored. Put the next statement on a new line.

If you need to save the contents of all currently defined variables and pass control to a subroutine, use the [`@CALL`](CALL.md) statement instead. `@CALL` allows you to pass variables to the subroutine, manipulate them, and pass them back to the calling run without affecting any other currently defined variables.

---

## Syntax

```
@RSR{,c,d,r lab | lab} .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `c,d,r` | Optional | Report containing the external subroutine. Omit for internal subroutines. |
| `lab` | Required | Label where the subroutine starts. To begin at the first line of an external run control report, use `LIN1`. |

---

## Reserved Words

| Word | Description |
|------|-------------|
| `ACDRW$` | Use in an external subroutine to determine the drawer of the calling run control report. |
| `CRPT$` | Use in an external subroutine to determine the report number of the calling run control report. |

---

## Guidelines

- All variables and results from the calling run are accessible within subroutines. Newly created variables and results in the subroutine become available when control returns to the calling run. However, if the subroutine reinitializes variables or renames results from the calling run, it will overwrite them.
- Subroutines can be nested up to **10 levels** deep (internal subroutines calling other subroutines), but only **one external subroutine** can be called at a time.
- Use an [`@ESR`](ESR.md) (Exit Subroutine) statement to exit the subroutine and return control to a specified line in the run control report, relative to the line containing the calling `@RSR` statement.
- Use a [`@CSR`](CSR.md) (Clear Subroutine) statement within an external subroutine to execute another external subroutine. Note that `@CSR` does not allow a return to the original calling run control report via `@ESR`.
- When registering your run, inform the administrator of any other run control reports containing external subroutines.

---

## Examples

### Internal Subroutine

Executes the subroutine at label `001`. When the subroutine ends, control returns to the line following the `@RSR` statement (run statement A):

```bismapper
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

### External Subroutine

Executes an external subroutine at label `002` in report `2E0`:

```bismapper
@rsr,0,e,2 002 .
```

### Nesting Subroutines

The first `@RSR` executes the subroutine at label `001`. That subroutine uses another `@RSR` to execute a subroutine at label `002`. When the second subroutine completes, `@ESR` returns to run statement B; when that completes, another `@ESR` returns to run statement A:

```bismapper
@ rsr 001 .          (go to first subroutine)
. (run statement A)
@ gto end .
@001: .              (first subroutine)
.
@ rsr 002 .          (go to second subroutine)
. (run statement B)
.
@ esr .              (returns to run statement A)
@002: .              (second subroutine)
.
@ esr .              (returns to run statement B)
```

---

## See Also

- [`@CALL`](CALL.md) — Call Subroutine
- [`@ESR`](ESR.md) — Exit Subroutine
- [`@CSR`](CSR.md) — Clear Subroutine
- [`@GTO`](GTO.md) — Go To
