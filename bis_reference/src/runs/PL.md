# PL (Phrase Locate)

*(2200 only)*

## Overview

Locates a word or sequence of words within a report. Similar to the Locate command, but unlike Locate, PL does not match words that are contained within other words.

> **Note:** Use PL on adjusted reports unless you used the Return key when typing text and did not let a word wrap from line to line.

---

## Syntax

```
PL tgtstring[,o]
```

### Parameters

| Field | Description |
|-------|-------------|
| `tgtstring` | Word or sequence of words (separated by spaces) to locate. May contain alphanumeric characters A–Z and 0–9, hyphens, and apostrophes. All other special characters are ignored. |
| `o` | Options field. See [Options](#options). |

---

## Options

| Option | Description |
|--------|-------------|
| `B` | Stops the scan after the first find in each report (for multiple reports). |
| `Ln` | Scans only the first `n` lines in each report. Overridden by the `S` option if both are used. |
| `Q[n]` | Quick locate — scans only the first `n` lines in each report (default = 50) and displays each report at line 1 rather than the line where the phrase was found. If used with `S`, the line number in `S` overrides the line count in `Q`, but `Q`'s display behavior (showing at line 1) is unaffected since each report is only scanned once. |
| `Rx-y` | Scans a range of reports within the same drawer as the displayed report, from report `x` to report `y`. Skips reports with standard, user, or department read passwords, but not those protected with your own password. |
| `S[n]` | Starts the scan at the first line on display, or at line `n` if specified. Overrides the `L` option. See also the `Q` option. |

---

## Outcome

The report is displayed at the line where the match was found, with the cursor placed just ahead of the first word of the phrase. To continue locating the phrase, press **F1** or type `rsm` and transmit.

PL does not locate single words that wrap from one line to the next. It does locate phrases that wrap if a word in the phrase ends in the last column on display (or is followed by at least one space) and the next word continues on the next line.

---

## Guidelines

If using PL in a word processing report, adjust the report first. When finished locating phrases, adjust the report again to realign text within the margins.
