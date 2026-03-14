# @USE — Use Variable Name

## Overview

Associates a name with a numbered variable, allowing the variable to be referenced by either its name or its number.

---

## Syntax

```
@USE name=v[,name=v,...,name=v] .
```

### Parameters

| Field | Description |
|-------|-------------|
| `name` | Name to associate with the variable. |
| `v` | Numbered variable to associate the name with. To define the variable at the same time, include the type and size (e.g., `v100i5`). |

---

## Guidelines

- Normally, a named variable can only be referred to by name and not by number. Variables assigned via `@USE` can be referred to by either.
- As a rule, avoid mixing named and numbered variables within the same run. An exception may arise when calling an external subroutine that uses numbered variables from a run that uses named variables.
- Multiple names can be assigned in a single `@USE` statement. Variables can optionally be initialized at the same time by including the variable type and size with the variable number.

---

## Examples

Assign the name `station` to `v100` and define it as a 5-character integer variable:

```
@use station=v100i5 .
```

Assign the name `report` to `v101` without defining a type or size:

```
@use report=v101 .
```
