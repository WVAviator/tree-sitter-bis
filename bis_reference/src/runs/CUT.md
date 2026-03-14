# CUT

> **2200 only.**

## Overview

Transfers sections of data from one report to another, or within the same report. Extracts data and enables pasting into the same or a different report, even across cabinets and drawers. Cut data can also be moved (cut and re-inserted) or deleted.

> **Note:** The Cut command applies only if the Word Processing feature is available.

Since the Cut command creates a result, use the `REP` command to make changes permanent in the original report.

---

## Control Line Format

```
CUT [report]
PASTE [report]
PASTE C npsw report
```

| Field | Description |
|-------|-------------|
| `report` | Report to cut from or paste into. |
| `npsw` | Cabinet number and cabinet password (for cross-cabinet paste). |

### Control Line Behavior

| Entry | Behavior |
|-------|----------|
| `CUT` | Displays the input screen. |
| `CUT report` (with a report on display) | Treats the requested report as the CUT RID and the displayed report as the PASTE RID. Enter `paste` after cutting. |
| `CUT report` (no report on display) | Enters cut control in the requested report. |
| `PASTE` (while under cut control) | Redisplays the CUT RID, now labeled as PASTE RID, ready for pasting. |
| `PASTE report` | Displays the specified report to paste into. |
| `PASTE C npsw report` | Displays a report in another cabinet to paste into. |

---

## Cut Control

Once a report is identified for cutting, you are **under cut control**. Only Cut directives and the following manual functions are available until you exit:

- `CHG` (Locate and Change) — control line format with parameters only; valid on LOOK result only
- `LOC` (Locate) — control line format with parameters only
- `REP` (Replace Report)
- `WC` (Word Change) — valid on LOOK result only
- `WL` (Word Locate)

To exit cut control at any time, press **Exit WP**. If called from interactive word processing, pressing Exit WP returns you to word processing at the line that was on display when Cut was invoked.

---

## Cut Directives

| Directive | Description |
|-----------|-------------|
| `CLR` | Clears all previous cuts. |
| `DEL` | Deletes cut data from the report. Since Cut creates a result, the original report is not updated until `REP` is used. |
| `LOOK` | Displays a result containing only the cut data. From the LOOK result, you can then use: `DEL`, `CUT`, `PASTE`, `PREP,x`, `CHG`, `WC`, or Exit WP (to build a standard result). |
| `LOOKX` | Displays cut data and automatically exits cut control. No need to press Exit WP before using another command. |
| `MOVE` | Copies cut data to another location in the same report and removes it from the original location. To move to another report, paste into the target report, `REP` to make it permanent, then `DEL` and `REP` in the original. |
| `PASTE` | Places cut data into a report. To paste in the same report: type `paste`, press Transmit, move cursor just beyond the insertion point, press Transmit. To make permanent: type `rep` (replaces PASTE RID with PASTE RESULT) or press Exit WP and use Replace/Duplicate Report. |
| `PREP,x` | Prepares the LOOK result for word processing, inserting control character `x` on each line. |
| `RECUT` | Clears the most recent cut. Enter repeatedly to clear successive cuts (most recent first). Similar to `CLR` but clears one cut at a time. |
| `REPX` | Replaces the report and automatically exits cut control. No need to press Exit WP before using another command. |

---

## How to Cut Data

1. Enter cut control for the desired report.
2. Place the cursor on the first line to cut and press **Transmit**.
3. Position the cursor just beyond the end of the data to cut and press **Transmit**.
4. Repeat to identify up to **10 cut items**. A cut item can be a single character or multiple lines.

To cut from a point to the end of the report, mark only the beginning.

To cut whole lines, place the cursor at the start of the first line, press Transmit, then position the cursor in column 1 of the line *after* the last line to cut and press Transmit.

**Fast multi-block cutting:** Enter `cut x` where `x` is a special character not present in the data (e.g., `*` or `;`). This defines `x` as a cut marker. Type the marker at the beginning and end of each block to cut, pressing Transmit after marking each screen. Press Transmit before rolling the report to preserve marks.

---

## How to Paste Data

**To paste an entire report into another** — no cuts needed. Display the source report and enter `paste report`.

**To paste in the same report** — type `paste`, press Transmit, move the cursor just beyond the insertion point, press Transmit.

**To paste into another report** — enter `paste report` (including cabinet number if needed). The PASTE report displays at line 1. Roll if necessary, then paste as above.

**Cursor position effects:**
- Column 1 or last column: data is inserted as whole lines.
- Any other column: the existing line is split at that column and cut lines are inserted at that position.

**To paste into another cabinet** using password access:
```
paste c npsw report
```

| Field | Description |
|-------|-------------|
| `C` | Cabinet Switch call. |
| `npsw` | Cabinet number and password. |
| `report` | Report to paste into. |

Only whole lines are pasted — if part of a line was cut, the whole line is pasted and unused characters are left blank. In word processing reports, the next `ADJ` command removes extra spaces.

---

## Cut Control Line Indicators

The rightmost field of the control line shows the current state:

| Indicator | Meaning |
|-----------|---------|
| `CUT RID` | Cutting from the report on display. |
| `CUT RESULT` | Cutting from a result, or result after deleting. |
| `LOOK RESULT` | Result showing cut blocks of data. |
| `MOVE RID` | Moving with the report on display. |
| `MOVE RESULT` | Result after a move operation. |
| `PASTE RID` | Pasting into the report on display. |
| `PASTE RESULT` | Pasting into a result, or result after pasting. |
