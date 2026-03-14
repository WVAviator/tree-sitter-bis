# @DVS — Define Variable Size

## Overview

Creates variables equal in size to report fields.

> *(2200 only)* The statement creates a `-0` result and releases any previous `-0` result.

---

## Syntax

```
@DVS[,c,d,r,lab] field[,field,...,field]
v[,v,...,v] .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `c,d,r` | Optional | Report containing the fields for which you want to define corresponding variables. Default = `-0`. |
| `lab` | Optional | Label at which to continue execution if the specified fields are not found. |
| `field` | Required | Name of the report field for which you want to define a corresponding variable. Multiple fields may be specified as a comma-separated list. |
| `v` | Required | Name and type of the variable to define. The system assigns a size equal to the size of the corresponding report field. The first variable corresponds to the first field, the second to the second, and so on. |

---

## Examples

Define variables equal in size to the `Order Number` and `Ord Qty` fields in report `2B0`:

```
@dvs,0,b,2 'ordernumbr','ordqty' <num>s,<qty>i .
```

Define variables equal in size to the same fields in the current result:

```
@dvs 'ordernumbr','ordqty' <num>s,<qty>i .
```

Use variables defined by `@DVS` to build an output area to capture user input:

```
@dvs 'ordernumbr','qty' <num>s,<qty>i .
@brk .
Enter Order Number: <num>,
Enter Quantity: <qty>,
@brk out,-0,2,23,1,1,y,,,p .
@chg input$ <num>,<qty> .
```
