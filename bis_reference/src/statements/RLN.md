# @RLN (Read Line Next)

## Overview

Continues reading from the report last accessed by a [`@RDL`](RDL.md) (Read Line) or [`@FDR`](FDR.md) (Find and Read Line) statement. An `@RLN` statement must follow a successful `@RDL` or `@FDR` statement.

---

## Syntax

```
@RLN[,l,lab] cc vdata .
```

### Parameters

| Field | Description |
|-------|-------------|
| `l` | Line number to read. Default = next line number. |
| `lab` | Label to go to if the specified line does not exist. |
| `cc` | Column-character positions or field names to read. Fields do not need to be specified left to right, but variables in `vdata` must be in matching sequence. |
| `vdata` | Variables to capture the data. Maximum = 80 variables. |

---

## Reserved Words

`LINE$` contains the next line number to read. If the line read is beyond the end of the report, `LINE$` contains zero.

---

## Guidelines

- To have the run automatically initialize a variable to the size of a field, specify only the variable name and type (e.g., `<data1>h`, `<data2>s`). The `@RLN` statement initializes the variable to the appropriate field size.
- When loading variables of a specified size, the variable size determines the number of columns read — not the `cc` field width. For example, in the following statement `<data>` captures 10 characters starting at column 5, even though only 2 characters are specified in `cc`:
  ```
  @rln,,099 5-2 <data>h10 .
  ```
- *(2200 only)* Columns that exceed the line size of the report being read are ignored and are not considered an error condition.
- Since `@RLN` continues processing a previously specified report, only statements that do not close the report are allowed between `@RDL`/`@FDR` and `@RLN`, such as `IF`, `CHG`, and `LDV`. An [`@RDC`](RDC.md) statement may also be placed between them, provided it is processing a different report.
- Statements that have a manual function counterpart (such as `ART`, `DC`, `DEV`, `FND`, `LZR`, `MCH`, `SRH`, `SOR`, `TOT`, and `WRL`) close the previously open report when they begin processing, making it unavailable for `@RLN`.

---

## Examples

Read data from the `Cust Code` field in the report previously opened by `@RDL` or `@FDR`:

```
@rln 'custcode' <data>h .
```

| Field | Description |
|-------|-------------|
| `'custcode'` | Read data from the Cust Code field. |
| `<data>h` | Initialize `<data>` as type `H` to the size of the Cust Code field. |

Read data from two fields, continuing from a prior `@RDL` statement. The `@RLN` automatically reads the line at `<line> + 1`:

```
@rdl,0,b,2,<line>,099 'statusdate','shiporder' <date>i,<order>h .
. (other processing such as IF and GTO)
.
@rln,,099 'statusdate','shiporder' <date>,<order> .
```

| Field | Value | Description |
|-------|-------|-------------|
| `c,d,r` | `0,b,2` | Read from report `2B0`. |
| `l` | `<line>` | Read the line number stored in `<line>`. The following `@RLN` reads `<line> + 1`. |
| `lab` | `099` | Go to label `99` if the line or report does not exist. |
| `cc` | `'statusdate','shiporder'` | Read from the Status Date and Ship Order fields. |
| `<date>i` | | Initialize `<date>` as type `I` to the size of the Status Date field. |
| `<order>h` | | Initialize `<order>` as type `H` to the size of the Ship Order field. |
