# STOP

> **OS 2200 only**

## Overview

Stops any or all background runs being executed under your user ID. Sends an abort message to the run in the same way a user might press the abort key to stop an active foreground run. The system terminates the specified background run.

To register a background run with an abort routine, use the [`@RAR`](../statements/RAR.md) (Register Abort Routine) statement.

---

## Syntax

```
STOP[,runname,sn]
```

### Parameters

| Field | Description |
|-------|-------------|
| `runname` | Name of the background run to abort. |
| `sn` | Station number that started the run. |
