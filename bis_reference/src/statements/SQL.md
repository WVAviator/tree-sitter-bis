# @SQL — Submit SQL

## Overview

Passes SQL syntax to a relational database and retrieves data into variables. SQL syntax may be included directly in the statement or stored in a report.

> **Prerequisite:** Before using `@SQL`, you must establish a database connection using the [`@LGN`](LGN.md) (Log On to Relational Database) statement.

> **Note:** You cannot use `@SQL` to issue a `BEGIN THREAD...;` when using an extended mode MRIM server — use [`@LGN`](LGN.md) instead.

---

## Syntax

```
@SQL[,lab,edsp?,c,d,cstat,db]
'syntax'[,c,d,r,sel,sq]
vstat[,vcol,vretn,vretn,...vretn] .
```

> **Notes on cabinet/drawer fields:**
> - If cabinet and drawer are not specified, replace the field with one comma on OS 2200, or two commas on Windows Server, Windows Client, Linux, or UNIX systems.
> - *(OS 2200 only)* You must specify a full character set (FCS) drawer.

---

## Parameters

### Header Fields

| Field | Description |
|-------|-------------|
| `lab` | Label to go to if the status in `vstat` is other than normal completion and does not equal the value of the `cstat` subfield. |
| `edsp?` | `Y` or `N`. If `Y`, creates a result when an error occurs containing the last statement sent to the database manager, the system message text, and (if applicable) the status code and column where the error occurred. If a label was supplied, the run continues at the label and the error information resides in the `-0` result. |
| `c,d` | Cabinet and drawer to hold the result. |
| `cstat` | Alternate valid status code. If `edsp?` is `Y` and a code is specified here, the statement does not create an error result. |
| `db` *(Windows / Linux / UNIX)* | Database name. Default = default database name on your system. |
| `db` *(OS 2200)* | Database name. Default = database running with `MRIMID` set to `1`. See your administrator for more information. |

### Syntax / Report Fields

| Field | Platform | Description |
|-------|----------|-------------|
| `'syntax'` | All | The SQL syntax to execute. Ignored if a report is specified via `c,d,r`. If apostrophes are needed to refer to character data, use a variable assigned to `TIC$`. Example: `'...Where LOCATION = '<tic>'Edina'<tic>';'` |
| `c,d,r` | OS 2200 | Report containing SQL statements to submit. Each statement must end with `;`. Max syntax characters: **7948** (basic mode MRIM) or **7500** (extended mode MRIM). Multiple statements can be wrapped in `#...#` blocks to be sent in a single request (e.g., for stored procedures). |
| `c,d,r` | Windows / Linux / UNIX | Report containing SQL statements to submit. Each statement must end with `;`. Max syntax characters: **7500**. |
| `sel` | All | SQL statement number indicating which statement to execute when input is from a report. Default = `1`. |
| `sq` | All | Number of SQL statements to execute when input is from a report. Default = `ALL`. |

### Result Variables

| Field | Description |
|-------|-------------|
| `vstat` | Captures the status of the action performed. Define as type `A`, 7 characters (e.g., `v1a7`). Normal completion = `0000`; end of cursor / record not found = `6001`. Use `GETERROR...` syntax for other status values. |
| `vcol` | Captures the character position within the syntax where an error was detected. Define as type `I`, 5 characters (e.g., `v2i5`). If database type is MQL and `vstat = 0`, this value is unpredictable. |
| `vretn` | Up to 38 variables to pass information to or receive information from the relational database. |

> *(OS 2200 only)* The combined size of all variables used to return information from a function must not exceed 511 characters.

#### Variable Type Guidelines

- For **numeric columns**: use type `A`, `F`, or `I` variables.
- For **character columns**: use type `H` or `S` variables.
- Type `A`, `F`, or `I` result values are right-justified and space-filled within the variable.
- Variables receiving numeric data must be large enough to hold a leading `+` or `-` sign, as some databases require it.
- If a type `F` variable is too small to hold the result, the statement fills it with asterisks (`*`).
- Using incorrect variable types or lengths may produce unpredictable results.

---

## Reserved Words

`STAT1$` contains the status of the last syntax sent to the database manager. `STAT2$` contains zero (`0`). `STAT3$` contains one of the following:

- A system message number if an interface error occurred (e.g., the database is inoperative) and a label was supplied. Use the [`@LSM`](LSM.md) (Load System Message) statement to obtain the message text.
- Zero if the relational database returns an error (e.g., an invalid column or table name) and a label was supplied.

