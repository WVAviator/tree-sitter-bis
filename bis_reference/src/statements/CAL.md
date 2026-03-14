# CAL, @CAL, CALU, @CAU — Calculate / Calculate Update

## Overview

Use the **Calculate (CAL)** function or `@CAL` statement to compute, compare, and replace numeric data, character strings, dates, and times in a report. You can use the [ICAL](../runs/ICAL.md) run to save and reuse equation sets and to create CAL statements. The ICAL run helps make the CAL function easier to learn and use, because you do not need to retype whole equations each time you try something different.

Use the **Calculate Update (CALU)** function or `@CAU` statement to create an update result, which enables you to Delete ([`@DEL`](DEL.md)) or Extract ([`@EXT`](EXT.md)) the found lines from the report or Update ([`@UPD`](UPD.md)) the found lines and blend them back into the report.

Nested update results are not allowed; there can be only one update result at a time.

Here are a few situations in which you might want to use the Calculate command:

- If you need to perform certain operations only when specific conditions are met, use conditional statements in the Calculate command.
- Since you can perform several operations at once in Calculate equations, use the Calculate command in place of multiple Totalize or Date commands.
- If you need to manipulate character strings or perform complex computations in reports, use the Calculate command in place of extensive loops and logic statements in runs.

Here are a few of the many operations you can perform with the Calculate command:

- Copying or moving data between fields whenever a certain condition is met.
- Processing sliding pay rates or discount rates based on any number of factors, such as number of hours or days worked or total dollar amount of an order.
- Comparing two dates and performing calculations whenever one date is later than the other.
- In a scheduling database, tracking the number of minutes, hours, or days ahead of or behind schedule and keeping a running subtotal and average by product type.
- Calculating the number of workdays left to meet a deadline.
- Looking for a character string and replacing it with another.
- Looking for duplicated information in a report and removing it.
- Obtaining the highest or lowest number across several fields, or within each field.
- Creating a result containing only those lines that meet a certain condition.
- Producing end-of-month dates based on values input from a report.

Generally, if you have a complex arithmetic problem of almost any kind, or one that involves multiple equations, even if it is not complex, you can use the Calculate command to solve it.

---

## Syntax

### Calculate Control Line Format

```
CAL [report f]
CALU [report f]
```

| Field | Description |
|-------|-------------|
| `report` | Report to process. For more details, see Specifying Reports or Drawers to Process. |
| `f` | Report format in which to process data (enables you to process data in fields beyond column 80 if you do not already have those columns on display). |

### Calculate Statement Format

```
@CAL,c,d,r[,l,q,lab] o cc ltyp,p eq [vrslts] .
@CAU,c,d,r[,l,q,lab] o cc ltyp,p eq [vrslts] .
```

