# @INC — Increment Variable

## Overview

Increases the value of one or more numeric variables.

---

## Syntax

```
@INC[,n] v[,v,...,v] .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `n` | Optional | Amount by which to increase the variable value. Specify as a literal, variable, constant, or reserved word. Default = `1`. Accepts floating point or integer values. |
| `v` | Required | Name of the variable to increment. Must contain only numeric data; type `S` (string) variables are not allowed. **2200:** If the variable contains non-numeric data, its value is not changed. **Windows / Linux / UNIX:** If the variable contains non-numeric data, the result is undefined. |

---

## Examples

Increase `<counter>` by `1`:
```
@inc <counter> .
```

Increase `<counter>` by `10`:
```
@inc,10 <counter> .
```

Increase `<counter>` by the value of `<currenttot>`:
```
@inc,<currenttot> <counter> .
```
