# @CHG — Change Variable

## Overview

Sets the value of a variable, or captures input data into one or more variables.

- **Format 1** — Set the value of a variable using an expression or literal value.
- **Format 2** — Capture input data using a reserved word.

---

## Syntax

**Format 1 — Set a value:**
```
@CHG v {exp|vld} .
```

**Format 2 — Capture input:**
```
@CHG rw v[,v,...,v] .
```

### Parameters

| Field | Description |
|-------|-------------|
| `v` | Variable to change. Include the variable type and size to define or redefine it. |
| `exp` | Expression used to set the variable's value. See [Using Expressions](#using-expressions). |
| `vld` | Value to place into the variable — a literal, constant, variable, reserved word, or any combination. |
| `rw` | Reserved word determining the kind of input data to capture. See [Reserved Words](#reserved-words). |

---

## Using Expressions

Expressions in `@CHG` may contain variables, constants, reserved words, and the following operators:

| Operator | Description |
|----------|-------------|
| `+` | Addition |
| `-` | Subtraction |
| `*` | Multiplication |
| `/` | Division |
| `//` | Integer division |

**Rules:**
- Precede each operator with a space; a trailing space is optional.
- Any variable used in an expression must be defined prior to the `@CHG` statement.
- Expressions are evaluated **left to right with no precedence rules.** Use only simple expressions.

---

## Reserved Words

### Input Capture Reserved Words

Issue the `@CHG` statement immediately *before* soliciting input when using these reserved words:

| Reserved Word | Description |
|---------------|-------------|
| `ICVAR$` | Captures the next input entered on the control line. See [`@CHD`](CHD.md). |
| `INMSV$` | Captures the next input entered in a function mask displayed by [`@OUM`](OUM.md) (Output Mask). |
| `INSTR$` | Captures the next input delimited by the end of each line on the screen. |
| `INVAR$` | Captures the next input delimited by tab characters or the size of the variable, whichever is encountered first. |
| `INVR1$` | Captures the next input delimited by the size of the specified variables, including any intervening tab characters. |
| `INPUT$` | Refers to the current (most recently received) input. Issue immediately after input is received. |

### Value Reserved Words

| Reserved Word | Syntax | Description |
|---------------|--------|-------------|
| `CHR$` | `@CHG <variable>h1 CHR$ octal` | Loads a specific ASCII character into an `H`-type variable of length 1. `octal` is an octal number from `000` to `377`. |

> **Caution:** Use `CHR$` carefully. ASCII control characters (`000`–`037`) and extended ASCII characters (`177`–`377`) should not be written into reports as they may cause data corruption.

---

## Guidelines

- To simply increment or decrement a numeric variable, prefer [`@INC`](INC.md) or [`@DEC`](DEC.md).
- For arithmetic operations, use `I`-type variables for whole numbers and `F`-type for fractions. Arithmetic on `A`, `H`, or `S`-type variables produces unpredictable results.
- To capture the current input, use `INPUT$` immediately after the input is received.
- To capture the initial input to a run (e.g., user types `runit,6,1,90`), issue the `@CHG INPUT$` statement as the **first statement** in the run.
- Commas immediately following constants, variables, and reserved words are ignored. *(2200 only)*

### Octal Variables *(2200 only)*

The following operators are available for use with octal (`O`-type) variables:

| Operator | Description |
|----------|-------------|
| `A` | Logical AND |
| `O` | Logical OR |
| `X` | Exclusive OR |
| `L` or `-` | Left shift |
| `R` or `+` | Right shift |
| `C` | Circular shift |

A shift of an `O`-type variable is a bit-count shift. Literal values are assumed to be octal; values from another variable are assumed decimal and converted to octal before processing.

---

## Examples

Set `<commission>` using a simple arithmetic expression:
```
@chg <commission> <sales> * <percent> .
```

Capture the current input into `<name>`, `<address>`, and `<phone>` after an `@OUT` statement:
```
@out,-0,2,5,1 .
@chg input$ <name>,<address>,<phone> .
```

Capture the initial run input (e.g., from `runit,6,1,90`):
```
@chg input$ <month>i2,<day>i2,<year>i2 .
```

Capture the next control line entry into `<controlln>`:
```
@chg icvar$ <controlln> .
```

Load a line feed character (ASCII octal `012`) into `<LineFeed>`:
```
@chg <LineFeed> chr$ 12 .
```
