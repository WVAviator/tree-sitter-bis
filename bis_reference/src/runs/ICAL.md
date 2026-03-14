# ICAL — Iterative Calculate

## Overview

Generates Calculate equation sets that can be saved, altered, and reused. With ICAL you can:

- Save equation sets in the mask and use them again.
- Recall a previously saved equation set instead of retyping it.
- Translate function masks into their equivalent statement formats.

ICAL processes equation sets — the complete set of options, headings, and parameters from a completed mask.

- *(2200)* The report you intend to process must reside in the current cabinet.
- *(Windows / Linux / UNIX)* A report must be on display.

---

## Control Line Format

**2200:**
```
ICAL[*] [report,f,maskname,maskrep]
```

**Windows / Linux / UNIX:**
```
ICAL[* eqnm,r]
```

### Parameters

| Field | Platform | Required | Description |
|-------|----------|----------|-------------|
| `*` | All | Optional | Specifies that field names are used in place of column-character positions when a statement is produced. |
| `report` | 2200 | Optional | Report to process. For more details, see *Specifying Reports or Drawers to Process*. |
| `f` | 2200 | Optional | Report format in which to process data. Enables processing of fields beyond column 80 if those columns are not already on display. |
| `maskname` | 2200 | Optional | Name of an existing or new function mask. If left blank, the mask is named when saved. Must be 1–12 characters, begin with a letter, and contain no spaces. |
| `maskrep` | 2200 | Optional | Report containing previously saved function masks. Use when masks are stored in a report other than the one being processed. Cannot be specified if `maskname` is blank. |
| `eqnm` | Windows / Linux / UNIX | Optional | Name of an existing or new equation set. If left blank, the equation set is named when saved. Must be 1–12 characters, begin with a letter, and contain no spaces. |
| `r` | Windows / Linux / UNIX | Optional | Report containing predefined CAL equations. Specify when equations are in a report other than the data report on display. Cannot be specified if `eqnm` is blank. |
