# PLOTIT

*(2200 only)*

## Overview

Prints a chart at a remote plotter. If the destination station is busy, a message offers the option to retry.

### Prerequisites

- The plotter must be assigned to the system and must have automatic paper feed.
- PLOTIT may require a special site setup. Administrators can refer to `HELP,COORD,GRAPHICS` for information on special setups.

---

## Syntax

First save the graphics primitive code as a report, then enter the following on the control line:

```
PLOTIT[,plotstation,sendingstation]
```

### Parameters

| Field | Description |
|-------|-------------|
| `plotstation` | Number of the station to send the graphic to. |
| `sendingstation` | Number of the station from which to execute the PLOTIT command. |
