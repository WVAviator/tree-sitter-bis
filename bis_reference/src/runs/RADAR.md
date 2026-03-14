# RADAR (Radar Chart)

## Overview

Creates a radar chart — a chart consisting of spokes radiating from a center point, with lines corresponding to values in a set of data. The chart is displayed on the screen or drawn on a plotter.

> **Note:** Your terminal must be configured for graphics.

---

## Syntax

```
RADAR[,report]
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

## Guidelines

- Each label in the Rays column represents one ray on the chart. Each ray is made up of a scale and a series of points.
- The run graphs the data values in a column under a particular caption as a single line.
- Using a clock as a reference point, the first ray is at the 3 o'clock position and the rest proceed counterclockwise.

---

## Report Fields

| Field | Description |
|-------|-------------|
| Text color | Color of the text and border. Default = white. See [Colors](#colors). |
| Screen color | Color of the screen. Default = black. See [Colors](#colors). |
| Title | Optional title of 40 characters or fewer, placed at the top of the chart in the text color. |
| Subtitle | Optional subtitle of 60 characters or fewer. |
| Date | Optional date of 18 characters or fewer, placed in the lower-left corner. Use `Y` for the current date in `DD MMM YY` format. |
| Percentage markers? | Place symbols on each ray to clarify the value of data points? `Y` or `N`. Default = `Y` (markers placed at 25, 50, and 75 percent of the distance from the center). |
| Captions | Text for a legend describing the data. Up to six captions (at least one required). Two rows are available. Captions are required for any column containing data values. Each data value in the column below a caption is graphed as a line — see the Rays field. |
| Color | Color of each line. See [Colors](#colors). Defaults are shown on the report. |
| Rays | Label for each ray on the chart, describing what it represents. Enter names in the column under the word Rays on the report. |
| Scale | Maximum value for the Y scale of each ray on the chart. |
