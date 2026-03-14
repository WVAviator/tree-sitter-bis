# @DC — Date Calculator

## Overview

Performs arithmetic calculations on dates or times stored in variables, constants, or expressed as literals.

### Year Range Rules

| Date Type | Windows / Linux / UNIX | 2200 |
|-----------|------------------------|------|
| Two-digit year | 1944–2043 | 1944–2043 |
| Four-digit year | 1600–2299 | 1600–2299 |
| One-digit year | ±4 to +5 years from current date | ±4 to +5 years from current date |

For elapsed time formats T4 and T5:
- *(2200)* Valid range: `-9544371:46:07` to `9544371:46:07`
- *(Windows / Linux / UNIX)* Valid range: `-9544371:59:59` to `9544371:59:59`

---

## Syntax

```
@DC eq vrslts .
```

### Parameters

| Field | Description |
|-------|-------------|
| `eq` | One or more equations separated by semicolons (`;`). |
| `vrslts` | Variables to capture equation results, in sequential order. |

---

## Behavior

- Each equation in a `@DC` statement sequentially creates an internal label (`A` through `Z`) that can be referenced in subsequent equations within the same statement. Labels cannot be user-defined (unlike [`@ART`](ART.md)).
- The result date or time retains the original format unless a format change is specified. You do not need to specify the format of a date or time represented by a label.
- If a result is an invalid date or time, the variable is filled with asterisks (`*`), which are treated as zeroes in subsequent calculations.
- *(2200)* If a numeric value is calculated from an invalid date or time, the variable is loaded with zero.

---

## Date and Time Formats

Formats marked with \* contain spaces — enclose **literal** dates in apostrophes (`'`), but do **not** enclose variables in apostrophes.

| Format Name | Pattern | Input Syntax | Output Syntax | Min Size |
|-------------|---------|--------------|---------------|----------|
| DATE0$ | YMMDD | `D0(x)` | `D0` | 5 |
| DATE1$ | YYMMDD | `D1(x)` | `D1` | 6 |
| DATE2$ \* | DD MMM YY | `D2(x)` | `D2` | 9 |
| DATE3$ | YDDD | `D3(x)` | `D3` | 4 |
| DATE4$ | YYDDD | `D4(x)` | `D4` | 5 |
| DATE5$ | DDMMYY | `D5(x)` | `D5` | 6 |
| DATE6$ | MM/DD/YY | `D6(x)` | `D6` | 8 |
| DATE7$ \* | MONTH DD, YYYY | `D7(x)` | `D7` | 18 |
| DATE8$ | MMDDYY | `D8(x)` | `D8` | 6 |
| DATE9$ | DD/MM/YY | `D9(x)` | `D9` | 8 |
| DATE11$ | YYYYMMDD | `D11(x)` | `D11` | 8 |
| DATE12$ \* | DD MMM YYYY | `D12(x)` | `D12` | 11 |
| DATE14$ | YYYYDDD | `D14(x)` | `D14` | 7 |
| DATE15$ | DDMMYYYY | `D15(x)` | `D15` | 8 |
| DATE16$ | MM/DD/YYYY | `D16(x)` | `D16` | 10 |
| DATE18$ | MMDDYYYY | `D18(x)` | `D18` | 8 |
| DATE19$ | DD/MM/YYYY | `D19(x)` | `D19` | 10 |
| DATE20$ | YYYY-MM-DD | `D20(x)` | `D20` | 10 |
| DATE21$ | DD-MMM-YY | `D21(x)` | `D21` | 9 *(2200 only)* |
| TIME$ | HH:MM:SS | `T0(x)` | `T0` | 8 |
| TIME1 | HH:MM | `T1(x)` | `T1` | 5 |
| TIME2 | HHMMSS | `T2(x)` | `T2` | 6 |
| TIME3 | HHMM | `T3(x)` | `T3` | 4 |
| TIME4 | HHHHHHH:MM:SS | `T4(x)` | `T4` | 7 \*\* |
| TIME5 | HHHHHHH:MM | `T5(x)` | `T5` | 4 \*\* |

\*\* Hours can be 1–7 digits. A minus sign for negative values may appear as an eighth character.

> *(2200)* DATE2$ and DATE12$: spaces are optional. If no spaces are detected, the scan terminates after 7 characters (DATE2$) or 9 characters (DATE12$).

---

## Equations

```
Dn=expression
Tn=expression
Mn=expression
```

