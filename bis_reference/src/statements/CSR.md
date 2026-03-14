# @CSR — Clear Subroutine

## Overview

Clears the return path to the calling run from within an external subroutine, allowing a [`@RSR`](RSR.md) (Run Subroutine) statement to call another external subroutine.

> **Note:** Once `@CSR` is executed, returning to the calling run is no longer possible.

Use `@CSR` in conjunction with the corresponding [`@RSR`](RSR.md) statement.

---

## Syntax

```
@CSR .
```

### Parameters

None.

---

## Guidelines

- `@CSR` must be called in the external subroutine **before** calling another external subroutine via `@RSR`.
- Can also be used in place of [`@ESR`](ESR.md) (Exit Subroutine) when returning to the calling run is not desired.
- When registering your run, inform the administrator of any other run control reports containing external subroutines.
