# @QCLS (Close Message Queue Object)

## Overview

Closes a message queue object. Part of a group of statements for working with message queues:

- [`@QGET`](QGET.md) — Get Message from Message Queue
- [`@QINQ`](QINQ.md) — Inquire on Object Attribute
- [`@QOPN`](QOPN.md) — Open Message Queue Object
- [`@QPUT`](QPUT.md) — Put Message on Message Queue

> **Note:** You should be familiar with IBM WebSphere MQ and have a thorough understanding of message queues before using this statement.

---

## Syntax

```
@QCLS[,lab] vobjhandle[,o] .
```

### Parameters

| Field | Description |
|-------|-------------|
| `lab` | Label to go to if an error or warning is received (see [Returned Status](#returned-status)). Ignored when the `A` option is specified. |
| `vobjhandle` | Variable containing an existing object handle. |
| `o` | Option field. See [Options](#options). |

---

## Options

| Option | Description |
|--------|-------------|
| `A` | Closes all open objects. *(Windows / Linux / UNIX)* Also disconnects the Queue Manager. Use this option when a connection to a second queue manager is necessary. |

---

## Outcome

If the close is successful, control is returned to the script and all returned status reserved words are set to zero.

If an error occurs, the script continues at the specified label with `STAT1$`, `STAT2$`, and `STAT3$` set as described in [Returned Status](#returned-status). If no label is specified, the script errors.

---

## Returned Status

`STAT1$` — Completion code:

| Value | Description |
|-------|-------------|
| `0` | OK |
| `1` | Warning message |
| `2` | Command failed |

`STAT2$` — Status code:

| Value | Description |
|-------|-------------|
| `0` | No error |
| `7` | WebSphere MQ close error |
| `100` | The WebSphere MQ interface is down |
| `101` | Invalid object handle specified |
| `200` | URTS NPESTAT error *(2200 only)* |
| `201` | URTS TPENPE error *(2200 only)* |
| `202` | URTS NPESETUP error *(2200 only)* |

`STAT3$` — Reason code:

- For `STAT2$` values 1–99: see the WebSphere MQ Application Programming Reference for a complete list of reason codes.
- For `STAT2$` values 100–199: use the [`@LSM`](LSM.md) statement to retrieve the actual message.
- For `STAT2$` values 200–299: contact the Unisys Support Center.

---

## Guidelines

- Always specify a label to assist in evaluating errors. If no label is specified and the operation fails, the script errors. Obtain `STAT1$`, `STAT2$`, and `STAT3$` values at the contingency label.
- When a script terminates for any reason, the system automatically closes all objects in use by that script.
- If the `A` option is specified, all errors are ignored when closing objects.

---

## Examples

Close a single object. If successful, the script continues. If an error occurs, the script continues at label `0199`:

```
@QCLS,0199 <vObjHandle> .
```

Close all objects opened by this session. When using the `A` option, the object handle field is left blank. Errors are ignored:

```
@QCLS ,A .
```
