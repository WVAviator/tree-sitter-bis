# @CLS — Close Control

## Overview

Closes a control or ends a Dynamic Data Exchange (DDE) conversation.

Closeable control types are: `BTN` (Button), `CBX` (Combo Box), `EDT` (Edit Box), `LST` (List Box), `PIC` (Picture), `TXT` (Text Box), and `WIN` (Window). Closing a `WIN` control also closes all controls contained within that window.

> **Session Requirement:** This statement requires a workstation session using one of the following clients:
> - Graphical Interface for Business Information Server
> - Business Information Server for Microsoft Windows Client
>
> When using either of these clients, the reserved word `WS$` (workstation flag) equals `1`.

See also [`@HID`](HID.md) (Hide Control) and [`@SHW`](SHW.md) (Show Control).

---

## Syntax

```
@CLS[,vwh,...,vwh] .
```

### Parameters

| Field | Description |
|-------|-------------|
| `vwh` | Variable containing the handle of the control to close. When closed, the variable is set to `0`. Default = all controls. Maximum = 80 entries. |

**Note:** Control handles closed *indirectly* (contained within a closed window but not explicitly listed in the statement) are **not** set to `0`.

---

## Example

Closes the active controls whose handles are stored in `<tools>` and `<shapes>`:

```
@cls,<tools>,<shapes> .
```
