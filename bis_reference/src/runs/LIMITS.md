# LIMITS

Displays the highest report number allowed and the maximum number of lines per report allowed for the current cabinet and drawer, as determined by the administrator.

---

## Syntax

```
LIMITS[,ALL]
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `ALL` | Optional | Administrators only. Displays limits for all reports on the system. Use sparingly — this parameter involves high overhead. |

---

## Outcome

If a report was on display, a message is shown on the control line:

**Windows / Linux / UNIX:**
```
Highest Report = nnnn  Lines/Report = nnnnn
```

**2200:**
```
Highest Report = nnnn  Largest Report = nnnnnn  Result = nnnnnnn
```

Press **Resume** to display a table showing the limits for the entire cabinet.

If no report was on display, a table is displayed immediately showing the limits for the current cabinet.

**2200 — example output:**

| Drawer | Highest Report | Largest Report | Largest Result |
|--------|---------------|----------------|----------------|
| B | 2000 | 131070 | 262141 |
| C | 2000 | 131070 | 262141 |
| D | 2000 | 131070 | 262141 |
| E | 2000 | 131070 | 262141 |
| F | 2000 | 109543 | 262141 |
| G | 0 | 0 | 0 |
| H | 2000 | 131070 | 262141 |
| I | 2000 | 109543 | 262141 |

**Windows / Linux / UNIX — example output (cabinet 0):**

| Drawer | Highest Report | Lines per Report | Lines per Result |
|--------|---------------|-----------------|-----------------|
| B | 2000 | 64000 | 20000000 |
| C | 2000 | 64000 | 20000000 |
| D | 2000 | 64000 | 20000000 |
| E | 2000 | 64000 | 20000000 |
| F | 2000 | 64000 | 16268556 |
| G | 0 | 0 | 0 |
| H | 2000 | 64000 | 20000000 |
| I | 2000 | 64000 | 4269282 |
