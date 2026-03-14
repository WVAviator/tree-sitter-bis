# @CALL — Call Subroutine

## Overview

Use the Call Subroutine (`@CALL`) statement to save the contents of all currently defined variables and pass control to an internal or external subroutine.

You can pass specific variables and manipulate them within the subroutine and pass them back to the calling run without affecting any of the other currently defined variables. You can also specify that the passed variables should not be changed by the system on returning to the calling run. You can pass up to 80 variables to the subroutine.

In addition to passing variables, a run also passes the current `-0` to the subroutine. Note that `-0` can be either a result or a permanent report (by definition, `-0` is the most recently referenced report). The subroutine returns its current `-0` (either result or permanent report) to the calling run.

To retain the contents of `-0` in the calling run, perform any of the following commands:

- [`@RSL`](RSL.md), if `-0` is a permanent report.
- [`@RNM`](RNM.md) followed by [`@RSL`](RSL.md), if `-0` is a result prior to the `@CALL` statement.
- You can also use `@RNM` and `@RSL` alternatively based on the application requirement.

---

## Syntax

### Business Information Server Subroutine CALL Statement Format

Calls a Business Information Server subroutine.

```
@CALL[,c,d,r] lab ([p,...,p]) .    Unregistered subroutine call
@CALL,"name" lab ([p,...,p])  .    Registered subroutine call
```

