# @DSX — Display Report and Exit

## Overview

Displays a report and then exits the run. `@DSX` is equivalent to a [`@DSP`](DSP.md) (Display Report) statement followed by an [`@REL`](REL.md) statement.

---

## Syntax

```
@DSX,c,d,r[,l,tabp,f,,hold,msg] .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `c,d,r` | Required | Report to display. |
| `l` | Optional | Line number at which to start the report display. |
| `tabp` | Optional | Tab position after which to place the cursor. Use a negative number to move backwards. Maximum = `100`. Default (position `0`) is the Roll field on the control line. |
| `f` | Optional | Report format. Default = `0` (basic format). Omit if displaying a format defined with an [`@FMT`](FMT.md) or [`@SFC`](SFC.md) statement. |
| `hold` | Optional | Number of lines already displayed to hold on the screen. The requested report display begins on the first non-held line. |
| `msg` | Optional | Message to display on the control line. Enclose in apostrophes. The default tab position is home position (see `tabp`). **Windows / Linux / UNIX:** maximum = display width. **2200:** maximum = display width − 1. |

---

## Guidelines

- You can customize the report format by preceding `@DSX` with a [`@FMT`](FMT.md) (Format) or [`@SFC`](SFC.md) (Set Format Characters) statement.
- If an odd-numbered cabinet is specified, you will be unable to update the report.

---

## Examples

Display the current result, the renamed result `-3`, and report `2B0`, then exit the run:

```
@dsp,-0 .
@dsp,-3 .
@dsx,0,b,2 .
```

Display format `5` of report `1D0` starting at line `3`, with a message:

```
@dsx,0,d,1,3,,5,,,' This run has finished processing. '
```
