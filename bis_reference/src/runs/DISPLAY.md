# DISPLAY

## Overview

Presents a series of charts as a slide show, using graphics primitive code reports created with the Chart and Sign commands. Charts can be displayed manually (one at a time) or automatically in a continuous cycle.

> **Note:** Your terminal must be configured for graphics.

---

## Syntax

```
DISPLAY[,o,{report | drawer},l,cyc?,interval]
```

### Parameters

| Field | Description |
|-------|-------------|
| `o` | Options field. See [Options](#options). |
| `report` | Index list report. |
| `drawer` | Drawer letter in which to place the index list report. Used with the `NEW` option: `DISPLAY,NEW,d`. |
| `l` | Line number within the index list report at which to begin displaying charts. Default = `5`. Used with the `RUN` option: `DISPLAY,RUN,report[,l]`. |
| `cyc?` | Cycle continuously? `Y`, `N`, or a number of cycles (1–99). Default = `N` (cycle once). `Y` = cycle until **Abort** is pressed. Used with the `CYC` option. |
| `interval` | Seconds between chart displays. Maximum = 60. Default = `3`. Used with the `CYC` option. |

---

## Options

| Option | Description |
|--------|-------------|
| `NEW` | Sets up an index list report in the specified drawer. |
| `ADD` | Adds the currently displayed graphics primitive code report to the index list report. |
| `RUN` | Displays charts manually — press **Resume** to advance to each chart in the list. |
| `CYC` | Displays charts automatically at the specified interval. Press **Abort** to display a selection screen. From the selection screen: press **Resume** to continue at the next sequential chart, or press **F2** (Back up) to go back one chart. |

---

## Example

**Step 1** — Create an index list report in drawer C:
```
display,new,c
```

**Step 2** — Display each graphics primitive code report and add it to the index:
```
display,add,3c
```

**Step 3** — Display the charts, either manually or automatically.

Manually (press **Resume** to advance each chart):
```
display,run,3c
```

Automatically (cycle 5 times with 4-second intervals):
```
display,cyc,3c,,5,4
```
