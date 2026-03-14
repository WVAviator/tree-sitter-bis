# LINEG — Line Chart

Creates a line chart displayed on the screen or drawn on a plotter. A line chart consists of lines of data drawn to correspond to values in a set of data.

> **Note:** Your terminal must be configured for graphics.

---

## Syntax

```
LINEG[,report]
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `report` | Optional | The chart report in the current cabinet. Default: current report. |

---

## Guidelines

To produce a bar or mixed (bar and line) chart from a line chart report, enter `barg` or `mixed` on the control line. The run ignores fields on the chart report that do not apply to the requested chart type and uses default values for others.

---

## Report Fields

| Field | Description |
|-------|-------------|
| Text color | Color of the text. Default: `white`. See [Colors](#colors). |
| Screen color | Color of the screen. Default: `black`. See [Colors](#colors). |
| Background | Color of the box containing the chart (screen display only). Default: screen color. See [Colors](#colors). |
| Note box | Notes about the chart, centered in a small box. Type over existing text between tab characters — four fields of 15 characters each. Delete unused note box fields if this field is used. |
| Note position | Location of the note box. Default: `N` (no note box). `L` = upper left; `R` = upper right. |
| Title | Optional chart title of 40 characters or fewer, centered at the top of the chart in the text color. |
| Subtitle | Optional subtitle of 60 characters or fewer. |
| X axis title | Optional title of 60 characters or fewer, centered beneath the x (horizontal) axis. |
| Y axis title | Optional title of 60 characters or fewer, placed at the top of the y (vertical) axis. |
| Date | Optional date of 18 characters or fewer, placed in the lower left corner. `Y` = current date in `DD MMM YY` format. |
| Minimum Y / Maximum Y | Minimum and maximum values for the y axis. Enter only to override the automatically produced scale. Values outside this range are truncated and represented numerically. |
| Base line | Level at which a base line is drawn. Values above this level appear above the line; values below appear below it. Default: `0`. |
| Marker dots? | Place a marker symbol on each data point? `Y`, `N`, or a marker number. Default: `N` (no markers). `Y` = marker 4 (circle). See [Marker Symbols](#marker-symbols). Not available for solid filled lines or offset planes. |
| Offset planes? | Fill the space between each data line and the baseline and offset it from other lines? `Y` or `N`. Default: `N`. Offset planes appear three-dimensional. |
| Connect the dots? | Connect all data points? `Y` or `N`. Default: `N`. Useful when a data point is missing. Do not use with numeric x scaling. |
| Display grid lines? | Display grid lines to clarify the value of data points? `Y` or `N`. Default: `N`. |
| Numeric x scaling | Scale the x axis numerically like the y axis? `Y` or `N`. Default: `N`. Type numbers in the Labels fields to label the x axis. Blank data is interpreted as zero. |
| Color | Color of each line. See [Colors](#colors). Defaults shown on the report. |
| Pattern | Style of each line. See [Line Styles](#line-styles). Defaults shown on the report. |
| Solid fill | Solid fill lines to the baseline? `Y` or `N`. Default: `N`. Fill extends from the line to the bottom of the chart in the line's color and pattern. Lines are drawn in order from one to six — some filled lines may overlap previously drawn lines with lower data values. |
| Captions | Text for a legend describing the data. Type up to six captions (at least one required), across two available rows. Required for any column containing data values. |
| Labels | Labels for the x axis, entered in the column below the word Labels. Enter data values for each line in the appropriate caption column. At least two labels and two data values are required. |

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

To plot the chart, place the indicated pen color in the numbered pen stall. On a four-pen plotter, only black, blue, red, or green can be specified, but any colors may be placed in the pen stalls. If a color is not available on your terminal or plotter, the system selects an alternative.

---

## Line Styles

| Code | Description |
|------|-------------|
| `1` | Solid |
| `2` | Short dashes |
| `3` | Dots |
| `4` | Dashes and dots |
| `5` | Very short dashes |
| `6` | Medium dashes |
| `7` | Long dashes |
| `8` | One dash – two dots |
| `9` | Widely spaced dots |

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
| `> 5` | Varies by device — see your terminal emulator guide or plotter guide for markers assigned to numbers over 5. |
