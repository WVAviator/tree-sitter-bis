# @SGGET — Session Global Report Get

## Overview

Use the `@SGGET` statement to retrieve a Session Global Report that was previously saved using [`@SGPUT`](SGPUT.md).

---

## Syntax

```
@SGGET,name[,opts,lab] .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Optional* | The Session Global report name (1–16 characters). See *Working with Session Global Reports* for naming conventions. Required unless using the `DA` option. |
| `opts` | Optional | Options field. See [Options](#options). |
| `lab` | Optional | Label to go to if the command fails (`STAT1$` ≠ 0). If no label is specified, the script continues with the next statement. |

---

## Options

| Option | Description |
|--------|-------------|
| *(none)* | Removes the report from the Session Global table and makes it the current `-0`. |
| `C` | Creates a copy of the Session Global report and makes it the current `-0`. The original report remains in the Session Global table. |
| `D` | Deletes the Session Global report without affecting your `-0` report. |
| `A` | Used with the `D` option — deletes all Session Global reports from the table. The `name` field can be blank. |

---

## Outcome

- If the Session Global report exists, it is returned as your current `-0` report and `STAT1$` is set to `0`.
- If the report cannot be returned, `STAT1$` is set to a non-zero value and the script goes to `lab` if specified, or continues at the next statement.

---

## Reserved Words

| Reserved Word | Description |
|---------------|-------------|
| `STAT1$` | `0` = successful; report returned as current `-0`. If the `D` option was specified, the report has been deleted and `-0` is unchanged. `1` = report name not found. `2` = report table is full (`@SGPUT` only). `3` = script is not registered for read-access to the drawer of this report; no `-0` is created and the Session Global report remains in the table. |
| `STAT2$` | Number of active reports in the Session Global Report Table after this command completes. Same value as `SGRACT$`. |
| `STAT3$` | System error message number corresponding to the `STAT1$` value. Use [`@LSM`](LSM.md) to translate the number into error message text. |

See also reserved words `SGRACT$` and `SGRMAX$`.

---

## Examples

Retrieve a Session Global report previously saved with `@SGPUT`:

```bismapper
@sgget,'my_report1' .
```

Delete a specific Session Global report (without affecting the current `-0`):

```bismapper
@sgget,'my_report2',D .
```

Delete all Session Global reports:

```bismapper
@sgget,,DA .
```

---

## See Also

- [`@SGPUT`](SGPUT.md) — Session Global Report Put
- [`@LSM`](LSM.md) — Load System Message
