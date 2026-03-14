# @BCO — Block Copy Overlay

## Overview

Use the Block Copy Overlay (BCO) run statement to overlay a block of lines in a report with lines from another report. Optionally, the lines in the input report can then be overlaid with blanking data that might come from the drawer's report zero or text supplied.

---

## Prerequisite

Unless you are processing a result, you must precede the `@BCO` statement with an Update Lock ([`@LOK`](LOK.md)) statement. Large updates that exceed a system limit require the report to be in deferred update mode ([`@DFU`](DFU.md)) prior to using the `@BCO` statement. If the `@BCO` statement updates more than one permanent report, then both reports must be in deferred update mode. See [`@BBO`](BBO.md) statement notes for details.

---

## Syntax

```
@BCO,ic,id,ir,il,iq,rc,rd,rr,rl[,rq,ipredef,vld,lab] .
```

| Field | Description |
|-------|-------------|
| `ic,id,ir` | Issuing report. |
| `il` | Issuing report starting line number. |
| `iq` | Number of lines to be moved to the receiving report. If `ipredef` or `vld` are specified, this is also the number of lines to be initialized in the issuing report. |
| `rc,rd,rr` | Receiving report. |
| `rl` | Receiving report starting line number. |
| `rq` | Number of lines to be overlaid in the receiving report. If `iq` is less than `rq`, then the issuing lines are copied repeatedly until `rq` lines have been overlaid. Default = `iq`. |
| `ipredef` | Reference number of a predefined line to copy from report 0 of the issuing drawer to the issuing report. |
| `vld` | Variables, literals, reserved words, or any combination of these, to copy to the overlaid lines in the issuing report. |
| `lab` | Label to go to if the statement encounters an error during the overlay operation. Note: Truncation does not go to the label. |

---

## Outcome

The `@BCO` statement overlays the specified number of lines in the receiving report. If directed, lines in the issuing report may be overlaid with blanking lines. The following table summarizes the outcome values:

| Condition | Description | `STAT1$` | `STAT2$` |
|-----------|-------------|----------|----------|
| Successful, no truncation. | Execution continues at the next line. | `0` | `0` |
| Successful, with truncation. | Execution continues at the next line. | `1` | System message number |
| Unsuccessful — label specified. | Execution goes to the label. | `2` | System message number |
| Unsuccessful — no label specified. | The run results in an error. | | |

---

## Notes

- If `STAT2$` is nonzero, you can use the Load System Message ([`@LSM`](LSM.md)) statement to read the text of the message.
- If a permanent report is being updated, the report must be under Update Lock (`@LOK`) or in deferred update mode (`@DFU`) prior to using the `@BCO` statement. See [`@BBO`](BBO.md) statement notes for details.
- Use the `ipredef` or `vld` parameters to overlay the issuing report lines with blanking data.
- If both reports are permanent and both are being updated, then both reports must be under deferred update mode regardless of the number of lines being updated.

---

## Example

The statement in this example overlays lines in report 2B800 with data from report 100A0. Four lines, beginning at line number 20 of 100A0, are copied to six lines of 2B800, beginning at line number five. The four lines are repeatedly copied until the requested six are written. Then predefined blanking line number three in drawer A0 will overlay four lines beginning at line 20 of report 100A0.

```
@BCO,0,a,100,20,4,800,b,2,5,6,3,,0199 .
```

| Field | Description |
|-------|-------------|
| `0,a,100` | Report 100A0 is the issuing report. |
| `20` | Report 100A0 is overlaid beginning at line 20 with data from predefined blanking line number 3. |
| `4` | Four lines of data are overlaid in 100A0. |
| `800,b,2` | Report 2B800 is the receiving report. |
| `5` | Report 2B800 is overlaid beginning at line number 5. |
| `6` | Six lines of data are overlaid in 2B800. |
| `3` | Report 100A0 is overlaid with data from predefined blanking line 3. |
| `0199` | Go to label 0199 in case of error. |
