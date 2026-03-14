# RETR and @REH (Retrieve Report from History)

*(2200 only)*

## Overview

Retrieves a version of a report that existed at the time of the last purge or merge process. Especially useful if a report was accidentally deleted.

If the needed version cannot be retrieved, contact your administrator — an earlier version may still be recoverable.

The command creates a result containing the retrieved report.

---

## Manual Function Syntax

```
RETR
```

---

## Statement Syntax

```
@REH,c,d,r[,lab] .
```

### Parameters

| Field | Description |
|-------|-------------|
| `c,d,r` | Report to retrieve. See Specifying Reports or Drawers to Process. |
| `lab` | Label to go to if an error occurs. If omitted and an error occurs, the run fails. |

---

## Reserved Words

If the run continues at the label, `STAT1$` contains one of the following error codes:

| Code | Description |
|------|-------------|
| `4` | Drawer was added since last purge — prior version does not exist. |
| `13` | Prior version does not exist. |
| `16` | Internal software error. |
| `17` | Specified MAPPER file is being merged. |

---

## Example

Retrieve report `2A0`, going to label `99` in case of error:

```
@reh,0,a,2,099 .
```
