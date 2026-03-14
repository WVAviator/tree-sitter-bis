# DEL, @DEL, @LND, and @LN- — Delete

This page covers three related delete operations:

- [DEL and @DEL](#del-and-del) — Remove lines in an update result from the original report.
- [Delete and Yank Line (@LND)](#delete-and-yank-line-lnd) — Delete lines from a report and copy them to a buffer.
- [Delete Line (@LN-)](#delete-line-ln-) — Delete lines directly from a report.

---

## DEL and @DEL

Removes lines in an update result from the original report.

- The **interactive function** deletes the lines and redisplays the original report.
- The **statement** removes the lines from the report and converts the update result to a normal `-0` result.

> For the interactive function, an update result from a previous function must be on display. For `@DEL`, the update result must be the `-0` result.

### Syntax

**Control line (interactive):**
```
DEL [psw]
```

| Field | Description |
|-------|-------------|
| `psw` | Password required to delete from a write-protected report. |

**Statement:**
```
@DEL .
```

### Guidelines

- Only the lines present in the update result are removed from the original report.
- Lines deleted from the update result *before* executing `DEL` are **not** removed from the original report.
- To remove lines from the original report while retaining them in the update result, use [`EXT and @EXT`](EXT.md) (Extract).
- To replace lines in the original report with lines from the update result, use [`UPD and @UPD`](UPD.md) (Update).

---

## Delete and Yank Line (@LND)

Deletes lines from a report and copies them into a temporary buffer, allowing them to be placed elsewhere using the Put Line command.

> For the interactive function, the report must be on display. For `@LND`, unless processing a result, precede with a [`@LOK`](LOK.md) (Update Lock) statement.

Compare to [Delete Line (@LN-)](#delete-line-ln-), which deletes lines without copying them to a buffer.

### Syntax

**In-report-line format:**
```
>][n]D[b]
```

| Field | Description |
|-------|-------------|
| `>]` | SOE character and line change command. |
| `n` | Number of lines to delete and yank. Default = 1. |
| `D` | Delete and Yank Line call. |
| `b` | Buffer label (1–100). Default = unlabeled buffer. |

**Statement:**
```
@LND,c,d,r,l[,q,b] .
```

| Field | Required | Description |
|-------|----------|-------------|
| `c,d,r` | Required | Report from which to delete and copy lines. See *Specifying Reports or Drawers to Process*. |
| `l` | Required | Line number of the first line to delete and copy. |
| `q` | Optional | Number of lines to delete and copy. Default = 1. If more lines are specified than the report contains, all lines from `l` to the end are deleted and copied. |
| `b` | Optional | Buffer label (1–100). Default = unlabeled buffer. |

### Behavior

Deletes the specified lines from the report and copies them into the buffer. If the buffer does not exist, it is created. When using the Delete key or the Delete Lines selection of the Line Change menu, the system executes this command and holds the deleted lines in a buffer.

### Guidelines

- To move lines from the buffer to the current report, use the Put Line command. See [`@LNP`](LNP.md).
- If a buffer label is specified, remember it for use with the Put Line command.
- For information on buffers, see *Temporary Buffers* in [`@LNA`](LNA.md) (Append Line).

### Procedures

**To delete and yank one line or a few lines:**

Option A — using Edit key:
1. Place the cursor on the line to delete and yank.
2. Press **Edit**.
3. Press **Delete** once for each line.

Option B — using in-report-line format:
1. Place the cursor at the beginning of the first line.
2. Erase to the end of the line.
3. Enter the Delete and Yank Line in-report-line format.

**To delete and yank several lines:**
1. Place the cursor on the first line.
2. Press **Edit**, then **LineCh**. The Line Change menu is displayed.
3. Type the number of lines in the Delete lines field and transmit. If more lines are specified than the report contains, all remaining lines are deleted. Default = 1.

### Example

Delete lines 12–19 from report `1C0` and copy them into buffer `33`. Place the cursor on line 12, erase to the end of the line, and enter:
```
>]8d
```
Equivalent statement:
```
@lnd,0,c,1,12,8,33 .
```

---

## Delete Line (@LN-)

Deletes lines directly from a report without creating a `-0` result.

> For the interactive function, the report must be on display. For `@LN-`, unless processing a result, precede with a [`@LOK`](LOK.md) (Update Lock) statement.

### Syntax

**In-report-line format:**
```
>]q-
```

| Field | Description |
|-------|-------------|
| `>]` | SOE character and line change command. |
| `q` | Number of lines to delete. No default. If more lines are specified than the report contains, all lines following the request are deleted. |
| `-` | Delete Line call. |

**Statement:**
```
@LN-,c,d,r,l,q .
```

| Field | Required | Description |
|-------|----------|-------------|
| `c,d,r` | Required | Report in which to delete lines. See *Specifying Reports or Drawers to Process*. |
| `l` | Required | Line number of the first line to delete. |
| `q` | Required | Number of lines to delete. No default. |

### Behavior

Deletes the specified lines from the report. Does **not** create a `-0` result. When using the menu procedure, the deleted lines are also copied to a buffer and can be placed in another report using the Put Line command. See [`@LNP`](LNP.md).

### Procedures

**To delete one line or a few lines:**

Option A — using Edit key:
1. Place the cursor on the line to delete.
2. Press **Edit**.
3. Press **Delete** once for each line.

Option B — using in-report-line format:
1. Place the cursor on the first line to delete.
2. Erase to the end of the line.
3. Enter the Delete Line in-report-line format.

**To delete several lines:**
1. Place the cursor on the first line to delete.
2. Press **Edit**, then **LineCh**. The Line Change menu is displayed.
3. Type the number of lines in the Delete lines field and transmit. Default = 1.

**To undo a delete** (immediately after deleting): press **Undo**.

### Example

Delete 2 lines from report `1B0` starting at line 15. Place the cursor on line 15, erase to the end of the line, and enter:
```
>]2-
```
Equivalent statement:
```
@ln-,0,b,1,15,2 .
```
