# WL and @WDL — Word Locate

> **Note (Linux / UNIX):** This command may not be available as it is part of the Word Processing feature and might not be installed at your site. See your administrator if the command cannot be invoked.
>
> **Note:** The `WL` manual function is only available on the OS 2200 system.

## Overview

Locates words from a list of target words (maximum of 200) in a receiving report. The source list may come from an issuing report or be entered directly on the control line.

- The **manual function** displays the receiving report at the line where the match was found and places the cursor just ahead of the found word.
- The **statement** loads variables with the line number and column number where the first match occurs.

To continue locating the target(s), press **F1** or type `rsm` and transmit.

For the manual function: when using a target list in a report, the report containing the target list must be on display; when entering targets on the control line, the receiving report must be on display.

*(Windows / Linux / UNIX)* Strings of words on the same line can be located. Target words may contain spaces — a space does not stop the scan.

---

## Syntax

### Control Line *(OS 2200 only)*

```
WL report
WL target[,target,...,target]
```

| Field | Description |
|-------|-------------|
| `report` | Receiving report. See *Specifying Reports or Drawers to Process*. To specify a named report, display the target list report and enter `wl *name` — the `*` indicates a named report is being requested. |
| `target` | Word to locate. Separate multiple targets with commas. |

### Statement

```
@WDL,ic,id,ir,rc,rd,rr[,l,col,lab] vlno,vcol,vcolnxt .
```

| Field | Description |
|-------|-------------|
| `ic,id,ir` | Issuing report — the report containing the list of target words. See *Specifying Reports or Drawers to Process*. |
| `rc,rd,rr` | Receiving report — the report to scan for target words. |
| `l` | Line number in the receiving report at which to start locating words. |
| `col` | Column number in the receiving report at which to start locating words. |
| `lab` | Label to go to if no matches are found. |
| `vlno` | Variable to capture the line number where the word was located. |
| `vcol` | Variable to capture the column number where the word starts. |
| `vcolnxt` | Variable to capture the column number immediately following the word. |

---

## Word Locate vs. Locate

The **Locate** command finds a target string wherever it appears, even as part of a larger word. The **Word Locate** command only matches whole words — it will not find the string if it is part of another word.

---

## Issuing Report Format

Follow these guidelines when creating the target (issuing) report:

- The report must include a heading divider line.
- Targets must be on tab lines.
- Targets may contain only alphanumeric characters (A–Z, 0–9), hyphens, and apostrophes.
- Targets start in column 2, one word per line.

---

## Examples

### WL Manual Function *(OS 2200)*

Locates the words `information` and `cat` in the receiving report, displaying it at the line of each match with the cursor placed just ahead of the found word:

```
. SAMPLE REPORT
*=========================
|information
|cat
```

*(where `|` represents a tab character)*

### @WDL Statement

Locates words in receiving report `12H0` using the word locate list in issuing report `10H0`. Captures the line number in `<line>`, the starting column in `<column>`, and the column immediately after the word in `<colnext>`:

```
@wdl,0,h,10,0,h,12 <line>i5,<column>i3,<colnext>i3 .
```
