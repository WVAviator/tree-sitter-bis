# @DCRE — DDP Create

> **2200 only.**

## Overview

Creates a file on a DDP 1100 host. A file must be created with `@DCRE` on the remote host before it can be copied using [`@DCPY`](DCPY.md).

> For detailed field information, refer to the *DDP-FJT Operations Guide, Vol. 1: IPF Interface*.

---

## Syntax

```
@DCRE[,lab] host,fn[,dev,init,gran,maxfs,vol,access,user,pw,cllv,acct,projid,qual] .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `lab` | Optional | Label to branch to if DDP 1100 returns an error status. |
| `host` | Required | Name of the host configured in DDP 1100 where the file is to be created. Specify as used in the IPF environment. |
| `fn` | Required | Name of the file to create. Enclose in single quotation marks if the name contains special characters. |
| `dev` | Optional | Name of the device where the file is to be created. See the *DDP-FJT Operations Guide, Vol. 1* for valid device types. |
| `init` | Optional | Initial file size in units of granularity. Default = `0`. On an OS 2200 host: `(init × granularity) ÷ 7168` = number of tracks to allocate. |
| `gran` | Optional | Granularity — specifies the unit size in bytes for `init` and `maxfs`. Default = `7168` bytes (one track on OS 2200). |
| `maxfs` | Optional | Maximum file size in units of granularity. Default = system default size. |
| `vol` | Optional | Volume-id for a removable or system disk pack. Default = system fixed mass storage volume. |
| `access` | Optional | Access type (only the first three characters need to be specified): `PUB[lic]` = shared file; `PRI[vate]` = non-shared file (default). |
| `user` | Optional | User-id for signing on to the host. |
| `pw` | Optional | Password for signing on to the host. |
| `cllv` | Optional | Two-character clearance level of the host. |
| `acct` | Optional | Account number for the host. |
| `projid` | Optional | Project-id for the host. |
| `qual` | Optional | Qualifier used when the file name contains a leading asterisk (`*`). |

---

## Reserved Words

| Reserved Word | Description |
|---------------|-------------|
| `STAT1$` | Interface error code. |
| `STAT2$` | CLASS-CODE. |
| `STAT3$` | DETAIL-STATUS code. |

> See the *DDP-PPC/DDP-FJT Messages Reference Manual* for code values.

---

## Example

Creates file `A*B.` on host `RSL2` on an 8450 disk with a movable head (`f50m`). The file is public with an initial size of 10 tracks and a maximum of 500 tracks. Branches to label `1` on error.

```
@dcre,1 rsl2,'a*b.',f50m,10,,500,,pub .
```

Equivalent Exec control statement (batch or demand program):
```
@cat,p a*b.,f50m/10/trk/500 .
```
