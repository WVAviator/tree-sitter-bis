# Using Constants and Reserved Words

## Overview

This section covers the following topics:
- [Using Predefined Constants](#using-predefined-constants)
  - [DEFINE Statement Format](#define-statement-format)
  - [DEFINE Statement Behaviors](#define-statement-behaviors)
  - [DEFINE Statement Guidelines](#define-statement-guidelines)
  - [Defining a Literal Value That Contains Spaces](#defining-a-literal-value-that-contains-spaces)
  - [Defining Related Groups of Data](#defining-related-groups-of-data)
  - [Using the BLT Command](#using-the-blt-command)
  - [Using the INCLUDE Statement](#using-the-include-statement)
- [Using Reserved Words in Scripts](#using-reserved-words-in-scripts)
- [Initializing a Variable to the Value of a Reserved Word](#initializing-a-variable-to-the-value-of-a-reserved-word)

---

## Using Predefined Constants

The [`@DEFINE`](../statements/DEFINE.md) and [`@INCLUDE`](../statements/INCLUDE.md) statements let you predefine values for any fields and subfields used in your statements — including database location (`c,d,r`), fields to process (`cc`), function parameters, and more. By defining these values in one place, you avoid searching multiple run control reports every time something needs to change.

Constants are especially useful in complex applications or when multiple script designers are collaborating.

You can define constants for:
- Labels (e.g., `@010:`)
- Run function calls (e.g., `SRH`)
- Database location (`c,d,r`)
- Fields to process (`cc`)
- Function parameters (`p`)
- Output area data
- Variable names

> **Note:** Before placing your script into production, use the `BLT` command to convert all `DEFINE` statements to their defined values.

### DEFINE Statement Format

```
:DEFINE constant value
```

You can use either `:D` or `:DEFINE` as the call.

| Field | Description |
|-------|-------------|
| `constant` | Up to 18 characters, beginning with an alphabetic character. May include letters, digits (0–9), and underscores (`_`). **Case sensitive.** |
| `value` | Any combination of variable names, reserved words, or literal data to substitute when the constant is used. |

**Maximum value length:**

| Platform | Maximum |
|----------|---------|
| Windows / Linux / UNIX | Length of one run control report line minus the characters used for `:DEFINE` and `constant`. |
| OS 2200 | 18 characters. |

### DEFINE Statement Behaviors

- When the system detects a quotation mark in the defined value, it includes everything up to the next quotation mark (unless the value exceeds the maximum size or the end of the line is reached).
- If duplicate constants are defined, the value from the **last** `DEFINE` statement is used.

### DEFINE Statement Guidelines

- `DEFINE` statements require an additional **16,384 bytes (16K)** of memory at execution time. Use the `BLT` command to convert all constants to their actual values before production.
- Place all `DEFINE` statements at the **beginning** of your run control report.
- Define only **one constant per** `DEFINE` statement.
- Do not place other statements on the same line after a `DEFINE` statement — they will be ignored. Put the next statement on a new line.
- When several scripts share common constants, define them in a separate report and use the `INCLUDE` statement to pull them in.
- You can define a constant to contain a variable name. When using the constant to initialize that variable, enclose the type and size in apostrophes:

  ```
  :define drawer v102
  @ldv drawer'H1'=b .
  ```

- Do not use `@GTO LIN[+]n` or `@GTO LIN-n` with `DEFINE` constants — when `BLT` converts and packs lines, relative line number references become incorrect.

**Maximum number of constants:**

| Platform | Maximum |
|----------|---------|
| Windows / Linux / UNIX | 600 |
| OS 2200 | 2,500 |

*(Windows / Linux / UNIX only)*
- A `DEFINE` can reference the value of another `DEFINE` (nesting is supported).
- A `DEFINE` replacement string cannot contain the name of the `DEFINE` itself. The following is **not** allowed:
  ```
  :DEFINE MyCab <MyCab>i4
  ```
- Replacement strings within quotation marks (`"`) **are** evaluated for substitution; strings within apostrophes (`'`) are **not**:
  ```
  :define xxx zzz
  xxx 'xxx' "xxx"
  ```
  Returns: `zzz xxx zzz`
- The total number of replacement string characters cannot exceed **16,000**.

### Defining a Literal Value That Contains Spaces

Enclose the literal value in apostrophes (`'`) or quotation marks (`"`). To include an apostrophe within the value, use two apostrophes and enclose the entire value in quotation marks.

If a space-delimited word within an apostrophe-enclosed literal matches the name of another `DEFINE` constant, BIS substitutes that constant's value into the literal string.

**Example:**

```
:DEFINE string1 'Column1 |,1d'
:DEFINE Column1 5-6
```

After processing, `string1` is defined as: `'5-6 |,1d'`

### Defining Related Groups of Data

*(Windows / Linux / UNIX only)*

Define the main item first with a standard `:DEFINE` statement. Define subordinate items on the following lines using a colon and a space:

```
:define status_rpt 0,b,2
: prod_type 15-9
: customer 45-4
:define factors_rpt 0,c,1
: prod_type 2-9
```

Subordinate constants (like `prod_type` above) resolve based on context — the system substitutes the appropriate value depending on which parent constant they appear with:

```
@srh,status_rpt d prod_type,customer |,blackbox1,amco .
@srh,factors_rpt d prod_type |,blackbox1 .
```

Becomes:

```
@srh,0,b,2 d 15-9,45-4 |,blackbox1,amco .
@srh,0,c,1 d 2-9 |,blackbox1 .
```

### Using the BLT Command

The `BLT` command converts all included and defined constants to their actual values, removes comments, and produces a result. Save this result as a separate report to use as the production version — your source script retains the defined constants and comments for easier maintenance.

Additional `BLT` behaviours:
- If conversion causes a line to exceed the maximum line length, `BLT` automatically inserts continuation characters (`\`) and wraps the statement.
- Two consecutive apostrophes with nothing between them (and not paired with open apostrophes) are converted to a single apostrophe. For example, `'user''''s name'` and `user''s' name'` both become `user's name`.

**Example 1 — defining report, columns, and parameters:**

```
:define search_rpt 0,b,2,5
:define prod_type 15-9
:define item greenbox8
@srh,search_rpt d prod_type |,item <lines>i4,<scan>i4 .
```

After `BLT`:

```
@srh,0,b,2,5 d 15-9 |,greenbox8 <lines>i4,<scan>i4 .
```

**Example 2 — defining columns, a parameter with leading spaces, and a variable:**

```
:define field 56-8
:define target "'     100'"
:define snum v100
@srh,0,c,1 d field |,target snum'i5' .
```

After `BLT`:

```
@srh,0,c,1 d 56-8 |,'     100' v100i5 .
```

---

## Using the INCLUDE Statement

Use the `INCLUDE` statement to import all defined constants from another report into your current script.

**Format:**

```
:INCLUDE,c,d[,r] .
```

You can use either `:I` or `:INCLUDE` as the call. If no report number is specified, the system uses report 0 in that drawer.

> *(OS 2200)* Do not use reserved words in the `c`, `d`, or `r` subfields.

**Example** — include `DEFINE` statements from report `15E0`:

```
:include,0,e,15 .
```

### INCLUDE Statement Guidelines

- `INCLUDE` statements require an additional **16,384 bytes (16K)** of memory. Use `BLT` to convert constants to their actual values before production.
- Place all `INCLUDE` statements at the **beginning** of your run control report.
- Specify only **one report per** `INCLUDE` statement; multiple `INCLUDE` statements are allowed.
- Do not place other statements on the same line after an `INCLUDE` statement — they will be ignored.
- Constants are defined in the order they are included. If duplicate constants exist, the value from the **last** `DEFINE` encountered is used.
- The same constant limits apply as with `DEFINE`: 600 on Windows/Linux/UNIX; 2,500 on OS 2200.

---

## Using Reserved Words in Scripts

Reserved words are system-maintained variables you can use to retrieve information managed by BIS — for example, `DATE1$` returns the current date in `YYMMDD` format.

Some reserved words contain meaningful data only after a specific statement has executed. For example, `XERR$` is only meaningful after an `RER` (Register Error Routine) statement runs. Where this applies, it is noted in the reserved word's description.

### General Guidelines

- Use the [`@LDV`](../statements/LDV.md) statement to load a variable with the value of a reserved word.
- *(OS 2200)* Use the `LDV W` option when loading a reserved word into a variable.
- *(Windows / Linux / UNIX)* The `LDV W` option has no additional effect but allows scripts to be compatible with BIS for ClearPath OS 2200.

**Output area behaviour:**

| Platform | Behaviour |
|----------|-----------|
| Windows / Linux / UNIX | The system inserts the **value** of reserved words placed in the output area. |
| OS 2200 | The system inserts the **literal name** of the reserved word. To place the value in the output area, load a variable with the reserved word and place the variable in the output area. |

**Using reserved words that contain report data** (e.g., `STAT1$`, `STAT2$` when used with the `LZR` statement):

1. Load values from these reserved words into `H`-type (Hollerith) variables.
2. Right-justify and zero-fill the values.

### Reserved Word Type Notation

The reserved word lists use bracketed abbreviations to indicate the recommended variable type and size:

| Symbol | Type |
|--------|------|
| `A` | Alphanumeric |
| `F` | Fixed-point decimal |
| `H` | Hollerith |
| `I` | Integer |
| `S` | String |

**Example:** `DRW$ [I6]` — drawer number of the current result (`-0`); use as an integer, 6 characters long.

---

## Initializing a Variable to the Value of a Reserved Word

Use `CHG` or `LDV` statements to initialize a variable with the value of a reserved word.

**Example** — initialize `v2` as one less than the current vertical cursor position:

```
@chg v2i2 CURV$ - 1 .
```

**Example** — initialize variables with the cabinet, drawer, and report number of the last report or result processed:

```
@ldv,w <cabinet>i4=CAB$,<drawer>i6=DRW$,<report>i4=RPT$ .
```

You can also use reserved words directly to specify values for fields and subfields in statements. See [Using Reserved Words in Scripts](#using-reserved-words-in-scripts) for guidelines.
