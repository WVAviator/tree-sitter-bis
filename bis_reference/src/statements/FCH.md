# @FCH — Relational Aggregate Fetch

## Overview

Retrieves columns and rows from a relational table and places them in a result.

Before using `@FCH`, you must first establish communication with a database using the [`@LGN`](LGN.md) (Log On to Relational Database) statement.

> *(2200 only)* You must specify a full character set (FCS) drawer.

---

## Syntax

```
@FCH[,c,d,lab,o,adj,skip,q,edsp?,wrap,info,vert,sort,nchar,dst,sp,db,fs]
    'id col tbl [Where clause]'[,c,d,r,sel] [vstat,vcol,vqty] .
```

> **Note:** If a cabinet and drawer are not specified, replace the field with one comma on OS 2200 systems and two commas on Windows Server, Windows Client, Linux, or UNIX systems.

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `c,d` | Optional | Cabinet and drawer to hold the result. Default = `0,A`. |
| `lab` | Optional | Label to branch to if the relational database returns a status other than normal completion or end of data, or if an interface error occurs. Error information resides in the `-0` result. |
| `o` | Optional | Options subfield. See [Options — `o`](#options--o-subfield). |
| `adj` | Optional | Decimal field width adjustment options (ignored when `D` is specified in `o`). See [Options — `adj`](#options--adj-subfield). Default = `N`. |
| `skip` | Optional | Number of rows to skip when retrieving data (ignored when `D` or `H` is specified in `o`). If zero or less, retrieval begins at the first row. |
| `q` | Optional | Number of rows to retrieve (ignored when `D` or `H` is specified in `o`). If zero, less than zero, or greater than the number of rows in the table, all rows are retrieved. |
| `edsp?` | Optional | Create a result if an error occurs? `Y` or `N`. The result contains the last statement sent to the database manager, the system message text, and the status code and error column if applicable. |
| `wrap` | Optional | Column and data line wrapping options. See [Options — `wrap`](#options--wrap-subfield). Default = `N`. |
| `info` | Optional | Table information options. See [Options — `info`](#options--info-subfield). Default = `N`. |
| `vert` | Optional | Vertical display options. See [Options — `vert`](#options--vert-subfield). Default = `N` (columns displayed as fields). When a vertical option is used, a period line precedes each data record in the format `RECORD.xxx` where `xxx` is the record number. |
| `sort` | Optional | Specifies column position in the result. `Y` or `F` = positions primary key or unique index columns first. `N` = columns in selection order (default). |
| `nchar` | Optional | Nonalphanumeric character to fill null character fields received from the database. Default = fills null character fields with blanks and null decimal fields with `+0`. |
| `dst` | Optional | Enter `d` to eliminate duplicate data rows (`SQL DISTINCT`). Default = duplicate rows allowed. If the syntax is in a report, specify `DISTINCT` in the SQL statement instead. |
| `sp` | Optional | Alternate character to represent a space in the syntax portion of the statement. Used when a table or column name requires a space (e.g. table aliases or built-in functions). Valid characters: `! " # $ { | ? @ } \`` |
| `db` | Optional | Database name. **Windows / Linux / UNIX:** defaults to the default database name on the system. **2200:** defaults to the database running with `MRIMID` set to `1`. |
| `fs` | Optional | Number of spaces between columns in the result (ignored if truncation or wrapping would result). Value between `0` and `18`. Default = `0`. |
| `id` | Required* | Unique identifier for the cursor name. Required for all relational databases; may be left blank if a report is specified in `c,d,r`. |
| `col` | Required* | Column names to retrieve. Separate multiple names with commas. Use `*` to select all columns. |
| `tbl` | Required* | Table names from which to retrieve data. Separate multiple names with commas. |
| `Where clause` | Optional | Clause specifying one or more conditions for retrieving rows. Only rows where the condition is true are returned. Use to compare values or join multiple tables. To use apostrophes in the Where clause, assign a variable to `TIC$` (see [Guidelines](#guidelines)). |
| `c,d,r` | Optional | Report containing a Select statement. If specified, the statement executes the Select statement in the report and ignores `id`, `col`, `tbl`, and the Where clause. **2200:** max syntax = 7,948 characters (basic MRIM) or 7,500 characters (extended MRIM). **Windows / Linux / UNIX:** max syntax = 7,500 characters. |
| `sel` | Optional | Select statement number. If a report contains more than one Select statement, specifies which to execute. Each Select statement must end with a semicolon (`;`). |
| `vstat` | Optional | Variable to capture the action status. Define as type `A`, seven characters (e.g. `v1a7`). Normal completion = `0000` or `6001` depending on the database. Use `"GETERROR..."` syntax for other status values. |
| `vcol` | Optional | Variable to capture the character position within the generated SQL syntax where an error was detected. Define as a five-digit type `I` variable (e.g. `v2i5`). |
| `vqty` | Optional | Variable to capture the actual number of output columns. |

*Part of the quoted syntax string `'id col tbl [Where clause]'`.

---

## Options — `o` Subfield

| Option | Platform | Description |
|--------|----------|-------------|
| `D` | All | Retrieves a description of the specified columns and tables. Produces a result identical to the [`@DDI`](DDI.md) statement. |
| `E` | All | Retrieves an explanation of the syntax generated by `@FCH` and the access path used. Availability varies by relational database. |
| `H` | All | Produces a result containing column headings, the heading divider line, and five blank lines with tab characters. The `vert` subfield determines heading format; the `info` subfield determines additional content. |
| `L` | All | Left-justifies decimal fields and suppresses trailing zeros in fractions. |
| `R` | All | Right-justifies decimal fields and suppresses trailing zeros in fractions. |
| `S` | Windows only | Accesses schema metadata (OLE DB only). The `tbl` field becomes input for a DBSchema name and restrictions; the `col` field limits retrieved columns. Use `wrap=T` to limit large column sizes. |
| `Z` | All | Right-justifies decimal fields without suppressing trailing zeros. |

---

## Options — `adj` Subfield

| Option | Platform | Description |
|--------|----------|-------------|
| `B` | All | Increases the width of any decimal field. |
| `I` | All | Increases the width of decimal fields containing integer values (no fractional portion). |
| `N` | All | Makes no adjustment to decimal field width (default). |
| `F` | Linux / UNIX / 2200 | Increases the width of decimal fields containing a fractional part. |
| `F` | Windows | Increases the width of decimal fields containing a fractional part. For ODBC connections, the field is increased by two columns: one for the sign (`+`/`-`) and one for the decimal point. |

---

## Options — `wrap` Subfield

| Option | Description |
|--------|-------------|
| `A` | If the record length exceeds the line width, truncates the report heading and places the remainder on trailer (asterisk) lines. |
| `B` | If a column does not fit on the report line, places the column and the remainder of the record on trailer (asterisk) lines. |
| `N` | Displays a system message if data does not fit within the drawer's line width or a decimal value does not fit within its column width (default). |
| `T` | Truncates data to fit within the drawer's line width. Also truncates decimal values that do not fit within their field widths. |
| `Y` or `W` | Displays data on multiple lines if it exceeds the line width. A blank line is added to each wrapped header line. |

---

## Options — `info` Subfield

| Option | Description |
|--------|-------------|
| `B` | Produces the information specified by both `T` and `I`. |
| `D` | Deletes period lines from the result if `o = D`. |
| `I` | Produces a result identifying the data type for each column, the primary key column(s), and result columns. Data types are identified by the first letter of the type followed by the column width. Primary key formats: `PRIMARY KEY`, `PRIMARY`, `P`. Result column formats: `RESULT`, `R`. |
| `N` | No additional information (default). |
| `P` | Includes period lines in the result if `o = D`. |
| `T` | Produces a list of tables and cross-references each column with its table name (when `o ≠ D`). Each table is identified by a unique sequence number. |

---

## Options — `vert` Subfield

| Option | Description |
|--------|-------------|
| `C` | Left-justifies each column name before its data item. Column names are aligned by the longest name. |
| `N` | Produces a horizontal result with all columns displayed side by side (default). |
| `R` | Right-justifies each column name before its data item. Column names are aligned by the longest name. |
| `Y` | Displays only the data record; column names are omitted. |

---

## Outcome

The `@FCH` statement creates a result with headings corresponding to relational table columns and data lines corresponding to rows.

*(Windows / Linux / UNIX only)*: If only one column is selected and it is classified as a large object (e.g. a picture or image), the data is placed in a result and wrapped line to line. If multiple columns are selected and one is a large object, a message is placed in that column. Use the [`@PIC`](PIC.md) (Display Picture) statement to display the object if it is in a supported format.

---

## Reserved Words

`STAT1$` varies by option:

| Option Used | Contents of `STAT1$` |
|-------------|----------------------|
| `L`, `R`, or `Z` | Number of records retrieved from the database. |
| `D` | Number of columns entered. |
| `H` | `0`. |

`STAT2$` contains the total number of data lines written to the result following the headings, or `0` if an error was detected.

`STAT3$` contains one of the following:
- Line number of the first line following the heading divider line in the result.
- `0` if the relational database returns an error (e.g. invalid column or table name) and a label was supplied.
- A system message number if an interface error occurred (e.g. database inoperative) and a label was supplied. Use [`@LSM`](LSM.md) (Load System Message) to obtain the message text.

For ODBC databases, the following SELECT statements can be used to view table listings:

| Statement | Description |
|-----------|-------------|
| `SELECT * FROM ODBC$API$SQLTABLES` | Retrieves every type of table in the database. |
| `SELECT VIEW FROM ODBC$API$SQLTABLES` | Retrieves a list of views. |
| `SELECT TABLE FROM ODBC$API$SQLTABLES` | Retrieves a list of user tables. |
| `SELECT SYSTEM TABLE FROM ODBC$API$SQLTABLES` | Retrieves a list of system tables. |

---

## Guidelines

- `@FCH` is normally the most efficient way to retrieve columns and rows from a table. The [`@SQL`](SQL.md) (Submit SQL) statement may be more efficient when you need to specify exact table header formats, retrieve fewer than five rows, or use a routine that retrieves one row at a time.
- To use apostrophes in a Where clause, assign a variable to `TIC$`:
  ```
  @ldv,w <tic>h1 = tic$ .
  @fch... 'c * houses location ='<tic>'Edina'<tic> .
  ```
- *(2200 only)* Enter the expected number of lines in the `q` subfield to allocate sufficient storage and improve performance, even if you overestimate.

---

## Examples

### Retrieving All Columns and Rows

Retrieve all columns and rows from the `houses` table:

```
@fch,0,a,099,l,,,,y,a,,,,,,,agency 'c * houses' .
```

| Subfield | Description |
|----------|-------------|
| `0,a` | Holds the result in cabinet `0`, drawer `A`. |
| `099` | Branches to label `99` on error. |
| `l` | Retrieves data and left-justifies decimal fields. |
| `y` | Creates an error report if necessary. |
| `a` | Wraps records longer than the report width onto trailer lines. |
| `agency` | Specifies the database name. |
| `'c * houses'` | Cursor, all columns (`*`), from the `houses` table. |

---

### Joining Two Tables

The following `@FCH` statement accesses report `0,a,262`, which contains the SQL statement for joining the `houses` and `customers` tables. The syntax portion contains only a cursor name; the remaining syntax resides in the report.

```
@fch,0,a,099,,,,,y,a,,,,,,,rdms 'c',0,a,262 .
```

Report `262A`:
```
.Join houses and customers
*====================================================
SELECT cname,house.no,houses.price
FROM houses, customers
WHERE location=location_desired;
..... END REPORT .....
```

---

### Retrieving a Binary Object

Retrieve and display a binary object stored in a relational database. The `@FCH` statement creates an undisplayable result that [`@PIC`](PIC.md) can display, provided that only one row and one column are returned and the column is an INFORMIX `byte` or ORACLE `long raw` data type.

```
@ldv,p <db>h12=database,<id>h12=newuser,<psw>h12=new* .
@lgn,1,y,2,i,<db> '',,<id>,<psw> .
@006:fch,02,a,,z,b,,,y,w,,,n,*,,,<db> 'q cat_picture catalog WHERE \
catalog_num = 10001' .
@001:dsp,-0 .
@pic,-0,y,'dbblob.bmp()' 'INFX'.<infx>i6 .
@dsp,-0 .
@rel .
```
