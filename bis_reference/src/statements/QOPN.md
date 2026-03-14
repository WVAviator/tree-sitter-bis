# @QOPN (Open Message Queue Object)

## Overview

Opens a message queue object for subsequent work. Part of a group of statements for working with message queues:

- [`@QCLS`](QCLS.md) — Close Message Queue Object
- [`@QGET`](QGET.md) — Get Message from Message Queue
- [`@QINQ`](QINQ.md) — Inquire on Object Attribute
- [`@QPUT`](QPUT.md) — Put Message on Message Queue

> **Note:** You should be familiar with IBM WebSphere MQ and have a thorough understanding of message queues before using this statement.

---

## Syntax

```
@QOPN[,lab] [quemgr],[objname],o vobjhandle .
```

### Parameters

| Field | Description |
|-------|-------------|
| `lab` | Label to go to if an error or warning is received. See [Returned Status](#returned-status). |
| `quemgr` | Queue Manager name (48 character maximum). Default = blank (default Queue Manager). Queue Manager names are case-sensitive. |
| `objname` | Object name. Must be a valid Queue name (48 character maximum). Must be blank if opening a Queue Manager for an Inquire. Object names are case-sensitive. |
| `o` | Option field. See [Options](#options). At least one option must be specified. |
| `vobjhandle` | Receives the object handle for use in subsequent Message Queue statements. Defined as `I6`. |

---

## Options

| Option | Description |
|--------|-------------|
| `G` | Open for input from a queue using the default access type defined by the queue (shared or exclusive). |
| `G(S)` | Open for input from a queue using shared access. |
| `G(E)` | Open for input from a queue using exclusive access. |
| `I(M)` | Open to inquire on a Queue Manager. Do not combine with any other option. |
| `I(Q)` | Open to inquire on a Queue name. |
| `P` | Open for output to a queue. |

---

## Outcome

If the object can be opened, a handle is returned in `vobjhandle` and all returned status reserved words are set to zero.

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
| `1` | WebSphere MQ connect error |
| `2` | WebSphere MQ open error |
| `8` | WebSphere MQ disconnect error |
| `100` | The WebSphere MQ interface is down |
| `102` | Maximum open handles/connections exceeded |
| `108` | Business Information Server resources are unavailable at this time |
| `200` | URTS NPESTAT error *(2200 only)* |
| `201` | URTS TPENPE error *(2200 only)* |
| `202` | URTS NPESETUP error *(2200 only)* |
| `300` | Windows error code |

`STAT3$` — Reason code:

- For `STAT2$` values 1–99: see the WebSphere MQ Application Programming Reference for a complete list of reason codes.
- For `STAT2$` values 100–199: use the [`@LSM`](LSM.md) statement to retrieve the actual message.
- For `STAT2$` values 200–299: contact the Unisys Support Center.
- For `STAT2$` values 300–399: see the Windows System Error Codes for more information.

---

## Guidelines

- The executing script must be a full character set (FCS) report due to the case-sensitivity of WebSphere naming conventions.
- Always specify a label to assist in evaluating errors. If no label is specified and the operation fails, the script errors. Obtain `STAT1$`, `STAT2$`, and `STAT3$` values at the contingency label.
- Object handles may be passed across subroutine boundaries (e.g., as [`@CALL`](CALL.md) arguments or returned from a subroutine), but not across application boundaries. All object handles are released when the current application terminates.
- A maximum of 32 objects may be open at one time.
- *(2200 only)* If Queue Manager names are externally redefined, the Business Information Server MQS interface may need to be re-initialized for the changes to take effect.
- *(Windows / Linux / UNIX)* Only one Queue Manager may be connected at a time within an executing script. To disconnect a Queue Manager, use [`@QCLS`](QCLS.md) with the `A` option.

---

## Examples

Open a queue to put a message, using the default queue manager:

```
@QOPN,0199 '','BISTestQueue',P <vObjHandle>i6 .
```

Open a queue to get a message from a specific queue manager:

```
@QOPN,0199 'my.qmgr','MY.LOCAL.Q2',G <vHandle2>i6 .
```

Open a queue manager for an inquiry (object name left blank):

```
@QOPN,0199 'BISTestQueueManager',,I(M) <vObjHandle>i6 .
```
