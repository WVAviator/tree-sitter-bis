# @LOG — Log for Analysis

## Overview

Logs each statement executed in a script to create a result that can help evaluate the general quality of the script.

> **Note:** Place `@LOG` ahead of all other statements, except for label table (`:L`) statements, which must always appear at the beginning of the script. Remove `@LOG` from the script when finished evaluating.

---

## Syntax

```
@LOG .
@LOG,SUB .
```

The `SUB` option provides an intermediate level of logging. When Subroutine Logging is active, statistics accumulate until a call to or return from a subroutine is encountered — specifically [`@CALL`](CALL.md), [`@RSR`](RSR.md), [`@GTO`](GTO.md) `RPX`, [`@RETURN`](RETURN.md), or [`@ESR`](ESR.md). At that point, an entry is written to the log showing the resources used since the previous log entry.

---

## Guidelines

- With `@LOG` in the script, start the script normally.
- When the script finishes, wait a few seconds and then press **Resume** to view the log result.
- If the script contains a [`@REL`](REL.md) (Release) statement, replace it temporarily with a [`@GTO`](GTO.md) `END` statement. This keeps the log result intact after the script completes — leaving `@REL` in place causes the log result to be unavailable when you press Resume.
- When finished analyzing, restore the `@REL` statement and remove the `@GTO END` statement.
- If the script does not terminate normally (for example, due to an infinite loop) and you cannot obtain a log result, ask your administrator to retrieve it for you.
