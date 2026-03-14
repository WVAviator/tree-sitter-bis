# @RTN — Return Remote

## Overview

Use the `@RTN` statement to return a report from a remote site to the local (calling) site as a `-0` result.

> **Note:** Though `@RTN` and [`@RRN`](RRN.md) are still available, it is recommended to use the following network statements instead for added flexibility and compatibility with future software levels: [`@NET`](NET.md), [`@NOF`](NOF.md), [`@NRD`](NRD.md), [`@NRM`](NRM.md), [`@NRN`](NRN.md), [`@NRT`](NRT.md), and [`@NWR`](NWR.md).

- *(Windows / Linux / UNIX)* The user running the calling run (from the `@RRN` statement) receives a result as a station-to-user message. `@RTN` can only be used in a background run or a remote run. The remote or background run continues at the instruction following the `@RTN` statement.
- *(2200 only)* The user running the calling run (from the `@RRN` statement) receives a result. `@RTN` can only be used in a remote run. The remote run terminates after sending the result back to the run that executed `@RRN`.

---

## Syntax

```
@RTN,rmc,rmd,rmr[,rmf] lc,lcpw,ldr[,lf] .
```

### Parameters

| Field | Platform | Required | Description |
|-------|----------|----------|-------------|
| `rmc,rmd,rmr` | All | Required | Remote report to return. |
| `rmf` | 2200 only | Optional | Remote report format. |
| `lc` | All | Required | Local cabinet. |
| `lcpw` | All | Required | Local cabinet password. |
| `ldr` | All | Required | Local drawer. |
| `lf` | 2200 only | Optional | Local report format. |

---

## Guidelines

*(2200 only)*

- Do not place other statements on the same line after `@RTN` — any statements following it on the same line will be ignored. Put the next statement on a new line.
- Use the `rmf` and `lf` subfields to specify report formats to condense the amount of information sent from the remote site to the local site. Only the columns specified in the format are sent, and are received at the local site in the same format as sent.

---

## Examples

*(Windows / Linux / UNIX)* Sends report `2B0` back to the user who started the `@RRN` statement:

```bismapper
@rtn,0,b,2 .
```

*(2200)* Sends report `2B0` back to the user who started the `@RRN` statement:

```bismapper
@rtn,0,b,2 0,open,b .
```

---

## See Also

- [`@RRN`](RRN.md) — Remote Run
- [`@NET`](NET.md), [`@NOF`](NOF.md), [`@NRD`](NRD.md), [`@NRM`](NRM.md), [`@NRN`](NRN.md), [`@NRT`](NRT.md), [`@NWR`](NWR.md) — Network Statements (recommended alternatives)