*(Windows / Linux / UNIX only)*
- If `STAT1$` equals zero, `STAT3$` contains the number of records processed for an SQL `INSERT` or `DELETE` command (for Oracle, Microsoft SQL, and Sybase). For other databases, zero indicates no records were processed or the database does not support returning this value.
- When inserting data into an MQL table, the `STAT1` value returned is `0`.

---

## Guidelines

- Use relational database variables in an `@SQL` statement to send and retrieve information from the relational database.
- If relational database variables are used, the syntax must be placed in the `'syntax'` portion of the statement — the report (`c,d,r`) method cannot be used.
- The `vstat`, `vcol`, and `vretn` variables contain information as described unless an interface error is detected, in which case their contents may be unpredictable.
- Each SQL statement must begin on a separate line.

---

## Examples

### Insert from Report

Submits an insert command using a report containing SQL syntax to insert a row into the `houses` table.

```
@sql,099,y,0,a,,agency '',0,a,350 <error>a5,<column>a5 .
```

| Field | Value | Description |
|-------|-------|-------------|
| `099,y,0,a` | — | Goes to label 99 on error, creates a `-0` result with error info placed in cabinet 0, drawer A. |
| `agency` | — | Specifies the database name. |
| `''` | — | SQL syntax field. Omitted since a report is specified. |
| `0,a,350` | — | Identifies report 350 in cabinet 0, drawer A, containing the SQL syntax. |
| `<error>a5` | — | Receives the status of the action performed. |
| `<column>a5` | — | Receives the column number where an error occurred. |

Report contents (RID 350):
```
.Insert a row
*=====================================================
INSERT INTO houses
VALUES ('H500','Edina',150,'3 Bedrooms');
```

---

### Fetch Loop with Cursor

Executes a `SELECT` and loops fetching rows until end-of-cursor (`<error>=6001`).

```
@ldv,p <db>s18=testdb2,<id>s20=db2admin,<psw>s20=db2admin
@ldv,w <tic>h1=tic$
@ldv,p <Fetch>s998='@SQL,199,y,,,6001,<db> '<tic>'Fetch next into:1,:2,:3,:4;'<tic>' <error>a6,<column>a5,<1>,<2>,<3>,<4>'
@ldv <l>s10=This,<2>s10=is,<3>s250=Cool,<4>s20=too
@lgn,,,ecab$,edrw$,<db> '',,<id>,<psw> <vdtt>a6

@SQL,199,,,,6001,<db> 'SELECT * FROM cars' <error>a6,<column>a5
@brk .
The Select Statement Worked
@brk dsp,-0
@brk
*=====================================================
@001:xqt <Fetch>
[<1>][<2>][<3>][<4>]
@if<error> = 6001 gto 3 . ; .
@002:
@if<error> ne 0,(199) ; gto 1 .
@003:brk dsp,-0
@lgf,,,<db>
@gto end
@199:ldv <stat1>a12=stat1$,<stat2>a12=stat2$,<stat3>a12=stat3$
@brk
An error occurred!!!
@dsp,-0
@lgf,,,<db>
@gto end
```

---

### Singleton SELECT

Selects a single row into named host variables. `:P1,:P2,:P3,:P4` are host variables whose return values are placed into `<1>,<2>,<3>,<4>` respectively.

> **Note:** Singleton SELECTs are only supported in Native mode for Oracle and RDMS databases. Not supported for ODBC or OLEDB.

```
@ldv,p <db>s18=odbc_orac,<id>s20=scott,<psw>s20=tiger
@ldv,w <tic>h1=tic$
@ldv,p <Fetch>s998='@SQL,199,y,,,6001,<db> '<tic>'SELECT HOUSE_NO,LOCATION,PRICE,HOUSES_DESCRIPTION INTO :P1,:P2,:P3,:P4 FROM Houses WHERE HOUSE_NO=1'<tic>' <error>a6,<column>a5,<1>s4,<2>s15,<3>i3,<4>s25'
@LGN,190,y,0,a,<db> '',,<id>,<psw> <vdtt>a6
@DSP,-0
*=====================================================
@010: .
@XQT <Fetch>
@BRK .
[<1>][<2>][<3>][<4>]
@BRK .
@190:
@DSP,-0
@LGF,,,<db>
```

---

### MRI to RDMS (Cursor with Indicator Variables)