| Field | Description |
|-------|-------------|
| `Dn` | Date operation; `n` = date format number. |
| `Tn` | Time operation; `n` = time format number. |
| `Mn` | Month (end-of-month) operation; `n` = output date format number. |
| `expression` | Calculation using literals, variables, constants, internal labels, constant labels, or any combination. |

### Date and Time Parameters

Use `Dn(x)` or `Tn(x)` to specify the format of a source date or time:

```
Dn(x)    — date in format n stored in variable, constant, or literal x
Tn(x)    — time in format n stored in variable, constant, or literal x
```

Example — specifying a date in DD MMM YY format:
```
d2(<date>)
```

### Constant Parameter Labels

| Label | Description |
|-------|-------------|
| `TODAY` | Current date in DATE7$ format (`MONTH DD, YYYY`). |
| `TIME` | Current time in TIME0$ format (`HH:MM:SS`). |
| `MINDAT` | Minimum supported date in the selected output format. Default format = DATE7$. |
| `MAXDAT` | Maximum supported date in the selected output format. Default format = DATE7$. |

### Calendar Equation Parameters

Use these to add or subtract years, months, and days from a date. A valid date must be the first expression in the equation.

| Parameter | Description |
|-----------|-------------|
| `nY` | Number of years. |
| `nM` | Number of months. |
| `nD` | Number of days (explicit). |
| `n` | Number of days (default, without suffix). |

---

## Examples

### Adding Days to the Current Date

Loads `<future>` with today's date plus 90 days in DATE7$ format:
```
@dc today+90 <future>h18 .
```

### Obtaining the Current Date and Time

Loads `<datenow>` in DATE11$ format and `<timenow>` in TIME0$ format:
```
@dc d11=today;time <datenow>h8,<timenow>h8 .
```

### Validating Date Input

If `<input>` is not a valid DATE11$ date, branches to label `100`:
```
@dc d11(<input>) <check>H1
if <check> EQ * gto 100 ; .
```

### Performing Several Calculations

Performs multiple date calculations and uses an internal label (`B`) created by an earlier equation:
```
@dc dw=d7('june 4, 1996');d7=d1(960626)+5;b-today <day>s10,<date>s18,<numdays>i4 .
```

| Equation | Result Variable | Description |
|----------|----------------|-------------|
| `dw=d7('june 4, 1996')` | `<day>s10` | Day of the week June 4, 1996 fell on. |
| `d7=d1(960626)+5` | `<date>s18` | `960626` plus 5 days, converted to DATE7$ format. Also creates internal label `B`. |
| `b-today` | `<numdays>i4` | Days between label `B` and today. No input format needed for a label. |

Using `@LDV` to pre-load a variable and then reference it in a chain of calculations:
```
@ldv <olddate>h6=960604 .
@dc d1(<olddate>)+60;dw=a;d7=a;c-2 <newdate>h6,<day>s10,<datea>s18,<datec-2>s18 .
```

| Equation | Result Variable | Description |
|----------|----------------|-------------|
| `d1(<olddate>)+60` | `<newdate>h6` | Contents of `<olddate>` (960604) plus 60 days in DATE1$ format. Creates label `A`. |
| `dw=a` | `<day>s10` | Day of the week the date in label `A` fell on. |
| `d7=a` | `<datea>s18` | Date in label `A` converted to DATE7$ format. Creates label `C`. |
| `c-2` | `<datec-2>s18` | Date in label `C` minus 2 days in DATE7$ format. |

### Obtaining the Minimum Valid Date

Loads `<min7>` with the minimum DATE7$ date and `<min1>` with the minimum DATE1$ date:
```
@dc mindat;d1=mindat <min7>h18,<min1>i6 .
```

### Adding One Year to Today's Date

```
@dc d7=today+1y <newdate>h18 .
```

### Adding Two Months to Today's Date

```
@dc d7=today+2m <newdate>h18 .
```

### Subtracting Multiple Calendar Units

Subtracts 1 year, 11 months, and 30 days from a specified date:
```
@dc d7=d14(2003060)-1y-11m-30d <newdate>h18 .
```

### Producing an End-of-Month Date

Converts February 12, 2007 to its end-of-month date in DATE11$ format (`20070228`):
```
@dc m11=d7('February 12, 2007') <out1>S18 .
```

`d7('February 12, 2007')` converts the date to an internal day number. `m11=` then converts that day number to the end-of-month date in DATE11$ (`YYYYMMDD`) format.

> **Note:** If the receiving variable is smaller than required for the `Mn` output format, the value is truncated.
