# @RDL (Read Line)

## Overview

Reads a report line or segments of a line and loads variables with the data.

> **Note:** You can use either `@RDL` or [`@RLN`](RLN.md) (Read Line Next) in a loop to read several lines. `@RLN` is slightly more efficient because the run interpreter does not need to determine the report to read from.

> **Note:** The report opened by `@RDL` is closed by all functions except the following: `BRG`, `BRK`, `CHG`, `DEF`, `ESR`, `GTO`, `IF`, `LDV`, `LOK`, `RDC`, `RLN`, `RNM`, `RSR`, `ULK`, `LOG`, `RER`, `RAR`, `CAR`, `CER`, `DEC`, `INC`, `MSG`, `RDB`, `JUV`, `DC`, `CAB`, `DRW`, `LNG`, `XQT`, `LCV`, `RPW`, `PNT`, `KEY`, `NOF`, `SCH`, `CLK`, `USE`, `NRT`, `LDA`, `FKY`, and `HSH`. The report is closed to prevent deadlocks.

---

## Syntax

```
@RDL,c,d,r,l[,lab] cc vdata .
```

### Parameters

| Field | Description |
|-------|-------------|
| `c,d,r` | Report from which to read the line. |
| `l` | Line number to read. |
| `lab` | *(Windows / Linux / UNIX)* Label to go to if the line or report does not exist. If no label is specified and the line or report does not exist, the run **fails**. *(2200 only)* Label to go to if the line or report does not exist. If no label is specified and the line or report does not exist, the run **continues**. Some systems can be configured for compatibility with the Windows/Linux/UNIX behavior — see your administrator. |
| `cc` | Column-character positions or field names to read. Fields do not need to be specified left to right, but variables in `vdata` must be assigned in matching sequence. |
| `vdata` | Variables to capture the data. Maximum = 80 variables. |

---

## Reserved Words

`LINE$` contains the next line number to read. If the last line read was beyond the end of the report, `LINE$` contains zero.

---

## Guidelines

- To have the run automatically initialize a variable to the size of a field, specify only the variable name and type (e.g., `<data1>h`, `<data2>s`). The `@RDL` statement initializes the variable to the appropriate field size.
- When loading variables of a specified size, the variable size determines the number of columns read — not the `cc` field width. For example, in the following statement `<data>` captures 10 characters starting at column 5, even though only 2 characters are specified in `cc`:
  ```
  @rdl,0,b,2,5,099 5-2 <data>h10 .
  ```
- *(2200 only)* Columns that exceed the line size of the report being read are ignored and are not considered an error condition.

---

## Examples

Read a single field from line 6 of report `2B0`:

```
@rdl,0,b,2,6 'custcode' <data>h .
```

| Field | Value | Description |
|-------|-------|-------------|
| `c,d,r` | `0,b,2` | Read from report `2B0`. |
| `l` | `6` | Read line 6. |
| `cc` | `'custcode'` | Read data from the Cust Code field. |
| `vdata` | `<data>h` | Initialize `<data>` as type `H` to the size of the Cust Code field. |

Read two fields from a variable line number in report `2B0`, going to label `99` if the line or report does not exist:

```
@rdl,0,b,2,<line>,099 'statusdate','shiporder' <date>i,<order>h .
```

| Field | Value | Description |
|-------|-------|-------------|
| `c,d,r` | `0,b,2` | Read from report `2B0`. |
| `l` | `<line>` | Read the line number stored in `<line>`. |
| `lab` | `099` | Go to label `99` if the line or report does not exist. |
| `cc` | `'statusdate','shiporder'` | Read from the Status Date and Ship Order fields. |
| `<date>i` | | Initialize `<date>` as type `I` to the size of the Status Date field. |
| `<order>h` | | Initialize `<order>` as type `H` to the size of the Ship Order field. |
