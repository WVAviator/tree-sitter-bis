# A and @ART — Arithmetic

## Overview

The **A function** performs computations using either a built-in interactive calculator or predefined expressions in a report. It displays results on-screen in a drawer A result.

The **`@ART` statement** performs arithmetic operations on variables or constants, loading variables with the resulting values of expressions. Use `@ART` for complex operations; use [`@CHG`](CHG.md) for simple computations.

---

## Syntax

### A Function (Control Line)

```
A [report]
```

Where `report` is the report containing the predefined expressions. Type `-` (minus sign) to indicate the current report. For more details, see Specifying Reports or Drawers to Process.

### @ART Statement

```
@ART exp vrslts .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `exp` | Required | Arithmetic expression or expressions. Maximum of 26. |
| `vrslts` | Optional | Variables to capture the results of the expressions. Initialize the variables for the number of results you want to capture. |

---

## Arithmetic Operators

| Operator | Operation | Expression | Description |
|----------|-----------|------------|-------------|
| `+` | Addition | `a+b` | Value a plus value b |
| `-` | Subtraction | `a-b` | Value a minus value b |
| `/` | Division | `a/b` | Value a divided by value b |
| `//` | Integer division | `a//b` | Value a integer divided by value b |
| `*` | Multiplication | `a*b` | Value a times value b |
| `**` | Exponentiation | `a**b` | Value of a raised to the power of value b |
| `-` | Unary minus | `-a` | Negates the value of a |

> **Note:** Values `a` and `b` can be integers, real numbers, or expressions composed of integers and real numbers.

---

## Operator Precedence

Operations are performed in the following priority order unless overridden with parentheses (see [Changing Priority Example](#changing-the-priority)):

| Priority | Operator | Operation |
|----------|----------|-----------|
| First | `-` | Unary minus |
| Second | `**` | Exponentiation |
| Third | `*`, `/`, `//` | Multiplication, division, integer division |
| Fourth | `+`, `-` | Addition, subtraction |

---

## Mathematical Functions

> **Note:** Value `x` is an integer, a real number, or an arithmetic expression.

| Function | Description |
|----------|-------------|
| `ABS(x)` | Absolute value or magnitude of x. |
| `ACOS(x)` | Arc cosine of x in radians. |
| `ASIN(x)` | Arc sine of x in radians. |
| `ATAN(x)` | Arc tangent of x in radians. |
| `CBRT(x)` | Cube root of x. |
| `COS(x)` | Cosine of x in radians. |
| `CTN(x)` | Co-tangent of x in radians. |
| `DEG(x)` | x radians expressed in degrees. |
| `EXP(x)` | Natural number e raised to the power x. |
| `FRAC(x)` | Fractional portion of x. |
| `HCOS(x)` | Hyperbolic cosine of x. |
| `HSIN(x)` | Hyperbolic sine of x. |
| `HTAN(x)` | Hyperbolic tangent of x. |
| `INT(x)` | Integer portion of x. |
| `LOG(x)` | Logarithm of x in base e. |
| `LOG10(x)` | Logarithm of x in base 10. |
| `MOD(x,y)` | *(Windows Server / Linux / UNIX / Windows Client only)* Modulus; remainder value of x/y. |
| `PI` | Value of pi (3.14159265358979). |
| `RAD(x)` | x degrees in radians. |
| `SIN(x)` | Sine of x in radians. |
| `SQRT(x)` | Square root of x. |
| `TAN(x)` | Tangent of x in radians. |

---

## Guidelines

### A Function (Calculator) Guidelines

- To display the result when the calculator is on-screen, press **Contrl**. To return to the calculator view, press **Resume**.
- Expressions may be entered with or without spaces surrounding operators. (This does **not** apply to the `@ART` statement — see below.)
- Separate multiple expressions with semicolons (`;`). See [Multiple Expressions Example](#entering-multiple-expressions).

### Procedures: Using Predefined Expressions in a Report

**To create a report for predefined expressions:**
1. Add a report to a freeform drawer (such as drawer A) using the Add Report command.
2. If a heading divider line does not already exist, insert one directly below the headings.

**To enter the predefined expressions:**
1. Begin the first value or expression on the second line of the report, or in the second column of the first line, so the SOE character in the arithmetic calculator screen does not cover the first character.
2. End all values and expressions — except the last one — with a semicolon.
3. Precede variables with a tab character so you can easily tab to variable positions and replace values when using the A function later.

**To use the predefined expressions:**
1. Start the A function using the control line procedure, specifying the report containing the predefined expressions.
2. If you need to change variable values: tab to the variables, replace them with the desired values, then move the cursor to the line below the last expression and transmit.
3. If no changes are needed: move the cursor to the line below the last expression and transmit.

### @ART Statement Guidelines

- Specify arithmetic operators for every operation. For example, enter *a times b* as `a*b` — forms like `(a)(b)` or `ab` are not valid.
- Do **not** precede or follow operators with spaces.
- When using more than one expression, separate expressions with a semicolon (`;`) and separate result variables with a comma (`,`).
- If a variable in an expression may hold a negative number, place it in parentheses — otherwise the run interpreter may read it as part of an operator expression and the run will fail. All negative numbers in expressions must be enclosed in parentheses.
- You can use `A`, `F`, and `I` type variables containing numeric characters.
- Variables created internally by an `@ART` statement (`a`, `b`, etc.) can be referenced within the same statement to compute further expressions. See [Assigning Variable Names](#assigning-variable-names).
- Evaluating multiple expressions in a single `@ART` statement is more efficient than using a separate statement for each.

---

## Assigning Variable Names

You can either assign values to named variables yourself or let the system assign them automatically.

- **Explicit assignment:** `INPUT=35.6` assigns the value `35.6` to the name `INPUT`. `DATA=4+5` assigns the result of `4+5` to `DATA`.
- **Automatic assignment:** If no name is assigned, the A function labels results sequentially — the first unassigned value is named `A`, the second `B`, the third `C`, and so on.

---

## Examples

### Computing a Simple Expression

Adds the numbers 5, 4, 3, 2, and 1.

**Calculator:**
```
5+4+3+2+1
```
**Result:**
```
5+4+3+2+1
A = 15
```
**Equivalent Statement:**
```
@art 5+4+3+2+1 <sum>i2 .
```

---

### Entering Multiple Expressions

Separates three expressions with semicolons and assigns a name to the last result.

**Calculator:**
```
43-2*7;12-2;count=a-b
```
**Result:**
```
43-2*7;12-2;count=a-b
A = 29    B = 10    COUNT = 19
```
**Equivalent Statement:**
```
@art 43-2*7;12-2;count=a-b <answer1>i2,<answer2>i2,<answer3>i2 .
```

---

### Using the Default Priority

Evaluates `5+3**4/2` by: raising 3 to the 4th power first, dividing by 2, then adding 5.

**Calculator:**
```
5+3**4/2
```
**Result:**
```
5+3**4/2
A = 45.500000000
```
**Equivalent Statement:**
```
@art 5+3**4/2 <result>f12.9 .
```

---

### Changing the Priority

Uses parentheses to divide 2 by 3 first, then raises the quotient to the power of 4.

**Calculator:**
```
(2/3)**4
```
**Result:**
```
(2/3)**4
A = 0.1975308642
```
**Equivalent Statement:**
```
@art (2/3)**4 <result>f12.10 .
```

---

### Using a Mathematical Function

Uses the `RAD` function to get the equivalent of 180 degrees in radians.

**Calculator:**
```
rad(180)
```
**Result:**
```
rad(180)
A = 3.1415926536
```
**Equivalent Statement:**
```
@art rad(180) <result>f12.10 .
```
