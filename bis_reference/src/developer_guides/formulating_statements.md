# Formulating Statements

## Overview

This section covers the following topics:
- [Statement Format](#statement-format)
- [Special Characters Used in Statements](#special-characters-used-in-statements)
- [Guidelines for Formulating Statements](#guidelines-for-formulating-statements)
- [Using Labels in Scripts](#using-labels-in-scripts)
- [Using Conditional Statements](#using-conditional-statements)
- [Denoting Literal Data in Statements](#denoting-literal-data-in-statements)
- [Specifying Multiple Parameters in Statements](#specifying-multiple-parameters-in-statements)
- [Separating Multiple Expressions and Decisions](#separating-multiple-expressions-and-decisions)
- [Using Multiple Lines for One Statement](#using-multiple-lines-for-one-statement)
- [Specifying Reports to Process in Statements](#specifying-reports-to-process-in-statements)
- [Specifying Columns to Process in Statements](#specifying-columns-to-process-in-statements)

---

## Statement Format

Statements are instructions entered into a run control report starting at line 3, forming a script. Every statement line begins with `@` and follows this general format:

```
@label:call,report options fields line-type,\ parameters variables . comment
```

### Fields

| Field | Description |
|-------|-------------|
| `@` | Indicates the beginning of a statement line. |
| `label` | A number identifying the statement line. See [Using Labels in Scripts](#using-labels-in-scripts). |
| `call` | The function call — an abbreviation for the operation name. |
| `report` | The cabinet, drawer, and report number or name to process. See [Specifying Reports to Process in Statements](#specifying-reports-to-process-in-statements). |
| `options` | Options specifying how to perform the operation. |
| `fields` | The report fields to process. Specify either column-character positions (e.g., `2-2`) or a field name (e.g., `'StCd'`). See [Specifying Columns to Process in Statements](#specifying-columns-to-process-in-statements). |
| `line-type` | The type of line to process. |
| `\` | Reverse slant — indicates the statement continues on the next line. See [Using Multiple Lines for One Statement](#using-multiple-lines-for-one-statement). |
| `parameters` | Values or fields to process. In search statements (e.g., `FND`), a slant `/` within apostrophes can be used to process a partial field. |
| `variables` | Variables to capture specific information. See *Using Variables, Reserved Words, and Constants*. |
| `. comment` | A space-period-space terminates the statement line, optionally followed by a comment. BIS stops processing the line when it encounters a period. |

### Using Multiple Statements on One Line

You can enter multiple statements on the same line. Use only one `@` (on the first statement) and only one space-period-space (after the last statement). For example:

```
@if USER$ EQ jdoer gto 002 ; gto 001 . check user
```

### Example Statement

This `SRH` (Search) statement processes data from report `1C0`:

```
@007:srh,0,c,1 d 'producttype' |,blackbox7 <finds>i5,\
<lines>i6 . Search 1C
```

| Part | Description |
|------|-------------|
| `@` | Statement line indicator. |
| `007:` | Label `007` and separator `:`. |
| `srh` | Script function call (Search). |
| `0,c,1` | Cabinet number, drawer letter, and report number. |
| `d` | D option. |
| `'producttype'` | Field to search. |
| `\|` | Line type (tab). Can be enclosed in apostrophes or substituted with the `tab$` reserved word. |
| `blackbox7` | Parameter — the value to search for. |
| `<finds>i5` | Variable to capture the number of finds. |
| `\` | Reverse slant — statement continues on the next line. |
| `<lines>i6` | Variable to capture the number of lines searched. |
| `. Search 1C` | Space-period-space terminator followed by a comment. |

---

## Special Characters Used in Statements

| Character | Description |
|-----------|-------------|
| `@` | Begins a statement line. |
| ` . ` | (space-period-space) Terminates a statement line. May be followed by a comment. |
| `/` | Separates multiple sets of parameters. See [Specifying Multiple Parameters in Statements](#specifying-multiple-parameters-in-statements). |
| `;` | Separates multiple expressions or logic decisions. See [Separating Multiple Expressions and Decisions](#separating-multiple-expressions-and-decisions). |
| `\` | Indicates the statement continues on the next line. See [Using Multiple Lines for One Statement](#using-multiple-lines-for-one-statement). |
| `'` | (apostrophe) Encloses literal data. Required for strings containing spaces, slants, reverse slants, or commas, and for all data names. See [Denoting Literal Data in Statements](#denoting-literal-data-in-statements). |

---

## Guidelines for Formulating Statements

### Entering Statements

- Type `@` in column 1.
- Enter multiple statements on one line separated by a space, using only one `@` per line.
- Separate fields with spaces; separate subfields with commas.
- Optional fields are shown in brackets (`[ ]`) in format descriptions — do not enter the brackets in your own statements.
- Required fields are those not enclosed in brackets. If you are not entering a value for a required field, enter two apostrophes (`' '`).
- If you omit a value for an optional subfield, include a comma in its place unless the subfield is at the end of the field.

### Using Variables

The maximum number of variables you can use as input to a statement is 80, unless otherwise stated in the individual statement's documentation.

### Specifying Fields to Process

You can specify fields to process in the `cc` subfield in any order, regardless of their order in the report. However, parameters must be listed in the same order as the fields. For example, these two statements produce the same result despite inverted field order:

```
@srh,0,c,1 '' 2-5,16-1  |,black,a .
@srh,0,c,1 '' 16-1,2-5  |,a,black .
```

### Specifying Issuing and Receiving Reports

In statements that require both an issuing and a receiving report, designate the issuing report first and the receiving report second.

### Processing Run Control Reports

Statements that access or lock reports (such as `DFU`, `LOK`) cannot access or lock their own run control report.

> *(OS 2200)* You cannot process your own run control report.

### Terminating Lines

The following items terminate a line:

- Space-period-space (` . `)
- `@label.` (DEFINE statements)
- `INCLUDE` statements
- Certain statements that terminate a line automatically, including: `CALL`, `DSM`, `DSP`, `XQT`, `ESR`, `LNK`, `OUT`, `RRN`, `RSR`, `SC`, `WAT`

When a statement terminates a line, it is noted in the documentation for that statement.

> *(OS 2200)* The script errs if the last character in the line is not a space or a period preceded by a space.

### Using Reserved Words in Statements

A reserved word is a system-maintained variable (see *Using Variables, Reserved Words, and Constants*). Reserved words can be used directly in the following statement subfields:

| Subfield | Description |
|----------|-------------|
| `C` | Cabinet |
| `D` | Drawer |
| `R` | Report |
| `L` | Line number |
| `F` | Format |
| `P` | Parameters |

**Example** — using the `EDRW$` reserved word (numeric drawer number of the run control report) to display one screen from the drawer in which the script resides:

```
@out,EDRW$,5,1,SCNV$ .
```

You can also use substrings of reserved words directly, just as you can with variables. For example, this statement logs script users by writing user ID, date, and time to a report:

```
@wrl,EDRW$,<rpt>,<line> 2-11,14-8,23-5 *,USER$,\
DATE11$,TIME$(1-5) .
```

> Be sure to account for field size when directly referencing reserved words. In the example above, 10 characters (`2-11`) are allocated for the user ID.

Use the `DEF` statement with the `S` option to find the length of a reserved word.

### Using the Output Area

- Do not use `@` or `:` in the first character position of any output area line.
- To display an apostrophe in the output area, use two apostrophes.
- To display the literal name of a variable (rather than its value), enclose it in apostrophes (e.g., `'<data>'`).

> *(Windows / Linux / UNIX)* To display the literal name of a reserved word, enclose it in apostrophes (e.g., `'DATE11$'`).

> *(OS 2200)* Reserved words always display literally in the output area. To place the *value* of a reserved word in the output area, load a variable with the reserved word and place the variable in the output area.
>
> In webscript mode (`@BRK` with the `webscript` parameter set to `"Y"`), variable/reserved word substitution and apostrophe interpretation apply only within webscript delimiters (`<%` ... `%>`). Outside the delimiters, all text is generated literally. The delimiters themselves are stripped from the output.

See [The Output Area and Results](script_design_overview.md#the-output-area-and-results) for more information.

---

## Using Labels in Scripts

Labels are numbers used to identify statement lines. Use them in the following situations:

- At the start of a statement, to match a label referenced in the `lab` subfield of another statement.
- In `IF` and `GTO` statements, to transfer control to a specific part of the script.

Duplicate labels within a run control report are not allowed.

### Format

```
@label:...(statement)
@label .
```

> *(Windows / Linux / UNIX)* Labels can range from 1 to the maximum label. The default maximum is 199; scripts can be registered to allow up to 999 labels.

> *(OS 2200)* Labels can range from 1 to the maximum label. The default maximum is 199; the system configuration can set this up to 999. The `MAXLAB$` reserved word returns the current maximum label value.

### Recommended Label Convention

Use three or four-character, zero-filled labels (e.g., `@0003`) for easier script maintenance. Unlabeled lines can be indented for legibility. For example:

```
@0001:inc <nameit>
@     if <nameit> gt 5,(0199) ;.
.
.     (more statements)
.
@0199:dsp,-0 .
```

### Specifying Relative Line Numbers

Instead of a label number, you can specify a relative line number in the label subfield.

**Format:**

```
LIN[+]n
```

Where `n` jumps to the line equal to the current line plus `n` lines. When continuation lines are present (indicated by `\`), the last line of the continuation sequence is treated as the current line.

`n` can be an integer or a variable containing an integer. A negative value jumps backward by the absolute value.

> For easier maintenance, avoid jumping more than one or two lines forward, and avoid jumping backward (`LIN-n`).

### Using a Label Table

When a statement contains a label, BIS may search every line in the report to find it. To speed up this process, build a label table using the **Build Label Table** (`BLT`) command (on the control line or as a statement). `BLT` creates a result containing definition lines in the following format:

```
:Llabel-number=line-number,...
```

**Example:**

```
:L22=13,33=26,44=39
```

Only use label tables in scripts that have been debugged and tested. After adding or deleting lines, rebuild the label table with `BLT` to keep it current.

---

## Using Conditional Statements

You can change the flow of a script using branching, conditional branching, looping, and subroutines.

### Branching

Use a **Go To** (`GTO`) statement to jump to a specific label, to a relative line, or to a script in another run control report.

**Format:**

```
@GTO lab .
```

**Example:**

```
@001:chg <data>H3 abc .
.
. (more statements)
.
@gto 001 .
```

### Conditional Branching

Use an **If Conditional** (`IF`) statement to branch only when a condition is met.

**Format:**

```
@IF val1 op val2 stmt1 . ;stmt2 .
```

| Field | Description |
|-------|-------------|
| `val1` | A value from a variable or a literal. |
| `op` | The comparison operator. |
| `val2` | A second value to compare against. |
| `stmt1` | Statement to execute if the condition is true (omit the `@` sign). |
| `stmt2` | Statement to execute if the condition is false. |

**Example:**

```
@if v9 eq abc gto 015 ;gto 020 .
```

If `v9` equals `abc`, jump to label 15; otherwise jump to label 20.

### Looping

To repeat an operation, place a label at the start of the statements to loop through, then use a `GTO` statement to return to it. Use an `IF` statement inside the loop to test for an exit condition.

### Subroutines

Use the **Call Subroutine** (`CALL`) statement to save all currently defined variables and transfer control to an internal or external subroutine. You can pass up to 80 variables to the subroutine, manipulate them within the subroutine, and pass them back without affecting other defined variables. You can also pass parameters that the system does not modify on return.

**Format:**

```
@CALL[,c,d,r] lab ([p,p,...]) .
```

You can also use the **Run Subroutine** (`RSR`) statement to transfer control to subroutines.

See [`@CALL`](../statements/CALL.md) in the Command Reference for full details.

---

## Denoting Literal Data in Statements

Use apostrophes (`'`) to enclose literal data in the parameters field when the data contains spaces, slants, reverse slants, or commas. Literal data without these characters does not need apostrophes unless it is a field name or data name.

If literal data contains the letter `V` followed by a number, always enclose it in apostrophes to avoid confusion with numbered variables (e.g., `v1`, `v2`).

**Examples:**

```
@srh,0,d,1 d 61-17 |,'digital corp' .
@srh,0,d,1 / 'customer' |,'union steel/sulfr' .
@srh,0,c,1 f 'produc cost' |,'13,500' .
@run 'nov90rpt' .
```

---

## Specifying Multiple Parameters in Statements

Use a slant (`/`) to separate multiple parameters in a statement. This is equivalent to moving to the next line when entering multiple parameter lines in a function mask.

**Example** — searching for tab lines containing `OR` or `SC` in the `stcd` field:

```
@srh,0,b,2 d 'stcd' |,or/|,sc <finds>i3,<lines>i3 .
```

---

## Separating Multiple Expressions and Decisions

Use a semicolon (`;`) to:
- Separate arithmetic expressions in a `CAL` or `ART` statement.
- Separate logic decisions on the same line in an `IF` statement.

**Example 1** — two arithmetic expressions in an `ART` statement:

```
@art <drw>+<rpt>;v4*4 v10i12,v11i12 .
```

**Example 2** — two equations in a `CAL` statement:

```
@cal,-0 l 2-5,8-8,25-15 |,a,b,c c=a*b;avrg=vavg(a) .
```

**Example 3** — multiple decisions in an `IF` statement:

```
@if <sub> EQ 3 gto 009 ;if <tot> EQ 6 gto 008 ;gto end .
```

---

## Using Multiple Lines for One Statement

Use a reverse slant (`\`) to indicate that a statement continues on the next line. Place the reverse slant after the space following a field, or after a comma in a subfield.

**Example:**

```
@cal,0,c,1,,,99 l 25-7,33-8,65-15 |,a,b+,c+ \
maxa=vmax(a);maxb=vmax(b);c=b-a\ <cab>i9,<drw>i9,<rpt>i9,<data>i9 .
```

> Do not use apostrophes or additional reverse slants on the line immediately following a reverse slant.

The system begins checking for a continuation character when it does not find `@` in column one.

- Maximum characters per statement (across all continuation lines, counting the entire last line): **1,280**
- Maximum continuation lines: **40**

---

## Specifying Reports to Process in Statements

Many statements contain a `c,d,r` field for specifying the cabinet, drawer, and report. You can use a cabinet number, drawer letter, and report number — or a data name.

In some statements (e.g., `FND`, `SRH`), entering `0` or leaving the report (`r`) subfield blank causes the system to process the entire drawer.

**Example** — process report `1D0` using all three subfields:

```
@srh,0,d,1 '' 'cust code' |,amco .
```

**Example** — process all reports in a drawer using only `c` and `d`:

```
@srh,0,b '' 'producttype' |,blackbox7 .
```

**Example** — process a report by data name:

```
@srh,'order status' '' 'cust code' |,amco .
```

To access results, specify the result identifier in the appropriate subfields (e.g., `-1` for a renamed result, or `-0` for the current result). A report or result that was on display before the script started can be referenced as `-0` until your script creates another result.

See *Using Data Naming* for more information.

---

## Specifying Columns to Process in Statements

Many statements contain a `cc` field for specifying the columns of data to process. You can use column-character positions or field names.

**Column-character positions** — specify the starting column and number of characters:

```
@srh,0,d,1 '' 26-4 |,amco .
```

This searches the 4-character field beginning in column 26.

**Field names** — use report heading names enclosed in apostrophes:

```
@srh,0,d,1 '' 'cust code' |,amco .
```

These two statements perform the same operation.

Additional notes:
- The maximum number of report fields you can process is **80**, unless otherwise stated in a statement's documentation.
- For statements that support multiple reports (e.g., `SRH`, `FND`, `BFN`), entering `0` or omitting the `r` field processes all reports in the drawer.
- In most statements, adjacent or overlapping fields are not allowed. One exception is the **Read Line** (`RDL`) statement.

See *Using Data Naming* for more information about field names.
