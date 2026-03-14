# @SGPUT — Session Global Report Put

## Overview

Use the `@SGPUT` statement to save a copy of a report to the Session Global Report Table. A temporary copy (RSL) of the report is placed into the table and identified by the assigned name. Your current `-0` report is not affected.

If the name already exists in the table, it is replaced with the new report and the old report is discarded. If any errors occur, the script goes to `lab` if specified, or continues at the next statement.

> **Note:** To delete a Session Global report, omit `c,d,r` and specify only the report name (e.g., `@sgput,,,,'my_report'`).

---

## Syntax

```
@SGPUT,c,d,r,name[,lab] .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `c,d,r` | Optional | The report to copy and save. If omitted (`@SGPUT,,,,name`), the Session Global report with the specified name is deleted instead. |
| `name` | Required | The name to assign to the Session Global report (1–16 characters). If the name already exists, it is replaced. See *Working with Session Global Reports* for naming conventions. |
| `lab` | Optional | Label to go to if the command fails (`STAT1$` ≠ 0). If no label is specified, the script continues with the next statement. |

---

## Reserved Words

| Reserved Word | Description |
|---------------|-------------|
| `STAT1$` | `0` = successful; a copy of the report was placed in the Session Global Report Table. `1` = report name could not be found (delete only). `2` = report table is full. `3` = script is not registered for read-access to the drawer of this report (`@SGGET` only). |
| `STAT2$` | Number of active reports in the Session Global Report Table after this command completes. Same value as `SGRACT$`. |
| `STAT3$` | System error message number corresponding to the `STAT1$` value. Use [`@LSM`](LSM.md) to translate the number into error message text. |

See also reserved words `SGRACT$` and `SGRMAX$`.

---

## Examples

Save a copy of report `2B0` to the Session Global Report Table:

```bismapper
@sgput,0,b,2,'my_report1' .
```

Save a result (`-3`) to the Session Global Report Table:

```bismapper
@sgput,-3,'my_report2' .
```

Delete a Session Global report (no report specified = delete operation):

```bismapper
@sgput,,,,'my_report2' .
```

---

## See Also

- [`@SGGET`](SGGET.md) — Session Global Report Get
- [`@LSM`](LSM.md) — Load System Message
