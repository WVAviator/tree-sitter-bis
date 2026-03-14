# START and @STR — Start

## Overview

Collects data from one or more reports and uses it as input to a job or process, or starts the job itself. Can also start jobs that produce files retrievable with the Retrieve File command.

| Platform | Behavior |
|----------|----------|
| Windows | Executes a DOS shell script or program. The optional interface name is a short identifier for the full program path, defined by Agenda Start Registration. |
| Linux / UNIX | Executes a Linux or UNIX shell script or program. The optional interface name is a short identifier for the full program path, defined by Agenda Start Registration. |
| OS 2200 | Executes a runstream with Executive Control Language (ECL) statements as a batch run. |

> **Note (Windows):** Avoid using this command to start long-running "daemon" type processes or batch programs due to the limited number of external program resources associated with each Business Information Server site. See the Developer's Guide for more information on starting BIS programs from a Windows command prompt.

Data to pass to a job must exist in a report.

---

## Syntax

### Control Line
```
START
```

### Statement

**Windows / Linux / UNIX:**
```
@STR,c,d,r[,sl,ifc,logon,psw] .
```

**OS 2200:**
```
@STR,c,d,r[,runid,acct,lab] .
```

### Parameters

| Field | Platform | Description |
|-------|----------|-------------|
| `c,d,r` | All | Report containing the job, the report to pass to a job (Windows / Linux / UNIX), or the runstream (OS 2200). |
| `sl` | Windows / Linux / UNIX | Site letter. Default = local site. If a site is entered, a valid logon and password must also be provided. |
| `ifc` | Windows | Interface name associated with the Program Name path in the Start Registration report. Default = blank (`cmd.exe` — DOS shell). |
| `ifc` | Linux / UNIX | Interface name of the job to which to pass the report. Default = blank (`/bin/sh`). |
| `logon` | Windows / Linux / UNIX | Valid system logon for a remote site. |
| `psw` | Windows / Linux / UNIX | System logon password. Required if the logon has a password assigned. |
| `runid` | OS 2200 | Batch run identifier. Default = run-id in the Exec RUN statement. |
| `acct` | OS 2200 | Batch run account number. Default = account number in the Exec RUN statement. |
| `lab` | OS 2200 | Label to go to if the run encounters an error. |

---

## Reserved Words

*(OS 2200 only)*

`STAT1$` returns the following values if the run encounters an error:

| Value | Meaning |
|-------|---------|
| 1 | Start disabled for this system. |
| 2 | No `@RUN` card found. |
| 3 | Invalid `@RUN` card. |
| 4 | Improper runstream in report. |
| 5 | Include (`$INCL$`) ambiguity. |
| 6 | Include (`$INCL$`) loop. |
| 7 | Includes (`$INCL$`) illegally nested. |
| 8 | Translation (`$TRAN$`) ambiguity. |
| 9 | `$INCL$` cabinet security violation. |
| 10 | Run not registered for `$INCL$` cabinet. |
| 11 | Report does not exist in drawer. |
| 12 | Report number is higher than highest available. |
| 13 | System I/O error. |
| 14 | File name not specified. |
| 15 | File unobtainable. |
| 16 | Element unobtainable. |
| 17 | File cannot be assigned. |
| 18 | Attempted to write past end of file. |
| 19 | Unable to register for contingencies. |
| 20 | Access permission denied. |

`STAT2$` contains a line number identifying the system message. Use an [`@LSM`](LSM.md) (Load System Message) statement to read the message — place the number in `STAT2$` in the `msgno` subfield of the `@LSM` statement.

---

## Guidelines

- To pass more than one report or drawer, place the `$INCL$` command in the report containing the runstream you are starting.
- Use the Retrieve File command to retrieve files produced by the job.

**Windows / Linux / UNIX:** In addition to Retrieve File, you can execute the software as a program and pass a file containing a `BPRUN$` command:

  - Windows: `Set Path = <shared-install>\shared;%path%` then `<mapper-install>\mapper [-ssl] -ffilename`
  - Linux / UNIX: `mapper [-ssl] -ffilename`

