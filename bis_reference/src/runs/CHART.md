# CHART — Create Chart

## Overview

Creates color charts for screen display or output to a printing device.

### Supported Chart Types

| | | |
|-|-|-|
| Bar | Pareto | 3D Bar |
| Block | Pie | Time Line |
| Line | Radar | Text |
| Mixed Bar and Line | Scatter | Target |

> **Note:** Your terminal must be configured for graphics.

---

## Control Line Format

```
CHART[,call,report]
```
or
```
call[,report]
```

### Parameters

| Field | Description |
|-------|-------------|
| `call` | Call for the type of chart being produced (e.g., `pieg`). |
| `report` | Chart report in the current cabinet. Default = current report. |

---

## Procedures

### Viewing Chart Examples
Enter `chart,e` on the control line to browse available chart types. Select a chart, then press **Chart** to display it.

### Creating a Chart
Enter data in a chart report, then enter `chart` on the control line.

### Displaying a Chart
- From a completed chart report: press **Chart**.
- From a graphics primitive code report: enter `g -` or `chart,c`.
- From a specific report with no report currently displayed: enter `chart,c,report`.

### Using a Chart in a Run
Use the `RUN` or `LNK` statement to execute a chart script. Save the chart as a graphics primitive code report and use the `DSG` (Display Graphics) statement to display it.

### Text with Apostrophes
To use an apostrophe in chart text, enter two apostrophes (e.g., `Chris''s`). Single apostrophes may cause data corruption.

### Removing a Chart from the Screen
- **Graphical Interface / Windows:** Close the chart window using standard Windows procedures.
- **PC:** Press **Resume** to continue; to toggle back to the previous text screen, press **Shift + ESC** twice. On PCs with STEP/PEP, press **F1**.
- **UTS 30 / UTS 60:** Press **Resume** to continue; to toggle back, press **Shift + DISP 1-2** twice.

After removing a chart, pressing **Resume** displays the graphics primitive code. This code can be saved and used in the MULTI, Display, and Graphics Scaler commands via the Replace Report or Duplicate Report commands.

---

## Printing a Chart

> If you are unsure which printing devices on your system are configured for graphics, contact your administrator.

### Procedure 1 — Keyboard Keys

| Key | Description |
|-----|-------------|
| **AuxDev** | Prints on an AUX type printing device configured for graphics. *(Linux/UNIX only)* |
| **SysPrt** | Prints on a system printing device configured for graphics. *(Linux/UNIX only)* |
| **Plot** | Prints on a plotter. |

### Procedure 2 — Control Line

Display the chart report using the following format, then press **Plot**. If a device type is entered, the system displays graphics primitive code; enter `chart,p` to print.

**Windows / Linux / UNIX:**
```
call,report
```

**2200:**
```
call,report,device-type,sn[,psize?,transpcy?]
```

| Field | Description |
|-------|-------------|
| `call` | Call for the chart (e.g., `pieg`). |
| `report` | Report number where the chart is located. Do not enter if the report is already displayed. May contain only the report number and drawer letter — not the cabinet number. |
| `device-type` | *(2200 only)* Terminal type: `PCC` (PC/CGA), `PCE` (PC/EGA/VGA/SVGA), `PCS` (PC/Unisys high-res), `PCH` (Hercules). Specify `3S` or `6S` for HP-7475A or HP-7550A plotters. |
| `sn` | Station number of the printing device. Default = `0`. |
| `psize?` | *(2200 only)* Paper size. `Y` = 11×17 inches. Default = `N` (8½×11 inches). |
| `transpcy?` | *(2200 only)* `Y` = slower pen speed (prevents ink smears on transparencies). Default = `N`. |

### Procedure 3 — From Graphics Primitive Code

With graphics primitive code on display:

```
CHART,P,report,sn
```

| Field | Description |
|-------|-------------|
| `report` | Report number containing the graphics primitive code. Do not enter if the report is already displayed. May contain only the report number and drawer letter — not the cabinet number. |
| `sn` | Station number of the printing device. Default = `0`. |

---

## Sending Graphics Primitive Code to a Plotter

Use the **Send Code to Plotter** selection from the Chart menu to design and plot charts using graphics primitive code. Your terminal or a remote terminal must be attached to a plotter.

- **Local plotter:** Transmit from the Send Code to Plotter menu selection, or enter `chart,p`.
- **Remote plotter:** Enter `chart,p,report,sn`, where `report` is the chart report in the current cabinet (default = current result) and `sn` is the station number of the terminal attached to the plotter.

> **Note:** For a plottable version of a chart, do not use the graphics primitive code generated after pressing **Chart**. Use the Send Code to Plotter procedure above instead.
