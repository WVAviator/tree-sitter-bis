# @LDV — Load Variable

## Overview

Puts data into a new or existing variable, or reformats the contents of an existing variable.

- Use **Format 1** to put data into a new or existing variable.
- Use **Format 2** to reformat the contents of an existing variable.
- Use **Format 3** to load variables based on delimited content.

For additional reformatting options specific to numeric data, see [`@JUV`](JUV.md) (Justify Variable).

---

## Syntax

**Format 1** — Load a variable with data:
```
@LDV[,o] v=vld[,v=vld,...,v=vld] .
```

**Format 2** — Reformat existing variable(s):
```
@LDV,o v[,v,...,v] .
```

**Format 3** — Load variables based on delimited content:
```
@LDV,Q rv=iv,n[(delim),rv=iv,n(delim),...] .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `o` | Optional | Option controlling how data is loaded. See [Options](#options). |
| `v` | Required | Variable to load. Include variable type and size to define or redefine it. |
| `vld` | Required *(Format 1)* | Data to put into the variable. Accepts a literal, constant, variable, reserved word, or any combination. |
| `Q` | Format 3 | Load variables based on delimited content. See [Loading Variables Based on Content](#loading-variables-based-on-content). |
| `rv` | Required *(Format 3)* | Receiving variable. |
| `iv` | Required *(Format 3)* | Issuing variable (the source of delimited data). |
| `n` | Required *(Format 3)* | Number of delimiters in `iv` to skip before loading data. Must be a literal value. |
| `(delim)` | Optional *(Format 3)* | Character to use as delimiter. Default: tab character. Parentheses are required if specified. |

---

## Options

| Option | Platform | Description |
|--------|----------|-------------|
| `C` | All | Centers data within the variable. |
| `H` | 2200 only | Returns the status of a remote run link. Use format `LDV,H v=rms`, where `v` captures the result (`0` = offline, `1` = online). Note: only indicates whether the remote site is configured, not its actual availability. |
| `L` | All | Left-justifies data within the variable. |
| `O` | All | Converts all uppercase alphabetic characters to lowercase. |
| `P` | All | Packs the variable so it contains only significant characters, removing unnecessary leading and trailing spaces. If the variable has no significant characters after packing, it becomes zero-length and may cause failures in other statements. Use [`@DEF`](DEF.md) before packing to check the packed size. |
| `Q` | All | Loads delimited data from a variable or reserved word into another variable. See [Loading Variables Based on Content](#loading-variables-based-on-content). |
| `R` | All | Right-justifies data within the variable. |
| `U` | All | Converts all lowercase alphabetic characters to uppercase. |
| `W` | 2200 only | Loads the variable with the value of a reserved word. Values are left-justified — ensure the variable is large enough to hold the reserved word value. |
| `Z` | All | Right-justifies and zero-fills the variable after data is loaded. |

---

## Guidelines

- Use `@LDV` to initialize variables, load from other variables, or reload already-initialized variables.
- To load a substring of an initialized variable, use the `position-characters` format with parentheses, e.g. `v1(3-5)`.
- To load strings containing spaces or commas, enclose them in apostrophes. `@LDV` stops loading when it encounters an unquoted space or comma.
- When loading a variable with its own contents (e.g. to pack or justify it), you only need to specify the receiving variable. For example, `@ldv,p <var1>,<var2>` is equivalent to `@ldv,p <var1>=<var1>,<var2>=<var2>`. This is also useful for centering, justifying, and initializing space-filled variables.
- Once a variable is packed to fewer than its original number of characters, it must be reinitialized before it can hold more characters — any excess will be lost.
- Use [`@CHG`](CHG.md) (Change Variable) for arithmetic on variable contents or to capture user input.

---

## Loading Variables Based on Content

The `Q` option loads variables from tab-delimited (or custom-delimited) content within a source variable. The receiving variable is loaded with the data between the nth delimiter and the next delimiter. This is particularly useful when processing variables initialized using `INVR1$` or `INSTR$`.

---

## Examples

Center the contents of `<name>` in `<heading1>`:
```
@ldv,c <heading1>=<name> .
```

Center the data already in `<heading2>` (Format 2 — no `=` needed):
```
@ldv,c <heading2> .
```

Pack the contents of `<answer>` into `<panswer>`:
```
@ldv,p <panswer>=<answer> .
```

Load the current date into the last 9 characters of `<dateline>`:
```
@ldv <dateline>(0-9)=date2$ .          (Windows / Linux / UNIX)
@ldv,w <dateline>(0-9)=date2$ .        (2200)
```

Load cabinet, drawer, and report number from reserved words:
```
@ldv,w <cab>i4=cab$,<drawer>i6=drw$,<report>i4=rpt$ .
```

If `NEWUSER` is on station 12 and `v4` contains `abcNEW12xyz`, pack and load with reserved words:
```
@ldv,pw v4s20='abc'user$(1-3)stnum$xyz .
```

Load `v1` with the current time, then extract the `MM:SS` portion using an unknown trailing substring (`0-5` = last 5 characters, starting position unknown):
```
@ldv,w v1h8=time$ .     (v1 now contains hh:mm:ss)
@ldv v2i5=v1(0-5) .     (v2 now contains mm:ss)
```

Extract just the seconds using a known trailing substring (`7-0` = from column 7 through end of field):
```
@ldv v2i2=v1(7-0) .     (v2 now contains ss)
```

### Loading Multiple Variables

Load four string variables, then concatenate them into a single variable:
```
@ldv <str1>a5=This,<str2>a3=is,<str3>a3=an,<str4>a8=example .
@ldv <string>s40=<str1><str2><str3><str4> .
```
`<string>` now contains `This is an example`.

### Using the Q Option with a Protected Screen

```
@1:brk.
Field 1 , Field 2 ,
@brk.
@chg invr1$ v1s80,v2s80,v3s80 .
@out,-0,2,23,1,1,y,,,p .
@ldv,q <field1>h6=v1,0,<field2>h6=v1,1 .
<field1>/
<field2>/
```

`<field1>` is loaded with the data before the first tab in `v1` (skip 0 delimiters); `<field2>` is loaded with the data after the first tab (skip 1 delimiter).
