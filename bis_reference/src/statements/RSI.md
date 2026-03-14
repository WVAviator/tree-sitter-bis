# RSI and @RSI — Remote Symbiont Interface

> *2200 only*

## Overview

Use the `RSI` function to use a terminal in demand mode. Use the `@RSI` statement to initiate an interactive demand program through a run.

You must have access to demand processing through the Remote Symbiont Interface manual function — contact your administrator to determine if you have access.

- **Manual function:** Executing `RSI` as a manual function causes a series of OS 2200 sign-on messages to be displayed. Answer them to begin demand processing. The wait light remains on as long as output to the display terminal is pending.
- **Statement:** Executing `@RSI` causes the run to terminate; the system then signs the user on to the operating system in demand mode and gives the user manual control of the display terminal. The wait light remains on as long as output to the display terminal is pending.

> **Note:** When executing a run containing `@RSI`, if the run user is not a valid RSI user (as defined in the user registration report), no `@` or `@@` commands are allowed except for `@@TERM` and `@@X`.

> **Note:** The RSI interface of the Exec is text oriented — the system cannot determine whether parameters in the `@RSI` statement are causing an error. For example, an invalid user-id, password, or a nonexistent ADD file can cause an error without explicit indication.

---

## Syntax

### Control Line

```
RSI
```

### Statement

```
@RSI[,site-id,tmo]
user,pw[,acct,qual,fn,cyc,elt,ver,q] .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `site-id` | Optional | Site identifier (six characters) for this display terminal. |
| `tmo` | Optional | Number of seconds to wait for demand input at the terminal. If left blank, no timeouts occur. Pressing Abort before receiving manual control aborts the `@RSI` statement. |
| `user` | Required | Demand mode user-id. |
| `pw` | Required | Demand mode password that validates the user-id. |
| `acct` | Optional | Account number. If specified, the system submits an ECL `@RUN` statement in the format: `@RUN run-id,acct/,proj-id` where `run-id` is the active site-id, `acct` is the account number, and `proj-id` is the qualifier (`qual`) from the RSI statement (left blank if no qualifier is specified). |
| `qual` | Optional | File name qualifier. |
| `fn` | Optional | File name. If specified, the system submits an ECL `ADD` statement after demand mode sign-on is complete. If omitted, all file-related subfields below are left blank. |
| `cyc` | Optional | File cycle number. |
| `elt` | Optional | Element name. |
| `ver` | Optional | Element version name. |
| `q` | Optional | Number of text lines to display before giving manual control to the user. Default = 1 (minimum). Maximum = one fewer than the vertical screen size of the display terminal. If a demand program executes a control command that the Communications Control Routine (CCR) interprets before soliciting input from the terminal, everything preceding that control command is discarded. |

---

## Guidelines

- To submit an unsolicited image, press **Message**. The CCR responds by returning an SOE character and turning off the wait light.
- If an auxiliary printer is configured for the display terminal in the terminal configuration report, you can designate the printer for both input and output as it is passed between the OS 2200 operating system and the display terminal. The auxiliary printer can be turned on or off while the BIS CCR is soliciting input (indicated by the SOE displayed at the bottom of the screen and the wait light off).
- The auxiliary print device turns off the wait light after printing a line. The tape cassette unit turns off the wait light after a read or write operation.

---

## Business Information Server CCR Commands

The user CCR interface is similar to the OS 2200 UNISCOPE 100 display terminal CCR interface, with the following restrictions.

| Command | Description |
|---------|-------------|
| `@@END` | Turns off escape mode, full-screen mode, and any other modes normally canceled by `@@END` in the OS 2200 system. |
| `@@ESC` | Turns on escape mode for input and output. |
| `@@ESC I` | Turns on escape mode for input only. |
| `@@ESC O` | Turns on escape mode for output only. |
| `@@FRZ n` | Rolls normally from line `n` and changes no data. If `n` = 0 (assumed at sign-on time), rolls the entire screen. |
| `@@FUL` | Turns on full-screen mode (implied `@@INQ`). |
| `@@INS n` | Positions the SOE character for input solicitation. If `n` = 0, the SOE is positioned at the next-to-last line of the screen. Ignored if `n` is larger than screen size. |
| `@@NOPR` | Turns off the auxiliary print device. Cancels all previous `@@PMOD` commands. |
| `@@PMOD A` | Turns on special mode for UTS 400 and UTS 40 display terminals. |
| `@@PMOD C` | Turns on special mode for UTS 400 and UTS 40 display terminals. |
| `@@PMOD F` | Turns on special mode for UTS 400 and UTS 40 display terminals. |
| `@@PMOD P` | Turns on special mode for UTS 400 and UTS 40 display terminals. |
| `@@PMOD V` | Turns on special mode for UTS 400 and UTS 40 display terminals. |
| `@@PMOD X` | Turns on special mode for UTS 400 and UTS 40 display terminals. |
| `@@PRNT dvn` | Turns on the specified auxiliary print device, where `dvn` is the device name or number in the terminal configuration report (e.g., `COP` or `001`). The device must be directly connected to the display terminal or its controller unit. |
| `@@RLD` | Rolls the screen downward. |
| `@@RLU` | Rolls the screen upward. |
| `@@TCI dvn,n` | Enters `n` blocks (minimum and default = 512). Continues receiving input until `n` blocks are read or an end-of-file mark is encountered. |
| `@@TCM` | Writes an end-of-file mark on output and terminates output, or terminates input from cassette. |
| `@@TCS trk,adr` | Searches for address `adr` on track `trk`, or on the current track if `trk` is not specified. |
| `@@TCO dvn,n` | Processes a block of data having `n` images per block. `n` defaults to 1 and must be ≤ the vertical screen size of the display terminal. |
| `@@TCT dvn,n` | Positions tape cassettes with device name or number `dvn` (e.g., `TC1` or `002`) to the top of track `n`, or to track 1 if `n` is not specified. |
| `@@TERM` | Terminates the RSI interface. |

> **Note:** When using the transparent tape cassette commands (`@@TCO` and `@@TCT`), specify the `dvn` parameter on the first call only — all subsequent calls assume the same `dvn`. The `dvn` parameter can be either the software name for the device or the logical unit number. Logical unit numbers are determined by the order of appearance of auxiliary devices in the terminal configuration report.
