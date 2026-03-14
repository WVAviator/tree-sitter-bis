# TIMEL — Time Line Chart

## Overview

Creates a time line chart representing chronological data, displayed on the screen or drawn on a plotter.

> **Requirement:** Your terminal must be configured for graphics.

---

## Syntax

```
TIMEL[,report]
```

`report` is the chart report in the current cabinet. Default = current result.

---

## Report Fields

### Chart-Level Fields

| Field | Description |
|-------|-------------|
| **Text color** | Color of the text and border. Default = white. See [Colors](#colors). |
| **Screen color** | Color of the screen. Default = black. See [Colors](#colors). |
| **Title** | Optional title of 40 characters or fewer, placed at the top of the chart in the text color. |
| **Mark 1–4** | Text for a legend describing the milestone dates. Maximum = 10 characters each. Default = no legend. |
| **Date line** | Draw a vertical line representing the current date? `Y` or `N`. Default = `N`. The line is displayed only if the current date falls within the chart's date range. |
| **Format** | Date interval format. Default = `m`. `m` — monthly format. `w` — weekly format (header dates are Fridays); if fewer than 32 days exist between the minimum and maximum date, a daily format is used for a period of 32 days. |
| **Minimum date** | Minimum date to depict on the chart, in `YYMMDD` format. For weekly format, rounded to the previous Friday. If a data date falls before this date, a left-pointing arrow is displayed at the beginning of that line. |
| **Maximum date** | Maximum date to depict on the chart, in `YYMMDD` format. If fewer than 32 days from the minimum date, rounded to the end of the month or a Friday date. If a data date falls after this date, a right-pointing arrow is displayed at the beginning of that line. |
| **1st color** | Up to 20 characters defining the bar color of the first center date (Cdate). Displayed in the chart legend. |
| **2nd color** | Up to 20 characters defining the bar color of the second center date (Cdate). Displayed in the chart legend. |
| **3rd color** | Up to 20 characters defining the bar color of the third center date (Cdate). Displayed in the chart legend. |
| **4th color** | Up to 20 characters defining the bar color of the ending date (Edate). Displayed in the chart legend. |
| **Bar color** | Color name for each time period specified by the Cdates and Edate. See [Colors](#colors). Defaults are shown on the report. |
| **Fill pattern** | Fill pattern for each time period specified by the Cdates and Edate. See [Fill Patterns](#fill-patterns). Defaults are shown on the report. |

### Data Line Fields

| Field | Description |
|-------|-------------|
| **Title** | Title of the current time line. |
| **Sdate** | Starting date of the project in `YYMMDD` format. The year is displayed below the title, followed by one of: quarters of years (if the chart spans many years), months (if it spans months), or days (if the span is 32 days or fewer). |
| **Cdate** | Center dates for each task defined in the 1st–3rd color fields, in `YYMMDD` format. |
| **Edate** | Ending date of the project as defined in the 4th color field, in `YYMMDD` format. |
| **Mark1–Mark4** | Dates marking project milestones. Symbols used: Mark1 = triangle, Mark2 = square, Mark3 = circle, Mark4 = diamond. |

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

To plot the chart, place the indicated pen color in the numbered pen stall. On a four-pen plotter, only black, blue, red, or green may be specified, though any colors may be placed in the pen stalls. If a color is not available on your terminal or plotter, the system selects a substitute.

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

- The `Sdate` and `Edate` fields define the minimum and maximum dates for the chart. The **Minimum Date** and **Maximum Date** fields let you select a narrower range of dates to display within that span.
- You can have up to 50 individual time lines on the chart. If titles begin to overwrite each other, split the data across two or more charts.

### Placing Multiple Time Lines on the Same Row

To place a time line on the same row as the preceding one, place an asterisk (`*`) at the beginning of the data line:

```
* TITLE .SDATE .CDATE .CDATE .CDATE .EDATE ...
*==============.======.======.======.======.======
.Product A ...
*Product B ...
```

In this example, Product B is placed on the same row as Product A. You can place as many time lines on a row as space allows.
