
# AL (Alarm)

> *Applies to: OS 2200 only*

Use the **Alarm (`AL`)** command to compose a message of up to four lines, store it for up to one year, and deliver it to one or more stations or a specific user at a specified date and time.

> **Note:** Messages queued for over one year are automatically deleted.

## Alarm Control Line Format

```
AL[,D]
```

`,D` displays queued messages one at a time and prompts for deletion.

## Alarm Guidelines

- **User-id only:** message delivered to that user regardless of station.
- **User-id + station:** user must be signed on to that station for delivery.
- **Station only:** message sent to that station at the specified time.
- When a message arrives, `MSGW` displays and the terminal beeps. Press **Message Wait** to read it.
- To acknowledge: enter `ok`. To re-read later: use the **Snooze** command.
- To list undelivered sent messages: enter `al,d`.

---
