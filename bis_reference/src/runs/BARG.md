
# BARG (Bar Chart)

Use the **Bar Chart (`BARG`)** run to create a bar chart for display or plotting. Bars are proportional to values in a dataset. Terminal must be configured for graphics.

To produce a **line** or **mixed** chart from a bar chart report, enter `lineg` or `mixed` on the control line instead.

## Bar Chart Control Line Format

```
BARG[,report]
```

Default = current result.

## Bar Chart Colors

| Color | Pen Stall |
|---|---|
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

On a four-pen plotter only black, blue, red, or green can be specified. If a color is unavailable, the system selects an alternative.

## Bar Chart Fill Patterns

| Code | Pattern |
|---|---|
| `N` | None (border only) |
| `0` | Solid |
| `1` | 45-degree left (`\\\`) |
| `2` | 45-degree right (`///`) |
| `3` | Vertical lines |
| `4` | Horizontal lines |
| `5` | Vertical/horizontal crosshatch |
| `6` | 45-degree crosshatch |
| > `6` | Varies by device |

## Types of Bar Charts

| Type | Description |
|---|---|
| Stacked horizontal | Values stack; one horizontal bar per label |
| Stacked vertical | Values stack; one vertical bar per label |
| Comparative horizontal | Each y value has its own horizontal bar; bars grouped together |
| Comparative vertical | Each y value has its own vertical bar; bars grouped together |
| Three-dimensional comparative | Like comparative but bars are 3D |

For large datasets, prefer stacked or line charts over comparative bar charts.

## Bar Chart Report Fields

| Field | Description |
|---|---|
| Text color | Color of text. Default = white |
| Screen color | Color of screen. Default = black |
| Background | Color of chart box (screen only). Default = screen color |
| Note box | Notes in a small box; four fields of 15 characters each. Delete unused fields |
| Note position | `N` = none (default). `L` = upper left (vertical); `R` = upper right (vertical); `B` = lower left (horizontal); `T` = lower right (horizontal) |
| Title | Optional, ≤40 characters, centered at top |
| Subtitle | Optional, ≤60 characters |
| X axis title | Optional, ≤60 characters, centered beneath x axis |
| Y axis title | Optional, ≤60 characters, at top of y axis |
| Date | Optional, ≤18 characters, lower left. `Y` = current date (`DD MMM YY`) |
| Minimum Y / Maximum Y | Override auto-generated y axis scale; out-of-range values truncated and shown numerically |
| Base line | Level for base line. Values above display above; below display below. Default = `0` |
| 3D bars? | `Y`/`N`. Default = `N`. Comparative charts only |
| Display grid lines? | `Y`/`N`. Default = `N` |
| Bar edge color? | `Y`/`N`. Default = `N` |
| Bar value labels? | `Y`/`N`. Default = `N` |
| Stacked or comparative? | `S` or `C`. Default = `C`. Use only positive data for stacked |
| Horizontal or vertical? | `H` or `V`. Default = `V` |
| Color | Color of each bar |
| Pattern | Fill pattern for each bar |
| Captions | Legend text; 1–6 captions across two rows. Required for any column with data values |
| Labels | x axis labels; enter below the word *Labels*. Minimum two labels and two data values |

---
