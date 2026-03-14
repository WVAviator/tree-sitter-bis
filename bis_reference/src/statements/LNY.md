# Yank Line and @LNY

## Overview

Copies lines from a report into a temporary buffer.

Compared to the Append Line command:

- **Yank Line** — overwrites the buffer.
- **Append Line** — adds lines to the end of the buffer.

When executed:
- The specified lines are copied into the buffer.
- If the buffer does not exist, it is created.
- If more lines are requested than the report contains, all lines from the starting point to the end of the report are copied.

For the manual function, the report being copied from must be on display.

For more information on buffers, see [Append Line and @LNA](LNA.md).

---

## Syntax

### In-Report-Line Format
```
>][n]Y[b]
```

| Field | Description |
|-------|-------------|
| `>]` | SOE character and line change command. |
| `n` | Number of lines to copy. Default = `1`. |
| `Y` | Yank Line call. |
| `b` | Buffer label from `1` through `100`. Default = unlabeled buffer. |

### Statement
```
@LNY,c,d,r,l[,q,b] .
```

| Field | Description |
|-------|-------------|
| `c,d,r` | Report from which lines are to be copied. See *Specifying Reports or Drawers to Process*. |
| `l` | Line number of the first line to copy. |
| `q` | Number of lines to copy. Default = `1`. If more lines are specified than the report contains, all lines from `l` to the end of the report are copied. |
| `b` | Buffer label from `1` through `100`. Default = unlabeled buffer. |

---

## Guidelines

- If you specify a buffer label, remember it — you will need it when copying the buffer lines with the Put Line command.
- To move lines from the buffer into a report, use the Put Line command.

---

## Procedure

**Using the menu:**
1. Place the cursor at the beginning of the first line to copy.
2. Press **Edit**.
3. Press **LineCh**. The Line Change menu is displayed.
4. Tab to the **Yank lines** field.
5. Enter the number of lines to copy (default = 1).
6. Transmit.

**Using the in-report-line format:**
1. Place the cursor at the beginning of the first line to copy.
2. Erase to the end of the line.
3. Enter the Yank Line in-report-line format.

---

## Example

Copy lines 12 through 19 (eight lines) from report `1C0` into buffer 33. Position the cursor on line 12, erase to the end of the line, and enter:

```
>]8y33
```

Equivalent statement:
```
@lny,0,c,1,12,8,33 .
```
