# ADON, ADTO, and @ADD — Append Report

## Overview

Use the **Add On (ADON)** function to append a report (the issuing report) to the end of the displayed report (the receiving report).

Use the **Add To (ADTO)** function to append the displayed report (the issuing report) to the end of another report (the receiving report).

Use the **`@ADD` statement** to append one report (the issuing report) to another report (the receiving report).

For the Append Report manual functions, a report must be on display.

Executing this command causes the following actions to occur:

- The command creates a result containing the combined reports.
- If the issuing and receiving drawers are of unequal line length, the result contains the line length of the receiving drawer. The command either fills the lines of the issuing report with spaces or truncates them.

---

## Syntax

### Append Report Control Line Format

```
ADON report
ADTO report
```

Where `report` is the report to append to the beginning or end of the displayed report, depending on the command you use. For more details, see Specifying Reports or Drawers to Process.

### Append Report Statement Format

```
@ADD,ic,id,ir,rc,rd,rr .
```

| Field | Description |
|-------|-------------|
| `ic,id,ir` | Issuing report. |
| `rc,rd,rr` | Receiving report. |

### Append Report Example

The first statement adds report 1B0 to the end of report 2B0. The second statement displays the -0 result.

```
@add,0,b,1,0,b,2 .
@dsp,-0 .
```

---

## ADD Run Statement

*(2200 only)*

Use the Append Report (`@ADD`) statement to append the issuing report to the end of the receiving report and create a result. If the issuing and receiving drawers are of unequal line length, the result contains the line length of the receiving drawer. The `@ADD` statement either fills the lines of the issuing report with spaces or truncates them.

### ADD Run Statement Format

```
@ADD,ic,id,ir,rc,rd,rr,o,vld .
```

| Field | Description |
|-------|-------------|
| `ic,id,ir` | Issuing report. |
| `rc,rd,rr` | Receiving report. |
| `o` | Options. |
| `vld` | Content of variable, literal, reserved word, or any combination of these to place on the added lines. (Used only with the `A` option.) |

> **Note:** When using the `A` option, if a predefined line number and `vld` are specified, then `vld` will be written to the receiving report.

### ADD Run Statement Examples

The following statement adds report 1B0 to the end of report 2B0:

```
@add,0,b,1,0,b,2 .
```

The following statement adds report 1B0 to the end of report 2B0 and adds 5 lines of predefined line 2 to the end of the result report:

```
@add,0,b,1,0,b,2,A(5+2) .
```

The following statement adds report 1B0 to the end of report 2B0 and excludes line types of asterisk and `a` from the result report:

```
@add,0,b,1,0,b,2,L(*a) .
```

The following statement adds report 1B0 to the end of report 2B0 while also including the headers from report 1B0 in the result report:

```
@add,0,b,1,0,b,2,I .
```

---

## ADON, ADTO, and ADD Run Statement Options

| Option | Description |
|--------|-------------|
| `A(n[+x])` | Adds `n` lines to the end of the combined reports. The `+x` is optional and specifies the predefined line type to add (from report 0 of the issuing report drawer). |
| `I` | Retains the headers of the issuing report in the result. The headers will immediately follow the data lines of the receiving report. |
| `L(x)` | Omits lines of type `x` from the result. You can use any line type here. For example, `L(*.a)` indicates that asterisk lines, period lines, and a-type lines are to be omitted from the result. |
