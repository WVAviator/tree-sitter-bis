# CVT and CVZ — Convert Variable Table

## Overview

**CVT** converts numbered variables (e.g., `V1`) to named variables (e.g., `<name>`), or vice versa using the `N` option. It uses a previously built variable table at the end of the run control report.

**CVZ** converts all numbered variables to three-character zero-padded variables (e.g., `V1` → `V001`).

> For detailed help, enter `cvt,help` or `cvz,help` on the control line.

---

## Syntax

```
CVT[,o]
CVZ
```

### Option

| Option | Description |
|--------|-------------|
| `N` | Converts named variables to numbered variables (reverse of the default direction). |

> **Caution:** The `N` option converts all occurrences of strings matching the named variable pattern (`<...>`), line by line, even if the string is not intended to be a variable — for example, `<COMMENT>` in a comments area of your run.
