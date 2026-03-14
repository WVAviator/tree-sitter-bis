# FCC — Field Column Count

## Overview

Displays the field headings of a report along with the position of the first character in each field and the size of each field.

---

## Control Line Format

```
FCC
```

---

## Guidelines

- Take note of the column-character positions. Print the result for future reference if needed.
- To redisplay the original report, press **Resume**.

---

## Example

The following is an example of the screen displayed when starting this command with report `2B0` on display:

```
Line> 1  Roll> RESULT
.DATE 01 JUN 90 05:01:10  REPORT GENERATION  NEWUSER
.CABINET (0) DRAWER (B) REPORT (2) CHARACTERS (80)
*St.Status.By. Product  .Serial.Produc.Order.Cust.Produc.Produc. Ship .
*Cd. Date .In. Type     .Number. Cost .Numbr.Code. Plan .Actual. Date .
*==.======.==.=========.======.======.=====.====.======.======.======.
2-2  12-2  25-6  32-6  39-5  45-4  50-6  57-6  64-6
5-6  15-9
..... END REPORT .....
```
