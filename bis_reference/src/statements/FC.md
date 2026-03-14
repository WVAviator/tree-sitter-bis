# FC and @FC — Format Columns

## Overview

Performs justification of text within one or more columns of a report. Two categories of justification are available: column justification and case justification.

> **Note:** Any column can contain a maximum of one column justification parameter and one case justification parameter.

---

## Column Justification

Applies to alphanumeric text.

| Parameter | Description |
|-----------|-------------|
| `L` | Left justify. |
| `R` | Right justify. |
| `C` | Center. |

---

## Case Justification

Applies to alphabetic text only.

| Parameter | Description |
|-----------|-------------|
| `U` | Uppercase. |
| `O` | Lowercase. |
| `F` | Lowercase with the first character of the first word uppercased. |
| `W` | Lowercase with the first character of each word uppercased. |

---

## Options

| Option | Description |
|--------|-------------|
| `A` | Process all line types. |
| `C` | Ignore case parameters (`O`, `F`) if the report is LCS or FCSU. If these reports contain lowercase characters, an error message is displayed. |
| `I` | Inhibit processing of invalid data. Leaves a column unformatted when the data in that field begins with a plus sign, minus sign, period, or number. |

---

## Syntax

```
@FC,c,d,r[,lab] o cc ltyp,p [vlines,vinvalid]
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `c,d,r` | Required | Report to format. |
| `lab` | Optional | Label to branch to if no valid lines are found. |
| `o` | Optional | Options field. See [Options](#options). |
| `cc` | Required | Column-character positions or field names. |
| `ltyp` | Required | Line type to process. |
| `p` | Required | Justification parameters. See [Column Justification](#column-justification) and [Case Justification](#case-justification). |
| `vlines` | Optional | Variable to capture the number of lines processed. |
| `vinvalid` | Optional | Variable to capture the number of invalid lines found. |

---

## Example

Left-justify and apply `F` case formatting (lowercase, first word capitalized) to the Product Type column, and center-justify with lowercase (`O`) the Sub Key column.

Function mask:
```
.@271231 Factors Base Report Corporate Factors Base C000004
* Product . Sub .Produc. Whole . Retail . Sales .Space. Demo .             .
* Type    . Key . Cost  . Sale$ . $$$$ .Commiss. Req  .Quantity. Demo Results .
*=========.=====.======.=======.========.=======.=====.========.===============.
|LF       |CO   |      |       |        |       |     |        |               |
```

Equivalent statement:
```
@fc, 'report1c' 'Product Type','Sub Key' , LF,CO
```

Partial result:
```
* Product . Sub .Produc. ... . Sales .Space. Demo .             .
* Type    . Key . Cost  . ... .Commiss. Req  .Quantity. Demo Results .
*=========.=====.======. ... .=======.=====.========.===============.
Blackbox1    a    13500   2362.50   100   101   101
Blackbox2    a    13600   2380.00   110   112   213
Blackbox3    a    13700   2397.50   120   124   337
Blackbox4    b    13800   2415.00   130   140   477
Blackbox5    b    13900   2432.50   140   190   667
```
