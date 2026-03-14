# TOT and @TOT — Totalize

## Overview

Performs arithmetic and move operations on fields in reports. The following are some of the operations available:

- Adding, subtracting, multiplying, or dividing field values by a constant.
- Computing horizontally and vertically.
- Subtotaling fields when key fields change.
- Changing the line type.
- Counting entries.
- Copying data from one field to another.
- Changing, computing, or copying data in an update result, then merging changes into the original report.

> You can use the [ITOT](ITOT.md) (Iterative Totalize) run to save and reuse Totalize function masks containing options and parameters, and to create `@TOT` statements.

---

## Syntax

### Control Line
```
TOT [report f]
```

| Field | Description |
|-------|-------------|
| `report` | Report to process. See *Specifying Reports or Drawers to Process*. |
| `f` | Report format in which to totalize data. Enables processing of fields beyond column 80 if those columns are not already on display. |

### Statement
```
@TOT,c,d,r[,lab] o cc ltyp,p [vrslts] .
```

| Field | Description |
|-------|-------------|
| `c,d,r` | Report to process. See *Specifying Reports or Drawers to Process*. |
| `lab` | Label to go to if no data on which to operate is found. |
| `o` | Options field. See [Options](#options). |
| `cc` | Column-character positions or names of the fields to process. |
| `ltyp` | Line type to process. If the `A` option is specified, this subfield may be left blank, but the following comma must still be entered. |
| `p` | Parameters (operators) to use. See [Parameters](#parameters). |
| `vrslts` | Variables to capture the totals. If specified, the statement does not create a result. |

---

## Options

| Option | Platform | Description |
|--------|----------|-------------|
| `A` | All | Processes all line types. |
| `B` | All | Space-fills duplicate line occurrences of a subtotal parameter. |
| `C` | Windows / Linux / UNIX | Displays a subtotal if the value in the subtotal key field changes case. Use with the `S` parameter only. |
| `C` | OS 2200 | Same as above. Applies to full character set (FCS) reports only. |
| `E` | All | Counts entries. In the `@TOT` statement, the first variable contains the entry count. See [Numbering Lines Example](#numbering-lines). |
| `H` | All | Cumulates horizontally. See [Cumulating with Grand Totals Example](#cumulating-with-grand-totals). |
| `I` | All | Ignores the check for headings; starts processing on line 2 even if no heading divider lines exist. |
| `J(x)` | All | Justifies numeric result values in fields. `x` values: `c` — eliminate leading/nonsignificant zeros, insert commas every three digits (if field is large enough); `l` — eliminate leading/nonsignificant zeros and commas, left-justify; `r` — eliminate leading/nonsignificant zeros and commas, right-justify; `x` — eliminate leading zeros and commas, left-justify, fill with nonsignificant zeros; `z` — eliminate leading/nonsignificant zeros and commas, right-justify, fill leading spaces with zeros. |
| `N` | All | Inserts three blank comment lines between subtotal groups and omits the grand total. Can be used with the `S` option. |
| `O` | All | Omits all data from the result, displaying only subtotal and grand total information. With the `S` option, places the vertical subtotal in the requested fields, displays the last line of each subtotal, and omits the grand total. See [Subtotaling Data Example](#subtotaling-data). |
| `Rn` | All | Rounds numbers to the nearest `n`. Use with the `E` option to round entry counts. Range: `.0000000000000001` to `100000000000`. Example: `r.001` rounds to the nearest thousandth; `r10000` rounds to the nearest 10,000. See [Rounding Result Values Example](#rounding-result-values). |
| `S` | All | Places subtotals in vertical operation fields. Enables subtotaling up to 5 fields (S1–S5). The last line of each subtotal shows the result. |
| `=x` | All | Changes the line type indicator in column 1 to `x`, where `x` is an asterisk, period, or alphanumeric character. If the only operation is a line type change, leave the `p` field blank but enter two apostrophes to indicate a blank field. |
| `*` | Windows / Linux / UNIX | Omits all flags otherwise inserted immediately after subtotal results (but not the grand total). A `*` flag indicates at least one blank or nonnumeric item was processed. |
| `*` | OS 2200 | Same as above. A space flag indicates all items processed were valid numeric data. |

---

## Parameters

Up to 80 operations may be performed in any one parameter line; up to two parameter lines may be used.

| Parameter | Description |
|-----------|-------------|
| `+` | Add; flag the field to operate on (e.g., the field to divide into). |
| `-` | Subtract. |
| `*` | Multiply. |
| `'/'` | Divide. (Enclose the slant in apostrophes in the `@TOT` statement.) Divide by zero and divide by one produce the same result (e.g., 5/0 = 5). |
| `=` | Total horizontally, fill fields, or number sequentially. |
| `A` | Average. Blanks are not considered zeros. See [Averaging Fields and Counting Entries Example](#averaging-fields-and-counting-entries). |
| `C` | Cumulate data or sequence data lines. See [Cumulating with Grand Totals Example](#cumulating-with-grand-totals) and [Numbering Lines Example](#numbering-lines). |
| `D` | Delete commas. |
| `E` | Count entries and display the number at the end of the result. See [Averaging Fields and Counting Entries Example](#averaging-fields-and-counting-entries). |
| `I` | Insert commas. |
| `M` | Copy data. See [Copying Fields Example](#copying-fields). |
| `S` | Place subtotals in vertical operation fields. Key field size can be up to the length of the report line. |
| `S1`–`S5` | Hierarchical subtotal. Key field size can be up to the length of the report line. See [Hierarchical Subtotaling Example](#hierarchical-subtotaling) and [Hierarchical Subtotaling and Combining Key Example](#hierarchical-subtotaling-and-combining-key). |

---

## Outcomes

Executing the Totalize command causes the following:

- Operations are processed and a result is created.
- Results of vertical operations are placed at the end of the result.
- Whenever at least one field item in a vertical operation contains nonnumeric data or no value (blank), an asterisk is placed next to the result as a flag indicating invalid data.

When using the `@TOT` statement specifically:

- Calculations are performed and variables are loaded with results. A `-0` result is not created unless no variables are specified.
- If the `E` option is used, the first variable contains the entry count.

---

## Procedures

### Computing Horizontally

1. Type `+` in the field containing the data to add to, subtract from, multiply, or divide into.
2. Type `+` to add, `-` to subtract, `*` to multiply, or `/` to divide in the respective fields.
3. Type `=` in the field to contain the result.

To receive a grand total at the end of the report, type `+` in the line directly below the equal sign in the field to be totaled.

> **Note:** Only one horizontal operation can be performed at a time.

### Computing Horizontally with Constant Values

1. Type the operator (`+`, `-`, `*`, `/`) and the constant value in the field to process. To subtract a constant, type a plus sign before the minus (e.g., `+-2` to subtract 2).
2. Type `=` in the field to contain the result. To place the result in the same field, type `=` in the line below the operator.

> **Note:** If the constant value includes a decimal, precede the decimal point with a zero (e.g., `0.1`).

### Copying Fields

1. Type `m` in the issuing field (the field to copy).
2. Type `=` under the first asterisk in the receiving field.

The receiving fields must be the same width as the field being copied. Add or erase asterisks under the field headings to match sizes.

### Filling Fields with Specific Data

Uses the `=` parameter. The `=` parameter offsets the specified data by one character, so the following tab in the mask is treated as part of the inserted data unless erased.

1. Type `=` under the asterisk of the first column in the field to fill.
2. Type the data to be filled.
3. Erase the tab character in the mask that follows the field being filled.

> **Notes:**
> - Other fields cannot have arithmetic or move symbols.
> - To fill a field with spaces, type `=` under the first asterisk and erase the next tab character in the mask.

### Displaying Vertical Subtotals

Uses the `S` option and `S`/`+` parameters to display subtotals at each line where a specified key field changes value.

1. Type `s` in the options field above the mask.
2. Type `s` in the subtotal key field.
3. Type `+` in one or more fields to add. Subtotaling restarts each time the key field value changes.

To average instead of sum, use the `A` parameter in place of `+`.

The result includes three lines between each subtotal key group: an asterisk line with dashes in processed fields, a subtotal line with the word `SUBTOTAL` below each key and the subtotals under processed fields, and a blank period line. Use the `N` option to insert three blank lines between groups instead.

To display only subtotals and the grand total, use the `O` option with the `S` option.

### Combining Subtotal Key Fields

1. Type `s` in the options field.
2. Type `s` under each subtotal key field to combine (up to five).
3. Type `+` in the fields to add.

Subtotaling restarts whenever values in any of the combined key fields change.

### Subtotaling Hierarchically

Assign a hierarchy of up to five key fields (`S1`–`S5`). When a lower-level key field (e.g., `S2`) changes, its subtotal is displayed. When a higher-level key field (e.g., `S1`) changes, a subtotal of the previous subtotals is displayed.

Use `s1` through `s5` under the key fields you want to subtotal hierarchically. If a higher-level key stays the same while a lower-level key changes, the higher-level subtotaling continues as long as its value remains unchanged.

To subtotal hierarchically on combined key fields, place the same hierarchical parameter in the fields to combine:

```
s
* Product . Sub . .Space. Demo . .
* Type . Key . . Req . Quantity . Demo Results .
*=========.=====. . . .
.=====.==========.===============.
s1        s1     s2               +
```

In this mask, Product Type and Sub Key are combined as the primary key (`s1`), and Space Req is the secondary key (`s2`).

---

## Examples

### Computing Vertically

Computes the total of the Sales Commiss field.

```
@tot,'report1c' '' 42-7 |,+ .
```

To capture entry count and total in variables without creating a result:

```
@tot,'report1c' e 42-7 |,+ <entries>i4,<sum>i7 .
```

Result (partial):
```
* Product . Sub .Produc. Whole . Retail . Sales .
* Type . Key . Cost . Sale$ . $$$$ .Commiss.
*=========.=====.======.=======.========.=======.
BLACKBOX1 A  13500  16875  23625  2362.50
BLACKBOX2 A  13600  17000  23800  2380.00
...
GREENBOX9 K  15300  19125  26775  2677.50
.
.GRAND-TOTAL . Sales Commiss = 44730.0000000
```

---

### Computing Horizontally

Subtracts Demo Quantity from Space Req and places results in Demo Results.

```
@tot,'report1c' '' 50-5,56-8,65-15 |,+,-,= .
```

| Parameter | Description |
|-----------|-------------|
| `+` | Subtracts from this field. |
| `-` | Identifies the field to subtract. |
| `=` | Places the result in this field. |

Partial result:
```
BLACKBOX1 A  13500  100  1   99
BLACKBOX2 A  13600  110  2  108
BLACKBOX3 A  13700  120  4  116
```

---

### Cumulating with Grand Totals

Accumulates sums of Space Req and Demo Quantity horizontally, listing the running grand total in Demo Results.

```
@tot,'report1c' h 50-5,56-8,65-15 |,+,+,c .
```

| Element | Description |
|---------|-------------|
| `h` | Cumulates horizontally. |
| `+...+` | Adds and accumulates sums in these fields. |
| `c` | Accumulates a running grand total in this field. |

Partial result:
```
BLACKBOX1 A  13500  2362.50  100    1   101
BLACKBOX2 A  13600  2380.00  110    2   213
BLACKBOX3 A  13700  2397.50  120    4   337
```

---

### Multiplying Two Fields

Multiplies Space Req by Demo Quantity and places results in Demo Results.

```
@tot,'report1c' '' 50-5,56-8,65-15 |,+,*,= .
```

| Parameter | Description |
|-----------|-------------|
| `+` | Identifies a field to multiply. |
| `*` | Identifies the other field to multiply. |
| `=` | Places the result in this field. |

Partial result:
```
BLACKBOX1 A  13500  2362.50  100      1    100
BLACKBOX2 A  13600  2380.00  110      2    220
BLACKBOX3 A  13700  2397.50  120      4    480
BLACKBOX4 B  13800  2415.00  130     10   1300
BLACKBOX5 B  13900  2432.50  140     50   7000
BLACKBOX6 C  14000  2450.00  150    100  15000
```

---

### Computing Horizontally Using a Constant Value

Divides all Demo Quantity values by 2 and places results back into Demo Quantity.

```
@tot,'report1c' '' 56-8 |,'/'2/|,= .
```

| Parameter | Description |
|-----------|-------------|
| `/2` | Divides all values in this field by 2. |
| `=` | Places the result in the same field. |

Partial result:
```
BLACKBOX1 A  13500  16875  23625  2362.50  100  0.500000
BLACKBOX2 A  13600  17000  23800  2380.00  110  1
BLACKBOX3 A  13700  17125  23975  2397.50  120  2
```

---

### Copying Fields

Copies values from Space Req to both Demo Quantity and the last five characters of Demo Results.

```
@tot,'report1c' '' 50-5,59-5,75-5 |,m,=,= .
```

| Parameter | Description |
|-----------|-------------|
| `m` | Copies this field. |
| `=` | Identifies the fields in which to copy the data. |

> **Note:** Receiving fields must be the same size as the field being copied. Asterisks were erased to make the fields the same size.

Partial result:
```
BLACKBOX1 A  13500  2362.50  100  100  100
BLACKBOX2 A  13600  2380.00  110  110  110
BLACKBOX3 A  13700  2397.50  120  120  120
```

---

### Numbering Lines

Numbers lines sequentially in the Sub Key field.

```
@tot,'report1c' e 12-5 |,c .
```

| Element | Description |
|---------|-------------|
| `E` | Counts data lines of the type being processed. |
| `c` | Numbers the data lines sequentially in this field starting with 1. |

Partial result:
```
BLACKBOX1  1
BLACKBOX2  2
BLACKBOX3  3
BLACKBOX4  4
```

---

### Filling Fields with Data You Specify

Fills Product Type with spaces, the third character of Space Req with `5`, Demo Quantity with left-justified `abcd`, and the last character of Demo Results with `1`.

```
@tot,'report1c' '' 2-9,50-5,56-8,79-1 |,=,'= 5',=abcd,=1 .
```

> **Note:** Tab erasure from the function mask does not apply in the statement; an extra tab will not follow `abcd`.

Partial result:
```
|  |  | 5|abcd  | 1
|  |  | 5|abcd  | 1
```

---

### Subtotaling Data

Subtotals Demo Quantity values, restarting whenever the Sub Key field changes. The `O` option displays only the last line of each key group plus its subtotal.

```
@tot,'report1c' so 12-5,56-8 |,s,+ .
```

| Element | Description |
|---------|-------------|
| `so` | Displays the last line of each subtotal key group along with the subtotal. |
| `s` | Identifies the subtotal key field. |
| `+` | Adds values until the key field changes, then restarts. |

Partial result:
```
BLACKBOX3  A    7
BLACKBOX5  B   60
BLACKBOX7  C  110
```

---

### Horizontal Computations and Subtotaling

Divides Space Req by Demo Quantity and keeps a running total in Demo Results. Restarts when Sub Key changes.

```
@tot,'report1c' s 12-5,50-5,56-8,65-15 |,s,+,'/',= .
```

| Element | Description |
|---------|-------------|
| `s` | Requests subtotaling. |
| `s` (param) | Identifies the subtotal key field. |
| `+` | Identifies the field to divide into. |
| `'/'` | Identifies the field to divide by. |
| `=` | Accumulates division results in this field. |

Partial result:
```
BLACKBOX1  A  100   1  100
BLACKBOX2  A  110   2  155
BLACKBOX3  A  120   4  185
BLACKBOX4  B  130  10   13
BLACKBOX5  B  140  50   15.800000000000
```

---

### Rounding Result Values

Same as the previous example, but rounds results to the nearest thousandth using `r.001`.

```
@tot,'report1c' sr.001 12-5,50-5,56-8,65-15 |,s,+,'/',= .
```

Partial result:
```
BLACKBOX1  A  100   1  100.000
BLACKBOX2  A  110   2  155.000
BLACKBOX3  A  120   4  185.000
BLACKBOX4  B  130  10   13.000
BLACKBOX5  B  140  50   15.800
```

---

### Averaging Fields and Counting Entries

Counts Sub Key entries and averages Sales Commiss values, placing count and average at the end of the result. Uses `r.01` to round to the nearest hundredth.

```
@tot,'report1c' r.01 12-5,42-7 |,e,a .
```

Result (end):
```
.GRAND-TOTAL .ENTRIES = 18.00
.             Sales Commiss - AVERAGE = 2485.00
```

---

### Combining Two Subtotal Fields

Combines Code1 and Code2 as subtotal key fields. A subtotal is displayed and restarted whenever either field changes.

```
@tot,'report3a' s 2-5,8-5,14-6 |,s,s,+ .
```

Sample database:
```
*Code1.Code2.Number.
*=====.=====.======.
one    a      22
one    a       2
two    a       5
two    b       5
two    b       4
```

Result:
```
one    a      22
one    a       2
*----- ----- -----*subto a  24
.
two    a       5
*----- ----- -----*subto a   5
.
two    b       5
two    b       4
*----- ----- -----*subto b   9
.
*GRAND -  38
```

---

### Hierarchical Subtotaling

Displays a subtotal of Number when Code2 changes, and a subtotal of those subtotals when Code1 changes.

```
@tot,'report3a' s 2-5,8-5,14-6 |,s1,s2,+ .
```

Result:
```
one    a   22
one    a    2
*----- ----- -----* a  24
*one  24
.
two    a    5
*----- ----- -----* a   5
.
two    b    5
two    b    4
*----- ----- -----* b   9
*two  14
.
*GRAND -  38
```

---

### Hierarchical Subtotaling and Combining Key

Combines Product Type and Sub Key as the primary key (`s1`), with Space Req as the secondary key (`s2`).

```
@tot,'report1c' s 2-9,12-5,50-5,56-8 |,s1,s1,s2,+ .
```

Partial result:
```
BLACKBOX1  A  13500  16875  23625  2362.50  100  1
*--------- ----- ----- -------*               100  1
*BLACKBOX1 A  1
.
BLACKBOX2  A  13600  17000  23800  2380.00  110  2
*--------- ----- ----- -------*               110  2
*BLACKBOX2 A  2
```
