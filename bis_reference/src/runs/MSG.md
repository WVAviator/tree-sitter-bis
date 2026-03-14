# MSG — Message Waiting

Displays a message sent to your station or user ID. The message is displayed as a result in the cabinet and drawer it was sent from.

Messages from a remote site reside in cabinet `0`, drawer `I`. If the message is duplicated, the duplicate report also resides in cabinet `0`, drawer `I`.

> *(2200 only)* If a message from an OS 2200 remote site is 80 characters or fewer, it resides in drawer `A`. Duplicates also reside in drawer `A`.

An incoming message is signaled with a beep. A visual indicator may or may not be present depending on the terminal or terminal emulator in use.

---

## Syntax

```
MSG
```

- If the message came from the **local site**, press the **Message** key to display it.
- If the message came from a **remote site**, press **Message** to stop the beeping, then enter `msg` to display the message.

---

## Guidelines

- To delete a message from the queue, type `ok` on the control line of the displayed message, transmit, then press the **Return** function key.
- *(Windows / Linux / UNIX)* To display the next message in the queue, request the `MSG` command again.
- *(2200)* To display the next message, first acknowledge the current message (type `ok` and press **Transmit**), then request the `MSG` command again.
