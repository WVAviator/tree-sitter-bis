# @CCR — COM Client Release Instance

## Overview

Releases one or more instantiated COM component objects, freeing their associated instance handles.

> **Platform:** Windows 2000 or later required.

### Related Statements

| Statement | Description |
|-----------|-------------|
| [@CCC](CCC.md) | COM Client Create Instance |
| [@CCG](CCG.md) | COM Client Get Property Value |
| [@CCI](CCI.md) | COM Client Invoke Method |
| [@CCP](CCP.md) | COM Client Put Property Value |

---

## Syntax

```
@CCR vch[,vch…] .
```

### Parameters

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `vch` | Required | `I` type variable(s) | Comma-separated list of variables containing the instance handles to release. |

---

## Behavior

### On Success
- Each valid instance handle is released and its associated component instance is freed.
- `STAT1$` is set to `0`.

### On Failure
- If one or more instances cannot be released, the run continues at the next statement. The statement has no `lab` parameter and does not error.

---

## Guidelines

- `@CCR` can release both **primary** and **secondary** instance handles:
  - *Primary handle* — returned by `@CCC`.
  - *Secondary handle* — returned by a component method or property as an `IDispatch` pointer.
- A combined maximum of **5** primary and secondary handles may exist concurrently in a session. Releasing handles with `@CCR` frees slots toward this limit.
- Multiple handles can be released in a single statement by providing a comma-separated list.

---

## Example

Releases the component instance identified by `<handle>`. Execution continues at the next statement.

```
@ccr <handle> .
```

Releasing multiple handles in one statement:

```
@ccr <handle1>,<handle2>,<handle3> .
```

> See [@CCI](CCI.md) for additional examples involving COM component interaction.
