# FORM

## Overview

Displays the format of statements (fields and subfields) by filling in all open function calls in a run control report with abbreviations for the fields and subfields.

---

## Control Line Format

```
FORM
```

Enter the `@` sign and run function call (e.g. `@srh`) in your run control report, then enter `form`.

---

## Outcome

The script fills in all open function calls in the report with abbreviations for the fields and subfields.

---

## Example

Starting the FORM script with some function calls entered:

```
.Run Function Data: Example of use of the FORM command
*========================================================
@SRH
@SOR
@MCH
@DSP
..... END REPORT .....
```

After running FORM, the statement formats are inserted directly into the run control report:

```
.Run Function Data: Example of use of the FORM command
*========================================================
@srh,c,d[,r,l,q,lab] o cc ltyp,p [vlines,vls,vrpt] .
@sor,c,d,r o cc ltyp,p .
@mch,ic,id,ir,rc,rd,rr[,lab] o icc iltyp,ip rcc rltyp,rp .
@dsp,c,d,r[,l,tab,f,interim,hold,msg] .
```
