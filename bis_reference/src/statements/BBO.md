# @BBO — Block Blank Overlay

## Overview

Use the Block Blank Overlay (BBO) run statement to overlay a block of lines in a report with some data. The overlaying data can come from report zero of the drawer, text supplied, or spaces.

---

## Prerequisite

Unless you are processing a result, you must precede the `@BBO` statement with an Update Lock ([`@LOK`](LOK.md)) statement. Large updates that exceed a system limit require the report to be in deferred update mode ([`@DFU`](DFU.md)) prior to using the `@BBO` statement. See [Notes](#notes) for details.

---

## Syntax

```
@BBO,c,d,r,l,q[,predef,vld,lab] .
```

| Field | Description |
|-------|-------------|
| `c,d,r` | Report to be overlaid. |
| `l` | Starting line number. |
| `q` | Number of lines to be overlaid. |
| `predef` | Reference number of a predefined line to copy from report 0 of the drawer to the overlaid lines. |
| `vld` | Variables, literals, reserved words, or any combination of these, to copy to the overlaid lines. Note: Truncation occurs if `vld` is wider than the report to be overlaid. |
| `lab` | Label to go to if the statement encounters an error during the overlay operation. Note: Truncation does not go to the label. |

---

## Outcome

The `@BBO` statement overlays the specified number of lines in the report. The following table summarizes the outcome values:

| Condition | Description | `STAT1$` | `STAT2$` |
|-----------|-------------|----------|----------|
| Successful, no truncation. | Execution continues at the next line. | `0` | `0` |
| Successful, with truncation. | Execution continues at the next line. | `1` | System message number |
| Unsuccessful — label specified. | Execution goes to the label. | `2` | System message number |
| Unsuccessful — no label specified. | The run results in an error. | | |

---

## Notes

- If `STAT2$` is nonzero, you can use the Load System Message ([`@LSM`](LSM.md)) statement to read the text of the message.
- If a permanent report is being updated, the report must be under Update Lock (`@LOK`) or in deferred update mode (`@DFU`) prior to using the `@BBO`, `@BCO`, or `@BPO` statement.
- Due to architectural factors, the exact number of lines that can be updated without requiring deferred update is limited. The following table provides a guideline as to the approximate number of lines that can be updated without requiring deferred update. These limits may be removed in a future release.

| Line Width in Characters (common drawer widths) | Approximate Number of Lines Without Deferred Update |
|-------------------------------------------------|-----------------------------------------------------|
| 80 | 600 |
| 132 | 370 |
| 256 | 190 |
| 504 | 95 |
| 998 | 50 |

---

## Examples

### Blanking Using Predefined Lines

The statement in this example overlays lines in report 100A0 with data from report zero of drawer A0. Predefined blanking line number 3 is used to overlay the existing data, beginning at line 20, for 4 lines.

```
@BBO,0,a,100,20,4,3,,0199 .
```

| Field | Description |
|-------|-------------|
| `0,a,100` | Report 100A0 is to be overlaid. |
| `20` | Data is overlaid beginning at line 20. |
| `4` | Four lines of data are overlaid. |
| `3` | Predefined blanking line 3 from report zero is copied to the overlaid lines. |
| `0199` | Go to label 0199 in case of error. |

### Blanking Using Text

The statement in this example overlays lines in report 100A0 with text. The overlaying text here comes from a variable, but it could be specified as data between apostrophes. This text is used to overlay the existing data, beginning at line 20, for 4 lines.

```
@BBO,0,a,100,20,4,,<bTxt>,0199 .
```

| Field | Description |
|-------|-------------|
| `0,a,100` | Report 100A0 is to be overlaid. |
| `20` | Data is overlaid beginning at line 20. |
| `4` | Four lines of data are overlaid. |
| `<bTxt>` | The text in variable `<bTxt>` is copied to the overlaid lines. |
| `0199` | Go to label 0199 in case of error. |

### Blanking Using Spaces

The statement in this example overlays lines in report 100A0 with spaces. Spaces will be used because neither a predefined line nor text is specified as the blanking source. Spaces are used to overlay the existing data, beginning at line 20, for 4 lines.

```
@BBO,0,a,100,20,4,,,0199 .
```

| Field | Description |
|-------|-------------|
| `0,a,100` | Report 100A0 is to be overlaid. |
| `20` | Data is overlaid beginning at line 20. |
| `4` | Four lines of data are overlaid with spaces because neither a predefined line nor text is specified. |
| `0199` | Go to label 0199 in case of error. |