**Linux / UNIX — Trusted mode installation:** Use the `logon` and `psw` fields to specify another system user's credentials. The started process runs with the privilege of the specified login. If no alternate login/password is specified, the process runs with the privilege of the session user.

**Linux / UNIX — Secure mode installation:** An error is returned if `logon` and `psw` syntax are specified, and the run terminates. OS command runs started from a foreground session execute with the privilege of the session user; those started from background runs execute with the privilege of the default user.

**OS 2200:** In addition to Retrieve File, you can use the following ECL statement to pass a file containing a `BPRUN$` command:
```
@SYM fn,,dev
```
Multiple `@SYM` statements can be used to bring in data one report at a time.

---

## BPRUN$ Command

Insert a `BPRUN$` command in the output file of a job to start a run on the system and optionally return data. The command must start in column 1 of the file.

### Syntax

**Windows / Linux / UNIX:**
```
BPRUN$[,sl,cont] run[,data] user,dept[,pw] [c,,d,f,ltyp,lsp? BPERR,edata]
```

**OS 2200:**
```
BPRUN$[,cont] run[,data] [[domain\]user],dept[,pw] [c,cpw,d,f,ltyp,lsp? BPERR,edata]
```

### Parameters

| Field | Platform | Description |
|-------|----------|-------------|
| `BPRUN$` | All | Batch run command. |
| `sl` | Windows / Linux / UNIX | Site letter. Default = local site. |
| `cont` | All | Continuation character indicating the statement continues on the next line. Use any character that does not appear elsewhere in the `BPRUN$` command; also type it at the end of the first line of data. |
| `run` | Windows / Linux / UNIX | Name of the run to start. Must not contain terminal-communicating statements: `GOC` (when display requested), `GS` (when display requested), `OUM`, `SC`, `XIT`, `XUN`, graphical UI statements. Must not contain the following statements if they suspend the run: `DSM`, `DSP`, `DSX`, `OUT`, `SC`. |
| `run` | OS 2200 | Name of the run to start. Cannot contain `DSG`, `DSM`, `DSP`, `DSX`, `GOC` (when display requested), `GS` (when display requested), `OUM`, `OUT`, `REL`, `RSI`, `SC`, `XIT`, or graphical UI statements. `DSG`, `OUT`, and `SC` may be used if output is sent to another terminal. |
| `data` | All | Data passed to the run, picked up by `INPUT$`. Separate multiple items with commas; no spaces within or between items. |
| `domain` | OS 2200 | Optional domain name to qualify the user ID. |
| `user` | All | User sign-on, if applicable. If omitted and `OSUIDS` is non-zero, the credentials of the user queuing the file are used. |
| `dept` | All | User department number. |
| `pw` | All | User sign-on password, if applicable. |
| `c` | All | Cabinet in which to place the passed data. |
| `cpw` | OS 2200 | Cabinet password. |
| `d` | All | Drawer letter. |
| `f` | All | Format. |
| `ltyp` | All | Line type for tab character insertion. Type `Y` to replace spaces with tab characters at column positions defined in report 0; or type a predefined line type number for a predefined line defined in report 0. |
| `lsp?` | All | Retain blank lines in the file? `Y` or `N`. Default = `N` (delete blank lines). |
| `BPERR` | All | Name of the run to execute if an error occurs during batch processing. Contact your administrator to see if your site has a modified version of `BPERR`. |
| `edata` | All | Data passed to the `BPERR` run, picked up by `INPUT$` in `BPERR`. For the standard `BPERR` run, type the station number to direct system messages as the only data item. For a site-defined `BPERR` run, separate multiple items with commas and no spaces. |

### Outcome

After sending the file containing `BPRUN$` to the system:

- The specified run starts.
- **Windows / Linux / UNIX:** If a cabinet and drawer are specified, data returned (lines following `BPRUN$`) is accessible as `-0`. If the `BPRUN$` syntax is incorrect, the system executes `BPERR` and sends the message to the station in `edata` (or to `MAPCOORD` if none specified). If the started run fails, the system messages the user-id in `BPRUN$` and does not execute `BPERR`.
- **OS 2200:** If a cabinet, cabinet password, and drawer are specified, returned data is accessible as `-0`. On error, the system executes `BPERR` and messages the system administrator's station (except for `MGABRT` — Job Was Aborted) and the station in `edata`.
- If an `RER` or `RAR` is active when the batchport run errors, the error is processed by the error/abort routine and `BPERR` will not execute.

