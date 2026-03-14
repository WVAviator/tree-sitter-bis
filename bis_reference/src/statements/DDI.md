# @DDI — Data Definition Information

## Overview

Retrieves a table description from a relational database and places the information in a result.

> Before using `@DDI`, you must first establish a database connection using [`@LGN`](LGN.md) (Log On to Relational Database).

---

## Syntax

```
@DDI[,c,d,lab,edsp?,d/p,db] 'id col tbl' [vstat,vcol,vqty] .
```

> If cabinet and drawer are not specified, replace the field with one comma on OS 2200, or two commas on Windows Server, Windows Client, Linux, or UNIX systems.

> *(2200 only)* The specified drawer must be a full character set (FCS) drawer.

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `c,d` | Optional | Cabinet and drawer to hold the result. |
| `lab` | Optional | Label to branch to if an error occurs. If omitted and an error occurs: if `edsp?=Y`, an error result is built and the run continues; if `edsp?=N`, no error result is built and the run continues. |
| `edsp?` | Optional | Create a result on interface or database error? `Y` or `N`. The result contains the last syntax sent to the database manager and the system error message text, identifying the table and column where the error occurred (if applicable). If a label is supplied, the run continues at the label and error information resides in the `-0` result. |
| `d/p` | Optional | `d` = exclude period lines containing field abbreviation descriptions; `p` = include them. Default = `p`. |
| `db` | Optional | Database name. Default = system default database *(Windows/Linux/UNIX)*; database running with `MRIMID=1` *(2200 — see your administrator)*. |
| `id` | Required | Unique identifier for the cursor name. |
| `col` | Required | Column(s) to include in the result. Separate multiple column names with commas. Use `*` to select all columns. If an arithmetic operation is specified, the result contains the operation and sets the column status (`ST`) to `2`. |
| `tbl` | Required | Name of the table(s) or view(s) to describe. Separate multiple names with commas. |
| `vstat` | Optional | Variable to capture the status of the action performed. Must be type `A`, 7 characters (e.g., `v1a7`). |
| `vcol` | Optional | Variable to capture the character position within the generated syntax where an error was detected. Must be type `I`, 5 characters (e.g., `v1i5`). |
| `vqty` | Optional | Variable to capture the total number of columns detected in the selected tables. |

---

## Result Structure

The result contains one row per column with the following fields:

| Field | Description |
|-------|-------------|
| `COLUMN NAME` | Column name. |
| `TYPE` | Data type stored in the column. |
| `SIZE` | Field length. |
| `DECPT` | Number of positions to the right of the decimal point (fixed-point numbers). |
| `NF` | Null value indicator: `0` = nulls not allowed; `1` = nulls allowed. |
| `ST` | Field status: `0` = not a primary key; `1` = part of the primary key; `2` = arithmetic result. |

---

## Reserved Words

| Reserved Word | Description |
|---------------|-------------|
| `STAT1$` | Number of columns retrieved. Valid even if an interface error occurs. |
| `STAT2$` | Total number of data lines written below the heading lines in the result, or `0` if an error occurred. |
| `STAT3$` | Line number of the first line following the heading divider in the result; or, if an error occurred and a label was supplied, a system message number (use [`@LSM`](LSM.md) to retrieve the message text). Contains `0` if no label was supplied. |

---

## Example

Generates a description of the `Houses` and `Customers` tables in the `agency` database. On error, branches to label `99` and places the error result in cabinet `0`, drawer `A`.

```
@ddi,0,a,099,y,p,agency 'a * houses,customers' .
```

| Component | Meaning |
|-----------|---------|
| `0,a` | Cabinet 0, drawer A for the result |
| `099` | Branch to label 99 on error |
| `y` | Build error result if an error occurs |
| `p` | Include period lines with field descriptions |
| `agency` | Database name |
| `a` | Cursor name |
| `*` | All columns |
| `houses,customers` | Tables to describe |
