# @LFC — Load Format Characters

## Overview

Captures the format of the current report or result (`-0`) into a variable. Useful when the run user may have started the run with a displayed report that was shifted or reformatted using the Create Temporary Format (`VIEW`) command.

The statement loads the variable with a string of `X` and blank characters — `X` indicates a displayed report column, and a blank indicates a column not displayed. This string is conceptually equivalent to the format line in report 0.

> **Note:** The run must be registered as format sensitive. Contact your administrator to register the run.

---

## Syntax

```
@LFC v .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `v` | Required | Variable to capture the format of the current result. |

---

## Guidelines

To redisplay a report in the format captured by `@LFC`, use the [`@SFC`](SFC.md) (Set Format Characters) statement before displaying the report.

---

## Example

Capture the format of the current result, perform other processing, then redisplay the report in the original format:

```
@lfc <format>s80 .
.
. (other processing)
.
@sfc <format> .
@dsp,-0 .
```
