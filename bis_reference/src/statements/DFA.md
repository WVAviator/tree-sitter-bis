# @DFA — Defer Additive

> **2200 only.**

## Overview

Adds a report to an existing deferred-update list, or creates a new one. Updates are held until a [`@CMU`](CMU.md) (Commit Updates) or [`@DCU`](DCU.md) (Decommit Updates) statement is encountered.

> See [`@DFU`](DFU.md) (Defer Updates) for background and guidelines.

---

## Syntax

```
@DFA,c,d,r[,timeout,lab] .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `c,d,r` | Required | Report on which to defer updates. Subject to the same total report limits as `@DFU`. |
| `timeout` | Optional | Seconds to wait for the update lock to become available. Default = `0` (indefinite wait). Specify `-1` to return immediately without waiting. |
| `lab` | Optional | Label to branch to if the lock cannot be acquired. If omitted and the request fails, the script errors. |

---

## Behavior

On success, execution continues at the next statement with `STAT1$=0`.

### Return Values

| Condition | STAT1$ | STAT2$ | STAT3$ |
|-----------|--------|--------|--------|
| Success | `0` | `0` | `0` |
| Timeout | `1` | `MGUPIN` | Unit # |
| Deadlock | `2` | `MGDEAD` or `MGAUDT` | Unit # |
| Other error | `3` | `MGxxxx` | `0` |
| Stall | `4` | `MGSTAL` | `0` |

---

## Guidelines

- The first deferred update in a sequence may be `@DFU` or `@DFA`; all subsequently deferred updates must use `@DFA`.
- `@DFA` attempts on a result or an already-locked report are silently ignored.
- A station abort condition (kill, message wait) will penetrate a wait-for-update and abort the script (`MGABRT`).

### Status Code Notes

| Status | Meaning | Recommended Action |
|--------|---------|-------------------|
| `MGUPIN` | Target report is locked for update by another unit (typical timeout). | Do not retry — retrying defeats deadlock detection and is likely futile. |
| `MGDEAD` | Waiting for the requested lock would create a deadlock. | Decommit all updates made so far and start over. Do not retry this lock. |
| `MGAUDT` | System has been waiting to start a Cycle or Pack while this script held a lock, and has waited too long. Subsequent requests will likely fail with this same status. | Decommit all updates made so far and start over. |
| `MGSTAL` | Initial `@DFA` request was made while deferred updates are suspended. | Retry later — this is the one status where retrying is appropriate. |
| Other (`MGxxxx`) | Miscellaneous errors (illegal operations, Index file full, Update file full, etc.). | Evaluate based on specific code. |
