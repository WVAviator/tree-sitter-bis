# SIGN — Sign

## Overview

Use the `SIGN` run to create signs with large-size text. A sign is displayed on the screen or drawn on a plotter.

> **Note:** To display signs on your monitor, it must be configured for color.

To display a sign that was already created, display the sign report and enter `sign` on the control line.

---

## Syntax

```
SIGN[,report]
```

where `report` is the sign report in the current cabinet.

---

## Sign Report Fields

| Field | Description |
|-------|-------------|
| `Screen color` | Color of the screen. Default = black. See [Colors](#colors). |
| `Border color` | Color of the sign border. Default = no border. See [Colors](#colors). |
| `Square chars` | Character height and width equal? `Yes` or `No`. Default = `Yes`. If `No`, character height is twice the character width. |
| `Sign width` | Width of the sign in inches (0.5–15.75). Default = 11. |
| `Sign height` | Height of the sign in inches (0.5–12). Default = 8.5. |
| `Spacing between lines` | Spacing between lines of text in inches. Default = 0.5. |
| `O` | Line option. Default = start new line. `-` = continue the previous line (placed on the same line). `M` = add spaces at the beginning of the next line (specify the number of spaces in the `CF` field; remaining fields on this line are ignored). |
| `CF` | Font number (1–30). Default = 1 or the previously specified font. If the selected font causes text to exceed boundaries or errors, place tab codes on both sides of the text string. |
| `UL` | Underline characters? `Y` or `N`. Default = `N`. |
| `Size` | Font size ratio. Use positive numbers only. For example, `1` for the first line and `1.5` for the second makes the second line 1½ times taller than the first. |
| `Color` | Color of the text. Default = white. See [Colors](#colors). |
| `C` | Center text? `Y` or `N`. Default = `N`. To center a continuation line, use the `M` option in the `O` field. |
| `Text` | Text to display. Leading and trailing spaces are ignored. To include leading or trailing spaces, use tab codes. |

---

## Colors

To plot a sign, place the indicated pen color in the numbered pen stall. On a four-pen plotter, only black, blue, red, or green can be specified, though any colors may be placed in the pen stalls. If a specified color is not available on your terminal or plotter, the system selects a substitute.

| Color | Pen Stall |
|-------|-----------|
| Aqua | 8 |
| Black | 1 |
| Blue | 2 |
| Cyan | 2 |
| Gray | 1 |
| Green | 4 |
| Hot pink | 3 |
| Lime | 6 |
| Magenta | 7 |
| Pink | 3 |
| Red | 3 |
| Tan | 5 |
| Turquoise | 8 |
| Violet | 7 |
| White | 1 |
| Yellow | 5 |

---

## See Also

- [`@RUN`](../statements/RUN.md) — Execute a Script
- [CHART](CHART.md) — Chart Scripts
- [SCAT](SCAT.md) — Scatter Chart
