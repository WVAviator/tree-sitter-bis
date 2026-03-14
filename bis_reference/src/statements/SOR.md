# SORT, @SOR (Sort), SORTR, @SRR (Sort and Replace)

## Overview

Use the `SORT` function or `@SOR` statement to put the lines of a report in a specified order.

Use the `SORTR` function or `@SRR` statement to sort the lines of a report and replace the sorted data back into the original report. This is equivalent to a `SORT` followed by a Replace Report command.

You can use the [`ISOR`](../runs/ISOR.md) run to save and reuse Sort function masks containing options and parameters, and to create `@SOR` statements.

With the Sort command, you can:

- Sort a report by placing a field in alphabetical order (ascending) or reverse alphabetical order (descending).
- Sort a report by organizing a field in numerical order. Use the `N` parameter to sort numbers containing decimal points, spaces, plus, and minus signs.
- Sort a report using multiple fields — for example, sort the St Cd field alphabetically and within that, sort the Product Type field.

> **Note:** For the Sort and Replace Report manual function, you must be the last person to have updated the report. `SORTR` cannot be used on a result — only on a report.

---

## Syntax

### Control Lines

```
SORT [report f]
SORTR [report f]
```

### Statements

```
@SOR,c,d,r o cc ltyp,p .
@SRR,c,d,r o cc ltyp,p .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `report` / `c,d,r` | Required | Report to sort. See *Specifying Reports or Drawers to Process* for details. |
| `f` | Optional | Report format in which to sort data. Enables sorting of fields beyond column 80 if those columns are not already on display. |
| `o` | Optional | Options field. See [Options](#options). |
| `cc` | Required | Column-character positions or names of the fields to sort. |
| `ltyp` | Required | Line type to sort. If using the `A` option, leave this subfield blank but include the comma. |
| `p` | Required | Parameters field. See [Parameters](#parameters). |

> *(2200 only)* You can sort fields totaling up to 160 characters in width.

---

## Options

| Option | Platform | Description |
|--------|----------|-------------|
| `A` | All | Processes all line types together. See [Sorting All Line Types Together Example](#sorting-all-line-types-together). |
| `C(S)` | Windows / Linux / UNIX | Distinguishes between uppercase and lowercase letters. Uppercase precedes lowercase in ascending sorts (e.g., `Zebra` precedes `apple`). |
| `C(x)` | 2200 only | Alters the sort based on character set order. Options: `C(F)` = full character set (FCS), `C(L)` = limited character set (LCS), `C(S)` = strict comparison (case-sensitive). |
| `S` | 2200 only | Stabilizes the sort — two equal lines always remain in the same order as in the original report. |
| `U(x)` | All | Sorts units (paragraphs) of line type `x` based on a trailer line field. Default = tab type. The sort key comes from the first trailer line of the mask line type. Each unit must contain at least one sort key line. Cannot be used with the `A` option. |
| `X+` | 2200 only | Forces sorting using the OS 2200 Sort/Merge product (if installed), regardless of report length. |
| `X-` | 2200 only | Forces sorting using the normal software process, regardless of report length. If neither `X+` nor `X-` is specified, the sort process is determined by report length. |

---

## Parameters

| Parameter | Description |
|-----------|-------------|
| `1`–`5` | Specifies the fields to sort and their hierarchy. Level `1` is the primary sort key, `5` is the lowest. For example, `1` on Last Name sorts alphabetically by last name; adding `2` on First Name then sorts first names within each last name group. |
| `D` | Sorts in descending order. Follow the level number with `D` (e.g., `2d`). |
| `N` | Sorts fields containing numbers by strict value regardless of alignment. Follow the level number with `N` (e.g., `1n`). Handles decimals, negative signs, spaces, and plus signs. |
| `Yn` | Defines a date field to sort. `n` is the date format number (0–20 on Windows / Linux / UNIX; 0–21 on 2200). Immediately follows the level parameter (e.g., `2dY1`). Invalid dates are treated as binary zeros — placed at the top for ascending sorts, at the bottom for descending sorts. See *Entering Dates and Times in the DC Statement* for a complete list of date formats. |

---

## Outcome

### Sort

- Creates a result with fields sorted as specified. Default order = ascending.
- *(Windows / Linux / UNIX)* Sorts text according to the alphabetic order of the language used. Equal lines are always left in their original order.
- *(2200 only)* Places an update lock on the report during sorting. Sorts according to the character set order of the drawer, or the character set specified with `C(x)`.

### Sort and Replace Report

- Places an update lock on the report during sorting.
- *(Windows / Linux / UNIX)* Sorts according to the alphabetic order of the language used.
- *(2200 only)* Sorts according to the character set order of the drawer, or the character set specified with `C(x)`.
- When using the manual function, the system redisplays the sorted report, updating the time and date in the date line. No result is created.

### @SRR Statement

In addition to the above, `@SRR` sorts and replaces the original report, renames the report `-0`, and releases any previous `-0` result.

---

## Examples

### Sorting in Ascending and Descending Order

Sorts the St Cd field (`2-2`) in ascending order and the Product Type field (`15-9`) in descending order:

```bismapper
@sor,'report3b' '' 2-2,15-9 |,1,2d .
```

```
Result:
IP 831227 LS BLACKBOX7
IP 831215 LS BLACKBOX7
IP 831216 LS BLACKBOX6
...
OR 831210 LS BLACKBOX7
OR 831227 LS BLACKBOX7
SC 840108 LS BLACKBOX7
SC 840110 LS BLACKBOX5
SH 831203 LS BLACKBOX6
XX 831202 LS MAUVEBOX0
XX 831209 LS ITSA-BOX0
```

### Sorting All Line Types Together

Using the same sort parameters as above but with the `A` option — all line types (including period and asterisk lines) are sorted together:

```
Result with A option:
.Comment line describing
IP 831227 LS BLACKBOX7
...
*OR 840110 LS BLACKBOX4
SC 840108 LS BLACKBOX7
...
```

### Sorting Numbers

Uses the `N` parameter to sort numbers containing decimals and negative signs, regardless of alignment:

```bismapper
@sor,'report3a' '' 2-4 |,1n .
```

```
Result (with N):    Result (without N):
-12                 4
1.2                 1.2
4                   -12
123                 123
```

### Sorting Dates

Sorts using the `Y` parameter with date format `1` (YYMMDD). The sort key `2dY1` sorts the Status Date field descending, and `1` sorts the St Cd field ascending:

```bismapper
@sor,'drawerb' '' 5-6,15-9 |,2dY1,1 .
```

### Sorting Units by Trailer Field (U Option)

Sorts paragraph units (bounded by tab lines) by the date on a `C`-type trailer line. No line type is specified with `U`, so tab lines define paragraph boundaries:

```bismapper
@sor,'report' u 41-6 c,1 .
```

```
Result (sorted by received date):
980507 Item B    (first received date: 980601)
980505 Item A    (first received date: 980630)
980509 Item D    (first received date: 980701)
980508 Item C    (first received date: 980610 → 980701 latest)
```

---

## See Also

- [`@SRR`](SOR.md) — Sort and Replace (covered on this page)
- [`ISOR`](../runs/ISOR.md) — Iterative Sort
- [`@SRH`](SRH.md) — Search
- [`@BFN`](BFN.md) — Binary Find
