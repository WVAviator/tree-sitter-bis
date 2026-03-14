# MA and @MCH — Match / MAU and @MAU — Match Update

## Overview

The `MA` function or `@MCH` statement compares data in one or more fields of two reports and optionally copies data from an issuing report to a receiving report, creating a result.

The `MAU` function or `@MAU` statement creates an **update result**, enabling you to [`@DEL`](DEL.md) (Delete) or [`@EXT`](EXT.md) (Extract) found lines from the report, or [`@UPD`](UPD.md) (Update) the found lines and blend them back into the report.

The command:
1. Compares fields in the receiving report to corresponding fields in the issuing report, creating a result with the same headings and data line order as the receiving report.
2. If data copying is specified, copied data appears in the result. When a matched item occurs in multiple issuing report lines, the data copied is from the last matched line of the group.
3. Locks both reports during the match process to prevent changes by other users.
4. Inserts at the top of the result: the number of matches or non-matches (depending on options selected) and the number of lines compared. Use the `D` option to omit this information.

When using the `MA` or `MAU` manual function, the receiving report must be on display. Use the `I` option if the issuing report is displayed instead.

---

## Control Line Syntax

```
MA [report f]
MAU [report f]
```

### Parameters

| Field | Description |
|-------|-------------|
| `report` | Issuing report, or the receiving report if the `I` option is used. See *Specifying Reports or Drawers to Process* for details. |
| `f` | Report format in which to match data — enables matching fields beyond column 80 in the second report. |

---

## Statement Syntax

