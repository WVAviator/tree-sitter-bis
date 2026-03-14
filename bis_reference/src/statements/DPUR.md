# @DPUR — DDP Purge

> **2200 only.**

## Overview

Deletes a file on a DDP 1100 host.

> For related DDP operations, see [`@DCPY`](DCPY.md) (DDP Copy) and [`@DCRE`](DCRE.md) (DDP Create).

---

## Syntax

```
@DPUR[,lab] host,fn[,user,pw,cllv,acct,projid,qual] .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `lab` | Optional | Label to branch to if the DDP 1100 host returns an error status. |
| `host` | Required | Name of the host configured in DDP 1100 where the file is to be deleted. Specify as used in the IPF environment. |
| `fn` | Required | Name of the file to delete. Enclose in apostrophes if the name contains special characters. Must include any read and write keys required by the host. |
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

## Guidelines

- Each `@DPUR` statement deletes exactly one file.
- `@DPUR` can delete entire program or data files but cannot delete individual elements within a file.
- DDP 1100 enforces access protection — the file name must include any required read and write keys to prevent unauthorized deletion.

---

## Example

Delete file `A*B.` on host `RSHS`. Branches to label `1` on error.

```
@dpur,1 rshs,'a*b' .
```
