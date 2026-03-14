
# BAR3D (3D Bar Chart)

Use the **3D Bar Chart (`BAR3D`)** run to create three-dimensional bar charts for screen display. Terminal must be configured for graphics.

> **Note:** Not recommended for plotting — hidden lines are not removed.

## 3D Bar Chart Control Line Format

```
BAR3D[,report]
```

Default = current result.

Colors and fill patterns are the same as [BARG](#bar-chart-colors).

## 3D Bar Chart Report Fields

| Field | Description |
|---|---|
| Text color | Default = white |
| Screen color | Default = black |
| Background | Default = screen color (screen display only) |
| Note box | Four fields of 15 characters each. Delete unused fields |
| Note position | `N` = none (default). `L` = upper left; `R` = upper right |
| Title | Optional, ≤40 characters |
| Subtitle | Optional, ≤60 characters |
| X axis title | Optional, ≤60 characters |
| Y axis title | Optional, ≤60 characters |
| Date | Optional, ≤18 characters, lower left. `Y` = current date (`DD MMM YY`) |
| Minimum Y | Override auto-generated y axis minimum; out-of-range values truncated |
| Solid bar? | `Y`/`N`. Default = `N` (drawn in multiple sections per data value) |
| Display grid lines? | `Y`/`N`. Default = `Y` |
| Color | Color of each bar |
| Pattern | Fill pattern for each bar |
| Captions | Legend text; 1–6 captions. Required for any column with data values |
| Labels | x axis labels; minimum two labels and two data values. Use only positive data values |

---
