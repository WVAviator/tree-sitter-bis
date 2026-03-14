# @SUB — Subtotal

## Overview

Subtotals data in a report and formats it in the output area of your run. Because subtotal key variables and their corresponding subtotal variables are placed together in the output area, data can be reformatted at the same time it is computed.

Enter the variables processed by `@SUB` in the output area immediately following the statement.

---

## Syntax

```
@SUB,c,d,r[,lab] o cc ltyp,p vrslts .
```

### Parameters

| Field | Description |
|-------|-------------|
| `c,d,r` | Report to process. |
| `lab` | Label to go to if no lines exist to be subtotaled. |
| `o` | Options field. See [Options](#options). |
| `cc` | Column-character positions or names of the fields to process. |
| `ltyp` | Line type to process. If the `A` option is specified, this subfield may be left blank, but the comma must still be entered. |
| `p` | Subtotal parameters field. See [Parameters](#parameters). Define as you would in a [`@TOT`](TOT.md) (Totalize) statement. |
| `vrslts` | Variables to capture the results. Do not use substrings such as `<data>(1-3)`. Use the `E` option to load the first variable with the entry count for each subgroup. To initialize a variable to the size of a field, specify the variable number and type (e.g., `<data>h`). If using the `E` option, variables capturing subtotal values must be fully defined (e.g., `<data>h3`). |

---

## Options

| Option | Platform | Description |
|--------|----------|-------------|
| `A` | All | Processes all line types. |
| `C` | Windows / Linux / UNIX | Looks for case changes in subtotal key field values. A subtotal is displayed whenever the value in the key field changes. |
| `C` | OS 2200 | Same as above. Applies to full character set (FCS) reports only. |
| `E` | All | Counts the number of entries processed for each subtotal and loads that count into the first defined variable. For example, if a subtotal includes four values, the first variable is loaded with `4`. |
| `I` | All | Ignores headings: processes the report even if asterisk lines or a heading divider line do not exist. |
| `J(x)` | All | Justifies numeric result values in variables. `x` is one of: `c` (eliminate leading/nonsignificant zeros, insert commas every three digits, right-justify), `l` (eliminate leading/nonsignificant zeros, left-justify), `r` (eliminate leading/nonsignificant zeros, right-justify), `x` (eliminate leading zeros, left-justify, fill with nonsignificant zeros), `z` (eliminate nonsignificant zeros, right-justify, fill with leading zeros). |
| `*` | OS 2200 | Omits all flags otherwise inserted immediately after subtotal results (but not the grand total). Subtotals flagged with `*` indicate at least one blank or nonnumeric item was processed; a space flag indicates all items were valid numeric data. |

---

## Parameters

| Parameter | Description |
|-----------|-------------|
| `+` | Subtotal a field, flagging it to be multiplied, divided into, added to, or subtracted from in horizontal calculations. |
| `-` | Subtract (used in horizontal calculations). |
| `*` | Multiply (used in horizontal calculations). |
| `'/'` | Divide (used in horizontal calculations; include apostrophes). |
| `=` | Load field values into this variable (use with the `M` parameter). |
| `A` | Average. |
| `C` | Cumulate data. |
| `M` | Load the values of this field into the appropriate variable (use with the `=` parameter). |
| `S` | Subtotal on this subtotal key field (required in all instances). |
| `S1`–`S5` | Hierarchical subtotal. |

---

## Outcome

Variables contain the subtotal key field entries and subtotals. If the `E` option is used, the first variable contains the entry count.

Whenever at least one field item processed in a vertical operation contains nonnumeric data or no value (blank), an asterisk appears next to the resulting value, indicating that some data was invalid.

---

## Guidelines

- Always follow a `@SUB` statement with an output line, as it creates one line of output for each subtotaled item. Do not use variable substrings in the output line.
- Place the variable defined for the subtotal field in the output area.
- Variables can be predefined to a specific size, or initialized to match the size of a corresponding report field. The latter is especially useful with named fields (whose names do not directly convey field size) and allows `@SUB` to adapt automatically if the field size changes.

---

## Examples

### Counting Entries and Subtotaling

Counts the entries in each subtotal and loads variables with the subtotal key field entries and subtotal values.

```
@sub,0,b,5 e 'custcode','producplan' |,s,+ <entries>i6,\
<sub>h,<subtot>i6 .
<sub> <subtot> <entries>   ( <-- output line)
```

| Field | Description |
|-------|-------------|
| `0,b,5 e` | Process report 5B0; use the `E` option to count entries. |
| `'custcode' ... s` | Specify the Cust Code field as the subtotal key field. |
| `'producplan' ... +` | Specify the Produc Plan field as the field to subtotal. |
| `\|` | Process tab lines only. |
| `<entries>i6, <sub>h, <subtot>i6` | Load `<entries>` with the entry count, `<sub>` with the subtotal key field entry, and `<subtot>` with the subtotal value. |

---

### Horizontal Calculating and Subtotaling

Subtracts values in the Num2 field from those in the Num1 field, then adds the result values together when the value in the Key field changes.

**Sample database and resulting output:**

```
*Key.Num1.Num2.Result.        one  4
*===.====.====.======.        two  1
one   23   22
one    5    2
two    1    5
two    2    4
two   20   13
```

```
@sub,0,a,5 '' 'key','num1','num2','result' |,s,+,-,\
= <sub>h,,,<subtot>i .
<sub> <subtot>   ( <-- output line)
```

| Field | Description |
|-------|-------------|
| `0,a,5 ''` | Process report 5A0; use no options. |
| `'key' ... s` | Specify the Key field as the subtotal key field. |
| `'num1' ... +` | Specify the Num1 field as the field to subtract from. |
| `'num2' ... -` | Specify the Num2 field as the field to subtract. |
| `'result' \|` | Specify the Result field as the field to hold the results; process tab lines only. |
| `<sub>,,, <subtot>i` | Store subtotal key field values in `<sub>` and subtotals in `<subtot>`. |

---

### Combining Two Subtotal Key Fields

Displays a subtotal whenever values in either of two subtotal key fields change.

**Sample database and resulting output:**

```
*Key1.Key2.Num.Result.        one  one  22
*====.====.===.======.        one  two   2
one   one   22                two  two   9
one   two    2
two   two    5
two   two    4
```

```
@sub,0,b,5 '' 'key1','key2','num' |,s,s,+ <sub1>h,\
<sub2>h,<subtot>i .
<sub1> <sub2> <subtot>   ( <-- output line)
```

| Field | Description |
|-------|-------------|
| `0,b,5 ''` | Process report 5B0; use no options. |
| `'key1' ... s` | Specify the Key1 field as one subtotal key field. |
| `'key2' ... s` | Specify the Key2 field as another subtotal key field. |
| `'num' ... +` | Specify the Num field as the field to subtotal. |
| `\|` | Process tab lines only. |
| `<sub1>h, <sub2>h, <subtot>i` | Load `<sub1>` with the first subtotal key, `<sub2>` with the second subtotal key, and `<subtot>` with the subtotals. |

---

### Hierarchical Subtotaling

Assigns a hierarchy to the subtotal key fields. Subtotals are displayed whenever the lower-order key changes; subtotals of subtotals are displayed whenever the higher-order key changes.

**Sample database and resulting output:**

```
*Key1.Key2.Num.        a    24
*====.====.===.        one  24
one    a    22         a     5
one    a     2         b     9
two    a     5         two  14
two    b     5
two    b     4
```

```
@sub,0,b,5 '' 'key1','key2','num' |,s1,s2,+ <sub1>h,\
<sub2>h,<subtot>i .
<sub1> <sub2> <subtot>   ( <-- output line)
```

| Field | Description |
|-------|-------------|
| `0,b,5 ''` | Process report 5B0; use no options. |
| `'key1' ... s1` | Specify the Key1 field as the higher-order key field. |
| `'key2' ... s2` | Specify the Key2 field as the lower-order key field. |
| `'num' ... +` | Specify the Num field as the field to subtotal. |
| `\|` | Process tab lines only. |
| `<sub1>h, <sub2>h, <subtot>i` | Load `<sub1>` and `<sub2>` with the Key1 and Key2 subtotal keys, and `<subtot>` with the subtotals. |
