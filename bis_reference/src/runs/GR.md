# GR

## Overview

Creates a chart report from existing data in column-formatted reports.

The report you want to chart must be on display, and your terminal must be configured for graphics.

---

## Control Line Format

```
GR
```

---

## Outcome

A function mask is displayed. Fill in the function mask with the desired options and parameters, then transmit. The run creates a chart using the report data.

---

## Options

| Option | Description |
|--------|-------------|
| `L` | Vertical line chart *(default)* |
| `B` | Vertical comparative bar chart |
| `H` | Horizontal line chart |
| `BH` | Horizontal comparative bar chart |
| `S` | Stacked bar chart |
| `F` | Filled line chart |
| `M` | Mixed bar and line chart |
| `C` | Scatter chart |
| `X` | Pareto chart |
| `P` | Pie chart |

---

## Parameters

### Bar and Line Charts

| Row | Instructions |
|-----|-------------|
| Row 1 | Type `l` in the x-axis field. Type `x` in each column (up to six) containing data to be charted. |
| Row 2 | Type the fill pattern number for each column marked with `X` in Row 1. For patterns, see BARG (Bar Chart). |
| Row 3 | Type the color number for each column marked with `X` in Row 1. For colors, see BARG (Bar Chart). |

### Pareto Chart

| Row | Instructions |
|-----|-------------|
| Row 1 | Type `l` in the x-axis field. Type `x` in the column containing data to be charted. |
| Row 2 | Type the fill pattern number for each column marked with `X` in Row 1. For patterns, see PARETO (Pareto Chart). |
| Row 3 | Type the color number for each column marked with `X` in Row 1. For colors, see PARETO (Pareto Chart). |

### Mixed Chart

| Row | Instructions |
|-----|-------------|
| Row 1 | Type `l` in the x-axis field. Type `b` in each column to be represented by bars; type `x` in each column to be represented by lines. Total `B` and `X` fields must be at least two and no more than six. |
| Row 2 | Type the fill pattern number for each column marked with `B` or `X` in Row 1. For patterns, see MIXED (Mixed Chart). |
| Row 3 | Type the color number for each column marked with `B` or `X` in Row 1. For colors, see MIXED (Mixed Chart). |

### Pie Chart

| Row | Instructions |
|-----|-------------|
| Row 1 | Type `l` in the x-axis field. Type `x` in the column containing data to be charted. If more than one `X` column is specified, pie segments are constructed only from the values on the first line of each selected column. |
| Row 2 | Type the fill pattern number for each column marked with `X` in Row 1. For patterns, see PIEG (Pie Chart). |
| Row 3 | Type the color number for each column marked with `X` in Row 1. For colors, see PIEG (Pie Chart). |

### Scatter Chart

| Row | Instructions |
|-----|-------------|
| Row 1 | Type `x` in the column containing x-axis values. Type `y` in the column containing y-axis values. |
| Row 2 | Type the marker symbol number for each column marked with `X` in Row 1. For available symbols, see SCAT (Scatter Chart). |
| Row 3 | Type the color number for each column marked with `X` in Row 1. For colors, see SCAT (Scatter Chart). |
