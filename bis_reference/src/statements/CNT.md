# CNT and @CNT — Count

## Overview

Analyzes and summarizes data by performing a character-to-character comparison of specified fields across one report or an entire drawer. Based on key fields, the command computes subtotals, percentages, averages, entry counts, and more — scanning the report in a single pass regardless of how many analyses are requested.

Available as both an interactive **control line function** (`CNT`) and a **run statement** (`@CNT`). The **Iterative Count (ICNT)** run can be used to save and reuse parameters and options, and to generate `@CNT` statements interactively.

### Capabilities

- Count unique entries in key fields
- Calculate subtotals, averages, minimums, or maximums per unique key
- Compute entry percentages and subtotal-to-grand-total percentages
- Perform numeric rounding per field
- Calculate based on numeric, date, or time intervals
- Display only specified fields in the result
- Process multiple distinct analyses in a single pass
- Subtotal fields without sorting first

---

## Syntax

**Control line (interactive):**
```
CNT [report f]
```

**Statement (in a run):**
```
@CNT,c,d[,r] o cc ltyp,p [vrslts] .
```

### Control Line Parameters

| Field | Description |
|-------|-------------|
| `report` | Report to process. See *Specifying Reports or Drawers to Process*. |
| `f` | Report format for processing (allows access to fields beyond column 80). |

