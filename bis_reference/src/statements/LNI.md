# Insert Line and @LNI

## Overview

Copies lines from one location in a report to another. Compare with the Move Line command:

- **Insert Line** copies the lines, retaining them in their original location.
- **Move Line** moves the lines, deleting them from their original location.

The command copies the specified lines; it does not create a result.

For the manual function, the report must be on display. For the `@LNI` statement, unless you are processing a result, you must precede it with an [`@LOK`](LOK.md) (Update Lock) statement.

---

## In-Report-Line Format

```
>]xIl[,q|-LL]
```

| Field | Description |
|-------|-------------|
| `>]` | SOE character and line change command. |
| `x` | Number of times to insert the line or lines. |
| `I` | Insert Line call. |
| `l` | Line number of the first line to insert. |
| `q` | Number of lines to insert. Default = `1`. |
| `LL` | Line number of the last line to insert. Default = `1`. |

---

## Statement Format

```
@LNI,c,d,r,lb4,[x],l[,q] .
```

| Field | Required | Description |
|-------|----------|-------------|
| `c,d,r` | Required | Report where lines are to be copied. For more details, see *Specifying Reports or Drawers to Process*. |
| `lb4` | Required | Line number preceding the location where the copied lines are to be inserted. |
| `x` | Optional | Number of times to copy and insert the lines. Default = `1`. |
| `l` | Required | Number of the first line to insert. |
| `q` | Optional | Number of lines to insert, beginning with line `l`. Default = `1`. |

---

## Procedure

**Using the Line Change menu:**

1. Place the cursor on the first line to be copied.
2. Press **Edit**.
3. Press **LineCh**. The Line Change menu is displayed.
4. In the *Yank line* field, type the number of lines to copy and transmit. Default = `1`.
5. Move the cursor to the line above where the copied lines are to be inserted.
6. Press **LineCh**. The Line Change menu is displayed.
7. Move the cursor to the *Put line* field and transmit.

You can repeat steps 5–7 to copy lines to multiple locations until you release the buffer or perform another yank operation.

**Using the in-report-line format:**

1. Place the cursor on the line above where the copied lines are to be inserted.
2. Erase to the end of the line.
3. Enter the Insert Line in-report-line format.

---

## Example

Copy lines `8` and `9` once and insert them after line `6`. Place the cursor on line `6`, erase to the end of the line, and enter:

```
>]1i8,2
```

Equivalent statement:

```
@lni,0,b,2,6,1,8,2 .
```
