# @PCR (Transfer from PC)

## Overview

Retrieves a file from a local PC or network server into a report.

This statement requires a workstation session using one of the following clients:

- Graphical Interface for Business Information Server
- Business Information Server for Microsoft Windows Client

> **Note:** If the session is using either of these clients, the reserved word `WS$` (workstation flag) will equal `1`.

> **Note:** This statement is not allowed in background runs.

---

## Syntax

```
@PCR[,c,d,r,b?,tltln?,lab,opt] oname .
```

### Parameters

| Field | Description |
|-------|-------------|
| `c,d,r` | Report to copy into. |
| `b?` | Does the file contain binary data? `Y` or `N`. Default = `N`. Used only when retrieving a version controlled object. *(Windows / Linux / UNIX)* Binary data cannot be read into drawers wider than 256 characters. *(2200 only)* Binary data can be read into drawers wider than 256 characters. |
| `tltln?` | Use the specified object name as the title? `Y` or `N`. If `Y`, the system inserts a line containing the object name at line 2 of the report. Binary reports always insert a title or a blank line. Default = `N`. |
| `lab` | Label to go to if the report cannot be read. |
| `opt` | Option field. See [Options](#options). |
| `oname` | Name of the object containing the list items. May specify a PC file name or a version controlled name. If omitted, the name must be specified on line 2 (the title line) of the report in `c,d,r`. See notes below. |

> **Note:** Check `DWCAP$` for availability: `DWCAP$(12-1) = 1` if available. For more information on `DWCAP$`, see the Developer's Guide.

> **Note:** This command fails if you specify a version controlled name and version control naming is not supported. For more information on version control availability, see the Developer's Guide.

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
| `0` | File was successfully read. |
| `1` | File could not be accessed (check file name). |
| `2` | File contains binary data. |

### Binary Data Definition

- *(Windows / Linux / UNIX)* Binary data is any character with octal values `000`–`007`.
- *(2200 only)* Binary data is any character with the following octal values: `000`–`010`, `013`, `016`–`033`, `037`.

> **Note:** Octal `032` is not considered binary data if it is the last character in the file (the End-of-File marker).

---

## Outcome

Executing this statement causes the following actions:

- Transfers specified data from a Business Information Server for Microsoft Windows Client or Graphical Interface for Business Information Server workstation into a report.
- If `oname` is a drive or subdirectory (ending with a reverse slant), the report contains a list of files in that drive or directory.
- If the retrieved data is wider than the receiving report, the data is continued on a new line.

---

## Examples

Copy a Repository object named `rose` into report `63C32`, inserting the full object name `ROSE.BMP()` as the title at line 2:

```
@pcr,32,c,63,,y 'rose.bmp()' .
```

Retrieve an MS-DOS bitmapped file, create a result, and display it:

```
@pcr,32,c,-0,y,y 'f:\bmp\demo.bmp' .
@dsp,-0 .
```

Retrieve a directory listing and display it:

```
@PCR,0,a,-0 'C:\mydirectory\' .
@DSP,-0 .
```
