# @TXT — Define Text Box

## Overview

Defines a text box and displays it on the user screen. Text boxes are for display purposes only — the statement returns no data.

> **Requirement:** This statement requires a workstation session using one of the following clients:
> - Graphical Interface for Business Information Server
> - Business Information Server for Microsoft Windows Client
>
> When using either of these clients, the reserved word `WS$` (workstation flag) equals `1`.

> **Note:** In both formats, all tab characters are converted to spaces.

---

## Syntax

### Format 1 — Text from Report
```
@TXT[,c,d,r,l,q,vwh,vert,hort,vsiz,hsiz,fc/bc,o] [vth] .
```

### Format 2 — Inline Text
```
@TXT[,"text",vwh,vert,hort,vsiz,hsiz,fc/bc,o] [vth] .
```

---

## Parameters

| Field | Format | Description |
|-------|--------|-------------|
| `c,d,r` | 1 only | Report containing the text to display. |
| `l` | 1 only | Line in the report at which to start reading. Default = `1`. |
| `q` | 1 only | Number of lines to read from the report. Default = `1`. |
| `"text"` | 2 only | Text to appear in the text box. If no text is desired, enter `""`. Use `/` to begin a new line. Variables enclosed in apostrophes are not translated; variables enclosed in quotation marks are translated to their contents. |
| `vwh` | Both | Handle of an existing window or text box. Default = main window. If a window handle is specified, the text box is placed in that window and all coordinates are relative to it. If a text box handle is specified, the system modifies that text box — unspecified subfields retain their original values, except: data must be changed via `c,d,r,l,q` (Format 1) or `"text"` (Format 2); if any of `vert`, `hort`, `vsiz`, `hsiz` are specified, all four must be specified (unspecified ones default to zero); the `I` option adds or removes the input property depending on its presence or absence. |
| `vert` | Both | Vertical position of the upper-left corner in positioning units or row numbers. Position is based on the main run font when using row numbers. See [`@WIN`](WIN.md) and [`@FON`](FON.md). If specified, `hort`, `vsiz`, and `hsiz` must also be specified. Default = `1`. |
| `hort` | Both | Horizontal position of the upper-left corner in positioning units or column numbers. Position is based on the main run font when using column numbers. See [`@WIN`](WIN.md) and [`@FON`](FON.md). If specified, `vert`, `vsiz`, and `hsiz` must also be specified. Default = `1`. |
| `vsiz` | Both | Vertical size in positioning units or row numbers. Size is based on the text run font when using row numbers. See [`@WIN`](WIN.md) and [`@FON`](FON.md). If specified, `vert`, `hort`, and `hsiz` must also be specified. Default = `800` positioning units (or `1` row). |
| `hsiz` | Both | Horizontal size in positioning units or column numbers. Size is based on the text run font when using column numbers. See [`@WIN`](WIN.md) and [`@FON`](FON.md). If specified, `vert`, `hort`, and `vsiz` must also be specified. Default = `2800` positioning units (or `7` columns). |
| `fc/bc` | Both | Foreground and background colors for the text box. If only one color is specified (omitting the `/`), that color is used for both. See *Set Default Color Codes* for available values. |
| `o` | Both | Options. See [Options](#options). Default = `L`. |
| `vth` | Both | Variable to capture the text box handle. Must be a six-character variable. |

---

## Options

| Option | Description |
|--------|-------------|
| `B` | Border. |
| `C` | Center. |
| `I` | Input text. If this text box is clicked, the run resumes and is processed accordingly. |
| `L` | Left-justified. |
| `R` | Right-justified. |
| `S` | Send immediately. Without this option, the text box is not sent until the current block is transferred (which improves performance). Use `S` if you do not want the workstation to wait for the block transfer. |
| `T` | Transparent background. If a background color is specified alongside `T`, it is ignored. Not compatible with the `B` or `3` options. |
| `Y` | Allows sizing of the control in row and column units, independent of the units used for placement. |
| `3` | Displays the text box with 3D effects. Not compatible with the `T` option. |

---

## Guidelines

You can have an aggregate limit of 4000 `BTN`, `CBX`, `EDT`, `LST`, `PIC`, `TXT`, and `WIN` controls concurrently open.

> **Note:** The actual number of handles that can be created may be lower depending on workstation PC memory configuration and usage.

---

## Example

Displays a text box with the message "printing in progress":

```
@txt,"printing in progress",<ha1>,02,02,03,22,whi/red,c <print>i6 .
```

| Field | Description |
|-------|-------------|
| `"printing in progress"` | Text to display in the box. |
| `<ha1>` | Display the text box in the window whose handle is in `<ha1>`. |
| `02,02` | Create the text box at row 2, column 2 of the window. |
| `03,22` | Make the text box three lines tall and twenty characters wide. |
| `whi/red` | White foreground, red background. |
| `c` | Center the text in the box. |
| `<print>i6` | Capture the text box handle in `<print>`. |
