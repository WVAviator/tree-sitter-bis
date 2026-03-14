# @SPI — Stored Procedure Interface

## Overview

Use the `@SPI` statement to execute a specified stored procedure and return the results. You can also use `@SPI` to query and return metadata about stored procedures in a database catalog.

Before using `@SPI`, you must establish communication with a database using the [`@LGN`](LGN.md) (Log On to Relational Database) statement. After all `@SPI` statements are completed, end the session with [`@LGF`](LGF.md) (Log Off Relational Database).

With `@SPI`, you can:

- Execute a single stored procedure.
- Retrieve a list of stored procedures for a specified database.
- Retrieve a list of columns with their definitions for a specified stored procedure.
- Retrieve a list of parameters with their definitions for a specified stored procedure.

> *(2200 / Linux / UNIX)* Executing `@SPI` from an OS 2200, Linux, or UNIX system is only supported for database configurations that use MRI-to-MRI networking to a remote database on a Windows operating system. Execution to local databases is not supported on these platforms.

---

## Syntax

### Windows / Linux / UNIX

```
@SPI[,c,d,lab,db,edsp?,action,wrap,vert] [spsyntax] [vpar1,&,vparn] [typ1,&,typn] .
```

### 2200

```
@SPI[,c,d,lab,db,edsp?,action,wrap,vert] [spsyntax[,c,d,r]] [vpar1,&,vparn] [typ1,&,typn] .
```

