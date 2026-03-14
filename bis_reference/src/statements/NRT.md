# @NRT — Network Return

## Overview

Closes the connection and returns to the local site from the remote site. Can also return a report to the local site. The connection may remain open if `Y` was specified in the `con?` subfield of [`@NET`](NET.md) (Network Sign-On).

Use [`@NRM`](NRM.md) (Network Remote) to start a run or manual function at the remote site before using this statement.

> **Note:** Do not place other statements on the same line after `@NRT` — they will be ignored. Place the next statement on a new line.

---

## Syntax

```
@NRT[,c,d,r] {"cmd"|vld,...,vld} .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `c,d,r` | Optional | Report to return to the local site. Must use cabinet number, drawer letter, and report number — names are not allowed. |
| `"cmd"` | Optional | Run name or manual function call to execute at the local site after returning, including any input parameters. Enclose in double quotes. The local run is terminated before `cmd` is executed. |
| `vld,...,vld` | Optional | Variables, literals, reserved words, constants, or any combination to return to the local run. The returned values are captured by the local run via the `INPUT$` reserved word. |

---

## Guidelines

- Both a report and a command can be specified. The system returns the report to the local site first, then executes the command.
- Use `@NRT` in error routines of remote runs to maintain transparency — it returns the run user to the local site in case of an error.

---

## Examples

### Returning Control to the Local Site

The last line of a remote run named `ABC` returns control to the local site. The run that called `ABC` via `@NRM` continues at the next line:

```
@nrt .
```

### Passing Variable Data to the Issuing Run

The local run signs on, executes the remote run `RUNVAR`, then captures the returned values:

```
@net,mmsxxx,a,newuser,2,xyz .
@nrm "runvar" .
@chg input$ v6i4,v7i4,v8i4,v9i4 .
v6/v7/v8/v9 .
@gto end .
```

The remote run `RUNVAR` loads four variables and returns them:

```
@ldv v1i4=9999,v2i4=8888,v3i4=7777,v4i4=1111 .
@nrt v1,v2,v3,v4 .
@gto end .
```

After the `@NRM` statement completes, `v6`–`v9` contain the values returned by `@NRT`. The receiving variables correspond positionally to the variables listed on the `@NRT` statement.

### Returning a Report

Return the current result (`-0`) to the local system:

```
@nrt,-0 .
```
