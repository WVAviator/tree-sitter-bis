# Move Line and @LNM

## Overview

Removes lines from one location and places them in another within a report. Unlike the Insert Line command, Move Line **deletes** the lines from their original location rather than retaining them. The command does not create a result.

| Command | Copies lines? | Deletes from original? |
|---------|--------------|----------------------|
| Move Line | Yes | Yes |
| Insert Line | Yes | No |

For the manual function, the report must be on display.

For the `@LNM` statement, unless processing a result, an [`@LOK`](LOK.md) (Update Lock) statement must precede it.

---

## In-Report-Line Syntax

```
>]xMl[,q|-LL]
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `>]` | Required | SOE character and line change command. |
| `x` | Required | Number of times to move the line(s). |
| `M` | Required | Move Line call. |
| `l` | Required | Line number of the first line to move. |
| `q` | Optional | Number of lines to move. Default: `1`. |
| `LL` | Optional | Line number of the last line to move. Default: `1`. |

---

## Statement Syntax

```
@LNM,c,d,r,lb4,[x],l[,q] .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `c,d,r` | Required | Report in which to move lines. See *Specifying Reports or Drawers to Process* for details. |
| `lb4` | Required | Line number preceding the location where lines are to be moved. |
| `x` | Optional | Number of times to move the lines. Default: `1`. |
| `l` | Required | Number of the first line to move. |
| `q` | Optional | Number of lines to move, beginning at line `l`. Default: `1`. |

---

## Guidelines

Lines can also be moved using the Delete and Yank Line command — delete lines to a buffer and then put them elsewhere. See [`@LND`](LND.md) (Delete and Yank Line) for more information.

---

## Procedure

**Using the Edit menu:**

1. Place the cursor on the first line to be moved.
2. Press **Edit**.
3. Press **LineCh**. The Line Change menu is displayed.
4. Type the number of lines to move in the Delete line field and transmit. Default: `1`. The system yanks the deleted lines so they can be placed elsewhere.
5. Move the cursor to the line where you want the lines to be placed.
6. Press **LineCh**. The Line Change menu is displayed.
7. Move the cursor to the Put lines field and transmit.

**Using the in-report-line format:**

1. Place the cursor on the line above where the lines are to be moved.
2. Erase to the end of the line.
3. Enter the Move Line in-report-line format.

---

## Example

Move lines 8 and 9 one time, placing them after line 6 of report `2B0`. Position the cursor on line 6, erase to the end of the line, and enter:

```
>]1m8,2
```

Equivalent statement:

```
@lnm,0,b,2,6,1,8,2 .
```
