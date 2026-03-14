# @LGN — Log On to Relational Database

## Overview

Initiates a session with a relational database. Use [`@LGF`](LGF.md) (Log Off Relational Database) to end the session.

---

## Syntax

**2200:**
```
@LGN[,lab,edsp?,c,d,db,inf,pkey,trnrpt] o[,lang,user,pw vdbt] .
```

**Windows / Linux / UNIX:**
```
@LGN[,lab,edsp?,c,d,db,inf,pkey] o[,lang,user,pw vdbt] .
```

> **Note:** If cabinet and drawer are not specified, replace the field with one comma on OS 2200 and two commas on Windows Server, Windows Client, Linux, or UNIX systems.

### Parameters

| Field | Platform | Required | Description |
|-------|----------|----------|-------------|
| `lab` | All | Optional | Label to branch to if an error occurs. |
| `edsp?` | All | Optional | Create a result if an interface or database error occurs? `Y` or `N`. The result contains the last syntax submitted to the database manager, the system message text, and the status code and error column (if applicable). If a label is supplied, the run branches there and the error information resides in the `-0` result. |
| `c,d` | All | Optional | Cabinet and drawer to hold the result. Default: `0,A`. |
| `db` | Windows / Linux / UNIX | Optional | Database name. Default: the default database name on your system. |
| `db` | 2200 only | Optional | Database name. Default: the database running with `MRIMID` set to `1`. See your administrator for more information. |
| `inf` | All | Optional | `Y` or `N`. If `Y`, creates an ODBC `-0` informational result. If `edsp?` is also `Y` and an error occurs, the error result overwrites the informational result. |
| `pkey` | All | Optional | `Y` or `N` (default: `Y`). Valid only for ODBC and OLEDB database types; ignored for all others. `Y` determines Primary Keys; `N` turns off the search for Primary Keys. |
| `trnrpt` | 2200 only | Optional | Report containing a translation table used to translate characters between local and remote sites. Must be in drawer `F` of the user's language cabinet. Default: no translation. Used by [`@NRD`](NRD.md), [`@NWR`](NWR.md), [`@NRN`](NRN.md), and reports returned through [`@NRT`](NRT.md). |
| `o` | All | Required | LGN options. Not used by all database managers. Place `''` here if leaving `o`, `lang`, `user`, and `pw` blank. See [RDMS Options](#enterprise-relational-database-server-rdms-options), [ODBC/OLEDB Options](#odbc-and-oledb-options), and [Thread Management Options](#thread-management-options-2200-only). |
| `lang` | All | Optional | Three-character local language identifier. Not used by all database managers. |
| `user` | All | Optional | Alternate user ID for database access or data access checking. Default: MAPPER user ID. |
| `pw` | All | Optional | Database password. Use with `user` to specify an alternate user ID and password. |
| `vdbt` | All | Optional | Variable to capture the database type. See [Database Type Values](#database-type-values). |

---

## Options

### ODBC and OLEDB Options

| Option | Description |
|--------|-------------|
| `Trans` | Turns off Autocommit, which is on by default for ODBC and OLEDB databases. If the database is not transaction-capable, Autocommit remains on. |

### Enterprise Relational Database Server (RDMS) Options

| Option | Description |
|--------|-------------|
| `Read` | No updates to the database are performed. This is the default. |
| `Retrieve` | No updates to the database are performed. |
| `Update` | Updates to the database are performed during the session. |
| `Update(Commandlooks)` | Updates to the database are performed during the session. |
| `Update(Deferred)` | Updates to the database are performed during the session. |
| `Update(Quicklooks)` | Updates to the database are performed during the session. |

See the *Relational Database Server for ClearPath OS 2200 Administration Guide* for more information.

### Thread Management Options (2200 only)

| Option | Description |
|--------|-------------|
| `INFO` | Returns the status of all active threads. The `db` subfield and all fields following `INFO` are ignored; no thread is activated. Example: `@lgn,,,0,h info .` followed by `@dsp,-0 .` |
| `KILL` | Terminates any thread on the current system for this user and department. Format: `@LGN,,,c,d,databasename KILL,station .` where `station` is the station number that created the thread. Issues a logon before sending a `MANAGE THREAD` to RDMS. |

---

## Reserved Words

| Variable | Description |
|----------|-------------|
| `STAT1$` | Status of the last syntax submitted to the database. Contains a status value when `STAT3$` equals zero. |
| `STAT2$` | Always `0`, unless the database type is ODBC. For ODBC, set to an ODBC database subtype if `inf` or `pkey` options are set; otherwise set to `99` (subtype unknown). |
| `STAT3$` | If non-zero, contains a system message number. Use [`@LSM`](LSM.md) (Load System Message) to retrieve the message text. |

### ODBC STAT2$ — Transaction Capability

For ODBC databases with `pkey` set to `Y`, `STAT2$` contains an integer between 0 and 499. Divide by 100 to extract the Transaction Capability (quotient) and ODBC subtype (remainder).

| Value | SQL Constant | Description |
|-------|-------------|-------------|
| `0` | `SQL_TC_NONE` | Transactions not supported. |
| `1` | `SQL_TLC_DML` | Transactions may contain only DML statements (SELECT, INSERT, UPDATE, DELETE). DDL statements cause an error. |
| `2` | `SQL_TC_DDL_COMMIT` | Transactions may contain only DML statements. DDL statements (e.g. CREATE TABLE, DROP INDEX) cause the transaction to be committed. |
| `3` | `SQL_TC_DDL_IGNORE` | Transactions may contain only DML statements. DDL statements are ignored. |
| `4` | `SQL_TC_ALL` | Transactions may contain statements in any order. |

### ODBC STAT2$ — Database Subtype Values

| Value | Database Type |
|-------|--------------|
| `0` | Unrecognized database type |
| `1` | DB2 |
| `2` | Oracle |
| `3` | Relational Database Server |
| `4` | Informix |
| `6` | Sybase |
| `11` | Microsoft SQL Server |
| `12` | DMS or DMS II |
| `13` | Access |
| `14` | Excel |
| `15` | Paradox |
| `16` | Text |
| `17` | OLEDB |
| `18` | MySQL |
| `19` | PostgreSQL |
| `20` | ADONET |
| `21` | MySQL |
| `99` | Null |

---

## Database Type Values

Values captured by the `vdbt` variable:

| Value | Database |
|-------|----------|
| `1` | DB2 v1.3 |
| `2` | ORACLE v5.1 |
| `3` | RDMS 4r1 |
| `4` | RDMS 5r1 |
| `5` | DB2 v2.0 |
| `6` | ORACLE v6.0 |
| `8` | INFORMIX |
| `9` | SYBASE |
| `10` | DMS 1100 (via CQL) |
| `11` | MAPPER (via MQL) |
| `13` | ORACLE v7.0 and higher |
| `14` | RDMS 6R1 and higher |
| `15` | INGRES level 6 and higher |
| `16` | ODBC |
| `17` | Microsoft SQL Server |
| `18` | OLE DB consumer |
| `20` | ADO.NET |
| `21` | MySQL |

---

## Informational Result (-0)

When the `inf` field is set to `Y`, a `-0` informational result is created with two columns: the `InfoType` and its value (blank if no value is returned). The following table lists the InfoTypes returned, in order:

| InfoType | InfoType Value |
|----------|---------------|
| `SQL_ACCESSIBLE_PROCEDURES` | `Y` if you can execute all procedures returned by `SQLPROCEDURES`; `N` if some cannot be executed. |
| `SQL_ACCESSIBLE_TABLES` | `Y` if SELECT privileges are guaranteed on all tables returned by `SQLTABLES`; `N` if some tables cannot be accessed. |
| `SQL_ACTIVE_ENVIRONMENTS` | Maximum number of active environments the driver can support. `0` = no specified limit. |
| `SQL_CURSOR_COMMIT_BEHAVIOR` | How a COMMIT operation affects cursors and prepared statements. |
| `SQL_CURSOR_ROLLBACK_BEHAVIOR` | How a ROLLBACK operation affects cursors and prepared statements. |
| `SQL_DATABASE_NAME` | Name of the current database, if the data source defines a named object called "database". |
| `SQL_DBMS_NAME` | Name of the DBMS product accessed by the driver. |
| `SQL_DBMS_VER` | Version of the DBMS product accessed by the driver. |
| `SQL_DM_VER` | Version of the Driver Manager. |
| `SQL_DRIVER_NAME` | File name of the driver used to access the data source. |
| `SQL_DRIVER_VER` | Version of the driver and optional description. |
| `SQL_IDENTIFIER_QUOTE_CHAR` | Starting and ending delimiter for quoted identifiers in SQL statements. Blank if quoted identifiers are not supported. |
| `SQL_MAX_DRIVER_CONNECTIONS` | Maximum number of active connections the driver can support per environment. `0` = no limit. |
| `SQL_MULTIPLE_ACTIVE_TXN` | `Y` if more than one simultaneous transaction is supported; `N` if not. |
| `SQL_QUOTED_IDENTIFIER_CASE` | Whether quoted identifiers are required and how they are stored in the system catalog. |
| `SQL_SERVER_NAME` | Actual data source-specific server name. |
| `SQL_SPECIAL_CHARACTERS` | All special characters permitted in identifier, table, column, or index names. Identifiers containing these characters must be delimited. |
| `SQL_TXN_CAPABLE` | Description of transaction support in the driver or data source. |
| `SQL_USER_NAME` | Name used in the particular database. May differ from the login name. |

> **Note:** Business Information Server and MRI do not necessarily support the same level of functionality that an ODBC driver returns. See the ODBC Server Help for specific information returned in the `-0` result.

---

## Example

Initiate a session with a database called `informix-ptq`:

```
@lgn,196,y,0,a,informix-ptq '',,sa,rdms <dbtype>a2 .
```

| Part | Description |
|------|-------------|
| `196,y,0,a` | Branch to label 196 on error; create a `-0` error result in cabinet `0`, drawer `A` |
| `informix-ptq` | Database name |
| `''` | Placeholder apostrophes for the option subfield (required with RDMS when `lang`, `user`, and `pw` subfields are blank) |
| `sa` | Username |
| `rdms` | Password |
| `<dbtype>a2` | Variable to capture the database type |
