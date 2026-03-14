# @LDA — Load Variable Array

## Overview

Defines a variable array and loads data into it. Each variable in an array is referred to as a **member** of the array.

> *(2200 only)* The run control report must be in full character set (FCS or FCSU).

---

## Syntax

**Format 1** — Define and load with named data:
```
@LDA[,o] v[n][=vld,...,vld] .
```

**Format 2** — Define and load from other variables:
```
@LDA[,o] v[n][,v[n],...,v[n]] .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `o` | Optional | Option controlling how data is loaded into the array. See [Options](#options). |
| `v` | Required | The variable array to define or load. Include the variable type and size to define or redefine it. |
| `[n]` | Optional | Number of members in the array. Brackets are required syntax. |
| `vld` | Optional | Data to load into each member. Accepts a literal, constant, variable, reserved word, or any combination. Data is loaded in order: first value → first member, second value → second member, etc. |

---

## Options

| Option | Platform | Description |
|--------|----------|-------------|
| `C` | All | Centers data within each variable. |
| `L` | All | Left-justifies data within each variable. |
| `O` | All | Converts all uppercase alphabetic characters to lowercase. |
| `P` | All | Packs data into each variable so it contains only significant characters. If packed data has no significant characters, the variable becomes length 0 — results are unpredictable if a zero-length variable is used. Use [`@DEF`](DEF.md) to check the packed size before packing. |
| `R` | All | Right-justifies data within each variable. |
| `U` | All | Converts all lowercase alphabetic characters to uppercase. |
| `W` | 2200 only | Loads variables with the values of reserved words. Values are left-justified — ensure variables are large enough to hold the reserved word values. |
| `Z` | All | Right-justifies and zero-fills each variable after data is loaded. |

---

## Guidelines

- Once an array is defined (size, type, and number of members), no individual member can be redefined.
- *(Windows / Linux / UNIX)* Once any variable is defined — even a non-array variable — it cannot be redefined as an array.
- *(Windows / Linux / UNIX)* Array type variables are padded with control characters that require storage space and count toward the variable character limit.
- *(2200 only)* Array members consume string variable space, regardless of variable type.

---

## Referring to Array Members

To reference a specific member of an array, use:

```
name[n]
```

where `name` is the array name and `n` is the position of the member. Brackets are required. For example, to refer to the third member of `<bigarray>`:

```
<bigarray>[3]
```

---

## Changing the Value of Array Members

Each array member is a variable and can be updated using the same statements used for regular variables, as long as the proper array member reference format is used. For example, either of these statements sets the fifth member of `<bigarray>` to `65`:

```
@ldv <bigarray>[5]=65 .
@chg <bigarray>[5] 13 * 5 .
```

---

## Array Members and Variable Counts

Each array member counts as one variable toward the total number allowed on the system.

When passing an entire array to [`@CALL`](CALL.md) without specifying the array size, all members are accessible but count as only one variable toward the pass limit:

```
@call 005(<bigstring>) .
```

To pass individual members as separate variables, specify them explicitly:

```
@call 005(<bigstring>[5]) .
```

---

## Examples

Define an array of 10 string variables, each 5 characters long:
```
@lda <bigstring>s5[10] .
```

Load the first three members of `<bigstring>` with the values of `<name>`, `<address>`, and `<phone>`:
```
@lda <bigstring>=<name>,<address>,<phone> .
```

Define `<qty>` as a right-justified integer array with 5 members, and load each member:
```
@lda,r <qty>i6[5]=1,12,123,1234,12345 .
```

After execution, the members contain:
```
<qty>[1] =     1
<qty>[2] =    12
<qty>[3] =   123
<qty>[4] =  1234
<qty>[5] = 12345
```
