# LM and @LMG — List Merge

## Overview

Extracts lines or parts of lines from a report and merges them with another report, creating a result containing multiple documents. Useful for producing several copies of a form letter or other document requiring varying data in some places.

Two reports are involved:
- The **issuing report** — a standard column-formatted report containing the data to extract.
- The **receiving report** — contains the fixed text for each document, with List Merge control characters indicating where and what data to extract from the issuing report.

The command creates a result with one copy of the receiving report for each tab line in the issuing report, with the specified data merged in. The result is ready for further processing with word processing commands such as `ADJPRT`.

> **Note:** The `LM` manual function is only available on 2200 systems. For `LM`, the issuing report must be on display.

> *(Windows / Linux / UNIX)* If the replacement string must expand beyond the report width, it wraps to the next line. If it wraps more than one line, the following message is displayed: `(MGMW14) Word and Phrase Change can only expand one line`

---

## Syntax

**LM manual function (2200 only):**
```
LM [report]
```
where `report` is the receiving report. See *Specifying Reports or Drawers to Process* for details.

**@LMG statement:**
```
@LMG,ic,id,ir,rc,rd,rr[,lab] .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `ic,id,ir` | Required | Issuing report (source of data to extract). See *Specifying Reports or Drawers to Process* for details. |
| `rc,rd,rr` | Required | Receiving report (contains fixed text and List Merge control characters). |
| `lab` | Optional | Label to branch to in case of an error. |

---

## Control Characters

Enter these control characters in the receiving report where data should be merged.

### `~=x-y,z` — Extract Columns

Extracts columns of data from the issuing report.

| Part | Description |
|------|-------------|
| `x` | Starting column number |
| `y` | Number of columns to extract |
| `z` | *(Optional)* Number of the trailer-type line past the tab line from which to extract data. Must be fewer than 5. Omit `,z` to process tab lines. If `,z` is specified and no trailer-type line exists, the field is treated as spaces. |

Insert `F` after the `=` sign (i.e. `~=F`) to freeze the merged portion — extra spaces in the specified columns are not deleted.

Example: `~=2-4,3` extracts four characters starting at column 2 of the third trailer-type line following the tab line.

To extract whole lines rather than columns, use `~=0,y-z` where `y` is the line number past the tab line to start from and `z` is the number of lines to place into the receiving report. The `F` flag may also be used here (data is left-justified and space-filled). There must be sufficient space for the defined field size in the receiving report, or data following the merged field will be overwritten.

### `~&x-y,z` — Create a List

Creates a list containing specified columns from each of the lines in the issuing report. The list is identical for each copy of the document in the result. A maximum of nine `~&` control characters may be used on a single line.

| Part | Description |
|------|-------------|
| `x` | Starting column number |
| `y` | Number of columns to extract |
| `z` | *(Optional)* Number of lines past the tab line from which to extract data. Must be fewer than 5. Omit `,z` to process tab lines. |

The command generates one line of data for each tab line in the issuing report.

Example: `~&2-17` extracts 17 characters starting at column 2 of the issuing report and places them at the location of the control character in the receiving report.

---

## Example

Merge lines and partial lines from issuing report `7H0` into receiving report `8H0`:

```
@lmg,0,h,7,0,h,8 .
```
