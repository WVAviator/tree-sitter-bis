# @FON — Font

## Overview

Changes the character font used to display objects on a screen.

This statement requires a workstation session using one of the following clients:

- Graphical Interface for Business Information Server
- Business Information Server for Microsoft Windows Client

> **Note:** If the session is using either of the above clients, the reserved word `WS$` (workstation flag) is equal to `1`.

At any time, up to three different fonts can be defined for each Windows workstation session: the **Main Window font**, the **Run font**, and the **Text font**.

---

## Font Types

### Main Window Font

- Requires a nonproportional (fixed-pitch) font. TrueType fonts are required for portability.
- Selected by one of the following: at startup via a MAPPER Setup File (MSF), anytime from a workstation via **File → Display → Main Window Fonts**, or anytime from a run using `@FON,,name,size,opts`.
- Remains active until another Main Window font is selected.
- When no runs are active, used for displaying text on function keys and in reports and screens.

### Run Font (`R` type)

- Requires a nonproportional (fixed-pitch) font. TrueType fonts are required for portability.
- Selected by one of the following: automatically set to the Main Window font at the start of a run, or anytime from a run using `@FON,R,name,size,opts`.
- Remains active until the run encounters a `@FON,R` statement with no subfields, or the run terminates via `@DSX`, `@REL`, or `@GTO END`.
- When a run is active, used for displaying text on function keys and in reports and screens.
- If the `W` option is not set on the [`@WIN`](WIN.md) statement, the Run font size determines both the positioning and sizing of objects on screen.

**Effect of Run font on objects:**

| Object | Position Affected | Size Affected | Text Font |
|--------|:-----------------:|:-------------:|:---------:|
| `@BTN` | ✓ | | |
| `@CBX` | ✓ | | |
| `@EDT` | ✓ | | |
| `@LST` | ✓ | | |
| `@PIC` | ✓ | | |
| `@TXT` | ✓ | | |
| `@WIN` | ✓ | ✓ | ✓ |

### Text Font (`T` type)

- Can be either a nonproportional or proportional font. TrueType fonts are required for portability.
- Selected by one of the following: automatically set to the Run font at the start of a run, or anytime from a run using `@FON,T,name,size,opts`.
- Remains active until the run encounters another `@FON,T` statement (with or without subfields), or the run terminates via `@DSX`, `@REL`, or `@GTO END`.
- When a run is active, used for displaying text on objects.
- If the `W` option is not set on the `@WIN` statement, the Text font size determines the sizing of objects on screen.

**Effect of Text font on objects:**

| Object | Position Affected | Size Affected | Text Font |
|--------|:-----------------:|:-------------:|:---------:|
| `@BTN` | | | ✓ |
| `@CBX` | | ✓ | ✓ |
| `@EDT` | | ✓ | ✓ |
| `@LST` | | ✓ | ✓ |
| `@PIC` | | | |
| `@TXT` | | ✓ | ✓ |
| `@WIN` | | ✓ | |

---

## Syntax

**Generic format:**
```
@FON[,type,name,size,o,lab]
```

**Set the Main Window font:**
```
@FON,,name,size[,o,lab]
```

**Set the Run font to a specific font:**
```
@FON,R,name,size[,o,lab]
```

**Reset the Run font to the Main Window font:**
```
@FON,R
```

**Set the Text font to a specific font:**
```
@FON,T,name,size[,o,lab]
```

**Reset the Text font to the Run font:**
```
@FON
@FON,T
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `type` | Optional | Font type to set. `R` = Run font, `T` = Text font. If omitted, sets the Main Window font text without changing function button text. To change both the main window and function key text, use **File → Display → Main Window Fonts**. |
| `name` | Optional | Name of the font (e.g. `Arial`). Enclose names with embedded spaces in apostrophes. If not specified, `size` and `o` are ignored. Available fonts are listed under **File → Display → Fonts** on the main menu bar. |
| `size` | Optional | Font size. `L` = large, `M` = medium, `N` = normal character cell height, `S` = small. With the `P` option, specifies a point size; otherwise specifies the height of the character cell in pixels. For portability, use both `P` and `D` options. |
| `o` | Optional | Options field. See [Options](#options). |
| `lab` | Optional | Label to continue at if the `@FON` statement fails (e.g. the font cannot be located). `STAT1$` = `0` if successful; otherwise contains the error status. See *Graphical Interface Returned Status Codes*. To use status codes, check `DWCAP$(12-1) = 1`. |

---

## Options

| Option | Description |
|--------|-------------|
| `B` | Displays characters in bold. |
| `D` | If the specified font name or size does not exist, uses Windows font mapping to select an appropriate installed font. For main window font changes, selection is limited to nonproportional fonts. Check `DWCAP$(9-1) = 1` for availability. |
| `I` | Displays characters in italic. |
| `P` | Indicates the `size` subfield contains a point size. Check `DWCAP$(9-1) = 1` for availability. |
| `S` | Strikes through characters. |
| `T` | Changes the font immediately, without waiting for the current block to transfer. |
| `U` | Underlines characters. |

---

## Guidelines

- Always use TrueType fonts for all font types. TrueType fonts are scalable and provide the most reliable presentation across workstations with different display settings.
- Use one Run font (`@FON,R`) per run — it must be a fixed-pitch font.
- It is recommended to use **MAPPER Standard** for the Run font when defining object positions or sizes in row and column units. MAPPER Standard is an exact replacement for Terminal Font size 9 and is installed with both supported workstation clients.
- You may define multiple Text fonts (`@FON,T`) within a run. Text fonts are usually proportional; Arial is a good choice.
- A proportional font uses the system average character width provided by the font designer.
- There is a limit of **100 fonts per run**. Each unique combination of font face, size, and attribute option counts as a different font.
- Load font names in variables for easy maintainability of runs.
- Use the `P` and `D` options for increased portability among workstations.

> **Note:** `@FON` does not change all font-related properties of the main application font. Using `@FON` with the default type changes only the main window font text, not the function key font. To change the full main application font, use **File → Display → Main Window Fonts**.

---

## Example

Set the Run font to MAPPER Standard (fixed-pitch TrueType) once at the beginning of the run. Set the Text font to Arial, then later change it to Comic Sans MS:

```
@0001 FON,R,'MAPPER Standard',10,dp .   . First, define a Run Font
@0002 FON,T,'Arial',10,dp .             . Next, define a Text Font
@.                                      . Create your objects
@ WIN
@ BTN
@0003 FON,T,'Comic Sans MS',10,dp .    . Redefine a Text Font
@.                                      . Create more objects
@ CBX
@ EDT
```
