# SCAT — Scatter Chart

## Overview

Use the `SCAT` run to create a scatter chart. A scatter chart depicts variable points graphed according to numeric x and y scales, displayed on the screen or drawn on a plotter.

> **Note:** Your terminal must be configured for graphics.

---

## Syntax

```
SCAT[,report]
```

where `report` is the chart report in the current cabinet. Default = current report.

---

## Chart Report Fields

| Field | Description |
|-------|-------------|
| `Text color` | Color of the text and border. Default = white. See [Colors](#colors). |
| `Screen color` | Color of the screen. Default = black. See [Colors](#colors). |
| `Background` | Color of the box containing the chart (screen display only). Default = screen color. See [Colors](#colors). |
| `Note box` | Notes about the chart, centered in a small box on the chart. Type over the existing text between the tab characters — four fields of 15 characters each. Delete unused note box fields if this field is used. |
| `Note position` | Location of the note box. Default = `N` (no note box). `L` = upper left, `R` = upper right. |
| `Title` | Optional title of 40 characters or fewer, placed at the top of the chart in the text color. |
| `Subtitle` | Optional subtitle of 60 characters or fewer. |
| `Date` | Optional date of 18 characters or fewer, placed in the lower left corner. `Y` = current date in DD MMM YY format. |
| `X axis title` | Optional title of 60 characters or fewer, centered beneath the x axis. |
| `Y axis title` | Optional title of 60 characters or fewer, placed at the top of the y (vertical) axis. |
| `X minimum` / `X maximum` / `Y minimum` / `Y maximum` | Minimum and maximum values for the x and y axes. Enter only to override automatically produced axis scales. Values outside these bounds are truncated and represented numerically. |
| `Marker symbol` | Marker style for each data point. Default = `5`. See [Marker Symbols](#marker-symbols). |
| `Linear fit?` | Draw a line representing the average of the data points? `Y`, `N`, or color number. Default = `N`. Default color = yellow. See [Colors](#colors). |
| `Parabolic fit` | Draw a parabolic curve? `Y`, `N`, or color number. Default = `N`. Default color = cyan. See [Colors](#colors). |
| `Display grid lines?` | Display grid lines to clarify the value of data points? `Y` or `N`. Default = `N`. |
| `Color` | Color of the marker symbols. Default = red. See [Colors](#colors). |
| `XY` | Data values. Enter X data values under the X column and Y data values under the Y column. |
| `Text` | Text to accompany the data values. |
| `J` | Justify text relative to the data values: `T` (top), `B` (bottom), `L` (left), or `R` (right). |

---

## Colors

To plot a chart, place the indicated pen color in the numbered pen stall. On a four-pen plotter, only black, blue, red, or green can be specified, though any colors may be placed in the pen stalls. If a specified color is not available on your terminal or plotter, the system selects a substitute.

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

---

## Marker Symbols

| Code | Description |
|------|-------------|
| `1` | Dot (period) |
| `2` | Plus sign (`+`) |
| `3` | Asterisk (`*`) |
| `4` | Circle (`O`) |
| `5` | X |
| Over `5` | *(Windows Server / Linux / UNIX)* Varies by device — see your terminal emulator guide or plotter guide. |

---

## See Also

- [`@RUN`](../statements/RUN.md) — Execute a Script
- [CHART](CHART.md) — Chart Scripts
