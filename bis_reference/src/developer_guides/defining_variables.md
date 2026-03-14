# Defining and Using Variables

## Overview

This section covers the following topics:
- [Variable Definition Formats](#variable-definition-formats)
  - [Basic Variable Definition Format](#basic-variable-definition-format)
  - [Global Script Variable Definition Format](#global-script-variable-definition-format)
  - [Environmental Session Variable Definition Format](#environmental-session-variable-definition-format)
  - [Clearing Environmental Session and Global Run Variables](#clearing-environmental-session-and-global-run-variables)
- [Considerations Affecting Selection of Variable Type and Size](#considerations-affecting-selection-of-variable-type-and-size)
- [Using Scientific Notation](#using-scientific-notation)
- [Referring to Substrings Within Variables](#referring-to-substrings-within-variables)
- [No Variable Type Verification](#no-variable-type-verification)
- [Identifying Variables by Name or Number](#identifying-variables-by-name-or-number)
  - [Specifying Named Variables](#specifying-named-variables)
  - [Specifying Numbered Variables](#specifying-numbered-variables)
  - [Compatibility of Named and Numbered Variables](#compatibility-of-named-and-numbered-variables)

---

## Variable Definition Formats

A variable definition includes a declaration of the name, type, and size of the variable on any BIS statement in which a variable is allowed.

### Basic Variable Definition Format

```
nametypesize[.fsize]
```

| Parameter | Description |
|-----------|-------------|
| `name` | The variable name. |
| `type` | The variable type (see [Variables Overview](variables_overview.md)). |
| `size` | The character length of the variable. |
| `fsize` | *(F-type only)* The number of characters to the right of the decimal point. |

> **Note:** For `F`-type variables, `size` is the total size including the decimal point. For example, `<dollars>f6.2` is an F-type variable that is six characters long, with two characters to the right of the decimal.

### Global Script Variable Definition Format

Global variables use the same basic format, but with an asterisk (`*`) before the name:

```
<*name>typesize
```

**Example:** `<*global>i6`

Up to **100 global variables** can be defined. BIS sets aside 5,000 bytes to accommodate them. Both the count and the byte allocation can be adjusted by your BIS administrator — see the Administration Guide for details.

> *(Windows / Linux / UNIX)* Each defined global variable consumes a minimum of 19 bytes of global variable space, regardless of its defined length.

You cannot redefine the size of global script variables. BIS does not allow automatic initialization of global variables to the size of a field, as this is considered a form of redefinition.

> **Note:** When using the **Link to Another Script** (`LNK`) statement, the system does not pass global run variables to the linked script, but restores them to their previous state when the script executes a `GTO END` statement.

### Environmental Session Variable Definition Format

*(Windows / Linux / UNIX only)*

Environmental session variables use the same basic format, but with a dollar sign (`$`) before the name:

```
<$name>typesize
```

**Example:** `<$environment>i6`

BIS sets aside 600 bytes for up to 30 environmental session variables by default. Both the count and the byte allocation can be adjusted by your BIS administrator — see the Administration Guide for details.

You cannot redefine the size of environmental session variables. BIS does not allow automatic initialization of environmental variables to the size of a field, as this is considered a form of redefinition.

### Clearing Environmental Session and Global Run Variables

- Use [`@CLV`](../statements/CLV.md) with the `G` option to clear global run variables.
- *(Windows / Linux / UNIX)* Use [`@CLV`](../statements/CLV.md) with the `E` option to clear environmental session variables.

---

## Considerations Affecting Selection of Variable Type and Size

**Do you need to perform arithmetic on the data?**

- **Yes** — Use `I` or `F` type. Use `I` for whole numbers (positive or negative); use `F` for fractions (positive or negative).
- **No** — Use `A`, `H`, or `S` type:
  - `A`-type is the least efficient for storing numeric and nonnumeric data, because the system must check the contents to determine how to process them.
  - `H`-type is the most efficient for nonnumeric data up to 18 characters in length.
  - `S`-type is the only option for data exceeding 18 characters in length.

Before defining the variable size, determine the maximum number of characters needed to store the data and define the size accordingly. Accurately estimating the required size is important.

---

## Using Scientific Notation

You can load `A`, `F`, and `I` type variables with a number expressed in scientific notation:

```
mantissaEcharacteristic
```

| Part | Description |
|------|-------------|
| `mantissa` | The fractional part of the number. |
| `E` | Indicates scientific notation. |
| `characteristic` | The power of 10. |

**Examples:**

```
12e5     = 1,200,000
.1234e-3 = .0001234
```

When a number being loaded exceeds the variable's size, BIS automatically translates it into scientific notation. If it still does not fit, the system loads the variable with asterisks (`*`).

> *(OS 2200)*
> - Maximum value (double precision): `8.988465674312E307`
> - Minimum value (double precision): `1.00000000000E-307`
> - Minimum output value: `0.0000000000000001`
> - The system does not output scientific notation values with a negative characteristic.

> *(Windows / Linux / UNIX)* The maximum and minimum double-float precision values are determined by the operating system platform. Check your system documentation for supported values.

---

## Referring to Substrings Within Variables

### Trailing Characters

To refer to a substring consisting of a specific number of trailing characters:

```
<name>(0-n)
```

where `n` is the number of characters at the end of the variable to include.

**Example** — last four characters of `<phone>`:

```
<phone>(0-4)
```

### From a Specific Position to the End

To refer to a substring starting at a specific position through the remainder of the variable:

```
<name>(p-0)
```

where `p` is the starting character position.

**Example** — substring of `v50` starting at the 6th character:

```
v50(6-0)
```

---

## No Variable Type Verification

When you load data into a variable, BIS does not verify that the data matches the variable's type. For example, you can load alphabetic characters into an `I`-type variable without triggering a system message.

You are responsible for verifying that variable contents match their declared type. See *Testing the Contents of Variables*.

---

## Identifying Variables by Name or Number

### Specifying Named Variables

Named variables are identified by a character string enclosed in angle brackets:

```
<name>
```

where `name` is a 1–12 character string.

> *(Windows / Linux / UNIX)* You can use any characters in the name, including spaces and special characters. Examples: `<counter>`, `<commission>`, `<total_%>`

> *(OS 2200)* Use alphanumeric characters (A–Z, 0–9) only. Examples: `<counter1>`, `<commission>`, `<2001>`

> **Note:** When using a named variable in an expression such as an `IF` statement, if the variable is not defined, the system treats it as literal text.

### Specifying Numbered Variables

Numbered variables are identified by the letter `V` followed by a number:

```
Vn
```

**Examples:** `v9`, `v23`, `v007`

> *(Windows / Linux / UNIX)* `n` can range from 1 to 999 (or the number registered for an individual script). Defaults: 199 user variables, 30 environmental session variables, 100 global run variables. Maximum user variables: 999.

> *(OS 2200)* `n` can range from 1 to 199 by default. A site configuration or administrator can raise this up to 999, allowing all scripts to handle up to 999 variables.

### Compatibility of Named and Numbered Variables

Named and numbered variables can be used in the same script without conflict.

> *(OS 2200)* Named variables can be used anywhere numbered variables are used. When a named variable is defined, the system assigns it the lowest unused variable number (the first variable becomes `V1`, the second `V2`, etc.). Once a name is assigned to a variable number, you can no longer refer to that variable by its number.
>
> If you intend to mix named and numbered variables, use the **Use Variable Name** (`USE`) statement to assign a specific name to a specific variable number.
>
> **Note:** Named variables are slightly less efficient than numbered variables. In logic-intensive scripts, numbered variables may be preferable, though in most scripts the difference is insignificant.

To assign a name to an already-numbered variable on any platform, use the `USE` statement to equate the name with the number. You can then refer to the variable by either name or number.

To convert all variables in a script from named to numbered, use the **Convert Variable Table** (`CVT`) command.
