# @NRN — Network Run

## Overview

Passes statements to the remote site for execution. Use [`@NET`](NET.md) (Network Sign-On) to connect to the remote site before using this statement.

> **Note:** If the [`@NET`](NET.md) statement specifies a network translation table, the `"run statements"` field of `@NRN` is translated. See [`@NET`](NET.md) for more information.

---

## Syntax

```
@NRN[,lab] "run statements" [vmsg] .
```

### Parameters

| Field | Platform | Required | Description |
|-------|----------|----------|-------------|
| `lab` | All | Optional | Label to branch to if an error occurs on the remote system. |
| `"run statements"` | 2200 only | Required | Statements to execute on the remote site. Enclose in double quotes (`"`). The first character of each statement must be `@`. Maximum: 1,280 characters. Variables within quotes are translated by the local system before being sent — use [`@LDV`](LDV.md) with the `P` option to pack variables (remove significant spaces) before use. |
| `"run statements"` | Windows / Linux / UNIX | Required | Statements to execute on the remote site. Enclose in double quotes (`"`). The first character of each statement must be `@`. Maximum: 998 characters. If the server does not support 998 characters, the statement is truncated. Variables within quotes are translated locally before being sent — use [`@LDV`](LDV.md) with the `P` option to pack variables before use. |
| `vmsg` | All | Optional | Variable to capture an 80-character system message if control branches to `lab`. If the statement calls a JavaScript subroutine via `@CALL`, this variable may need to be up to 900 characters (`MAXCHR$`) as JavaScript error messages can be very large and contain line feed characters. |

---

## Guidelines

- Variable and reserved word references in the statements are resolved in the local environment before being sent, even when enclosed in apostrophes (`'`). Apostrophes are passed as literal data. See [Example 4](#example-4--resolving-variables-in-the-remote-environment) for how to defer variable resolution to the remote environment.
- The statements execute inside a special system run started by `@NET`. It is a separate run environment from the local run — variables created remotely cannot be directly referenced locally.
- Labels cannot be used in the passed statements. For example, `@lzr,0,b,2,199 .` is not valid inside an `@NRN`.
- To retrieve variable values from the remote system, place them in the remote output area, convert it to a result, and pass the result back using [`@NRD`](NRD.md).
- To process results generated from an `@NRN` statement, rename the results.
- Do not use `@NRN` to execute statements that terminate the INTER_RUN run (e.g. `RUN` or `GTO RPX`).
- Do not use variables `v1` through `v15` in `@NRN` statements — they are reserved for the INTER-RUN run.

---

## Examples

### Example 1 — Remote TOT and Rename

Execute a `TOT` statement on the remote system and rename the result for further processing:

```
@nrn,0099 "@tot,0,c,1 '' 18-6,25-7,65-8 |,+,-,= rnm -2" <e>s80 .
```

---

### Example 2 — Remote SRH with Date

Execute an `SRH` statement on the remote system. `DATE6$` is enclosed in apostrophes so the embedded slants (`/`) in the substituted date value (`MM/DD/YY`) do not interfere with parsing on the remote system:

```
@nrn,0099 "@srh,0,a,3 dh 2-8 |,'date6$' rnm -1" v100s80 .
```

Use [`@NRD`](NRD.md) to read the renamed result back to the local system.

---

### Example 3 — Retrieving Remote Variable Values

Retrieve variable values from the remote system by placing them in the remote output area, then reading the result back locally:

```
@ldv v1a5='v10i6',v2a3='v10' .
@nrn,0099 "@brk,0,a srh,0,b,2 'dh' 'custcode' |,amco v1 rnm -2" .
@nrn,0099 "v2" .        (put value loaded by SRH into remote output area)
@nrn,0099 "@brk" .

@brk,0,a .
@brk .
@nrd,0,a,-0,0,a,-0,0099 .      (read result back to local system)
@rdl,-0,2 1-6 v10i6 .          (read value from returned result)
```

---

### Example 4 — Resolving Variables in the Remote Environment

Use packed local variables containing the names of remote variables to defer resolution to the remote environment:

```
@ldv,p <vlineinit>h12='<line>i6'  <vline>h12='<line>' .
@ldv,p <vdatainit>h12='<data>s80' <vdata>h12='<data>' .
@nrn,0099 "@fnd,0,b,2 '' 2-2 |,IP ,<vlineinit>"   <msg>s80 .
@nrn,0099 "@rdl,0,b,2,<vline> 1-80 <vdatainit> brk,0,b" <msg>s80 .
@nrn,0099 "<vdata>"   <msg>s80 .
@nrn,0099 "@brk"      <msg>s80 .
@nrd,0,b,-0,0,b,-0,0099 <msg>s80 .
```

The `@LDV` statements load local variables with the names of variables to be created in the remote environment. `@FND` initializes `<line>` with the line number of a find in a remote report. `@RDL` reads that line into `<data>` remotely. `<data>` is placed into the remote output area, a `BRK` is performed, and `-0` is read back locally via `@NRD`.

---

### Example 5 — Calling a JavaScript Subroutine Remotely

The `@CALL` statement within `@NRN` must be inside double quotes, so the double quotes for the JavaScript subroutine name are loaded into a variable first:

```
@ldv,p <jvsnam>s10='"JVS_Name"' .
@nrn,0199 "@CALL,<jvsnam> JVS_Function()" <jvsmsg>sMAXCHR$ .
```

`vmsg` is set to `MAXCHR$` because JavaScript error messages can be very large. To process the message if an error occurs:

```
@0199 call,LIBDRW$,11 0001 (<jvsmsg>,'1',<sta>i3) .
```

---

### Example 6 — Executing OS Commands on a Remote Windows System

`TIC$` markers are required around options and any blanks within the command submitted to the remote Windows command prompt:

```
@net,<net-id>,<site-id>,<user-id>,<dpt>,<pswd> .
@ldv,p <cmd>s62='@os,0,f,user,passwd 'tic$'-f -d'tic$' dir'tic$' 'tic$'c:\temp . ' .
@nrn,0001 "<cmd>" <msg1>s80 .
@nrd,0,f,-0,0,f,-0,0001 <msg2>s80 .
@dsp,-0 .
@nof .
@gto end .
@0001:nof .
@brk .
Error in Network run:
<msg1>
Error in Network read:
<msg2>
@brk dsp,-0 .
```

---

### Example 7 — Executing Shell Commands on a Remote Linux/UNIX System

`TIC$` markers are required around any blanks within the command submitted to the remote shell:

```
@net,<net-id>,<site-id>,<user-id>,<dpt>,<pswd> .
@ldv,p <cmd>s62='@unx,0,f,usr,password -f ls'tic$' 'tic$'/work/user/' .
@nrn,0001 "<cmd>" <msg1>s80 .
@nrd,0,f,-0,0,f,-0,0001 <msg2>s80 .
@dsp,-0 .
@nof .
@gto end .
@0001:nof .
@brk .
Error in Network run:
<msg1>
Error in Network read:
<msg2>
@brk dsp,-0 .
```
