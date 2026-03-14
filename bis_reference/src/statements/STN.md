# @STN — Station Information

## Overview

Obtains information about a specific station — for example, whether it is configured as a valid station or whether a user is currently signed on.

When executed:
- Variables are loaded with information about the station.
- The run goes to the specified label if the station or terminal type does not exist.
- *(Windows / Linux / UNIX)* The run also goes to the label if a user is not signed on.
- No result is created. Any result existing before `@STN` executes remains the current (`-0`) result.

---

## Syntax

```
@STN[,sn,lab
vuser,vdepnm,vdept,vttyp,vvsiz,vhsiz,vaspect,vcolor,vgraph] .
```

### Parameters

| Field | Description |
|-------|-------------|
| `sn` | Station number or terminal type to query. Default = the station executing the run. If a terminal type is specified, `vdept` contains `0` and `vuser`/`vdepnm` contain spaces. |
| `lab` *(Windows / Linux / UNIX)* | Label to go to if the station or terminal type does not exist, or a user is not signed on. |
| `lab` *(OS 2200)* | Label to go to if the station or terminal type does not exist. |
| `vuser` | Captures the user-id of the user signed on to the station. Contains spaces if no user is signed on or a terminal type was specified in `sn`. |
| `vdepnm` | Captures the department name of the user. Contains spaces if no user is signed on or a terminal type was specified in `sn`. |
| `vdept` | Captures the department number of the user. Set to `0` if no user is signed on or a terminal type was specified in `sn`. |
| `vttyp` | Captures the terminal type of the station. Names are identical to those provided by `TTYPE$`. |
| `vvsiz` | Captures the configured vertical screen size of the station. |
| `vhsiz` | Captures the configured horizontal screen size of the station. |
| `vaspect` | Captures the aspect ratio of the station (type `F`). Same as the value of `ASPECT$`. |
| `vcolor` | Captures the graphics color flag of the terminal. Same as the value of `COLOR$`. |
| `vgraph` | Captures the graphics type. Same as the value of `GRAPH$`. |

---

## Example

Obtains station information for station 100:

```
@stn,100,199 <user>h11,<dname>h12,<dnum>i4,<term>h7,\
<vsize>i2,<hsize>i3 .
```

| Field | Description |
|-------|-------------|
| `100,199` | Query station 100; go to label 199 if station 100 does not exist. |
| `<user>h11` | Load `<user>` with the user-id of the person currently signed on. |
| `<dname>h12` | Load `<dname>` with the department name. |
| `<dnum>i4` | Load `<dnum>` with the department number. |
| `<term>h7` | Load `<term>` with the terminal type. |
| `<vsize>i2` | Load `<vsize>` with the vertical screen size. |
| `<hsize>i3` | Load `<hsize>` with the horizontal screen size. |
