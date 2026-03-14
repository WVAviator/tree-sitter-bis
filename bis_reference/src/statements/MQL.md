# @MQL — MAPPER Query Language

## Overview

Issues SQL statements against a database. The statement produces a `-0` result containing the retrieved, updated, inserted, or deleted records as specified by the SQL statement, or an error result. When multiple SQL statements are issued, a separator line appears in the result showing the outcome of each statement.

> **Note:** If cabinet and drawer are not specified, replace the field with one comma on OS 2200 and two commas on Windows Server, Windows Client, Linux, or UNIX systems.

---

## Syntax

```
@MQL[,c,d,lab,o,skip,q,ib,ltyp,dspfmt,sbf,dtchar,wrap,info,vert,adj,nchar] \
    'syntax'[,sc,sd,sr,sqln,sq] \
    [vstat,vcol,vrpt,vsel,vsq,vinsrt,viq,vdel,vdq,vupd,vuq,vcre,vcq,vdrop,vdrq,valt,valq] .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `c,d` | Optional | Cabinet and drawer for the result. Must specify a full character set (FCS) drawer. Default: `0,a`. |
| `lab` | Optional | Label to branch to if the statement detects an error or a MAPPER interface error. On an MQL error, the `STATUS` field in the error result contains a positive MQL system message number. On an interface error, it contains the negative MAPPER system message number. |
| `o` | Optional | Case-sensitivity option for updates, inserts, or character compares. Default: no option (all compares, inserts, and updates on character data are case-sensitive per ANSI SQL standard). See [Case Options](#case-options-o). |
| `skip` | Optional | Number of rows to skip before retrieving data. Default: retrieve all data starting from row 1. Use only with `SELECT` statements. Applies to all `SELECT` statements encountered. |
| `q` | Optional | Number of records to return. Use only with `SELECT` statements. `0` = all records; `> 0` = stop at that quantity or end of data; `< 0` = return only column headings and data type line (no records selected). |
| `ib` | Optional | Blank column option. Type `y` to include columns with blank column names in the result. Default: ignore blank-named columns. Use only with `SELECT` statements. |
| `ltyp` | Optional | Line type option. Type `y` to insert a data type line after headings in the result. Also includes non-data lines from the database if the `SELECT` references a single table (no JOINs) and `COUNT` is not invoked. Use only with `SELECT` statements. |
| `dspfmt` | Optional | Format for display. Affects `SELECT` and `CREATE TABLE` results. See [Display Format Options](#display-format-options-dspfmt). |
| `sbf` | Optional | Size of blank fields between columns of selected data. If the resulting line would exceed the drawer width, the field size is reduced down to `0`. Use only with `SELECT` statements. |
| `dtchar` | Optional | Data typing line type character. Default: `*`. If `N`, no data type determination occurs (all columns treated as character type). Do not use A–Z, 0–9, space, tab, or period. |
| `wrap` | Optional | Controls wrapping of columns and data lines that exceed the line length. Default: `N`. Use only with `SELECT` statements. See [Wrap Options](#wrap-options-wrap). |
| `info` | Optional | Specifies additional table information for the result. Default: `N`. See [Info Options](#info-options-info). |
| `vert` | Optional | Specifies vertical display of the result. Use only with `SELECT` statements. See [Vertical Display Options](#vertical-display-options-vert). |
| `adj` | Optional | Width adjustment for decimal fields. See [Adjustment Options](#adjustment-options-adj). |
| `nchar` | Optional | Non-alphanumeric character to fill null character fields in `SELECT` results. Default: no fill character. Alphanumeric values are ignored. |
| `'syntax'` | Optional | SQL statement to issue against the database. Terminate with a semicolon (`;`). Omit if using `sc,sd,sr`. |
| `sc,sd,sr` | Optional | Cabinet, drawer, and report containing one or more SQL statements (each terminated with `;`). If specified, the `'syntax'` field is ignored. SQL statements can be passed in a result. |
| `sqln` | Optional | SQL statement number indicating which statement to execute. Meaningful only when SQL statements are in a report. Default: `1`. |
| `sq` | Optional | Number of SQL statements to execute. Meaningful only when SQL statements are in a report. Default: `0` (values less than `1` = execute all statements). |

### Output Variables

| Variable | Description |
|----------|-------------|
| `vstat` | Captures the status of the action. Non-zero indicates an error. |
| `vcol` | Captures the column number (defined in the syntax) where an error was detected. |
| `vrpt` | Captures the last report number added by a `CREATE TABLE` statement. |
| `vsel` | Captures the total number of `SELECT` statements executed. |
| `vsq` | Captures the total number of data records selected. |
| `vinsrt` | Captures the total number of tables inserted into. |
| `viq` | Captures the total number of records inserted. |
| `vdel` | Captures the total number of tables deleted from. |
| `vdq` | Captures the total number of records deleted. |
| `vupd` | Captures the total number of tables updated. |
| `vuq` | Captures the total number of records updated. |
| `vcre` | Captures the total number of `CREATE TABLE` statements executed. |
| `vcq` | Captures the total number of records created. |
| `vdrop` | Captures the total number of `DROP TABLE` statements executed. |
| `vdrq` | Captures the total number of records deleted by `DROP TABLE`. |
| `valt` | Captures the total number of tables altered. |
| `valq` | Captures the total number of records altered. |

---

## Options

### Case Options (`o`)

| Option | Description |
|--------|-------------|
| `C` | Internally converts all character data to uppercase when performing character compares. |
| `D` | Converts all character strings to uppercase before inserting or updating. |
| `B` | Same as `C` and `D` combined. |
| `L` | Uses the exact case of field names when creating a table or getting a table description. Default: field names converted to uppercase. |
| `S` | Same as `L`, plus places a space where heading lines split. For example, `*ST.\n*CD.\n*==.` becomes `ST CD`. |
| `Z` | Generates `CREATE TABLE` syntax from a supplied DDI-style syntax report. Converts only valid DDI information lines. If none are found, creates a result with only a header and heading divider. Ignored if no input report is supplied. |

### Display Format Options (`dspfmt`)

| Option | Description |
|--------|-------------|
| `B` | Add five blank lines to the created table. |
| `C` | Produce `CREATE TABLE` syntax from a description. |
| `D` | Display column names, types, and sizes. |
| `F` | Same as `P`, plus detailed cabinet, drawer, and report for all tables. |
| `H` | Produce only table headers. Inserts five blank tab lines after the heading divider (horizontal headers only) and space for one vertical header. |
| `L` | Left-justify numeric fields. |
| `P` | Same as `D`, plus trailing information lines. |
| `R` | Right-justify numeric fields. |

### Wrap Options (`wrap`)

| Option | Description |
|--------|-------------|
| `A` | If the record length exceeds the line length, truncates the report heading and places the remainder on trailer lines. |
| `B` | If a column does not fit on the report line, places the column and the remainder of the record on trailer lines. |
| `Y` or `W` | Displays data on multiple lines. |
| `T` | Truncates data to the line length. |
| `N` | Displays a system message. |

### Info Options (`info`)

| Option | Description |
|--------|-------------|
| `T` | Assigns a sequence number to each table in the result and qualifies each column with its sequence number. |
| `I` | Identifies data types and result type columns. |
| `B` | Produces information specified by both `T` and `I`. |
| `N` | No additional information. |

### Vertical Display Options (`vert`)

| Option | Description |
|--------|-------------|
| `C` | Left-justify column name before the data item. |
| `R` | Right-justify column name before the data item. |
| `Y` | Omit column names and display only the data record. |
| `N` | Create a horizontal result with all columns side by side. |

### Adjustment Options (`adj`)

| Option | Description |
|--------|-------------|
| `I` | Adjust the width of decimal fields containing integer values only. |
| `F` | Adjust the width of decimal fields containing a fractional part. |
| `B` | Adjust the width of all decimal fields. |
| `N` | Make no adjustment to decimal field widths. |

---

## Reserved Words

| Variable | Description |
|----------|-------------|
| `STAT1$` | Status (positive or negative). |
| `STAT2$` | Line number of the first data line found by the first `SELECT` statement. For JOIN operations, represents the first data line in the first report. |
| `STAT3$` | If an error occurs, contains the system message number. |

---

## Functionality

The following SQL operations are supported:

| Operation | Platform | Notes |
|-----------|----------|-------|
| `SELECT` | All | 1–5 tables. See note on JOIN limits below. |
| `INSERT` | All | |
| `DELETE` | All | |
| `UPDATE` | All | |
| `CREATE` | All | |
| `DROP` | All | |
| `ALTER` | All | |
| `ROLLBACK` | All | |
| `COMMIT` | All | |
| Aggregate functions (`AVG`, `MAX`, `MIN`, `SUM`, `COUNT`) | Windows / Linux / UNIX only | |

**JOIN limits (Windows / Linux / UNIX):**
- Classic comma-separated joins: 1–5 tables (1–2 tables for left outer, right outer, and full outer joins).
- ANSI SQL inner and cross joins: 1–5 tables (1–3 tables for left outer, right outer, and full outer joins).

> *(Windows / Linux / UNIX)* The maximum number of operands and/or operators in an arithmetic expression or `WHERE` clause cannot exceed 384.

---

## SQL Terminology

| SQL Term | BIS Equivalent |
|----------|---------------|
| Column | Field |
| Table | Report |
| Row | Tab line (special lines are treated as comments) |

---

## Referencing Tables

Because MQL tables are reports, the following formats are used:

| Reference | Description |
|-----------|-------------|
| `32B` | Report 32B in current cabinet |
| `32B110` | Report 32B in cabinet 110 |
| `"22e"` | Report 22E in current cabinet (quotes required — `22e` is normally a numeric entity) |
| `ABC` | Searches system directory for report ABC |
| `"USER"` | Searches system directory for report USER (quotes required — `USER` is an SQL reserved word) |
| `$R2` | Renamed report `-2` |
| `$R-4` | Renamed report `-4` |
| `"-1"` | Renamed report `-1` (quotes required) |

---

## Referencing Columns

Columns can be referenced as:
- Full column name (same as SQL).
- Partial column name (enough to uniquely identify the column).
- A column selection method (`$Cxx`) where `xx` is the logical field number (1 to n, left to right).

If a column name is an SQL reserved word (e.g. `Description`), enclose it in double quotes (`"`).