### Statement Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `c,d,r` | Required | Report or drawer to process. See *Specifying Reports or Drawers to Process*. |
| `o` | Required | Options field. See [Options](#options). |
| `cc` | Required | Column-character positions or field names to process. |
| `ltyp` | Required | Line type to process. If the `A` option is used, leave blank but include the comma. |
| `p` | Required | Parameters field. See [Parameters](#parameters). |
| `vrslts` | Optional | Variable to capture the number of output lines for the corresponding result. Up to 8 variables can be returned. |

---

## Options

| Option | Description |
|--------|-------------|
| `A` | Processes all line types. |
| `B` | Extends interval boundaries to the min/max values defined in the scaling option. Implies `Z` — all intervals between boundaries are displayed even if empty. Scaled key fields must be the most significant (lowest-numbered) keys. See [Extending Intervals to the Boundaries](#extending-intervals-to-the-boundaries). |
| `C` | Distinguishes between uppercase and lowercase letters. Default = uppercase. *(2200: applies only to full character set (FCS) reports.)* |
| `D[n]` | Processes only keys that occur `n` or more times, where `n` is an integer greater than 1. Default = 2. |
| `E` | Extracts result fields from the **last** occurrence of each unique key. Default = first occurrence. |
| `F` | Extracts result fields from the **first** occurrence of each unique key. When using `<` or `>` operators, default = min or max field. |
| `H` | Displays only the first set of headings when processing multiple parameter sets in a single request. See [Omitting Headings in Multiple Analyses](#omitting-headings-in-multiple-analyses). |
| `I` | Includes out-of-range keys. Substitutes the min or max boundary value for out-of-range keys, making the line valid for counting. Default = discard lines outside boundaries. |
| `J(x)` | Justifies numeric result values. `x` values: `C` = comma-insert, right-justify; `L` = left-justify, no zeros/commas; `R` = right-justify, no zeros/commas; `X` = left-justify, fill with nonsignificant zeros; `Z` = right-justify, fill leading spaces with zeros. Individual `J` parameters override the option-line `J`. |
| `Nn` | Substitutes invalid numeric data with value `n`. Default = 0. |
| `O` | Omits data lines from the result. Only headings, grand total summary, and warnings are included. Implies `T` and `W`. |
| `P` | Packs the result — removes non-referenced fields and reorders by: (1) key fields, (2) extraction fields, (3) computational fields, (4) minimum fields, (5) maximum fields, (6) entry counts, (7) percentages. See [Reordering Specified Result Fields](#reordering-specified-result-fields). |
| `Rx-y` | Processes reports `x` through `y`. |
| `Rx,y` | Processes reports `x` and `y` in the specified order. |
| `Rx-y,z` | Processes reports `x` through `y` and also `z`, in the specified order. |
| `Sn(...)` | Creates numeric, date, or time scaling intervals on key field `n`. See [Scaling](#scaling). |
| `T` | Displays overall summary totals (grand total, grand average, total entries, overall min/max) at the end of each result. |
| `U` | Displays the upper limit of the interval for scaled results instead of the lower limit. |
| `V` | Excludes lines with invalid numeric, date, or time fields from counts. Default = treat invalid as 0 (numeric), January 1 1944 (date), or 00:00:00 (time). |
| `W` | Appends messages at the end of the result showing lines skipped due to invalid key or data fields. |
| `Z` | Displays all intervals including empty ones (no gaps). Scaled key fields must be the most significant keys. Use only with `S`. |
| `*` | Flags invalid subtotals, averages, standard deviations, maximums, and minimums where invalid data was used. |

---

## Parameters

Maximum of 63 individual parameters allowed.

| Parameter | Description |
|-----------|-------------|
| `1`–`9` | Specifies key fields. At least one key field is required per parameter set. `1` is most significant. |
| `N` | Numeric key field (e.g., `1N`). Numbers may be left- or right-justified. |
| `Df` | Date key field. `f` = date format number (0–20 on Windows/Linux/UNIX; 0–21 on 2200). Example: `1D0`. See [Date Format Numbers](#date-format-numbers). |
| `Tf` | Time key field. `f` = time format number (0–5). Example: `2T5`. See [Time Format Numbers](#time-format-numbers). |
| `A`–`Z` | Extraction label. Includes the contents of non-key fields in the result. The value displayed is the first value associated with the key. Do not use the same letter more than once. |
| `A-` | Exclusion parameter. Labels a field but excludes it from the result (e.g., `A-`). |
| `J...x` | Justification — `J` in column 1, justification letter `x` in the field. Overrides the option-line `J`. Can be combined with `R`. |
| `R...n` | Rounding — `R` in column 1 (or as line type in `@CNT`), rounding value `n` in the field. Range: `.0000000000000001` to `100000000000`. Can be combined with `J`. |

---

## Operators

| Operator | Description |
|----------|-------------|
| `=` | Entry count — counts occurrences of each unique key. |
| `=+` | Cumulative count. |
| `+` | Subtotal — sums values for each unique key. |
| `++` | Cumulative subtotal. |
| `%` | Percentage — entry count for each key as a percent of total entries. |
| `%+` | Cumulative percentage. |
| `+%` | Subtotal percentage — subtotal for each key as a percent of the grand total. |
| `+%+` | Cumulative subtotal percentage. |
| `/` | Average — subtotal divided by entry count. |
| `-` | Delete field — excludes field values from the result. |
| `<` / `<Dn` / `<Tn` | Minimum value per unique key. Use `<Dn` or `<Tn` for date/time fields. |
| `>` / `>Dn` / `>Tn` | Maximum value per unique key. Use `>Dn` or `>Tn` for date/time fields. |
| `!-` | Sample standard deviation: `SQRT((SUM(x²)/(n-1))-(SUM(x)²/(n*(n-1))))` |
| `!+` | Population standard deviation: `SQRT((SUM(x²)/n)-(AVG(x)²))` |
| `!!-` | Sample variance: `(SUM(x²)/(n-1))-(SUM(x)²/(n*(n-1)))` |
| `!!+` | Population variance: `(SUM(x²)/n)-(AVG(x)²)` |

### Additional Operators

| Operator | Description |
|----------|-------------|
| `:R` | Places the input report number into the field. Use only when processing a full drawer or range of reports. |
| `:L` | Places the input line number into the field. |
| `:M` | Places the analysis number into the field when multiple parameter sets are used in one request. |

---

## Key Field Types

### Alphanumeric Key Fields
Specify character data with a single digit `1`–`9`. Uppercase and lowercase are treated as equal by default (use `C` option to distinguish).

### Numeric Key Fields
Enter a key number followed by `N` (e.g., `1N`). Values may be left- or right-justified.

### Date and Time Key Fields
Enter a key number, `D` or `T`, and a format number (e.g., `1T0` for times in `HH:MM:SS`).

### Date Format Numbers

Two-digit year dates: 1944–2043. Four-digit year dates: 1600–2299. One-digit year dates: within ±4–5 years of the current date.

| Number | Format |
|--------|--------|
| 0 | YMMDD |
| 1 | YYMMDD |
| 2 | DD MMM YY *(2200: spaces optional)* |
| 3 | YDDD |
| 4 | YYDDD |
| 5 | DDMMYY |
| 6 | MM/DD/YY |
| 7 | MONTH DD, YYYY |
| 8 | MMDDYY |
| 9 | DD/MM/YY |
| 11 | YYYYMMDD |
| 12 | DD MMM YYYY *(2200: spaces optional)* |
| 14 | YYYYDDD |
| 15 | DDMMYYYY |
| 16 | MM/DD/YYYY |
| 18 | MMDDYYYY |
| 19 | DD/MM/YYYY |
| 20 | YYYY-MM-DD |
| 21 | DD-MMM-YY *(2200 only)* |

### Time Format Numbers

For elapsed time formats T4 and T5: valid range is ±9,544,371:46:07 (2200) or ±9,544,371:59:59 (Windows/Linux/UNIX).

| Number | Format |
|--------|--------|
| 0 | HH:MM:SS |
| 1 | HH:MM |
| 2 | HHMMSS |
| 3 | HHMM |
| 4 | HHHHHHH:MM:SS* |
| 5 | HHHHHHH:MM* |

\* Hours can be 1–7 digits. A minus sign for negative values may appear as an eighth character.

### Advanced Key Parameters

| Parameter | Description |
|-----------|-------------|
| `nR` | Report key — groups results by report number rather than field content. Use only when processing a full drawer or range of reports. |
| `nL` | Line key — groups results by line number rather than field content. Use only when processing a full drawer or range of reports. Requires consistent line-number alignment across reports. |

---

## Scaling

Scaling creates fixed-size intervals within a key field. Each scaled key field must have its own scaling option, and scaled fields must be the most significant (lowest-numbered) keys when using `B` or `Z`.

### Numeric Scaling

```
Sn(intv[/min/max])
```

| Field | Description |
|-------|-------------|
| `n` | Key field number to scale. |
| `intv` | Interval size. |
| `min` | Minimum value — smaller values are ignored. |
| `max` | Maximum value — larger values are ignored. |

### Date Scaling

```
SnDf(intv[/min/max/strt])
```

| Field | Description |
|-------|-------------|
| `n` | Key field number to scale. |
| `f` | Date format number. See [Date Format Numbers](#date-format-numbers). |
| `intv` | Interval size: `nD` = days (default), `nW` = weeks, `nM` = months, `nY` = years. |
| `min` | Minimum date in the key field's format — earlier dates are ignored. |
| `max` | Maximum date — later dates are ignored. |
| `strt` | Interval start. For `nW`: 3-char day name (e.g., `SUN`); for `nM`: 3-char month name (e.g., `MAY`); for `nY`: 2- or 4-digit year. Defaults: January 1, 1944 (year/month); January 2, 1944 Sunday (day/week). |

### Time Scaling

```
SnTf(intv[/min/max/strt])
```

| Field | Description |
|-------|-------------|
| `n` | Key field number to scale. |
| `f` | Time format number. See [Time Format Numbers](#time-format-numbers). |
| `intv` | Interval size: `nS` = seconds (default), `nM` = minutes, `nH` = hours. |
| `min` | Minimum time — earlier times are ignored. |
| `max` | Maximum time — later times are ignored. |
| `strt` | Starting time in the key field's time format. Default = `00:00:00`. |

---

## Reserved Words

| Reserved Word | Description |
|---------------|-------------|
| `STAT2$` | Number of lines ignored across all results for invalid or out-of-range key conditions. |
| `STAT3$` | Number of lines ignored across all results for invalid numeric, date, or time values. Meaningful only when the `V` option is specified. |

---

## Behavior

- Creates a result containing completed calculations. Multiple parameter sets produce multiple analyses in a single result, separated by heading lines and `.EJECT`.
- Result is sorted by key fields in ascending order.
- Non-referenced fields are filled with spaces.
- Invalid key lines are omitted from calculations entirely. Invalid non-key field data defaults to `0` (numeric), January 1, 1944 (date), or `00:00:00` (time).
- Up to 8 variables can be returned by `@CNT`, each containing the data line count for the corresponding output result.
- *(2200)* If no period line follows the date line, the command adds one to ensure a title line exists in the result.

---

## Examples

The following examples use this sample report of system downtime events:

```
*Location. Date . Time .Down. Cause. Value Cost
*========.======.========.====.======.==========.
Chicago  890221 05:00:32  2.2  Code1  550
Boston   890424 03:00:45   .5  Code3   40
Chicago  890607 09:00:23  1.3  Code2 2900
New York 890607 11:47:47  1.0  Code2   10
Boston   890708 14:31:02  0.5  Code1   55
Boston   890708 08:24:01  0.1  Code2    9
Chicago  890930 18:45:02  4.0  Code3 7500
Chicago  891130 23:24:00  0.7  Code2   20
Boston   891202 03:05:09  1.0  Code2  900
```

---

### Counting Keys and Calculating a Percentage

Counts occurrences of each unique location and calculates each location's percentage of total downtime events.

```
@cnt,'report5a' '' 2-8,60-5,66-5 |,1,=,% .
```

| Parameter | Purpose |
|-----------|---------|
| `1` | Key field (Location) |
| `=` | Entry count per location |
| `%` | Percentage of total events |

Result:
```
*Location.Date .Time .Down. . . .Count. % .
*========.======.======.====. . . .=====.=====.
BOSTON    4  44.4
CHICAGO   4  44.4
NEW YORK  1  11.1
```

---

### Vertical Cumulation and Selecting Fields

Counts, accumulates, and calculates cumulative percentages. Uses `P` to include only parameterized fields.

```
@cnt,'report5a' p 2-8,60-5,66-5 |,1,=+,%+ .
```

| Parameter | Purpose |
|-----------|---------|
| `p` | Pack result to show only referenced fields |
| `1` | Key field |
| `=+` | Cumulative count |
| `%+` | Cumulative percentage |

Result:
```
*Location.Count. % .
*========.=====.=====.
BOSTON     4  44.4
CHICAGO    8  88.9
NEW YORK   9 100.0
```

---

### Subtotaling and Averaging

Subtotals hours down per cause code and averages the cost per cause.

```
@cnt,'report5a' '' 27-4,32-6,50-9 |,+,1,'/' .
```

| Parameter | Purpose |
|-----------|---------|
| `1` | Key field (Cause) |
| `+` | Subtotal downtime hours |
| `/` | Average cost |

Result:
```
 .70  CODE1   302.50000
4.10  CODE2   767.80000
4.50  CODE3  3770
```

---

### Justifying

Applies left-justification to Down and Cost fields using the `J` parameter.

```
@cnt,'report5a' '' 27-4,32-6,50-9 |,+,1,'/'/j,l,,l .
```

Result:
```
2.7  CODE1  302.50
4.1  CODE2  767.80
4.5  CODE3  3770.00
```

> **Note:** The `J` option applies only to numeric fields, not date or time fields.

---

### Rounding

Rounds subtotals to the nearest tenth and averages to the nearest hundredth.

```
@cnt,'report5a' '' 27-4,32-6,50-9 |,+,1,'/'/r,.1,,.01 .
```

---

### Subtotal Cumulation and Selecting Fields

Accumulates downtime subtotals per cause and uses `P` to show only referenced fields.

```
@cnt,'report5a' p 27-4,32-6 |,++,1/r,.1 .
```

Result:
```
* Cause.Down.
*======.====.
CODE1   2.7
CODE2   6.8
CODE3  11.3
```

---

### Selecting Fields for Result Values

Uses extraction parameters to place result values in selected fields.

```
@cnt,'report5a' '' 2-8,27-4,39-10 |,1,a,+a .
```

| Parameter | Purpose |
|-----------|---------|
| `1` | Key field (Location) |
| `a` | Labels Down field as A; extracts first value per key |
| `+a` | Subtotals field labeled A |

> **Note:** Using `A-` instead of `A` would label the field but exclude it from the result.

---

### Performing Multiple Operations on a Field

Performs both subtotal and average on the same field using extraction labels.

```
@cnt,'report5a' '' 2-8,27-4,39-10 |,1,a+,'/'a .
```

| Parameter | Purpose |
|-----------|---------|
| `a+` | Labels Down as A and subtotals it |
| `/a` | Averages field A, placing results in Value field |

---

### Computing Percentages of Grand Totals

Expresses subtotals and cumulative percentages of grand totals.

```
@cnt,'report5a' '' 2-8,27-4,50-9 |,1,+%,%+/r,,.1,1 .
```

| Parameter | Purpose |
|-----------|---------|
| `+%` | Subtotal as percent of grand total |
| `%+` | Cumulative entry percentage |
| `r` | Rounds Down to tenths, Cost to units |

---

### Computing Cumulative Percentage

Computes and accumulates subtotal percentages of grand total hours down, using `P` for field selection.

```
@cnt,'report5a' p 2-8,27-4,66-5 |,1,a+%,+%+a/r,,.1,.1 .
```

Result:
```
*Location.Down. %
*========.====.=====
BOSTON   18.6  18.6
CHICAGO  72.6  91.2
NEW YORK  8.8 100.0
```

---

### Multiple Analyses in a Single Pass

Performs two separate analyses in one request. Up to 8 parameter sets are supported.

```
@cnt,'report5a' '' 2-8,27-4,32-6,50-9 |,1,a'/',,+a/ |,=,,1 .
```

First analysis — average and subtotal hours by location. Second analysis — entry count by cause code. Results are separated by `.EJECT` in the output.

---

### Scaling a Numeric Key Field

Groups downtime values into 0.5-unit intervals between 1 and 4, then averages cost per interval.

```
@cnt,'report5a' s1(.5/1/4) 27-4,50-9 |,1,'/'/r,,1 .
```

| Option | Meaning |
|--------|---------|
| `s1` | Scale key field 1 |
| `.5` | Interval size |
| `/1/4` | Min = 1, Max = 4 |

---

### Scaling a Date Key Field

Groups dates into 2-week intervals (Saturday start) between May 20 and December 1, 1989, then averages cost.

```
@cnt,'report5a' s1d1(2w/890520/891201/sat) 116,50-9 |,1,'/' .
```

| Option | Meaning |
|--------|---------|
| `s1d1` | Scale key field 1 as date format 1 (YYMMDD) |
| `2w` | 2-week intervals |
| `890520` / `891201` | Date range |
| `sat` | Intervals begin on Saturday |

---

### Scaling a Time Key Field

Groups times into 6-hour intervals starting at 06:00:00, then subtotals hours down per interval.

```
@cnt,'report5a' s1t0(6h/06:00:00) 18-8,27-4 |,1,+ .
```

| Option | Meaning |
|--------|---------|
| `s1t0` | Scale key field 1 as time format 0 (HH:MM:SS) |
| `6h` | 6-hour intervals |
| `06:00:00` | Ignore times before 06:00:00 |

---

### Extending Intervals to the Boundaries

Uses the `B` option to show all intervals from 0 to 5, including those with no entries.

```
@cnt,'report5a' s1(1/0/5)b 27-4,50-9 |,1,+ .
```

Result includes intervals 3 and 5 with cost of 0, which would be omitted without `B`.

---

### Omitting Headings in Multiple Analyses

Uses `H` to suppress the headings normally inserted between multiple analyses.

```
@cnt,'report5a' h 2-8,32-6,50-9,60-5 |,1,,+,/ ,,1,'/',= .
```

---

### Computing Total Summarizations

Uses `T` to append grand totals, grand averages, total entries, and overall maximum to the result.

```
@cnt,'report5a' t 2-8,27-4,32-6,50-9 |,1,+%,=,> .
```

---

### Reordering Specified Result Fields

Uses `P` with labeled parameters to pack and reorder result fields per the hierarchy.

```
@cnt,'report5a' p 2-8,27-4,32-6,39-10,50-9 |,1,b+,'/'b,'/'a,a+ .
```

| Parameter | Purpose |
|-----------|---------|
| `b+` | Labels Down as B and subtotals |
| `/b` | Averages field B |
| `/a` | Averages field A |
| `a+` | Labels Cost as A and subtotals |

Result is reordered: Location (key) → Cost (A, computational) → Value (A, average) → Down (B).

---

### Report Key — Processing by Report

Subtotals sales by report number across a drawer. Each report represents one month.

```
@cnt,'drawerb' r2,3 2-13,16-6 |,1R,+/r,,.01 .
```

| Parameter | Purpose |
|-----------|---------|
| `1R` | Groups by report number |
| `+` | Subtotals sales per report |
| `r.01` | Rounds to nearest hundredth |

---

### Line Number Key — Processing by Line

Subtotals sales by line number across reports in a drawer. Requires consistent line-number alignment across reports.

```
@cnt,'drawerb' r2,3 2-13,16-6 |,1L,+ .
```

| Parameter | Purpose |
|-----------|---------|
| `1L` | Groups by line number |
| `+` | Subtotals sales per line |
