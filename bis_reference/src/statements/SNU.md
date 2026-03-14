# SNU and @SNU — Send Report to User

## Overview

Use the `SNU` function or `@SNU` statement to send an entire report to another user. This command is similar to [`@SEN`](SEN.md) (Send Report), but you do not need to know the station number of the receiving user.

> **Note:** For the `SNU` manual function, the report you want to send must be on display.

---

## Syntax

### Control Line

```
SNU [user-id,dept,sl,ack?]
```

### Statement

```
@SNU,c,d,r,user-id[,dept,sl,ack?,lab] .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `c,d,r` | Required | Report to send. See *Specifying Reports or Drawers to Process* for details. |
| `user-id` | Required | User-id of the person to receive the report. |
| `dept` | Optional | Department number of the user. Default = all departments. |
| `sl` | Optional | Site letter of the receiving user. For a list of sites, press **Remote** from the active screen. Default = local site. |
| `ack?` | Optional | Request acknowledgment when the message is received? `Y` or `N`. Default = `N`. |
| `lab` | Optional | Label to go to if the user-id or department does not exist. |

---

## Outcome

- The report is sent as a result to the specified user. When using the manual function, the report is redisplayed on the sender's screen along with a message indicating it was queued.
- If no department number is specified, the report is sent to all users with the specified user-id. The first user to acknowledge the message acknowledges it for all users with that user-id.
- If the number of characters in the received message exceeds the maximum line length, report lines are truncated.
- For `@SNU`: if the user-id or department does not exist at the local site, the run goes to the specified label. For remote sites, the system returns a message indicating the user-id or department is invalid.

### When the Receiver Duplicates the Message

**Windows / Linux / UNIX:**
- The system creates a report in the cabinet and drawer of the original report being sent.
- Messages from a remote site reside in cabinet 0, drawer I. If duplicated, the duplicate also resides in cabinet 0, drawer I.

**2200:**
- The report resides in the specified drawer of the user's current cabinet (default = drawer of the sent report).
- Messages from a remote site reside in cabinet 0, drawer I; duplicates also reside in cabinet 0, drawer I. If the message from an OS 2200 remote site is 80 characters or fewer, it resides in drawer A; duplicates also reside in drawer A.

---

## Example

Sends report `1C0` to all users with user-id `newuser`. The run continues at label `003` if `newuser` is not a valid user-id:

```bismapper
@snu,0,c,1,newuser,,,,003 .
```

---

## See Also

- [`@SEN`](SEN.md) — Send Report
- [`@SCH`](SCH.md) — Schedule Run Statements
- [`@RRN`](RRN.md) — Remote Run
