# EXIT and @XUN — Exit MAPPER

## Overview

Terminates the connection to the software, ending the current run, the active session, and returning to the previous environment.

Platform-specific behavior upon exit:

- **Linux / UNIX:** If the run user executed the software from the Linux or UNIX login, the logon prompt is displayed. If executed from a shell, the shell prompt is displayed.
- **Graphical Interface for BIS:** The user session is closed.
- **2200 (Uniscope or emulator):** The user session is closed and system message `MGCM02` is displayed: `"<MAPPER disconnected--enter transaction name>"`.

---

## Manual Function

```
EXIT
```

---

## Syntax

```
@XUN .
```

---

## Procedure

To exit MAPPER using the Exit key:

1. Press the **Return** function key until you reach a screen with **SgnOff** on the function key bar.
2. Press **SgnOff** to end your user session. (The inactive logo is displayed.)
3. Press **Exit** (or type `exit` at the home position and transmit).
