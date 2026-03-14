# Variables Overview

## Overview

This section covers the following topics:
- [Description of Variables, Reserved Words, and Constants](#description-of-variables-reserved-words-and-constants)
- [Variable Types and Sizes](#variable-types-and-sizes)

---

## Description of Variables, Reserved Words, and Constants

| Term | Description |
|------|-------------|
| **Variable** | A named storage area. You can store and retrieve data in variables, and use them in statements to supply values for fields and subfields. Before use, a variable must be defined by declaring its name, type, and size. An initial value can optionally be assigned. |
| **Global run variable** | A variable accessible to other scripts. Global run variables remain available until the application that created them is released, or they are cleared by the [`@CLV`](../statements/CLV.md) (Clear Variables) statement. Use these as an alternative to passing all variables on a `CALL` statement. See *Variable Definition Formats* for more information. |
| **Environmental session variable** *(Windows / Linux / UNIX)* | A variable accessible to all scripts. Environmental session variables remain available until the user terminates the BIS session or the script clears them using `@CLV`. Use these to set up session defaults such as colors. See *Variable Definition Formats* for more information. |
| **Array** | A series of one or more variables of the same type and size, assigned a single name. Each variable within the array is called a member. See [`@LDA`](../statements/LDA.md) (Load Variable Array) in the Command Reference for more information. |
| **Reserved word** | A system-maintained variable. Use reserved words in run control reports to retrieve system-maintained information. For example, `DATE1$` retrieves the current date; `USER$` retrieves the current user's ID. See *Reserved Word Lists* for a complete list. |
| **Constant** | A named value. You define constants by assigning a logical name to a value, then use the name rather than the value in statements. Using constants makes scripts easier to read, develop, debug, and maintain. See *Using Predefined Constants* for more information. |

---

## Variable Types and Sizes

A variable's type indicates the kind of data it stores. BIS provides the following data types:

| Type | Name | Platforms |
|------|------|-----------|
| `A` | Alphanumeric (any characters) | All |
| `F` | Fixed-Point (numbers with a fractional part) | All |
| `H` | Hollerith (any characters) | All |
| `I` | Integer (whole numbers) | All |
| `O` | Octal (octal numbers) | OS 2200 only |
| `S` | String (any characters) | All |

> *(Windows / Linux / UNIX)* The type determines not only the kind of data allowed in the variable, but also the maximum size and the manner in which the system loads data into it.

> *(Windows / Linux / UNIX)* **Note:** If an `I`-type variable does not contain a value, or if the value it contains is alphabetic, the system converts it to an `A`-type variable.

### Type Reference

> The type determines not only the kind of data allowed in the variable, but also the maximum size. Justification depends on the functions and options being used.

#### A — Alphanumeric

| | OS 2200 | Windows / Linux / UNIX |
|---|---------|------------------------|
| Characters | All characters | All characters |
| Maximum size | 16 | 16 |
| Justification | — | Left |
| Default initial value | — | Blank |

#### F — Fixed-Point

Characters: all numbers, signs (`+` and `-`), and decimal (`.`). Maximum size: 18 (including sign and decimal). When characters added to the left of the decimal cause the contents to exceed 18 characters, the fractional portion is truncated.

Format: `Ftotal-characters.fractional-characters`

Example: `v1f18.10` = 18 characters total, with 10 characters to the right of the decimal point.

| | OS 2200 | Windows / Linux / UNIX |
|---|---------|------------------------|
| Max fractional portion | 10 characters | 16 characters |
| Justification | — | Right |
| Default initial value | — | Zero |
| Precision | — | 15 significant digits |

#### H — Hollerith

| | All Platforms |
|---|---------------|
| Characters | All characters |
| Maximum size | 18 |
| Justification | Left |
| Default initial value | Blank |

#### I — Integer

Characters: numbers and signs (`+` and `-`).

| | OS 2200 | Windows / Linux / UNIX |
|---|---------|------------------------|
| Maximum size | 16 (including sign) | 16 (including sign) |
| Justification | — | Right |
| Default initial value | — | Zero |
| Precision | — | 15 significant digits |

#### O — Octal *(OS 2200 only)*

| | OS 2200 |
|---|---------|
| Characters | Octal numbers (0–7) |
| Maximum size | 12 |

#### S — String

| | OS 2200 | Windows / Linux / UNIX |
|---|---------|------------------------|
| Characters | All characters | All characters |
| Maximum size | `MAXCHR$` (504–999) | 998 |
| Justification | — | Left |
| Default initial value | — | Blank |