```
@MCH,ic,id,ir,rc,rd,rr[,lab] o icc iltyp,ip rcc rltyp,rp .
@MAU,ic,id,ir,rc,rd,rr[,lab] o icc iltyp,ip rcc rltyp,rp .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `ic,id,ir` | Required | Issuing report. See *Specifying Reports or Drawers to Process* for details. |
| `rc,rd,rr` | Required | Receiving report. |
| `lab` | Optional | Label to branch to if either report is not sorted. Valid only with the `P` option. |
| `o` | Required | Options field. See [Options](#options). The `D` option is always assumed with `@MCH`. |
| `icc` | Required | Column-character positions or field names in the issuing report. |
| `iltyp` | Optional | Line type in the issuing report to match against. If using the `A` option, leave blank but include the comma. |
| `ip` | Optional | Parameters for the issuing report. See [Parameters](#parameters). |
| `rcc` | Required | Column-character positions or field names in the receiving report. |
| `rltyp` | Optional | Line type in the receiving report to match against. If using the `A` option, leave blank but include the comma. |
| `rp` | Optional | Parameters for the receiving report. See [Parameters](#parameters). |

---

## Options

| Option | Platform | Description |
|--------|----------|-------------|
| `A` | All | Matches all line types. |
| `B` | All | Blends issuing and receiving report lines in the result. Data must be presorted. Do not use with `M` or `N`. Not valid with `@MAU`. |
| `C(S)` | All *(2200: FCS reports only)* | Distinguishes between uppercase and lowercase letters. |
| `D` | All | Deletes match information lines from the result. Always assumed with `@MCH`. |
| `E` | All | Does not move blank fields from the issuing report. For matched items in multiple issuing lines, if the last item of the group is blank, the data is not moved. |
| `F` | All | Does not fill move fields in a no-match condition. Invalid with `M` or `N`. |
| `I` | All | Specifies that the issuing report (rather than the receiving report) is on display. With `@MCH`, reverses the positions of issuing and receiving report in the syntax. Useful only with the manual function. |
| `L(x)` | All | Omits lines of type `x` from the result. Multiple line types can be combined (e.g. `L(*.A)` omits asterisk, period, and A-type lines). Omitted lines still count toward the total number of finds. If `C(S)` is specified, line type letters are case-sensitive. |
| `M` | All | Includes in the result only lines where fields match between the two reports. Do not use with `B`. Default for `@MAU`. See [Moving Columns in Lines That Match](#moving-columns-in-lines-that-match). |
| `N` | All | Includes in the result only lines where fields do not match. Do not use with `B`. See [Finding Lines That Do Not Match](#finding-lines-that-do-not-match). |
| `P` | All | Specifies that issuing and receiving reports are presorted by the fields to match. Do not use with `Q`. See [Guidelines](#guidelines). |
| `Q` | All | Quick execution — assumes data is presorted without verifying. Do not use with `P`. |
| `S` | All | Includes in the result only matching lines, appearing in the same order as the issuing report. |

---

## Parameters

Non-date field lengths must be identical between issuing and receiving reports. Date fields must be at least as wide as the size defined for the selected date format. When using the manual function, adjust field sizes by erasing or adding asterisks in the function mask.

| Parameter | Description |
|-----------|-------------|
| `1`–`5` | Specifies the sequence of fields to match, starting with `1`. Type each parameter in the first column of the field. |
| `A[n]`–`Z[n]` | Specifies the sequence of fields to copy, starting with `A`. The optional `[n]` defines fill characters inserted into the receiving field when match parameters do not match. `[n]` is not valid with `@MAU`. |
| `Yn` | Defines a date field to process. `n` is the date format number (`0`–`20` on Windows/Linux/UNIX; `0`–`21` on 2200). Must immediately follow the parameter identifying the match or move field. Invalid dates do not match other invalid dates; blank fields are considered invalid. *(2200 only)* Issuing date fields containing invalid dates appear as asterisks in receiving fields when moved. A receiving move field may specify either fill characters or a date format after the field letter, but not both. See *Entering Dates and Times in the DC Statement* for a complete list of date formats. |

---

## Reserved Words

| Variable | Description |
|----------|-------------|
| `STAT1$` | Number of lines in the receiving report that are matched or not matched, depending on selected options. |
| `STAT2$` | Total number of lines in the receiving report against which a match was attempted. |

---

## Guidelines

- Use the `P` option when fields to match are presorted — this increases efficiency and is required when matching two different line types.
- *(Windows / Linux / UNIX)* If match fields are not presorted, the system performs an internal sort on both reports and restores the receiving report to its original order after processing. Use `P` or `Q` whenever possible.
- *(2200)* Same as above, with a maximum of 156 characters sorted internally.
- To flag no-match fields, enter fill characters (e.g. asterisks or zeros) after the alphabetic parameters in the receiving mask or `rp` subfield. See [Flagging a No-Match Occurrence](#flagging-a-no-match-occurrence).
- The displayed report can be in any format including a temporary format, but to access columns beyond column 80 in the other report, specify a standard format (defined in report 0) in the input screen.
- To match or copy data in the issuing report beyond column 80, either display those columns using the Create Temporary Format command with the `I` option, or use a format containing the required columns.

### Creating an Update Result

Use `MAU` to create an update result. `@MAU` uses the same fields and subfields as `@MCH`. The update result can be processed as follows:

- Delete matched lines from the original report using [`@DEL`](DEL.md).
- Delete and redisplay using [`@EXT`](EXT.md).
- Merge updated lines back into the original report using [`@UPD`](UPD.md). For faster updating, use the Totalize command to fill fields with dates, status codes, etc. before calling `@UPD`.

---

## Examples

### Matching and Moving Items in Fields

Copy a field when items in two other fields match between reports `1D0` (issuing) and `2B0` (receiving):

```
@mch,'report1d','report2b' '' 'product','cust','sale(1-3)' |,1,2,a 'product','cust','spc' |,1,2,a .
```

| Parameter | Description |
|-----------|-------------|
| `1` and `2` | Identify the fields to match in each report |
| `a` | Identifies the field to copy to the receiving report when both Product Type and Cust Code fields match |

---

### Finding Lines That Do Not Match

Compare Product Type fields in reports `2B0` and `1C0`, creating a result of lines that exist in the receiving report but not the issuing report:

```
@mch,0,b,2,0,c,1 n 'product' |,1 'product' |,1 .
```

---

### Moving Columns in Lines That Match

Compare fields in reports `1C0` and `2B0` and move columns in matching lines:

```
@mch,0,c,1,0,b,2 m 2-9,'spacereq(0-3)' |,1,a 1-59,77-3 |,1,a .
```

---

### Flagging a No-Match Occurrence

Copy a field when Product Type fields match; fill with asterisks when they do not:

```
@mch,'report1d','report2b' '' 'product','sale(1-3)' |,1,a 'product','spc' |,1,a*** .
```

| Parameter | Description |
|-----------|-------------|
| `1` | Identifies the field to match in each report |
| `a` | Identifies the field to copy when Product Type fields match |
| `a***` | Fills the receiving field with `***` when Product Type fields do not match |

---

### Matching Dates

Match dates using the `Y` parameter with date formats `1` (YYMMDD) and `8` (MMDDYY). The `Y` parameter immediately follows the parameter identifying the fields to match:

```
@mch,ic,id,ir,rc,rd,rr '' 5-6,50-6 |,2Y1,1Y8 5-6,50-6 |,2Y1,1Y8 .
```

---

### Matching with Different Date Formats

Match issuing field `ADt7` (date format 7) to receiving field `BDt6` (date format 6), and copy field `ADt1` to the receiving report:

```
@mch,0,a,244,0,a,245 m 'ADt1','ADt7' ,a,1y7 'BDt6','BDt5' ,1y6,a .
```

| Parameter | Description |
|-----------|-------------|
| `1y7` and `1y6` | Identify the match fields — issuing `ADt7` in date format 7 matched to receiving `BDt6` in date format 6 |
| `a` | Identifies the field to copy when the match fields agree |

**Result:** 6 lines matched out of 7. The unmatched record (`B08`) has a blank in the `BDt5` field.

---

### Moving Fields with Date Formats

#### Function Mask 1 — Issuing move field without a date format

When the issuing move field does not specify a date format, the receiving mask may specify fill characters:

```
@mch,0,a,244,0,a,245 m 'ADt1','ADt7' ,a,1 'BDt7','BDt5' ,1,ay5 .
```

Since the issuing move field (`a`) does not specify a date format, `y5` in the receiving mask is treated as fill characters for unmatched records. **Result:** unmatched record shows `y5` in the moved field.

#### Function Mask 2 — Issuing move field with a date format

When the issuing move field specifies a date format, the receiving mask must also specify a date format:

```
@mch,0,a,244,0,a,245 m 'ADt1','ADt7' ,ay1,1 'BDt7','BDt6' ,1,ay6 .
```

Since the issuing move field (`ay1`) specifies a date format, the receiving mask must also specify a date format (`ay6`). **Result:** unmatched records show blanks; the invalid date value (`212121`) appears as `********`.
