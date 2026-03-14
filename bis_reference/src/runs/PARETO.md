# PARETO (Pareto Chart)

## Overview

Creates a Pareto chart to be displayed on the screen or drawn on a plotter. A Pareto chart is a combined bar and line chart where the line represents the cumulative sum of the bar values.

> **Note:** Your terminal must be configured for graphics.

---

## Control Line Format

```
PARETO[,report]
```

| Field | Description |
|-------|-------------|
| `report` | The chart report in the current cabinet. Default = current report. |

---

## Report Fields

| Field | Description |
|-------|-------------|
| Text color | Color of the text. Default = white. See [Colors](#colors). |
| Screen color | Color of the screen. Default = black. See [Colors](#colors). |
| Background | Color of the box containing the chart (screen display only). Default = screen color. See [Colors](#colors). |
| Note box | Notes about the chart, centered in a small box on the chart. Type over the existing text between the tab characters; there are four fields of 15 characters each. Delete unused note box fields if this field is used. |
| Note position | Location of the note box. Default = `N` (no note box). `L` = upper left, `R` = upper right. |
| Title | Optional title of 40 characters or fewer, centered at the top of the chart in the text color. |
| Subtitle | Optional subtitle of 60 characters or fewer. |
| Date | Optional date of 18 characters or fewer, placed in the lower left corner. Specify `Y` to use the current date in `DD MMM YY` format. |
| X axis title | Optional title of 60 characters or fewer, centered beneath the horizontal axis. |
| Y axis title | Optional title of 60 characters or fewer, placed at the top of the vertical axis. |
| 3D bars? | Draw three-dimensional bars? `Y` or `N`. Default = `N`. |
| Bar value labels? | Display a numeral representing the value of each bar? `Y` or `N`. Default = `N`. |
| Bar edge color? | Make the edge of each bar the same color as the bar? `Y` or `N`. Default = `N`. |
| Display grid lines? | Display grid lines that clarify the value of data points? `Y` or `N`. Default = `N`. |
| Color | Color of each bar and line. Default = red. See [Colors](#colors). |
| Pattern | Fill pattern for each bar. Default = `1`. See [Fill Patterns](#fill-patterns). |
| Labels | Labels for the x axis, entered in the column below the word `Labels`. Enter data values for each bar in the `Bar` column. Each data value is graphed as a bar. At least two labels and two data values are required. |

---

## Colors

To plot the chart, place the indicated pen color in the numbered pen stall. On a four-pen plotter, you can specify only black, blue, red, or green, but any colors can be placed in the pen stalls. If a color is not available on your terminal or plotter, the system selects a substitute.

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
