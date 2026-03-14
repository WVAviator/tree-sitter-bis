# @NRM — Network Remote

## Overview

Executes manual functions and runs on a remote site. The terminal remains under local control, so the screen and keyboard retain the look and feel of the local site regardless of the remote system type. This enables distributed applications that allow users to process data on different systems transparently.

The run containing the `@NRM` statement remains active while the command executes at the remote site.

If a Reserved Station Number agreement is configured for the receiving site, the receiving session has the same station number as the initiating session. See your administrator for more information.

Use [`@NET`](NET.md) (Network Sign-On) to connect to the remote site before using this statement.

> **Note:** RDB is turned off before starting the run on the remote BIS site. To continue RDB into a remote run, start it within the remote run itself. RDB must be restarted when returning from the remote run initiated by `@NRM`.

---

## Syntax

```
@NRM[,c,d] "cmd" .
```

### Parameters

| Field | Platform | Required | Description |
|-------|----------|----------|-------------|
| `c,d` | All | Optional | Cabinet and drawer at the local site in which to place the report returned by an [`@NRT`](NRT.md) statement. Default: cabinet and drawer specified in the `@NRT` statement on the remote system. |
| `"cmd"` | 2200 only | Required | Run name or manual function call to execute at the remote site, including any input parameters. Enclose in double quotes. Maximum: 255 characters. |
| `"cmd"` | Windows / Linux / UNIX | Required | Run name or manual function call to execute at the remote site, including any input parameters. Enclose in double quotes. Maximum: 998 characters. |

---

## Guidelines

- To return to the local site manually, type two release characters (`^^`) and press **Transmit**.
- If `@NRM` started a run, the remote run can execute an [`@NRT`](NRT.md) (Network Return) statement to return to the local site.
- Include error and abort routines in the remote run to maintain transparency. The routines should return the user to the local site via `@NRT` in case of an error.
- *(Windows / Linux / UNIX)* Do not place other statements on the same line after `@NRM` — they will be ignored. Place the next statement on a new line.

---

## Examples

Sign on to remote host `SYS15`, MAPPER site `K`, then execute the `ABC` run:

```
@net,SYS15,k,newuser,7,newuser .
@nrm "abc" .
```

In the remote run, return the user to the local site and send back report `2B0`:

```
@nrt,0,b,2 .
```
