# IDAT — Iterative Date

## Overview

Generates Date function masks that can be saved, altered, and reused. With IDAT you can:

- Save parameters and options in a function mask and use them again.
- Recall a previously saved function mask instead of retyping options and parameters.
- Translate function masks into their equivalent statement formats.

The report you intend to process must reside in the current cabinet.

---

## Control Line Format

```
IDAT[*] [report,f,maskname,maskrep]
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `*` | Optional | Specifies that field names are used in place of column-character positions when a statement is produced. |
| `report` | Optional | Report to process. For more details, see *Specifying Reports or Drawers to Process*. |
| `f` | Optional | Report format in which to process data. Enables processing of fields beyond column 80 if those columns are not already on display. |
| `maskname` | Optional | Name of an existing or new function mask. If left blank, the mask is named when saved. Must be 1–12 characters, begin with a letter, and contain no spaces. |
| `maskrep` | Optional | Report containing previously saved function masks. Use when masks are stored in a report other than the one being processed. Cannot be specified if `maskname` is blank. |
