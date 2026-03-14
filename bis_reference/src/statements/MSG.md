# @MSG — Message to Console

## Overview

Sends a message to the system console.

**Linux / UNIX:** The console displays the message preceded by `MAPPER-<sl> *nnn*` (where `nnn` is the run user's station number and `<sl>` is the site letter). The message is also recorded in the device log file.

**Windows:** The message is recorded in the Windows application event log, preceded by `MAPPER-<sl> *nnn*` (where `nnn` is the station number and `<sl>` is the site letter).

**2200:** The console displays the message preceded by:
```
MAPPER*4101: MESSAGE FROM user-id AT MAPPER STATION nnn:
```
where `user-id` and `nnn` are the run user's user ID and station number. The message itself appears on the next line, preceded by `MAPPER*4101+`.

> *(2200 only)* The system allows a maximum of three outstanding messages at any given time. Additional messages are queued until previous outstanding messages are answered.

---

## Syntax

```
@MSG[,o] vld [vrsp] .
```

### Parameters

| Field | Platform | Required | Description |
|-------|----------|----------|-------------|
| `o` | 2200 only | Optional | The `N` option suppresses the first line of the console message (which contains the author's user ID and station number) from the operator's console — it is instead written to the system print file. Ignored if `vrsp` is specified. |
| `vld` | All | Required | Variables, constants, literals, reserved words, or any combination, composing a message of up to 48 characters. Enclose in apostrophes if the message contains spaces. |
| `vrsp` | 2200 only | Optional | Variable to capture the operator's response (up to 60 characters). If specified, the run waits for a response before continuing. |

---

## Examples

Send a message to the console or log:

```
@msg 'Please reload rpt 2B0 from 891103 tape.' .
```

*(2200 only)* Ask the operator whether to continue and capture the response:

```
@msg 'Should my run continue?' <response>h3 .
@if <response> EQ no gto end ; .
```