> **Notes:**
> - If cabinet and drawer are not specified, replace the field with one comma on OS 2200 and two commas on Windows / Linux / UNIX systems.
> - *(2200 only)* You must specify a full character set (FCS) drawer.

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `c,d` | Optional | Cabinet and drawer to hold the result. Default = `0,A`. |
| `lab` | Optional | Label to go to if errors are detected (`STAT1$` ≠ 0). |
| `db` | Required | Database name, as registered in MRIDBA. |
| `edsp?` | Optional | Create a result if an error occurs? `Y` = result contains the last statement sent to the database manager and the system message text, status code, and descriptive message. `N` = default; a runtime error occurs on failure. |
| `action` | Optional | Action to perform. See [Action Subfield](#action-subfield). Default = `E`. |
| `wrap` | Optional | `T` = truncate results that exceed result report width (for `E`, also truncates decimal values that don't fit; for `S`/`C`/`P`, truncates on the right). `W` = wrap results onto multiple lines if they exceed width (valid for `E` only; blank lines added to wrapped header lines). `N` = default; display a system error message if data does not fit. |
| `vert` | Optional | Format of results (applies to `E` action only). `Y` = display results vertically without column names. `N` = default; display results horizontally with column names. See [Vertical Subfield](#vertical-subfield). |
| `spsyntax` | Required (unless `action` = `S`) | The stored procedure syntax to execute, or the procedure name to retrieve metadata about. For `C` or `P` actions, contains only the stored procedure name. Uses the ODBC Call escape sequence. See [SP-Syntax](#sp-syntax). |
| `c,d,r` | Optional *(2200 only)* | Cabinet, drawer, and report containing stored procedure syntax. If `spsyntax` is supplied inline, the report syntax is ignored. |
| `vpar1,...,vparn` | Optional | Up to 78 variables for parameter passing. Each variable corresponds to a `?` parameter marker in `spsyntax`. Variables can be input, output, or input/output parameters. Output parameter variables must be sized large enough to hold the returned values. Only valid for `E` action. |
| `typ1,...,typn` | Required if `vpar` is specified | Parameter type for each `vpar`: `r` = return value, `i` = input (default), `o` = output, `b` = both input and output. Must match the defined type for the stored procedure. Return values are always integers — use an `I`-type variable for `r`. |

---

## Action Subfield

| Option | Description |
|--------|-------------|
| `E` | *(Default)* Execute a single stored procedure. Returns rowset results in `-0` and loads output parameters into corresponding variables. A stored procedure can return: a **rowset** (stored in `-0`), **output parameters** (stored in `vpar` variables), and/or a **return value** (stored in a `vpar` variable). |
| `S` | Returns a list of stored procedures for the database specified in `db`. Result fields: `Type` (4) — `PROC`, `FN`, or `Unkn`; `SP Name` (100). |
| `C` | Returns a list of columns for the specified stored procedure. Result fields: `Column Name` (30), `Type` (16), `Size` (7), `DecPt` (5), `NF` (5), `Length` (10), `Precision` (10). |
| `P` | Returns a list of parameters for the specified stored procedure. Result fields: `Parameter Name` (30), `Type` (16), `Size` (7), `DecPt` (5), `NF` (5), `PType` (5) — `IN`/`OUT`/`INOUT`/`RV`/`Unkn`, `Length` (10), `Precision` (10). |

> **Note:** `@SPI` always generates a result. If the stored procedure does not return a rowset, the `-0` result contains only a title line. If it returns a rowset, the result contains the title line, column headers, and data lines.

---

## Vertical Subfield

| Option | Description |
|--------|-------------|
| `Y` | Displays results vertically — one data value per line, maximizing space for wide columns. Each record begins with `.RECORD #.` where `#` is the record number. |
| `N` | *(Default)* Displays results horizontally — one record per line with column headers. |

**Example — vertical format (`vert=Y`) for a 3-column, 2-record result:**
```
.COLUMN(S)
*Color
*Size
*Name
*=========================
.RECORD 1:
|yellow
| 23
|Jack
.RECORD 2:
|blue
| 42
|Jane
```

**Example — horizontal format (`vert=N`) for the same result:**
```
*Color Size Name
*======.====.===========
|yellow| 23|Jack
|blue  | 42|Jane
```

---

## SP-Syntax

For metadata actions (`C` and `P`), `spsyntax` is simply the stored procedure name. For the execute action (`E`), use the standard ODBC CALL escape sequence:

```
{[?=]call procedure_name[([parameter][,[parameter]]...)]}
```

Examples:
```
{call SalesByCategory('Produce', '1995')}
{?=call SalesByCategory('Produce', ?)}
```

Parameter markers (`?`) correspond one-to-one with `vpar` variables in the parameter field.

---

## Reserved Words

`STAT1$` captures the status of the action performed. Values of `0` or `6001` (end of records) indicate normal completion and do not trigger the error label. Other positive values reflect native error codes from the database provider. Special negative codes:

| Value | Description |
|-------|-------------|
| `-999` | No native error code provided; see error text for details. |
| `-1000` | Errors retrieving metadata — usually the provider does not support the schema or method for the requested metadata. |

> **Note:** `STAT1$` is not the same as the `RETURN-VALUE` from the stored procedure. To capture a return value, use a `?` parameter marker with type `r` in `spsyntax`.

---

## Guidelines

- Executing stored procedures is only supported for databases with a local driver on a supported Windows platform. The database itself can reside on any machine if the driver is configured to access it.
- Always use the ODBC Procedure Call Escape Sequence for `spsyntax` — some providers (e.g., Oracle) do not support other formats.
- Returned metadata depends on the data provider. Missing fields are left blank. Notable provider differences:
  - Microsoft OLEDB and Oracle OLEDB providers return significantly different stored procedure lists.
  - ODBC providers usually do not provide column metadata but return no errors.
  - Complex procedures may cause OLEDB providers to error on column metadata.
  - SQL Server procedure names include a version number (`;num`).
- For procedure names containing spaces or special characters: ODBC providers generally do not require delimiters (e.g., `'Sales By Year'`); OLEDB providers generally do (e.g., `'[Sales By Year]'`).
- The Microsoft ODBC provider for SQL Server does not return column data (`C` option). The OLEDB provider returns column data for procedures that are not too complex.
- Microsoft SQL Server always returns a `RETURN-VALUE` even if the procedure does not define one. Using `{?=call ...}` may cause errors with other databases (e.g., Oracle) if no return value is defined.
- With the Microsoft data provider for Oracle, only input parameters can be defined for stored procedures that include a result set.
- `@SPI` is restricted to OLEDB and ODBC interfaces. Other interfaces are not supported.
- Stored procedures returning multiple record sets are not supported. Multiple parameter sets are not supported.
- Maximum of 78 parameter markers (`?`). Additional parameters can be passed as literals in the syntax.
- Only simple textual parameters supported by BIS variables are allowed. Array, binary, blob, and variant data types are not supported.

---

## Examples

### Execute a Stored Procedure with One Input Parameter

Executes `CustOrderHist` from the Northwind database, passing `OCEAN` as the `CustomerID` input parameter:

```bismapper
@ ldv,p <uid>s20='sa',<psw>s20='' .
@ ldv,p <db>s20='northwind' .
@ ldv,p <par1>s5='OCEAN' .
@ ldv,p <spn>s40='{call custorderhist(?)}' .
@.
@ lgn,,y,0,a,<db> '',,<uid>,<psw> .
@ spi,0,I,020,<db>,y,e <spn> <par1> i .
@0020:.
@ lgf,,,<db> .
@ dsp,-0 .
```

Result:
```
. Results of Procedure: {call custorderhist(?)}
*ProductName                            .Total
*========================================.===========
|Chef Anton's Gumbo Mix                 |         20
|Konbu                                  |          5
|Lakkalikööri                           |         10
...
```

### Retrieve Stored Procedure Metadata (S, C, P Options)

Retrieves the list of stored procedures, then column and parameter info for `[Sales By Year]`:

```bismapper
@ ldv,p <uid>s20='sa',<psw>s20='' .
@ ldv,p <db>s20='northwind' .
@ ldv,p <spname>s40=[Sales By Year] .
@.
@ lgn,020,y,0,a,<db> '',,<uid>,<psw> .
@.
@ spi,0,i,0020,<db>,y,s .              (list of SPs)
@ dsp,-0 .
@.
@ spi,0,i,0020,<db>,y,c <spname> .    (column info)
@ dsp,-0 .
@.
@ spi,0,i,0020,<db>,y,p <spname> .    (parameter info)
@ dsp,-0 .
@0020.
@ lgf,,,<db> .
```

### Execute a Stored Procedure with Multiple Parameters and a Return Value

Executes `SalesByCategory` with two input parameters and captures the return value:

```bismapper
@ ldv,p <uid>s20='sa',<psw>s20='' .
@ ldv,p <db>s20='northwind' .
@ ldv,p <cat>s8='Seafood' .
@ ldv,p <yr>s4='1998' .
@ ldv,p <rv>i6=0 .
@ ldv,p <spn>s40='{?=call salesbycategory(?,?)}' .
@.
@ lgn,030,y,0,a,<db> '',,<uid>,<psw> .
@ spi,0,i,030,<db>,y <spn> <rv>,<cat>,<yr> r,i,i .
@.
@ if <rv> eq 0 gto 0030 .
@ dsp,-0 .
@030:.
@ lgf,,,<db> .
```

### Oracle Stored Procedure with Result Set (One Input Parameter)

Executes the `lastname` procedure in the `packperson` Oracle package, using the Microsoft data provider:

```bismapper
@ ldv,p <db>s20=msora-ole,<uid>s20=scott,<psw>s20=tiger .
@ lgn,60,y,0,a,<db> '',,<uid>,<psw> .
@ ldv <p1>s7=Goodwin .
@ ldv,p <spn>s80='{call packperson.lastname(?,{resultset 9,ssn,fname,lname})}' .
@ spi,0,i,0060,<db>,y,e,t,n <spn> <p1> i .
@060:dsp,-0 .
```

Result:
```
. Results of Procedure: {call packperson.lastname(?,{resultset 9,ssn,fname,lname})}
*SSN               .FNAME          .LNAME
*===================.===============.====================
|         555662222|Sam            |Goodwin
|         123662200|Mary           |Goodwin
```

---

## See Also

- [`@LGN`](LGN.md) — Log On to Relational Database
- [`@LGF`](LGF.md) — Log Off Relational Database
- [`@FCH`](FCH.md) — Fetch (SQL)
- [`@SQL`](SQL.md) — SQL Statement
