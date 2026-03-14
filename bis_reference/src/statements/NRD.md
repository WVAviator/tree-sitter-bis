# @NRD — Network Read

## Overview

Reads a report from the remote site. Use [`@NET`](NET.md) (Network Sign-On) to connect to the remote site before using this statement.

---

## Syntax

```
@NRD,ic,id,ir,rc,rd,rr[,lab vmsg] .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `ic,id,ir` | Required | Issuing report on the remote site. If specifying a result, include the cabinet and drawer (e.g. `0,b,-2`). Must use cabinet number, drawer letter, and report number — names are not allowed. |
| `rc,rd,rr` | Required | Receiving report on the local site. If `rr` is left blank or set to `0`, the issuing report is returned as a `-0` result. Must use cabinet number, drawer letter, and report number — names are not allowed. |
| `lab` | Optional | Label to branch to if the remote site returns an error. |
| `vmsg` | Optional | Variable to capture an 80-character system message if control branches to `lab`. |

---

## Example

Read report `2B0` from the remote site and place the data into report `5B0` on the local site. Branch to label 99 on error:

```
@nrd,0,b,2,0,b,5,099 <error>s80 .
```
