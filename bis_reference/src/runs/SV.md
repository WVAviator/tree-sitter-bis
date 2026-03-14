# SV — Save Report Version

## Overview

Temporarily saves a report or result, allowing you to:

- Retain a result while displaying another report.
- Retain a result while switching cabinets, so you can examine another cabinet's contents while keeping your saved result available for processing.

A report must be on display in order to use the SV command.

When redisplaying a saved item using a function key: if a result was saved, it is redisplayed as a result; if a report was saved, it is redisplayed as a report. If you update a redisplayed report, you are updating the original report.

---

## Syntax

```
SV
```

---

## Guidelines

- To copy a report to a different cabinet, consider using the Replace Report command. See [REP](REP.md) and [`@REP`](../statements/REP.md) (Replace Report).
- If you do not yet know which report or drawer to place the report in, use `SV` to save the report as a result, switch to the new cabinet, examine its contents, and then save the report once you've decided.

---

## Procedures

### Saving a Report While Switching Cabinets

1. With the report to save on display, execute the Save Report Version command (via menu or control line).
2. Switch to a different cabinet using the Cabinet Switch (`C`) command. *(Do not use the `CS` command.)*
3. Press **Resume** to display the saved result.
4. Process the result — for example, save it as a report using the Replace Report or Duplicate Report command.

> **Note:** Between steps 1 and 4, do not use any command that can be resumed, or run any run. Doing so may cause the system to release the saved version.

---

### Saving Up to Four Reports or Results

1. Use the Save Report Version command to save the first report or result.
2. Display the second report or result and press **F2**.
3. Display the third report or result and press **F3**.
4. Display the fourth report or result and press **F4**.

To redisplay a saved result, press its corresponding function key. To release all saved results, enter a caret (`^`).

The function key bar is redefined to show the report or result number next to each key (F1–F4), or the word **Open** if nothing is saved. Press the **Contrl** function key to restore the original function key definitions. To return to the Save Report Version function key bar, press **Resume**.