Demonstrates insert, update, select, count, cursor declare/open/fetch/drop, and logoff with full error handling. Indicator variables (`<i1>`, `<i2>`, `<i3>`) signal NULL values — if an indicator equals `-1`, the corresponding data variable received a NULL (numeric NULLs become zero).

```
@brk
.Test Tbl
*C1pk .C2int .C3dec2
*==============.============.============
*C |I |D2
*P | |
* |N |N
|C3dec2_is_NULL| 1|
|One | 1| 1
|NineNinetyNine| 999| 9.99
@brk rnm -1
@ldv <sta>a7=-,<col>i3,<dbt>a3
@lgn,0199,y,0,i,RDMS 'UPDATE(DEFERRED)',,<userid>,<password> <dbt> .  ## Logon

@RAM,-0,0199,D,,,,,y,6006,,,RDMS 'MRI.Tbl' <sta>a7 .  ## Drop
@RAM,-1,0199,B,B,,,,y,,,B,RDMS 'MRI.Tbl,MRI.StorageArea' <sta> .  ## Create
@.
@ldv,p <sql>s99='insert into MRI.Tbl values ($p1, NULL, $p2);'  ## Insert
@ldv <p1>s14='Twelve',<p2>f12.2=12.12
@sql,0199,y,616,h,,RDMS <sql> <sta>,<col>,<p1>,<p2>
@.
@ldv,p <sql>s99='update MRI.Tbl set C2int=$p1 where C1pk=$p2;'  ## Update
@ldv <p1>i3=12,<p2>s14='Twelve'
@sql,0199,y,616,h,,RDMS <sql> <sta>,<col>,<p1>,<p2>
@.
@ldv,p <sql>s99='select * into $p1,$p2,$p3 from MRI.Tbl where C1pk=$p4;'
@ldv <p1>s14,<p2>i12,<p3>f12.2,<p4>s14='NineNinetyNine'  ## Select
@sql,0199,y,616,h,,RDMS <sql> <sta>,<col>,<p1>,<p2>,<p3>,<p4>
@.
@ldv,p <sql>s99='select count(*) into $p1 from MRI.Tbl where C2int>$p2;'
@sql,0199,y,616,h,,RDMS <sql> <sta>,<col>,<rows>i3,<p2>i2  ## Count
@.
@ldv,p <sql>s99='declare Z cursor for Select * from MRI.Tbl where C2int>$p1;'
@SQL,0199,y,616,h,,RDMS <sql> <sta>,<col>,<p1>i12  ## Declare
@SQL,0199,y,616,h,,RDMS 'open Z using $p1;' <sta>,<col>,<p1>  ## Open
@.
@ldv <j>i2=1  ## Loop Initialization
@0010:if <j> gt <rows> gto 0019 . ; .  ## Loop Check
@.
@ldv,p <sql>s99='fetch Z into $p1 $p2, $p3 $p4, $p5 $p6;'  ## Fetch
@ldv <p1>s14=-,<p2>i12=-,<p3>f12.2=-  . receiving variables
@ldv <i1>i02=0,<i2>i02=0,<i3>i02=0  . indicator variables: if -1 then Null
@SQL,0199,y,616,h,6001,RDMS <sql> <sta>,<col>,<p1>,<i1>,<p2>,<i2>,<p3>,<i3>
@if <sta> = 6001 gto 0019 . ; .  . 6001 is end-of-cursor
@brk  ## Display
p1=[<p1>] i1=[<i1>]  p1 received the primary key which is never null
p2=[<p2>] i2=[<i2>]  If i2=-1 then p2=null. Numeric nulls become zero.
p3=[<p3>] i3=[<i3>]  If i3=-1 then p3=null. Numeric nulls become zero.
@brk dsp,-0,,,,,,' Result of @SQL fetch into with indicator variables'
@inc <j>
@gto 0010  ## Loop Check Again
@0019 .  ## Loop Exit
@SQL,0199,y,616,h,,RDMS 'Drop Cursor Z;' <sta>,<col>  ## Drop
@LGF,0199,,RDMS  ## Logoff
@gto end  ## End
@0199 ldv,pw <s1>s12=stat1$,<s2>s12=stat2$,<s3>s12=stat3$  . Error Handling
@rnm -1  . Save the Error report if a Y was in the <edsp?> field
@brk lsm,<s3> <lsm>s80  . Load System Message in case the error was from BIS.
sta=<sta> s1=<s1> s2=<s2> s3=<s3>
lsm=<lsm>
@brk add,-0,-1 dsx,-0,,,,,,' MRI Error'
```
