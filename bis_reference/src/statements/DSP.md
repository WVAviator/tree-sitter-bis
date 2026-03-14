# D and @DSP — Display Report

## Overview

Displays a report. Available as both an interactive **control line function** (`D`) and a **run statement** (`@DSP`).

The displayed report is renamed `-0`. The output area is cleared on display. For non-interim displays, I/O, LLP, and DLP counts are reset.

If a report has a user-private or department-private password, the same user-id or department number used when the password was set is required. *(2200 only: if the report is in a password-protected drawer, the drawer must be unlocked first.)*

---

## Syntax

**Control line (interactive):**
```
report [f,l]
D datanm [f,l]
```
> The `D` call is not required when specifying a report directly.

**Statement (in a run):**
```
@DSP,c,d,r[,l,tabp,f,interim?,hold,msg] .
```

### Control Line Parameters

| Field | Description |
|-------|-------------|
| `report` | Report to display. See *Specifying Reports or Drawers to Process*. |
| `datanm` | Report name from the system directory. Must be in the same cabinet as the requested report. |
| `f` | Report format for display. Allows viewing fields beyond column 80. Default = `0` (basic format). |
| `l` | Line number at which to begin the display. |

### Statement Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `c,d,r` | Required | Report to display. See *Specifying Reports or Drawers to Process*. |
| `l` | Optional | Line number at which to start the display. |
| `tabp` | Optional | Tab position after which to place the cursor. Use a negative number to move backwards. Maximum = 100. Default = Roll field position (0). |
| `f` | Optional | Report format. Default = `0` (basic format). Omit if using a format defined by [`@FMT`](FMT.md) or [`@SFC`](SFC.md). Valid values: 1–25 *(Windows/Linux/UNIX)*; 1–6 *(2200)*. |
| `interim?` | Optional | Interim display? `Y` or `N`. If `Y`, the run continues automatically after the display completes. Default = `N`. |
| `hold` | Optional | Number of already-displayed lines to hold on screen, or `H` to hold the report headings. The new display begins on the first non-held line. |
| `msg` | Optional | Message to display on the control line. Enclose significant spaces in apostrophes. Default tab position = home. Max characters = display width *(Windows/Linux/UNIX)*; display width − 1 *(2200)*. |

---

## Guidelines

- To continue the run after a non-interim display, the run user presses **Resume**.
- Do not place other statements on the same line after `@DSP` — any statements following it on the same line are ignored. Put the next statement on a new line.
- Use `@DSP` as a **debugging aid** to display intermediate output as statements are processed. Remove the `@DSP` statements once the output is verified.
- Use `@DSP` to **pause a run for manual updating** when user review is an integral part of the run.
- Customize the report format by preceding `@DSP` with a [`@FMT`](FMT.md) or [`@SFC`](SFC.md) statement.
- Customize the function key bar displayed with the report. See [`@FKY`](FKY.md) and [`@SC`](SC.md).
- If an odd-numbered cabinet is specified, the report cannot be updated.

---

## Examples

### Control Line

Display report `2B0` in format 3:
```
2b0 3
```
Equivalent statement:
```
@dsp,0,b,2,,,3 .
```

Display report named `Inventory` in format 2, starting at line 15:
```
d inventory 2,15
```
Equivalent statement:
```
@dsp,'inventory',15,,2 .
```

### Statement

Display report `1C0` starting at line 8, continuing the run automatically after display:
```
@dsp,0,c,1,8,,,y .
```

Display format 5 of report `1D0` starting at line 3, with a control line message:
```
@dsp,0,d,1,3,,5,,,'This line displayed on control line.' .
```
