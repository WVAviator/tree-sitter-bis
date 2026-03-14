# BF and @BFN — Binary Find

## Overview

Use the Binary Find (BF) function or the `@BFN` statement to find character strings quickly in one or more large reports or a drawer or to count occurrences of character strings.

You can use the [IBFN](../runs/IBFN.md) run to save and reuse BF function masks containing options and parameters and to create BFN statements.

Each field or partial field being searched must be sorted in ascending order.

The Search (S), Find (F), and Binary Find (BF) manual functions no longer require the minus sign (`-`) to indicate the report or result currently on display. This method is consistent with the Business Information for ClearPath OS 2200. These functions still prompt the user for a report if one is not on display. A minus sign is still accepted on these functions.

> **Note:** If you do not specify a label and no finds are made, the run continues. If you specify a label and no finds are made, the run jumps to the specified label.

### What Binary Find Does

Binary Find samples the data at midpoint in the report or series of reports to determine whether the character string precedes or follows the midpoint. It then continues dividing and sampling until the first occurrence of the specified string is found.

---

## Syntax

### Binary Find Control Line Format

```
BF {report|drawer} [f]
```

| Field | Description |
|-------|-------------|
| `report` | Report to process. For more details, see Specifying Reports or Drawers to Process. |
| `drawer` | Drawer to process. Use this field to search all reports in a given drawer. For more details, see Specifying Reports or Drawers to Process. |
| `f` | Report format in which to search for data (lets you look for data in fields beyond column 80 if you do not already have those columns on display). |

### Binary Find Statement Format

```
@BFN,c,d[,r,l,lab] o cc ltyp,p [vrpt,vlno] .
```

