# @EDT — Define Edit Box

## Overview

Defines an edit box and displays it on the user screen. Use the [`@INP`](INP.md) (Accept Input) statement to accept input from the edit box.

This statement requires a workstation session using one of the following clients:

- Graphical Interface for Business Information Server
- Business Information Server for Microsoft Windows Client

> **Note:** If the session is using either of the above clients, the reserved word `WS$` (workstation flag) is equal to `1`.

The edit box remains on the screen until a [`@CLS`](CLS.md) statement closes it or until the run ends.

> **Note:** In both formats, all tab characters are converted to spaces.

---

## Syntax

**Format 1** — Display text from a report:
```
@EDT,c,d,r[,l,q,vwh,vert,hort,vsiz,hsiz,fc/bc,o] [veh] .
```

**Format 2** — Display literal text:
```
@EDT[,"text",vwh,vert,hort,vsiz,hsiz,fc/bc,o] [veh] .
```

### Parameters

| Field | Format | Required | Description |
|-------|--------|----------|-------------|
| `c,d,r` | 1 only | Required | Report containing the text to display. |
| `l` | 1 only | Optional | Line in the report at which to start reading. Default = `1`. |
| `q` | 1 only | Optional | Number of lines to read from the report. Default = `1`. Only about 6,500 characters can be displayed in the edit box. |
| `"text"` | 2 only | Optional | Text to display in the edit box, enclosed in quotation marks. Variables are translated to their contents. Use two quotation marks (`""`) if no text is needed. |
| `vwh` | Both | Optional | Variable containing an existing window or edit box handle. Default = main window. If a window handle is specified, the edit box is placed in that window and all coordinates are relative to it. If an edit box handle is specified, the system assumes you are modifying that edit box — `vert`, `hort`, `vsiz`, and `hsiz` must be specified; `fc/bc`, `typ`, and text values default to the originals. |
| `vert` | Both | Optional | Vertical position of the upper-left corner in positioning units or row numbers (based on the main run font; see [`@FON`](FON.md)). If specified, `hort`, `vsiz`, and `hsiz` must also be specified. Default = `1`. |
| `hort` | Both | Optional | Horizontal position of the upper-left corner in positioning units or column numbers (based on the main run font; see [`@FON`](FON.md)). If specified, `vert`, `vsiz`, and `hsiz` must also be specified. Default = `1`. |
| `vsiz` | Both | Optional | Vertical size in positioning units or row numbers (based on the text run font; see [`@FON`](FON.md)). If specified, `vert`, `hort`, and `hsiz` must also be specified. Default = extends to the bottom of the containing window. |
| `hsiz` | Both | Optional | Horizontal size in positioning units or column numbers (based on the text run font; see [`@FON`](FON.md)). If specified, `vert`, `hort`, and `vsiz` must also be specified. Default = extends to the right side of the containing window. |
| `fc/bc` | Both | Optional | Foreground and background colors. See *Set Default Color Codes* for available values. If only one color is specified (omitting the slant), it is used for both foreground and background. |
| `o` | Both | Optional | Type of edit box. See [Options](#options) below. Default = left-justified, fixed text length. Once created, the type can only be changed by closing the box with [`@CLS`](CLS.md) and recreating it with `@EDT`. |
| `veh` | Both | Optional | Variable to capture the edit box handle. Must be a six-character variable. |

> **Note *(Format 2 only)*:** The reverse slant (`\`) in literal text may be interpreted as a continuation character. Use `RSLANT$` (without apostrophes) to avoid misinterpretation, or place an `@` sign in column one of the subsequent line.

For more information on positioning units and sizing, see [`@WIN`](WIN.md) (Define Window Display).

---

## Options

| Option | Description |
|--------|-------------|
| `A` | Accepts alpha data only. |
| `B` | Places a border around the edit box. Row and column sizes are one-half character larger than specified in `vsiz`/`hsiz`. |
| `C` | Centers input text. Use with `M`. Do not use with `L` or `R`. If used with `V` and `H`, the `H` option is ignored. |
| `D[(n)]` | Produces a drop box with an arrow to display a list of values. Click a value to place it in the edit box. Do not use with `M`. Minimum rows = `4`, minimum columns = `7`. Supply list values in `"text"` (Format 2, separated by `/`) or `c,d,r` (Format 1). A number `n` in parentheses after `D` sets the default displayed value. |
| `H` | Scrolls horizontally. Do not use with `Z`. |
| `J` | When the field is full, moves the cursor to the next field. Do not use with `H`, `T`, `V`, or `Z`. May not work as expected with variable pitch fonts. |
| `L` | Left-justifies input text. Do not use with `C` or `R`. |
| `M` | Accepts multiple lines of input, placing input into a result with the same cabinet and drawer as the current output area. Do not use with `H`, `T`, `V`, or `Z`. |
| `N` | Accepts numeric data only. |
| `O` | Displays input text in lowercase. Do not use with `U` or `P`. |
| `P` | Makes input text invisible on screen. Do not use with `U` or `O`. |
| `R` | Right-justifies input text. Use with `M`. Do not use with `C` or `L`. If used with `V` and `H`, the `H` option is ignored. |
| `S` | Sends the edit box immediately rather than waiting for the current block transfer. Required if you do not want the client to wait for block transfer. |
| `T` | Same as `V`, but adds a scroll bar to the right of the edit box. Do not use with `V`. |
| `U` | Displays input text in uppercase. Do not use with `O` or `P`. |
| `V` | Scrolls vertically. Do not use with `T`. |
| `Y` | Allows control sizing in row and column units, independent of the units used for placement. |
| `Z` | Same as `H`, but adds a scroll bar beneath the edit box. Do not use with `H`. |
| `3` | Displays the edit box with 3D effects. |

> **Note:** Though the `D` option is still available, use [`@CBX`](CBX.md) instead for added flexibility.

---

## Colors

See *Set Default Color Codes* for a list of valid colors usable with `@EDT`.

---

## Guidelines

- Use Format 1 of the [`@INP`](INP.md) statement to highlight the text at the insertion point while the run is suspended waiting for input.
- You can have an aggregate limit of 4000 [`@BTN`](BTN.md), [`@CBX`](CBX.md), `@EDT`, [`@LST`](LST.md), [`@PIC`](PIC.md), [`@TXT`](TXT.md), and [`@WIN`](WIN.md) controls concurrently open. The actual number may be lower depending on workstation memory configuration and usage.

---

## Examples

Produce an edit box for a six-character password. After input, the run continues at label `100`. The variable `<key>` holds the edit box handle, placing the insertion point in the edit box while waiting:

```
@txt,"Enter password",<gate>,02,02,01,15 <pass>i6 .
@edt,"",<gate>,02,18,01,06,,p <key>i6 .
@inp,<key> <key>,(0100) .
@0100:inp,<key>,y .
@chg input$ <passwd>a6 .
```

Produce a drop box with five values (`1` through `5`), defaulting to `3`:

```
@edt,"1/2/3/4/5",v10,10,10,04,05,,d(3) v3i6 .
```

Use variables in a multiline edit box:

```
@ldv <txt1>s5=abc,<txt2>a3=ddd .
@edt,"
<txt1>/<txt2>",,004,010,005,0023,bla/whi,bam <ed1>i6 .
@inp .
```
