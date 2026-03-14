# TEXT — Text Chart

## Overview

Creates a text chart consisting of text only, displayed on the screen or drawn on a plotter.

> **Requirement:** Your terminal must be configured for graphics.

---

## Syntax

```
TEXT[,report]
```

`report` is the chart report in the current cabinet. Default = current report.

---

## Report Fields

| Field | Description |
|-------|-------------|
| **T** | Background color, font type, and type of line. At least one line type and its text must be entered. Special values: `C` — background color (type `C` in the T column and a color number in the C column; default = black); `F` — font type (type `F` in the T column and a font number 1–30 in the Text/Parameters column; default = text style of the output device; once a font style is specified, the default can no longer be used); `O` — type one of the following in the Text/Parameters column: `Delete` (remove the line from the top of the chart), `Center` (center S, M, and L lines), `Normal` or blank (left-justify S, M, and L lines), `Frame` (draw a frame around the chart). See [Line Types](#line-types) for additional codes. |
| **C** | Color number for the text on the current line. See [Colors](#colors). |
| **Text/Parameters** | Text for the current line (up to the character limit for the line type), or parameter values for `F` and `O`. |

---

## Line Types

| Line Type | Description |
|-----------|-------------|
| `T` | 22-point type, centered, underlined, double-spaced (useful for titles). |
| `S` | 16-point text, left-justified. |
| `M` | 18-point text, left-justified. |
| `L` | 22-point text, left-justified. |
| `B` | Blank line. |
| `&` | Same as preceding line on chart, indented. |
| `*` | 18-point text, left-justified, preceded by a bullet. |
| `-` | 16-point type, indented, preceded by a dash. |
| `D` | Current date, 11-point type, lower left corner. Default format = `DD MMM YY`, or specify a date in the first nine character positions of the Text/Parameters column. |
| `I` | Text placed at bottom center. Maximum = 12 characters. Type the characters in the Text/Parameters column. |
| `P` | Text placed in lower right corner. Maximum = 12 characters. Type the characters in the Text/Parameters column. |

---

## Guidelines

At least one line type and its text must be entered. The following table shows the maximum number of characters (including spaces) allowed per line type:

| Line Type | With High-Quality Font (default) | Without High-Quality Font |
|-----------|----------------------------------|---------------------------|
| `T` | 54 | 42 |
| `*` | 73 | 73 |
| `-` | 73 | 73 |
| `&` | 73 | 73 |
| `S` | 73 | 73 |
| `M` | 68 | 73 |
| `L` | 54 | 41 |

---

## Colors

| Color | Code | Pen Stall |
|-------|------|-----------|
| Aqua | 10 | 8 |
| Black | 0 | 1 |
| Blue | 4 | 2 |
| Cyan | 6 | 2 |
| Gray | 8 | 1 |
| Green | 2 | 4 |
| Hot pink | 13 | 3 |
| Lime | 11 | 6 |
| Magenta | 5 | 7 |
| Pink | 15 | 3 |
| Red | 1 | 3 |
| Tan | 9 | 5 |
| Turquoise | 14 | 8 |
| Violet | 12 | 7 |
| White | 7 | 1 |
| Yellow | 3 | 5 |

To plot the chart, place the indicated pen color in the numbered pen stall. On a four-pen plotter, only black, blue, red, or green may be specified, though any colors may be placed in the pen stalls. If a color is not available on your terminal or plotter, the system selects a substitute.
