# WC and @WDC — Word Change

> **Note (Linux / UNIX):** This command may not be available as it is part of the Word Processing feature and might not be installed at your site. See your administrator if the command cannot be invoked.
>
> **Note:** The `WC` manual function is only available on the OS 2200 system.

## Overview

Locates and changes words from a list of target words and replacement words (maximum of 200) in a receiving report. The source list may come from an issuing report or be entered directly on the control line. The command creates a result with the target words changed to their replacements.

For the manual function: when using a target list in a report, the report containing the target list must be on display; when entering target and replacement words on the control line, the receiving report must be on display.

*(Windows / Linux / UNIX)* If a replacement string expands beyond the report width, it wraps to the next line. If it wraps to more than one line, the following message is displayed: `(MGMW14) Word and Phrase Change can only expand one line`

---

## Syntax

### Control Line *(OS 2200 only)*

```
WC report
WC target,replace,[...,target,replace,]
```

| Field | Description |
|-------|-------------|
| `report` | Receiving report. See *Specifying Reports or Drawers to Process*. To specify a named report, display the target list report and enter `wc *name` — the `*` indicates a named report is being requested. |
| `target` | Word to locate. |
| `replace` | Word or words to replace the target with. Separate target and replace words with a comma and end the sequence with a comma. Multiple target/replace pairs may be entered. |

### Statement

```
@WDC,ic,id,ir,rc,rd,rr[,l,col,lab] .
```

| Field | Description |
|-------|-------------|
| `ic,id,ir` | Issuing report — the report containing the list of target words. See *Specifying Reports or Drawers to Process*. |
| `rc,rd,rr` | Receiving report — the report to scan for target words. |
| `l` | Line number in the receiving report at which to start changing words. |
| `col` | Column number in the receiving report at which to start changing words. |
| `lab` | Label to go to if no changes are made. |

---

## Word Change vs. Locate and Change

| Behavior | Locate and Change | Word Change |
|----------|------------------|-------------|
| Matches partial words | Yes — finds the target string even if part of a larger word | No — only matches whole words |
| Line overflow handling | Characters beyond the report/screen width are lost | Extra characters wrap to the next line (use `ADJ` to remove extra spaces) |

---

## Issuing Report Format

Follow these guidelines when creating the target (issuing) report:

- The report must include a heading divider line.
- Targets and replacement strings must be on tab lines.
- Targets may contain only alphanumeric characters (A–Z, 0–9), hyphens, and apostrophes. Replacement words may contain special characters, and more than one replacement word may be used.
- Targets start in column 2, followed by a comma, the replacement word(s), and a trailing comma.
- Enter one target per line.

---

## Examples

### Issuing Report

In this example, `information` is replaced by `information system`, and `cat` is replaced by `dog`:

```
. SAMPLE REPORT
*=========================
|information,information system,
|cat,dog,
```

*(where `|` represents a tab character)*

### @WDC Statement

Changes words in receiving report `12H0` using the word change list in issuing report `11H0`:

```
@wdc,0,h,11,0,h,12 .
```
