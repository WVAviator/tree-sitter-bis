# MULTI

Displays two, three, or four charts on the same screen or page. For each chart in the group, save its graphics primitive code as a report before running `MULTI`.

> **Note:** Your terminal must be configured for graphics.

---

## Syntax

```
MULTI[,q,f,sn,psiz,transpcy?],c,d,r,c,d,r[,c,d,r,c,d,r]
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `q` | Optional | Number of charts to arrange on one screen: `2`, `3`, or `4`. |
| `f` | Optional | Layout format number. See [Chart Layouts](#chart-layouts). For two charts: `1`, `2`, or `3`. For three charts: `1` or `2`. For four charts: leave blank. |
| `sn` | Optional | Printing device station number. Fill in only if printing the chart. |
| `psiz` | Optional | Paper size. `Y` = 11×17 inches. Default: `N` (8½×11 inches). Enter only if `sn` is specified. |
| `transpcy?` | Optional | Making transparencies? `Y` or `N`. Default: `N`. Enter only if `sn` is specified. |
| `c,d,r` | Required | Report containing the graphics primitive code for each chart. Specify at least two reports and no more than four. |

---

## Guidelines

- Use the fewest number of characters possible for chart text due to size limitations.
- For best results, use a black background for your charts — the `MULTI` command ignores all background colors except black.

---

## Chart Layouts

The `f` field determines how charts are arranged on the screen or page.

**Two charts:**

| Format | Layout |
|--------|--------|
| `1` | Side by side (left and right) |
| `2` | Stacked (top and bottom) |
| `3` | Large chart on left, small chart on right |

**Three charts:**

| Format | Layout |
|--------|--------|
| `1` | One chart on top, two charts side by side on the bottom |
| `2` | Two charts side by side on the top, one chart on the bottom |

**Four charts:**

| Format | Layout |
|--------|--------|
| *(blank)* | Two charts on top, two charts on the bottom (2×2 grid) |
