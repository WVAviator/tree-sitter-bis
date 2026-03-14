# Append Line and @LNA

## Overview

Use the Append Line function or the `@LNA` statement to copy lines from a report and add them to a temporary buffer. Compare this command to the Yank Line command:

- The Append Line command adds lines to the buffer.
- The Yank Line command overwrites the buffer.

For the Append Line manual function, the report must be on display.

The command adds the specified lines to the end of the buffer. If the buffer was not created by a previous Yank Line command, the Append Line command creates it.

---

## Syntax

### Append Line In-Report-Line Format

```
>][n]A[b]
```

| Field | Description |
|-------|-------------|
| `>]` | SOE character and line change command. |
| `n` | Number of lines to be copied. Default = 1. |
| `A` | Append Line call. |
| `b` | Buffer label from 1 through 100. Default = unlabeled buffer. |

### Append Line Statement Format

```
@LNA,c,d,r,l[,q,b] .
```

| Field | Description |
|-------|-------------|
| `c,d,r` | Report from which to copy lines. For more details, see Specifying Reports or Drawers to Process. |
| `l` | Line number of the first line to copy. |
| `q` | Number of lines to copy. Default = 1. If you specify more lines than the report contains, the statement copies all lines from line `l` to the end of the report. |
| `b` | Buffer label from 1 through 100. Default = unlabeled buffer. |

---

## Guidelines

- You can copy lines of different lengths into a buffer.
- If you specify more lines to copy than a report contains, the command copies all lines following the request.
- To move the lines from the buffer to any current report, use the Put Line ([`@LNP`](LNP.md)) statement.
- For information on buffers, see [Temporary Buffers](#temporary-buffers).

---

## Procedure

### To copy lines to a temporary buffer

1. Place the cursor at the beginning of the first line to be copied.
2. Erase to the end of the line.
3. Enter the Append Line in-report-line format.
4. To copy the lines from the buffer to any current report, use the Put Line command.

---

## Temporary Buffers

Buffers are storage areas that let you hold information temporarily. For example, you can copy lines into a buffer with the Yank Line command, then copy the buffer contents to another location with the Put Line command.

When you copy lines from a buffer to a report, the command inserts the lines at the cursor position. The system truncates the lines or fills them with spaces according to the line length of the current report.

You can continue to copy the contents of a buffer into reports until you clear the buffer with the Release Display (`^`) command, overwrite the buffer with a new Yank Line command, or sign off the software.

The total number of lines stored in all yank buffers cannot exceed the maximum size for a result.

---

## Example

This example adds lines 12 through 14 from report 2B0 to buffer 2. Position the cursor on line 12, erase to the end of the line, and enter the following text:

```
>]3a2
```

**Equivalent Statement:**
```
@lna,0,b,2,12,3,2 .
```
