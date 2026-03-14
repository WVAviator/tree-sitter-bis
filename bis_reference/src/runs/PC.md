# PC (Phrase Change)

*(2200 only)*

## Overview

Locates a word or sequence of words and changes it to a specified replacement string. Similar to the Locate and Change command, but does not match words that are contained within other words.

If a change causes a line to expand beyond the allowed report width, an extra line is added for the extra characters. In reports wider than the screen, extra characters are moved into non-displayed columns.

---

## Control Line Format

```
PC tgtstring,replstring,[o]
```

| Field | Description |
|-------|-------------|
| `tgtstring` | Word or sequence of words (separated by spaces) to locate. May contain only alphanumeric characters A–Z and 0–9, hyphens, and apostrophes. All other special characters are ignored. |
| `replstring` | Word or sequence of words (separated by spaces) that replaces the target phrase. |
| `o` | The `Rn` option specifies the report number to process (must be in the same drawer as the report on display). Cannot be used from a result. |

---

## Guidelines

- The Phrase Change command is not available in interactive word processing. Press the Exit WP key to exit interactive word processing before using `PC`.
- Use `PC` on adjusted reports, unless you used the Return key when typing text and did not allow text to wrap line to line.
- The command does not change words that wrap from one line to the next. However, it does change phrases that wrap if a word in the phrase ends in the last column on display (or is followed by at least one space on the line) and the next word continues on the next line.
