# @QSNR (Send Message, Expect Response)

*(2200 only)*

## Overview

Sends a message to a named queue through the Data Transfer Module (DTM) and expects a response.

---

## Syntax

```
@QSNR[,c,d,r,l,q,,eol,tabs?,,sn,tmo,acct,,lab]
    dnfunc,dnqu[,[domain\]user,dept,pw,dnrun,vld]
    rspfunc[,rspqu,[domain\]user,dept,pw,rsrun,vld vstat] .
```

### Parameters

| Field | Description |
|-------|-------------|
| `c,d,r` | Report to send. The cabinet and drawer also define where to place the response. |
| `l` | First line to send. Default = `2`. |
| `q` | Number of lines to send. Default = all. |
| `eol` | End-of-line character. The system normally truncates lines after the last non-space character. If sending to a non-BIS system, trailing spaces may need to be preserved — place any graphic character here and the system truncates each data line at its first occurrence. If sending to a BIS system, lines are space-filled to the width of the receiving report. |
| `tabs?` | Translate tabs or other control characters to spaces? `Y`, `N`, or `C` (compress — removes them from the data). Default = `N`. Particularly useful when sending a BIS report to a non-BIS system. |
| `sn` | Station number of the sender, if different from your own. |
| `tmo` | Maximum time in seconds the calling run may wait for a response. Default = `30`. Use `-1` for indefinite. The run waits until it receives a response, the user presses Message, or `tmo` is reached. |
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
| `rspfunc` | **Required.** Response function. See [Response Functions](#response-functions). |
| `rspqu` | Queue to receive the response. Must be currently initialized as an input queue on this BIS system. Default = value in `DTNAM$`. |
| `user` | User-ID at the originating queue. Required when `rspfunc` = `R` or `SR`. |
| `dept` | Department number at the originating queue. Required when `rspfunc` = `R` or `SR`. |
| `pw` | Password at the originating queue. Required when `rspfunc` = `R` or `SR`. |
| `rsrun` | Name of the run to call. Required when `rspfunc` = `R` or `SR`. |
| `vld` | Data to send with the response routing. Same rules as the destination `vld` field above. |
| `vstat` | Variable to capture the status code supplied by the responder in case of error (1–8 characters). All spaces = no error; otherwise the run goes to the label. See note below. |

> **Note:** Error status codes in `vstat` are derived from the `err` subfield in the [`@QRSP`](QRSP.md) statement. If `@QRSP` is prepared by the DTERR run, `vstat` contains the mnemonic for the error code — enter `help,err-code` for details. If prepared by a user run, the value is user-defined. A TIP transaction cannot specify a value for this field.

---

## Response Functions

| Function | Description |
|----------|-------------|
| `Q` | Give control to the default input process run of the queue. |
| `R` | Give control to `rsrun`. |
| `SQ` | Wait for a response; if the run times out, give control to the default input process run of the queue. |
| `SR` | Wait for a response; if the run times out, give control to `rsrun`. |
| `SU` | Wait for a response; if the run times out, discard the response. |

---

## Example

Send the current result to a queue named `SCHDLR`, start TIP transaction `DXDTST`, and wait up to 30 seconds for a response:

```
@qsnr,-0,,,,,,,,30,,,50 r,schdlr,,,,dxdtst su <cod>h8 .
```

| Field | Value | Description |
|-------|-------|-------------|
| `c,d,r` | `-0` | Send the current result. |
| `tmo` | `30` | Wait up to 30 seconds for a response. |
| `lab` | `50` | Go to label `50` in case of error. |
| `dnfunc` | `r` | Call the named run. |
| `dnqu` | `schdlr` | Send to the queue named `SCHDLR`. |
| `dnrun` | `dxdtst` | Start TIP transaction `DXDTST`. |
| `rspfunc` | `su` | Wait for a response; discard if timed out. |
| `vstat` | `<cod>h8` | Load `<cod>` with spaces (no error) or an error code. |

If control returns at the next statement, a normal response was received as the new `-0` result in drawer A, and `<cod>` contains spaces. The system returns the response in the same drawer as the original report. If control returns at label `50`, an abnormal response was received.
