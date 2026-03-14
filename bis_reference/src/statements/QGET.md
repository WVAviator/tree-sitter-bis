# @QGET (Get Message from Message Queue)

## Overview

Retrieves a message from a message queue. Part of a group of statements for working with message queues:

- [`@QCLS`](QCLS.md) — Close Message Queue Object
- [`@QINQ`](QINQ.md) — Inquire on Object Attribute
- [`@QOPN`](QOPN.md) — Open Message Queue Object
- [`@QPUT`](QPUT.md) — Put Message on Message Queue

> **Note:** You should be familiar with IBM WebSphere MQ and have a thorough understanding of message queues before using this statement.

---

## Syntax

```
@QGET,c,d[,hdgs?,lab] vobjhandle[,o,correlid,msgid,waittime]
    | [vmsgtyp,vcorrelid,vmsgid,vreplytoquemgr,vreplytoquenam] .
```

### Parameters

| Field | Description |
|-------|-------------|
| `c,d` | Cabinet and drawer into which the data should be placed. Data is returned as a `-0` result. |
| `hdgs?` | Add headings from the receiving drawer to the data? `Y` or `N`. Default = `N`. |
| `lab` | Label to go to if an error or warning is received (e.g., if no message is found). |
| `vobjhandle` | Variable containing an existing object handle. |
| `o` | Reserved for future use. |
| `correlid` | Correlation identifier (24 character maximum). Used with `msgid` to select a specific message from the queue. If both `correlid` and `msgid` are blank, the first message on the queue is selected. |
| `msgid` | Message identifier (24 character maximum). Used with `correlid` to select a specific message from the queue. If both are blank, the first message is selected. |
| `waittime` | Time in milliseconds the script waits for a message to arrive. If no message is found within the allowed time, the script errors or takes the label exit. Values: `-1` = wait forever, `0` = check once and return immediately (default), `1`–`9999999` = milliseconds to wait (up to 2 hours and 45 minutes). |
| `vmsgtyp` | Variable to capture the message type (`I9`). Values: `1` = requesting a reply (use `vreplytoquemgr` and `vreplytoquenam` to send the reply), `2` = replying to a received message, `8` = simple message with no reply expected (default), `#` = application defined (65536–999999999). |
| `vcorrelid` | Variable to capture the correlation identifier found in the message (`S24`). |
| `vmsgid` | Variable to capture the message identifier found in the message (`S24`). |
| `vreplytoquemgr` | Variable to capture the queue manager used to send a reply (`S48`). |
| `vreplytoquenam` | Variable to capture the queue name used to send a reply (`S48`). |

---

## Outcome

If the message is successfully retrieved, the text of the message becomes the `-0` result and `vmsgtyp`, `vcorrelid`, `vmsgid`, `vreplytoquemgr`, and `vreplytoquenam` are loaded with information from the message. All returned status reserved words are set to zero.

If a warning is received (`STAT1$=1`), the message text may become the `-0` result but may not be complete — for example, it may be truncated or contain invalid characters converted to SOE characters.

If an error occurs, the script continues at the specified label with `STAT1$`, `STAT2$`, and `STAT3$` set as described in [Returned Status](#returned-status). If no label is specified, the script errors.

If `waittime` expires before a message is found, the script continues at the specified label with `STAT1$=2`, `STAT2$=3`, and `STAT3$=2033` (`MQRC_NO_MSG_AVAILABLE`).

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
| `3` | WebSphere MQ get error |
| `100` | The WebSphere MQ interface is down |
| `101` | Invalid object handle specified |
| `104` | Non-string data received |
| `106` | Data exceeds report width — lines have been truncated *(warning)* |
| `107` | Invalid characters have been substituted *(warning)* |
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
- The Queue Manager, Queue, and Business Information Server each have a defined maximum message size. The smallest of the three maximums determines the effective maximum.
- The `vcorrelid` and `vmsgid` fields may contain non-displayable characters. Do not attempt to display their contents or use them with any statement other than [`@QPUT`](QPUT.md).

---

## Examples

Get any available message from a queue, loading result into drawer `A0`:

```
@QGET,0,a,,0199 <vObjHandle>,,,,0 <vmsgtyp>i9,<vcorrelid>s24,\
    <vmsgid>s24,<vReToMgr>s48,<vReToQue>s48 .
```

Get a specific message identified by `<CorrelId>` and `<MsgId>`, waiting indefinitely:

```
@QGET,0,a,,0199 <vObjHandle>,,<CorrelId>,<MsgId>,-1 \
    <vmsgtyp>i9,<vcorrelid>s24,<vmsgid>s24,\
    <vReToMgr>s48,<vReToQue>s48 .
```

Get any message and handle common errors:

```
@QOPN,0195 '','MY.LOCAL.Q',G <vHanG>i6 .          \ Open queue
@QGET,0,I,,0195 <vHanG> .                          \ Get message
@DSX,-0 .                                          \ Display message
@0195 IF STAT1$ eq 1,(0197),2,(0199) ;  .          \ Check status at label exit

@0197 .                                            \ STAT1$ = Warning
@IF STAT3$ eq 2079,(xxxx) ;  .                     \ Message length truncated by WebSphere
@IF STAT2$ eq 106,(xxxx) ;  .                      \ Data exceeds report width
@IF STAT2$ eq 107,(xxxx) ;  .                      \ Invalid characters substituted
@GTO xxxx .                                        \ Jump to error routine

@0199 .                                            \ STAT1$ = Command Failed
@IF STAT3$ eq 2033,(xxxx) ;  .                     \ No messages available
@IF STAT2$ eq 100,(xxxx) ;  .                      \ WebSphere MQ interface is down
@IF STAT2$ eq 101,(xxxx) ;  .                      \ Invalid object handle
@IF STAT2$ eq 102,(xxxx) ;  .                      \ Maximum open handles/connections exceeded
@IF STAT2$ eq 104,(xxxx) ;  .                      \ Non-string data received
@IF STAT2$ eq 108,(xxxx) ;  .                      \ BIS resources unavailable
@GTO xxxx .                                        \ Jump to error routine
```
