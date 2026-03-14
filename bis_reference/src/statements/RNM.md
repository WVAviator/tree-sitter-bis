# @RNM (Rename)

## Overview

Establishes a new reference for a report or result using names `-0` through `-16` in any order. Useful for temporarily saving multiple results — if a result is not renamed, the system releases it when a new `-0` result is created.

> **Note:** Renaming a report to `-0` through `-16` does not make it a result. It simply gives the report another name. Any processing or updating on the renamed report applies to the report itself.

---

## Syntax

```
@RNM[,c,d,r] -n .
```

### Parameters

| Field | Description |
|-------|-------------|
| `c,d,r` | Report to rename. If not specified, the current `-0` result is renamed. |
| `-n` | New name for the report or result. Valid range: `-0` through `-16`. |

---

## Guidelines

- If you rename a `-0` result to `-1`, you can process it using either name. Once a new `-0` result is created, the previous result is only accessible as `-1`.
- A report can be renamed more than once. For example, report `2B0` could be renamed as both `-2` and `-3`, and then processed using `-2`, `-3`, or `0,2,b`. Updating `-2` updates the actual report `2B0`.

---

## Example

Save the result of a `@CAL` operation as `-1`, then save a `@MCH` result as `-2`, and finally match the two saved results:

```
@cal,0,c,1 c 'sales' |,a if:a>2500;then:a=a-a*.05 .
@rnm -1 .
.
. (Current result is -0 and -1.)
.
@mch,-0,0,c,2 b 'product' |,1 'product' |,1 .
@rnm -2 .
.
. (Current result is -0 and -2; -1 remains intact.)
.
@mch,-1,-2 n 'sales' |,1 'sales' |,1 .
.
. (Current result is -0; -1 and -2 remain intact.)
.
```