### Using BPRUN$ from Outside the System

**Windows:**
```
Set Path = <shared-install>\shared;%path%
<mapper-install>\mapper [-ssl] -ffilename
```

**Linux / UNIX:**
```
mapper [-ssl] -ffilename
```

**OS 2200:**
```
@SYM fn,,dev
```

| Field | Platform | Description |
|-------|----------|-------------|
| `<shared-install>` | Windows | Fully-qualified filename of the latest installation. |
| `<mapper-install>` | Windows | Fully-qualified filename of the latest installation (also obtainable from `prgm$` for the site). |
| `mapper` | Windows / Linux / UNIX | Executes the software (must be lowercase on Linux / UNIX). |
| `-s` / `sl` | Windows / Linux / UNIX | Option indicating a site letter follows; the site letter itself. Default = local site. |
| `-f` / `filename` | Windows / Linux / UNIX | Option indicating the name of a file to process follows; the complete case-sensitive path of the file containing the `BPRUN$` command. |
| `fn` | OS 2200 | Name of the file. |
| `dev` | OS 2200 | Any valid symbiont device identification for the system. Must be configured as a batch port name to the system and as a local device to OS 2200. |

If the host encounters a `BPRUN$` command in the file, it sends the file to the system for processing. All IBM output files automatically go to the system — no `mapper -f` statement is needed in the job stream.

---

## ENDRD$ Command

Marks the end of data to include in the report and signals the system to start the specified run. Enter `ENDRD$` starting in column 1.

- If no `ENDRD$` is detected, the entire file after `BPRUN$` is sent.
- When using multiple `BPRUN$` commands in a file, `ENDRD$` is not required between segments — each subsequent `BPRUN$` marks the end of the preceding data.
- The host processes all `BPRUN$` commands embedded in a file.

---

## IBM Start Requirements *(Windows / Linux / UNIX)*

The system supports IBM BSC (binary synchronous communications) and SNA (system network architecture) interfaces to start IBM job streams on an IBM mainframe.

- The `bscsym` or `snasym` shell scripts return files from the IBM mainframe to the system.
- If an error occurs and the `BPRUN$`...`ENDRD$` block is not built, the shell script places a `BPRUN$` command in the output file and starts the `BPERRIBM` run, sending output to `MAPCOORD` at the default site.
- BSC and SNA daemon programs transfer job streams and host files. Frequency depends on the `crontabs` entry set by the Linux / UNIX administrator during installation.
- To receive output from the IBM job stream, place an IBM `ROUTE` statement in the job stream. See your Linux / UNIX administrator for the remote address of the BSC/SNA connection.

---

## Examples

### Using @STR to Start a Job

Start the batch runstream in report `3B0`:
```
@str,0,b,3 .
```

*(OS 2200)* Start the runstream in report `101A0` and identify the batch run as `BCH10`:
```
@str,0,a,101,bch10 .
```

*(Windows / Linux / UNIX)* Pass report `101A0` to the job `filer` on remote site W, using logon `NEWUSER` and password `REMOTE`:
```
@str,0,a,101,w,filer,newuser,remote .
```

---

### Transferring Files in SDF Format *(OS 2200)*

Transfers data in System Data Format (SDF). The system finds the `BPRUN$` image, places data between `BPRUN$` and `ENDRD$` into `-0` (cabinet 0, drawer B), then starts `run-name` with variables passed via `INPUT$`.

```
@run,a run-id,account/user-id,project-id
@delete,c print-file.
@cat,p print-file.,f///262143
@sym,d print$
@brkpt print$,print-file.
@msg,n ; This statement allows bprun$ to be a continuation line
bprun$ autret,station newuser,7 0,open,f
@.
@xqt This data is returned to MAPPER
@.
@msg,n ; This statement allows endrd$ to be a continuation line
endrd$
@.
@xqt This data is not returned to MAPPER
@.
@brkpt print$
@sym,d print$
@sym print-file.,,device-name
@fin
```

