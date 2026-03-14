# @CCC — COM Client Create Instance

## Overview

Creates an instance of a Microsoft Component Object Model (COM) component.

> **Platform:** Windows 2000 or later required.

### Related Statements

| Statement | Description |
|-----------|-------------|
| [@CCG](CCG.md) | COM Client Get Property Value |
| [@CCI](CCI.md) | COM Client Invoke Method |
| [@CCP](CCP.md) | COM Client Put Property Value |
| [@CCR](CCR.md) | COM Client Release Instance |

---

## Syntax

```
@CCC[,lab] prog-id vch [vmsg] .
```

### Parameters

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `lab` | Optional | Label | Branch destination if the component cannot be created. If omitted and creation fails, the run errors. |
| `prog-id` | Required | String literal | The registered name (ProgID) of the component to create. |
| `vch` | Required | `I` type variable | Receives the instance handle on success. |
| `vmsg` | Optional | `S` type variable | Captures the COM error message text if the operation fails. |

---

## Behavior

### On Success
- A new instance of the specified component is created.
- The instance handle is stored in `vch`.
- `STAT1$` is set to `0`.

### On Failure
- Execution branches to `lab` (if specified).
- `STAT1$` contains the `HRESULT` or Windows error code.
- `vmsg` contains a human-readable description of the error.
- If `lab` is not specified, the run errors.

> **Best Practice:** Always specify both `lab` and `vmsg` to handle errors gracefully. Also check `STAT1$` at the contingency label.

---

## Guidelines

- **Instance handle types:**
  - *Primary handle* — returned directly by `@CCC`.
  - *Secondary handle* — returned by a component method or property as an `IDispatch` pointer.
  - A combined maximum of **5** primary and secondary handles may exist concurrently in a session.

- **Scope:** Instance handles are valid across subroutine boundaries (e.g., passed as `CALL` arguments or returned to a caller), but **not** across application boundaries. All handles are released and their variables set to zero when the application terminates or executes a `LNK` statement.

- **Security / Identity:** Components are created under the current session's user identity:
  - *Local GUI sessions:* the Windows login from the connection script.
  - *All other session types:* the configured guest login (default: `CoolICEGuest` or `MAPPERGuest`).
  - Component access and launch permissions must be configured to allow creation by that identity.
  - For components hosted on a remote machine, the local Windows login and password must be valid on that remote machine.

---

## Scalability — "Server Execution Failed" Error

If a `Server execution failed` error occurs, check the Windows System Event Viewer for the following DCOM event:

- **Event ID:** `10010`
- **Description:** `The server {class id} did not register with DCOM within the required timeout`
  - `{class id}` is the GUID of the component object class.

Refer to the *Business Information Server for Microsoft Windows Administration Help* for guidance on COM scalability configuration.

---

## Example

Creates an instance of a component named `Prog.Mail`. The instance handle is stored in `<handle>`. If creation fails, execution jumps to label `199` and `<vmsg>` contains the error description.

```
@ccc,199 'Prog.Mail' <handle>i2 <vmsg>s80 .
```

> See [@CCI](CCI.md) for additional examples involving COM component method invocation.
