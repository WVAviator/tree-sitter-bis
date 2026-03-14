# Put Line and @LNP

## Overview

Copies lines from a temporary yank buffer to a report.

For information on buffers, see Temporary Buffers in [`@LNA`](LNA.md) (Append Line).

The buffer must contain lines received from the Yank Line command or the Append Line command. For the manual function, the report you are copying lines into must be on display. For the `@LNP` statement, unless you are processing a result, you must precede it with an [`@LOK`](LOK.md) (Update Lock) statement.

### Outcome

- Inserts the specified lines into the report, truncating or padding with spaces to match the line length of the current report.
- The report expands to receive the added lines.

---

## In-Report-Line Syntax

```
>]P[b]
```

| Field | Description |
|-------|-------------|
| `>]` | SOE character and line change command. |
| `P` | Put Line call. |
| `b` | Buffer label from 1–100 as specified by the Yank Line or Append Line command. Default = unlabeled buffer. |

---

## Statement Syntax

```
@LNP,c,d,r,lb4[,b] .
```

| Field | Description |
|-------|-------------|
| `c,d,r` | Report to which lines are to be copied. See Specifying Reports or Drawers to Process. |
| `lb4` | Line number preceding the line where the buffer lines will be placed. |
| `b` | Buffer label from 1–100 as specified by the [`@LNY`](LNY.md), [`@LNA`](LNA.md), or [`@LND`](LND.md) statement. Default = unlabeled buffer. |

---

## Procedure

**Using the Line Change menu:**

1. Press **Edit**.
2. Place the cursor on the line above where the buffer lines are to be copied.
3. Press **LineCh**. The Line Change menu is displayed.
4. Tab to the **Put lines** field.
5. Enter the buffer number, if one was assigned by a previous Yank Line, Append Line, or Delete and Yank Line command.
6. Transmit.

**Using the in-report-line format:**

1. Place the cursor on the line preceding where the buffer lines are to be copied.
2. Erase to the end of the line.
3. Enter the Put Line in-report-line format.

> **Note:** To copy numbered buffers, you must use the in-report-line format or the `@LNP` statement.

---

## Example

Copy lines 8–10 from report `2B0` into buffer 10 using Yank Line, then insert them into report `13B0` following line 8.

Position the cursor on line 8, erase to the end of the line, and enter:
```
>]3y10
```
Equivalent statement:
```
@lny,0,b,2,8,3,10 .
```

Then position the cursor on line 8, erase to the end of the line, and enter:
```
>]p10
```
Equivalent statement:
```
@lnp,0,b,13,8,10 .
```
