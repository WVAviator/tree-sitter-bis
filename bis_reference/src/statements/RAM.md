# @RAM (Relational Aggregate Modify)

## Overview

Creates tables, inserts rows, or updates a table with data stored in a report. The statement modifies the database depending on the option specified. Before using `@RAM`, you must first establish communication with a database using the [`@LGN`](LGN.md) (Log On to Relational Database) statement.

### Interface Support

| Operation | ODBC | OLEDB |
|-----------|------|-------|
| UPDATE, INSERT, DELETE | Supported | Supported |
| CREATE | Not supported — use [`@SQL`](SQL.md) instead | Not supported — use [`@SQL`](SQL.md) instead |

> **Note:** *(OS 2200)* If a cabinet and drawer are not specified, replace the field with one comma. On Windows Server, Windows Client, Linux, or UNIX systems, use two commas.

> **Note:** *(2200 only)* You must specify a full character set (FCS) drawer.

---

## Syntax

```
@RAM[,c,d,r,lab,o,adj,dup/col,iqty,cqty,edsp?,cstat,istat,nchar,db] 'table[,options]'
    [vstat,vcol,vins,vcom,vnbq,vdpk] .
```

### Parameters

| Field | Description |
|-------|-------------|
| `c,d,r` | Report used to create a table or to insert, delete, or update rows. |
| `lab` | Label to go to if the status in `vstat` is other than normal completion and does not equal the value of `cstat` or `istat`. |
| `o` | Options subfield. Default = `I`. See [Options — `o` Subfield](#options----o-subfield). |
| `adj` | Options for adjusting decimal field width. Applicable only when `o` = `B` or `C`. Default = `N`. See [Options — `adj` Subfield](#options----adj-subfield). The `adj` field is ignored for columns defined using `UDyy.xx` or `UDxx` formats when creating a table. |
| `dup/col` | Manages duplicate primary key columns or invalid characters in column names derived from report headers. Default = `N`. See [Options — `dup/col` Subfield](#options----dupcol-subfield). |
| `iqty` | Number of rows to delete, update, or insert. Default = all rows (when deleting/updating) or all data lines (when inserting). Meaningful only when `o` = `B`, `I`, `F`, `R`, `S`, `U`, or `M`. |
| `cqty` | Controls the frequency of data commits. See [Commit Behavior](#commit-behavior). |
| `edsp?` | Create a result if an error occurs? `Y` or `N`. The result contains the last syntax sent to the database manager, the system message text, and the status code and column where the error occurred (if applicable). If a label is supplied, the run continues at the label and error information resides in the `-0` result. |
| `cstat` | Alternate valid status if `o` = `D`, `E`, `R`, `S`, `U`, `M`, `I`, `F`, or `B` (create table); otherwise ignored. |
| `istat` | Alternate valid status if `o` = `D`, `E`, `R`, `S`, `U`, `M`, `I`, `F`, or `B` (insert table); otherwise ignored. Overrides `dup/col` = `N` or blank. |
| `nchar` | Controls treatment of null values. Use a special (non-alphanumeric) value to treat fields filled with that value as null. `C` = treat blank/nonexistent character fields as null. `D` = treat blank/nonexistent decimal fields as null. `B` = treat both as null. |
| `db` | Database name. |
| `table` | Name of the relational table. |
| `options` | Optional information for creating, deleting, or updating the table. See [Options — `options` Subfield](#options----options-subfield). |
| `vstat` | Variable to capture the status of the action performed. Define as type `A`, 7 characters (e.g., `v1a7`). |
| `vcol` | Variable to capture the character position within the generated syntax where an error was detected. Define as type `I`, 5 characters (e.g., `v2i5`). |
| `vins` | Variable to capture the actual number of rows inserted (`o` = `B`, `I`, or `F`), deleted (`o` = `D`, `E`, `R`, or `S`), or updated (`o` = `U` or `M`). May differ from the number of rows committed depending on `cqty` and `vcom`. |
| `vcom` | Variable to capture the actual number of COMMIT commands issued to the database. Valid for all options. |
| `vnbq` | Variable to capture the actual number of nonblank columns inserted. If `o` = `R` or `S`, contains the number of primary key columns used for deletion. If `o` = `U` or `M`, contains the number of columns updated. |
| `vdpk` | Variable to capture duplicate/unmatched key information when `dup/col` = `Y`, `D`, `R`, or `B`. If `o` = `B`, `I`, or `F`, contains the number of duplicate primary keys. If `o` = `R` or `S`, contains the number of rows not deleted. If `o` = `U` or `M`, contains the number of rows not updated. |

---

## Commit Behavior

The `cqty` field controls when COMMIT commands are issued:

| `cqty` Value | Behavior |
|--------------|----------|
| `< 0` | COMMIT is never issued. |
| `= 0` | COMMIT is issued after successful completion of the operation. |
| `> 0` with `o` = `C` or `B` | COMMIT is issued after creating the table, before inserting any rows. |
| `> 0` with `o` = `E` or `D` | COMMIT is issued after dropping the table or deleting rows. |
| `> 0` with `o` = `B`, `I`, `F`, `R`, `S`, `U`, or `M` | COMMIT is issued after each `cqty` rows are processed; a final COMMIT is issued after the operation completes. |

> **Caution:** When `cqty > 0`, an error may occur after some changes are committed but before all changes are made. Additionally, some database managers automatically issue a COMMIT after certain operations (e.g., creating a table), so `cqty < 0` may not apply in all cases.

---

## Options — `o` Subfield

| Option | Description |
|--------|-------------|
| `B` | Creates a table from report headings and information lines, then inserts all data lines as rows. *(2200)* Requires FCS report. For ODBC databases, may work but is not supported for some column types. |
| `C` | Creates a table from report headings and information lines only; does not insert data. *(2200)* Requires FCS report. For ODBC databases, may work but is not supported for some column types. |
| `D` | Drops the table from the database. |
| `E` | Deletes rows in the table. A Where clause may be specified in the `options` subfield. Default = deletes all rows. |
| `I` | Inserts all data lines from the report as rows. Column sequence in the report must match the table definition. *(2200)* Requires FCS report. |
| `F` | Inserts all data lines from the report as rows. The report must be sorted so that all primary key columns are listed first. *(2200)* Requires FCS report. |
| `R` | Deletes rows where the primary key or unique index matches the primary key in the report. The report must contain all primary key columns, and column sequence must match the table definition. *(2200)* Requires FCS report. |
| `S` | Deletes rows where the primary key or unique index matches the primary key in the report. The report must be sorted so that primary key columns are listed first. *(2200)* Requires FCS report. |
| `T` | Deletes rows by comparing all report fields to table values and deleting rows where a match is found. Use when the table has no primary key or unique index. **Caution:** Use carefully if your table does not fit in the report — rows may be deleted unexpectedly. |
| `U` | Updates non-primary key columns for rows matching primary key columns in the report. Requires a primary key or unique index on the table. Column sequence must match the table, or use the optional column clause. *(2200)* Requires FCS report. |
| `M` | Updates non-primary key columns for rows matching primary key columns in the report. The report must be sorted so that primary key columns are listed first. *(2200)* Requires FCS report. |
| `J` | Issues only a COMMIT command to the database manager (ignores `cqty`). A value must be entered in the `table` subfield, even if it is only a space enclosed in apostrophes. |

---

## Options — `adj` Subfield

| Option | Description |
|--------|-------------|
| `B` | Increases the width of any decimal field. |
| `F` | Increases the width of decimal fields that contain a fractional portion. |
| `I` | Increases the width of decimal fields that contain integer values (no fractional portion). |
| `N` | Makes no adjustment to decimal field width (default). |

---

## Options — `dup/col` Subfield

| `o` subfield | `dup/col` value | Result |
|--------------|-----------------|--------|
| `B`, `I`, or `F` | `Y`, `B`, `D`, or `R` | `-0` result containing duplicate primary keys. |
| `B`, `I`, or `F` | `N` or blank | System message if there are duplicate primary keys and the message does not equal `cstat` or `istat`. |
| `B` or `C` | `C` | Ignores invalid characters in column names. |
| `B` | `B` | Ignores invalid characters in column names and creates a `-0` result containing duplicate primary keys. |
| `U`, `M`, `R`, or `S` | `Y`, `D`, or `R` | `-0` result containing primary keys not found. |
| `U`, `M`, `R`, or `S` | `N` or blank | Ignores primary keys not found. |

---

## Options — `options` Subfield

| Option | Description |
|--------|-------------|
| Storage area | Name of the storage area or table space for the table. Applicable when `o` = `B` or `C`; not required for certain database managers. |
| Additional create clauses | Syntax for table creation (ignored if `o` ≠ `B` or `C`). Separate from the storage area subfield with a comma. |
| Where clause | Clause identifying rows for deletion (applicable when `o` = `E`). If the Where clause requires apostrophes to reference character data, use a variable assigned to `TIC$`. |
| `col,col,...` | Optional column names for updating rows. Use only when `o` = `U` or `M`. If `o` = `U`, list all columns to be updated and primary key columns in report order. If `o` = `M`, list primary key columns first, then all columns to be updated. Columns at the end of the clause not included in the report are filled with blanks, zeros, or null values as determined by `nchar`. |

---

## Reserved Words

| Word | Description |
|------|-------------|
| `STAT1$` | Number of rows inserted (`o` = `B`, `I`, or `F`), deleted (`o` = `D`, `E`, `R`, or `S`), or updated (`o` = `U` or `M`). |
| `STAT2$` | Actual number of COMMIT commands issued. Valid for all options, even if an error occurs. |
| `STAT3$` | Status of the last syntax sent to the database manager if no error occurs; `0` if an error occurs; or a system message number if an interface error occurred and a label was supplied. Use [`@LSM`](LSM.md) to retrieve the message text. |

---

## Guidelines

- Column names in the new table are derived from the headings on the asterisk lines of the report. Column sequence matches the heading sequence on the asterisk lines.
- If `o` = `B` or `C`, the report must contain one or more asterisk lines preceding the heading divider line.
- For RDMS databases, if a table is created without information lines, the primary key (PK) consists of the first 16 fields in the report.
- For RDMS databases, the report must also contain additional information for creating the table, including data types, primary key indicators, and null indicators.

### Table Structure for `B` and `C` Options

The following lines in a report are used by `@RAM` to create tables:

```
* Asterisk lines (column headers)
* Second asterisk line (continued headers)
*== Heading divider
*   Info line 1: data types and sizes
*   Info line 2: primary key indicators (P/A/D)
*   Info line 3: null indicators (N)
    Data lines
```

**Information line 1** — Assign data type and size for each column. Default = character type if omitted. Column size can be derived from the heading divider line width if not specified explicitly. Place `X` in a column (or omit the column name) to omit it from the table.

**Information line 2** — Identify primary keys. Valid values: `P` or `A` (primary key, ascending), `D` (primary key, descending).

**Information line 3** — Identify columns allowing null values. Type `N` in the first position of the column. If omitted, nulls are not permitted.

> **Note:** You may omit all information lines or have blank information lines. You cannot have lines 2 and 3 without line 1, or lines 1 and 3 without line 2.

---

## Examples

### `C` option — Create an empty table

Creates table `houses` in database `agency` from the headings and information lines in report `599A`:

```
@RAM,0,a,599,,c,,,,,y,,,,agency 'houses,storage.area' <error>a5 .
```

| Field | Value | Description |
|-------|-------|-------------|
| `c,d,r` | `0,a,599` | Use report `599A`. |
| `o` | `c` | Create a table. |
| `edsp?` | `y` | Create an error report if necessary. |
| `db` | `agency` | Database name. |
| `table` | `houses` | Table name. |
| `options` | `storage.area` | Schema and storage area (required for RDMS). |
| `vstat` | `<error>a5` | Capture status. |

### `D` option — Drop a table

```
@RAM,,,,199,d,,,,,y,,,,<db> 'RAM_TEST' <error>a5 .
```

### `C` option — Create table from report headers only

Creates `RAM_TEST` with column names from report `2B0`. No data lines are inserted:

```
@RAM,0,b,2,199,c,,,,,y,,,,<db> 'RAM_TEST' <error>a5 .
```

### `B` option — Create table and insert data

Creates `RAM_TEST` and inserts all data lines from report `2B0`. The `OrderNumbr` column is the primary key:

```
@RAM,0,b,2,199,b,,,,,y,,,,<db> 'RAM_TEST' <error>a5 .
```

### `E` option — Delete rows by condition

Deletes all rows in `RAM_TEST` where `ProductType` = `BLACKBOX1`:

```
@RAM,,,,199,E,,,,,y,,,,<db> 'RAM_TEST',producttype=<tic>BLACKBOX1<tic> <error>a5 .
```

### `R` option — Delete rows by primary key (column-order match)

Deletes the row in `RAM_TEST` matching the primary key in report `79I0`. Column sequence must match the table definition:

```
@RAM,0,i,79,199,R,,,,,y,,,,<db> 'RAM_TEST' <error>a5 .
```

### `S` option — Delete rows by primary key (sorted, primary key first)

Deletes the row in `RAM_TEST` matching the primary key in report `78I0`. Primary key column is listed first in the report:

```
@RAM,0,i,78,199,S,,,,,y,,,,<db> 'RAM_TEST' <error>a5 .
```

### `T` option — Delete rows by full-row match

Deletes rows in `RAM_TEST` matching all fields in report `77I0`. Use when no primary key is defined:

```
@RAM,0,i,77,199,T,,,,,y,,,,<db> 'RAM_TEST' <error>a5 .
```

### `F` option — Insert rows (primary key first)

Inserts rows from report `80I0` into `RAM_TEST`. Primary key column (`OrderNumbr`) is listed first in the report:

```
@RAM,0,i,80,199,f,,,,,y,,,,<db> 'RAM_TEST' <error>a5 .
```

### `I` option — Insert rows (column-order match)

Inserts rows from report `46I0` into `RAM_TEST`. Column order in the report must match the table definition:

```
@RAM,0,i,46,199,i,,,,,y,,,,<db> 'RAM_TEST' <error>a5 .
```

### `U` option — Update rows by primary key (column-order match)

Updates the `SpcCod` field in `RAM_TEST` for rows matching the primary key in report `76I0`. Rows with unmatched primary keys (e.g., `OrderNumbr = 99999`) are not updated:

```
@RAM,0,i,76,199,u,,,,,y,,,,<db> 'RAM_TEST' <error>a5 .
```

### `M` option — Update rows by primary key (sorted, primary key first)

Updates the `SpcCod` field in `RAM_TEST` for rows matching the primary key in report `75I0`. Primary key column is listed first in the report. Rows with unmatched primary keys are not updated:

```
@RAM,0,i,75,199,m,,,,,y,,,,<db> 'RAM_TEST' <error>a5 .
```
