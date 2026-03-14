# @TIP — Tool Tip

## Overview

Defines a tool tip for a GUI control. The tool tip is displayed when you place your mouse over the control. Tool tips are for display purposes only — the statement does not return data.

Applicable GUI controls: `BTN`, `CBX`, `EDT`, `LST`, `PIC`, and `TXT`.

> **Requirement:** This statement requires a workstation session using one of the following clients:
> - Graphical Interface for Business Information Server
> - Business Information Server for Microsoft Windows Client
>
> When using either of these clients, the reserved word `WS$` (workstation flag) equals `1`.
>
> Check `DWCAP$` for availability: `DWCAP$(12-1) = 1` if available. For more information on `DWCAP$`, see the Developer's Guide.

---

## Syntax

```
@TIP,"tip text",vwh[,,lab] .
```

### Parameters

| Field | Description |
|-------|-------------|
| `"tip text"` | Text for the tool tip window. Maximum = 256 characters. |
| `vwh` | Control handle that the tool tip applies to. |
| `lab` | Label to continue processing at if the `@TIP` statement fails within the workstation client. Run syntax errors do not take this label. |

---

## Reserved Words

If a label is specified and the statement receives an error from the workstation client, the run continues at the label and `STAT1$` contains the error status. See *Graphical Interface Returned Status Codes (STAT1$ Values)* for possible values.

> **Note:** If a run syntax error is detected, the run will error and will not continue at the specified label.

---

## Example

Uses `@TIP` to define a tool tip for a `@PIC` control:

```
@pic,0,a,3,y,'rose.bmp()' 'Rose' <petals>i6 .
@tip,"A rose by any other name would still be a rose",<petals> .
```

| Field | Description |
|-------|-------------|
| `"A rose by any other name would still be a rose"` | Tool tip text displayed when the mouse is placed over the picture. |
| `<petals>` | Handle for the picture control. |
