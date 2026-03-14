# CMP and @CMP — Compare Data

## Overview

Performs a character-to-character comparison of specified fields in two reports. Available as both an interactive **control line function** (`CMP`) and a **run statement** (`@CMP`).

> For the interactive function, one of the reports must be on display.

---

## Syntax

**Control line (interactive):**
```
CMP report [f,l]
```

**Statement (in a run):**
```
@CMP,c1,d1,r1,[lin1],c2,d2,r2[,lin2,q,lab] o cc1 ltyp1,p1 cc2 ltyp2,p2 [vlno1,vcol1,vlno2,vcol2] .
```

### Control Line Parameters

| Field | Description |
|-------|-------------|
| `report` | Report to compare against the displayed report. See *Specifying Reports or Drawers to Process*. |
| `f` | Report format to use for comparison (allows comparing fields beyond column 80 in the second report). |
| `l` | Line number in both reports where the comparison starts. |

### Statement Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `c1,d1,r1` | Required | First report to compare. See *Specifying Reports or Drawers to Process*. |
| `lin1` | Optional | Line in the first report at which to begin comparison. Default = line 2. |
| `c2,d2,r2` | Required | Second report to compare against the first. |
| `lin2` | Optional | Line in the second report at which to begin comparison. Default = line 2. |
| `q` | Optional | Number of lines to compare. Default = all. |
| `lab` | Optional | Label to branch to if a difference is detected. |
| `o` | Required | Options field. See [Options](#options). |
| `cc1` | Required | Column-character positions or field names to compare in the first report. |
| `ltyp1` | Required | Line type to compare in the first report. If the `A` option is used, leave blank but include the comma. |
| `p1` | Required | Parameters field for the first report. See [Parameters](#parameters). |
| `cc2` | Required | Column-character positions or field names to compare in the second report. |
| `ltyp2` | Required | Line type to compare in the second report. If the `A` option is used, leave blank but include the comma. |
| `p2` | Required | Parameters field for the second report. See [Parameters](#parameters). |
| `vlno1` | Optional | Variable to capture the line number in the first report where a difference is detected. |
| `vcol1` | Optional | Variable to capture the column number in the first report where a difference is detected. |
| `vlno2` | Optional | Variable to capture the line number in the second report where a difference is detected. |
| `vcol2` | Optional | Variable to capture the column number in the second report where a difference is detected. |

---

## Options

| Option | Platform | Description |
|--------|----------|-------------|
| `A` | All | Processes all line types regardless of line type. |
| `C(S)` | All | Distinguishes between uppercase and lowercase letters. *(2200: applies only to full character set (FCS) reports.)* |

---

## Parameters

| Parameter | Description |
|-----------|-------------|
| `1`–`25` | Specifies the sequence of fields to compare, starting at `1`. In the function mask, type each parameter in the first column of the field; add or erase asterisks to make compared fields the same size. In the `@CMP` statement, fields specified in `cc1` and `cc2` must be the same size. Maximum field size = 997 characters. |

---

## Behavior

### Interactive (Control Line)

- **Difference found:** The displayed report is redisplayed with the cursor at the column where the difference occurs, and a message indicates a difference was found.
  - *(2200)* Press **F1** to display each subsequent difference.
  - *(Windows / Linux / UNIX)* Re-execute `CMP` with a starting line number greater than the line where the previous difference was found to locate subsequent differences.
- **No difference:** A message states the fields are identical.

### Statement (`@CMP`)

- **Difference found:** Loads `vlno1`, `vcol1`, `vlno2`, and `vcol2` with the line and column numbers where the difference was detected, then branches to `lab`.
- **No difference (or no label specified):** The run continues at the next statement.

---

## Guidelines

- To continue comparing after a find, restart `CMP` with the line number at which comparison should resume.
- Fields up to 997 characters wide can be compared, allowing whole-line comparisons. Use the `@CMP` statement to compare lines extending beyond screen display width.
- Use the `A` option with a solid line of asterisks in the function mask to process all line types.
- Non-displayable reports (encrypted, binary, runtime) cannot be compared.

---

## Example

Compares the Product Type and Product Cost fields in reports `2B` and `1C`. To display the function mask interactively, first display `2b`, then enter `cmp 1c`.

```
@cmp,'report1c',,'report2b' '' 2-9,18-6 |,1,2 159,\
32-6 |,1,2 <line1>i4,<col1>i3,<line2>i4,<col2>i3 .
```
