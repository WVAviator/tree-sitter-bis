# @PCW (MAPPER to PC)

## Overview

Transfers data from a report to a file on the local PC or network server. The statement transfers the report data to the specified object, then returns control to the run.

This statement requires a workstation session using one of the following clients:

- Graphical Interface for Business Information Server
- Business Information Server for Microsoft Windows Client

> **Note:** If the session is using either of these clients, the reserved word `WS$` (workstation flag) will equal `1`.

> **Note:** This statement is not allowed in background runs.

> **Note:** Trailing spaces on lines are dropped before the result is returned to the PC.

---

## Syntax

```
@PCW,c,d,r[,l,lab,opt] oname .
```

### Parameters

| Field | Description |
|-------|-------------|
| `c,d,r` | Report containing data to write. |
| `l` | Line number in the report at which to start copying data. Default = `3`. |
| `lab` | Label to go to if the transfer fails for any of the following reasons: report could not be read; invalid drive, directory, or path name specified; file is write-protected; diskette is not inserted. |
| `opt` | Option field. See [Options](#options). |
| `oname` | Name of the object to write to. May specify a PC file name or a version controlled name. If omitted, the name must be specified on line 2 (the title line) of the report in `c,d,r`. See notes below. |

> **Note:** Check `DWCAP$` for availability: `DWCAP$(12-1) = 1` if available. For more information on `DWCAP$`, see the Developer's Guide.

> **Note:** This command fails if you specify a version controlled name and version control naming is not supported. For more information on version control availability, see the Developer's Guide.

> **Note:** On Windows Server, Windows Client, Linux, and UNIX systems, `oname` can be omitted entirely (e.g., `@PCW,0,a,1 .`). On OS 2200, two apostrophes are required as placeholders (e.g., `@PCW,0,a,1 '' .`).

---

## Options

| Option | Description |
|--------|-------------|
| `T` | Suppresses translation. Suppresses character set translations when the National Character Set is selected on the user's workstation client. Ignored when the Multi-national Character Set is selected. |

---

## Reserved Words

`STAT1$` contains the following values:

| Value | Description |
|-------|-------------|
| `0` | File was successfully written. |
| `-1` | File was not successfully written. |

---

## Examples

Copy data in report `153A0` to a file named `A:\ROSE.BMP`:

```
@pcw,0,a,153 'a:'rslant$'rose.bmp' .
```

Copy data in report `153A0` starting at line 25. If the report does not exist, the run continues at label `100`:

```
@pcw,0,a,153,25,100 '' .
```
