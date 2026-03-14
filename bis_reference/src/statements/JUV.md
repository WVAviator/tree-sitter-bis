# @JUV — Justify Variable

## Overview

Reformats the contents of numeric variables. Typically used before displaying a value on screen or writing it to a report.

> *(2200 only)* Numeric variables can be up to 18 characters in length.

To reformat variables containing non-numeric data, use the options of the [`@LDV`](LDV.md) statement instead.

---

## Syntax

```
@JUV,o v[,v,...,v] .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `o` | Required | Option determining how the variable contents are reformatted. Only one option may be used. See [Options](#options). |
| `v` | Required | Variable to reformat. If the variable does not contain numeric data, it is left unchanged. Multiple variables may be specified as a comma-separated list. |

---

## Options

| Option | Platform | Description |
|--------|----------|-------------|
| `C` | All | Inserts commas in the integer portion every third digit, eliminates leading zeros, right-justifies the contents, and blank-fills remaining characters to the left. If inserting commas would exceed the variable's defined size, the variable is left unchanged. **Windows / Linux / UNIX:** Remove commas with the `D` option before using the variable with [`@CHG`](CHG.md) or [`@LDV`](LDV.md). |
| `D` | All | Deletes all commas and leading zeros, and right-justifies the contents within the variable. |
| `L` | All | Eliminates leading and trailing zeros, left-justifies the contents, and blank-fills remaining characters to the right. |
| `R` | All | Eliminates leading and insignificant trailing zeros, right-justifies the contents, and blank-fills remaining characters to the left. |
| `X` | All | Eliminates leading zeros, left-justifies the contents, and zero-fills remaining characters to the right. |
| `Z` | All | Eliminates insignificant trailing zeros, right-justifies the contents, and zero-fills remaining characters to the left. |
| `CE` | 2200 | Inserts periods in the integer portion every third digit (European notation), eliminates leading zeros, right-justifies the contents, and blank-fills remaining characters to the left. Changes the decimal point to a comma. If inserting periods would exceed the variable's defined size, the variable is left unchanged. Convert back to U.S. notation with the `E` option before using in calculations. |
| `DE` | 2200 | Deletes all periods and leading zeros, right-justifies the contents, and changes the comma decimal point back to a period (European → U.S. notation). |
| `E` | 2200 | Switches between U.S. and European numeric notation — periods become commas and commas become periods. |

---

## Examples

In the examples below, `#` represents a space.

Insert commas into `<number>`:

```
@ldv <number>f12.3=5323.750 .
@juv,c <number> .
```
Result: `<number>` = `###5,323.750`

Insert commas before display, then remove them with `D`:

```
@ldv <number>f10.3=5323.750 .
@juv,c <number> .           . <number> = #5,323.750
.
. (processing that displays <number>)
.
@juv,d <number> .           . <number> = ##5323.750
```

Various justification options applied to `<number>` containing `5323.750`:

```
@juv,l <number> .   . <number> = 5323.75###
@juv,r <number> .   . <number> = ###5323.75
@juv,x <number> .   . <number> = 5323.75000
@juv,z <number> .   . <number> = 0005323.75
```
