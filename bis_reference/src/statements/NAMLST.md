# @NAMLST — Namelist

## Overview

Defines an ad-hoc Namelist, generating a binary Namelist result that can be used as input to various functions supporting Namelists. For more information about Namelists, see the Namelist documentation.

---

## Syntax

```
@NAMLST,c,d,r[,[opt],lab] vld .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `c,d,r` | Required | Namelist Definition Report (must be a permanent report). |
| `opt` | Optional | Options. See [Options](#options). |
| `lab` | Optional | Label to branch to on error. |
| `vld` | Required | Identifies the reports in the body of the Namelist. See [Namelist Format (vld)](#namelist-format-vld). When using the `I` option, `vld` must still be present even though it is empty (use `''`). |

---

## Options

| Option | Description |
|--------|-------------|
| `A` | Makes the output of this function the unit's Active Namelist, making it available directly to manual users. |
| `C` | Clears the Active Namelist. |
| `I` | Input from a report or result rather than from `vld`. All Namelist information is provided by `c,d,r`. `vld` must still be present but is ignored. |

**Syntax when using the `I` option:**
```
@NAMLST,c,d,r,I[opt][,lab] ''
```

---

## Namelist Format (`vld`)

Reports are specified in `rDc` (report, drawer, cabinet) format. Ranges are always from low to high. Reports are otherwise processed in the order specified; duplicates are permitted.

| Example | Description |
|---------|-------------|
| `2B100` | Report 2, drawer B, cabinet 100 |
| `2B100 4B100` | A range of 3 reports in drawer B, cabinet 100 |
| `B100` | All of drawer B, cabinet 100 |
| `B100 D100` | A range of 3 drawers from B100 to D100 |
| `14B100 B100` | A range of reports from 14 to the highest available in drawer B, cabinet 100 |

---

## Input from @NAMDMP

When using the `I` option, the input format is compatible with the System Data Directory and the output of [`@NAMDMP`](NAMDMP.md). The `vld` format is the same as the `+` line in the `@NAMDMP` output.

Example input report structure:

```
* NAME            .MODE.T.RID .RANG.
*================.====.=.====.====.
|MYNAMELIST        0  A   14  LIST
+2b0-7b0  2c0-20c0  72b2  80b2-89b2
```

The following column positions are used:

| Columns | Description |
|---------|-------------|
| `1–1` | Tab code |
| `2–16` | Name of the Namelist |
| `19–4` | Cabinet number of the Definition Report |
| `24–1` | Drawer letter of the Definition Report |
| `26–4` | Report number of the Definition Report |
| `31–4` | The letters `LIST` identifying this entry as a Namelist |
