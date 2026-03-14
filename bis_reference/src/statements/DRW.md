# @DRW — Drawer

## Overview

Loads variables with information about a drawer, including: number of characters per line, next available report to be added, highest report number, and the report and line limits.

---

## Syntax

**Windows / Linux / UNIX:**
```
@DRW,c,d[,lab
vcpl,,,,vnxrd,vhirptd,vlnd,vrptsd,vrlmt,vllmt,
vrslt,vdrw] .
```

**2200:**
```
@DRW,c,d[,lab
vcpl,vcs,vmfno,vmfn,vnxrd,vhirptd,vlnd,vrptsd,
vrlmt,vllmt,vrslt,vdrw] .
```

### Parameters

| Field | Platform | Required | Description |
|-------|----------|----------|-------------|
| `c,d` | All | Required | Cabinet and drawer to process. |
| `lab` | All | Optional | Label to branch to if the drawer does not exist. |
| `vcpl` | All | Optional | Variable to capture the number of characters per line. |
| `vcs` | 2200 only | Optional | Variable to capture the character set type: `0` = LCS, `1` = FCS, `2` = FCSU. |
| `vmfno` | 2200 only | Optional | Variable to capture the MAPER file number (e.g. `1`, `2`, or `3`) where the drawer resides. MAPER files are OS 2200 program files where the database resides. |
| `vmfn` | 2200 only | Optional | Variable to capture the internal MAPER file name (e.g. `M000`, `M00002`, or `M00003`) where the drawer resides. |
| `vnxrd` | All | Optional | Variable to capture the next report number available in the drawer (to be used if a report is added). |
| `vhirptd` | All | Optional | Variable to capture the highest report number used in the drawer. |
| `vlnd` | All | Optional | Variable to capture the total number of lines in the drawer. |
| `vrptsd` | All | Optional | Variable to capture the total number of reports in the drawer. |
| `vrlmt` | All | Optional | Variable to capture the maximum report number allowed in the drawer. |
| `vllmt` | All | Optional | Variable to capture the maximum number of lines allowed in each report. |
| `vrslt` | All | Optional | Variable to capture the maximum number of lines allowed in each result. |
| `vdrw` | All | Optional | Variable to capture the drawer description. |

---

## Outcome

- **If the drawer exists:** The specified variables are loaded. `STAT1$` contains the number of the highest report in the drawer.
- **If the drawer does not exist:** The run continues at the specified label. If no label is given, the run continues at the next statement. `STAT1$` = `0`.

---

## Example

Load `<chrs>` with the number of characters per line in cabinet `0`, drawer `B`. If the drawer does not exist, the run continues at label `5`:

```
@drw,0,b,005 <chrs>i3 .
```
