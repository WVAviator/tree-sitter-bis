# @LLN — Last Line Number

## Overview

Loads a variable with the last line number of a report. Especially useful for determining whether a report or drawer exists, or whether a report contains any lines.

> **See also:** The [`@LZR`](LZR.md) (Line Zero) statement can also capture the number of lines in a report.

---

## Syntax

```
@LLN,c,d,r[,lab] vlines .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `c,d,r` | Required | Report in which to locate the last line number. |
| `lab` | Optional | Label to branch to if the specified report or drawer does not exist. |
| `vlines` | Required | Variable to capture the number of the last line in the report. |

---

## Outcome

- `vlines` is loaded with the last line number in the report. No `-0` result is created.
- If the report or drawer does not exist, the run branches to `lab` if specified, or continues at the next statement if not.
- When used with a result, the number of heading lines is always equal to one.

---

## Reserved Words

After `@LLN` executes, `STAT1$` and `STAT2$` reflect the following:

| Condition | STAT1$ | STAT2$ |
|-----------|--------|--------|
| Report exists | Date of the last update in `DATE1$` format (`YYMMDD`) | Creation date of the report in `DATE1$` format (`YYMMDD`) |
| Report was never updated | `0` | — |
| Report does not exist | Highest report number in the drawer | — |
| Drawer does not exist | `0` | — |

> **Note (Year 2000 dates):** When using reserved words such as `STAT1$` and `STAT2$` that may read date values from a report, load the values into `H` type variables, right-justified and zero-filled, to ensure correct date processing.

---

## Example

Capture the last line number of report `2B0`:

```
@lln,0,b,2,050 <line>i3 .
```

| Part | Description |
|------|-------------|
| `0,b,2` | Obtain information from report `2B0` |
| `050` | Branch to label 50 if the report does not exist |
| `<line>i3` | Load `<line>` with the number of the last line |
