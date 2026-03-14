# @SCN — Screen Size

## Overview

Use the `@SCN` statement to obtain the size of the user's screen and main window. `@SCN` returns the vertical and horizontal size of both the screen and the main window in positioning units and row column units.

This statement requires a workstation session using one of the following clients:

- Graphical Interface for Business Information Server
- Business Information Server for Microsoft Windows Client

> **Notes:**
> - If the session is using one of the above clients, the reserved word `WS$` (workstation flag) equals `1`.
> - Check `DWCAP$` for availability: `DWCAP$(14-1) = 1` if available. See the *Developer's Guide* for more information on `DWCAP$`.

---

## Syntax

```
@SCN[,lab]
[pscnv,pscnh,pwinv,pwinh,cscnv,cscnh,cwinv,cwinh] .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `lab` | Optional | Label to go to if the `@SCN` statement fails within the workstation client. |
| `pscnv` | Optional | Variable to capture the inside vertical size of the screen in positioning units. |
| `pscnh` | Optional | Variable to capture the inside horizontal size of the screen in positioning units. |
| `pwinv` | Optional | Variable to capture the inside vertical size of the main window in positioning units. |
| `pwinh` | Optional | Variable to capture the inside horizontal size of the main window in positioning units. |
| `cscnv` | Optional | Variable to capture the inside vertical size of the screen in row column units. |
| `cscnh` | Optional | Variable to capture the inside horizontal size of the screen in row column units. |
| `cwinv` | Optional | Variable to capture the inside vertical size of the main window in row column units. Note: Similar to `SCNV$`, except that `SCNV$` includes rows hidden by scroll bars and excludes the function key area of the main window. |
| `cwinh` | Optional | Variable to capture the inside horizontal size of the main window in row column units. Note: Similar to `SCNH$`, except that `SCNH$` includes columns hidden by scroll bars. |

---

## Guidelines

- The inside size of the screen or main window is the client displayed area. This excludes title bars, task bars, scroll bars, borders, frames, and any area hidden unless using scroll bars.
- When the screen or main window is created in positioning units but the size is requested in row column units, the result is rounded up or down (depending on pixel size) to a whole number.

---

## Error Handling

If `@SCN` specifies a label in the `lab` field and the statement receives an error from the workstation client, the run continues at that label. The `STAT1$` reserved word contains the error status — see *STAT1$ Values* for possible values.

> **Note:** If a run syntax error is detected, the run will error out and will not continue at the specified label.

---

## Examples

Get screen and main window sizes in positioning units:

```bismapper
@scn,0101 <pscnv>i5,<pscnh>i5,<pwinv>i5,<pwinh>i5 .
```

Get screen and main window sizes in row column units:

```bismapper
@scn,0101 ,,,,<cscnv>i3,<cscnh>i3,<cwinv>i3,<cwinh>i3 .
```
