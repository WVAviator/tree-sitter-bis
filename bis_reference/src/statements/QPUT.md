# @QPUT (Put Message on Message Queue)

## Overview

Sends a message to a message queue. Part of a group of statements for working with message queues:

- [`@QCLS`](QCLS.md) — Close Message Queue Object
- [`@QGET`](QGET.md) — Get Message from Message Queue
- [`@QINQ`](QINQ.md) — Inquire on Object Attribute
- [`@QOPN`](QOPN.md) — Open Message Queue Object

> **Note:** You should be familiar with IBM WebSphere MQ and have a thorough understanding of message queues before using this statement.

---

## Syntax

```
@QPUT[,c,d,r,l,q,tabs?,lab]
    vobjhandle[,o,correlid,msgid,expiry,msgtyp,replytoquemgr,replytoquenam]
    [vcorrelid,vmsgid] .
```

### Parameters

| Field | Description |
|-------|-------------|
| `c,d,r` | Report to send. |
| `l` | Line number at which to start processing. Default = line `2`. |
| `q` | Number of lines to process. Default = all lines from the starting line to the end of the report. |
| `tabs?` | Convert tab characters to space characters? `Y` or `N`. Default = `N`. |
| `lab` | Label to go to if an error or warning is received. See [Returned Status](#returned-status). |
| `vobjhandle` | Variable containing an existing object handle. |
| `o` | Reserved for future use. |
| `correlid` | Correlation identifier (24 character maximum). If blank, Business Information Server generates a unique value. See [Guidelines](#guidelines). |
| `msgid` | Message identifier (24 character maximum). If blank, Business Information Server generates a unique value. See [Guidelines](#guidelines). |
| `expiry` | Time in tenths of seconds the message stays on the queue before it can be discarded. Default = `0` (stays forever or until removed). Range: `0`–`999999999` (approximately 3.17 years). Expired messages are not sent to the dead-letter queue. |
| `msgtyp` | Message type. Values: `1` = requesting a reply (must include `replytoquemgr` and `replytoquenam`), `2` = replying to a received message, `8` = simple message with no reply expected (default), `#` = application defined (65536–999999999). |
| `replytoquemgr` | Queue Manager to receive the reply, if requesting one (48 character maximum). Default = blank (default Queue Manager). |
| `replytoquenam` | Queue Name to receive the reply, if requesting one (48 character maximum). |
| `vcorrelid` | Variable to capture the correlation identifier sent with the message (`S24`). |
| `vmsgid` | Variable to capture the message identifier sent with the message (`S24`). |

---

## Outcome

If the message is successfully placed on the queue, the correlation and message identifiers are returned in `vcorrelid` and `vmsgid`. All returned status reserved words are set to zero.

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
| `4` | WebSphere MQ put error |
| `100` | The WebSphere MQ interface is down |
| `101` | Invalid object handle specified |
| `103` | Report does not exist or line is beyond the end of the report |
| `105` | Maximum data bytes exceeded |
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
- Trailing spaces are removed from each line in the report. A carriage return (CR) and line feed (LF) are appended to each line as termination characters. If no report is specified, a message of length zero is placed on the queue.
- Non-BIS applications should never allow the Queue Manager to generate unique correlation and message identifiers, as the generated values contain binary data that is not displayable in the BIS system.
- The Queue Manager, Queue, and Business Information Server each have a defined maximum message size. The smallest of the three maximums is the deciding factor. The BIS maximum is 999,999 characters (including control characters, excluding trailing spaces).

---

## Examples

Put a message from report `1A0` on a queue. The system generates unique `correlid` and `msgid` values. Message type `8` indicates a datagram (no reply expected):

```
@QPUT,0,A,1,,,Y,0199 <vobjhandle>,,,,,8 \
    <vcorrelid>s24,<vmsgid>s24 .
```

Put a message from report `2A0` starting at line 1000 for 2000 lines, with user-defined IDs, a 500-second expiry, and message type `1` (reply expected):

```
@QPUT,0,A,2,1000,2000,N,0199 \
    <vobjhandle>,,'BIS-CorrelID-01','BIS-MsgId-01',5000,1 .
```

Open a queue, get a message, and reply to it if a reply is requested. The `MsgId` from `@QGET` is inserted into the `correlid` field of `@QPUT` so the originator can locate the reply:

```
@QOPN,0199 '','MY.LOCAL.Q',G <vHanG>i6 .
@QGET,0,A,,0199 <vHanG> \
    <vMsgTyp>i9,,<vMsgId>s48,<vReToMgr>s48,<vReToQue>s48 .
@IF <vMsgTyp> ne 1,(xxxx) ; .              \ Jump if no reply needed
@QOPN,0199 <vReToMgr>,<vReToQue>,P <vHanP>i6 .
@QPUT,-0,,,,0199 <vHanP>,,<vMsgId>,,,2 .  \ Send reply
```
