# Iterative Runs

## Overview

Iterative runs are utilities that let you perform a manual function, save the completed function mask, alter the mask, and reuse it as many times as needed. They support all the functionality of their corresponding manual functions, but with greater convenience:

- Save completed function masks and reuse them later.
- Retrieve previously saved masks and alter them without refilling entire masks from scratch.
- Translate function masks into run statement format, which can be added directly to an existing run.

The available iterative runs are:

| Run | Run | Run | Run |
|-----|-----|-----|-----|
| [`IBFN`](../runs/IBFN.md) | [`ICNT`](../runs/ICNT.md) | [`IFND`](../runs/IFND.md) | [`ISRH`](../runs/ISRH.md) |
| [`ICAL`](../runs/ICAL.md) | [`IDAT`](../runs/IDAT.md) | [`ISOR`](../runs/ISOR.md) | [`ITOT`](../runs/ITOT.md) |

---

## Using Iterative Runs

You can execute iterative runs using either the menu procedure or the control line format. The report you intend to process must reside in the current cabinet.

### Format

```
IBFN[*] report|drawer [,f,maskname,maskrep]
```

### Parameters

| Field | Description |
|-------|-------------|
| `*` | Optional. Specifies that field names are used in place of column character positions when a run statement is produced. |
| `report` | The report to process. See the Command Reference for details. |
| `drawer` | The drawer to process. Use this field to process all reports in a given drawer. See the Command Reference for details. |
| `f` | Report format in which to process data. Enables processing of fields beyond column 80 if those columns are not already on display. |
| `maskname` | The name of an existing or new function mask, or blank. If left blank, you are prompted to name the mask when saving it. Name must be 1–12 characters, begin with a letter, and contain no spaces. |
| `maskrep` | The report containing previously saved function masks. Use this when the masks are stored in a report other than the one being processed. Cannot be specified if `maskname` is blank. |

### Outcome

When an iterative run executes:

- The run performs the corresponding manual function (e.g., `ICAL` performs computations just as the `CAL` function does).
- If you save the mask, it is placed as a set of asterisk lines at the end of the current report — or another report you specify. The run updates the report directly; it does not create a result.
- If a result was on display when you started the run, the mask is placed at the end of that result. To save masks permanently, replace or duplicate the result to create a permanent report.

After the command executes, the following function keys are available:

| Key | Description |
|-----|-------------|
| **Mask** | Redisplays the function mask so you can change options and parameters and run the command again. |
| **Report** | Redisplays the original report or result. |
| **BackUp** | Displays the mask used just before the current one. Pressing up to three times cycles back through the three most recently used masks; pressing a fourth time returns to the most recent mask. |
| **Save** | Displays a menu to name the mask and optionally specify the report to save it in. If you use the name of a previously saved mask, the current mask replaces it. |
| **@xxx** | Displays the run statement generated from the most recently processed mask (e.g., pressing `@SOR` while using `ISOR` shows the generated `SOR` statement). |
| **Help** | Displays online help for the function mask, field, or iterative run, depending on what is currently on display. |
| **Quit** | Terminates the iterative run and displays the active screen. |

### Guidelines

- You cannot save a mask until after you have performed the corresponding manual function by transmitting from the function mask.
- You can save multiple masks in the same report, each with a different name. Each mask may contain a maximum of six parameter lines.
- [`ICAL`](../runs/ICAL.md) is particularly useful for building complex sets of equations one step at a time.
- *(Windows / Linux / UNIX)* [`ICAL`](../runs/ICAL.md) differs slightly from the other iterative runs — a report must be on display when you execute it, and its input screens are slightly different.

---

## Exercise

This exercise walks through the basic iterative run workflow using `ISOR`.

1. Duplicate report `2B0` and display the duplicate.
2. Start the [`ISOR`](../runs/ISOR.md) run using either the menu procedure or the control line format.
3. Enter some options and parameters. See the Command Reference for ideas.
4. Press **Transmit** to see the sorted result.
5. Press **Mask** to retrieve the completed mask and modify some parameters.
6. Press **Transmit** to see the newly sorted result.
7. Press **Save** to display the Save Mask form.
8. Enter a mask name and press **Transmit**.
9. Press **Report** and scroll to the end of the report to view the saved mask.
