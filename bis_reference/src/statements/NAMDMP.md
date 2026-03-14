# @NAMDMP — Namelist Dump

## Overview

Creates a result showing the contents of a pre-defined Namelist in a readable form. The result displays:
- The **Definition Report** that defines the headers
- The **drawers and reports** that comprise the body of the Namelist

The output is compatible with the System Data Directory and can be used as input to [`@NAMLST`](NAMLST.md).

---

## Syntax

```
@NAMDMP,ic,id,ir,rc,rd[,fmt]
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `ic,id,ir` | Required | Namelist result or directory name. |
| `rc,rd` | Required | Output (receiving) cabinet and drawer. |
| `fmt` | Optional | Format option: `V` (vertical — for readability) or `H` (horizontal — for compactness). Either format can be used as input to `@NAMLST`. |

---

## Output Format

The result uses the following column positions:

| Columns | Description |
|---------|-------------|
| `1–1` | Tab code |
| `2–16` | Name of the Namelist |
| `19–4` | Cabinet number of the Definition Report |
| `24–1` | Drawer letter of the Definition Report |
| `26–4` | Report number of the Definition Report |
| `31–4` | The letters `LIST` identifying this entry as a Namelist |

---

## Examples

### Example 1 — Horizontal Format (default)

Create a result showing the contents of the System Data Directory entry `MYNAMELIST` in drawer `A`:

```
@NAMDMP,'MYNAMELIST',0,A
```

Result:
```
.DATE
.MYNAMELIST
* NAME            .MODE.T.RID .RANG.
*================.====.=.====.====.
|MYNAMELIST        0  A   14  LIST
+2b0-7b0  2c0-20c0  72b2  80b2-89b2
```

The Namelist Definition Report is `14A`. The body of the Namelist includes reports across drawers `B0` and `C0`, and one in `B2`. This is the default horizontal representation, useful for its compactness.

---

### Example 2 — Vertical Format

Create a result showing the same content from an ad-hoc Namelist in result `-3`, using vertical format:

```
@NAMDMP,-3,0,A,V
```

Result:
```
.DATE
.
* NAME            .MODE.T.RID .RANG.
*================.====.=.====.====.
|                  0  A   14  LIST
+  2B0  -  7B0
+  2C0  - 20C0
+  72B2
+  80B2 - 89B2
```

Same Definition Report as Example 1, but no name is associated with the Namelist (it was an ad-hoc result rather than a named directory entry).
