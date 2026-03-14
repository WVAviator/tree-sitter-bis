# GTAD

## Overview

Adjusts the location of text on a chart display by moving text as specified.

Your terminal must be configured for graphics.

---

## Control Line Format

```
GTAD [report]
```

where `report` is the report in the current cabinet containing graphics primitive code. Default = current report.

---

## Guidelines

- Use text strings exactly as they appear in the graphics primitive code. Text in the graphics primitive code is located between apostrophes.
- The command does not move partial character strings.
