# Using Data Naming

## Overview

This section covers the following topics:
- [Introduction to Data Naming](#introduction-to-data-naming)
- [Naming Cabinets, Drawers, and Reports](#naming-cabinets-drawers-and-reports)
  - [Naming Requirements and Conventions](#naming-requirements-and-conventions)
  - [Using Names in Variables](#using-names-in-variables)
  - [Naming Results](#naming-results)
  - [Working with Session Global Reports](#working-with-session-global-reports)
- [Naming Fields](#naming-fields)
  - [Report Headings and the Heading Divider Line](#report-headings-and-the-heading-divider-line)
  - [Specifying Field Names](#specifying-field-names)
  - [Field Order](#field-order)
  - [Field Names in Variables](#field-names-in-variables)
  - [Processing Partial Fields](#processing-partial-fields)
  - [Matching Variable Sizes to Field Sizes](#matching-variable-sizes-to-field-sizes)
  - [Converting Column Position to Field Names](#converting-column-position-to-field-names)
  - [Selecting Fields to Display](#selecting-fields-to-display)
  - [Efficiency Considerations](#efficiency-considerations)

---

## Introduction to Data Naming

Data naming allows statements to identify fields in a report using meaningful field names rather than column-character positions. You can also assign meaningful names to reports, drawers, and cabinets.

These two statements perform the same search with identical results:

```
@srh,0,d,1 '' 26-4 |,amco .
@srh,0,d,1 '' 'cust code' |,amco .
```

Using field names makes statements easier to read and maintain. If a field moves within a report or its size changes, you do not need to update references to it. You can also mix standard script syntax and data naming syntax within the same script or even within the same statement.

> **Note:** Since data names vary from site to site, the formats and examples in this guide use cabinet, drawer, and report designations (`c,d,r`).

The system directory contains information about all named reports, drawers, and cabinets. To retrieve information about a particular name, use the `NAME` command or the **Directory** (`DIR`) statement.

> Before using a named report, drawer, or cabinet, you must enter it in the system directory with the `NAME` command. See the Command Reference for more information.

---

## Naming Cabinets, Drawers, and Reports

### Naming Requirements and Conventions

Names must start with an alphabetic character (A–Z) and contain 1 to 16 characters. Uppercase A through I are reserved by BIS for drawer names and cannot be used.

> *(Windows / Linux / UNIX)* You can use any characters in report, drawer, or cabinet names except: `^`, `;`, `/`, `,`, space, and tab. For example, `orderstatus` and `order-status` are both acceptable and are treated as unique names.

> *(OS 2200)* You can use any characters in names, but only alphanumeric characters (A–Z, 0–9) are considered when comparing to the system directory — all other characters are ignored. For example, `orderstatus`, `order-status`, and `order status` are all acceptable and considered the same name.

> **Note:** Avoid names containing the letter `V` followed by a number, as the script interpreter treats these as numbered variables. If necessary, load a variable with the data name and use the variable in statements.

Names can also be assigned to a range of reports in a drawer. If a name defines a report range and is used with `BFN`, `FND`, or `SRH`, the system automatically applies the `R` option (range of reports).

**Name scope in statements:**

| Name type | Replaces |
|-----------|----------|
| Report name | All three `c,d,r` subfields |
| Drawer name | Both `c` and `d` subfields |
| Cabinet name | Only the `c` subfield |

Always enclose report, drawer, and cabinet names in apostrophes (`'`) in statements.

**Examples:**

Assuming `orderstatus` represents report `1D0`, these statements search the same report:

```
@srh,0,d,1 ...
@srh,'orderstatus' ...
```

This statement searches report number 2 in a drawer named `orders`:

```
@srh,'orders',2 ...
```

### Using Names in Variables

A variable can contain a report, drawer, or cabinet name. Enclose such variables in apostrophes when using them in statements. Do not place any other characters (such as spaces) within the apostrophes.

You can use any variable type, including a variable containing the name of another variable. Substrings are not supported. See *Using Variables, Reserved Words, and Constants* for more information.

**Example** — searching the report named `orderstatus` via a variable:

```
@ldv <repname>h18='orderstatus' .
@srh,'<repname>' ...
```

### Naming Results

Wherever you specify the current result (`-0`) or a renamed result (`-1` through `-16`), you can omit the cabinet and drawer (`c` and `d`) subfields.

**Example** — these two statements are equivalent:

```
@dsp,0,b,-0 .
@dsp,-0 .
```

### Working with Session Global Reports

Session Global Reports are special reports that can be saved by one BIS script and retrieved later by another. They are managed using the `SGPUT` and `SGGET` statements.

- **`SGPUT`** — copies the specified report (same as `@RSL`) and places it into the Session Global Table. Once placed, no BIS functions can access the report except `SGGET`.
- **`SGGET`** — retrieves a report from the Session Global Table.

Session Global Reports remain in the table for the entire user session and are cleared when the current user signs off or another user signs on. A maximum of **16** Session Global Reports can be active at a given time.

**Naming rules for Session Global Reports:**

- Up to 16 characters in length.
- First character must be alphabetic.
- Remaining characters may be: A–Z, a–z, 0–9, `#`, `-`, `_`, `.`, `@`, `$`.
- Names are stored in mixed case but searched case-insensitively.

Both `@SGGET` and `@SGPUT` support deleting reports from the table. The `@DIAG` statement provides an option to list all report names currently in the Session Global Report Table.

**Reserved Words:**

| Reserved Word | Description |
|---------------|-------------|
| `SGRACT$` | Number of active reports in the Session Global Report Table. `[I2]` |
| `SGRMAX$` | Maximum number of reports allowed in the Session Global Report Table. `[I2]` |

---

## Naming Fields

You can use field names from report headings in statements in place of column-character positions. The system uses the headings of the report being processed, or headings from report 0 when processing multiple reports.

### Report Headings and the Heading Divider Line

When a script reads the first field name in a statement, it scans the first 16 lines of the report for a heading divider line. It derives starting columns and field sizes from the groupings of equal signs (`=`) in the divider line, and extracts field names from up to two asterisk lines above it.

**Example — two-line headings:**

```
.Sample Report Headings
*St.Status.By. Product.
*Cd.Date  .In.  Type  .
*==.====  .==. =======.
```

| Field Name | Column-Characters |
|------------|-------------------|
| `St Cd` | `2-2` |
| `Status Date` | `5-6` |
| `By In` | `12-2` |
| `Product Type` | `15-9` |

**Example — three-line headings** (only the last two asterisk lines are used):

```
.Sample Report Headings
*Monthly . Annual .
*Interest.Discount.
*  Rate  . Status .
*========.========.
```

| Field Name | Column-Characters |
|------------|-------------------|
| `Interest Rate` | `2-8` |
| `Discount Status` | `11-8` |

> If a report heading contains three or more asterisk lines, only the last two are used for field name derivation. Keep the most important information in the last two asterisk lines.

### Specifying Field Names

Enclose field names in apostrophes (`'`) in run control reports. Field names are not case-sensitive. They can contain up to 32 characters and must be unique within the heading.

- If duplicate names exist, the last one is used.
- You can abbreviate field names by omitting trailing characters, as long as the remaining string is unique among all field names.
- If a script uses a field name that does not exist in the specified report, the script fails with a syntax error. Use the **Define Variable Size** (`DVS`) statement to check whether a field exists.

> *(Windows / Linux / UNIX)* Any characters except parentheses are allowed in field names. Spaces are ignored — `'custcode'` and `'cust code'` are treated as identical.

> *(OS 2200)* Only alphanumeric characters (A–Z, 0–9) are allowed. All other characters (including hyphens and spaces) are ignored — `'custcode'`, `'cust-code'`, and `'cust code'` are all treated as identical.

> **Note:** Avoid field names containing the letter `V` followed by a number, as the script interpreter treats these as numbered variables.

**Example** — abbreviated field name for a shorter, more efficient statement:

```
@srh,0,d,1 '' 'cust' |,amco .
```

### Field Order

Multiple named fields can be listed in any order regardless of their position in the report, as long as the parameters are in matching order.

**Example** — these two statements perform the same search:

```
@srh,0,d '' 'st cd','cust code' |,or,amco .
@srh,0,d '' 'cust code','st cd' |,amco,or .
```

### Field Names in Variables

Enclose variables containing field names in apostrophes. Do not place any other characters (such as spaces) within the apostrophes. Substrings are not supported.

**Example** — searching the `Cust Code` field using a variable:

```
@ldv <fldname>h18='cust' .
@srh,0,d,1 '' '<fldname>' |,amco .
```

### Processing Partial Fields

To process only part of a named field, append the relative starting column and number of characters in parentheses after the field name.

**Examples:**

Search the first character of the `Product Type` field:
```
@srh,0,d,1 '' 'product type(1-1)' |,b .
```

Search from the sixth column to the end of the `Product Type` field (use `0` for character count to mean "to end of field"):
```
@srh,0,d,1 '' 'product type(6-0)' |,box1 .
```

Search the last character of the `Order Number` field (use `0` as the starting column to count from the end):
```
@srh,0,d,1 '' 'order number(0-1)' |,s .
```

### Matching Variable Sizes to Field Sizes

When an input parameter processes a report field, the variable used must match the field size. Use the **Define Variable Size** (`DVS`) statement to create variables automatically sized to match report fields — the script defines the variable size at execution time, so any input parameter or screen using that variable adapts to field size changes.

With the `RDC`, `RDL`, `RLN`, and `SUB` statements, the script can automatically define variable size as the field size. Global or environmental variables require explicit size specification.

When defining a Fixed-Point (`F`) type variable, you can still specify the number of fractional characters. For example, `<number>f.2` specifies two characters to the right of the decimal point while the overall size is defined by the statement.

**Example** — letting the script define the size of `<data>`:

```
@rdl,0,b,2,6 'cust' <data>h .
```

### Converting Column Position to Field Names

Use the **Load Field Name** (`LFN`) statement to convert an existing script from column-character positions to named fields, or to translate column position data (such as values captured by the `OUM` statement) into field names. `LFN` loads variables with the field names corresponding to the supplied column-character positions.

### Selecting Fields to Display

Use the **Format** (`FMT`) statement to select which fields to display in a subsequent `DSP`, `OUT`, or `OUM` statement.

### Efficiency Considerations

When a script first encounters a field name, it reads the entire report heading, which may require one additional I/O access. However, the heading is cached and not re-read for other field names in the same statement, or for subsequent statements that reference the same report and fields (or a result derived from that report).

**Example** — the heading is read once for `SRH` and reused for `SOR` and `TOT`:

```
@srh,0,d,1 '' 'st cd' |,or .
@sor,-0 '' 'order number' |,1 .
@tot,-0 s 'order number','ord qty' |,s,+ .
```

Since many statements reprocess the result of a previous statement, the overhead of reading report headings is distributed and the impact on any individual statement is minimized.
