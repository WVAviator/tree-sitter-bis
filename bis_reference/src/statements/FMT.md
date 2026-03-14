# @FMT — Format

## Overview

Creates a display format for a following output display, such as that produced by a [`@DSP`](DSP.md) (Display Report) or [`@OUM`](OUM.md) (Output Mask) statement. Also selects columns to print the next time [`@AUX`](AUX.md) (Auxiliary) or [`@PRT`](PRT.md) (Print) statements are called.

You can select which fields to display by specifying either field names or column-character positions.

> **Note:** `@FMT` sets up the format for your current `-0` result or the report specified in `c,d,r` (which then becomes the current result).

---

## Syntax

```
@FMT[,c,d,r] field[,field,...,field] .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `c,d,r` | Optional | Report from which to display fields. Default = `-0`. |
| `field` | Required | Fields to display, specified as either field names or column-character positions. |

---

## Outcome

- The subsequent `@DSP`, `@DSM`, `@OUM`, or `@OUT` screen displays the specified fields.
- If fields are specified by name, the display includes the columns of each field as well as the character immediately following the field.
- If fields are specified by column-character positions, only the specified columns are displayed.
- Column 1 (the line type designator) is always included in the format.
- Although fields can be listed in any order on the `@FMT` statement, they are always displayed in the same order as they exist in the original report.

---

## Examples

Display the `St Cd`, `Ship Date`, and `Cust Code` fields of the current `-0`:

```
@fmt 'stcd','shipdate','custcode' .
@dsp,-0 .
```

Display three characters starting at column 2, five characters starting at column 45, and seven characters starting at column 64 of report `2B0`:

```
@fmt,0,b,2 2-3,45-5,64-7 .
@dsp,0,b,2 .
```
