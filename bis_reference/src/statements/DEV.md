# DEV and @DEV — Device

## Overview

Lists any auxiliary devices configured for a specific station. Available as both an interactive **control line function** (`DEV`) and a **run statement** (`@DEV`).

---

## Syntax

**Control line (interactive):**

*(Windows / Linux / UNIX)*
```
DEV[,sn]
```
*(2200)*
```
DEV[,sn,dev]
```

**Statement:**

*(Windows Server / Linux / UNIX OS / Windows Client)*
```
@DEV[,sn,dev,,lab] vttyp,vaux .
```
*(2200)*
```
@DEV[,sn,dev,unit,lab] .
```

---

### Control Line Parameters

| Field | Platform | Description |
|-------|----------|-------------|
| `sn` | All | Station number to list devices for. Default = your station number. |
| `dev` | 2200 | Device type(s) to list. Blank = all; `C` = printers; `D` = 5¼-inch diskettes; `T` = tape cassettes / 8-inch diskettes. |

### Statement Parameters

| Field | Required | Platform | Description |
|-------|----------|----------|-------------|
| `sn` | Optional | All | Station number. Default (or `0`) = current station. |
| `dev` | Optional | All | Device type to search for. Windows/Linux/UNIX: `C` (printers) only. 2200: `C` = printers; `D` = 5¼-inch diskettes; `T` = tape cassettes / 8-inch diskettes. |
| `unit` | Optional | 2200 | Name of the unit in the terminal configuration report (e.g., `COP`, `CQP`, `DS1`). |
| `lab` | Optional | All | Label to branch to if no device is found at the specified station, or if the specified `unit` is not configured *(2200)*. |
| `vttyp` | Optional | Windows / Linux / UNIX | Variable to capture the current terminal type of the station. Values match those provided by `TTYPE$`. |
| `vaux` | Optional | Windows / Linux / UNIX | Variable to capture the current auxiliary device type of the station. |

---

## Reserved Words

| Reserved Word | Description |
|---------------|-------------|
| `STAT1$` | Number of devices of the type specified in `dev` *(2200: also may reflect the count for the `unit` subfield)*. |
| `STAT2$` | Total number of devices configured for the station. |
| `STAT3$` | `0` if the station does not exist; `1` if it does. |

---

## Behavior

### Interactive (Control Line)

Displays a screen listing all devices configured for the specified station. If no devices are configured, a message is displayed. Press **Paint** to return to the current report.

### Statement (`@DEV`)

**Windows / Linux / UNIX:**
- If devices are configured, lists them in a drawer A `-0` result. If output variables (`vttyp`, `vaux`) are used, no `-0` result is created.
- If no devices are configured, branches to `lab`.

**2200:**
- If devices are configured and no `unit` is specified, lists them in a drawer A result.
- If no devices are configured, or if the specified `unit` is not configured, branches to `lab`.
