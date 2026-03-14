# @PIC (Display Picture)

## Overview

Displays a picture or graph within a window on the screen.

This statement requires a workstation session using one of the following clients:

- Graphical Interface for Business Information Server
- Business Information Server for Microsoft Windows Client

> **Note:** If the session is using either of these clients, the reserved word `WS$` (workstation flag) will equal `1`.

For more information, see the Developer's Guide.

### Supported Image Formats

| Extension | Format |
|-----------|--------|
| `.BMP` | Bitmap |
| `.GIF` | Graphical Interchange Format |
| `.JPG` | JPEG (Joint Photographic Experts Group) |
| `.MGL` | MAPPER graphics primitives |
| `.PCX` | PCX image |

---

## Syntax

```
@PIC[,c,d,r,tf?,oname,vwh,vert,hort,vsiz,hsiz,,o,lab] caption [vph] .
```

### Parameters

| Field | Description |
|-------|-------------|
| `c,d,r` | Report containing the picture to be displayed. |
| `tf?` | Transfer the report to the workstation before processing? `Y` or `N`. Default = `N`. |
| `oname` | Name of the object containing the picture. May specify a PC file name or a version controlled name. If omitted, the name must be on line 2 (the title line) of the report in `c,d,r`. See notes below. |
| `vwh` | Variable containing an existing window or picture handle. Default = main window. If a window handle is given, the picture is placed in that window and all coordinates are relative to it. If a picture handle is given, the system assumes you are modifying that picture — `vert`, `hort`, `vsiz`, and `hsiz` must be specified, and original values for `fc/bc`, `o`, and `caption` are reused if not provided. Once defined, only `vert`, `hort`, `vsiz`, `hsiz`, `fc/bc`, `o`, and `caption` can be changed. |
| `vert` | Vertical position of the upper-left corner of the picture in positioning units or row numbers. Position is based on the main run font when using row numbers. If specified, `hort`, `vsiz`, and `hsiz` must also be specified. Default = `1`. See [`@WIN`](WIN.md) and [`@FON`](FON.md) for more information. |
| `hort` | Horizontal position of the upper-left corner of the picture in positioning units or column numbers. Position is based on the main run font when using column numbers. If specified, `vert`, `vsiz`, and `hsiz` must also be specified. Default = `1`. See [`@WIN`](WIN.md) and [`@FON`](FON.md) for more information. |
| `vsiz` | Vertical size of the picture in positioning units or row numbers. Specify `-1` to display the picture at its actual stored dimensions. If specified, `vert`, `hort`, and `hsiz` must also be specified. Default = `0` (extends to the bottom of the window and resizes with it). See [`@WIN`](WIN.md) and [`@FON`](FON.md) for more information. |
| `hsiz` | Horizontal size of the picture in positioning units or column numbers. Specify `-1` to display the picture at its actual stored dimensions. If specified, `vert`, `hort`, and `vsiz` must also be specified. Default = `0` (extends to the right side of the window and resizes with it). See [`@WIN`](WIN.md) and [`@FON`](FON.md) for more information. |
| `o` | Display options. See [Options](#options). |
| `lab` | Label to continue processing at if the statement fails within the workstation client. Run syntax errors do not take the label. `STAT1$` = `0` if successful; nonzero otherwise. See Graphical Interface Returned Status Codes for possible `STAT1$` values. Note: adding a label has the same effect as the `S` option and may cause a minor performance degradation. |
| `caption` | Caption for the picture. Enclose captions with embedded spaces in apostrophes. Use two apostrophes (`''`) if no caption is desired. Pictures without captions cannot be moved. Maximum length is 255 characters (truncated if exceeded). If `DWCAP$(13-1)` is not set, the maximum is 79 characters. Variables are translated to their corresponding values. |
| `vph` | Variable to receive the picture handle. Must be a 6-character variable. |

> **Note:** Check `DWCAP$` for availability: `DWCAP$(12-1) = 1` if available (required for Image on Button). For more information on `DWCAP$`, see the Developer's Guide.

> **Note:** This command fails if a version controlled name is specified and version control naming is not supported. For more information, see the Developer's Guide.

---

## Options

| Option | Description |
|--------|-------------|
| `B` | Displays a border around the window. Do not use with the `F` option. |
| `F` | Creates a thick frame around the window, allowing the user to resize it. Do not use with the `B` option. |
| `I` | Input picture. Clicking the picture captures the x and y coordinates of the click and continues the run. Use `INPUT$` to load these coordinates into variables. Coordinates are expressed as a percentage (1–100) of the picture's width and height, so values remain consistent even if the picture is resized. |
| `P` | Adds horizontal and vertical scroll bars to the picture if needed, enabling panning and tilting. Ignored when `oname` is `.MGL`. |
| `S` | Send immediate. Controls whether picture data is sent immediately or in blocks. If a report is specified in `c,d,r`, data is always sent immediately. Without a report, data is sent in blocks unless `S` is specified. |
| `X` | Enables the user to enlarge the window to full screen size. |

---

## Reserved Words

If `@PIC` specifies a label in the `lab` field and the statement does not complete, the run continues at that label. `STAT1$` contains the error status. See Graphical Interface Returned Status Codes for possible values.

---

## Guidelines

- `@PIC` can also display a large binary object retrieved from an Informix or Oracle database using the [`@FCH`](FCH.md) statement.
- Use the JPEG format only on high-performance PCs with high-quality monitors (more than 256 colors). JPEG provides smaller file sizes and shorter transfer times, but increases display time and produces poor results on monitors with fewer than 256 colors.
- You can have an aggregate limit of **4000** `BTN`, `CBX`, `EDT`, `LST`, `PIC`, `TXT`, and `WIN` controls concurrently open. The actual number may be lower depending on workstation memory configuration and usage.

---

## Example

Display a picture from report `3A0` in a specified window at its actual dimensions with a caption:

```
@pic,0,a,3,y,'rose.bmp()',<win>,1,1,-1,-1 'Rose' <petals>i6 .
```

| Field | Value | Description |
|-------|-------|-------------|
| `c,d,r` | `0,a,3` | Take the picture from report `3A0`. |
| `tf?` | `y` | Download the object before processing. |
| `oname` | `'rose.bmp()'` | Object name of the picture. |
| `vwh` | `<win>` | Handle of the window where the picture is placed. |
| `vert,hort,vsiz,hsiz` | `1,1,-1,-1` | Place in the upper-left corner at actual stored dimensions. |
| `caption` | `'Rose'` | Display caption. |
| `vph` | `<petals>` | Variable to receive the picture handle. |
