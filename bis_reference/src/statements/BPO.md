# @BPO — Block Put Overlay

## Overview

Use the Block Put Overlay (BPO) run statement to overlay a block of lines in a report with lines from a temporary yank buffer.

---

## Prerequisite

Unless you are processing a result, you must precede the `@BPO` statement with an Update Lock ([`@LOK`](LOK.md)) statement. Large updates that exceed a system limit require the report to be in deferred update mode ([`@DFU`](DFU.md)) prior to using the `@BPO` statement. See [`@BBO`](BBO.md) statement notes for details.

---

## Syntax

```
@BPO,rc,rd,rr,rl[,rq,ib,lab] .
```

| Field | Description |
|-------|-------------|
| `rc,rd,rr` | Report to be overlaid. |
| `rl` | Starting line number. |
| `rq` | Number of lines to be overlaid. |
| `ib` | Buffer label from 1 through 100 as specified by the [`@LNY`](LNY.md), [`@LNA`](LNA.md), or [`@LND`](LND.md) statement. Default = unlabeled buffer. Note: Truncation occurs if the yank buffer is wider than the report to be overlaid. |
| `lab` | Label to go to if the statement encounters an error during the overlay operation. Note: Truncation does not go to the label. |

---

## Outcome

The `@BPO` statement overlays the specified number of lines in the report. The following table summarizes the outcome values:

| Condition | Description | `STAT1$` | `STAT2$` |
|-----------|-------------|----------|----------|
| Successful, no truncation. | Execution continues at the next line. | `0` | `0` |
| Successful, with truncation. | Execution continues at the next line. | `1` | System message number |
| Unsuccessful — label specified. | Execution goes to the label. | `2` | System message number |
| Unsuccessful — no label specified. | The run results in an error. | | |

---

## Notes

- If `STAT2$` is nonzero, you can use the Load System Message ([`@LSM`](LSM.md)) statement to read the text of the message.
- If a permanent report is being updated, the report must be under Update Lock (`@LOK`) or in deferred update mode (`@DFU`) prior to using the `@BPO` statement. See [`@BBO`](BBO.md) statement notes for details.

---

## Example

This statement overlays lines in report 100A0 with data from yank buffer number five. Data is overlaid in report 100A0 beginning at line number 20 for four lines.

```
@LOK,0,a,100 .
@BPO,0,a,100,20,4,5,0199 .
```

| Field | Description |
|-------|-------------|
| `0,a,100` | Report 100A0 is to be overlaid. |
| `20` | Data is overlaid beginning at line number 20. |
| `4` | Four lines of data are overlaid. |
| `5` | The data is copied from yank buffer number 5. |
| `0199` | Go to label 0199 in case of error. |
