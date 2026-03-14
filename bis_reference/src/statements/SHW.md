# @SHW — Show Control

## Overview

Use the `@SHW` statement to temporarily redisplay an existing control or form. A control can be any of the following types: `BTN` (Button), `CBX` (Combo Box), `EDT` (Edit Box), `LST` (List Box), `PIC` (Picture), `TXT` (Text Box), or `WIN` (Window).

> **Note:** Do not use `@SHW` on DDE conversation handles.

This statement requires a workstation session using one of the following clients:

- Graphical Interface for Business Information Server
- Business Information Server for Microsoft Windows Client

> If the session is using one of the above clients, the reserved word `WS$` (workstation flag) equals `1`.

---

## Syntax

```
@SHW[,vwh,...,vwh] .
```

where `vwh` is a variable containing the handle of the control to display. If a window handle is specified, all controls within that window are displayed. Default = all controls attached to the main window. Maximum = 80 entries.

---

## Example

Displays the controls whose handles reside in variables `<toolist>` and `<gettool>`:

```bismapper
@shw,<toolist>,<gettool> .
```

---

## See Also

- [`@CLS`](CLS.md) — Close Control
- [`@HID`](HID.md) — Hide Control