---

## Data Types

The `@MQL` statement treats all data as one of three types:

- **Null** — a field that is entirely blank.
- **Numeric** — may contain fractional parts or scientific notation.
- **Character** — any data that is not null or numeric. Enclose in apostrophes (`'`). To include an apostrophe in a character value, use two successive apostrophes (e.g. `'cat''s'`).

The statement looks for a data type line following the headings and preceding the data lines. If found, it uses that line to determine column types. If not, it examines each line of the report. For a column to be null, all lines must have blanks in that position. For a column to be numeric, all lines must contain valid numeric values. Otherwise, the column is character type.

---

## Working with Large Data Sets

When a result will exceed 200 lines, use the `q` subfield to specify the number of records. This pre-allocates sufficient space and avoids repeated internal copying.

Without `q`, the statement allocates space for ~200 lines, fills it, then reallocates in increments of 4,000 lines, copying all data each time until complete. Specifying `q` causes the space to be allocated once and data to be written only once.

---

## SQL Statement Reference

### SELECT

**Format 1:**
```sql
SELECT select-list FROM table-name-list
  [WHERE Boolean-expression]
  [ORDER BY order-by-list];
```

**Format 2 (Windows / Linux / UNIX — ANSI JOIN syntax):**
```sql
SELECT select-list FROM table-name1
  join-type table-name2 [ON Boolean-expression]
  [join-type table-name3 [ON Boolean-expression]] ...
  [WHERE Boolean-expression]
  [ORDER BY order-by-list];
```

