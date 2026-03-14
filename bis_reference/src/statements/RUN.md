# @RUN — Execute a Script

## Overview

Use the `@RUN` statement to terminate the current script and start another script on the same station. You can also use `@RUN` to start Business Information Server manual functions.

- To start scripts manually, type the name of the script on the control line and transmit, or select the script from the **Apps** menu.
- To start functions manually, type the function call on the control line and transmit, or select the function from the **Select Task** menu.

---

## Syntax

```
@RUN {script[,vld] | "cmd"} .
```

### Parameters

| Field | Platform | Required | Description |
|-------|----------|----------|-------------|
| `script` | All | Optional* | Registered name of the BIS script or JavaScript to start. |
| `vld` | All | Optional | Variables, literals, reserved words, constants, or any combination thereof, to transfer to the script. When the script starts, it uses their values to initialize variables through `INPUT$`. Up to 80 items can be identified. Maximum total characters: ~920 (Windows / Linux / UNIX) or ~1280 (2200). The scan is terminated after a space. |
| `"cmd"` | All | Optional* | Command (BIS manual function call) to execute, including any input parameters, enclosed in quotation marks (`"`). If the function requires input parameters, separate them with commas. *(2200 only)* Not available in limited character set (LCS) run control reports. |

*Either `script` or `"cmd"` must be provided.

---

## Guidelines

- You can identify up to 80 variables to capture in the started script with `INPUT$`.
- If the script being started uses input variables as parameters for report processing commands (such as Binary Find or Search), use the [`@LDV`](LDV.md) statement with the `P` option beforehand to pack the variables. If the name of the script to start is itself in a variable, pack that variable as well.
- Do not place other statements on the same line after `@RUN` — any statements following it on the same line will be ignored.
- `@RUN` does not clear a [`@LNK`](LNK.md) (Link to Another Script) statement.
- *(Windows / Linux / UNIX)* You cannot execute a JavaScript script using `@RUN` if the script containing the `@RUN` statement was itself started with [`@LNK`](LNK.md).

---

## Example

Starts the `TEST` script and sends `v1`, `v2`, and the character string `SAM` to it. The `TEST` script initializes these as variables using `INPUT$`. The current `-0` result is also available to the script:

```bismapper
@run test,v1,v2,SAM .
```

---

## Starting Chart Scripts Using RUN

You can start chart scripts using `@RUN`. Set up properly formatted input data for the chart script in the output area, place it in a result using [`@BRK`](BRK.md), then execute the chart scripts using the current result (`-0`).

You can also use a script to write data to a chart report by reading lines from a standard report (e.g. with [`@RDC`](RDC.md)) and writing them to a chart report in the proper format using [`@WRL`](WRL.md).

Chart scripts can also be called using [`@LNK`](LNK.md).

All parameters above the heading divider line are optional, except for the `CAPTIONS` parameter in line and bar charts.

### Chart Script Syntax

```
@RUN chartscript,report[,dev,sn,psiz?,transpcy?,script,vld] .
```

For a description of subfields and more information on chart scripts, see [CHART](../runs/CHART.md).

### Chart Script Example

Starts the `LINEG` script to make a line chart using data in report `51B` of the current cabinet. After displaying the graph and after the user resumes the script, starts the `TEST` script and sends values `1`, `2`, and `3` to it:

```bismapper
@run lineg,51b,,,,,test,1,2,3 .
```

---

## Starting the MULTI Script Using RUN

*(2200 only)*

Use the `MULTI` script to display two, three, or four charts on the screen and plot them.

### MULTI Syntax

```
@RUN MULTI,q[,f,sn,psiz?,transpcy?],c,d,r,c,d,r[,c,d,r,..] .
```

---

## See Also

- [`@LNK`](LNK.md) — Link to Another Script
- [`@LDV`](LDV.md) — Load Variable
- [`@BRK`](BRK.md) — Break
- [`@RDC`](RDC.md) — Read Continuous
- [`@WRL`](WRL.md) — Write Line
- [CHART](../runs/CHART.md) — Chart Scripts