| Field | Description |
|-------|-------------|
| `c,d,r` | Report or drawer to scan. For more details, see Specifying Reports or Drawers to Process. |
| `l` | Number of the data line on which to start the first sample, to speed up the search. Specify the number of a line that occurs slightly before the presumed location of the data. If the data occurs on a line preceding the specified number, the entire report is searched. Note: The `l` subfield works differently in the `@BFN` statement than in the Find ([`@FND`](FND.md)) statement. The `l` subfield in the `@FND` statement locates data after a specific line. |
| `lab` | Label to go to if no finds are made. If you do not specify a label and no finds are made, the run continues. |
| `o` | Options field. See [Binary Find Options](#binary-find-options). |
| `cc` | Column-character positions or names of the fields to scan. |
| `ltyp` | Line type to scan. If you specify the A option, leave this subfield blank but enter the comma. |
| `p` | Character string to find. See also [Binary Find Parameters](#binary-find-parameters). |
| `vrpt` | Variable to capture the number of the report where the find was made. |
| `vlno` | Variable to capture the number of the line where the find was made. If no finds are made, the first variable contains the report number where a find should have been made; the second variable gives the line number preceding the line where a find should have been made. With the O option, four variables are produced: 1st (number of finds), 2nd (number of lines in the result), 3rd (report number of the first find), 4th (line number of the first find). |

---

## Binary Find Options

| Option | Platform | Description |
|--------|----------|-------------|
| `A` | All | Processes all line types. |
| `B` | All | Builds an index containing the first data line of each report. Use this index with subsequent Binary Find operations to speed up processing. See [Using an Index with Binary Find](#using-an-index-with-binary-find) for details. |
| `C(S)` | Windows / Linux / UNIX | Distinguishes between uppercase and lowercase letters. |
| `C(x)` | 2200 | Alters the find process based on the character set order. Ordinarily the system processes the report based on the character set of the drawer. Options: `C(F)` - full character set (FCS); `C(L)` - limited character set (LCS); `C(S)` - strict comparison, distinguishes between uppercase and lowercase letters. |
| `E` | All | Finds the last occurrence of the character string instead of the first occurrence. Do not use this option with the O option. |
| `Fn,n,...` | All | Specifies the order of sorted fields when searching multiple fields. For n, type the corresponding sort parameter you used for the fields from left to right. See [Changing the Order of Fields Example](#changing-the-order-of-fields). |
| `I[n]` | All | Uses the index located in report n. Default = 2. The Binary Find command searches the index to determine where to find the character string, assuming that the reports to be searched follow report n. See [Using an Index with Binary Find](#using-an-index-with-binary-find) for details on building the index. |
| `K` | All | Verifies that reports are sorted in ascending order. The command displays the report at the point where it detects the sort order discrepancy and displays a message indicating whether the data is sorted. Use with the K parameter: type `k` in the field to verify. If you use more than one K parameter, the command assumes they are sorted from left to right. See the F option for more information. Note that if a report containing only blank and heading lines is included in the report range, the blank line will not verify as a valid sort order. Because this option verifies each line of every report specified, use it with discretion on large databases. |
| `N` | All | Creates a result containing the last occurrence of each different character string found in the specified field and the number of occurrences of each string. Enter a K in the corresponding parameter field to compare. Place an equal sign in the parameter field if you want to store the number of times the item appears in the database. To subtotal the field, enter `=N` in the parameter field. The `=N` subtotals only fields containing integer values. Note that you cannot use the `=` and `=N` parameters at the same time. See [Counting the Number of Strings Example](#counting-the-number-of-strings). |
| `O` | All | Creates a result containing each line on which the specified character string occurs, including trailer lines. Do not use this option with the N or E option. Also, when this option is used with the `@BFN` statement, you can load four variables with information instead of just two variables. See [Creating a Result Containing Finds Example](#creating-a-result-containing-finds). |
| `P` | All | Includes all types of lines following the last find made. Use only with the N option. |
| `Q` | All | Finds a string that occurs only once in the report for a faster search. When the Q option is used with the O option, no trailer lines are included. See [Finding the Only Occurrence Example](#finding-the-only-occurrence). |
| `Rx-y` | All | Searches reports in a range from report number x to report number y. All reports in the range must exist. See [Binary Find Guidelines](#binary-find-guidelines) for details. |
| `S` | All | Searches each report separately (data does not have to be sorted across all reports). |
| `U` | All | Sets an update lock on the report in which a find is made or would have been made. Use this option to find the correct report in a range of reports for entering new data. |
| `Y[(x)]` | All | Searches for dates in the fields defined by the date format parameter line. (See the Y parameter description.) Optionally specifies the line type of the parameter line. The line type cannot be an R and defaults to a Y. It should be changed only if your target data contains Y line types. |
| `Z` | All | Specifies that blank data lines are sorted with nonblank data lines. Without the Z option, blank data does not need to be sorted with the data. The Z option is assumed with the K and N options. Do not use this option with the `@` option. |
| `@` | All | Searches for blank lines or fields at the end of a report. Use this option to find a place to enter data. Use with the K parameter: type `k` in the fields where you are looking for spaces. Do not use this option with the R option. When a blank field is found, it is the first blank field after the last line with data in it. If lines with blank fields are interspersed with lines containing data, the blank fields are not found. |
| `/` | All | Searches for a slant (`/`) as data when used with the `/` parameter: type `/` in the columns where you are looking for a slant. |

---

## Binary Find Parameters

| Parameter | Description |
|-----------|-------------|
| `string` | The character string you want to find is the most common parameter to use with the Binary Find command. To find spaces in a field, be sure to use the `@` parameter with the Z option, or the results will be unpredictable. |
| `/` | Searches for a slant (`/`) character when used with the `/` option. Without the `/` option, a slant appearing in a parameter line shortens that field and a partial field is processed. For more details, see Specifying Reports or Drawers to Process. |
| `@` | Searches for a blank field. Use with the Z option. To find a blank field, type `@` in the first column of the field. Do not use this parameter with the `@`, K, N, or B options. |
| `=` | Specifies the field in which to place the total number of occurrences of each string when used with the B or N option. Do not use this parameter with the `=N` parameter or other `=` parameters. See [Counting the Number of Strings Example](#counting-the-number-of-strings). |
| `=N` | Specifies the field in which to place a subtotal (use with the N option). Do not use this parameter with the `=` parameter or other `=N` parameters. |
| `K` | Designates key fields (use with the B, K, N, or `@` option). |
| `R` | Specifies a search for a range of character strings (for example, `blackbox1` through `blackbox4`). You can perform a range search on only one field at a time. |
| `Y` or `x` | Identifies the line type of the date parameter line. Use Y or the value of x from the Y option. Place a date format in the field being searched. See [Finding Data within a Range of Dates Example](#finding-data-within-a-range-of-dates). |
| `0 - 21` | Specifies the numeric date format. You can also use the alphabetic date format rather than a number (for example, `YYMMDD` could be used in place of number 1). For a complete list of date formats, see Entering Dates and Times in the DC Statement. |

---

## Outcome

### Manual Function Outcome

Executing Binary Find as a manual function causes the following actions to occur:

- If the data is found, the command displays the report at the line where the data is located. (The outcome varies depending on the options you use.)
- If the data is not found, a system message is displayed.
- Since the command does not consider blank lines a sort order discrepancy, it ignores them unless you are using the Z option.
- The function assumes that the report is sorted. If it is not sorted, it will cause unpredictable results.

### Statement Outcome

Executing Binary Find causes the following actions to occur:

- If the specified data is found, the statement renames the report where the find was made to `-0`. Note that any previous `-0` result is released, and it loads `vrpt` and `vlno` with information as described under the field descriptions.
- If the specified data is not found, the statement loads `vrpt` with the number of the report where a find should have been made, and `vlno` with the line number that precedes the line where a find should have been made.

---

## @BFN Reserved Words

If you specify a label in the `@BFN` statement, `STAT1$` contains the following codes in case of an error:

| Code | Description |
|------|-------------|
| `1` | Data was not found. |
| `2` | No lines with blank fields were found (`@` option). |
| `3` | A sort order discrepancy is detected. |
| `4` | Drawer does not exist. |
| `5` | Report does not exist. |
| `6` | Index report does not exist (I option). |
| `7` | All reports must exist (R or I options). |
| `8` | Nonstandard report detected (B option). |
| `9` | Data appears more than once (K and Q options). |
| `10` | Report must have heading divider line. |
| `11` | Mask is incomplete or contains no search targets. |

`STAT2$` contains the system message number. Use the Load System Message ([`@LSM`](LSM.md)) statement to obtain the text of the message.

---

## Binary Find Guidelines

- You can use the O option to create a result containing the items found. See [Binary Find Options](#binary-find-options) for other possibilities.
- If you specify a range of reports, make sure there are no empty reports (containing no valid data or headings only) within the range. If Binary Find encounters an empty report, then finds the data that matches the search criteria in a subsequent report, it ignores any reports preceding the empty report. In this case, no system message is supplied because a valid find was made.
- Before executing Binary Find, be sure the data is sorted (across reports, if processing a range of reports) on the fields or partial fields to search. If data is not sorted, the results will be unpredictable.
- When searching an entire drawer, Binary Find begins with report 3. (To process reports 1 and 2, use the R option.)
- Sort the fields to be searched in all of the reports across the entire range of reports. For example, if the specified field in report 10 contains items starting with the letter A and continues through letter C, report 11 could continue with letters D through H, report 12 with letters I through M, and so on.
- R line types should not be used because they conflict with the Range (R) parameter.

---

## Procedures

### Searching for Multiple Strings in Different Fields

Enter the character strings under different headings on the same line. Before using Binary Find, sort each field in ascending order. Either sort the leftmost field first, the next field to the right second, and so on, or use the F option to specify the order of the sorted fields. See [Changing the Order of Fields Example](#changing-the-order-of-fields).

If one or more of the fields contains spaces, use the Z option and the `@` parameter. A common example of this situation is in multiple fields such as First Name, Middle Initial, and Last Name, where the Middle Initial field sometimes contains spaces.

When searching multiple fields, Binary Find concatenates the primary field with the secondary field to form a single primary field. Therefore, a multiple field range search may appear to find data that does not meet the specified search criteria of only the secondary field.

### Searching for a Range of Character Strings

1. Type the characters for the lower end of the range in the first line under the mask in the correct field.
2. Type `r` in the first character position in the next line.
3. In the same line as the R, type the characters for the higher end of the range in the same field as the lower end. Then transmit.

### Using an Index with Binary Find

When you have many reports to search, use an index to accelerate the find process on subsequent searches. The B option builds the index containing the first data line of each report searched. Use the K parameter to specify the target field or fields.

You must replace the index result into the report that immediately precedes the first report in the range. Report 2 (the default) is used as the index report unless you specify another report with the I option.

To use this index in subsequent requests, specify the I option.

---

## Examples

### Creating a Result Containing Finds

This example uses the O option to create a result containing all finds of the string `blackbox` in the first eight columns of the Product Type field.

**Function Mask:**
```
o
* Product . Sub .Produc. Whole .
*  Type   . Key . Cost . Sale$ .
*=========.=====.======.=======.
 ********* ***** ****** *******  
 blackbox/
```

**Equivalent Statement:**
```
@bfn,'report1c' o 2-8 |,blackbox ,<lines>i6 .
```

**Partial Result:**
```
* Product . Sub .Produc. Whole .
*  Type   . Key . Cost . Sale$ .
*=========.=====.======.=======.
 BLACKBOX1    A  13500   16875   
 BLACKBOX2    A  13600   17000   
 BLACKBOX3    A  13700   17125   
 BLACKBOX4    B  13800   17250   
 BLACKBOX5    B  13900   17375   
 BLACKBOX6    C  14000   17500   
 BLACKBOX7    C  14100   17625   
 BLACKBOX8    D  14200   17750   
 BLACKBOX9    D  14300   17875   
```

---

### Finding the Only Occurrence

This example uses the Q option to quickly find the only occurrence of `blackbox4` in the Product Type field.

**Function Mask:**
```
q
* Product . Sub .Produc. Whole .
*  Type .   Key . Cost . Sale$ .
*=========.=====.======.=======.
 ********* ***** ****** *******
 blackbox4
```

**Equivalent Statement:**
```
@bfn,'report1c' q 2-9 |,blackbox4 ,<line>I6 .
```

---

### Counting the Number of Strings

This example uses the N option to create a result containing the last occurrence of each different character string encountered in the Cust Code field. The K parameter specifies the key field and the `=` parameter specifies the field in which to place the number of occurrences of the string.

**Function Mask:**
```
n
*St.Order . Product .Ord.Cust.
*Cd.Number.  Type   .Qty.Code.
*==.======.=========.===.====.
 ** ****** ********* *** ****  
                       =   k   
```

**Equivalent Statement:**
```
@bfn,'report1d' n 22-3,26-4 |,'=','k' .
```

**Partial Result:**
```
*St.Order . Product .Ord.Cust.
*Cd.Number.  Type   .Qty.Code.
*==.======.=========.===.====.
 OR 99951S GREENBOX7   3 AMCO  
 OR 96652S GREENBOX5   3 ARCO  
 OR 99753S GREENBOX5   1 DICO  
 OR 94525S GREENBOX8   4 FEDS  
 OR 99725S BLACKBOX4   1 INTR  
 OR 96755S GREENBOX9   2 USSC  
```

---

### Changing the Order of Fields

This example first sorts the report in a specific order, with the primary sort (1 parameter) not being the leftmost field sorted. The Binary Find command processes this result and uses the F option to specify the order of the sorted fields from left to right. Without the F option, the Binary Find command will not successfully process the report unless the fields are sorted from left to right.

**Sort Mask:**
```
*St.Order . Product .Ord.Cust.
*Cd.Number.  Type   .Qty.Code.
*==.======.=========.===.====.
 ** ****** ********  *** ****  
    2      1             3     
```

**Equivalent Sort Statement:**
```
@sor,'report1d' '' 5-6,12-8,26-4 |,2,1,3 .
```

**Function Mask:**
```
f2,1,3
*St.Order . Product .Ord.Cust.
*Cd.Number.  Type   .Qty.Code.
*==.======.=========.===.====.
 ** ****** ********* *** ****  
    96652s blackbox/     arco  
```

**Equivalent Statement:**
```
@bfn,-0 f2,1,3 5-6,12-9,26-4 |,96652s,blackbox/,arco ,<line>i6 .
```

---

### Finding Data within a Range of Dates

This example finds data within a range of dates. The Y option indicates the presence of a date format parameter line, and the Y parameter identifies the date format parameter line. The number `1` in the Status Date field specifies the numeric date format to use.

**Function Mask:**
```
Y
*St.Status.By. Product .Serial.Produc.Order.Cust.Produc.Produc. Ship .
*Cd. Date .In.  Type .  Number. Cost .Numbr.Code. Plan .Actual. Date .
*==.======.==.=========.======.======.=====.====.======.======.======.
 ** ****** ** ********* ****** ****** ***** **** ****** ****** ******  
 sh 970101
Rsh 020101
Y   1      
```

**Equivalent Statement:**
```
@bfn,'drawerb' y 2-2,5-6 |,sh,970101/r,sh,020101/y,,1 .
```
