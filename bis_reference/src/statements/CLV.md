# @CLV — Clear Variables

## Overview

Clears the definitions and contents of a set of numbered variables.

> **Caution:** Use `@CLV` carefully to avoid inadvertently clearing named variables. Since the statement uses numbers to define which variables to clear, use only numbered variables when clearing a partial set.

> *(2200 only)* When `@CLV` is used on a named variable, it clears only the size, type, and contents — not the variable's name.

---

## Syntax

```
@CLV[{,o | ,startv,q}] .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `startv` | Optional | Number of the first variable in the set to clear. If omitted (along with `q`), all variables in the run are cleared. |
| `q` | Optional | Number of consecutive variables to clear starting at `startv`. If omitted, all variables from `startv` onward are cleared. |
| `o` | Optional | Options subfield. See [Options](#options). Cannot be combined with `startv,q`. |

---

## Options

| Option | Platform | Description |
|--------|----------|-------------|
| `E` | Windows / Linux / UNIX | Clears all assigned environmental session variables. |
| `G` | All | Clears all assigned global run variables. |

---

## Guidelines

- Typically used to release string variable space, of which only a limited amount is available. Freed space can then be reused for other variables.
- *(Windows / Linux / UNIX)* `@CLV` clears any named variable associated with a numbered variable through the `USE` statement.
- For information on variable arrays, see [`@LDA`](LDA.md) (Load Variable Array) and [`@CALL`](CALL.md) (Call Subroutine).
