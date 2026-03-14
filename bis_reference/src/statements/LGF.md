# @LGF — Log Off Relational Database

## Overview

Ends a session on a relational database. The [`@LGN`](LGN.md) (Log On to Relational Database) statement must have been issued previously to initiate communication with the database.

---

## Syntax

```
@LGF[,lab,rb?,db] .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `lab` | Optional | Label to branch to if an error occurs. If specified and a log off is attempted before logging on, the run branches to the label and builds an error report in the current output area. If omitted, the error is silently ignored. |
| `rb?` | Optional | Issue a `ROLLBACK` command? `Y` or `N`. If `Y`, decommits all changes made during the session or since the last recovery point. May not be available for all databases. |
| `db` | Optional | *(Windows / Linux / UNIX)* Database name. Default: the default database name on your system. |
| `db` | Optional | *(2200 only)* Database name. Default: the database running with `MRIMID` set to `1`. See your administrator for more information. |

---

## Reserved Words

| Variable | Description |
|----------|-------------|
| `STAT1$` | Status of the last syntax submitted to the database manager. Contains a status value when `STAT3$` equals zero. |
| `STAT2$` | Always `0`. |
| `STAT3$` | If non-zero, contains a system message number. Use the [`@LSM`](LSM.md) (Load System Message) statement to retrieve the text of the message. |
