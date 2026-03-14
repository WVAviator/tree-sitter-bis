# @RDC (Read Continuous)

## Overview

Reads report lines or line segments and loads variables with the data. The statement generates one line in the output area for each line it reads from the input report.

> **Note:** Use only one line in the output area for the variables to be written by the `@RDC` statement.

---

## Syntax

```
@RDC,c,d,r[,l,q,ltyp,lab,contin?] cc vdata .
```

### Parameters

| Field | Description |
|-------|-------------|
| `c,d,r` | Report from which lines are to be read. |
| `l` | Line number at which to start reading. Default = line `1`. |
| `q` | Number of lines to read. Default = all lines. |
| `ltyp` | Line type to read. Default = all types. |
| `lab` | Label to go to if the starting line or report does not exist. If no label is specified and the starting line or report does not exist, the run continues. |
| `contin?` | Recognize a backslash (`\`) as a continuation character on the output line? `Y` or `N`. Default = `N`. |
| `cc` | Column-character positions or field names to read. Fields do not need to be specified left to right, but variables in `vdata` must be assigned in matching sequence. |
| `vdata` | Variables to capture the data. Maximum = 80 variables. |

---

## Guidelines

- The `@RDC` statement must be followed by an output line. The statement executes in the following sequence: reads a line → places data in variables → writes data to the output area → reads the next line.
- To have the run automatically initialize a variable to the size of a field, specify only the variable name and type (e.g., `<data1>h`, `<data2>s`). The `@RDC` statement initializes the variable to the appropriate field size.
- When loading variables of a specified size, the variable size determines the number of columns read — not the `cc` field width. For example, in the following statement `<data>` captures 10 characters starting at column 5, even though only 2 characters are specified in `cc`:
  ```
  @rdc,0,b,2 5-2 <data>h10 .
  ```
- *(2200 only)* Columns that exceed the line size of the report being read are ignored and are not considered an error condition.

---

## Examples

### Read all lines

Read all lines of the current result, capture data in `<data>`, and write to the output area:

```
@rdc,-0 1-256 <data>s256 .
<data>
```

### Reformat data

Read heading lines from report `0D0` starting at line 18, then read data from report `0B2` and reformat in the output area:

```
@brk,0,d .
@rdc,0,d,0,18,4 1-132 <heading>s132 .
<heading>
@rdc,0,b,2,6 1-80 <data>s80 .
<data>(1-3)<data>(38-6) <data>(14-11) <data>(44-6)
@brk .
```

### Place fields under headings

Read data from named fields in report `2B0`, starting at line 6, scanning 50 tab lines, and place the data in the output area under headings:

```
Shipping Order          Date Last Status Change
@rdc,0,b,2,6,50,|,099 'statusdate','shiporder' <date>i,<order>h .
<order>          <date>
```

| Field | Value | Description |
|-------|-------|-------------|
| `c,d,r` | `0,b,2` | Read lines from report `2B0`. |
| `l` | `6` | Start reading at line 6. |
| `q,ltyp` | `50,\|` | Scan 50 lines, reading tab lines only. |
| `lab` | `099` | Go to label `99` if line 6 or the report does not exist. |
| `cc` | `'statusdate','shiporder'` | Read data from the Status Date and Ship Order fields. |
| `<date>i` | | Initialize `<date>` as type `I` to the size of the Status Date field. |
| `<order>h` | | Initialize `<order>` as type `H` to the size of the Ship Order field. |
