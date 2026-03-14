# @LSM — Load System Message

## Overview

Loads a variable with the text of a system message. Useful in error routines where you need the actual message text — `XERR$` contains only the message number, not the text itself.

Message number ranges:

- `1` – `9999`: Traditional Business Information Server messages. These do not require additional processing; specify 80 characters for the variable size.
- `10000` – `10999`: JavaScript messages. These are very large and require additional processing to eliminate line feed characters; specify `MAXCHR$` characters for the variable size.

---

## Syntax

```
@LSM,msgno[,lab] vmsg .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `msgno` | Required | Message number to load. Use `XERR$` here when calling from an error subroutine to capture the current error message number. See [`@RER`](RER.md) (Register Error Routine) for more information. |
| `lab` | Optional | Label to branch to if the message number does not exist. |
| `vmsg` | Required | Variable to load with the message text. Use 80 characters for traditional BIS messages; use `MAXCHR$` characters for JavaScript messages. |

---

## Examples

### Capturing a System Message

Load `<error>` with the text of the current error message using the number stored in `XERR$`:

```
@lsm,xerr$ <error>sMAXCHR$ .
```

---

### Parsing a JavaScript Message

This example calls a JavaScript subroutine that produces an error. The [`@RER`](RER.md) is registered to branch to label `0199` on any error. A library routine call then removes line feed characters from the JavaScript error message before displaying it.

```
.Calling a JavaScript subroutine that produces an error.
*=======================================================
@.
@RER 0199 .
@CALL,"CJSTEST" JSTEST2() .
@.
@.
@0199 LSM,XERR$ <jvsmsg>sMAXCHR$ .
@CALL,LIBDRW$,11 0001 (<jvsmsg>,'1',<sta>i3) .
@.
```

The JavaScript subroutine `CJSTEST` used to produce the error condition (detecting an undeclared variable):

```javascript
function JSTEST2()
{
    var = arg1
    try {
    } catch (e) {
        // arg2 += "*** UNEXPECTED ERRORS ***\n" + e;
        throw(e);
    }
    return;
} //end of main function
```
