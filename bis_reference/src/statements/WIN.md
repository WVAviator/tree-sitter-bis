# @WIN — Define Window Display

## Overview

Defines a window and displays it on the user screen at a specified size and location.

> **Requirement:** This statement requires a workstation session using one of the following clients:
> - Graphical Interface for Business Information Server
> - Business Information Server for Microsoft Windows Client
>
> When using either of these clients, the reserved word `WS$` (workstation flag) equals `1`.

---

## Syntax

```
@WIN[,vwh,vert,hort,vsiz,hsiz,fc/bc,o] caption [vwh] .
```

---

## Parameters

| Field | Description |
|-------|-------------|
| `vwh` *(input)* | Variable containing an existing window handle. All vertical and horizontal coordinates are relative to the specified window. Default = main window. If a window handle is specified, a window is placed within that window unless the `U` option is used. If this field contains `WND$` (the main window handle), only the `caption` field is used — it becomes the caption of the main window for the duration of the run, and all other fields are ignored. Once a window is defined, only `vert`, `hort`, `vsiz`, `hsiz`, `fc/bc`, and `caption` can be changed. |
| `vert` | Vertical position of the upper-left corner in positioning units or row numbers. When using row numbers, position is based on the main run font. See [`@FON`](FON.md). Default = `1`. Negative values are allowed when using the `P` option. |
| `hort` | Horizontal position of the upper-left corner in positioning units or column numbers. When using column numbers, position is based on the main run font. See [`@FON`](FON.md). Default = `1`. Negative values are allowed when using the `P` option. |
| `vsiz` | Vertical size in positioning units or row numbers. When using row numbers, size is based on the main run font. See [`@FON`](FON.md). Default = extends to the bottom of the parent window (`C` option) or full screen size (`O` option). If no absolute size is specified, the window resizes with its parent when the parent size changes. |
| `hsiz` | Horizontal size in positioning units or column numbers. When using column numbers, size is based on the main run font. See [`@FON`](FON.md). Default = extends to the right of the parent window (`C` option) or full screen size (`O` option). If no absolute size is specified, the window resizes with its parent when the parent size changes. |
| `fc/bc` | Foreground and background colors. If only one color is specified (omitting the `/`), it is used for both. See *Set Default Color Codes* for available values. |
| `o` | Type of window to display. See [Options](#options). |
| `caption` | Caption for the window. Enclose captions with embedded spaces in apostrophes (`'`). If no caption is specified, place `''` in this field. Windows without captions cannot be moved. A caption bar is automatically added when the `F`, `I`, or `X` options are specified. A border is automatically added when a caption is specified without a thick frame. Maximum = 255 characters (truncated if exceeded). If `DWCAP$(13-1)` is not set, maximum = 50 characters. |
| `vwh` *(output)* | Variable to capture the new window handle. Must be a six-character variable. |

---

## Options

| Option | Description |
|--------|-------------|
| `B` | Displays a border around the window. Do not use with `F`. |
| `C` | Creates a child window — cannot move or exist outside the main window. Default if `C`, `O`, or `P` are not specified. Do not use with `O` or `P`. |
| `F` | Creates a thick frame, enabling the user to resize the window. Do not use with `B`. |
| `H` | Hides the window from view until a [`@SHW`](SHW.md) statement is invoked. |
| `I` | Enables the user to minimize the window to icon size. |
| `M` | Creates a window with horizontal and vertical scroll bars, displayed when controls are partially or fully outside the window area. Check `DWCAP$(15-1) = 1` for availability. |
| `O` | Creates an overlapped window that exists wholly outside the main window. Do not use with `C` or `P`. |
| `P` | Creates an overlapped window positioned relative to the parent window, existing wholly outside the main window. Leave `vwh` blank to specify the main window as parent. Check `DWCAP$(14-1) = 1` for availability. Do not use with `C` or `O`. |
| `S` | Send immediately. Without this option, the window is not sent until the current block is transferred (which improves performance). Use `S` if you do not want the workstation to wait for block transfer. |
| `U` | Updates an existing window. Only `vert`, `hort`, `vsiz`, `hsiz`, `fc/bc`, and `caption` can be changed. Use the same variable in both `vwh` fields. |
| `W` | Defines position and size in positioning units based on the Windows system font. A vertical positioning unit is approximately 800× the size of a row; a horizontal positioning unit is approximately 400× the size of a column. Use a TrueType font with this option for consistent screen presentation across PCs. When positioning units and TrueType fonts are used, size includes the title bar, border, and scroll bars; without `W` (row/column mode), size specifies only the client area. Check `DWCAP$(12-1) = 1` for availability. See the Developer's Guide for more on `DWCAP$`. |
| `X` | Enables the user to maximize the window to full size. |

---

## Guidelines

You can have an aggregate limit of 4000 `BTN`, `CBX`, `EDT`, `LST`, `PIC`, `TXT`, and `WIN` controls concurrently open.

> **Note:** The actual number of handles that can be created may be lower depending on workstation PC memory configuration and usage.

---

## Examples

### Row/Column Units

Displays a window at row 10, column 40, sized 12 rows × 20 columns, with maximize, minimize, and resize capabilities, captioned `BILLING`:

```
@win,,10,40,12,20,,ixf 'BILLING' <winname>i6 .
```

| Field | Description |
|-------|-------------|
| `,,10,40` | Position at row 10, column 40 of the main session window. |
| `12,20` | 12 rows tall, 20 columns wide. |
| `ixf` | Frame (resizable), maximize (`x`), and minimize (`i`) capabilities. |
| `'BILLING'` | Window caption. |
| `<winname>i6` | Variable to capture the window handle. |

### Positioning Units

Displays a window of approximately the same size as the previous example, using positioning units:

```
@win,,07300,15700,10800,08400,bla/whi,cwf 'Sample Window' <win>i6 .
```

| Field | Description |
|-------|-------------|
| `,,` | No window handle specified — displayed in the main session window. |
| `07300,15700` | Vertical position 7300, horizontal position 15700 (positioning units). |
| `10800,08400` | 10800 positioning units tall, 8400 wide. |
| `bla/whi` | Black foreground, white background. |
| `cwf` | Child window (`c`), positioning units (`w`), framed (`f`). |
| `'Sample Window'` | Window caption. |
| `<win>i6` | Variable to capture the window handle. |
