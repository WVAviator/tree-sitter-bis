# HELP and @HELP — Help

## Overview

Displays graphical help. Requires a workstation session using Graphical Interface for Business Information Server.

> **Note:** If this session is using Graphical Interface for BIS, the reserved word `WS$` (workstation flag) is equal to `1`. Check `DWCAP$(14-1) = 1` for availability. For more information on `DWCAP$`, see the *Developer's Guide*.

---

## Manual Function

```
HELP[,topic]
```

where `topic` is the help topic title or keyword.

---

## Syntax

```
@HELP[,,lab] topic .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `lab` | Optional | Label to continue at if the `@HELP` statement errors within the workstation client. See [Reserved Words](#reserved-words). |
| `topic` | Required | The help topic title or keyword. If no topic is specified, place two apostrophes (`''`) in the topic field. |

---

## Reserved Words

If a label is specified in `lab` and the statement receives an error from the workstation client, the run continues at the label. `STAT1$` contains the error status. See *Graphical Interface Returned Status Codes (STAT1$ Values)* for possible values.

> **Note:** If a run syntax error is detected, the run errors and does not continue at the specified label.

---

## Guidelines

- If the topic is not found, the general index screen is displayed.
- The run continues when the help window is displayed. You must close the help window when finished.

---

## Examples

Find help on the `@CBX` statement from within a run:
```
@help 'cbx' .
```

Access the general help index from within a run:
```
@help '' .
```

Find help on `@CBX` using the manual function:
```
help cbx
```

Access the general help index using the manual function:
```
help
```

---

## Help Function Key

Use the **Help** function key to display context-sensitive online help.

> **Note:** In Graphical Interface for BIS, the function key bar is optionally displayed at the bottom of the screen. If it is not visible, click **File → Display → Fkeys Displayed** to show it. The function keys may also be hidden if the window is too small — increase the window size or change the main window font to a smaller size.