| Field | Description |
|-------|-------------|
| `c,d,r` | Report to process. For more details, see Specifying Reports or Drawers to Process. |
| `l` | Line number at which to start processing. |
| `q` | Number of lines to process. |
| `lab` | Label to go to if no data exists. Use this field if there is any possibility that the report does not contain data; otherwise, no result is created. |
| `o` | Options field. See [Calculate Options](#calculate-options). |
| `cc` | Column-character positions or names of the fields to process. |
| `ltyp` | Line type to process. If you specify the A option, leave this subfield blank, but enter the comma. |
| `p` | Parameters: Field labels (see [Calculate Labels](#calculate-labels)) and vertical operators (see [Computing Vertically](#computing-vertically-using-calculate)). |
| `eq` | Equations. See [Formulating Equations](#formulating-equations-with-calculate). |
| `vrslts` | Variables to capture the results of vertical operations and the contents of value labels in the order initialized. Variables that capture vertical operations are loaded in the order in which their fields exist in the report. |

---

## Calculate Options

| Option | Description |
|--------|-------------|
| `A` | Processes all line types. |
| `C` | Conditionally includes lines in the result: after all equations are processed, only those lines that meet a true condition based on the last IF statement are included in the result. See [Computing Using Conditional Statements](#computing-using-conditional-statements-in-calculate). |
| `E` | Fills result fields with spaces whenever the result is 0. |
| `I` | Produces integer results, dropping any fractional part from the result. |
| `J(x)` | Justifies numeric result values in fields to x (one of the values listed below). Leading zeros appear to the left of a value, nonsignificant zeros to the right. Neither affects the value. `C` - inserts commas every three digits in the integer portion of the result, right-justifies values. `L` - eliminates commas, left-justifies values. `R` - eliminates commas, right-justifies values. `X` - eliminates commas, left-justifies values, and fills fields with nonsignificant zeros. `Z` - eliminates commas, right-justifies values, and fills leading spaces with zeros. |
| `Kn` | Initializes value labels to n on the first pass. Default = 0. See [Calculate Labels](#calculate-labels). |
| `L` | Lists all value labels and their final values at the end of the report. |
| `Nn` | Substitutes a numeric value n for nonnumeric fields. Default = 0. Nonnumeric fields are fields containing either nonnumeric data in the leftmost column of the field or no data. |
| `O` | Omits all data lines from the result. Includes only heading lines and value label names with their final value in the result. When used with the CAL statement, does not create a -0 result; loads receiving variables with results of the equations. |
| `Rn` | Rounds numbers to the nearest n. Use with the E option to round entry counts. The range for n is .0000000000000001 to 100000000000. For example, `r.001` rounds values to the nearest thousandth; `r10000` rounds to the nearest ten thousand. |
| `S(s)` | *(Windows / Linux / UNIX)* Distinguishes between uppercase and lowercase characters when processing character strings. |
| `F` | *(Windows / Linux / UNIX)* This option does not perform any function when used with CAL/CAU. Added only to maintain compatibility with previous versions of BIS for OS 2200. |
| `S(x)` | *(2200)* Defines character set interpretation as x (F, L, or S). `F` - Use FCS internal codes (use only when processing LCS reports). `L` - Use LCS internal codes (use only when processing FCS or FCSU reports). `S` - Use strict character set internal codes to differentiate between uppercase and lowercase characters (use only with FCS reports). |
| `F` | *(2200)* Executes the CAL command in standard mode using the revised parsing method. If CAL compatibility mode (CALCMP parameter) is disabled, this option is ignored. Contact the BIS System Administrator concerning the setting of the CALCMP parameter. |
| `T` | Includes both processed and unprocessed lines in the result. Do not use the T option if you want to include only the type of line being processed. Note: No result is created if no lines of the specified `ltyp` are found. See the description for the `lab` field. |
| `V` | Processes only those equations whose result values are calculated from valid data. Equations containing invalid data are not included in the result, and the receiving label is not altered. See [Computing Vertically](#computing-vertically-using-calculate). |
| `Wn` | Processes dates by work week, where n is the number of days in the work week, 1 through 6. Default = 7. See [Computing Dates and Times](#computing-dates-and-times-using-calculate). |
| `X` | Excludes invalid values in minimum, maximum, sum, and average computations (MIN, MAX, SUM, AVG, VMIN, VMAX, VSUM, VAVG) and in operations specified by vertical operators. |
| `*` | Flags all invalid results with an asterisk following the value. |

> **Note:** Invalid data includes field labels representing nonnumeric data and value labels whose value was calculated from nonnumeric data or an invalid date. Nonnumeric fields are fields containing either nonnumeric data in the leftmost column of the field or no data.

---

## Calculate Outcome

Executing the Calculate command causes the following actions to occur:

- The command processes the equations and creates a result.
- You can place values produced by equations into report fields or into labeled storage areas for later use. The maximum size of the fields or labels is 18 characters.
- The resulting values overwrite data previously in the receiving field or label.
- The command either rounds or expands resulting values that are not integers to fill the size of the field.
- The command right-justifies integers if possible.
- The command performs all of the equations in the order you type them for each line of data.
- If you specify a receiving label that is not large enough to contain the output format or if the result value of the expression is not a valid date or time, the fields are filled with asterisks and are assigned a value of zero.
- When the command divides by zero (0), it does not generate an error; instead, it produces a result of zero. If a divide by zero is possible, use the N, V, or `*` option.

In addition, executing the `@CAL` statement also causes the following actions to occur:

- If you use the O option, it does not create a -0 result; it loads variables with resulting values. Avoid using the O option with the CAU statement, because the O option does not create a -0 update result.
- The first variables you specify in the `vrslts` field contain the results of vertical operations; the remainder contain the final contents of value labels in the order initialized.
- The statement loads the variables that capture vertical operations in the order their fields exist in the report, regardless of the order in which you specified them in the statement.

---

## @CAL Reserved Words

`STAT1$` contains the number of lines processed of the type of line specified. `STAT2$` contains the total number of lines in the report, excluding headings.

---

## Guidelines

- For simple calculations on reports, use the Totalize and Date commands. For calculations outside of reports, use the Arithmetic command.
- Try the [ICAL](../runs/ICAL.md) run instead of the manual CAL function. With the ICAL run, you can test a set of calculations, change them and try again, or save them for later use. Calculations using the ICAL run operate exactly like calculations using the manual CAL function do.
- To create an update result that enables you to blend the changed lines back into the original report or delete lines from the original report, use the Calculate Update (CALU) function or `@CAU` statement. The `@CAU` statement uses the same fields and subfields as the `@CAL` statement.

You can process the update result in the following ways:

- Delete the update result lines from the original report, using the Delete ([`@DEL`](DEL.md)) command.
- Delete the update result lines from the original report and redisplay the result, using the Extract ([`@EXT`](EXT.md)) command.
- Merge updated lines in the update result into the original report, using the Update command. (For faster updating, use the Totalize command to fill fields with dates, status codes, and so on before calling the Update command.)

### @CAL Statement Guidelines

- You can use the [ICAL](../runs/ICAL.md) run to automatically create a CAL statement from equations you processed. The run creates a statement in a freeform drawer A result that you can move to your run control report.
- You can use variables in any field of the CAL statement, including equations. Variables can contain entire equations or parts of equations.
- If it is possible that a variable used in an expression has a negative number, place the variable in parentheses; otherwise, the run interpreter reads it as part of an expression and the run fails. Place all negative numbers in expressions in parentheses.
- Since the system interprets variables enclosed in apostrophes as literal data (for example, the statement uses literal v1 rather than the contents of the variable v1), do not enclose variables in apostrophes.
- Enclose all literal values in quotation marks (`"`). To use literal data that contains spaces, enclose the spaces in apostrophes (`'`).
- *(2200 only)* Since quotation marks are not allowed in the limited character set (LCS), you must use `TIC$` or a variable containing an apostrophe before and after literal data in runs residing in LCS reports.

---

## Calculate Labels

A label is a name for a data value in an arithmetic or relational expression.

### Field Labels

A field label is a single alphabetic character that identifies fields to process. When you enter a letter in a field in the function mask or in the `p` (parameters) subfield in a CAL statement, this letter becomes the label identifying that field. You can enter field labels anywhere in the field and in any order.

Whenever you specify unique field labels for each field, they are considered single field labels and, since they represent single values, can be used as operands.

A multiple field label identifies more than one report field. You cannot use multiple field labels as operands because they do not represent single values. See [Formulating Equations](#formulating-equations-with-calculate).

### Value Labels

A value label is a one- to six-character name that identifies a single numeric value. Use value labels in place of actual values or expressions to simplify typing equations. You can define your own value labels or use constant labels set by the system. Once defined, the value does not change until reset by another equation.

To define a value label, use the following format:

```
label=value or expression    (for example, abc=a+b+c)
```

The label must begin with an alphabetic character and can contain only alphanumeric characters and special characters `$`, `%`, `!`, and `?`.

Internally, value labels contain 18 characters and begin with a value of 0. You can use the FIRST conditional statement to initialize value labels to another value, such as spaces. See [Computing Using Conditional Statements](#computing-using-conditional-statements-in-calculate).

Label names you define must not be the same as constant labels or internal functions. See also [Constant Parameter Labels](#constant-parameter-labels).

### Constant Labels

Constant labels are value labels predefined within the software. You cannot store characters in constant labels or use them as receiving labels (except for the LT label).

| Constant Label | Description |
|----------------|-------------|
| `LINE` | Line number of data currently being processed (does not count heading lines and counts only those lines of the type of line you specified for processing). The LINE label is set to 1 initially and increases by 1 each time a new data line is processed. |
| `LT` | Line type designator of the data line currently being processed (for example, a tab or `*`). |
| `PI` | Value of pi (3.14159265358979). |
| `RLINE` | Report line number currently being processed (counts heading lines and all line types, regardless of the type you are processing). |

---

## Formulating Equations with Calculate

In the Calculate command, an equation is an operation that stores the result of an expression in a value label or a field in a report represented by a field label.

### Entering Equations

- *(Windows / Linux / UNIX)* Any variable substitutions must be numeric type variables or numeric data. If they are not, any space-filled equation or invalid data will cause the run to err.
- Always place the field label or value label to the left of the equal sign, and place the expression to the right of the equal sign.
- Start typing equations in the second parameter line of a manual function mask or in the `eq` field of a CAL statement. In a function mask, you can let the equation wrap to the next line if it is longer than the width of the screen.
- You can process fields or labels containing up to 18 characters.
- Place a semicolon (`;`) between each equation.
- *(2200 only)* The maximum number of significant characters (characters other than spaces and tab characters) in an equation is 132.
- You can use any number of spaces or tab characters within equations (for example, `a = b + c`); however, in the CAL statement, you must either remove the extra spaces or place apostrophes before and after the equation.

### Equation Format

```
receiving-label[,options]=expression[; (more equations)]
```

| Field | Description |
|-------|-------------|
| `receiving-label` | Field label or value label to hold the result of the expression. See [Receiving Labels](#receiving-labels). |
| `options` | Equation options E, I, J(x), Kn, Nn, Rn, V, X, and `*`. Use to specify options on individual equations. To remove a function option from an equation, enter a minus sign (`-`) after the equation option (for example, `J-`, `K-`, `V-`). |
| `expression` | Any number of labels, values, and operators that combine to produce a single arithmetic or logical value. See [Arithmetic Expressions](#arithmetic-expressions-in-calculate) and [Relational Expressions](#relational-expressions-in-calculate). |

### Receiving Labels

- If you use a field label as a receiving label, the result overwrites the original value of the field label.
- If you use a multiple field label as a receiving label, the Calculate command repeats the equation once for each field identified.
- Since you cannot store characters in constant labels, you cannot use them as receiving labels, with one exception: You can store a character into the constant label `LT`. This changes the line type of data currently being processed.

Use the following format for partial receiving labels:

```
label(x-y)
```

Where `x` is the starting character within the label and `y` is the number of characters.

If you specify a receiving label that is not large enough to contain the output format, or if the result value of the expression is not a valid date or time, the fields are filled with asterisks and are assigned a value of zero.

---

## Arithmetic Expressions in Calculate

Arithmetic expressions consist of labels, values, and arithmetic operators that combine to produce a single arithmetic value.

Arithmetic operators are symbols you use to specify arithmetic operations. You must specify, not imply, the operators in Calculate equations. For example, to multiply x by y, use `x*y` rather than `xy` or `(x)(y)`.

**Example:** This expression adds the value of x to the value of y and multiplies the sum by 44:

```
(x+y)*44
```

---

## Relational Expressions in Calculate

Relational expressions consist of labels, values, and relational operators used for comparing values or character strings. The expression produces a value of 1 if the comparison is true and a value of 0 if the comparison is false. See also [Computing Using Conditional Statements](#computing-using-conditional-statements-in-calculate).

### Relational and Logical Operators

| Priority | Operator | Description |
|----------|----------|-------------|
| First | `=` | Equal to |
| | `<>` or `><` | Not equal to |
| | `>` | Greater than |
| | `<=` or `=<` | Not greater than (less than or equal to) |
| | `<` | Less than |
| | `>=` or `=>` | Not less than (greater than or equal to) |
| Second | `&` | AND (logical operator) |
| Third | `,` | OR (logical operator) |

### AND and OR Truth Tables

**AND Operation** (`Statement1 & Statement2`):

| Statement1 | Statement2 | Result |
|------------|------------|--------|
| False | False | False |
| True | False | False |
| False | True | False |
| True | True | True |

**OR Operation** (`Statement1 , Statement2`):

| Statement1 | Statement2 | Result |
|------------|------------|--------|
| False | False | False |
| True | False | True |
| False | True | True |
| True | True | True |

---

## Built-in Functions in Calculate

A built-in function is a predefined mathematical or other kind of operation you can perform against values and any kind of label except a multiple field label (unless it is the same as the receiving label).

To use a built-in function, set a value label or field label to equal the value produced by the function. For example, the value label "sqroot" holds the square root of the result of the specified expression:

```
sqroot=sqrt(label1*label2/label3)
```

### Valid Entries

| Format Type | Valid x or x,y Entries |
|-------------|------------------------|
| `FUNCTION(x)` | Value, arithmetic expression, or any kind of label except a multiple field label (unless it is the same as the receiving label). |
| `FUNCTION(x,y)` | Values or any kind of labels except multiple field labels (unless they are the same as the receiving label). |
| `FUNCTION(x1,...xn)` | Values or any kind of labels. If you use a multiple field label, the function acts on all fields identified by multiple field labels. |

### Mathematical Functions

| Function | Description |
|----------|-------------|
| `ABS(x)` | Absolute value or magnitude of x. |
| `ACOS(x)` | Arc cosine of x in radians. |
| `ASIN(x)` | Arc sine of x in radians. |
| `ATAN(x)` | Arc tangent of x in radians. |
| `AVG(x1,...,xn)` | Average value of all specified values or expressions, x1 through xn. |
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
| `MAX(x1,...,xn)` | Maximum; largest value of all specified values or expressions, x1 through xn. |
| `MIN(x1,...,xn)` | Minimum; smallest value of all specified values or expressions, x1 through xn. |
| `MOD(x,y)` | Modulus; remainder value of x/y. |
| `PI` | Value of pi (3.14159265358979). |
| `RAD(x)` | x degrees in radians. |
| `RAN(x,y)` | Random integer value in the range x to y. |
| `SIN(x)` | Sine of x radians. |
| `SQRT(x)` | Square root of x. |
| `SUM(x1,...,xn)` | Total value of all specified values, x1 through xn. |
| `TAN(x)` | Tangent of x radians. |
| `VAVG(x1,...,xn)` | Vertical average of all specified values or expressions, x1 through xn. |
| `VMAX(x1,...,xn)` | Vertical maximum of all specified values or expressions, x1 through xn. |
| `VMIN(x1,...,xn)` | Vertical minimum of all specified values or expressions, x1 through xn. |
| `VSUM(x1,...,xn)` | Vertical sum of all specified values or expressions, x1 through xn. |

---

## Determining Kind of Data in Report Field (DEF)

You can use the `DEF`, `DEFJ`, or `DEFX` built-in function to determine what kind of data a field contains. Use the following format:

```
DEF(field-label)
DEFJ(field-label)
```

`DEF` and `DEFJ` returned values:

| Returned Value | Data Description |
|----------------|-----------------|
| `0` | All tab characters or spaces or both |
| `1` | All numeric characters. The contents of the field may include the characters indicated or the characters and spaces. |
| `2` | All alphabetic characters |
| `3` | Alphabetic and numeric characters |
| `4` | All special characters |
| `5` | Special and numeric characters |
| `6` | Special and alphabetic characters |
| `7` | Special, numeric, and alphabetic characters. The contents of the field may include the characters indicated or the characters and spaces. |
| `8` | All Kanji characters |
| `9` | Kanji and numeric characters |
| `10` | Kanji and alphabetic characters |
| `11` | Kanji, numeric, and alphabetic characters |
| `12` | Kanji and special characters |
| `13` | Kanji, numeric, and special characters |
| `14` | Kanji, alphabetic, and special characters |
| `15` | Kanji, alphabetic, numeric, and special characters |
| `16` | All Katakana characters |
| `17` | Katakana and numeric characters |
| `18` | Katakana and alphabetic characters |
| `19` | Katakana, numeric, and alphabetic characters |
| `20` | Katakana and special characters |
| `21` | Katakana, numeric, and special characters |
| `22` | Katakana, alphabetic, and special characters |
| `23` | Katakana, alphabetic, numeric, and special characters |
| `24` | Katakana and Kanji characters |
| `25` | Katakana, Kanji, and numeric characters |
| `26` | Katakana, Kanji, and alphabetic characters |
| `27` | Katakana, Kanji, numeric, and alphabetic characters |
| `28` | Katakana, Kanji, and special characters |
| `29` | Katakana, Kanji, numeric, and special characters |
| `30` | Katakana, Kanji, alphabetic, and special characters |
| `31` | Katakana, Kanji, numeric, alphabetic, and special characters |

```
DEFX(field-label)
```

`DEFX` returned values:

| Returned Value | Data Description |
|----------------|-----------------|
| `0` | All tab characters or spaces or both |
| `1` | All numeric characters. The contents of the field may include the characters indicated or the characters and spaces. |
| `2` | All alphabetic characters |
| `3` | Alphabetic and numeric characters |
| `4` | All special characters |
| `5` | Special and numeric characters |
| `6` | Special and alphabetic characters |
| `7` | Special, numeric, and alphabetic characters. The contents of the field may include the characters indicated or the characters and spaces. |
| `8` | *(Windows / Linux / UNIX)* Variable has at least one Kanji character. *(2200)* Reserved for future use. |
| `9` | Unsigned integer with no embedded spaces, decimal points, dollar signs, commas, or plus and minus signs with possible leading or trailing spaces. Only received if using the X option. |

---

## Computing Horizontally Using Calculate

With the Calculate command, you can perform computations in fields on each line and store the resulting values in a field on that same line.

To compute horizontally, type field labels (single alphabetic letters) in the fields you want to process and in the field that will hold the result, then type an equation using the field labels and arithmetic and relational operators. See [Computing Horizontally example](#computing-horizontally).

---

## Computing Vertically Using Calculate

Vertical operations produce values that are associated with both the current line being processed and other lines in the report.

To compute vertically, type field labels (single alphabetic letters) or vertical operators, or both, in the fields you want to process, then type an equation using the field labels and arithmetic and relational operators.

Vertical operators are symbols you use to specify an arithmetic operation to be performed on all the values in a field. Place one of the following operators in a field, either in place of a field label or in addition to a field label.

| Operator | Description |
|----------|-------------|
| `+` | Sum of all values in the field |
| `/` | Average of all values in the field |
| `<` | Lowest value in the field |
| `>` | Highest value in the field |

For each data line, the command processes all of the equations you specify before it processes the vertical operators. The command places resulting values at the end of the result under the appropriate fields. See [Totaling Fields Vertically example](#totaling-fields-vertically).

---

## Computing Using Conditional Statements in Calculate

Conditional statements test conditions to determine whether the next equation is processed, and specify an alternative equation to process if a condition is not met.

To use a conditional statement, use a colon (`:`) immediately following each conditional operator, and use a semicolon (`;`) following the expression or equation to separate the statements.

| Format | Description |
|--------|-------------|
| `IF:expression;` | Tests the condition using a relational expression. |
| `THEN:equation;` | Processes the equation when the condition is met. |
| `ELSE:equation;` | Processes the equation when the condition is not met. |
| `FIRST:equation;` | Processes the equation the first time it is encountered. |
| `SKIP:expression;` | Skips the remaining equations and continues on next data line. |
| `EXIT:expression;` | Stops processing equations and displays a result. |

### Why Use SKIP and EXIT Statements?

Use the SKIP and EXIT statements to increase efficiency of the Calculate command. For `expression`, use a relational expression to specify the condition under which equations should be skipped.

When the SKIP expression is true, processing on the current data line stops immediately. Processing continues on the next data line starting with the first equation.

The EXIT statement works like the SKIP statement, except that when the expression is true, all Calculate equations stop processing immediately. The result contains the data lines processed up to, but not including, the data line where the exit condition occurred.

### Guidelines for Using Conditional Statements

- Use logical operators AND (`&`) and OR (`,`) to establish a condition with more than one part. For example: `if:a < 100&b < 100; ...`
- Once a condition is established with an IF statement, it remains in effect until the Calculate command encounters another IF statement. You can include multiple IF/THEN/ELSE statements in your Calculate equations; you are not limited to one.
- Use THEN and ELSE statements any number of times following a condition. For example: `if:a = b;then:c = 1;then:d = 0;else:e = 1;else:f = 0`

---

## Processing Character Strings Using Calculate

Use the following equation format to replace or compare character strings in a report:

```
receiving-label=literal-expression[; (more equations)]
```

| Field | Description |
|-------|-------------|
| `receiving-label` | When replacing strings: field label or value label to hold the result of the expression. When comparing strings: field label or value label to compare to. |
| `=` | When replacing strings: an equal sign to indicate a replace operation. When comparing strings: any relational operator, not just an equal sign, to make the comparison. |
| `literal-expression` | Literal data or character strings in one of the formats described below. |

### Literal Expression Formats

| Format | Description |
|--------|-------------|
| `LIT(x)` | Literal, or character equivalent, of label x. |
| `LIT(x(y-z))` | Literal, or character equivalent, of label x, starting at character position y for z characters. |
| `"data"` | Up to 18 characters of literal data enclosed either in apostrophes or quotation marks. |

A literal expression may have only a single item of literal data. Arithmetic and relational operators are not allowed.

To process character strings:

- In the LIT format, use any kind of label for label x except a multiple field label (unless it is the same as the receiving label).
- The command loads the receiving label starting at the leftmost character position and fills the remainder of the area with spaces if the specified literal is shorter than the area represented by the receiving label.
- The size of the area represented by the receiving label is the size of the field if it is a field label, or 18 characters if it is a value label.
- If the literal is longer than the area represented by the receiving label, the command drops the rightmost characters of the literal.
- Before the Calculate command compares the literal with the data in the label, it left-justifies them.
- If the label contains a different number of characters than the literal, the command adds spaces to the rightmost character positions to make the sizes equal.
- Unless you use the S option, the command makes no distinction between uppercase and lowercase letters in the character strings compared.

---

## Computing Dates and Times Using Calculate

You can use the Calculate command to perform computations on dates and times.

- Two-digit year dates must represent dates between 1944 and 2043.
- Four-digit year dates must represent dates between 1600 and 2299.
- One-digit year dates must represent dates in the years between -4 and +5 years from the current date.
- *(2200)* For elapsed time formats T4 and T5, valid times are between -9544371:46:07 and 9544371:46:07.
- *(Windows / Linux / UNIX)* For elapsed time formats T4 and T5, valid times are between -9544371:59:59 and 9544371:59:59.

Use input formats to indicate which date or time format the original data is in. The Calculate command converts the date and time data to numeric values and processes them in your equations. After processing, the resulting date or time is formatted as you specify in output formats.

### Date and Time Equations

In the equation, place a comma after the receiving label and follow it with the output format.

| Field | Description |
|-------|-------------|
| `Dn` | Date operation where n indicates the date format. See [Date and Time Formats](#date-and-time-formats). |
| `Tn` | Time operation where n indicates the time format. See [Date and Time Formats](#date-and-time-formats). |
| `Mn` | End-of-month operation where n indicates the date format. See [Date and Time Formats](#date-and-time-formats). |

For example, the following equation specifies that field A is to hold the result of a date computation in the format YYMMDD (DATE1$). The original date in field A was in the format DD MMM YY (DATE2$):

```
a,d(1)=d2(a)+90
```

### Date and Time Parameters

| Field | Description |
|-------|-------------|
| `Dn(x)` | Date operation where n indicates the date format and (x) is the numeric date or time value or any kind of label except a multiple field label (unless it is the same as the receiving label). |
| `Tn(x)` | Time operation where n indicates the time format and (x) is the numeric date or time value or any kind of label except a multiple field label (unless it is the same as the receiving label). |

For example, this date input format specifies that dates in field A are in the format DD MMM YY (DATE2 format):

```
d2(a)
```

### Constant Parameter Labels

| Label | Description |
|-------|-------------|
| `TODAY` | Contains the current date, expressed in number of days relative to a fixed date. |
| `TIME` | Contains the current time, expressed in the number of hours and fractions of hours relative to midnight. |

### Calendar Equation Parameters

Use calendar parameters to perform addition and subtraction of a number of years, months, and days to a date.

| Parameter | Description |
|-----------|-------------|
| `nY` | Specifies a unit of years to use in the equation. |
| `nM` | Specifies a unit of months to use in the equation. |
| `nD` | Specifies a unit of days to use in the equation. |
| `n` | Specifies a unit of days to use in the equation (default). |

### Processing Dates by Work Week

Use the `Wn` option to process dates by work week, where n is the number of days in the work week, 1 through 6. Default = 7 (assumed when you do not use the W option).

The command assumes Monday is the beginning of the work week. You can also use the W option as an equation option.

For example, with the `W5` option, if six days were added to a date falling on a Monday, the resulting date would be Tuesday in the following week.

### Guidelines for Computing Dates and Times

- Whenever you use date or time output formats, the system disables E, I, J, and R options since they also specify a type of output format.
- If the resulting date or time is not valid, the system fills the receiving field or label with asterisks (`*`) and assigns it a value of zero. If you intend to check for asterisks flagging invalid data, remember that value labels are 18 characters long and would contain 18 asterisks.
- The system right-justifies numeric values and left-justifies all other values in the output field. It also fills any unused columns in the output field with spaces.
- To use minutes and seconds in time computations, convert them into decimal hours and fractions (divide minutes by 60 and seconds by 3600).
- If the output format is not specified, the resulting time is written as hours.
- Date and time formats consist of a variable number of characters. The area represented by your receiving label must be large enough to hold the output format you specify. The size of each format is listed in the "Minimum Size" column in the table below. In CAL statements, note these sizes for receiving variables.
- If you specify a receiving label that is not large enough to hold the output format you specified, the system fills it with asterisks (`*`) and assigns it a value of zero.

### Date and Time Formats

| Format | Input | Output | Minimum Size |
|--------|-------|--------|--------------|
| `DATE0$` (YMMDD) | `D0(x)` | `D(0)` | 5 |
| `DATE1$` (YYMMDD) | `D1(x)` | `D(1)` | 6 |
| `DATE2$` (DD MMM YY) | `D2(x)` | `D(2)` | 9 |
| `DATE3$` (YDDD) | `D3(x)` | `D(3)` | 4 |
| `DATE4$` (YYDDD) | `D4(x)` | `D(4)` | 5 |
| `DATE5$` (DDMMYY) | `D5(x)` | `D(5)` | 6 |
| `DATE6$` (MM/DD/YY) | `D6(x)` | `D(6)` | 8 |
| `DATE7$` (MONTH DD, YYYY)* | `D7(x)` | `D(7)` | 18 |
| `DATE8$` (MMDDYY) | `D8(x)` | `D(8)` | 6 |
| `DATE9$` (DD/MM/YY) | `D9(x)` | `D(9)` | 8 |
| `DATE11$` (YYYYMMDD) | `D11(x)` | `D(11)` | 8 |
| `DATE12$` (DD MMM YYYY) | `D12(x)` | `D(12)` | 11 |
| `DATE14$` (YYYYDDD) | `D14(x)` | `D(14)` | 7 |
| `DATE15$` (DDMMYYYY) | `D15(x)` | `D(15)` | 8 |
| `DATE16$` (MM/DD/YYYY) | `D16(x)` | `D(16)` | 10 |
| `DATE18$` (MMDDYYYY) | `D18(x)` | `D(18)` | 8 |
| `DATE19$` (DD/MM/YYYY) | `D19(x)` | `D(19)` | 10 |
| `DATE20$` (YYYY-MM-DD) | `D20(x)` | `D(20)` | 10 |
| `DATE21$` (DD-MMM-YY) | `D21(x)` | `D(21)` | 9 |
| `TIME$` (HH:MM:SS) | `T0(x)` | `T(0)` | 8 |
| `TIME1` (HH:MM) | `T1(x)` | `T(1)` | 5 |
| `TIME2` (HHMMSS) | `T2(x)` | `T(2)` | 6 |
| `TIME3` (HHMM) | `T3(x)` | `T(3)` | 4 |
| `TIME4` (HHHHHHH:MM:SS) | `T4(x)` | `T(4)` | 7** |
| `TIME5` (HHHHHHH:MM) | `T5(x)` | `T(5)` | 4** |
| Month Name | n/a | `D(C)` | 1*** |
| Day | n/a | `D(D)` | 2 |
| Julian Day | n/a | `D(J)` | 3 |
| Month | n/a | `D(M)` | 2 |
| Day Number | n/a | `D(N)` | 1 |
| Day Name | n/a | `D(W)` | 1*** |
| Year | n/a | `D(Y)` | 2 |
| Year | n/a | `D(Z)` | 4 |
| Hour Number | n/a | `T(H)` | 2 |
| Minute Number | n/a | `T(M)` | 2 |
| Second Number | n/a | `T(S)` | 2 |

\* DATE7$ fields must be exactly 18 characters wide; using fewer characters fills the field with asterisks.

\** *(Windows / Linux / UNIX)* For elapsed time formats T4 and T5, valid times are between -9544371:59:59 and 9544371:59:59. Hours (H) can be from 1 to 7 digits. If negative values are used, the minus sign can be an eighth character. The values in output fields are left-justified, space-filled. If the output field is too small for the value, it is filled with asterisks (`*`). *(2200)* For elapsed time formats T4 and T5, valid times are between -9544371:46:07 and 9544371:46:07. Hours (H) can be from 1 to 7 digits. If negative values are used, the minus sign can be an eighth character. The values in output fields are right-justified, space-filled. If the output field is too small for the value, it is filled with asterisks (`*`).

\*** The number of characters for output formats C and W depends on the size of the receiving label.

> *(2200 only)* **Note:** For DATE2$ and DATE12$, spaces are optional. If no spaces are detected, the scan is terminated after 7 and 9 characters respectively.

---

## Examples

The examples below refer to the following named reports used in the demonstration database:

- **Report2B** — Report 2B in the demonstration database
- **Report1C** — Report 1C in the demonstration database
- **Report1D** — Report 1D in the demonstration database
- **Sample:**

```
* One . Two .Three. Four. Five. Six  .Seven . Eight .
*=====.=====.=====.=====.=====.======.======.=======.
     1     7     3   111
     2     6     6   222
     3     5     9   333
     4     4    12   444
     5     3    15   555
     6     2    18   666
     7     1    21   777
```

- **DateTime1:**

```
*DATE7              DATE1  Results        TIME2  Results   
*==================.======.==============.======.========.
 June 11, 1996      960611                130000
 June 26, 1996      960630                060000
```

- **DateTime2:**

```
*DATE7              DATE1  Results         
*==================.======.==============.
 June 11, 1996      960611
 June 26, 1996      960630
 June 26, 1996      960622
```

- **DateTime3:**

```
*DATE7              Results         
*==================.==============.
 June 11, 1996
 June 26, 1996
 June 28, 1996
```

---

### Computing Horizontally

This example processes Report1C. It multiplies the values in field B by .05, subtracts those values from the values in field A, and places the result values into field E. It also divides values in field D by 2 and places them back into field D.

**Function Mask:**
```
vr.01
*Prod.... Retail . Sales .Space.  Demo  .               .
*Type....  $$$$  .Commiss. Req .Quantity. Demo Results  .
*====....========.=======.=====.========.===============.
 ****    ******** ******* ***** ******** ***************  
         a        b       c     d        e
e=a-(b*.05);d=d/2
```

**Equivalent Statement:**
```
@cal,'report1c' vr.01 33-8,42-7,50-5,56-8,65-15 |,a,b,c,\
d,e e=a-(b*.05);d=d/2 .
```

| Field | Description |
|-------|-------------|
| `v` | Indicates that only equations that operated on valid data are to be included in the result. |
| `r.01` | Indicates that the computation results are to be rounded to the nearest hundredth. |
| `a,b,c,d,e` | Field labels identifying the fields to process. |

---

### Computing Horizontal Average and More

This example processes Sample.

**Function Mask:**
```
* One . Two .Three. Four. Five. Six  .Seven . Eight .
*=====.=====.=====.=====.=====.======.======.=======.
 ***** ***** ***** ***** ***** ****** ****** *******  
 a     b     b     c     d     e      f      g        
d=avg(b);e=sum(a,b,c);f=min(a,b,c);g=max(a,b,c)
```

**Equivalent Statement:**
```
@cal,'sample' '' 2-5,8-5,14-5,20-5,26-5,32-5,38-6,\
45-7 |,a,b,b,c,d,e,f,g d=avg(b);e=sum(a,b,c);\
f=min(a,b,c);g=max(a,b,c) .
```

Note that label B identifies two fields (multiple field label). The equations process fields and values as follows: `d` contains an average of the B fields; `e` contains the sum of the A, B, and C fields; `f` contains the lowest (min) value of the A, B, or C fields; `g` contains the highest (max) value of the A, B, or C fields.

**Result:**
```
* One . Two .Three. Four. Five. Six  .Seven . Eight .
*=====.=====.=====.=====.=====.======.======.=======.
     1     7     3   111     5    122      1     111
     2     6     6   222     6    236      2     222
     3     5     9   333     7    350      3     333
     4     4    12   444     8    464      4     444
     5     3    15   555     9    578      3     555
     6     2    18   666    10    692      2     666
     7     1    21   777    11    806      1     777
```

---

### Totaling Fields Vertically

**Example 1:** This example processes Report1C. It shows the grand total of the Retail $$$$ field being created in two ways: using the vertical operator `+` and the built-in function VSUM.

**Function Mask:**
```
l
* Product . Sub .Produc. Whole . Retail .
*  Type   . Key . Cost . Sale$ .  $$$$  .
*=========.=====.======.=======.========.
********** ***** ****** ******* ********  
                                +   a     

total=vsum(a)
```

**Equivalent Statement:**
```
@cal,'report1c' l 33-8 |,+a total=vsum(a) <vert>i8,<total>i8 .
```

| Field | Description |
|-------|-------------|
| `l` | Option indicating that all value labels are to be listed at the end of the result with their final values. |
| `+` | Vertical operator indicating that the values in the Retail $$$$ field are to be totaled and the result placed beneath the field at the end of the result. |
| `a` | Field label identifying the field to process. |
| `total=vsum(a)` | `total` is the value label that carries the vertical sum (VSUM) of field A. |
| `<vert>i12` | Load `<vert>` with the vertical sum of field A (column 33 for eight characters). |
| `<total>i12` | Load `<total>` with the contents of value label "total." |

**Result (partial):**
```
* Product . Sub .Produc. Whole . Retail .
*  Type   . Key . Cost . Sale$ .  $$$$  .
*=========.=====.======.=======.========.
  GREENBOX7     I  14900   18625    26075
  GREENBOX8     J  15100   18875    26425
  GREENBOX9     K  15300   19125    26775
*                               --------  
*                                 447300  
.
. TOTAL  =             447300
                           ..... END REPORT .....
```

**Example 2:** This example processes Report1C. It places the vertical cumulation of field A values into field B.

**Function Mask:**
```
j(c)
* Product .           .Space.  Demo  .               .
*  Type   .           . Req .Quantity. Demo Results  .
*=========.   . . .   .=====.========.===============.
**********             ***** ******** ***************
                       a              b

b=vsum(a)
```

**Equivalent Statement:**
```
@cal,'report1c' j(c) 50-5,65-15 |,a,b b=vsum(a) .
```

| Field | Description |
|-------|-------------|
| `j(c)` | Option indicating that commas are to be inserted every three digits in the result. |
| `a` and `b` | Field labels identifying the fields to process. |

---

### Comparing Fields

This example processes Sample. It uses a conditional statement to test whether the values in field A equal those in field B. If they are equal, then the value 1 is placed in field C. If they are not equal, 0 is placed in field C.

**Function Mask:**
```
* One . Two .Three. Four. Five. Six  .Seven . Eight .
*=====.=====.=====.=====.=====.======.======.=======.
 ***** ***** ***** ***** ***** ****** ****** *******  
 a     b                 c
if:a=b;then:c=1;else:c=0
```

**Equivalent Statement:**
```
@cal,'sample' '' 2-5,8-5,26-5 |,a,b,c if:a=b;then:c=1;else:c=0 .
```

**Partial Result:**
```
* One . Two .Three. Four. Five. Six  .Seven . Eight .
*=====.=====.=====.=====.=====.======.======.=======.
     1     7     3   111     0
     2     6     6   222     0
     3     5     9   333     0
     4     4    12   444     1
     5     3    15   555     0
     6     2    18   666     0
     7     1    21   777     0
```

---

### Comparing Within a Range

This example processes Report1C. The IF statement establishes a two-part condition: if the value in field A is greater than 150 and also less than or equal to 250, the equations defined in THEN statements are performed. Multiple THEN statements set field B to equal field A and field C to equal the value in field A multiplied by .5. Multiple ELSE statements set field B to 0 and field C to the value in field A multiplied by 2.

**Function Mask:**
```
* Product .     .Space .  Demo  .              .
*  Type   .     . Req  .Quantity. Demo Results .
*=========. . . .===== .========.===========   .
 *********       *****  ******** **********
 a                      b        c
 if:a>150 & a<=250;then:b=a;then:c=a*.5;else:b=0;else:c=a*2
```

**Equivalent Statement:**
```
@cal,'report1c' '' 50-5,56-8,65-15 |,a,b,c 'if:\
a>150 & a<=250;then:b=a;then:c=a*.5;else:b=0;else:c=a*2' .
```

---

### Conditionally Erasing Fields

This example processes Report2B. The IF statement establishes the condition: if field A equals 0. The THEN statement uses equation option `E` to indicate that the field should be erased.

**Function Mask:**
```
*St.Status.By. Product .Serial.Produc.Order.Cust.Produc.
*Cd. Date .In.  Type   .Number. Cost .Numbr.Code. Plan .
*==.======.==.=========.======.======.=====.====.======.
 ** ****** ** ********* ****** ****** ***** **** ******
 b  b      b  b         a      b      b     b    b
 if:a=0;then:b,e=0
```

**Equivalent Statement:**
```
@cal,'report2b' '' 2-2,5-6,12-2,15-9,25-6,32-6,39-5,45-4,\
50-6 |,b,b,b,b,a,b,b,b,b if:a=0;then:b,e=0 .
```

---

### Conditionally Skipping Equations

This example processes Report1C. The SKIP statement establishes the condition: if field A is equal to or greater than 14000. When this condition is true, the command skips the remaining equations and continues processing the next data line.

You can use the EXIT statement in place of the SKIP statement to stop processing all equations and display a result containing the lines processed up to, but not including, the line where the condition occurred.

**Function Mask:**
```
* Product . Sub .Produc. Whole . Retail . Sales .
*  Type   . Key . Cost . Sale$ .  $$$$  .Commiss.
*=========.=====.======.=======.========.=======.
 ********* ***** ****** ******* ******** *******
                 a      b       c        d
skip:a=>14000;d=c-b
```

**Equivalent Statement:**
```
@cal,'report1c' '' 18-6,25-7,33-8,42-7 |,a,b,c,d skip:\
a=>14000;d=c-b .
```

---

### Replacing Character Strings

This example processes Report1D. It replaces field A with the character string `sh`, and replaces the last character (`4-1`) of field B with the letter `x`. The notation `(4-1)` means to process one character beginning with the fourth column of the field.

**Function Mask:**
```
*St.Order . Product.         .Sale.
*Cd.Number.  Type  .         .Rep .
*==.======.========.  . . .  .====.
 ** ****** *********          ****  
 a                            b     
a="sh";b(4-1)="x"
```

**Equivalent Statement:**
```
@cal,'report1d' '' 2-2,56-4 |,a,b a="sh";b(4-1)="x" .
```

---

### Moving Data Between Fields

This example processes Report1C. It replaces field D with literal data from columns 1 through 5 in field A, and replaces field C with the literal data from field B.

**Function Mask:**
```
* Product . Sub .         .  Demo   .               .
*  Type   . Key .         .Quantity . Demo Results  .
*=========.=====.  . . .  .=========.===============.
 ********* *****           ********* ***************  
 a         b               c         d
d=lit(a(1-5));
c=lit(b)
```

**Equivalent Statement:**
```
@cal,'report1c' '' 2-9,12-5,59-5,65-15 |,a,b,c,\
d d=lit(a(1-5));c=lit(b) .
```

---

### Comparing Character Strings

This example processes Report1D. The first IF statement establishes the condition: if field C equals the character string `dico`. The first THEN statement replaces field B with the contents of field B plus 5. The next equation loads value label `model` with literal data from the first eight characters (1-8) in field A. The next IF statement establishes the condition: if the data in `model` is not equal to the character string `blackbox`. The next THEN statement replaces field D with the character string `jak`.

**Function Mask:**
```
*St.Order . Product  .Ord.Cust.         .Sale.
*Cd.Number. Type     .Qty.Code.         .Rep .
*==.======.==========.=== ====.  . . .  .====.
 ** ****** ******* ** *** ****           ****  
           a          b   c              d     
if:c="dico";then:b=b+5; model=lit(a(1-8));if:  
model<>"blackbox";then:d="jak"
```

**Equivalent Statement:**
```
@cal,'report1d' '' 12-9,22-3,26-4,56-4 |,a,b,c,\
d if:c="dico";then:b=b+5;model=lit(a(1-8));\
if:model<>"blackbox";then:d="jak" .
```

**Result:**
```
.Status Report                        Corporate Order Status   D0000
*St.Order . Product .Ord.Cust. ... .Req d .Sale                  .       .
*Cd.Number.  Type   .Qty.Code. ... .Delivr.Rep .    Customer     .       .
*==.======.=========.===.====.=...=.======.====.=================.
 OR 99951S GREENBOX9   2 AMCO       840312 jak  AMERICAN OIL CO.
 OR 99951S BLACKBOX9   1 AMCO       840312 DJR  AMERICAN OIL CO.
 OR 99951S GREENBOX7   1 AMCO       840312 jak  AMERICAN OIL CO.
 OR 96652S BLACKBOX4   1 ARCO       840412 LSJ  ARGENTINE CORP
 OR 96652S GREENBOX4   2 ARCO       840412 jak  ARGENTINE CORP
 OR 96652S GREENBOX5   1 ARCO       840412 jak  ARGENTINE CORP
 OR 99753S GREENBOX5   6 DICO       840312 jak  DIGITAL CORP
 OR 99842S BLACKBOX8   1 FEDS       840312 PLR  FED SYSTEMS CORP
 OR 99842S BLACKBOX0   1 FEDS       840312 PLR  FED SYSTEMS CORP
 OR 96751S GREENBOX1   1 FEDS       840312 jak  FED SYSTEMS CORP
 OR 94525S GREENBOX8   1 FEDS       840312 jak  FED SYSTEMS CORP
 OR 99725S BLACKBOX4   1 INTR       840312 LTR  INTERNATIONAL CO
 OR 98782S BLACKBOX9   1 USSC       840312 SSF  UNION STEEL/SULFR
 OR 96755S GREENBOX9   1 USSC       840312 jak  UNION STEEL/SULFR
```

---

### Searching for Strings and Numbers

This example processes Report1D. The C option indicates that only those data lines meeting the following two-part condition are to be included in the result: if field A equals 1 and if field B also equals the character string `amco`.

**Function Mask:**
```
c
*St.Ord.Cust.                 .               .
*Cd.Qty.Code.    Customer     .   Address     .
*==.===.====.=================.===============.
 ** *** **** ***************** ***************
    a   b
if:a=1&b="amco"
```

**Equivalent Statement:**
```
@cal,'report1d' c 22-3,26-4 |,a,b if:a=1&b="amco" .
```

---

### Changing Line Types in a Report

This example processes Report2B. The IF statement establishes the condition: if field A equals the character string `sh`. The multiple THEN statements change the line type of those lines meeting the condition to asterisk (`*`) using the LT constant label, and replace field B with the character string `shx`.

**Function Mask:**
```
*St.Status.By. Product .         .Spc.
*Cd. Date .In.  Type   .         .Cod.
*==.======.==.=========.  . . .  .===.
 ** ****** ** *********           ***
 a                                b
if:a="sh";
then:lt='*';
then:b='shx'
```

**Equivalent Statement:**
```
@cal,'report2b' '' 2-2,77-3 |,a,b if:a="sh";
then:lt="*";\ then:b="shx" .
```

---

### Processing Based on Line Type

This example processes Report2B. The A option indicates that all line types are to be processed. The first IF statement establishes the condition: if the line type currently being processed equals `*`. The first THEN statement replaces field A with `mauvebox`. The next IF statement tests for tab (`|`) line type, and the next THEN statement replaces field A with `whitebox`.

**Function Mask:**
```
a
*St.Status.By. Product .
*Cd. Date .In.  Type   .
*==.======.==.=========.
 ** ****** ** ********
              a
 if:lt="*";then:a="mauvebox";
 if:lt="|";then:a="whitebox"
```

**Equivalent Statement:**
```
@cal,'report2b' a 15-8 |,a if:lt="*";then:a="mauvebox";\
if:lt="|";then:a="whitebox" .
```

---

### Subtotaling, Average on Subkey Field

This example processes Report1C. The FIRST statement initializes value label `old` to spaces. The IF statement tests if the data in `old` equals the literal data in field A. Multiple THEN statements accumulate `total` and increment `count`. Multiple ELSE statements reset `count` to 1 and set `total` to field B. The final equations compute running subtotals and averages.

**Function Mask:**
```
*Product. Sub .           .Space.  Demo  .               .
* Type  . Key .           . Req .Quantity. Demo Results  .
*=======.=====.   . . .   .=====.========.===============.
 ******* *****             ***** ******** ***** *********
         a                 b              c     d
 first:old="";
 if:old=lit(a);then:total=total+b;then:count=count+1;
 else:count=1;else:total=b;
 old=lit(a);c=total/count;d=total
```

**Equivalent Statement:**
```
@cal,'report1c' '' 12-5,50-5,65-5,71-9 |,a,b,c,\
d first:old="";if:old=lit(a);\
then:total=total+b;then:count=count+1;else:count=1;\
else:total=b;old=lit(a);c=total/count;d=total .
```

The final step in this example is to use the Totalize command with O and S options against the Calculate result to extract only those lines showing the final subtotals for each subkey group. Simply type the S parameter in the Sub Key field.

---

### Converting Date and Time Formats

This example processes DateTime1. Receiving labels B and D use equation options to specify the resulting format. D7 and T2 are input formats.

**Function Mask:**
```
*DATE7              DATE1  Results        TIME2  Results
*==================.======.==============.======.========.
 ****************** ****** ************** ****** ********
 a                         b              c      d
b,d(2)=d7(a);
d,t(0)=t2(c)
```

**Equivalent Statement:**
```
@cal,'datetime1' '' 2-18,28-14,43-6,50-8 |,a,b,c,\
d b,d(2)=d7(a);d,t(0)=t2(c) .
```

**Result:**
```
*DATE7              DATE1  Results        TIME2  Results
*==================.======.==============.======.========.
 June 11, 1996      960611 11 JUN 96      130000 13:00:00
 June 26, 1996      960630 26 JUN 96      060000 06:00:00
```

---

### Determining Day, Month, Hour

This example processes DateTime1. Receiving labels B, C, and E use equation options to specify the resulting format. D1 and T2 are input formats.

**Function Mask:**
```
*DATE7              DATE1  Results        TIME2  Results
*==================.======.==============.======.========.
 ****************** ****** ********* **** ****** ********
                    a      b         c    d      e
b,d(w)=d1(a);c,d(c)=d1(a);e,t(h)=t2(d)
```

**Equivalent Statement:**
```
@cal,'datetime1' '' 21-6,28-9,38-4,43-6,50-8 |,a,b,c,d,\
e b,d(w)=d1(a);c,d(c)=d1(a);e,t(h)=t2(d) .
```

**Result:**
```
*DATE7              DATE1  Results        TIME2  Results
*==================.======.==============.======.========.
 June 11, 1996      960611 THURSDAY  JUNE 130000       13
 June 26, 1996      960630 TUESDAY   JUNE 060000        6
```

---

### Adding Days and Hours

This example processes DateTime1. Receiving labels B and D use equation options to specify the resulting format. D7 and T2 are input formats.

**Function Mask:**
```
*DATE7              DATE1  Results        TIME2  Results
*==================.======.==============.======.========.
 ****************** ****** ************** ****** ********
 a                         b              c      d
b,d(2)=d7(a)+30;
d,t(2)=t2(c)+10
```

**Equivalent Statement:**
```
@cal,'datetime1' '' 2-18,28-14,43-6,50-8 |,a,b,c,\
d b,d(2)=d7(a)+30;d,t(2)=t2(c)+10 .
```

**Result:**
```
*DATE7              DATE1  Results        TIME2  Results   
*==================.======.==============.======.========.
 June 11, 1996      960611 11 JUL 96      130000   230000  
 June 26, 1996      960630 26 JUL 96      060000   160000  
```

---

### Comparing Dates

This example processes DateTime1. Field C contains the difference in days between field A and field B. D7 and D1 are input formats.

> **Note:** You can compare times in a similar way. Replace the date formats with time formats in the equation.

**Function Mask:**
```
*DATE7              DATE1  Results
*==================.======.==============.
 ****************** ****** **************
 a                  b      c
c=d7(a)-d1(b)
```

**Equivalent Statement:**
```
@cal,'datetime1' '' 2-18,21-6,28-14 |,a,b,\
c c=d7(a)-d1(b) .
```

**Result:**
```
*DATE7              DATE1  Results
*==================.======.==============.
 June 11, 1996      960611              0
 June 26, 1996      960630             -4
```

---

### Comparing Dates Conditionally

This example processes DateTime2. Field C contains the difference in days between field A and field B. The IF statements check whether the difference is greater than 0 or equal to 0, and the THEN statements replace field D with various character strings accordingly.

**Function Mask:**
```
*DATE7              DATE1  Results
*==================.======.==============.
 ****************** ****** ****   *******
 a                  b      c      d
c=d7(a)-d1(b);
if:c>0;then:d="Early";else:d="Late";
if:c=0;then:d="On time"
```

**Equivalent Statement:**
```
@cal,'datetime2' '' 2-18,21-6,28-4,35-7 |,a,b,c,\
d c=d7(a)-d1(b);if:c>0;then:d="Early";else:d="Late";\
'if:c=0;then:d="On time"' .
```

**Result:**
```
*DATE7              DATE1  Results
*==================.======.==============.
 June 11, 1996      960611    0   On time
 June 26, 1996      960630   -4   Late
 June 26, 1996      960622    4   Early
```

---

### Comparing Current Date and Time

This example processes DateTime1. Field B contains the difference in days between field A and the current date. Field D contains the difference in hours between field C and the current time, rounded to the nearest tenth. D7 and T2 are input formats.

**Function Mask:**
```
*DATE7              DATE1  Results        TIME2  Results
*==================.======.==============.======.========.
 ****************** ****** ************** ****** ********
 a                         b              c      d
b=d7(a)-today;
d,r.1=t2(c)-time
```

**Equivalent Statement:**
```
@cal,'datetime1' '' 2-18,28-4,43-6,50-8 |,a,b,c,\
d b=d7(a)-today;d,r.1=t2(c)-time .
```

**Result:**
```
*DATE7              DATE1  Results        TIME2  Results
*==================.======.==============.======.========.
 June 11, 1996      960611            152 130000     -1.1
 June 26, 1996      960630            167 060000     -8.1
```

---

### Using a Constant Date and Time

This example processes DateTime1. Fields B and D contain the differences between the specified constant dates/times and field values. D1, T2, and T3 are input formats.

**Function Mask:**
```
*DATE7              DATE1  Results        TIME2  Results
*==================.======.==============.======.========.
 ****************** ****** ************** ****** ********
                    a      b              c      d
b=d1(920603)-d1(a);
d=t2(c)-t3(0500)
```

**Equivalent Statement:**
```
@cal,'datetime1' '' 21-6,28-3,43-6,50-8 |,a,b,c,\
d b=d1(920603)-d1(a);d=t2(c)-t3(0500) .
```

**Result:**
```
*DATE7              DATE1  Results        TIME2  Results
*==================.======.==============.======.========.
  June 11, 1996     960611             -8 130000        8
  June 26, 1996     960630            -27 060000        1
```

---

### Adding Days to a Date

This example processes DateTime1. Receiving label C uses an equation option to specify the resulting format. D2 and D7 are input formats.

**Function Mask:**
```
w5
*DATE7              DATE1  Results
*==================.======.==============.
 ****************** ****** **************
 a                  b      c
c,d(2)=d7(a)+10
```

**Equivalent Statement:**
```
@cal,'datetime1' w5 2-18,21-6,28-14 |,a,b,\
c c,d(2)=d7(a)+10 .
```

**Result:**
```
*DATE7              DATE1  Results
*==================.======.==============.
 June 11, 1996      960611 24 JUN 92
 June 26, 1996      960630 08 JUL 92
```

---

### Computing Difference in Workdays (1)

This example processes DateTime3. It calculates the difference in workdays, not including the first day (if it is a workday) but including the last day (if it is a workday).

> **Note:** Since a weekend date has the same relative workday number as the previous workday, some inconsistencies can occur when you calculate the difference in workdays.

Receiving label B uses the W5 equation option to indicate five days in the work week. The date 920603 is subtracted from field A. (Dates in field A must be later than 920603 for this equation to work as expected.) D7 and D1 are input formats.

> **Note:** This method counts the difference between Monday and Friday as four days (day 5 minus day 1).

**Function Mask:**
```
*DATE7              Results
*==================.==============.
 ****************** **************
 a                  b
b,w5=d7(a)-d1(920603)
```

**Equivalent Statement:**
```
@cal,'datetime3' '' 2-18,28-14 |,a,b b,w5=d7(a)-d1(920603) .
```

**Result:**
```
*DATE7              Results
*==================.==============.
 June 11, 1996                   6
 June 26, 1996                  17
 June 28, 1996                  17
```

---

### Computing Difference in Workdays (2)

This example processes DateTime3. It calculates the difference in workdays, including both the first and last day (if they are workdays).

> **Note:** Since a weekend date has the same relative workday number as the previous workday, some inconsistencies can occur when you calculate the difference in workdays.

Value label `wkday` is loaded with the day number of the date 920603 (Monday = 1, Tuesday = 2, and so on). Dates are subtracted as specified. The relational expression `wkday<=5` produces a value of 1 if true (wkday is a workday) or 0 if false, and this value is added to the difference.

> **Note:** This method counts the difference between Monday and Friday as five days (day 5 minus day 1 plus 1 if the earlier date is a workday).

**Function Mask:**
```
*DATE7              Results
*==================.==============.
 ****************** **************
 a                  b
wkday,d(n)=d1(920603);b,w5=d7(a)-d1(920603)+(wkday<=5)
```

**Equivalent Statement:**
```
@cal,'datetime3' '' 2-18,28-14 |,a,b wkday,d(n)=\
d1(920603);b,w5=d7(a)-d1(920603)+(wkday<=5) .
```

**Result:**
```
*DATE7              Results
*==================.==============.
 June 11, 1996                   7
 June 26, 1996                  18
 June 28, 1996                  18
```

---

### Computing Difference in Workdays (3)

This example processes DateTime3. It calculates the difference in workdays the same way as the Date command, as follows:

- If the first day is not a workday, the command moves it back to the closest workday.
- If the last day is not a workday, the command moves it forward to the closest workday.
- If both the first and last days are not workdays, the command moves both of them forward to the next workday.
- When the difference is calculated, the command does not include the first day; Friday to Saturday is one workday and Sunday to Monday is one workday.

> **Note:** Since a weekend date has the same relative workday number as the previous workday, some inconsistencies can occur when you calculate the difference in workdays.

Value label `wkday` is loaded with the day number of 920603; `wkday1` is loaded with the day number of field A. The relational expression `wkday<=5` produces 1 if true (a workday) or 0 if false. The relational expression `wkday1>5` produces 1 if true (a weekend day) or 0 if false. The logical AND (`&`) specifies that only when both expressions are true will a value of 1 be added to the difference. See [Relational Expressions in Calculate](#relational-expressions-in-calculate) for information on AND and OR truth conditions.

> **Note:** This method counts the difference between Monday and Friday as five days (day 5 minus day 1 plus 1 if the earlier date is a workday).

**Function Mask:**
```
*DATE7              Results
*==================.==============.
 ****************** **************
 a                  b
wkday,d(n)=d1(920603);wkday1,d(n)=d7(a);
b,w5=d7(a)-d1(920603)+((wkday<=5)&(wkday1>5))
```

**Equivalent Statement:**
```
@cal,'datetime3' '' 2-18,28-14 |,a,b wkday,d(n)=\
d1(920603);wkday1,d(n)=d7(a);b,w5=\
d7(a)-d1(920603)+((wkday<=5)&(wkday1>5)) .
```

**Result:**
```
*DATE7              Results
*==================.==============.
 June 11, 1996                   6
 June 26, 1996                  17
 June 28, 1996                  18
```

---

### Adding 11 Months to a Date Field

This example adds 11 months to a date field.

**Function Mask:**
```
*D1-Fmt                   .
*YYMMDD. New date result  .
*======.==================.
 ****** ******************  
 a      b
b,d(7)=d1(a)+11m
```

**Equivalent Statement:**
```
@CAL,DataReport '' 2-6,9-18 |,a,b b,d(7)=d1(a)+11m .
```

| Field | Description |
|-------|-------------|
| `a` | Field label identifying the date field to process. |
| `b` | Field label identifying the location for the date equation result. |
| `+11m` | Use equation date parameter `m` to add 11 months to date field label `a`. |

**Result:**
```
.year calculations
.D1-Fmt                   .
*YYMMDD. New date result  .
*======.==================.
 030331 FEBRUARY 29, 2004
 050131 DECEMBER 31, 2005
 990330 FEBRUARY 29, 2000
```

---

### Vertical Addition (T5 Time Format)

```
@brk .
.Test
*time1.  timeadd .time2.
*=====.==========.=====.
|12:24|          |22:24|
|12:25|          |12:25|
|12:19|          |12:59|
|59:59|          |59:10|
@brk rnm -1 .
@cal,-1 'O' 'time1' |,a first:aaa=0;aaa=aaa+t5(a) <hrs1>f12 .
@cal,-1 'O' 'time2' |,b first:bbb=0;bbb=bbb+t5(b) <hrs2>f12 .
@dc t5=<hrs1> <hrmin1>h10 .
@dc t5=<hrs2> <hrmin2>h10 .

Totals
<hrmin1>       <hrmin2>
@brk .
@add,-0,-1 .
@dsp,-0 .
```

**Result:**
```
*time1.  timeadd .time2.
*=====.==========.=====.
|12:24|          |22:24|
|12:25|          |12:25|
|12:19|          |12:59|
|59:59|          |59:10|

Totals
97:07            106:58
```

---

### Horizontal Addition (T5 Time Format)

```
@brk .
.Test
*time1. timadd   .time2.
*=====.==========.=====.
|12:24|          |22:24|
|12:25|          |12:25|
|12:19|          |12:59|
|59:59|          |59:01|
@brk .      .
@cal,-0 '' 'time1','timadd','time2' |,a,c,b c,t(5)=t5(a)+t5(b) .
@dsp,-0 .
```

**Result:**
```
*time1. timadd   .time2.
*=====.==========.=====.
|12:24|34:48     |22:24|
|12:25|24:50     |12:25|
|12:19|25:18     |12:59|
|59:59|119:00    |59:01|
```

---

### Producing End-of-Month Dates

This example produces end-of-month dates when running the CAL function on a report. Assume you are running the CAL function on the following report:

```
.EOM Test                                  
*In    .Out1    .Out2              .       
*======.========.==================.=======
|070112|        |                          
|070212|        |                          
...
|071112|        |                          
                ..... END REPORT .....
```

**Function Mask:**
```
.EOM Test                                  
*In    .Out1    .Out2              .       
*======.========.==================.=======
****** ******** ****************** *******
|a     |b       |                  |       
B,M(11)=D1(A)
```

**Equivalent Statement:**
```
@cal,'report2b' '' 'In','Out1' |,a,b B,M(11)=D1(A) .
```

| Field | Description |
|-------|-------------|
| `a` | Defines the In column. |
| `b` | Defines the Out1 column. |
| `D1` | Identifies the In column as input in DATE2$ format. |
| `M(11)` | Converts the date field to end-of-month date in DATE11$ format. |

**Partial Result:**
```
.EOM Test                                  
*In    .Out1    .Out2              .       
*======.========.==================.=======
|070112|20070131|                          
|070212|20070228|                          
|070312|20070331|                          
|070412|20070430|                          
|070512|20070531|                          
|070612|20070630|                          
|070712|20070731|                          
|070812|20070831|                          
|070912|20070930|                          
|071012|20071031|                          
|071112|20071130|                          
                ..... END REPORT .....
```

> **Note:** If the column containing the `Mn` option is smaller than the size required for the date format requested, the column is filled with asterisks.
