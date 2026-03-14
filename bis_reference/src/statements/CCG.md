# @CCG — COM Client Get Property Value

## Overview

Retrieves the value of a property from an instantiated COM component object.

> **Platform:** Windows 2000 or later required.

### Related Statements

| Statement | Description |
|-----------|-------------|
| [@CCC](CCC.md) | COM Client Create Instance |
| [@CCI](CCI.md) | COM Client Invoke Method |
| [@CCP](CCP.md) | COM Client Put Property Value |
| [@CCR](CCR.md) | COM Client Release Instance |

---

## Syntax

```
@CCG[,lab] vch,property rtn [vmsg] .
```

### Parameters

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `lab` | Optional | Label | Branch destination if the operation fails. If omitted and the operation fails, the run errors. |
| `vch` | Required | `I` type variable | The instance handle of the component whose property is being accessed. |
| `property` | Required | Property name | The name of the component property to read. See [Specifying Property Names](#specifying-property-names). |
| `rtn` | Required | Variable or report | Receives the property value. See *Specifying Argument and Return Values* in [@CCI](CCI.md). |
| `vmsg` | Optional | `S` type variable | Captures the COM error message text if the operation fails. |

---

## Specifying Property Names

The syntax for a property name is:

```
property[(index)]
```

The property name is required. If the component defines the property as an **indexed property**, index values are enclosed in parentheses immediately after the property name.

**Index rules:**
- Numeric indexes only — up to two dimensions.
- Index values must be integers.
- Named indexes are not supported.

### Examples

| Syntax | Description |
|--------|-------------|
| `property` | Non-indexed property |
| `property(2)` | Element 2 of an indexed property |
| `property(1,2)` | Element at index "1,2" of a two-dimensional indexed property |

---

## Behavior

### On Success
- The property value is placed into `rtn`.
- `STAT1$` is set to `0`.

### On Failure
- Execution branches to `lab` (if specified).
- `STAT1$` contains the `HRESULT` or Windows error code.
- `vmsg` contains a human-readable description of the error.
- If `lab` is not specified, the run errors.

> **Best Practice:** Always specify both `lab` and `vmsg` to handle errors gracefully. Also check `STAT1$` at the contingency label.

---

## Example

Retrieves the value of the `NumberOfRecords` property from the component instance identified by `<handle>`. The result is stored in `<numrecs>`. If the operation fails, execution jumps to label `199` and `<vmsg>` contains the error description.

```
@ccg,199 <handle>,'NumberOfRecords' <numrecs>i6 <vmsg>s80 .
```

> See [@CCI](CCI.md) for additional examples involving COM component interaction.
