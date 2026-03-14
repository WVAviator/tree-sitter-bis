# RR and @RRN (Remote Run)

## Overview

Starts a run in background at a remote site, or starts a background run using a different user-ID.

- The **`RR` manual function** is available on Windows Server, Windows Client, Linux, and UNIX only.
- The **`@RRN` statement** is available on Windows Server, Windows Client, Linux, UNIX, and OS 2200.

> **Note:** Though `@RRN` is still available, consider using the following network statements instead for added flexibility and future compatibility: [`@NET`](NET.md), [`@NOF`](NOF.md), [`@NRD`](NRD.md), [`@NRM`](NRM.md), [`@NRN`](NRN.md), [`@NRT`](NRT.md), and [`@NWR`](NWR.md).

> **Note:** For executing manual functions and runs at remote sites in interactive mode (rather than background), see [`@NRM`](NRM.md) (Network Remote).

Your site must have remote sites configured and connected.

### Outcome

- The specified run starts at the remote site.
- If an invalid value is entered in the `rmu`, `rmd`, or `rmpw` subfields, or if the remote run terminates abnormally, the run user receives a message.

### Statement Restrictions

*(Windows / Linux / UNIX)* The remote run must not contain statements that communicate with a terminal: `GOC` (when display requested), `GS` (when display requested), `OUM`, `SC`, `XIT`, `XUN`, or graphical user interface statements. It also must not contain the following statements if they would suspend the run: `DSM`, `DSP`, `DSX`, `OUT`.

*(2200 only)* The remote run must not contain: `DSG`, `DSM`, `DSP`, `DSX`, `GOC` (when display requested), `GS` (when display requested), `OUM`, `OUT`, `REL`, `RSI`, `SC`, `XIT`, or graphical user interface statements. `DSG`, `OUT`, and `SC` may be used if output is sent to another terminal.

---

## Manual Function Syntax *(Windows / Linux / UNIX)*

```
RR run[,d1,d2...]
```

| Field | Description |
|-------|-------------|
| `run` | Name of the run to start at the remote site. |
| `d1,d2` | Literal data, separated by commas, to pass to the remote run (captured via `INPUT$`). |

> **Note:** If no report is sent to the remote run, no data needs to be entered in the SEND or RECEIVE fields of the input screen.

When executed as a manual function, the run starts in background at the remote site and the active screen is displayed on your terminal. If an invalid user-ID, department number, or password is entered, or if the remote run terminates abnormally, you receive a station-to-user message.

---

## Statement Syntax

*(Windows / Linux / UNIX)*
```
@RRN[,lc,ldr,lr,] run[,vld] rms,rmu,rmd[,rmpw,rmc,rmdr] .
```

*(2200 only)*
```
@RRN[,lc,ldr,lr,lf,re?] run[,vld] rms,rmu,rmd,rmpw[,msg?,l,rmc,rmcpw,rmdr,rmf] .
```

### Parameters

| Field | Platform | Description |
|-------|----------|-------------|
| `lc,ldr,lr` | All | Local report to send. See Specifying Reports or Drawers to Process. *(2200 only)* If not specified, use only two commas (not three) as placeholders. |
| `lf` | 2200 | Local report format. |
| `re?` | 2200 | Return normally whether or not the remote run errors? `Y` or `N`. Default = `N`. |
| `run` | All | Name of the run to start at the remote site. The run must be registered and resident at the remote site. |
| `vld` | Windows / Linux / UNIX | Variables, literal data, reserved words, constants, or any combination, to be transferred to the remote site and initialized via `INPUT$`. Maximum = 80 variables; combined `run` and `vld` character limit = 200 characters. |
| `vld` | 2200 | Same as above, but with a 640-character combined limit. Variables are translated to uppercase; maximum 12 characters per variable. |
| `rms` | Windows / Linux / UNIX | Remote site letter (`A`–`Z`). Press **Remote** from the active screen for a list of sites. |
| `rms` | 2200 | Remote site number. Press **Remote** from the active screen for a list of sites. |
| `rmu` | All | User-ID registered at the remote site. |
| `rmd` | All | User sign-on department number registered at the remote site. |
| `rmpw` | All | User sign-on password registered at the remote site. |
| `rmc,rmdr` | Windows / Linux / UNIX | Remote cabinet and drawer. Required when sending a local report. The report is referenced in the remote run as `-0` in the specified cabinet and drawer. |
| `msg?` | 2200 | Display link transfer messages as data transfers to the remote site? `Y` or `N`. Default = `N`. |
| `l` | 2200 | Line number on the local terminal to display transfer progress messages (if enabled by `msg?`). |
| `rmc,rmcpw,rmdr` | 2200 | Remote cabinet, remote cabinet password, and remote drawer. Required when sending a local report. |
| `rmf` | 2200 | Remote report format. When the local report arrives at the remote site, it is referenced as `-0` in the cabinet and drawer specified in `rmc` and `rmdr`. |

> **Note:** *(2200 only)* Use the `rmf` and `lf` subfields to specify report formats to condense data being transferred. Only the columns in the specified format are sent and received.

---

## Reserved Words

`STAT1$` contains `0` if the remote run was successful, or a nonzero value if unsuccessful.

---

## Guidelines

- When using the manual function, press **Remote** from the active screen for a list of sites.
- Do not place other statements on the same line after `@RRN` — they will be ignored. Put the next statement on a new line.

---

## Examples

*(Windows / Linux / UNIX)* Start a run at remote site `B`, transferring literal data:

```
@rrn thisrun,ABC b,newuser,7 .
```

| Field | Value | Description |
|-------|-------|-------------|
| `run` | `thisrun` | Start the `THISRUN` run. |
| `vld` | `ABC` | Transfer literal `ABC`, captured via `INPUT$` at the remote site. |
| `rms` | `b` | Start at remote site `B`. |
| `rmu` | `newuser` | User-ID registered at the remote site. |
| `rmd` | `7` | Sign-on department number at the remote site. |

*(2200 only)* Start a run at remote site `2`, transferring literal data with a password:

```
@rrn thisrun,ABC 2,newuser,7,psw .
```

| Field | Value | Description |
|-------|-------|-------------|
| `run` | `thisrun` | Start the `THISRUN` run. |
| `vld` | `ABC` | Transfer literal `ABC`, captured via `INPUT$` at the remote site. |
| `rms` | `2` | Start at remote site number `2`. |
| `rmu` | `newuser` | User-ID registered at the remote site. |
| `rmd` | `7` | Sign-on department number at the remote site. |
| `rmpw` | `psw` | Password to sign on to the remote site. |
