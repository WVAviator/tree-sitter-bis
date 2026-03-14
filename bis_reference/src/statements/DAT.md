# DATE and @DAT — Date

## Overview

Performs operations on dates in reports. Available as both an interactive **control line function** (`DATE`) and a **run statement** (`@DAT`). The **Iterative Date (IDAT)** run can be used to save and reuse Date function masks and to generate `@DAT` statements.

### Capabilities

- Compare dates in two fields and store the difference
- Compare a date field to the current date
- Add or subtract a number of days to compute new dates
- Convert date formats (e.g., `YYMMDD` to `MM/DD/YY`)
- Compute the day of the week
- Convert time fields to decimal hours
- Produce end-of-month dates

---

## Syntax

**Control line (interactive):**
```
DATE [report f]
```

**Statement (in a run):**
```
@DAT,c,d,r o cc ltyp,p .
```

### Control Line Parameters

| Field | Description |
|-------|-------------|
| `report` | Report to process. See *Specifying Reports or Drawers to Process*. |
| `f` | Report format for processing (allows access to date fields beyond column 80). |

### Statement Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `c,d,r` | Required | Report on which to perform computations. See *Specifying Reports or Drawers to Process*. |
| `o` | Required | Options field. See [Options](#options). |
| `cc` | Required | Column-character positions or field names containing dates to process. |
| `ltyp` | Required | Line type to process. If the `A` option is used, leave blank but include the comma. |
| `p` | Required | Parameters field. See [Parameters](#parameters) and [Date Formats](#date-formats). |

**Format inference rules for `p`:**
- If no format is specified in either a `+` or `-` field, format `B` is assumed for both.
- If a format is specified for only one of `+` or `-`, that format is assumed for both.
- If no format is specified for `=`, the format of `+` is used (if present); otherwise the format of `-` is used.

---

## Options

| Option | Platform | Description |
|--------|----------|-------------|
| `A` | All | Processes all line types. |
| `F` | 2200 | If the receiving field is too small for the date conversion, fills it with asterisks (`*`). Without `F`, the result overwrites the adjacent field. |
| `T` | All | Converts a time field to decimal hours. Time must be in `HH:MM:SS` or `HHMM` format. Use `+` to specify the source field and `=` for the destination. If no `=` field is specified, the result overwrites the original field. |
| `W` | All | Converts dates into days of the week. Specify the date format parameter in the source field, a different format parameter with `=` in a destination field, and `:` in the field to receive the 3-letter day name. See [Determining the Day of the Week](#determining-the-day-of-the-week). |
| `n` | All | Defines the number of days in a workweek, where `n` is 1–7. Default = 7. Used for workday-based date arithmetic and week calculations. |

---

## Parameters

| Parameter | Description |
|-----------|-------------|
| `+` | Field on which a date operation is performed (the primary/source date field). |
| `-` | Field to subtract from the `+` field. |
| `=` | Field in which to place the result of an operation. |
| `:` | Field in which to place the 3-letter day of the week (e.g., `MON`, `TUE`). |
| `K` | Constant field — adds or subtracts the value in this field from the `+` field. |
| `+n` / `-n` | Constant number of days to add to or subtract from the field (e.g., `b+10` adds 10 days to a format-B date field). Use `+0` or `-0` to reference the current date. |
| `nM` | Produces an end-of-month date, where `n` is the output date format. |

---

## Date Formats

| Symbol | Format | Example |
|--------|--------|---------|
| `A` | YMMDD | `81231` |
| `B` *(default)* | YYMMDD | `981231` |
| `C` | DD MMM YY *(2200: spaces optional)* | `31 DEC 98` |
| `D` | YDDD | `8365` |
| `E` | YYDDD | `98365` |
| `F` | DDMMYY | `311298` |
| `G` | MM/DD/YY | `12/31/98` |
| `H` | MONTH DD, YYYY | `DECEMBER 31, 1998` |
| `I` | MMDDYY | `123198` |
| `J` | DD/MM/YY | `31/12/98` |
| `L` | YYYYMMDD | `19981231` |
| `M` | DD MMM YYYY *(2200: spaces optional)* | `31 DEC 1998` |
| `O` | YYYYDDD | `1998365` |
| `P` | DDMMYYYY | `31121998` |
| `Q` | MM/DD/YYYY | `12/31/1998` |
| `S` | MMDDYYYY | `12311998` |
| `T` | DD/MM/YYYY | `31/12/1998` |
| `U` | YYYY-MM-DD | `2003-05-31` |
| `V` | DD-MMM-YY | `31-DEC-98` *(2200 only)* |

---

## Guidelines

- **Two-digit year dates:** Must represent dates between 1944–2043 *(Windows/Linux/UNIX)*; 1964–2063 *(2200)*.
- **Four-digit year dates:** Must represent dates between 1600–2299.
- **One-digit year dates:** Must fall within ±4 to +5 years of the current date.
- Always place the date format parameter before other parameters in a field.
- To change a date's format, copy it to a different field with the new format parameter — you cannot reformat in place.
- If a format is specified for only one field, all fields are assumed to be in that format. To use multiple fields with different formats, specify formats on all fields used.

### Workday Calculation Rules (when `n` < 7)

When calculating the difference between two dates using fewer than 7 days per week:
- The workweek begins on Monday.
- If the **starting** (earlier) date is not a workday, the last workday before it is used.
- If the **ending** (later) date is not a workday, the next workday after it is used.
- If **both** dates are not workdays, the next workday after each is used.

### Field Overflow Behavior

- *(2200 without `F` option)* If the receiving field is too small, the command first removes spaces from the format (e.g., `DDMMYYYY`). If still too large, it overwrites the adjacent field.
- *(2200 with `F` option)* Fills the field with asterisks instead of overwriting.

---

## Procedures

### To Add or Subtract a Constant Field
1. Type `+` or `-` in the first column of the date field.
2. Type `k` in the constant field.
3. Type `=` in the result field.

### To Add or Subtract a Constant Number
1. In the source date field, type the date format, a `+` or `-`, and the number of days (e.g., `a+30`).
2. Type `=` in the result field.

To reference the current date, use `+0` or `-0`.

---

## Examples

### Comparing a Date to the Current Date

Compares dates in the `Produc Actual` field to the current date and stores the difference in `Ship Date`. Past dates produce a negative result; blank dates produce asterisks.

```
@dat,'report2b' '' 57-6,64-6 |,+,= .
```

| Parameter | Purpose |
|-----------|---------|
| `+` | Source field (Produc Actual) — compared to current date |
| `=` | Result field (Ship Date) |

---

### Subtracting Dates

Subtracts `Produc Actual` dates from `Produc Plan` dates and stores the result in `Ship Date`.

```
@dat,'report2b' '' 50-6,57-6,64-6 |,+,-,= .
```

| Parameter | Purpose |
|-----------|---------|
| `+` | Produc Plan (minuend) |
| `-` | Produc Actual (subtrahend) |
| `=` | Ship Date (result) |

---

### Converting a Date Format

Converts dates in `Produc Actual` (format B: `YYMMDD`) to format I (`MMDDYY`) and stores them in `Ship Date`. Blank dates produce asterisks.

```
@dat,'report2b' '' 57-6,64-6 |,b,i= .
```

| Parameter | Purpose |
|-----------|---------|
| `b` | Source field in format B |
| `i=` | Result field, output in format I |

---

### Determining the Day of the Week

Converts `Produc Actual` dates to format I in `Ship Date` and places the 3-letter day name in `Spc Cod`. Blank dates produce asterisks in `Ship Date` and blanks in `Spc Cod`.

```
@dat,'report2b' w 57-6,64-6,77-3 |,b,i=,: .
```

| Parameter | Purpose |
|-----------|---------|
| `W` | Enable day-of-week conversion |
| `b` | Source field (Produc Actual) |
| `i=` | Result field converted to format I (`=` is required with `W`) |
| `:` | Day-of-week field (Spc Cod) |

---

### Adding a Constant Number to a Date

Adds 10 workdays (5-day workweek) to `Produc Actual` and stores the result in `Ship Date`. Blank dates produce asterisks.

```
@dat,'report2b' 5 57-6,64-6 |,b+10,= .
```

| Parameter | Purpose |
|-----------|---------|
| `5` | 5-day workweek (`n` option) |
| `b+10` | Source field in format B, add 10 workdays |
| `=` | Result field (Ship Date) |

---

### Adding a Constant Number Contained in a Field

Adds a variable value from `Spc Cod` to dates in `Produc Actual` and stores results in `Status Date`. Requires the constant field to be populated first (e.g., via `@TOT`).

```
@dat,-0 '' 5-6,50-6,77-3 |,=,+,k .
```

| Parameter | Purpose |
|-----------|---------|
| `=` | Result field (Status Date) |
| `+` | Source date field (Produc Actual) |
| `k` | Constant field (Spc Cod — values added to source date) |

---

### Calculating Number of Weeks

Compares `Produc Actual` dates to the current date and places the difference in weeks in `Ship Date`. Uses a 1-day workweek (`n=1`) so the result is in weeks rather than days.

```
@dat,'report2b' 1 57-6,64-6 |,+,= .
```

| Parameter | Purpose |
|-----------|---------|
| `1` | 1-day workweek — result is in weeks |
| `+` | Source field (Produc Actual) |
| `=` | Result field (Ship Date) |

---

### Producing End-of-Month Dates

Converts input dates (format B) to end-of-month dates in format G (`MM/DD/YYYY`) and places them in `Out1`.

```
@dat,'report2b' '' 'In','Out1' |,b,gm= .
```

| Parameter | Purpose |
|-----------|---------|
| `b` | Source field in format B |
| `gm=` | Output format G, end-of-month, stored in `Out1` |

Result example:
```
070112  →  01/31/07
070212  →  02/28/07
070312  →  03/31/07
```

> **Note:** If the destination field is smaller than required for the output format, the date will overwrite adjacent fields.
