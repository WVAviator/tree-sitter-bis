# @PCF (PC File)

## Overview

Retrieves workstation file and directory attributes. The status is returned in the `STAT1$` and `STAT2$` reserved words.

This statement requires a workstation session using one of the following clients:

- Graphical Interface for Business Information Server
- Business Information Server for Microsoft Windows Client

> **Note:** If the session is using either of these clients, the reserved word `WS$` (workstation flag) will equal `1`.

> **Note:** Check `DWCAP$` for availability: `DWCAP$(12-1) = 1` if available. For more information on `DWCAP$`, see the Developer's Guide.

---

## Syntax

```
@PCF[,opt] oname [vSize] .
```

### Parameters

| Field | Description |
|-------|-------------|
| `opt` | Option field. See [Options](#options). |
| `oname` | Name of the object containing the file name. The object may specify a PC file name. |
| `vSize` | Holds the file information — specifically, the byte count of the file. Returns `0` if GI-BIS does not support the feature. |

---

## Options

| Option | Description |
|--------|-------------|
| `S` | Returns basic existence and access information on the specified file. |

---

## Reserved Words

`STAT1$` contains the following values:

| Value | Description |
|-------|-------------|
| `0` | File or directory does not exist. |
| `1` | File exists. |
| `2` | Directory exists. |

`STAT2$` contains the following values:

| Value | Description |
|-------|-------------|
| `0` | File or directory does not exist. |
| `1` | File or directory is read-only. |
| `3` | File or directory has read and write capabilities. |

---

## Example

Request attribute status on a specified file from the workstation, then write it to the PC if it does not already exist:

```
@pcf,s 'c:'rslant$'rose.bmp' .
@if STAT1$ eq 1 gto 0120 .        \ Does the file exist?
@pcw,0,a,153 'c:'rslant$'rose.bmp' .  \ No, write it to the PC
@0120 .
```
