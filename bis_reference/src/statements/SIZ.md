# @SIZ — Control Size

## Overview

Use the `@SIZ` statement to obtain the size of a control. Control Size returns the vertical and horizontal size of a control specified in the statement. `@SIZ` can be applied to all GUI controls: `BTN`, `CBX`, `EDT`, `LST`, `PIC`, `TXT`, and `WIN`.

This statement requires a workstation session using one of the following clients:

- Graphical Interface for Business Information Server
- Business Information Server for Microsoft Windows Client

> **Notes:**
> - If the session is using one of the above clients, the reserved word `WS$` (workstation flag) equals `1`.
> - Check `DWCAP$` for availability: `DWCAP$(12-1) = 1` if available. See the *Developer's Guide* for more information on `DWCAP$`.
> - Availability of `nvsiz`, `nhsiz`, `ovsiz`, and `ohsiz` fields: `DWCAP$(13-1) = 1` if available.

---

## Syntax

```
@SIZ,vwh[,lab]
[vsiz,hsiz,nvsiz,nhsiz,ovsiz,ohsiz] .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `vwh` | Required | Handle of the control. |
| `lab` | Optional | Label to go to if the `@SIZ` statement fails within the workstation client. Run syntax errors do not take the label. |
| `vsiz` | Optional | Variable to capture the inside vertical size of the control, in the units defined for the control. |
| `hsiz` | Optional | Variable to capture the inside horizontal size of the control, in the units defined for the control. |
| `nvsiz` | Optional | Variable to capture the inside vertical size of the control, in the units *not* defined for the control. |
| `nhsiz` | Optional | Variable to capture the inside horizontal size of the control, in the units *not* defined for the control. |
| `ovsiz` | Optional | Variable to capture the outside vertical size of the object, in positioning units. |
| `ohsiz` | Optional | Variable to capture the outside horizontal size of the object, in positioning units. |

> **Note:** When a control is defined using the `Y` option, `@SIZ` provides dimensions first in positioning units, then in row and column units. The `Y` option indicates that control placement is defined in positioning units or row/column units, and sizing is defined in row and columns. Applies to: `CBX`, `EDT`, `LST`, and `TXT`.

---

## Guidelines

- The **inside size** is the control's client area — excludes the title bar and scroll bar.
- The **outside size** is the entire control size — includes the title bar and scroll bar.
- When a control is defined with row and column units and the text font is a proportional font, the size is based on the average character size. See [`@FON`](FON.md) for more information.
- When a control is defined with row and column units, a whole number is always returned. However, when a control is defined to be the maximum size (`vsiz = 0` and `hsiz = 0`) and a border is defined, the control size can be a fraction of a row or column — in this case, vertical and horizontal sizes are rounded down.

---

## Error Handling

If `@SIZ` specifies a label in the `lab` field and receives an error from the workstation client, the run continues at that label. The `STAT1$` reserved word contains the error status — see *STAT1$ Values* for possible values.

> **Note:** If a run syntax error is detected, the run will error out and will not continue at the specified label.

---

## Examples

### Child Window (Positioning Units)

Creates a child window defined in positioning units, starting at vertical unit 800 and horizontal unit 400, extending to the size of the main window. `@SIZ` returns the window size in positioning units (`vsiz`, `hsiz`) and in row/column units (`nvsiz`, `nhsiz`):

```bismapper
@win,,0800,0400,0,0,,cw 'Child Window' <wind>i6 .
@siz,<wind> <vsiz>i6,<hsiz>i6,<nvsiz>i6,<nhsiz>i6 .
```

### Overlay Window (Row and Column Units)

Creates an overlay window defined in row and column units, starting at row 2, column 3, extending to the size of the main window. `@SIZ` returns the window size in row/column units (`vsiz`, `hsiz`) and in positioning units (`nvsiz`, `nhsiz`):

```bismapper
@win,,2,3,0,0,,o 'Child Window' <wind>i6 .
@siz,<wind> <vsiz>i6,<hsiz>i6,<nvsiz>i6,<nhsiz>i6 .
```

### List Box (All Dimensions)

Creates a list box defined in row and column units at row 5, column 3, sized 10 rows by 15 columns. `@SIZ` returns the inside size in row/column units (`lvsiz`, `lhsiz`), inside size in positioning units (`lnvsiz`, `lnhsiz`), and outside dimensions in positioning units (`lovsiz`, `lohsiz`):

```bismapper
@lst,0,4,15,3,,BIGLIST.TXT,<wind>,5,3,10,15 'BIGLIST' <lst>i6 .
@siz,<lst> <lvsiz>i6,<lhsiz>i6,<lnvsiz>i6,<lnhsiz>i6,<lovsiz>i6,<lohsiz>i6 .
```

---

## See Also

- [`@WIN`](WIN.md) — Define Window Display
- [`@LST`](LST.md) — Define List Box
- [`@FON`](FON.md) — Font
- [`@SCN`](SCN.md) — Screen Size
