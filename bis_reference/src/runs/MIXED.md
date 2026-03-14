# MIXED — Mixed Chart

Creates charts with both bars and lines representing data. The chart is displayed on the screen or drawn on a plotter.

> **Note:** Your terminal must be configured for graphics.

---

## Syntax

```
MIXED[,report]
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `report` | Optional | The chart report in the current cabinet. Default: current report. |

---

## Guidelines

- You can place one set of bars and up to three lines on a single chart. Each row of data under the heading divider line represents one bar and one point on each line. You do not need to specify information for both the line and bar portions.
- To produce a line or bar chart from a mixed chart report, enter `lineg` or `barg` on the control line. The run ignores fields that do not apply to the requested chart type and uses default values for others.
- Available bar types:
  - **Stacked** — values stack on one bar, producing one bar per label.
  - **Comparative** — each y value has its own bar.

---

## Report Fields

| Field | Description |
|-------|-------------|
| Text color | Color of the text. Default: `white`. See [Colors](#colors). |
| Screen color | Color of the screen. Default: `black`. See [Colors](#colors). |
| Background | Color of the box containing the chart (screen display only). Default: screen color. See [Colors](#colors). |
| Note box | Notes about the chart, centered in a small box. Type over existing text between tab characters — four fields of 15 characters each. Delete unused note box fields if this field is used. |
| Note position | Location of the note box. Default: `N` (no note box). `L` = upper left; `R` = upper right. |
| Title | Optional chart title of 40 characters or fewer, centered at the top in the text color. |
| Subtitle | Optional subtitle of 60 characters or fewer. |
| Date | Optional date of 18 characters or fewer, placed in the lower left corner. `Y` = current date in `DD MMM YY` format. |
| X axis title | Optional title of 60 characters or fewer, centered beneath the x (horizontal) axis. |
| Y axis title | Optional title of 60 characters or fewer, placed at the top of the y (vertical) axis. |
| Base line | Level at which a base line is drawn. Values above appear above the line; values below appear below it. Default: `0`. Do not specify a base line for stacked or 3D bar charts. |
| Marker dots? | Place a marker symbol on each line data point? `Y`, `N`, or a marker number. Default: `N`. `Y` = marker `4` (circle). See [Marker Symbols](#marker-symbols). |
| 3D bars? | Draw three-dimensional bars? `Y` or `N`. Default: `N`. |
| Bar edge color | Make the edge of each bar the same color as the bar? `Y` or `N`. Default: `N`. |
| Display grid lines? | Display grid lines to clarify data point values? `Y` or `N`. Default: `N`. |
| Bar value labels? | Display a numeral representing the value of each bar? `Y` or `N`. Default: `N`. |
| Stacked or comparative bars? | Bar type: `S` (stacked) or `C` (comparative). Default: `C`. For `C`, use only one BAR column. For `S`, up to three BAR columns can be used. Use only positive data for stacked bars. |
| Color | Color of each line or bar. See [Colors](#colors). Defaults shown on the report. |
| Pattern | Fill pattern for bars or line style for lines. See [Fill Patterns](#fill-patterns) and [Line Styles](#line-styles). Defaults shown on the report. |
| Captions | Text for a legend. Two rows available. Required for any column containing data values. For comparative bars (`C`): one caption. For stacked bars (`S`): up to three captions. For lines: up to three captions. |
| Labels | Labels for the x axis, entered in the column below the word Labels. Enter data values for each bar and line in the appropriate caption column. At least two labels and two data values are required. |

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
| `> 6` | Varies by device |

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
| `> 5` | Varies by device — see your terminal emulator guide or plotter guide. |
