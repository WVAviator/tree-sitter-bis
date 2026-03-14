# SOE Updating and @WRL — Write Line

## Overview

Use SOE updating to change information in a report interactively. Use the `@WRL` statement to update up to 23 lines of a report programmatically.

> **Note:** Precede all `@WRL` statements with a [`@LOK`](LOK.md) (Update Lock) statement unless you are processing a result. Follow the `@WRL` statement with an [`@ULK`](ULK.md) (Unlock) statement to release update control.

---

## Syntax

### Statement (Windows / Linux / UNIX)

```
@WRL,c,d,r,l[,ntuid?,wpw,,rpw] cc ltyp,vld .
```

### Statement (2200)

```
@WRL,c,d,r,l[,ntuid?,wpw,ccpy?,rpw] cc ltyp,vld .
```

### Parameters

| Field | Platform | Required | Description |
|-------|----------|----------|-------------|
| `c,d,r` | All | Required | Report to update. See *Specifying Reports or Drawers to Process* for details. |
| `l` | All | Required | First line number to update. |
| `ntuid?` | Windows / Linux / UNIX | Optional | Do not update the time and user-id in the date line? `Y` or `N`. Default = `N`. If `Y` is specified but the update date on the report is not the current date, the system overrides this and writes the update time, date, and user-id anyway. |
| `ntuid?` | 2200 only | Optional | Do not update the time and user-id in the date line? `Y` or `N`. Default = `N`. If this is the first `@WRL` update since the last purge or merge, the time and user entries in the `.DATE` line are always updated regardless of this setting. |
| `wpw` | All | Optional | Write password to place on the report. All fields after `wpw` are mandatory when setting a write password — you cannot set a write password without also updating the report. |
| `ccpy?` | 2200 only | Optional | *(Only applies when using [`@DFU`](DFU.md) — Defer Updates.)* Write a complete copy of the report if this is the first `@WRL` since executing `@DFU`? `Y` or `N`. Default = `N`. Writing a complete copy may incur additional I/O overhead but can significantly reduce the cost for other users attempting to access the same report while it is under a deferred update lock. |
| `rpw` | All | Optional | Read password to place on the report. As with write passwords, you cannot set a read password without also updating the report. |
| `cc` | Windows / Linux / UNIX | Required | Column-character positions or names of the fields in which to write data. If column 1 is included, the line type designator is overwritten. |
| `cc` | 2200 only | Required | Column-character positions or names of the fields in which to write data. Note: Starting with level 35R1, `@WRL` writes data on period lines in the columns specified in `cc`. In previous levels, data was always written starting in column 2. |
| `ltyp` | All | Required | Line type to write. Updated lines are changed to this line type. Note: Unlike other statements where `ltyp` specifies the line type *to process*, in `@WRL` it specifies the line type *to be written*. |
| `vld` | All | Required | Content to write — variables, literals, reserved words, constants, or any combination. |

---

## Outcome

### SOE Updating

The system updates the report with the requested changes and writes the date, time, and user-id of the update in the date line.

### @WRL Statement

The statement updates the report, renames that report `-0`, and releases any previous `-0` result. The date line update can optionally be suppressed using the `ntuid?` field.

---

## SOE Updating Guidelines

### To Update a Report

1. Display a report.
2. Type changes on any lines on the screen below the date line.
3. Position the cursor below or at the end of the last line you changed and transmit.

### If You Do Not Want the Changes

- If you have already transmitted the changes, press **Undo** to undo the most recently transmitted changes.
- If you have not yet transmitted, press **Paint** to remove the changes from the screen.

### To Update a Report Using the SOE Key

1. Position the cursor on the line above or to the left of the area you intend to change and press **SOE**.
2. Enter changes following the SOE character.
3. Position the cursor following your changes and transmit.

Use an SOE character to isolate the data you are changing. For example, if you changed data in several places on the screen but decide you do not want to keep the changes in the upper part, enter an SOE character immediately preceding the data you do want to change. You can press **Paint** to confirm the upper part of the report was not updated.

> *(2200 only)* An SOE character is not required when updating a report, but using one is recommended. It improves response time because only the characters between the SOE and the cursor are transmitted to and from the host.

---

## Examples

### Writing One Line

Locks report `3B0`, writes line 6 as a tab line with `SH` in columns 2–3, then unlocks:

```bismapper
@lok,0,b,3 wrl,0,b,3,6 2-2 |,SH ulk .
```

| Part | Description |
|------|-------------|
| `lok,0,b,3` | Lock report `3B0`. |
| `wrl,0,b,3,6` | Write line 6 in report `3B0`. |
| `2-2 \|,SH` | Write a tab line with `SH` in column 2 for two characters. |
| `ulk` | Release update control. |

### Writing Multiple Lines

Writes two tab lines (lines 6 and 7) in report `3B0`:

```bismapper
@lok,0,b,3 .
@wrl,0,b,3,6 5-6,77-3 |,930604,FRI/|,930614,MON .
@ulk .
```

| Part | Description |
|------|-------------|
| `wrl,0,b,3,6` | Write lines starting at line 6 in report `3B0`. |
| `5-6,77-3` | Write six characters beginning in column 5 and three characters beginning in column 77. |
| `\|,930604,FRI/` | In line 6, write `930604` in the first set of columns and `FRI` in the second. |
| `\|,930614,MON` | In line 7, write `930614` in the first set of columns and `MON` in the second. |

---

## See Also

- [`@LOK`](LOK.md) — Update Lock
- [`@ULK`](ULK.md) — Unlock
- [`@DFU`](DFU.md) — Defer Updates
- [`@RDC`](RDC.md) — Read Continuous
