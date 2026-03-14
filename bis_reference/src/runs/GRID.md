# GRID

## Overview

Creates a chart report from data in a column-formatted report. To display charts on your monitor, it must be configured for color.

---

## Control Line Format

```
GRID[,report]
```

where `report` is the report to chart.

---

## Outcome

A function mask is displayed. Fill in the function mask with the desired options and parameters, then transmit. The run creates a chart report from the report data and places the result in the same cabinet and drawer as the data report.

---

## Options

| Option | Description |
|--------|-------------|
| `L` | Vertical line chart *(default)* |
| `B` | Comparative bar chart |
| `C` | Scatter chart |
| `P` | Pie chart |

---

## Parameters

### Pie, Bar, and Line Charts

- Type `l` in the x-axis fields (slice label fields for pie charts). If `l` is not entered, the system offers a choice of labels such as WEEKS, YEARS, or FISCAL MONTHS.
- Type numbers `1`–`6` in the fields whose data you want to represent on the chart, in the order you want the lines, bars, or slices to appear. Field headings become captions.

### Scatter Chart

- Type `x` in the column containing x-axis values.
- Type `y` in the column containing y-axis values.

---

## Guidelines

Save the chart report produced by a GRID run in a freeform report created before requesting a chart command, using the Duplicate Report or Replace Report command. The report must have a heading divider line.

---

## Procedure

To subtotal data in the report and create a line chart:

1. Type `s` in the field containing the caption for the chart. The system detects up to six differences in the column and uses them as captions.
2. Type `+` in the field containing the data for the chart.
3. Type `l` in the field containing labels.
