# @OUM — Output Mask

## Overview

Displays a blank function mask containing the report headings for a specified drawer. The run user can enter options and parameters in the mask, which the run captures via `INMSV$`.

The `@OUM` statement displays the mask and suspends the run until the user transmits. The run then continues, loading the variables specified with `INMSV$` with the user's entries.

> **Note:** The screen display contains a function key bar. You can customize it to include operations not available in the standard bar. See [`@FKY`](FKY.md) (Function Key) for more information.

---

## Syntax

```
@OUM,ic,id[,ir,if,rc,rd,rr,rf,title] .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `ic,id,ir` | Optional | For a single mask: report containing the headings. For a double mask: the issuing report. Default: report 0. |
| `if` | Optional | For a single mask: format in which to display the mask. For a double mask: format of the issuing report. Default: basic format. |
| `rc,rd,rr` | Optional | For a double mask: receiving report. Default: report 0. |
| `rf` | Optional | For a double mask: format of the receiving report mask. Default: basic format. |
| `title` | Optional | Title of up to 12 characters to display above the mask. |

---

## Reserved Words and Variables

`INMSV$` captures user input from the function mask screen. Follow these guidelines:

- Use `INMSV$` only with an `@OUM` statement.
- Place `INMSV$` before the variable names in a [`@CHG`](CHG.md) (Change Variable) statement.
- Place the `@CHG` statement **before** the `@OUM` statement.
- Use string (`S`) type variables. Alphanumeric (`A`) or Hollerith (`H`) types may be used if the data fits.

### Variable Structure

For a **single mask**, `@OUM` returns the option line and up to four decoded parameter lines. For a **double mask**, it returns the option line and up to two decoded parameter lines (one each for issuing and receiving masks).

The first variable initialized by `INMSV$` contains the entire option line. Each parameter line then requires three variables:

| Variable | Description |
|----------|-------------|
| First | Starting column numbers of fields where the user entered parameters. Each designation is 3 characters, right-justified, zero-filled, packed to the left. For example, entries at columns 2 and 45 produce `002045`. Use a 120-character variable to hold up to 40 fields (unused positions are blank). When using a non-basic format, column numbers reflect the positions defined in report 0 for that format. |
| Second | Corresponding field sizes, 3 characters each, packed to the left. |
| Third | Entire parameter line, expanded according to the format of the mask. |

> **Note:** To use field names instead of column positions, use the first and second parameter line variables with the [`@LFN`](LFN.md) (Load Field Name) statement.

The run stalls until the user presses Transmit, then continues with the data loaded into the specified variables.

---

## Examples

### Single Mask

Display a single function mask derived from report `1D0`, format `1`, with the title `TEST`:

```
@chg inmsv$ v1s80,v2s120,v3s120,v4s132,v5s120,v6s120,v7s132 .
@oum,0,d,1,1,,,,,'TEST' .
```

| Variable | Description |
|----------|-------------|
| `v1s80` | Option line |
| `v2s120` | First parameter line — field starting columns |
| `v3s120` | First parameter line — field sizes |
| `v4s132` | First parameter line — data entered by user |
| `v5s120` | Second parameter line — field starting columns |
| `v6s120` | Second parameter line — field sizes |
| `v7s132` | Second parameter line — data entered by user |

---

### Extracting Parameters from a Mask

This example iterates through the parameter fields captured by an `@OUM` statement and extracts each field value:

```
1.  @ldv v10i3=1 .
2.  @def,c v11i3,v2 .
3.  @001:ldv v12i3=v2(v10-3) .
4.  @ldv v13i3=v3(v10-3) .
5.  @ldv v14s18=v4(v12-v13) .
    .
    . (save variables here so loop can capture more)
    .
6.  @inc,3 v10 .
7.  @if v10 lt v11 gto 001 ; .
```

| Step | Description |
|------|-------------|
| 1 | Initialize the column-character position |
| 2 | Determine the number of fields selected based on the character count of `v2` |
| 3 | Obtain the starting column number of the current field |
| 4 | Obtain the field size |
| 5 | Extract the field data from the parameter line |
| 6 | Advance the column-character position by 3 |
| 7 | Loop back if more columns remain |

The resulting variables can then be used with statements such as [`@SOR`](SOR.md) (Sort), [`@SRH`](SRH.md) (Search), or [`@TOT`](TOT.md) (Totalize), depending on the type of parameters the user entered.

---

### Double Mask

Display a double function mask derived from reports `0B0` and `0C0`, both in basic format:

```
@chg inmsv$ v1s80,v2s120,v3s120,v4s132,v5s120,v6s120,v7s132 .
@oum,0,b,,,0,c .
```

| Variable | Description |
|----------|-------------|
| `v1s80` | Option line |
| `v2s120` | Issuing mask parameter line — field starting columns |
| `v3s120` | Issuing mask parameter line — field sizes |
| `v4s132` | Issuing mask parameter line — data entered by user |
| `v5s120` | Receiving mask parameter line — field starting columns |
| `v6s120` | Receiving mask parameter line — field sizes |
| `v7s132` | Receiving mask parameter line — data entered by user |
