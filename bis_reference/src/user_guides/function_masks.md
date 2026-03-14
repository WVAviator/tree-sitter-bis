# Function Masks

## Overview

A function mask looks like a report with blank fields. You use it to specify options, field widths, and parameters whenever you request a function that processes individual fields or character positions in a report.

- **Field headings** displayed in the mask are those that were on display when you requested the function. If you process an entire drawer, the system displays headings from report zero.
- **Options** are single letters or symbols that change how a function works. Type them in the line just above the report headings, from left to right beginning in column one.
- **Field widths** are shown as a line of asterisks below the heading divider line, making it easier to identify fields when entering parameters.
- **Parameters** indicate which operations to perform, in what order, and which types of lines to process. They are typed below the asterisk line.

### Anatomy of a Function Mask

```
SEARCH                          <-- function name
                                <-- type options here
.Production Status Report
*St.Status.By. Product .Serial.Produc.
*Cd. Date .In. Type   .Number. Cost .
*==.======.==.=========.======.======.   <-- heading divider
** ****** ** ********* ****** ******      <-- asterisk line (field widths)
                                         <-- type parameters here
```

> **Help:** Whenever a function mask is on display, press **Help** for a summary of available options and parameters. Press **Help** again for more details on the function.

---

## Specifying Options

Options provide more detailed instructions about how to process your request. Since options vary by function, see the individual function in the Command Reference for available options.

Type one or more options on the blank line just above the heading line. When using multiple options, type them next to each other with no spaces or commas between them.

**Example** — options `D` and `H` entered together:

```
SEARCH
dh
.Production Status Report         Corporate Production B000002
*St.Status.By. Product .Serial.Produc.Order.Cust.Produc.Produc.
*Cd. Date .In. Type   .Number. Cost .Numbr.Code. Plan .Actual.
*==.======.==.=========.======.======.=====.====.======.======.
** ****** ** ********* ****** ****** ***** **** ****** ******
```

---

## Specifying Parameters

Parameters indicate which fields to process and how. Since parameters vary by function, see the individual function in the Command Reference for available parameters.

1. Tab to the field below the asterisk line where you want to enter a parameter.
2. Type the parameter.
3. Repeat for any additional parameters.
4. Move the cursor to the next blank line and press **Transmit**.

For locate functions, a parameter is the character string to find. For math functions, a parameter is an arithmetic operator (`+`, `-`, etc.).

**Example** — parameter `ip` entered in the St Cd field, which searches for occurrences of `IP` in that field:

```
SEARCH
.Production Status Report         Corporate Production B000002
*St.Status.By. Product .Serial.Produc.Order.Cust.Produc.Produc.
*Cd. Date .In. Type   .Number. Cost .Numbr.Code. Plan .Actual.
*==.======.==.=========.======.======.=====.====.======.======.
** ****** ** ********* ****** ****** ***** **** ****** ******
ip
```

---

## Processing Partial Fields

Sometimes you need to process only part of a field (e.g., only the 3rd and 4th columns of a 6-column field). There are two approaches:

### For Any Function Mask

1. Type spaces over, or erase, the asterisks in the columns **not** to be processed. You only need to erase the asterisks immediately before and after the columns to be processed.
2. Type parameters below the remaining asterisks.

**Example** — the 2nd and 5th asterisks of the Status Date field are erased, so only the 3rd and 4th characters are processed:

```
** * ** * ** ********* ****** ****** ***** **** ****** ******
   12
```

### For Search Functions

1. Type a `/` (slant) in the parameter line preceding the column where processing should start. Optionally, type a `/` after the last column to be processed.
2. Type the string to locate in the remaining portion of the field.

**Example** — column 1 of St Cd is processed, and columns 3–4 of Status Date are processed:

```
** ****** ** ********* ****** ****** ***** **** ****** ******
s/ /12/
```

---

## Selecting the Type of Lines to Process

Indicate the type of lines to process in the **first column** of the line under the asterisk line.

**Example** — a tab character (`|`) in column 1 causes the function to process tab lines only:

```
** ****** ** ********* ****** ****** ***** **** ****** ******
|
```

To change the line type, type the character representing the desired line type in column 1. For example, type `*` to process asterisk lines instead of tab lines. Some functions also have options that change the line type. See the individual functions in the Command Reference for more information.

---

## Using Double Function Masks

Functions that process two reports simultaneously display two function masks on screen. The **top mask** is from the second report (the *issuing report*), and the **lower mask** is from the current report (the *receiving report*).

```
MATCH
.Factors Base Report              Corporate Factors Base C000004
* Product . Sub .Produc. Whole . Retail . Sales .Space. Demo .
* Type   . Key . Cost  . Sale$ . $$$$ .Commiss. Req .Quantity.
*=========.=====.======.=======.========.=======.=====.========.
********* ***** ****** ******* ******** ******* ***** ********

.Production Status Report         Corporate Production B000002
*St.Status.By. Product .Serial.Produc.Order.Cust.Produc.Produc.
*Cd. Date .In. Type   .Number. Cost .Numbr.Code. Plan .Actual.
*==.======.==.=========.======.======.=====.====.======.======.
** ****** ** ********* ****** ****** ***** **** ****** ******
```

Enter function options above the top mask and parameters below each mask. See the individual functions in the Command Reference for details.

---

## Controlling Which Fields Are Displayed

By default, function masks display the field headings of the report being processed, from left to right. You can change the field selection in the following ways:

- Before requesting the function, display the report in a different format or change the user view. Use the **View** function mask or the Display Alternate Format (`Fn`) command to switch formats.
- When requesting the function, specify another format on the control line or in the input screen.

See the Command Reference for more information.

---

## Examples

### Search for Multiple Character Strings

Find lines containing `SH` in St Cd **and** `12` in Status Date (note the erased asterisks to target partial fields):

```
SEARCH
dh
*==.======.==.=========.======.======.=====.====.======.======.
** * ** * ** ********* ****** ****** ***** **** ****** ******
sh 12
```

Find lines containing `SH` **or** `IP` in St Cd (each string on its own parameter line):

```
SEARCH
dh
*==.======.==.=========.======.======.=====.====.======.======.
** ****** ** ********* ****** ****** ***** **** ****** ******
sh
ip
```

### Search for a Range of Strings

1. Type the lower bound of the range in the first parameter line under the correct field.
2. Type `r` in column 1 of the next line, then type the upper bound in the same field.

**Example** — search for Status Dates between `890520` and `890803`:

```
SEARCH
dh
*==.======.==.=========.======.======.=====.====.======.======.
** ****** ** ********* ****** ****** ***** **** ****** ******
  890520
r 890803
```

### Use Arithmetic Operators

Use `+` to vertically sum the values in the Produc Cost field:

```
TOTALIZE
*==.======.==.=========.======.======.=====.====.======.======.
** ****** ** ********* ****** ****** ***** **** ****** ******
        +
```

### Join Fields

Type asterisks over the spaces between fields in the asterisk line to temporarily join them into one field — useful when a horizontal calculation result needs more space than a single field provides. Save the result as a copy rather than replacing the original report.

**Example** — an asterisk is added between Ship Order and Spc Cod to join them:

```
TOTALIZE
*==.======.======.=====.====.======.======.=====.===.
** ****** ****** ***** **** ****** ******  *********
         +      +                                  =
```
