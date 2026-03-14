# SS — Station-to-Station Message

## Overview

Sends data or a message to a configured station. A maximum of one screen of data may be sent.

When the command is issued:
- A system message is displayed on your screen confirming the message was queued to the receiving station.
- The receiving station is notified that a message is waiting.
- The system continues to attempt delivery until the receiving user acknowledges the message.

For information on acknowledging messages, see [OK](OK.md) and [`@OK`](../statements/OK.md) (Acknowledge Message).

> **Note:** Do not send system messages or data containing SOE characters. To send part of a report, enter the SS command on the control line — requesting the command through the menus clears the screen.

---

## Message Storage

### Windows / Linux / UNIX

| Source | Report Location | Duplicate Location |
|--------|----------------|--------------------|
| Remote site | Cabinet 0, Drawer I | Cabinet 0, Drawer I |
| Local site | Cabinet 0, Drawer F | Cabinet 0, Drawer F |

### OS 2200

| Source | Report Location | Duplicate Location |
|--------|----------------|--------------------|
| Remote site | Cabinet 0, Drawer I | Cabinet 0, Drawer I |
| Remote site (≤ 80-character result) | Cabinet 0, Drawer A | Cabinet 0, Drawer A |
| Local site | Cabinet 0, Drawer A | Cabinet 0, Drawer A |

---

## Syntax

```
SS[,C]
```

### Parameters

| Field | Description |
|-------|-------------|
| `C` | Optional. Clears the screen. Use when a menu is on display and you want to send a station-to-station message. Default = retains the current screen and requests information at the top of the screen. |

---

## Procedure

1. In the **Message to station** field, type the station number of the receiving station. Typing the site letter is optional. (To see a list of sites, press **Remote** from the active screen.)
2. To request an acknowledgment when the message is received, tab to the **Request message acknowledge** field and type `Y`. The system will send you a message when the receiving user acknowledges it.
3. Move your cursor below the top line and type your message (up to one screen). If you entered `SS` on the control line with a report on display, you may also send part or all of the displayed report — move the cursor below the part to be sent, then transmit.
4. Transmit.
