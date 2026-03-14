# TARGET — Target Chart

## Overview

Creates a target (bull's-eye) chart on the screen or plotter, showing data in relation to a center point.

> **Requirement:** Your terminal must be configured for graphics.

---

## Syntax

```
TARGET[,report]
```

`report` is the chart report in the current cabinet. Default = current report.

---

## Report Fields

| Field | Description |
|-------|-------------|
| **Text color** | Color of the text and border. Default = white. See [Colors](#colors). |
| **Screen color** | Color of the screen. Default = black. See [Colors](#colors). |
| **Title** | Optional title of 40 characters or fewer, placed at the top of the chart in the text color. |
| **Date** | Optional date of 18 characters or fewer, placed in the lower left corner. `Y` = current date in `DD MMM YY` format. |
| **Initials** | Three optional characters (e.g., initials) placed in the lower right corner. |
| **Min scale** | Minimum data value for the chart. Default = `0` (bull's-eye). |
| **Max scale** | Maximum data value for the chart. Required — no default. |
| **Invert scale?** | Place the maximum scale value at the bull's-eye instead of the outer edge? `Y` or `N`. Default = `N`. |
| **Marker color** | Color of each marker. See [Marker Symbols](#marker-symbols). Defaults are shown on the report. |
| **Captions** | Text for a legend describing the data. Type up to six captions (at least one required), across two available rows. Captions are required for any column containing data values. Each column produces a different marker symbol: `1` Circle, `2` Triangle, `3` Square, `4` Vertical rectangle, `5` Horizontal rectangle, `6` Diamond. |
| **Labels** | Labels for each marker, entered in the column below the word **Labels**. Type data values for each marker in the appropriate caption column. At least two labels and two data values are required. |

---

## Colors

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

To plot the chart, place the indicated pen color in the numbered pen stall. On a four-pen plotter, only black, blue, red, or green may be specified, though any colors may be placed in the pen stalls. If a color is not available on your terminal or plotter, the system selects a substitute.

---

## Marker Symbols

| Code | Description |
|------|-------------|
| `1` | Dot (period) |
| `2` | Plus sign (`+`) |
| `3` | Asterisk (`*`) |
| `4` | Circle (`O`) |
| `5` | X |
| `6` | Slant (`/`) |
| Over `5` | Varies by device — see your terminal emulator guide or plotter guide. |
