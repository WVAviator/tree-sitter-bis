# @NWR — Network Write

## Overview

Copies a local report to the remote site. Use [`@NET`](NET.md) (Network Sign-On) to connect to the remote site before using this statement.

---

## Syntax

```
@NWR,ic,id,ir,rc,rd,rr[,lab vmsg] .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `ic,id,ir` | Required | Issuing report on the local site. Must use cabinet number, drawer letter, and report number — names are not allowed. |
| `rc,rd,rr` | Required | Receiving report on the remote site. Must use cabinet number, drawer letter, and report number — names are not allowed. See [rr Values](#rr-values) for special entries. |
| `lab` | Optional | Label to branch to if the remote site returns an error. |
| `vmsg` | Optional | Variable to capture an 80-character system message if control branches to `lab`. |

### `rr` Values

| Entry | Description |
|-------|-------------|
| `0` | Duplicates the report within the drawer. `STAT2$` contains the new report number. |
| Positive report number | Replaces the receiving report with the issuing report. |
| `-0` through `-16` | Creates a renamed result that can be used with [`@NRN`](NRN.md) (Network Run). |

---

## Examples

Write report `2B0` from the local system to report `3B0` on the remote system. Branch to label 99 on error:

```
@nwr,0,b,2,0,b,3,099 <e>s80 .
```

Send report `1C0` to the remote system as renamed result `-1`, execute a [`@MCH`](MCH.md) (Match) against report `1D0` on the remote system, rename the result `-2`, then read it back locally and display it:

```
@nwr,0,c,1,0,c,-1,099 v1s80 .
@nrn,099 "@mch,0,d,1,-1 '' 12-9,31-8 ,1,a 2-9,33-8 ,1,a rnm -2" v2s80 .
@nrd,0,c,-2,0,c,,099 v3s80 .
@dsp,-0 .
```