| Field | Description |
|-------|-------------|
| `c,d,r` | Report containing the external subroutine. |
| `"name"` | Name of the registered subroutine. The subroutine name must be enclosed in double quotes. |
| `lab` | Label where the subroutine begins. |
| `p,...,p` | Parameters to pass to the subroutine. See [parameter details below](#bis-subroutine-parameters) and [Passing Variables and Renames](#passing-variables-and-renames-using-call-subroutine). Maximum number of parameters = 80. Parentheses are required even if you do not pass any parameters. |

#### BIS Subroutine Parameters

*(Windows Server / Linux / UNIX / Windows Client)*

Enter one of the following kinds of parameters:

- `v` — variable; system returns the new value from the subroutine.
- `*v` — variable; system retains the original value from the calling run.
- `'string'` — literal character string, up to the maximum size of a string variable (`MAXRW$` reserved word). Enclose each string in apostrophes (`'`). To pass an apostrophe, use two apostrophes (`''`).
- `RNM(num)` — sends and receives a rename report where `num` is a rename number from `-1` to `-MAXRNM$`. The report identifier is sent to the subroutine. The current report identifier from the subroutine is placed back into the rename item of the caller.
- `RNMSND(num)` — only sends a rename report where `num` is a rename number from `-1` to `-MAXRNM$` or `0` to specify a void report. The rename item of the caller is not modified when the subroutine returns.
- `RNMRCV(num)` — only receives a rename report where `num` is a rename number from `-1` to `-MAXRNM$`. The caller sends a void report identifier to the subroutine. The current report identifier from the subroutine is placed back into the rename item of the caller.

At the label where the subroutine begins, enter variables to receive the variable and literal data and enter `RNM(num)` to receive the renames. These parameters must be enclosed in parentheses.

Characteristics of literal character strings:

- The system initializes these variables as String (S-type) variables of the same size as the strings.
- If the literal character string size is less than 18 characters, then it is an H type variable.
- If you pass a String (S-type) variable in a CALL statement, you cannot modify its defined size.
- You cannot redefine any passed variable as a String (S-type) variable. However, you can redefine the passed H-type variable as a String (S-type) up to size of 18.
- A void rename is a rename report that does not point to any report. Void renames can be passed to subroutines and returned from subroutines.

*(2200)*

Enter one of the following kinds of parameters:

- `variable` — passed-by-reference; subroutine returns the new value to the caller's variable.
- `*variable` — passed-by-value; caller's variable is not modified.
- `'string'` — literal character string up to the maximum size of a string variable (`MAXRW$` reserved word). Enclose each string in apostrophes (`'`). To pass an apostrophe, use two apostrophes (`''`).
- `RNM(num)`, `RNMSND(num)`, `RNMRCV(num)` — same as above.

Variables returned to the caller will receive the same variable definition and data of the subroutine variable. One exception is when you pass an array member: the caller's array member always remains the same type and the size can be adjusted downward but never upward.

---

### JavaScript Subroutine CALL Statement Format

*(Windows Server / Linux / Windows Client / 2200)*

Calls a JavaScript subroutine.

```
@CALL,c,d,r [function] ([p,...,p])  .    Unregistered subroutine call
@CALL,"name" [function] ([p,...,p]) .    Registered subroutine call
```

| Field | Description |
|-------|-------------|
| `c,d,r` | Report containing the external subroutine. |
| `"name"` | Name of the registered subroutine. The subroutine name must be enclosed in double quotes. |
| `function` | Name of the entry point function to be executed. The function name can be up to 50 characters long. This field is case sensitive and optional. If no function is specified for an unregistered subroutine, no entry point function is called. If no function is specified for a registered subroutine, a function with the same name (all uppercase) as the registered subroutine name will be executed, if it exists. Otherwise, no entry point function is called. **Note:** If parameters are specified, an entry point function is required. |
| `p,...,p` | Parameters to pass to the subroutine. See [parameter details below](#javascript-subroutine-parameters). Maximum number of parameters = 80. Parentheses are required even if you do not pass any parameters. |

#### JavaScript Subroutine Parameters

*(Windows Server / Linux / Windows Client)*

Enter one of the following kinds of parameters:

- `v` — variable; system returns the new value from the subroutine.
- `*v` — variable; system retains the original value for the calling run.
- `'string'` — literal character string, up to the maximum size of a string variable. Enclose each string in apostrophes (`'`). To pass an apostrophe, use two apostrophes (`''`).

At the entry point in the subroutine, enter the arguments to receive the parameters being passed, for example, `(arg1, arg2, &arg3)`. The ampersand indicates that this value is returned.

Additional characteristics:

- All variable parameters are handled as strings.
- If you pass any variable in a CALL statement, you cannot modify its defined size.
- You cannot redefine any passed variable as a String (S-type) variable. However, you can redefine the passed H-type variable as a String (S-type) up to size of 18.
- If a string variable is passed by reference, the value returned by the subroutine can only be modified up to the originally-defined size.
- If a non-string variable is passed by reference, the value will be redefined up to the maximum size for that variable type.

*(2200)*

Enter one of the following kinds of parameters:

- `variable` — passed-by-reference; subroutine returns the new value to the caller's variable.
- `*variable` — passed-by-value; caller's variable is not modified.
- `'string'` — literal character string up to the maximum size of a string variable. Enclose each string in apostrophes (`'`). To pass an apostrophe, use two apostrophes (`''`).

At the entry point in the subroutine, enter the arguments to receive the parameters being passed, for example, `(arg1, arg2, &arg3)`. The ampersand indicates that this value is returned.

Additional characteristics:

- All variable parameters are handled as strings. JavaScript subroutines consider spaces as significant characters, so you may want to pack your parameter variables before passing them.
- If the return variable size is smaller than the original variable size, the return data is placed in the original variable and padded with spaces.
- If the return variable size is larger than the original variable size, the original variable is expanded to the necessary size. If this size exceeds the maximum size for the variable type, then it is converted to a String (S-type) variable and the return data is placed in this new variable.
- Array members do not change type or size.
- If the return variable size exceeds `MAXCHR$`, the original variable is converted to a String (S-type) variable of length `MAXCHR$` and the return data is placed in this new variable.

---

## Guidelines

### General Guidelines

- Use the Return Call Routine ([`@RETURN`](RETURN.md)) statement to exit the subroutine and return to the line following the `@CALL` statement.
- You can pass only one `-0` result to the subroutine. If you need to use more than one result from the calling run, use the Yank Line ([`@LNY`](LNY.md)) and Put Line ([`@LNP`](LNP.md)) statements to pass a result as a buffer, or use `RNM(-n)`, `RNMSND(-n)`, or `RNMRCV(-n)`.
- Do not place other statements on the same line after a `@CALL` statement. Other statements following it on the same line are ignored. Put the next statement on a new line.
- Error routines registered in called routines override previously registered error routines; however, when control returns to the calling run, the system automatically reregisters the original error routine.
- Use the `CALL$` reserved word to obtain the number of CALL levels remaining.
- You can nest up to 40 CALL subroutine levels (internal or external).
- A registered subroutine has the same characteristics as an unregistered subroutine, except that it has its own set of security settings. The security of the registered subroutine replaces the security of the calling application. The caller's security settings are restored when you return from the registered subroutine. This capability allows subroutines to expose controlled interfaces to sensitive data without requiring the caller to have direct access rights.
- *(Windows Server / Linux / UNIX / Windows Client)* Include error routines in each called routine; otherwise, in case of an error, control goes to the error routine in the calling run.
- *(2200 only)* If the run fails, the system cancels all active subroutines unless overridden by the C-option on the `@RER` statement.

### Call Registered BIS Subroutine Guidelines

*(Windows Server / Linux / Windows Client / 2200)*

- The registered subroutine will continue using the I/O and the logic lines processed (LLP) limits of the calling script.
- *(2200 only)* A foreground script can only call registered foreground subroutines. A background script can only call registered background subroutines. Contact your administrator for naming and registering scripts and subroutines.
- *(2200 only)* The Business Information Server RER error handling routine (2F0) has been enhanced to handle large error messages that are returned from JavaScript subroutines.
- Nested CALL Registered Subroutine is allowed.

### Call JavaScript Subroutine Guidelines

*(Windows Server / Linux / Windows Client / 2200)*

- A JavaScript subroutine uses the `ReturnDataset` global function to stage the desired dataset for the return to the calling run. The returned dataset can be referenced as `-0` upon return. If `ReturnDataset` is not called, or the subroutine terminates with an uncaught exception, no `-0` will exist.
- You can issue only one CALL Registered Subroutine (no nesting).
- I/O limits are counted, but not checked when executing a CALL to a JavaScript subroutine.
- LLP limits are not counted when executing a CALL to a JavaScript subroutine.
- If an error occurs in a JavaScript subroutine, see [JavaScript Error Handling](#javascript-error-handling) below.

---

## Passing Variables and Renames Using Call Subroutine

After the label where the subroutine starts, place parentheses around the variables and renames that correspond to the variables and renames you are passing with the `@CALL` statement. Use the following format:

```
@lab:(variable,rnm(-n),variable,...)
```

Variables and renames that you pass with the `@CALL` statement have a one-to-one relationship with the variables and renames specified at the label. The software equates these by their position in the statement, not by their name. That is, the first variable or rename in parentheses is equated with the first variable or rename of the `@CALL` statement, and so on.

- Receiving variables in the called routine cannot be single members of an array.
- Any changes you make to variables you passed to the subroutine still exist when control returns. Variables you did not pass to the subroutine remain unchanged when control returns to the calling run.
- If the subroutine modifies or clears the value of a receiving variable in the parentheses, the system passes the new value to the equivalent variable in the `@CALL` statement when control returns to the main routine, unless you precede the variable with an asterisk (`*`) in the `@CALL` statement.
- Renames are received in the subroutine by a corresponding `rnm(-n)` parameter. The rename pointer will be returned to the `@CALL` statement unless passed through the `rnmsnd(-n)` parameter.
- *(2200 only)* Using a [`@CLV`](CLV.md) statement in the subroutine clears the definition and content of the variable in both the subroutine and the calling run.
- *(2200 only)* If no variables are passed to the subroutine and no parentheses are included at the label, no error is returned.
- *(Windows Server / Linux / UNIX / Windows Client)* Using a [`@CLV`](CLV.md) statement in the subroutine clears the content of the variable for the remainder of the subroutine, but passes the latest manipulated value of the variable to the calling run.
- Each subroutine can use the configured limit of variable resources; however, when control returns to the calling run, the system returns only the variables specified on the `@CALL` statement. The system releases all variables initialized within the subroutine.
- To pass all the variables in an array to a called subroutine, specify only the name of the array in the Load Variable Array ([`@LDA`](LDA.md)) statement. An entire variable array counts as one variable of the total number allowed; to pass a specific member of the array, give its name and number.
- When executing a `@CALL` statement within a Network Run ([`@NRN`](NRN.md)) statement, you can pass only literal data. The `@CALL` statement does not pass variables.

### Passing Variables to a Registered BIS Subroutine

*(Windows Server / Windows Client / 2200)*

When formulating the `@CALL` statement within an `@NRN` statement, load an `H1` variable with the double quotes and use that variable in the statement.

### Passing Variables to a JavaScript Subroutine

*(Windows Server / Windows Client / 2200)*

- The variables are dynamically processed and can be used or referenced at any time during the execution. If an input argument should be returned to the calling BIS run, the argument must be preceded by an ampersand (`&`), which indicates that this argument value should be returned.
- If the JavaScript script modifies the value of a receiving argument in the parentheses, the system passes the new value to the equivalent variable in the `@CALL` statement when control returns to the main routine, unless you precede the variable with an asterisk (`*`) in the `@CALL` statement or do not use an ampersand for the JavaScript argument.
- Only individual members of an array can be passed. If the member number is not specified, the first member of the array is assumed.
- *(2200 only)* If the return variable length exceeds the current size of the array member, the return data will be truncated. If it is smaller, the size of the member will be adjusted downward accordingly.

---

## JavaScript Error Handling

*(Windows Server / Linux / Windows Client / 2200)*

### JavaScript Syntax Errors

If a JavaScript subroutine contains a syntax error (for example, a missing semi-colon), the BIS script will err on the `@CALL` statement. A BIS `@RER` routine must be registered in the calling script to handle the error.

> **Note:** If `try`/`catch`/`finally` blocks are used, they will not change the outcome because the syntax error prevents the JavaScript script from being executed.

```
@.
@.  <<< Calling a JavaScript function requires a     >>>
@.  <<< registered RER routine to handle syntax      >>>
@.  <<< errors detected in a JavaScript subroutine.  >>>
@.
@IF SYSNAM$(1-1) eq 'M'  RER,0,F,2 0001 ; .     2200 RER
@IF SYSNAM$(1-1) ne 'M'  RER,0,E,2 0001 ; . non-2200 RER
@.
@CALL,"JVS_Script"  JVS_Function() .
@.
```

### JavaScript Errors (Not Handled in a JavaScript Subroutine)

If a JavaScript subroutine does not contain exception handling (`throw`, `try`, `catch`, and `finally` statements) to properly handle error recovery, the BIS script will err on the `@CALL` statement when exceptions occur. A BIS `@RER` routine must be registered in the calling script to handle the error.

```
@.
@.  <<< Calling a JavaScript function that does not  >>>
@.  <<< contain exception handling statements to     >>>
@.  <<< handle error conditions will require a       >>>
@.  <<< registered BIS RER routine to handle errors. >>>
@.
@IF SYSNAM$(1-1) eq 'M'  RER,0,F,2 0001 ; .     2200 RER
@IF SYSNAM$(1-1) ne 'M'  RER,0,E,2 0001 ; . non-2200 RER
@.
@CALL,"JVS_Script"  JVS_Function() .
@.
```

### JavaScript Errors (Handled in a JavaScript Subroutine)

If a JavaScript subroutine contains exception handling (`throw`, `try`, `catch`, and `finally` statements) to properly handle error recovery, then the BIS script will not be notified when exceptions occur. If the BIS script needs to know that an exception occurred, the JavaScript subroutine must pass the error message back to the calling BIS script in one of the calling statement parameters. The returned error message can then be displayed using a registered library routine.

```
@.
@.  <<< Calling a JavaScript function that contains  >>>
@.  <<< exception handling statements to handle      >>>
@.  <<< error conditions may require an additional   >>>
@.  <<< parameter to pass the error message back to  >>>
@.  <<< the calling script.                          >>>
@.
@CALL,"JVS_Script"  JVS_Function(<jvsmsg>sMAXCHR$) .
@.
@.  <<< The returned error message can be displayed  >>>
@.  <<< by calling a registered BIS Library Routine. >>>
@.
@CALL,"LIB$JVSMSG" 0001* (<jvsmsg>,'1',<sta>i3) .
@IF <sta> ne 0,(ErrLab) ; .
@.
```

---

## Examples

### Passing Variables

This example transfers control to label 054 and passes only `v102` and `v103` to the subroutine. The subroutine uses the values of `v102` and `v103` for `<drw>` and `<line>`, respectively.

```
@ldv v101i4=1234,v102h1=b,v103i4=5 .
@call 054 (v102,v103) .
 .
 . (other processing)
 .
@054:(<drw>,<line>) .
@fnd,0,<drw>,,<line> a 'cust' |,amco <rpt>i4,<line> .
@return .
```

When control returns, the variables are affected as follows:

- `V101` still contains `1234` because it was not passed to the subroutine.
- `V102` (`<drw>` in the subroutine) still contains the letter `b` because the subroutine did not change it.
- `V103` (`<line>` in the subroutine) contains a new value because the Find (`@FND`) statement in the subroutine changed it.
- `<rpt>` is not defined any longer because it was used only in the subroutine.

---

### Passing and Referring to Variables

This example transfers control to label 99 and passes `v102`, `v103`, and `v104`. The subroutine uses the values of `v102`, `v103`, and `v104` for `<scan>`, `<item>`, and `<qty>`, respectively.

```
@call 099 (v102,v103,v104) .
 .
 . (other processing)
 .
@099:(<scan>,<item>,<qty>)
 .
 . (other processing using <scan>, <item>, and <qty>) .
 .
@srh,0,b dha 'product type' |,<item> <qty>,<scan> .
 .
 . (other processing)
 .
@return .
```

The system returns `v102`, `v103`, `v104`, and the `-0` result created in the subroutine. All other variables remain unchanged, since you did not pass them to the subroutine.

---

### Passing Renames

This example transfers control to label 99 and passes variable `<status>` and rename reports `-2` and `-3`. It also passes the rename placeholder `-4` to receive a report back from the subroutine. The subroutine uses `<sts>`, `-12`, `-13`, and `-14` for `<status>`, `-2`, `-3`, and `-4`, respectively.

```
@srh,0,b,2 d 'CustCode' TAB$,'AMCO'  rnm -2 .
@srh,0,b,3 d 'CustCode' TAB$,'FEDS'  rnm -3 .
@call 099 (<status>i6,rnmsnd(-2),rnm(-3),rnmrcv(-4)) .
.
. (other processing)
.
@099:(<sts>, rnm(-12),rnm(-13),rnm(-14))
.
. (other processing using -12, -13) .
.
@add,-12,-13 rnm -12 .
@sor,-12 '' 'StCd','ProductType' TAB$,1,2  rnm -14 .
@tot,-13 '' 'SpcCod' TAB$,'=NEW'  rnm -13 .
.
. (other processing)
.
@ldv <sts>=0  return .
```

When the `@RETURN` is performed, the subroutine passes back the value of `<sts>` to `<status>`, `-13` to `-3`, and `-14` to `-4`. Report `-2` will remain unchanged in the calling routine.

---

### Calling an External Subroutine

This example transfers control to an external subroutine in report 15E0 beginning at label 123:

```
@call,0,e,15 123 () .
```

Since the statement does not pass variables, all variables in the calling run are unchanged when control returns to the calling run.

---

### Retaining Current Values on Nonreturnable Parameters

This example transfers control to label 100 and passes `v101` and `v102`. The asterisk (`*`) before `v102` specifies that its current value be retained on returning to the calling run, even if it is changed in the subroutine. The subroutine changes both variables.

```
@call 100 (v101,*v102)
 .
 . (other processing)
 .
@100:(<data1>,<data2>) .
@ldv <data1>=5000,<data2>=2500 .
@return .
```

The system returns `5000` in `v101`, but does not return the new value for `v102` because it was preceded with an asterisk when passed with the `@CALL` statement.

---

### Nonreturnable Parameters

This example transfers control to label 100 and passes `v101` and strings `hokey` and `pokey`. The subroutine automatically initializes `<data2>` and `<data3>` as S type variables of the same size as the strings.

```
@call 100 (v101,'hokey','pokey')
 .
 . (other processing)
 .
@100:(<data1>,<data2>,<data3>) .
```

The system returns the current value of `v101`, but does not return any variable comparable to `<data2>` or `<data3>`.

---

### Calling a Registered BIS Subroutine

This example calls a registered Business Information Server script named `"BIS_Script"` and passes it two parameters.

```
.BIS Script
*=======================================
@CALL,"BIS_Script" 0001 (*<p1>,*<p2>) .
.
. (continue)
.


.External Registered BIS Script
*=======================================
@0001 (<d1>,<d2>) .
.                                       
. (subroutine processing)               
.                                       
@RETURN .
```

---

### Calling a Registered JavaScript Subroutine

*(Windows Server / Linux / Windows Client / 2200)*

This example calls a registered JavaScript subroutine named `"JVS_Script"` that contains a function called `JVS_Function`.

```
.Registered Business Information Server Script
*============================================================
@CALL,"JVS_Script" JVS_Function(<msg>s80) .
@MBX,ok,i,'Message Returned from JavaScript' <msg> o,(lin1) .
                   
.Registered JavaScript Script
*============================================================
function JVS_Function(&msg)        
{                                  
msg = "Hello World!"            
}                                  
```

---

### Calling a Registered JavaScript Subroutine with a -0 Result

*(Windows Server / Linux / Windows Client / 2200)*

This example calls a registered JavaScript subroutine, passing a `-0` result and an argument. The `&` character preceding `arg2` indicates it is passed back. The keyword `InputDataset` is used to open the passed `-0` result. `ReturnDataset` is used to pass a `-0` result back to the calling run.

```
.@Call example
*=============================================================================
@    RSL,0,b,2 .    Create a result of 2B0.
@ .  Load a variable to pass as an argument to the JavaScript.
@    LDV <Argument2>i5=12345 .
@ .  The function name is different from the registered JavaScript subroutine.
@    CALL,"CJSTEST1" JSTEST('test',<Argument2>) .
@    DSP,-0,,,,,,'F1 to continue example' .
'<Argument2>' After returning from the JavaScript.
The value of '<Argument2>' should be '54321'- <Argument2>
@    GTO END .
```

```
.JavaScript example
*=============================================================================

function JSTEST(arg1, &arg2)
{
  try {
    var ds = new Dataset();
    ds.open(InputDataset, dsReadOnly);
    arg2 = "54321";
    ReturnDataset(ds);
  } catch (e) {
    throw(e);
  }
  return;
} //end of main function
```

---

### JavaScript Error Handling Examples

*(Windows Server / Linux / Windows Client / 2200)*

The following are JavaScript scripts used in error handling test scenarios.

**Error 1 — Syntax Error:**

```
function ERROR1(&errortext)
{
    var oDs = new Dataset();
    var oDb = new Database();
    var numRecords, numColumns;

    oDb.logon("northwind", "sa", "123456");  // "sa" user-id is valid

    oDs = oDb.select("SELECT EmployeeID, LastName, FirstName, Country FROM
Employees;","F0",numRecords,numColumns);

    ReturnDataset(oDs);
}
```

**Errors 2, 3, 4, and 5 — Invalid Database Name (various exception handling strategies):**

```
function ERROR2(&errortext)
{
  try {
    var oDs = new Dataset();
    var oDb = new Database();
    var numRecords, numColumns;
    oDb.logon("bbbthwind", "sa", "123456");  // invalid database name - error
  } catch (e) {
    errortext = e.message;
    if (oDb.errorText.length > 0) {
      errortext += formatErrorMessage(oDb.errorText);
    }
    throw(e);                       // the throw is ignored due to the return
  } finally {
    oDb.logoff();
    return;
  }
}

function ERROR3(&errortext)
{
  try {
    var oDs = new Dataset();
    var oDb = new Database();
    var numRecords, numColumns;
    oDb.logon("bbbthwind", "sa", "123456");  // invalid database name - error
  } catch (e) {
    errortext = e.message;
    if (oDb.errorText.length > 0) {
      errortext += formatErrorMessage(oDb.errorText);
    }
    throw(e);
  } finally {
    oDb.logoff();
  }
}

function ERROR4(&errortext)
{
  try {
    var oDb = new Database();
    oDb.logon("bbbthwind", "sa", "123456");  // invalid database name - error
  } catch (e) {
    errortext = e.message;
    if (oDb.errorText.length > 0) {
      errortext += formatErrorMessage(oDb.errorText);
    }
  } finally {
    return;
  }
}

function ERROR5(&errortext)
{
  try {
    var oDb = new Database();
    oDb.logon("bbbthwind", "sa", "123456");  // invalid database name - error
  } catch (e) {
    errortext = e.message;
    if (oDb.errorText.length > 0) {
      errortext += formatErrorMessage(oDb.errorText);
    }
  } finally {
    oDb.logoff();
  }
}

// The following function will format a relational database error
function formatErrorMessage(msg) {
  var s = new String();  //formatted version of "msg" to be returned to caller
  var pat = /[\t\n\r\f]/g;  //list on non-displayable characters to be removed
  var arr = msg.split("\n");  //split message into elements based on each line
  for (var i=0; i<arr.length; i++ ) {  //for each line of message
     //remove all non-displayable, and reconstruct as string
    s += arr[i].replace(pat, "") + " \n";
  }
  do {
    var arr = s.split("  ");  //attempt to remove extraneous whitespace
    s = "Relational Database Error \n";
    for (var i=0; i<arr.length; i++ ) {  //for each line of message
      s += arr[i];  //reconstruct as string
    }
  }
  while(arr.length > 1);
  return(s);
}
```