| Field | Description |
|-------|-------------|
| `select-list` | Columns to select. Format: `column`, `table.column`, or `alias.column`. Can contain column names, computed columns, literals, `*` (all columns), or aggregate functions: `COUNT(*)`, `AVG(col)`, `MAX(col)`, `MIN(col)`, `SUM(col)`. `MAX` and `MIN` on character fields use ASCII character-by-character comparison. *(Aggregate functions: Windows / Linux / UNIX only)* |
| `table-name-list` | One to five tables (reports), optionally aliased: `table-name [alias]`. When multiple tables are specified, the number of rows is the cross product of all rows in all tables. |
| `join-type` | *(Windows / Linux / UNIX)* ANSI SQL join type: `INNER JOIN`, `CROSS JOIN`, `LEFT OUTER JOIN`, `RIGHT OUTER JOIN`, or `FULL OUTER JOIN`. Each `ON` clause may only reference columns from tables referenced so far. `CROSS JOIN` cannot have an `ON` clause. |
| `Boolean-expression` | Row selection criteria. See [Boolean Expressions](#boolean-expressions). If omitted, all rows are selected. |
| `order-by-list` | 1–5 sort specifications: `column-name [direction]` or `selected-column-number [direction]`. Direction: `ASC` (default) or `DESC`. |

### INSERT INTO

```sql
INSERT INTO table-name [(column-name-list)] VALUES (value-list);
```

| Field | Description |
|-------|-------------|
| `table-name` | Report to insert into. |
| `column-name-list` | Optional list of column names. Omit if `value-list` order matches column order in the table. |
| `value-list` | Comma-separated numeric literals, string literals, or `NULL`. Order must match column order. Columns without a corresponding value receive `NULL`. |

### DELETE FROM

```sql
DELETE FROM table-name [WHERE Boolean-expression];
```

If the `WHERE` clause is omitted, all rows in the table are deleted.

### UPDATE

```sql
UPDATE table-name SET change-specification [WHERE Boolean-expression];
```

`change-specification` is one or more `column-name=value` pairs, separated by commas. If omitted, the `WHERE` clause updates all rows.

### CREATE TABLE

```sql
-- Format 1
CREATE TABLE table-name (col-spec [,col-spec,...]) ['title'];

-- Format 2
CREATE TABLE table-name AS select-statement ['title'];

-- Format 3
CREATE TABLE table-name IN did (col-spec [,col-spec,...]) ['title'];

-- Format 4
CREATE TABLE table-name IN did AS select-statement ['title'];
```

`col-spec` format: `column-name type(size[.decimal-point])`

Valid types: `CHAR`, `CHARACTER`, `NUMERIC`, `NULL`. Data types are enforced only through the MQL statement.

For Formats 3 and 4, `did` references a drawer-cabinet from which to extract location. If `table-name` is `RESULT`, the statement creates a result rather than a permanent report.

`title` is an optional table title of 1–43 characters.

### DROP TABLE

```sql
DROP TABLE table-name;
```

### ALTER TABLE

```sql
ALTER TABLE table-name edit-spec[,edit-spec,...];
```

Valid `edit-spec` operations:

| Operation | Syntax |
|-----------|--------|
| Change column type/size | `CHANGE [COLUMN] col-name [TO] type(size[.decimal])` |
| Modify column | `MODIFY [COLUMN] col-name [TO] type(size[.decimal])` |
| Add column | `ADD [COLUMN] col-name type(size[.decimal])` |
| Add column after another | `ADD [COLUMN] col-name type(size[.decimal]) AFTER [COLUMN] col-name` |
| Add column before another | `ADD [COLUMN] col-name type(size[.decimal]) BEFORE [COLUMN] col-name` |
| Drop column | `DROP [COLUMN] col-name` |
| Left-justify column | `LEFT JUSTIFY [COLUMN] col-name` or `LJ [COLUMN] col-name` |
| Right-justify column | `RIGHT JUSTIFY [COLUMN] col-name` or `RJ [COLUMN] col-name` |
| Move column after another | `MOVE [COLUMN] col-name AFTER [COLUMN] col-name` |
| Move column before another | `MOVE [COLUMN] col-name BEFORE [COLUMN] col-name` |

### ROLLBACK / COMMIT

```sql
ROLLBACK [WORK];
COMMIT [WORK];
```

The `WORK` keyword is included for SQL standard compliance.

---

## Boolean Expressions

Boolean expressions select rows for which the expression is true. Valid comparison operators: `=`, `<`, `>`, `<=`, `>=`, `<>`, `IS NULL`, `IS NOT NULL`, `LIKE`. Valid Boolean operators: `NOT`, `AND`, `OR`, `BETWEEN...AND...`.

Each comparison operator requires an expression on each side, except `IS [NOT] NULL` which takes a single expression on the left. If an operand is null, the result is null. Use `IS [NOT] NULL` to test for null values.

Examples:
```sql
a <= b
x BETWEEN y AND z
a <= b AND c = d
a = b OR NOT (c BETWEEN d AND e)
```

---

## Examples

### Joining Two Reports

Join report `2B0` (product orders) with report `1C0` (sales commission) and sort the result. SQL syntax is placed in result `-1` and passed to `@MQL`:

```
@brk .
*========================
SELECT stcd, statusdate, byin, t1.producttype, serialnumber,
       salescommiss, ordernumbr, custcode, producplan, producactual
FROM 2b0 t1, 1c0 t2
WHERE t1.producttype = t2.producttype
ORDER BY stcd, producttype;
@brk rnm -1 .
@mql,0,a '',-1 dsp,-0 .
```

---

### Creating a Report

Create a typed report in drawer `A` with specified column definitions and an optional title. `v3` captures the new report number:

```
@brk .
*========================
CREATE TABLE yourtable in a (
  "ProductType"   CHARACTER(9),
  "Subkey"        CHARACTER(5),
  "ProducCost"    NUMERIC(6),
  "Wholesale"     NUMERIC(7),
  "Retail"        NUMERIC(8),
  "SalesCommiss"  NUMERIC(7.2),
  "SpaceReq"      NUMERIC(5),
  "DemoQuantity"  NUMERIC(8),
  "DemoResults"   NULL(15)
) 'Optional 1-43 Character Title';
@brk rnm -1 .
@mql,0,a,99,,,,,,b '',-1 v1a4,v2i5,v3i5 .
@dsp,0,a,v3 .
@99:dsp,-0 .
```

The `b` option in `dspfmt` adds five blank tab lines to the created table. On error, the run branches to label `99` and displays the error result.

---

### Using Aggregate Functions

*(Windows / Linux / UNIX)* Execute aggregate functions on the `EMP` report:

```
@brk .
*=================
SELECT MAX(sal), MIN(sal), AVG(sal), SUM(sal), MAX(DEPTNO), MAX(ENAME), MIN(ENAME)
FROM EMP;
@brk rnm -1 .
@mql,0,i,100,,,,,,N '',-1 dsp,-0 .
@100:
@dsp,-0 .
```

---

### Using ANSI SQL JOIN Syntax

*(Windows / Linux / UNIX)* Right-join `EMP` and `DEPT` tables. Records in `DEPT` with no match in `EMP` are returned with a null-extended row:

```
@brk .
*=================
SELECT * FROM emp RIGHT OUTER JOIN dept ON emp.DEPTNO = dept.DEPTNO;
@brk rnm -1 .
@mql,0,i,100,,,,,,R '',-1 dsp,-0 .
@100:
@dsp,-0 .
```

The `RIGHT OUTER JOIN` requires all records from the right table (`DEPT`) to be returned. Records without a matching `EMP` entry are included with null-extended values (e.g. the `DEPTNO=40 / OPERATIONS / BOSTON` row).
