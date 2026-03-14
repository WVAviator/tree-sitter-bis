# DIAG — Generating Diagnostic Reports

## Overview

Generates reports containing detailed script information. When the script is in error mode (processing inside an `@RER` routine), `DIAG` reports any error information captured at the time of the error; each section heading clearly indicates if the information was derived from error capture data.

---

## Syntax

```
@ DIAG,c,d[,lab] o[,levels,lines] .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `c,d` | Required | Cabinet and drawer to receive the data. Returned as a `-0` result. |
| `lab` | Optional | Label to branch to if an error condition is encountered. |
| `o` | Required | One or more options specifying what diagnostic information to generate. At least one option must be specified. See [Options](#options). |
| `levels` | Optional | Number of call levels to process for options `R` and `V`. Processes from the current call level down to level zero. Default = `1`. |
| `lines` | Optional | Number of lines to dump from each renamed report when the `R` option is specified. Default = no dump. Maximum = 5,000 lines per report. |

---

## Options

| Option | Platform | Description |
|--------|----------|-------------|
| `A` | All | All available information for all options. |
| `C` | All | Call and RSR stack information. |
| `G` | All | General information. |
| `I` | 2200 | Index of the Session Global Report Table (names of reports in Session Global slots). |
| `J` | 2200 | Jump History information. Enabled by the `@RER` option. |
| `N` | All | Narrow display — limits variable dump to an 80-column report even if the output report supports 132 columns. |
| `R` | All | Renamed report information, with optional report dump if `lines` is non-zero. |
| `S` | All | Dumps a segment of the errored script: 10 lines before and 10 lines after the errored line. |
| `V` | All | Dumps global and local variables. In an `@RER` routine, dumps local variables captured at the time of the error if access is allowed. Access is permitted if: the `@RER` routine is at the same call level as the error, or the executing user-id has RDB access to the errored run control report. |

---

## Result Structure

The diagnostic result is organized into labeled sections corresponding to the requested options:

```
.DATE 03 JAN 05 12:39:59 RID MAPPER
.Diagnostic Information
*=================================================
.----- General Information -----------------------
** G option information is placed here **
.----- Failing Script Dump -----------------------
** S option information is placed here **
.----- Call Stack Information --------------------
** C option information is placed here **
.----- Jump History ------------------------------
** J option information is placed here **
.----- Local Variables ---------------------------
** V option information is placed here **
.----- Rename Information ------------------------
** R option information is placed here **
```
