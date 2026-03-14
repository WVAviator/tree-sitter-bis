# @IF — If Conditional

## Overview

Tests the relationship between two or more values and specifies the statements to execute when the test condition is true or false.

---

## Syntax

**Basic format:**
```
@IF[,o] val1 op val2 stmt1 [.] ; stmt2 .
```

**Logical OR:**
```
@IF[,o] val1 op val2,val3[,val4,...,valn] stmt1 [.] ; stmt2 .
```

**Logical AND:**
```
@IF[,o] val1 op val2 & op val3 [& op val4 ... & op valn] stmt1 [.] ; stmt2 .
```

**Computed IF/GTO:**
```
@IF[,o] val1 op val2,(lab)[,val3,(lab),...,valn,(lab)] ; stmt1 .
```

### Parameters

| Field | Description |
|-------|-------------|
| `o` | Options field. See [Options](#options). |
| `val1` | Data to compare. Specify as a variable, constant, literal, or reserved word. |
| `op` | Relational operator. See [Operators](#operators). |
| `val2` | Data to compare to `val1`. Specify as a variable, constant, literal, or reserved word. |
| `stmt1 [.]` | Statements to execute when the condition is true. Omit the terminating ` . ` if `stmt2` is also to be executed on a false condition. |
| `stmt2 .` | Statements to execute when the condition is false. Must be followed by ` . `. |
| `,val3,...,valn` | A comma (`,`) representing a logical OR, followed by additional comparison values. |
| `& op val3...& op valn` | An ampersand (`&`) representing a logical AND, followed by a relational operator and additional value. |
| `,(lab)` | Label at which to continue execution when the condition is true. Valid keywords: `END` (end of run), `LIN +n` (current line plus `n`), `LIN -n` (current line minus `n`), `RPX r` (run control report `r` in the same cabinet and drawer). |

---

## Operators

| Operator | Meaning |
|----------|---------|
| `=` or `EQ` | Equal |
| `GE` | Greater than or equal |
| `>` or `GT` | Greater than |
| `LE` | Less than or equal |
| `<` or `LT` | Less than |
| `NE` or `NOT =` or `NOT EQ` | Not equal |
| `NOT LT` or `NOT <` | Not less than |
| `NOT GT` or `NOT >` | Not greater than |

---

## Options

| Option | Platform | Description |
|--------|----------|-------------|
| `C` | All | Distinguishes between uppercase and lowercase letters. |
| `Dn` | All | Performs date comparisons, where `n` is a date format number. See [Date Formats](#date-formats). Place dates in the `val1`, `val2`, etc. fields. |
| `S` | 2200 | Performs a string comparison of the operands. |

---

## Date Formats

Two-digit year dates must represent dates between 1944 and 2043. Four-digit year dates must represent dates between 1600 and 2299. One-digit year dates represent dates within −4 to +5 years from the current date.

| Number | Format | Number | Format |
|--------|--------|--------|--------|
| `0` | `YMMDD` | `11` | `YYYYMMDD` |
| `1` | `YYMMDD` | `12` | `DD MMM YYYY`* |
| `2` | `DD MMM YY`* | `14` | `YYYYDDD` |
| `3` | `YDDD` | `15` | `DDMMYYYY` |
| `4` | `YYDDD` | `16` | `MM/DD/YYYY` |
| `5` | `DDMMYY` | `18` | `MMDDYYYY` |
| `6` | `MM/DD/YY` | `19` | `DD/MM/YYYY` |
| `7` | `MONTH DD, YYYY` | `20` | `YYYY-MM-DD` |
| `8` | `MMDDYY` | `21` | `DD-MMM-YY` |
| `9` | `DD/MM/YY` | | |

*Spaces are optional.

---

## Guidelines

- If the condition is true, statements are executed until a branch is encountered or the equation is terminated with a period. If false, statements following the semicolon are executed.
- To execute `stmt2` only when the condition is false and continue on the next line when true, use: `@IF {condition} {stmt1} . ; {stmt2} .`
- The system checks the content of type `A` variables to determine how to process data:
  - If the first character is numeric, the system scans for a space or non-numeric. If a space is found first, the variable is treated as numeric; otherwise as alphanumeric.
  - If the first character is non-numeric, the variable is treated as alphanumeric and the entire variable is scanned.
- In type `H` variables, characters must be identical to satisfy a true condition.
- The `IF` statement treats `.` and `+` as zeros in type `A` variables when they are treated as numeric.
- *(2200)* The `IF` statement considers the contents of a type `O` variable as a decimal value, not octal. When comparing substrings of up to 18 characters, all characters in the substring are treated as type `A` variables.
- *(Windows / Linux / UNIX)* When comparing substrings, all characters are treated as type `A` variables.
- For string comparisons, it is recommended to use type `H` or type `S` variables to avoid unexpected behavior with spaces and numeric detection.

> **Tip:** Use labels rather than line numbers for branching. See [`@GTO`](GTO.md) for related branching behavior.

---

## Examples

### Basic Examples

Branch to label `002` if `USER$` equals `newuser`; otherwise branch to `001`:
```
@if user$ EQ newuser gto 002 ; gto 001 .
```

Release the screen if `<status>` equals `<done>`; otherwise continue:
```
@if <status> EQ <done> rel ; .
```

Branch to label `001` if both `v1` equals `A` and `v2` equals `B`; otherwise continue:
```
@if v1 EQ a if v2 EQ b gto 001 ; .
```

If `v1` equals `2`, load `v3` with `4` and branch to `001`; otherwise branch to `002`:
```
@if v1 EQ 2 ldv v3=4 gto 001 ; gto 002 .
```

If `<test1>` equals `<count>`, increment by `1`; otherwise increment by `2`:
```
@if <test1> EQ <count> inc <test1> . ; inc,2 <test1> .
```

---

### Logical OR

Branch to label `010` if `<menu>` equals `2` or `4`; otherwise continue:
```
@if <menu> EQ 2,4 gto 010 ; .
```

---

### Logical AND

Branch to label `003` if `v1` is greater than `0` and less than `100`; otherwise continue:
```
@if v1 GT 0 & LT 100 gto 003 ; .
```

---

### Computed IF/GTO

Branch to `001` if `<total>` = `30`, to `002` if `40`, to `003` if `50` or `60`; otherwise continue:
```
@if <total> EQ 30,(001),40,(002),50,60,(003) ; .
```

Branch forward two lines if `v2` = `4`, to end of run if `v2` = `5`; otherwise continue:
```
@if v2 EQ 4,(lin +2),5,(end) ; .
```

---

### Trailing Substring Examples

Branch to label `025` if the last three characters of `v1` contain `mon` (unknown starting position):
```
@if v1(0-3) EQ mon,(025) ; .
```

Branch to label `026` if characters from position `3` to end of `v1` contain `fri`:
```
@if v1(3-0) EQ fri,(026) ; .
```

Date format comparison using format `9` (`DD/MM/YY`):
```
@LDV v1h8='11/01/95' .
@IF,d9 v1 LT date9$ rel ; .
```

---

### Variable Type Behavior Examples

The following examples illustrate how the system determines whether to treat type `A` variables as numeric or alphanumeric:

```
@LDV V1A13='01 numeric value' .
@LDV V2A13='01 numeric value1' .
@IF V1 NE V2 REL ; .
```
> Both treated as numeric (space found after digits) → returns **equal**.

```
@LDV V1A13='0a is not numeric value' .
@LDV V2A13='0a is not numeric value1' .
@IF V1 NE V2 REL ; .
```
> Both treated as alphanumeric (non-numeric after first digit) → returns **not equal**.

```
@LDV V1A26='999E0 is not numeric value' .
@LDV V2A27='999E0 is not numeric value1' .
@IF V1 NE V2 REL ; .
```
> Both treated as numeric (`E` triggers numeric scan) → returns **equal**.

```
@LDV V1A13='I LOVE MAPPER' .
@LDV V2A13='I LOVE UNISYS' .
@IF V1 NE V2 REL ; .
```
> Both treated as alphanumeric (non-numeric first character, full scan) → returns **not equal**.
