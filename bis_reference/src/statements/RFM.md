# RF and @RFM (Reformat Report)

## Overview

Copies columns of data between reports or across drawers. Especially useful for rearranging report columns — create a new report with the desired heading layout, then use `@RFM` to copy columns from the existing report into the correct positions.

For the manual function, the receiving report must be on display in the desired format. The receiving report must contain only heading lines.

### Outcome

- Creates a result containing all data copied from the issuing report to the receiving report.
- Copies line type designators from one report to another.
- If the issuing report contains period lines, the entire line is moved to the receiving report.

---

## Manual Function Syntax

```
RF [report f]
```

| Field | Description |
|-------|-------------|
| `report` | Issuing report. See Specifying Reports or Drawers to Process. |
| `f` | Report format of the issuing report. Enables copying of data in fields beyond column 80. |

---

## Statement Syntax

```
@RFM,ic,id,ir,rc,rd,rr o icc ,ip rcc ,rp .
```

### Parameters

| Field | Description |
|-------|-------------|
| `ic,id,ir` | Issuing report. See Specifying Reports or Drawers to Process. |
| `rc,rd,rr` | Receiving report. |
| `o` | Options. No options are currently available — designate with `' '`. |
| `icc` | Column-character positions or field names in the issuing report of the data to be moved. |
| `ip` | Parameters for the issuing report (`A`–`Z`). See [Parameters](#parameters). |
| `rcc` | Column-character positions or field names in the receiving report where data is to be placed. |
| `rp` | Parameters for the receiving report (`A`–`Z`). See [Parameters](#parameters). |

---

## Parameters

Parameters (`A`–`Z`) indicate which fields to move from the issuing report and where to place them in the receiving report. A maximum of 26 fields can be specified. Enter parameters in order (`A`, `B`, `C`, etc.) in the first column of each field. For each parameter in the issuing report, there must be a corresponding parameter in the receiving report.

---

## Guidelines

- For each parameter in the issuing report, enter a corresponding parameter in the receiving report in the first column of the field.
- Issuing and receiving fields must be the same size. If they differ, adjust by erasing or adding asterisks in the asterisk line. For example, to copy an 8-character field into a 10-character field, erase 2 asterisks from the 10-character field.
- To match fields and optionally move data between two different reports, use [`@MCH`](MCH.md) (Match) or [`@MAU`](MAU.md) (Match Update) instead.
- The receiving report can be in any format, including a temporary format created with the `VIEW` command. However, to access columns beyond column 80 in the issuing report, you must specify a standard format (defined in report 0) in the input screen.
- If you need to copy data beyond column 80 from the issuing report, use a format containing those columns. If additional formats are needed in report 0, see your administrator.

---

## Example

Copy line type designators and fields `a` through `d` from the issuing report into corresponding fields of the receiving report.

**Function mask (issuing report):**
```
*St.Order . Product .Ord.Cust.
*Cd.Number. Type .Qty.Code.
*==.======.=========.===.====.
** ****** ********* *** ****
a  b      c         d
```

**Function mask (receiving report):**
```
*Cust.St.Order .Serial.Ord.
*Code.Cd.Number.Number.Qty.
*====.==.======.======.===.
**** ** ****** ****** ***
d    a  b      c
```

**Equivalent statement:**
```
@rfm,'report1d','report4a' '' 'St','Order','Ord Qty','Cust' |,a,b,c,\
d 'Cust','St','Order','Ord Qty' |,d,a,b,c .
```

**Partial result:**
```
*Cust.St.Order .Serial.Ord.
*Code.Cd.Number.Number.Qty.
*====.==.======.======.===.
AMCO  OR 99951S        2
AMCO  OR 99951S        1
AMCO  OR 99951S        1
ARCO  OR 96652S        1
ARCO  OR 96652S        2
ARCO  OR 96652S        1
DICO  OR 99753S        1
FEDS  OR 99842S        1
FEDS  OR 99842S        1
```
