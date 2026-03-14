# PIEG (Pie Chart)

## Overview

Creates a pie chart — a circle divided into slices, each proportional to a value.

> **Note:** Your terminal must be configured for graphics.

---

## Syntax

```
PIEG[,report]
```

`report` is the chart report in the current cabinet. Default = current report.

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

To plot the chart, place the indicated pen color in the numbered pen stall. On a four-pen plotter, only black, blue, red, or green can be specified, but any colors may be placed in the pen stalls. If a color is not available on your terminal or plotter, the system selects a substitute.

---

## Fill Patterns

| Code | Pattern |
|------|---------|
| `N` | None (border only) |
| `0` | Solid |
| `1` | 45-degree left (`\\\`) |
| `2` | 45-degree right (`///`) |
| `3` | Vertical lines |
| `4` | Horizontal lines |
| `5` | Vertical/horizontal crosshatch |
| `6` | 45-degree crosshatch |
| Over `6` | Varies by device |

---

## Guidelines

- Slices are ordered as entered in the chart report. Using a clock as reference, slices start at the 3 o'clock position and proceed counterclockwise.
- There is no limit to the number of slices, but too many will become too small to be effective. To mitigate this, reorder slices or separate small slices with larger ones.

---

## Report Fields

| Field | Description |
|-------|-------------|
| Text color | Color of the text. Default = white. See [Colors](#colors). |
| Screen color | Color of the screen. Default = black. See [Colors](#colors). |
| Title | Optional title of 40 characters or fewer, centered at the top of the chart in the text color. |
| Subtitle | Optional subtitle of 60 characters or fewer. |
| Date | Optional date of 18 characters or fewer, placed in the lower-left corner. Use `Y` for the current date in `DD MMM YY` format. |
| Include leading `$`? | Place a dollar sign in front of each value? `Y` or `N`. Default = `N`. |
| Display percentage only? | Display percentage of whole rather than actual values? `Y` or `N`. Default = `N` (displays both value and percentage). |
| Display total? | Display total of all values in the lower-right corner? `Y` or `N`. Default = `N`. |
| 3D pie chart? | Draw the pie three-dimensionally? `Y` or `N`. Default = `N`. Maximum of 18 slices. Printing 3D pie charts on a plotter is not recommended due to drawing complexity. |
| Maximum segments | A number from 1–10 specifying the number of segments in the bar (see Comb field). Default = `10`. Values greater than 10 default to `10`. Type `y` to display the six smallest values as a bar. |
| Bar title | Name to be placed adjacent to the bar (see Comb field). |
| Name | Name of each slice. |
| Value | Value of each slice. **Required.** |
| Explode? | Offset the slice from the center of the pie? `Y` or `N`. Default = `N`. |
| Foreground color | Color of the slice. See [Colors](#colors). Default colors are distributed one per label beginning with red. To use a solid color, specify the same color for the background, or specify `0` for the pattern. |
| Background color | Background color of the pattern, if used. Default = black. |
| Pattern | Pattern number for each slice. See [Fill Patterns](#fill-patterns). Patterns are distributed one per label beginning with `0`. |
| Comb | Include this value in a stacked bar on the chart? Type `y` to include. Default = no. If `y` was typed in Maximum Segments, the six smallest values are placed in a bar regardless of this field. Not available for 3D pie charts. |
