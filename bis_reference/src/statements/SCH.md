# @SCH — Schedule Run Statements

> *Windows / Linux / UNIX only*

## Overview

Use the `@SCH` statement to establish a time for the execution of a specified statement. The operation is queued on the system but does not start until the specified date and time. The `@SCH` statement validates the date and time fields before scheduling.

`@SCH` can queue any of the following statements for execution at a later time:

- [`@AUX`](AUX.md) — Auxiliary
- [`@BR`](BR.md) — Background Run
- [`@PRT`](PRT.md) — Print
- [`@RRN`](RRN.md) — Remote Run
- [`@SEN`](SEN.md) — Send Report
- [`@SNU`](SNU.md) — Send Report to User
- [`@STR`](STR.md) — Start

---

## Syntax

```
@SCH[,date,time] rst .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `date` | Optional | Date to schedule the queuing function in `YYMMDD` (`DATE1$`) format. Default = current date. |
| `time` | Optional | Time of day to schedule the queuing function in `HHMMSS` format. Default = current time. |
| `rst` | Required | Statement to queue: `AUX`, `BR`, `PRT`, `RRN`, `SEN`, `SNU`, or `STR`. |

---

## Guidelines

Scheduled runs do not always start at the exact scheduled time. A scheduled run begins when the system clock is greater than or equal to the scheduled time, plus the elapsed time for the system to search its queues for runs to execute. Contact your administrator for more information on scheduling background runs.

---

## Examples

Schedules the current `-0` result to be printed on the current date at 10:00 p.m.:

```bismapper
@sch,,220000 prt,-0 .
```

Schedules the background run `STATUS`, with input data `jun` and `monthly`, for execution at 7:00 p.m. on November 3, 1996:

```bismapper
@sch,961103,190000 br status,jun,monthly .
```

---

## See Also

- [`@AUX`](AUX.md) — Auxiliary
- [`@BR`](BR.md) — Background Run
- [`@PRT`](PRT.md) — Print
- [`@RRN`](RRN.md) — Remote Run
- [`@SEN`](SEN.md) — Send Report
- [`@SNU`](SNU.md) — Send Report to User
- [`@STR`](STR.md) — Start
- [`@RS`](RS.md) — Run Status
