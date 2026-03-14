# @DEC — Decrement Variable

## Overview

Decreases the value of one or more numeric variables. See also [`@INC`](INC.md) (Increment Variable).

---

## Syntax

```
@DEC[,n] v[,v,...,v] .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `n` | Optional | Amount by which to decrease the variable(s). Can be a literal, variable, constant, or reserved word. Default = `1`. |
| `v` | Required | Variable(s) to decrement. Must contain only numeric data; cannot be an `S`-type variable. Separate multiple variables with commas. |

> **If the variable contains non-numeric data:**
> - *(2200)* The variable's value is not changed.
> - *(Windows / Linux / UNIX)* Results are undefined.

---

## Examples

Decrease `<counter>` by 1:
```
@dec <counter> .
```

Decrease `<counter>` by 10:
```
@dec,10 <counter> .
```

Decrease `<totalcost>` by the value of `<discount>`:
```
@dec,<discount> <totalcost> .
```
