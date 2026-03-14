# @CCI — COM Client Invoke Method

## Overview

Invokes a method on an instantiated COM component object.

> **Platform:** Windows 2000 or later required.

### Related Statements

| Statement | Description |
|-----------|-------------|
| [@CCC](CCC.md) | COM Client Create Instance |
| [@CCG](CCG.md) | COM Client Get Property Value |
| [@CCP](CCP.md) | COM Client Put Property Value |
| [@CCR](CCR.md) | COM Client Release Instance |

---

## Syntax

```
@CCI[,lab] vch,method dt arg [rtn vmsg] .
```

### Parameters

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `lab` | Optional | Label | Branch destination if the operation fails. If omitted and the operation fails, the run errors. |
| `vch` | Required | `I` type variable | The instance handle of the component whose method is being invoked. |
| `method` | Required | String | Name of the component method to invoke. |
| `dt` | Required | Comma-separated list | Data types of the method arguments (max 20 items). See [Specifying Data Types](#specifying-data-types). |
| `arg` | Required | Comma-separated list | The method argument values. Count must exactly match `dt`. See [Specifying Argument and Return Values](#specifying-argument-and-return-values). |
| `rtn` | Optional | Variable or report | Receives the method return value. See [Specifying Argument and Return Values](#specifying-argument-and-return-values). |
| `vmsg` | Optional | `S` type variable | Captures the COM error message text if the operation fails. |

---

## Specifying Data Types

Each entry in the `dt` list specifies the **direction** and **data type** of its corresponding method argument.

### Syntax

```
[&][type]
```

| Syntax | IDL Direction | Description |
|--------|--------------|-------------|
| `type` | `[in]` | Passes a value to the component. |
| `&` | `[out]` | Returns a value from the component. Data type is supplied by the component. |
| `&type` | `[in,out]` | Passes a value to the component and returns a value from it. |

> **Note:** Do not specify a `type` for `[out]`-only arguments — the component supplies the data type when returning the value.

### Basic Data Types

| DT Field | Variant Type | Description | Range |
|----------|-------------|-------------|-------|
| `UI1` | `VT_UI1` | Unsigned integer, 1 byte | Variable size must not exceed 1. |
| `BOOL` | `VT_BOOL` | Boolean value | 0 to 1 |
| `I2` | `VT_I2` | Signed integer, 2 bytes | -32,768 to 32,767 |
| `I4` | `VT_I4` | Signed integer, 4 bytes | -2,147,483,648 to 2,147,483,647 |
| `R4` | `VT_R4` | Single-precision float, 4 bytes | ±1.175494E-38 to ±3.402823E+38 |
| `R8` | `VT_R8` | Double-precision float, 8 bytes | ±2.225E-308 to ±1.798E+308 |
| `CY` | `VT_CY` | Currency value | -922,337,203,685,477.5808 to 922,337,203,685,477.5807 |
| `BSTR` | `VT_BSTR` | Binary string | — |
| `DATE` | `VT_DATE` | Date/time value | 01/01/1600 00:00:00 to 12/31/2299 23:59:59. See [Date/Time Rules](#datetime-rules). |
| `DISP` | `VT_DISPATCH` | Object pointer / secondary instance handle (variable only) | — |
| `VAR` | `VT_VARIANT` | Variant (report only) — array must be specified | — |

> **Note:** `DISP` can only be used as a variable. It cannot be used within a `VAR` data type.

### Date/Time Rules

- Format must be `DATE16$ TIME$` → `MM/DD/YYYY HH:MM:SS`. Any other format may return unexpected results.
  - Example: `@LDV <DateTime>s20=01/01/2000 12:00:00`
- A time value is always returned. If only a date is needed, size the return variable to 10 characters.
- Date-only format must be `DATE16$` (`MM/DD/YYYY`). Leading zeros are required for month and day.

### Array Types

Append `[]` immediately after a basic data type to indicate an array of that type. The number of elements is determined by the data source.

| Example | Description |
|---------|-------------|
| `BSTR[]` | Array of binary strings |
| `I4[]` | Array of 4-byte signed integers |

When using `VAR`, an array **must** be specified, with element types declared inside the brackets (comma-separated, max 20 elements).

| Example | Description |
|---------|-------------|
| `VAR[BSTR,R8]` | Array of variants: element 1 is BSTR, element 2 is R8 |
| `VAR[I4,DATE,CY]` | Array of variants: elements are I4, DATE, and CY respectively |
| `VAR[I4]` | Array of variants where each element is I4. Functionally similar to `I4[]` but not identical — this is an array of type VAR with I4 elements. |
| `VAR[VAR[BSTR,R8]]` | Array of variant arrays. Each sub-array contains a BSTR and an R8; the pattern repeats for all elements. |

---

## Specifying Argument and Return Values

Each item in `arg` receives its data type from the corresponding item in `dt` (positionally matched). The counts must be equal.

A method's return value does **not** receive its type from `dt` — the component supplies it. The script designer must know the expected return type in order to specify an appropriate receiving container.

### Recommended Return Variable Types

| Data Type | Return Variable Type |
|-----------|---------------------|
| `UI1` | `S`-type or `H`-type |
| `BOOL` | `I`-type |
| `I2` | `I`-type |
| `I4` | `I`-type |
| `R4`* | `F`-type |
| `R8`* | `F`-type |
| `CY` | `F`-type |
| `BSTR` | `S`-type or `H`-type |
| `DATE` | `S`-type or `H`-type |
| `DISP` | `I`-type (variable only) |
| `VAR` | N/A (report only) |

> \* `R4` and `R8` array argument values will be converted to scientific notation if their magnitude exceeds the number of significant digits the container can hold.

### Supported Argument Forms

- **Variable/literal data** — any concatenation of script variables, literals, or reserved words. For non-array arguments that do not return a value.
- **Simple variable** — a single script variable. For non-array arguments (including those that return a value).
- **Report** — a single report specification. Use with `BSTR` or array arguments. If the argument returns a value, the report must be a result.

### Specifying a Report as an Argument

```
(c,d,-r[,rs,options])
```

| Field | Description |
|-------|-------------|
| `c,d,-r` | Cabinet, drawer, and temporary report containing the argument data. If the argument passes a value, the report must exist. If it returns a value and the report does not exist, `c,d` must be specified. |
| `rs` | Record separator used by the component (0–2 characters). |
| `options` | Report handling options. See [Report Handling Options](#report-handling-options). |

### Report Handling Options

| Option | Description |
|--------|-------------|
| `B` | Binary report. Valid only for `UI1[]` arguments that return a value. Cannot be combined with any other option. |
| `C` | Concatenate array elements to/from a single report line. Valid only for `UI1[]` type. Without `W`: values are concatenated on one line and truncated if the array exceeds drawer width; with a record separator, a new line starts at each separator. With `W`: values are concatenated across multiple lines starting at column 2 without truncation. |
| `H` | Include report headers. Applies to `[in]` arguments. If set, starts at line 1 (`.DATE`); if headers are present (default), starts at the first line after the header divider. Valid only for `BSTR`, `BSTR[]`, and `UI1[]`. |
| `T` | Include trailing blanks. Valid for `BSTR`, `BSTR[]`, and `UI1[]` (with `C` option) arguments that pass a value. |
| `W` | Line wrap data. Allows values exceeding drawer width to continue across multiple lines. A tab code line type marks the first line of a new value; extension lines use an asterisk (`*`) line type. Without `W`, values exceeding drawer width are truncated. |

### Report Argument Example — VAR Data Type

The following shows the data format for the `VAR[VAR[&]]` format. Each record occupies 3 lines: a BSTR, a DATE, and an I4. The report may contain as many 3-line records as fit in a result.

> **Note:** No other information (such as comments) should follow a data item in the report.

```
@ BRK .
*==========================
This is the first BSTR record
12/31/2000
30000000
This is the second BSTR record
01/01/2001
-20000000
@ BRK .                         Created the 0
@ CCI,label handle,method VAR[VAR[BSTR,DATE,I4]] (-0) rtn vmsg .
```

---

## Behavior

### On Success
- The named method is invoked with arguments passed per the `dt` direction specifiers.
- Return values are placed into the specified containers.
- `STAT1$` is set to `0`.

### On Failure
- Execution branches to `lab` (if specified).
- `STAT1$` contains the `HRESULT` or Windows error code.
- `STAT2$` contains the sequence number of the argument that caused the failure (if the error is argument-related; first argument = 1).
- `STAT3$` indicates truncation — contains the argument number of the first report argument where truncation occurred. The statement label is ignored and the run continues.
- `vmsg` contains a human-readable description of the error.
- If `lab` is not specified, the run errors.

> **Best Practice:** Always specify both `lab` and `vmsg`. Check `STAT1$`, `STAT2$`, and `STAT3$` at the contingency label.

---

## Examples

### Sending an E-mail Message

This example creates a `CDO.Message` component instance, sets the `From`, `To`, `Subject`, and `textBody` properties, then invokes the `Send` method. The `dt` and `arg` fields for the `Send` call are empty because the method takes no arguments.

```
@ CCC,0100 CDO.Message <Handle>i1 <Vmsg>s80 .
@ CCP,0100 <Handle>,From    BSTR From.User@Company.com <Vmsg>s80 .
@ CCP,0100 <Handle>,To      BSTR To.User@Company.com   <Vmsg>s80 .
@ CCP,0100 <Handle>,Subject BSTR 'CCX NewMail'          <Vmsg>s80 .
@ BRK .
Greetings,
You have just received an e-mail that was sent using
the CCx statements.
@ BRK .
@ LDV <Lf>h1=chr$ 12 .
@ CCP,0100 <Handle>,textBody BSTR (-0,<Lf>) <Vmsg>s80 .
@ CCI,0100 <Handle>,Send <Vmsg>s80 .
@ CCR <Handle> .

@ GTO END .                         **** Success ****
@0100 .
STAT1 = STAT1$, STAT2 = STAT2$, STAT3 = STAT3$
-<Vmsg>
@ GTO END .                         **** Error occurred ****
```

### Passing Data via CCI (CDONTS NewMail)

This example uses `CCI` to pass `From`, `To`, `Subject`, `Body`, and `Importance` arguments directly to the `Send` method of the `CDONTS.NewMail` component.

> **Note:** `CDONTS` is not installed on new Microsoft Windows Server 2003 installations, but remains on systems upgraded from earlier versions.

```
@. This CCX example shows the NewMail program using the CCI to pass data.
@. To run this, fill in a valid From.User@Company.com and To.User@Company.com
@.
@ CHG <Lf>h1 CHR$ 012 .
@ LDV <Importance>i1=2 .              2 = High Importance
@ CCC,0199 'CDONTS.NewMail' <Handle>i2 <Vmsg>s80 .
@ CCI,0100 <Handle>,Send bstr,bstr,bstr,bstr,i4 \
    From.User@Company.com,\
    To.User@Company.com,'Subject Text','Body Text',\
    <Importance> '' <Vmsg>s80 .
@ CCR <Handle> .
@ GTO END .                           ***** Success *****

@0100:.
@ CCR <Handle> .

@0199:.
@ BRK .
stat1: stat1$
stat2: stat2$
stat3: stat3$
-<Vmsg>
@ BRK DSP,-0 .
@ GTO END .                           ***** Failed *****
```
