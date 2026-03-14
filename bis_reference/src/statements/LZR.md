# LZ and @LZR — Line Zero

## Overview

The `LZ` function displays information about a report, such as its number of lines or characters. See [Line Zero Information Screen](#line-zero-information-screen) for an example of the information displayed.

The `@LZR` statement loads variables with information about a report. It is especially useful for determining whether a report exists — specify a label, and if the report does not exist the run continues at that label.

---

## Control Line Syntax

```
LZ [report]
```

where `report` is the report about which to display information. See *Specifying Reports or Drawers to Process* for details.

---

## Statement Syntax

**Windows / Linux / UNIX:**
```
@LZR,c,d,r[,lab vlines,vcpl,vhdgs,,,vdept,vuser,vrpw,vwpw,vlgn,vrtyp] .
```

**2200:**
```
@LZR,c,d,r[,lab vlines,vcpl,vhdgs,vcs,vupds,vdept,vuser,vrpw,vwpw,vlgn,vrtyp] .
```

### Parameters

| Field | Platform | Required | Description |
|-------|----------|----------|-------------|
| `c,d,r` | All | Required | Report about which to obtain information. See *Specifying Reports or Drawers to Process* for details. |
| `lab` | All | Optional | Label to branch to if the report or drawer does not exist. Use this subfield alone to simply check existence (e.g. `@lzr,0,b,3,099`). Use `LIN1` to continue on the next line without specifying a label number. |
| `vlines` | All | Optional | Variable to capture the number of lines. |
| `vcpl` | All | Optional | Variable to capture the number of characters per line. |
| `vhdgs` | All | Optional | Variable to capture the number of heading lines. |
| `vcs` | 2200 only | Optional | Variable to capture the character set type: `0` = LCS, `1` = FCS, `2` = FCSU. |
| `vupds` | 2200 only | Optional | Variable to capture the number of updates to the report since it was created. |
| `vdept` | All | Optional | Variable to capture the department number if the report has a department-private read password. |
| `vuser` | All | Optional | Variable to capture the user ID if the report has a user-private read password. |
| `vrpw` | All | Optional | Variable to capture the read password, or the word `LOCKED` if the report has a read password. |
| `vwpw` | All | Optional | Variable to capture the write password, or the word `LOCKED` if the report has a write password. |
| `vlgn` | Windows / Linux / UNIX | Optional | Variable to capture the report's language number. |
| `vlgn` | 2200 only | Optional | Always contains zero. |
| `vrtyp` | All | Optional | Variable to capture the report type: `0` = Normal, `1` = Binary, `2` = Encoded, `3` = Source-protected (runtime application), `4` = Namelist. |

---

## Outcome

- `@LZR` does not create a result. The previously existing `-0` result remains intact after execution.
- If the report or drawer does not exist, the run continues at the label, or at the next statement if no label is specified.
- `vrpw` and `vwpw` contain `LOCKED` if the report has a read or write password and:
  - *(Windows / Linux / UNIX)* the user is not signed on in department 2 (the BIS coordination department).
  - *(2200)* the user is not signed on with the key user sign-on accessible to administrators.

---

## Reserved Words

> **Note (Year 2000 dates):** When using `STAT1$` and `STAT2$` to read date values from a report, load the values into `H` type variables, right-justified and zero-filled, to ensure correct date processing.

| Condition | STAT1$ | STAT2$ | STAT3$ |
|-----------|--------|--------|--------|
| Report exists | Date of last update in `DATE1$` format (`YYMMDD`) | Creation date in `DATE1$` format (`YYMMDD`) | Save flag date, if one exists. `0` if the save flag contains an invalid date. |
| Report was never updated | `0` | Creation date in `DATE1$` format (`YYMMDD`) | — |
| Report does not exist | Highest report number in the drawer | — | — |
| Drawer does not exist | `0` | — | — |

---

## Line Zero Information Screen

**Windows / Linux / UNIX:**
```
** LINE ZERO INFORMATION **
CABINET ( 0/ 1 )  REPORT ( 2 )  ALPHA/NUMERIC
DRAWER  ( B/ 2 )
. . . .PRIV. PRIVATE . READ .WRITE .LANG. .S.
. LINES.CHRS.HDGS.DEPT. USER . PSWD . PSWD .TYPE.ACCESS .P.
.=======.====.====.====.============.======.======.====.========.=.
   47    80    5    0    0
CURRENT USER LANGUAGE TYPE ( 1 )
```

**2200:**
```
** LINE ZERO INFORMATION **
CABINET ( 0/1 )  REPORT ( 2)  ALPHA/NUMERIC  DRAWER (B/000002)
. . . .CHAR. .PRIV. PRIVATE . READ .WRITE . .
.LINES.CHRS.HDGS.TYPE.UPDATES.DEPT. USER . PSWD . PSWD .ACCESS.
.=====.====.====.====.=======.====.============.=====.======.======.
  47   80    5   FCS    5                              LOCKED
```

### Information Screen Fields

| Field | Platform | Description |
|-------|----------|-------------|
| Cabinet | All | Cabinet in which the report is stored. |
| Report | All | Number of the report. Contains `-0` if displaying information about a result. |
| Drawer | All | Drawer in which the report is stored. |
| Lines | All | Total number of lines in the report. |
| Chrs | All | Number of character positions per line. |
| Hdgs | All | Number of heading lines. |
| Char Types | 2200 only | Character set of the report or result. |
| Updates | 2200 only | Number of updates made since the report was last replaced (or since creation if never replaced). |
| Priv Dept | All | Department number that placed a department-private read-access password on the report. Blank if none. |
| Private User | All | User ID of the user who placed a user-private read-access password on the report. Blank if none. |
| Read Pswd | Windows / Linux / UNIX | `LOCKED` if the report has a read-access password and you are not signed on in department 2. Blank if no restriction exists. |
| Read Pswd | 2200 only | `LOCKED` if the report has a read-access password and you are not signed on with the key user sign-on. Blank if no restriction exists. |
| Write Pswd | Windows / Linux / UNIX | `LOCKED` if the report has a write password and you are not signed on in department 2. Blank if no password exists. |
| Write Pswd | 2200 only | `LOCKED` if the report has a write password and you are not signed on with the key user sign-on. Blank if no password exists. |
| Lang Type | Windows / Linux / UNIX | Language number with which the drawer was created. `0` if no language was specified. |
| Access | Windows / Linux / UNIX | Blank for standard reports with open access. Limited-access reports (encoded, binary) are not displayed or processed. Source-protected reports show `RUN-TIME`. |
| Access | 2200 only | Blank for standard reports. Restricted reports show a descriptive word indicating the access type (e.g. `ENCODED`). |
| SP | Windows / Linux / UNIX | For internal use. |
| Current User Language Type | Windows / Linux / UNIX | Number code of the language the user is currently using. Use the `Language` command to see available languages. |

---

## Example

Capture information about report `2B0`:

```
@lzr,0,b,2,099 <lines>i4,<chars>i3,<hdgs>i1 .
```

| Part | Description |
|------|-------------|
| `0,b,2` | Obtain information about report `2B0` |
| `099` | Branch to label 099 if the report does not exist |
| `<lines>i4` | Load `<lines>` with the number of lines |
| `<chars>i3` | Load `<chars>` with the number of characters per line |
| `<hdgs>i1` | Load `<hdgs>` with the number of heading lines |
