# DEVMAP — Device Mapping

> **Linux / UNIX only.**

> **Note:** Not available on workstations using Graphical Interface for Business Information Server software.

## Overview

Temporarily changes your terminal or auxiliary printer type, or immediately reconfigures your terminal or printer after an administrator makes device configuration changes.

Common use cases include:
- Applying administrator device configuration changes without signing off.
- Switching to a different set of terminal colors.
- Switching auxiliary printers.
- Switching to a specific terminal type after signing on as a non-configured station.

---

## Syntax

```
DEVMAP
DEVMAP [ttype,ptype]
```

### Parameters

| Field | Description |
|-------|-------------|
| `ttype` | Type of terminal, PC, or workstation as defined in the administrator database. |
| `ptype` | Type of auxiliary printer as defined in the administrator database. |

---

## Behavior

- Immediately reconfigures your terminal or printer.
- If you specify the **same device** you signed on with, the command picks up any changes made to the administrator's Device Configuration report since you signed on.
- If you specify a **new device**, the reconfiguration is effective for the current session only — unless the administrator also updates the Device Type or Aux Device fields in the Station Registration report. The original configuration resumes on the next session.

---

## Examples

Change terminal type to `PCEG` (PC with EGA card) and auxiliary printer to model `115`:
```
devmap pceg,115
```

Change terminal type to `PCEG` and remove the auxiliary printer:
```
devmap pceg,
```

Change only the printer type to model `115` (leave terminal type unchanged):
```
devmap ,115
```
