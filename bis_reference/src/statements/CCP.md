# @CCP — COM Client Put Property Value

## Overview

Sets (writes) the value of a property on an instantiated COM component object.

> **Platform:** Windows 2000 or later required.

### Related Statements

| Statement | Description |
|-----------|-------------|
| [@CCC](CCC.md) | COM Client Create Instance |
| [@CCG](CCG.md) | COM Client Get Property Value |
| [@CCI](CCI.md) | COM Client Invoke Method |
| [@CCR](CCR.md) | COM Client Release Instance |

---

## Syntax

```
@CCP[,lab] vch,property dt value [vmsg] .
```

### Parameters

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `lab` | Optional | Label | Branch destination if the operation fails. If omitted and the operation fails, the run errors. |
| `vch` | Required | `I` type variable | The instance handle of the component whose property is being updated. |
| `property` | Required | Property name | The name of the component property to write. See *Specifying Property Names* in [@CCG](CCG.md). |
| `dt` | Required | Data type | The data type of the property value being set. See *Specifying Data Types* in [@CCI](CCI.md). |
| `value` | Required | Variable or report | Contains the value to write to the property. See *Specifying Argument and Return Values* in [@CCI](CCI.md). |
| `vmsg` | Optional | `S` type variable | Captures the COM error message text if the operation fails. |

---

## Behavior

### On Success
- The specified property is updated with `value`.
- `STAT1$` is set to `0`.

### On Failure
- Execution branches to `lab` (if specified).
- `STAT1$` contains the `HRESULT` or Windows error code.
- `vmsg` contains a human-readable description of the error.
- If `lab` is not specified, the run errors.

> **Best Practice:** Always specify both `lab` and `vmsg` to handle errors gracefully. Also check `STAT1$` at the contingency label.

---

## Example

Sets the `Subject` property on the component instance identified by `<handle>`. The value is taken from the `<subject>` run variable, with a data type of `bstr`. If the operation fails, execution jumps to label `199` and `<vmsg>` contains the error description.

```
@ccp,199 <handle>,'Subject' bstr <subject> <vmsg>s80 .
```

> See [@CCI](CCI.md) for additional examples involving COM component interaction.
