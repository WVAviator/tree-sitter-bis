# @DFC — Set Default Color

## Overview

Sets the default foreground and background colors for a Graphical User Interface (GUI) run. These defaults apply to any GUI control statement that does not specify its own colors.

Affected statements: [`@BTN`](BTN.md), [`@CBX`](CBX.md), [`@EDT`](EDT.md), [`@LST`](LST.md), [`@TXT`](TXT.md), [`@WIN`](WIN.md).

> **Session Requirement:** This statement requires a workstation session using one of the following clients:
> - Graphical Interface for Business Information Server
> - Business Information Server for Microsoft Windows Client
>
> When using either of these clients, the reserved word `WS$` (workstation flag) equals `1`.

**Notes:**
- `@DFC` does not set colors for the main window.
- If only one color is specified (no slant), that color is used for both foreground and background.
- Specifying a color as a single space in apostrophes (`' '`) uses the default — the colors from the previous `@DFC` statement, or black foreground / white background if no `@DFC` has been executed.

---

## Syntax

```
@DFC,fc/bc .
```

### Parameters

| Field | Description |
|-------|-------------|
| `fc` | Default foreground color. See [Color Codes](#color-codes). |
| `bc` | Default background color. See [Color Codes](#color-codes). |

---

## Color Codes

Three categories of color specification are supported and can be mixed freely within a run or individual control:

- **MAPPER color codes** — named codes for basic colors (e.g., `whi`, `blu`).
- **RGB hex codes** — three hex values (00–FF each) defining red, green, and blue components; provides a palette of over 16 million colors.
- **Windows / 3D system colors** — uses colors from the user's Windows Display Properties.

### Color Code Table

| MAPPER Code | RGB Hex | Color / Definition |
|-------------|---------|-------------------|
| `bla` | `000000` | Black |
| `whi` | `FFFFFF` | White |
| — | `FFC000` | Orange |
| `red` | `FF0000` | Red |
| `dred` | `800000` | Dark red |
| — | `C000FF` | Violet |
| — | `30C0FF` | Light blue |
| `blu` | `0000FF` | Blue |
| `dblu` | `000080` | Dark blue |
| — | `C0FFC0` | Light green |
| `gre` | `00FF00` | Green |
| `dgre` | `008000` | Dark green |
| — | `C0FFFF` | Light cyan |
| `cya` | `00FFFF` | Cyan |
| `dcya` | `008080` | Dark cyan |
| `lgra` | `C0C0C0` | Light gray |
| `gra` | `808080` | Gray |
| — | `606060` | Dark gray |
| — | `FFFFC0` | Light yellow |
| `yel` | `FFFF00` | Yellow |
| `bro` | `808000` | Brown |
| — | `FFCCFF` | Light pink |
| `pin` | `FF00FF` | Pink |
| `dpin` | `800080` | Dark pink |
| `mag` | `800080` | Magenta *(same color as dark pink)* |
| `win` | — | Window-configured colors for window text and background. |
| `3D` | — | Colors defined in Windows Display Properties for 3D objects. Produces `win` colors for `CBX`, `EDT`, or `LST`. |
| `3DB` | — | 3D Border — produces a border color based on the 3D color; used to create a raised or lowered appearance. |
| `3DD` | — | 3D Dark — produces a shadowed color based on the 3D color; used to create a raised or lowered appearance. |
| `3DL` | — | 3D Light — produces a highlighted color based on the 3D color; used to create a raised or lowered appearance. |

### Availability Notes

Check `DWCAP$` before using the following color types:

| Color | Required Capability |
|-------|-------------------|
| `win` | `DWCAP$(12-1) = 1` |
| RGB hex codes | `DWCAP$(13-1) = 1` |
| `3D` | `DWCAP$(13-1) = 1` |
| `3DB`, `3DD`, `3DL` | `DWCAP$(14-1) = 1` |

> When `win` or `3D` is specified for either foreground or background, the Windows-configured foreground/background color pair is used for both. For example, `red/win` produces the same result as `win/win` or just `win`.

---

## Examples

Set default colors to white text on a blue background:
```
@dfc,whi/blu .
```

Set default colors to dark gray text on a light yellow background (using RGB hex codes):
```
@dfc,606060/FFFFC0 .
```
