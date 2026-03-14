# @DIR — Directory

## Overview

Loads variables with information about a report, drawer, or cabinet name from the system directory. Can be used to validate a data name and determine what kind of data it represents (report, drawer, cabinet, or range of reports).

---

## Syntax

```
@DIR[,lab] name [vcabinet,vdrawer,vrpt,vhirptr,vsec,vscript] .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `lab` | Optional | Label to branch to if `name` is invalid. If omitted and the name is invalid, the script fails. |
| `name` | Required | Data name to look up. Typically a name from the System Directory. Can also be a standard report identifier in `rdc` format (e.g., `1b218` = report 1, drawer B, cabinet 218). |
| `vcabinet` | Optional | Variable to capture the cabinet number. |
| `vdrawer` | Optional | Variable to capture the drawer letter. |
| `vrpt` | Optional | Variable to capture the report number. |
| `vhirptr` | Optional | Variable to capture the higher report number if `name` represents a range of reports. Contains `-1` if `name` is a Namelist. |
| `vsec` | Optional | Variable to capture the drawer access permission for the executing user. Loaded with ` ` (no access), `R` (read only), or `W` (full write). |
| `vscript` | Optional | Variable to capture the cabinet access permission for the executing script. Loaded with ` ` (no access), `R` (read only), or `W` (full write). |

> If `vdrawer`, `vrpt`, or `vhirptr` does not apply to the given `name`, the variable contains `0` for `I`-type variables *(Windows / Linux / UNIX)* or spaces *(2200)*. For example, `vhirptr` is only populated when `name` represents a range of reports.

---

## Reserved Words

If `name` is invalid and execution continues at `lab`, `STAT1$` contains one of the following error codes:

| Code | Description |
|------|-------------|
| `1` | Data name was not found in the system directory. |
| `2` | Data name does not begin with an alphabetic character (A–Z). |
| `3` | *(Windows / Linux / UNIX)* Data name contains an invalid character (`^`, `;`, `/`, tab). *(2200)* Data name contains no alphanumeric characters (A–Z or 0–9). |
| `4` | Data name contains more than 16 characters. |

---

## Examples

### Looking Up a Named Report

Loads variables with information about the name `order-status`. Branches to label `099` if the name does not exist.

```
@dir,099 order-status <cabinet>i4,<drawer>h1,<report>i4,<hireport>i4 .
```

| Component | Meaning |
|-----------|---------|
| `099` | Branch to label 99 if `order-status` is not found |
| `order-status` | Name to look up |
| `<cabinet>i4` | Receives the cabinet number |
| `<drawer>h1` | Receives the drawer letter |
| `<report>i4` | Receives the report number |
| `<hireport>i4` | Receives the upper range report number (if applicable) |

### Looking Up a System-Defined Name

Loads variables with information about the system-defined name `2BO`, including security and script access. Branches to label `0099` if the name is not defined.

```
@dir,099 2BO <cabinet>i4,<drawer>h1,<rid>i4,,<sec>h1,<run>h1 .
```

| Component | Meaning |
|-----------|---------|
| `0099` | Branch to label 0099 if `2BO` is not defined |
| `2BO` | System-defined name to look up |
| `<cabinet>i4` | Receives the cabinet number (`0`) |
| `<drawer>h1` | Receives the drawer letter (`B`) |
| `<rid>i4` | Receives the report number (`2`) |
| *(skipped)* | `vhirptr` skipped with empty subfield |
| `<sec>h1` | Receives user security access (`R`/`W`) |
| `<run>h1` | Receives script registration access (`R`/`W`) |
