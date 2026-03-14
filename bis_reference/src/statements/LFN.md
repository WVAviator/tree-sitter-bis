# @LFN — Load Field Name

## Overview

Loads variables with the names of report fields that correspond to supplied column-character positions.

`@LFN` is especially useful for:
- Converting an existing run to one that uses named fields.
- Translating column position data — such as positions captured by the [`@OUM`](OUM.md) (Output Mask) statement — into field names.

---

## Syntax

```
@LFN[,c,d,r,tics?,lab] cc v[,v,...,v] .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `c,d,r` | Optional | Report from which to load field names. Default: `-0`. |
| `tics?` | Optional | Enclose the field name in apostrophes? `Y` or `N`. Default: `N`. Use `Y` only if building a complete statement in a variable or output area for later execution. |
| `lab` | Optional | Label to branch to if the field name cannot be loaded. If omitted and the field name cannot be loaded, the run continues at the next statement and loads the variable with the actual column-characters (e.g. `2-2`). |
| `cc` | Required | Column-character positions of the fields. |
| `v` | Required | Variable(s) to load with field names. |

---

## Outcome

When `@LFN` executes, the following may occur:

- If a specified variable is not large enough to contain the entire field name, the trailing characters are truncated.
- If the specified columns do not represent an entire field, the statement loads the name followed by a partial field designation (e.g. `'CustCode(1-3)'`).
- If a label is specified and the field name cannot be loaded, the run branches to that label.
- If no label is specified and the field name cannot be loaded, the run continues at the next statement, loading the variable with the actual column-characters (e.g. `2-2`).

---

## Reserved Words

`STAT1$` contains one of the following error codes:

| Code | Description |
|------|-------------|
| `1` | A report heading is improperly formatted for field names. |
| `2` | Columns supplied do not fall within field boundaries. |
| `3` | A field name in the report heading has no significant characters. |
| `4` | A field name is not unique in the report heading. |
| `5` | A field name was truncated due to variable size, and the name is not unique in the report heading. |

`STAT2$` contains the number of the field in error.

---

## Guidelines

Use `Y` in the `tics?` subfield only when building a complete statement in a variable or in the output area for later execution.

---

## Examples

### Loading Field Names from a Specific Report

Load field names from report `2B0`, enclosing them in apostrophes:

```
@lfn,0,b,2,y 2-2,45-3 <field1>h18,<field2>h18 .
```

| Part | Description |
|------|-------------|
| `0,b,2` | Load field names from report `2B0` |
| `y` | Enclose field names in apostrophes |
| `2-2` | Get the name of the two-character field starting at column 2 |
| `45-3` | Get the name of the three-character partial field starting at column 45 |
| `<field1>h18` | Loaded with the name of the field at column 2 — result: `'StCd'` (including apostrophes) |
| `<field2>h18` | Loaded with the name of the partial field at column 45 — result: `'CustCode(1-3)'` |

---

### Using a Variable as a Field Indicator

This example uses `@LFN` to load `v1` with the field name `UNISYS` from the current result, then passes it to a sort:

```
@brk,fftype$ .
.
*Unisys
*======.
. 1
@brk lfn,-0 2-6 v1h8 .
@sor,-0 '' 'v1' .,1 .
```

`v1` is loaded with `UNISYS` (the field name found at columns 2–6 of `-0`), which is then used as a named field reference in the [`@SOR`](SOR.md) statement.
