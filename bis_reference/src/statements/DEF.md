# @DEF — Define

## Overview

Determines the contents or characteristics of a variable or reserved word, returning the result in a specified variable.

---

## Syntax

```
@DEF[,o,lab] setv,testv .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `o` | Optional | Option specifying what to determine about `testv`. Only one option may be specified. If omitted, returns a content type code. See [Options](#options). |
| `lab` | Optional | Label to branch to if `testv` is not defined. Use `LIN1` to continue at the next line instead of specifying a label number. |
| `setv` | Required | Variable that receives the returned value describing `testv`. |
| `testv` | Required | Variable or reserved word to test. To test an array member, use `testv[n]` where `n` is the member index (brackets required). |

---

## Options

| Option | Platform | Description |
|--------|----------|-------------|
| `A` | All | Determines the alphabetic drawer. `testv` must contain a valid numeric drawer (positive octal number identifying the drawer and cabinet). |
| `C` | All | Determines the number of significant characters (any character other than spaces; tab characters are significant). |
| `E` | Windows / Linux / UNIX | Determines the name of an environmental variable. `testv` is an integer specifying the positional order in which the environmental variable was created. The name is loaded into `setv`. |
| `G` | All | Determines the name of a global variable. `testv` is an integer specifying the positional order in which the global variable was created. The name is loaded into `setv`. |
| `I` | All | Determines the variable type. Returns: `1`=A, `2`=F, `3`=S, `4`=I, `5`=H. *(2200 also returns `6`=O.)* |
| `J` | All | Determines whether the variable contains Kanji or Katakana characters. See the `DEFJ` built-in function table at [`@CAL`](CAL.md). |
| `K` | All | Determines whether the variable contains Kanji characters. Returns `8` if so; otherwise returns `0`–`7`. |
| `M` | All | Determines the cabinet. `testv` must contain a valid numeric drawer. |
| `N` | All | Determines the numeric drawer. `testv` must contain a valid cabinet and drawer designation (e.g., `0B`). |
| `P` | All | Determines the packed size — the size the variable would be if loaded with an `LDV,P` statement. |
| `Q` | All | Determines the number of members if `testv` is an array; returns `0` otherwise. |
| `S` | All | Determines the size of the variable. |
| `T` | All | Determines the number of tab characters in the variable. |
| `V` | Windows / Linux / UNIX | Determines the variable name. `testv` is an integer representing the order in which the run created the variable. *(2200: `testv` is the variable itself, e.g., `v5`; returns spaces if no name is assigned.)* |
| `X` | All | Same as no option, except returns a value of `9` for unsigned integers. See [Content Type Codes](#content-type-codes). |

---

## Content Type Codes

When no option (or the `X` option) is specified, `setv` is loaded with one of the following values describing the contents of `testv`:

| Value | Contents of `testv` |
|-------|---------------------|
| `0` | All tab characters, spaces, or both |
| `1` | All numeric characters (leading/trailing spaces ignored) |
| `2` | All alphabetic characters |
| `3` | Alphabetic and numeric characters |
| `4` | All special characters |
| `5` | Special and numeric characters |
| `6` | Special and alphabetic characters |
| `7` | Special, numeric, and alphabetic characters |
| `8` | Reserved for future use |
| `9` | Unsigned integer with no embedded spaces, decimal points, dollar signs, commas, or sign characters, with possible leading/trailing spaces. *(Returned only with the `X` option.)* |

---

## Examples

Determine the size of `<input>`:
```
@def,s <size>,<input> .
```

Determine the number of significant characters in `<input>`:
```
@def,c <characters>,<input> .
```

Determine the variable type of `<unknown>`:
```
@def,i <type>,<unknown> .
```

Determine the name of the 5th environmental variable created in the run *(Windows/Linux/UNIX)*:
```
@def,e <EnvironmentalVariable>h10,5 .
```

Determine the name of the variable corresponding to `v5` *(2200)*:
```
@def,v <set>h10,v5 .
```
