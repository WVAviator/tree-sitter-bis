# Release Display and @REL

## Overview

Releases the current screen and displays the active screen. The `@REL` statement also terminates the run.

> **Note:** Release Display does not sign you off the system. For more information on signing off, see [`@XIT`](XIT.md) (Sign Off User Session).

### Outcome

Executing this command causes the following actions:

- The active screen is displayed.
- The system releases the current report or result.
- The system clears any line buffers.
- The system releases any runs, temporarily saved reports or results, and previous error conditions.

---

## Manual Function Syntax

Type `^` (a caret) on the control line and press Transmit:

```
^
```

Additional ways to release the screen:

- Press **Quit** if it is displayed on the function key bar.
- Press **Return** until the active screen is displayed.

---

## Statement Syntax

```
@REL .
```
