# OK and @OK — Acknowledge Message

## Overview

Acknowledges a message sent to your station or user ID, optionally returning a response to the sender. The command removes the message from the message queue. If the sender requested an acknowledgment, the message is transmitted back to the sending station.

A message must be on display before using this command. See [MSG](../runs/MSG.md) (Message Waiting).

---

## Control Line Syntax

```
OK [response]
```

where `response` is an optional reply of up to 70 characters to send back to the user who sent the message.

---

## Statement Syntax

```
@OK[,lab,vrsp] .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `lab` | Optional | Label to branch to if no message is queued to your station. |
| `vrsp` | Optional | Variable containing a response to return to the sender. |

---

## Examples

Acknowledge an outstanding message and continue at the next statement. If no messages are queued, branch to label 3:

```
@ok,003 .
```

The following run demonstrates a more complete message-handling pattern. It uses [`@WAT`](WAT.md) with the `M` option to suspend until a message arrives (waiting up to 1000 milliseconds), then acknowledges it, duplicates it into a report, and displays the report location:

```
@65:wat,m,60 1000 .
@brk .
No message was received.
@gto end .
@60:ok dup,-0 ldv,pw v1i4=cab$,v2h1=adrw$,v3i4=rpt$ .
@brk .
The message is in report v3v2v1.
@brk out,-0,2,5,1,1,y .
```

If the run starts without a message waiting, `@WAT` times out after 1000ms and continues past the `@BRK` to display "No message was received." If a message is waiting, the run branches to label 60, acknowledges the message, duplicates it to a report, and displays its location.
