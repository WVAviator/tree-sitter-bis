# SEND and @SEN — Send Report

## Overview

Use the `SEND` function or `@SEN` statement to send an entire report from one station to another. The receiving station can be on your system or at another site. You can request that the system notify you when the receiver accepts the message; the receiver can also send a message back to you.

> **Note:** For the `SEND` manual function, the report you want to send must be on display.

---

## Syntax

### Control Line

```
SEND [sn,sl,ack?]
```

### Statement

```
@SEN,c,d,r,sn[,sl,ack?,lab] .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `c,d,r` | Required | Report to send. See *Specifying Reports or Drawers to Process* for details. |
| `sn` | Required | Station number of the receiving station. |
| `sl` | Optional | Site letter of the receiving station. For a list of sites, press **Remote** from the active screen. Default = local site. |
| `ack?` | Optional | Request acknowledgment when the message is received? `Y` or `N`. Default = `N`. |
| `lab` | Optional | Label to go to if the station is not configured. |

---

## Outcome

The command sends the report as a result to the specified station. When using the manual `SEND` function, the report is redisplayed on the sender's screen along with a message indicating the report was queued to the receiving station.

### When the Receiver Duplicates the Message

**Windows / Linux / UNIX:**
- If the message is from the same system, a report is created in the cabinet and drawer of the original report being sent.
- If the message is from a remote system, it resides in cabinet 0, drawer I. If duplicated, the duplicate report also resides in cabinet 0, drawer I.

**2200:**
- If the message is from the same system, a report is created in the specified drawer of the user's current cabinet (default = drawer letter of the sent report).
- If the message is from a remote system and has more than 80 characters per line, it resides in cabinet 0, drawer I. If 80 characters or fewer, it resides in drawer A. If duplicated, the duplicate resides in the specified drawer of the user's current cabinet (default = drawer I if over 80 characters, drawer A if 80 or fewer).

If the number of characters in the received message exceeds the maximum line length, report lines are truncated to the maximum line length.

---

## Examples

Sends report `1A0` to station 5 (manual function equivalent):

```bismapper
@sen,0,a,1,5 .
```

Sends result `-2` to station 22, requests acknowledgment, and goes to label `099` if the station does not exist:

```bismapper
@sen,-2,22,,y,099 .
```

---

## See Also

- [`@SNU`](SNU.md) — Send Report to User
- [`@SCH`](SCH.md) — Schedule Run Statements
- [`@RRN`](RRN.md) — Remote Run
