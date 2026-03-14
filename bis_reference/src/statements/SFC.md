# @SFC — Set Format Characters

## Overview

Use the `@SFC` statement to set a customized report format for a following output display, such as that created by a [`@DSP`](DSP.md) (Display Report) or [`@OUM`](OUM.md) (Output Mask) statement. You can also use it to select columns to print the next time you call [`@AUX`](AUX.md) (Auxiliary) or [`@PRT`](PRT.md) (Print).

> **Note:** `@SFC` sets up the format for your current `-0` result or the report specified in `c,d,r`, which then becomes the current result.

---

## Syntax

```
@SFC[,c,d,r] vld .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `c,d,r` | Optional | Report on which to set the format. Default = `-0`. If specified, the report becomes the current `-0` result. |
| `vld` | Required | Characters identifying the columns to include in the format. Can be a literal, constant, variable, or any combination. Use any non-space characters to mark columns to include; use spaces to exclude columns from the display. |

---

## Guidelines

- You can restore a format previously saved with an [`@LFC`](LFC.md) (Load Format Characters) statement, or build your own customized format with `@SFC`.
- Process the newly formatted `-0` result before creating another `-0` result.
- When a new `-0` result is created in a different cabinet and drawer, the system clears the format set by `@SFC`. A new `-0` result in the same cabinet and drawer retains the format, consistent with manual operations.

---

## Examples

Displays columns 1–10 and 16–20 of the current result (spaces indicate excluded columns):

```bismapper
@sfc 'xxxxxxxxxx     xxxxx' .
@dsp,-0 .
```

Captures the current format with `@LFC`, performs other processing, then restores the format before redisplaying:

```bismapper
@lfc <format>s80 .
.
. (other processing)
.
@sfc <format> .
@dsp,-0 .
```

---

## See Also

- [`@LFC`](LFC.md) — Load Format Characters
- [`@DSP`](DSP.md) — Display Report
- [`@OUM`](OUM.md) — Output Mask
- [`@AUX`](AUX.md) — Auxiliary
- [`@PRT`](PRT.md) — Print
