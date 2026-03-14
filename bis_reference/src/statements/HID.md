# @HID — Hide Control

## Overview

Temporarily removes a control from the screen without closing it. The control still exists and can be redisplayed using the [`@SHW`](SHW.md) (Show Control) statement.

This is similar to the [`@CLS`](CLS.md) (Close Control) statement, except that `@HID` does not destroy the control.

Supported control types: [`@BTN`](BTN.md) (Button), [`@CBX`](CBX.md) (Combo Box), [`@EDT`](EDT.md) (Edit Box), [`@LST`](LST.md) (List Box), [`@PIC`](PIC.md) (Picture), [`@TXT`](TXT.md) (Text Box), [`@WIN`](WIN.md) (Window). If the control is a window, any controls within it are also hidden.

This statement requires a workstation session using one of the following clients:

- Graphical Interface for Business Information Server
- Business Information Server for Microsoft Windows Client

> **Note:** If this session is using either of the above clients, the reserved word `WS$` (workstation flag) is equal to `1`.

---

## Syntax

```
@HID[,vwh,...,vwh] .
```

where `vwh` is a variable containing the control handle of the control to hide. Default = all controls. Maximum = 80 entries.

> **Note:** `@HID` should not be used with DDE conversation handles.

---

## Example

Temporarily remove the controls whose handles are stored in `<shapes>` and `<sizes>`:

```
@hid,<shapes>,<sizes> .
```
