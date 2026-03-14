# @RETURN (Return Call Routine)

## Overview

Exits a called subroutine and returns control to the calling run on the line following the [`@CALL`](CALL.md) (Call Subroutine) statement.

---

## Outcome

- Returns the current result (`-0`) created in the subroutine and any variables passed in the `@CALL` statement.
- Renamed results (`-1` to `-16`) in the calling run remain unchanged, even if the subroutine created its own renamed results.

---

## Syntax

*(2200 only)*
```
@RETURN .
```

*(Windows Server / Linux / UNIX / Windows Client)*
```
@RETURN,lab .
```

`lab` is the label to go to instead of returning to the line following the `@CALL` statement. The label can be stored in a variable, allowing it to be set dynamically based on activities occurring in the run.
