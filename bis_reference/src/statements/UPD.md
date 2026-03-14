# UPD and @UPD — Update

## Overview

Replaces the lines in a report with those displayed in the update result.

- The **manual function** updates the lines and redisplays the original report. Requires an update result from a previous function to be on display.
- The **statement** updates the lines and turns the update result into a normal `-0` result. The update result must be the current `-0` result.

---

## Syntax

### Control Line
```
UPD [psw]
```

`psw` — password required to perform an update operation on a write-protected report.

### Statement
```
@UPD .
```

---

## Guidelines

Before executing the Update command, you can modify the lines in the update result:

- **Delete** lines you do not want used as replacement lines in the original report.
- **Add** lines to the update result — added lines are placed at the end of the original report.
- **Modify** data in the lines of the update result — changed lines replace those in the original report.

To remove lines from the original report and discard the update result, use the Delete command. See [DEL](DEL.md) and [`@DEL`](../statements/DEL.md) (Delete).

To remove lines from the original report and retain the lines in the update result, use the Extract command. See [EXT](EXT.md) and [`@EXT`](../statements/EXT.md) (Extract).
