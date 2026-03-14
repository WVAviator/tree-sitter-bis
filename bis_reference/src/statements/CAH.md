# @CAH — Cache Report

*(Windows / Linux / UNIX only)*

## Overview

Use the Cache Report (`@CAH`) statement to load (cache) an entire report into memory for faster processing of operations such as searching and calculating.

If not enough memory is available to cache the report, the system processes the report as if the `@CAH` statement were not executed.

---

## Syntax

```
@CAH,c,d,r .
```

Where `c,d,r` is the report to cache.

---

## Guideline

Since the system uncaches the report if no one is using it and if the system becomes short of memory, execute the `@CAH` statement again if you are processing a report later in a run. If the report is already cached, the system ignores the `@CAH` statement.

---

## Example

This example loads all of report 3B0 into memory if the space required is available:

```
@cah,0,b,3 .
```
