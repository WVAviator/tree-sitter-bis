# @DCPY — DDP Copy

> **2200 only.**

## Overview

Copies an OS 2200 program file, element, or data file from one host to another using DDP 1100.

> For detailed field information, refer to the *DDP-FJT Operations Guide, Vol. 1: IPF Interface*.

---

## Syntax

```
@DCPY[,lab] host,fn,rmhost,rmfn,type[,pos,transl,user,pw,cllv,acct,projid,qual,rmu,rmpw,rmcllv,rmacct,rmprojid,rmq,tmo] .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `lab` | Optional | Label to branch to if DDP 1100 returns an error status. |
| `host` | Required | Name of the source host as configured in DDP 1100. Specify as used in the IPF environment. |
| `fn` | Required | Name of the file on the source host. Enclose in apostrophes if the name contains special characters. |
| `rmhost` | Required | Name of the destination host as configured in DDP 1100. |
| `rmfn` | Required | Name of the file on the destination host. Enclose in apostrophes if the name contains special characters. |
| `type` | Required | Type of file or element to copy. If specifying more than one type, separate with commas and enclose in apostrophes. See [File Types](#file-types). |
| `pos` | Optional | `ADD` to append to the end of a file, or `REP` to replace the existing file or element. Note: `ADD` cannot be used when copying to an OS 2200 file. |
| `transl` | Optional | Data translation. Files transferred between two OS 2200 sites must use `TRA` (also the default). See [Translation Codes](#translation-codes). Only the first three characters need to be specified. |
| `user` | Optional | User-id for signing on to the source host. |
| `pw` | Optional | Password for signing on to the source host. |
| `cllv` | Optional | Two-character clearance level of the source host. |
| `acct` | Optional | Account number for the source host. |
| `projid` | Optional | Project-id for the source host. |
| `qual` | Optional | Qualifier used when the source file name contains a leading asterisk (`*`). |
| `rmu` | Optional | User-id for signing on to the remote (destination) host. |
| `rmpw` | Optional | Password for signing on to the remote host. |
| `rmcllv` | Optional | Two-character clearance level of the remote host. |
| `rmacct` | Optional | Remote account number used on the run card. |
| `rmprojid` | Optional | Remote project-id used on the run card. |
| `rmq` | Optional | Qualifier used when the remote file name contains a leading asterisk (`*`). |
| `tmo` | Optional | Timeout value in seconds. `DEFAULT` = 60s; `0` = return immediately; `NEG` = wait for completion; `MAX` = 86400s (24 hours). |

### File Types

| Type | Description |
|------|-------------|
| `DDP` | Copy the entire file. |
| `ALL` | Copy all elements of the program file. |
| `SYM` | Copy a symbolic element. |
| `REL` | Copy a relocatable element. |
| `ABS` | Copy an absolute element. |
| `OMN` | Copy an omnibus element. |

### Translation Codes

| Code | Description |
|------|-------------|
| `TRA[nsparent]` | Do not translate (default). Required for OS 2200–to–OS 2200 transfers. |
| `ASC[ii]` | Translate to ASCII. |
| `EBC[dic]` | Translate to EBCDIC. |

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

The DDP file transfer is implemented **asynchronously**. When `@DCPY` executes, the copy request is passed to DDP 1100, which performs preliminary error checking and returns a status indicating the copy is in progress. If preliminary checks fail, DDP 1100 does not return an error condition. In either case, control returns to the run immediately — the file is not fully copied before execution continues.

---

## Example

Copies all symbolic elements from file `A*B.` on host `RSL2` to file `D*E.` on host `TOC`, replacing any existing elements. Branches to label `1` on error.

```
@dcpy,1 rsl2,'a*b.',toc,'d*e.',sym,rep .
```

The software waits up to one minute for a status message from the destination host. Depending on system load, the copy may take additional time to fully complete after control is returned.
