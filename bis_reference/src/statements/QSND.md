# @QSND (Send Message, No Response)

*(2200 only)*

## Overview

Sends a message to a named queue through the Data Transfer Module (DTM) and expects no response.

---

## Syntax

```
@QSND[,c,d,r,l,q,,eol,tabs?,,sn,oq,acct,,lab] dnfunc,dnqu[,[domain\]user,dept,pw,dnrun,vld] .
```

### Parameters

| Field | Description |
|-------|-------------|
| `c,d,r` | Report to send. The cabinet and drawer also define where to place any response. |
| `l` | First line to send. Default = `2`. |
| `q` | Number of lines to send. Default = all. |
| `eol` | End-of-line character. The system normally truncates lines after the last non-space character. If sending to a non-BIS system, trailing spaces may need to be preserved — place any graphic character here and the system truncates each data line at its first occurrence. If sending to a BIS system, lines are space-filled to the width of the receiving report. |
| `tabs?` | Translate tabs or other control characters to spaces? `Y`, `N`, or `C` (compress — removes them from the data). Default = `N`. Particularly useful when sending a BIS report to a non-BIS system. |
| `sn` | Station number of the sender, if different from your own. |
| `oq` | Name of the originating queue (up to 12 characters). Default = value in `DTNAM$`. Must be a valid input queue. |
| `acct` | Accounting department number (up to 12 characters). Default = your department or the value in `DEPT$`. When sending to another run, captured in field 6 (Chargeback Account Number) via [`@QCTL`](QCTL.md) `INFO`. When sending to a TIP transaction, captured in `MTQ-CONTROL-LINE (MCL-ACCOUNT)`. See the SCHDLR Reference for more information. |
| `lab` | Label to go to in case of error. |
| `dnfunc` | Destination function: `Q` = call the default input process run of the destination queue (not supported by SCHDLR); `R` = call the named run or TIP transaction. |
| `dnqu` | Name of the destination queue. Must be a valid send queue. |
| `domain` | Optional domain name used to qualify the user-ID. |
| `user` | User-ID at the destination. Default = user-ID of the user executing the run, if configured. |
| `dept` | Department number at the destination. Required only when the destination is another BIS system. |
| `pw` | Password at the destination. |
| `dnrun` | Name of the run or TIP transaction to call. `dnfunc` must equal `R`; not applicable if `dnfunc` equals `Q`. |
| `vld` | Data to send. Can be a variable, constant, reserved word, literal, or any combination. Enclose literal data containing spaces, commas, or reverse slants in apostrophes. Maximum = 80 items, up to 18 characters each. Captured via `INPUT$` in a run, or in `MTQ-TURNAROUND-LINE (MTL-VBL)` if the called run is a TIP transaction. |

---

## Examples

Send the current result to a queue named `SCHDLR` and start TIP transaction `DXDTST`, going to label `50` on error:

```
@qsnd,-0,,,,,,,,,,,50 r,schdlr,,,,dxdtst .
```

| Field | Value | Description |
|-------|-------|-------------|
| `c,d,r` | `-0` | Send the current result. |
| `lab` | `50` | Go to label `50` in case of error. |
| `dnfunc` | `r` | Call the named run. |
| `dnqu` | `schdlr` | Send to a queue named `SCHDLR` (default name for SCHDLR). |
| `dnrun` | `dxdtst` | Start TIP transaction `DXDTST`. |

Send the current result to the `MAPPER` queue and start the run `DXDTST` using explicit sign-on credentials:

```
@qsnd,-0,,,,,,,,,,,50 r,mapper,newuser,7,psw,dxdtst .
```

| Field | Value | Description |
|-------|-------|-------------|
| `c,d,r` | `-0` | Send the current result. |
| `lab` | `50` | Go to label `50` in case of error. |
| `dnfunc` | `r` | Call the named run. |
| `dnqu` | `mapper` | Send to the queue named `MAPPER` (sending to itself). |
| `user,dept,pw` | `newuser,7,psw` | Sign-on credentials at the destination. |
| `dnrun` | `dxdtst` | Start the MAPPER run `DXDTST`. |
