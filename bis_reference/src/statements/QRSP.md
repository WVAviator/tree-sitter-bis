# @QRSP (Send Response Message)

*(2200 only)*

## Overview

Sends a response message through the Data Transfer Module (DTM) when a run is initiated by a [`@QSNR`](QSNR.md) (Send Message, Expect Response) statement from another run, or a `CALL 'QSNR'` from a batch COBOL program or COBOL TIP transaction. Only one response per run is permitted.

---

## Syntax

```
@QRSP[,c,d,r,l,q,,eol,tabs?,err,,lab] .
```

### Parameters

| Field | Description |
|-------|-------------|
| `c,d,r` | Report to send. |
| `l` | First line to send. Default = `2`. |
| `q` | Number of lines to send. Default = all. |
| `eol` | End-of-line character. The system normally truncates lines after the last non-space character. If sending to a non-BIS system, you may need to preserve trailing spaces — place any graphic character here and the system truncates each data line at its first occurrence. If sending to a BIS system, lines are space-filled to the width of the receiving report. |
| `tabs?` | Translate tabs or other control characters to spaces? `Y`, `N`, or `C` (compress — removes them from the data entirely). Default = `N`. Particularly useful when sending a BIS report to a non-BIS system. |
| `err` | Error status code to return to the message originator (1–8 characters). All spaces = no error. |
| `lab` | Label to go to in case of error. |

> **Note:** If sending only an error status with no report, there are exactly 8 commas before the `err` field: `@qrsp,,,,,,,,<error> .`

---

## Outcome

- Once the response is made, the system discards the `@QSNR` message that initiated the run — it is no longer available for processing.
- If an input process run owes a response and does not make one, the system automatically invokes the DTERR command to send a system message.
- The drawer specified on the `@QSNR` statement determines the receiving drawer if the `SU`, `SQ`, or `SR` response functions are used and the response returns while the run is waiting. Otherwise, the system uses the default input drawer. The drawer specified on `@QRSP` has no effect on where the response message resides.
- For more information on the `SU`, `SQ`, and `SR` response functions, see [`@QSNR`](QSNR.md).

---

## Examples

Respond to a `@QSNR` statement by sending the current result, going to label `50` on error:

```
@qrsp,-0,,,,,,,,0050 .
```

Respond with an error status code only (no report):

```
@qrsp,,,,,,,,<error> .
```
