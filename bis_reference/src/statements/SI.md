# @SI

> *2200 only*

## Overview

Use the `@SI` statement to start the printer at another station from within a run.

---

## Syntax

```
@SI[,lab] sn .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `lab` | Optional | Label to go to if the statement cannot build the station table. The `@SI` statement first attempts to build a station table if one does not exist. |
| `sn` | Required | Station number of the printer to start. |
