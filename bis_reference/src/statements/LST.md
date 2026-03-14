# @LST — Define List Box

## Overview

Defines a list box and displays it on the user screen. Use the [`@INP`](INP.md) (Accept Input) statement to accept input from the list box.

This statement requires a workstation session using one of the following clients:
- Graphical Interface for Business Information Server
- Business Information Server for Microsoft Windows Client

> **Note:** If the session is using either of these clients, the reserved word `WS$` (workstation flag) equals `1`.

> **Note:** The maximum number of lines in a list box is 32,767.

---

## Syntax

```
@LST[,c,d,r,l,tf?,oname,vwh,vert,hort,vsiz,hsiz,fc/bc,o,hl] caption [vlh] .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `c,d,r` | Optional | Report containing the list of items to display within the list box. |
| `l` | Optional | Line within the report at which to start transferring list items. Default: `3`. |
| `tf?` | Optional | Unconditionally transfer the report (`c,d,r`) to the workstation before processing? `Y` or `N`. Default: `N`. Specify `Y` if `c,d,r` is a result, to ensure up-to-date data. |
| `oname` | Optional | Name of the object containing the list items. May be a PC file name or a version controlled name. If omitted, the name must be specified on line 2 (the title line) of the report specified in `c,d,r`. Note: fails if a version controlled name is specified and version control naming is not supported. |
| `vwh` | Optional | Variable containing an existing window or list box handle. Default: main window. If a window handle is specified, the list box is placed in that window and coordinates are relative to it. If a list box handle is specified, the system assumes the list box is being modified — `fc/bc` and caption use original values if not specified, but `vert`, `hort`, `vsiz`, and `hsiz` must be provided. |
| `vert` | Optional | Vertical position of the upper-left corner of the list box in positioning units or row numbers. Row numbers are based on the main run font (see [`@FON`](FON.md)). If specified, `hort`, `vsiz`, and `hsiz` must also be specified. Default: `1`. See [`@WIN`](WIN.md) for more on positioning units. |
| `hort` | Optional | Horizontal position of the upper-left corner of the list box in positioning units or column numbers. Column numbers are based on the main run font (see [`@FON`](FON.md)). If specified, `vert`, `vsiz`, and `hsiz` must also be specified. Default: `1`. See [`@WIN`](WIN.md) for more on positioning units. |
| `vsiz` | Optional | Vertical size of the list box in positioning units or row numbers. Row numbers are based on the text run font (see [`@FON`](FON.md)). If specified, `vert`, `hort`, and `hsiz` must also be specified. Default: extends to the bottom of the containing window, expanding and contracting with it. |
| `hsiz` | Optional | Horizontal size of the list box in positioning units or column numbers. Column numbers are based on the text run font (see [`@FON`](FON.md)). If specified, `vert`, `hort`, and `vsiz` must also be specified. Default: extends to the right side of the containing window, expanding and contracting with it. |
| `fc/bc` | Optional | Foreground and background colors for the list box. See *Set Default Color Codes* for available colors. If only one color is specified (no slant), it is used for both foreground and background. |
| `o` | Optional | Type of list box to display. See [Options](#options). Default: `S` (single item select). |
| `hl` | Optional | Item(s) to highlight in the list box. To pass multiple line numbers, load them into an array variable. Valid values: `0` or blank = no highlighting; `1`–`n` = highlight that line number; `-1` = highlight all lines. Multiple highlighted lines require `DWCAP$(14-1) = 1`. Default: `1` for `F`, `H`, `I`, `L`, `S`, `X`, and `Y` options; no highlighting for `M`, `N`, `R`, or `D` options. |
| `caption` | Required | Caption for the list box. Enclose captions containing spaces in apostrophes. Use `''` if no caption is desired — note that list boxes without captions cannot be moved on screen. Maximum: 255 characters (truncated if exceeded). |
| `vlh` | Optional | Variable to capture the list box handle. Must be a six-character variable. |

---

## Options

| Option | Description |
|--------|-------------|
| `D` | MS-DOS file list box. Directories are shown as `[directory name]`. Double-click an item to enter the directory; double-click `[--]` to go up a directory. The directory name is displayed in the caption if specified. Similar to `M`. |
| `F` | Creates a thick frame around the window, enabling the user to resize it. |
| `H` | Creates a list box without a horizontal scroll bar. The `U` option is ignored when `H` is used. Check `DWCAP$(15-1) = 1` for availability. |
| `I` | Allows the user to respond with a single click. Cannot be used with `D`, `M`, or `N`. Check `DWCAP$(12-1) = 1` for availability. |
| `L` | Adds a Locate button and edit box to the top of the list box. When found, the target is highlighted (unless used with `M`) and centered in the list box. Do not use if a window or list box handle is specified in `vwh`. |
| `M` | Allows the user to select more than one item. Each selected item is highlighted. When all selections are made, the values are passed back to the run as a result in the same cabinet and drawer as the current output area. |
| `N` | Similar to `M`, but passes the selected item line numbers (rather than values) back as a result. |
| `R` | Creates a read-only list box with no highlighting. If used with `M` or `N`, lines are highlighted but the box remains read-only. Check `DWCAP$(15-1) = 1` for availability. |
| `S` | Allows the user to select one item. Passes back the value in the field following the selected item. |
| `U` | Updates an existing list box (e.g. to change color or size). The same variable must be used in both `vwh` and `vlh`. |
| `X` | Enables the user to enlarge the window to full size. |
| `Y` | Allows the sizing of the control to be in row and column units, independent of the units used for placement. |

---

## Guidelines

You can have an aggregate limit of 4,000 `BTN`, `CBX`, `EDT`, `LST`, `PIC`, `TXT`, and `WIN` controls concurrently open. The actual number of handles created may be lower depending on workstation PC memory configuration and usage.

---

## Examples

### Single Selection List Box

Display a list box and use [`@INP`](INP.md) to determine where to continue after the user makes a selection:

```
@lst,0,a,155,6,,list.dat,<win1>,07,12,10,20,,s,4 'List of Names' <list2>i6 .
@inp <list2>,(0100) .
.
.
@0100:chg input$ <name>s20 .
```

| Part | Description |
|------|-------------|
| `0,a,155` | List data from report `155A` |
| `6` | Start transferring list items at line 6 |
| `list.dat` | PC file where the list box data is stored |
| `<win1>` | Handle of the window in which to place the list box |
| `07,12,10,20` | Display at row 7, column 12; size 10 rows by 20 columns |
| `s` | Single item selection |
| `4` | Highlight the fourth item |
| `'List of Names'` | Caption for the list box |
| `<list2>i6` | Variable to capture the list box handle |
| `@inp` | If this window was used, continue at label `0100` where input is placed into `<name>` |

---

### Multiple Selection List Box with Pre-Highlighted Items

Display a list box with items 2, 4, and 6 pre-highlighted using an array variable:

```
@lda <select>i5[3]=2,4,6 .
@lst,0,a,420,3,y,'LIST.DAT',<win001>,01000,02000,10000,15000,,fm,<select> 'Multiple Selection' <lst001>i6 .
```

| Part | Description |
|------|-------------|
| `0,a,420` | Report containing the list items |
| `3` | Start transferring list items at line 3 |
| `y` | Unconditionally transfer the report to the workstation |
| `'LIST.DAT'` | File name on the workstation where the report data is stored |
| `<win001>` | Variable containing the parent window handle |
| `01000,02000` | Vertical and horizontal position in positioning units, relative to the parent window |
| `10000,15000` | Vertical and horizontal size in positioning units |
| `fm` | `F` option (thick frame) combined with `M` option (multiple selection) |
| `<select>` | Array variable with three members (`2`, `4`, `6`) — each is a line number to highlight |
| `'Multiple Selection'` | Caption for the list box |
| `<lst001>i6` | Variable to capture the list box handle |
