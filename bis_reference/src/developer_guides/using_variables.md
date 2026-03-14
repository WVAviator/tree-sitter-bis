# Using Variables in Statements

## Overview

This section covers the following topics:
- [Statements Used to Define Variables](#statements-used-to-define-variables)
- [Specifying Variables in Statements](#specifying-variables-in-statements)
- [Statements That Change the Contents of Variables](#statements-that-change-the-contents-of-variables)
- [Options Used to Reformat the Contents of Variables](#options-used-to-reformat-the-contents-of-variables)
- [Working with Variable Limits](#working-with-variable-limits)
- [Capturing Input](#capturing-input)
- [Examples](#examples)

---

## Statements Used to Define Variables

Use one of the following to define a variable in a BIS script:

- [`@LDV`](../statements/LDV.md) (Load Variable) statement
- [`@CHG`](../statements/CHG.md) (Change Variable) statement
- Any statement that provides a field for a variable to receive data

Once defined, you do not need to include the type and size each time you use the variable unless you want to redefine it. To redefine a variable, specify a new type and size on any statement that allows a variable — the original definition and contents are discarded.

**`@LDV`** is the most efficient way to define a variable and set an initial value:

```
@ldv <dollars>f6.2=109.99 .
@ldv <prodtype>h9=blackbox1 .
@ldv <counter>i2=1 .
```

**`@CHG`** can perform simple calculations and capture user input:

```
@chg <calc1>i10 <calc> + 50 .
@chg <commission>i18 <sales> * <percent> .
@chg INPUT$ <name>s30,<address>s30 .
```

**Other statements** can define a variable when providing a field to receive data. For example, this `FND` statement defines `<line>` to capture the line number of the find:

```
@fnd,0,2,b '' 'st-cd' |,ip ,<line>i6 .
```

---

## Specifying Variables in Statements

Once defined, a variable can supply a value for any statement field or subfield. This example uses `<cab>`, `<drawer>`, and `<rep>` to specify the report to process:

```
@fnd,<cab>,<drawer>,<rep> '' 'st-cd' |,ip ,<line> .
```

### Substrings

To refer to part of a variable's contents, use this format:

```
name(position-characters)
```

where `position` is the starting position and `characters` is the number of characters to include.

**Example** — first three characters of `<phone>`:

```
<phone>(1-3)
```

> The system always treats substrings as `A`-type variables.

---

## Statements That Change the Contents of Variables

When changing an already-defined variable, omit the type and size.

| Statement | Best used for | Example |
|-----------|---------------|---------|
| [`@LDV`](../statements/LDV.md) | Setting a variable to a specific value — most efficient method. | `@ldv <report>=54,<error>='unknown report' .` |
| [`@INC`](../statements/INC.md) / [`@DEC`](../statements/DEC.md) | Incrementing or decrementing a numeric (`I` or `F`) variable — most efficient method. | `@inc <counter> .` / `@dec <counter> .` |
| [`@ART`](../statements/ART.md) | Setting a numeric variable to the result of a complex arithmetic expression — most efficient for complex math. | `@art (2/3)*<cost> <expense> .` |
| [`@CHG`](../statements/CHG.md) | Setting a numeric variable to a simple arithmetic result, or capturing input data. | `@chg <total> <subtot1> + <subtot2> .` |

---

## Options Used to Reformat the Contents of Variables

*(Windows / Linux / UNIX)*

To reformat numeric variables, use the [`@JUV`](../statements/JUV.md) (Justify Variable) statement. To reformat nonnumeric variables, use the options of the `@LDV` statement.

### Temporary Reformatting

You can temporarily reformat a variable's contents for use in individual statements or in the output area. The variable must already be initialized. Append the option in parentheses after the variable name.

| Option | Description |
|--------|-------------|
| `C` | Centers |
| `L` | Left-justifies and space-fills |
| `P` | Removes insignificant leading and trailing spaces |
| `R` | Right-justifies and space-fills |
| `S` | Inserts commas |
| `U` | Converts contents to uppercase |
| `Z` | Right-justifies and zero-fills |

> The system does not alter the actual contents of the variable when using a reformatting option. For example, if `v100` contains `space-5-space`, it retains those spaces even when temporarily reformatted. `IF` statements compare variables as they are currently temporarily reformatted.

**Examples:**

Right-justify `<string>` as a target in a `FND` statement:

```
@ldv <string>h8='10 ' .
@fnd,0,c a 56-8 |,<string>(r) <rpt>i4,<line>i6 .
```

Pack `<input>` and left-justify `<data>` when loading into other variables:

```
@ldv <input>s15=' 123 ',<data>s15=' 456' .
@ldv <inputdata>s3=<input>(p),<datainput>s3=<data>(l) .
```

Pack a variable in the output area:

```
This <word>(p) is in the output area.
@ldv <word>s15=' word' .
```

Compare two variables right-justified and zero-filled:

```
@ldv <data1>s10=' 100' .
@ldv <data2>s10=' 200 ' .
@if <data1>(z) LT <data2>(z) gto 099 ; .
<data1>(p) is not LT <data2>(p)
@gto end .
@099 .
<data1>(p) is LT <data2>(p)
@gto end .
```

### Reformatting Parts of Variables

To reformat a substring, combine the substring and option formats:

```
name(position-charactersOption)
```

**Example** — pack 5 characters of `v190` starting at position 5 in the output area:

```
This v190(5-5p) is in the output area.
```

---

## Working with Variable Limits

> If you plan to port scripts between platforms (e.g., from BIS for UNIX to BIS for ClearPath OS 2200), ensure scripts comply with the variable limitations of the target system.

### Maximum Number of Variables

| Platform | Limit |
|----------|-------|
| Windows / Linux / UNIX | 999 script variables (administrator can register each script with its own limit up to 999; does not include environmental session or global run variables). |
| OS 2200 | 1–199 by default (or 1–999 if the site is configured for 999 variables). |

> *(OS 2200)* The `MAXVAR$` reserved word returns the maximum number of variables that can be contained in an array.

### Maximum Number of Variables During Registration

*(Windows / Linux / UNIX)* During registration, the administrator specifies the maximum number of variables for the script (up to the system limit). Default is 199 if no limit is registered. Scripts registered with fewer variables execute more efficiently.

### Maximum Number of Characters

The administrator also enforces a limit on the total characters used concurrently for script variables (excluding environmental session and global run variables). The usual default is **6,616 characters**, but the administrator can increase this.

> Array variables are padded with control characters that count toward the character limit.

| Platform | Maximum |
|----------|---------|
| Windows / Linux / UNIX | 99,999 characters |
| OS 2200 | 4,000–100,000 characters (site configurable; default 8,000). `S`-type and array variables (regardless of type) use string space. The `FRESTR$` reserved word dynamically returns the remaining character count. |

### Maximum Number of Global and Environmental Session Variables

Default allocations:

- **Global variables:** 5,000 bytes for up to 100 variables.
- **Environmental session variables:** 600 bytes for up to 30 variables.

Both counts and allocations can be adjusted by your BIS administrator. See the Administration Guide for details, and see [Defining and Using Variables](defining_variables.md) for additional information.

### Techniques for Handling Variable Limits

**Write modular subroutines** — Organize scripts so no subroutine exceeds the variable limit. Use [`@CALL`](../statements/CALL.md) and `RETURN` to execute subroutines. Up to 80 variables can be passed to and returned from a called subroutine.

**Pass variable arrays** — An entire array counts as only one variable when passed to a subroutine on the `CALL` statement, regardless of how many members it contains. See [`@LDA`](../statements/LDA.md) and [`@CALL`](../statements/CALL.md) in the Command Reference for details. The `MAXVAR$` reserved word specifies the maximum number of variables an array can contain.

**Clear numbered variables** — Use [`@CLV`](../statements/CLV.md) to clear variables once you are finished with them.

---

## Capturing Input

Screen input is any data a user enters on the screen during script execution. BIS provides several methods for capturing it.

**Initial input parameters** are a list of parameters passed to a script at the time it starts executing, either from a calling statement or a manual script call. The script uses a `CHG INPUT$` statement to accept them.

### Prompting the User for Input

Use [`@SC`](../statements/SC.md) (Screen Control) commands to build menus and input screens. Features include:

- Colors and boxes for more attractive displays.
- Menus that overlay other displays with a user-erasable option.
- Up to 10 function keys and a function key bar.
- Context-sensitive help for input fields.
- Displays built from the output area via the [`@BRK`](../statements/BRK.md) and `SC`/`OUT` statements.

### Accepting User Input

Use the [`@CHG`](../statements/CHG.md) statement with one of the following reserved words to accept user input into a script:

| Reserved Word | Description |
|---------------|-------------|
| `INPUT$` | Loads variables from screen input fields in tab order. |
| `INSTR$` | Loads variables with full lines of screen input. |
| `INVAR$` | Loads variables with tab-delimited screen input. |
| `INVR1$` | Like `INVAR$`, but loads multiple tab-delimited fields into one variable. |
| `INMSV$` | Captures input from a function mask display (used with `OUM`). |
| `ICVAR$` | Captures input entered on the control line (used with `CHD`). |
| `FKEY$` | Captures function key input (used with `KEY` or `CHD`). |

---

### Using INPUT$

- Use `CHG INPUT$` to load variables with current input (initial parameters or screen input).
- Load up to 80 variables.
- Always use `CHG INPUT$` **after** prompting the user for input.
- Variables are loaded in screen input field order (first field → first variable, etc.).
- If the user enters a comma in a field, scanning stops at the comma. Use `INVAR$` to capture commas and subsequent data.

> *(Windows / Linux / UNIX)* `INPUT$` loads variables with any unprotected data on the control line. Change control line data to protected if you don't want it captured.

> *(OS 2200)* `INPUT$` ignores any data on the control line.

**Example:**

```
@brk,0,a .                                         (1)
Enter appropriate data and press Transmit.          (2)
| ,Enter start date in format yymmdd               (3)
| ,Enter end date in format yymmdd                 (4)
Place cursor here ->| , and press Transmit.        (5)
@brk out,-0,2,6,1,1,y .                            (6)
@chg INPUT$ <stdate>i6,<endate>i6 .                (7)
```

| Line | Description |
|------|-------------|
| 1 | `BRK` defines the following output area as cabinet 0, drawer A. |
| 2–5 | Output area lines displayed to the user. |
| 6 | Second `BRK` places the output area into the `-0` result and displays it. |
| 7 | `CHG INPUT$` loads `<stdate>` and `<endate>` with the user's entries. |

---

### Using INSTR$

- Use `CHG INSTR$` to load one or more variables with full lines of screen input.
- Always use `CHG INSTR$` **before** prompting the user for input.
- Do not use with formatted or protected screens.
- Data starts at the first line on screen (or after the last SOE character before the cursor). Each variable receives one line.
- Maximum variables: the lesser of the number of screen lines or 80.

**Example:**

```
@chg INSTR$ <linea>s80,<lineb>s80 .
```

`<linea>` contains 80 characters from the first line (or after the last SOE character); `<lineb>` contains up to 80 characters from the next line.

---

### Using INVAR$

- Use `CHG INVAR$` to load variables with tab-delimited screen input.
- Load up to 80 variables.
- Always use `CHG INVAR$` **before** prompting the user for input.
- Variables are loaded in screen input field order. Field length is determined by a tab or the receiving variable's length.

**Example:**

```
@chg INVAR$ <inp1>s17,<inp2>i3,<inp3>i6 .
@brk .
Enter description | ,
Enter quantity | ,
Enter date in format yymmdd | ,
@brk out,-0,2,3,1,1,y .
```

After the user submits, `<inp1>`, `<inp2>`, and `<inp3>` contain the entered values.

---

### Using INVR1$

`INVR1$` is similar to `INVAR$` but loads multiple tab-delimited fields into a single variable.

- Use `CHG INVR1$` to load variables with input.
- Load up to 80 variables.
- Always use `CHG INVR1$` **before** prompting the user for input.
- Variable length determines how many characters (including tabs) are loaded; characters beyond the length are discarded.
- When used with formatted/protected screens, use `LDV` with the `Q` option to properly handle variable contents.

**Example:**

```
@brk chg INVR1$ <name>s80 .
Please enter your name.

First | , Middle Initial | , Last | ,
@brk out,-0,2,21,1,4,y,,,p .
@ldv,q <first>s20=<name>,0 .
@ldv,q <middle>s20=<name>,1 .
@ldv,q <last>s20=<name>,2 .
```

After entry, `LDV` with the `Q` option extracts each tab-delimited field from `<name>` into `<first>`, `<middle>`, and `<last>`.

---

### Using INMSV$ with the OUM Statement

- Use `CHG INMSV$` to capture input entered on a function mask display.
- Always use `CHG INMSV$` **before** prompting the user with the `OUM` statement.

---

### Using ICVAR$ with the CHD Statement

- Use `CHG ICVAR$` to capture input entered on the control line during a display.
- Always use a `CHD` statement followed by `CHG ICVAR$` before prompting for input.
- `ICVAR$` captures information only when the user transmits from the control line.

**Example:**

```
@chd 100 .
@chg ICVAR$ <controlline>s80 .
@dsp,0,b,2 .
```

---

### Using FKEY$ with the KEY and CHD Statements

- Use the `KEY` statement to capture function key input; the system stores the result in `FKEY$`.
- Use both `CHD` and `KEY` to accept function key input from the control line.
- Always use `KEY` (and optionally `CHD`) **before** prompting the user for input.

**Example:**

```
@key .
@out,-0,4,1 .
```

After these statements, test `FKEY$` for its contents and proceed accordingly.

---

### Capturing Initial Input Parameters

A script can accept up to **80 initial input parameters**. Define the input with a `CHG INPUT$` statement listing the variables to capture it. This statement is typically the first in the script, but must be executed before any other input is accepted.

Pass initial input parameters on the call that starts the script:

```
name[,input1,input2,...,inputn] .
```

The first parameter is loaded into the first variable on `CHG INPUT$`, the second into the second, and so on.

**Example 1** — define input capture at the start of a script:

```
@chg INPUT$ <report>s20,<option>s10 .
```

**Example 2** — pass parameters `myreport` and `sort` to the `UPDATE` script:

```
update,myreport,sort
```

The same can be done from within a script:

```
@run update,myreport,sort .
@lnk update,myreport,sort .
```

---

## Examples

The following examples use a `DSP` statement as a common basis to illustrate different ways variables can be initialized and used:

```
@dsp,v1,v2,v3 .
```

This displays the report at the cabinet in `v1`, drawer in `v2`, and report number in `v3`.

**Load variables earlier in the script** — useful when the same report is processed repeatedly, so location changes only need updating in one place:

```
@ldv v1i4=0,v2H1=d,v3i4=1 .
...
@dsp,v1,v2,v3 .
```

**Capture location from the user:**

```
@brk .
Enter the location of the report you
want to display and press Transmit
Cabinet| , Alphabetic drawer| , Report| ,
@brk out,-0,2,6,1,1,y,,,i .
@chg INPUT$ v1i4,v2H1,v3i4 dsp,v1,v2,v3 .
```

**Load from another statement's output** — here `FND` produces `v3` (report number of the first find):

```
@ldv v1i4=0,v2H1=d fnd,v1,v2 '' 22-3 |,' 1' v3i4 .
@dsp,v1,v2,v3 .
```

**Mix screen input and internal loading** — the user supplies the search value and report number; `v1` and `v2` are loaded internally:

```
@brk .
Enter the code to find and where to look
(Cabinet 0, drawer b report)
Status Code| , Report number| ,
@brk out,-0,2,4,1,1,y,,,i .
@chg INPUT$ v4a2,v3i4 ldv v1i4=0,v2H1=b .
@fnd,v1,v2,v3 '' 2-2 |,v4 ,v5i4 .
@dsp,v1,v2,v3,v5 .
```

**Use a variable as a counter** — `v4` tracks the current line; `v5` holds the total line count; the script loops until `v4` exceeds `v5`:

```
@ldv v1i4=0,v2H1=d,v3i4=1,v4i6=6 .
@lzr,v1,v2,v3 v5i6 .                          . v5=nr.lines
@fnd,v1,v2,v3,v4,196 '' 22-3 |,'  1' ,v4 .
@dsp,v1,v2,v3,v4 .                            . v4=line
@inc v4 if v4 LE v5 gto lin -2 .
@196: .
No more finds.
@gto end .
```

`v4` serves as both the starting line for each find and the line number of the result. As `v4` increments, the find progresses further through the report. The same looping pattern can be extended to scan across multiple reports using additional variables and checks.