---

### Starting a Run without Transferring Data *(OS 2200)*

```
@run,a run-id,account/user-id,project-id
@.
@xqt do some work
@.
@delete,c start-run.
@cat,p start-run.,f///262143
@sym,d print$
@brkpt print$,start-run.
@msg,n ; This statement allows bprun$ to be a continuation line
bprun$ run-name newuser,7
@brkpt print$
@sym,d print$
@sym start-run.,,device-name
@fin
```

---

### Linux / UNIX Shell Script Returning Output

```sh
cat > /usr/work/newuser/filea<<end*of*input
bprun$,a getfile,18 newuser,7,newuser 0,open,a BPERR,18
======== Line 1 of output file ===========
Line 2 of output file
Line 3 of output file
Line 4 of output file
Line 5 of output file
endrd$
end*of*input
mapper -sa -f/usr/work/newuser/filea
```

The data is redirected to `/usr/work/newuser/filea` and sent to MAPPER site A. When received, the `GETFILE` run is executed.

---

### DOS Shell Script Returning Output *(Windows)*

Three runs are required: `getfile`, `batchcreat`, and `batchexec`.

**`getfile`** — receives batch port input and sends it to the user:
```
@chg input$ <user>s12,<depn>s4 .
@snu,-0,<user>,<depn>
@gto end .
```

**`batchcreat`** — creates a batch port file (`filea.cmd`) to provide input to `getfile`. Invoke with `batchrun,userid,dept,passwd,textfile`:
```
@chg input$ <user>s11,<depn>s4,<passw>s6,<inputfile>s65 .
@ldv,p <user>=<user> .
@ldv,p <depn>=<depn> .
@ldv,p <passw>=<passw> .
@ldv,p <inputfile>=<inputfile> .
@ldv,p <bpath>s80=dbase$'\..\tmp\filea.cmd' .
@brk,0,a .
echo BPRUN$,lrrsd$,\' \' > <bpath>
echo getfile,<user>,<depn>' \' >> <bpath>
echo <user>','<depn>','<passw>' \' >> <bpath>
echo 0,OPEN,A' 'BPERR,stnum$ >> <bpath>
type <inputfile> >> <bpath>
echo ENDRD$ >> <bpath>
@brk .
@str,-0 .
@gto end .
```

**`batchexec`** — executes `filea.cmd` at a later time:
```
@ldv,p <bpath>s80=dbase$'\..\tmp\filea.cmd' .
@brk .
prgm$'\mapper -s'lrrsd$ -f<bpath>
@brk .
@str,-0 .
@gto end .
```

---

### IBM SNA Job Stream *(Windows / Linux / UNIX)*

Returns output to the software from an IBM SNA job stream. The `GETFILE` run is executed on MAPPER site A.

```
/*ROUTE PRINT RMT19
//* CREATE BPRUN$ FOR 'PRINTED' OUTPUT
// EXEC PGM-IEBGENER
//SYSPRINT DD DUMMY
//SYSIN DD DUMMY
//SYSUT2 DD SYSOUT=A,DCR=BLKSIZE=133
//SYSUT1 DD *
BPRUN$,A GETFILE,18 NEWUSER,7,NEWUSER 0,OPEN,B BPERR,18
/*
//TESTPRT EXEC PGM=IEBGENER
//SYSPRINT DD DUMMY
//SYSIN DD DUMMY
//SYSUT2 DD SYSOUT=A,DCB=BLKSIZE=133
//SYSUT1 DD *
===========FIRST LINE OF FILE ============
LINE 1 OF EXAMPLE
...
LAST LINE OF EXAMPLE
/*
//* CREATE ENDRD$ FOR END OF DATA
// EXEC PGM=IEBGENER
//SYSPRINT DD DUMMY
//SYSIN DD DUMMY
//SYSUT2 DD SYSOUT=A,DCB=BLKSIZE=133
//SYSUT1 DD *
ENDRD$
/*
```
