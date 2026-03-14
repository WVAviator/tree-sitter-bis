# EXT and @EXT — Extract

## Overview

Removes lines from an update result from the original report and converts the result into an ordinary result.

- For the **manual function**, an update result from a previous function must be on display.
- For the **`@EXT` statement**, the update result must be the `-0` result.

After extraction, the lines can be used for further processing — for example, duplicating the result to save the lines in a permanent report.

> **Note:** Since the new result is no longer an update result, it cannot be used to update the original report again.

---

## Manual Function

```
EXT [psw]
```

where `psw` is the password required to perform an extract operation on a write-protected report.

---

## Syntax

```
@EXT .
```

---

## Guidelines

- Only the lines present in the update result are removed from the original report. If lines were deleted from the update result before executing `@EXT`, those lines are **not** removed from the original report.
- To remove lines from the original report and discard the update result, use [`@DEL`](DEL.md) (Delete).
- To replace lines in a report with the lines in an update result, use [`@UPD`](UPD.md) (Update).
