# ECL and @ECL — Exec Control Language

> *(2200 only)*

## Overview

Submits an `@CAT` or `@SYM` statement to the OS 2200 Exec.

- **`@CAT`** catalogs a mass storage or tape file. The file must be sector-formatted disk or tape, cannot have read or write keys, and may specify a `+1` cycle of an existing file.
- **`@SYM`** queues an existing data file for printing or punching.

The qualifier and file name must conform to OS 2200 rules for standard names.

---

## Manual Function

```
ECL
```

---

## Syntax

```
@ECL[,lab] 'ECL-Command' [fac-stat] .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `lab` | Optional | Label to branch to if the run encounters an error. |
| `ECL-Command` | Required | The `@CAT` or `@SYM` command to submit, enclosed in apostrophes. |
| `fac-stat` | Optional | Variable to capture the 36-bit (12-digit) Facility Request Status Word if the command fails. Refer to the *ECL Operations and Programming Reference* for complete information on Facility Inventory Status Bits. |

---

## Reserved Words

`STAT1$` contains the following status codes:

| Code | Description |
|------|-------------|
| `2` | File is already assigned to the system. |
| `3` | File is already assigned exclusively to the system. |
| `4` | File is already assigned to another user. |
| `5` | File is already assigned exclusively to another user. |
| `7` | Facilities currently unavailable. |
| `12` | File is a MAPPER file. |
| `13` | System I/O error. |
| `14` | Facility warning or reject. |
| `15` | Insufficient or improperly formatted statement. |
| `17` | Cycle attempted on nonexistent file. |
| `20` | File creation denied. |

`STAT2$` contains a line number identifying the system message. Use an [`@LSM`](LSM.md) (Load System Message) statement to read the message — place the value of `STAT2$` in the `msgno` subfield of the `@LSM` statement.

---

## Outcome

- If `@CAT` is specified and the file is not currently cataloged, the ECL function catalogs it.
- If `@SYM` is specified, the ECL function queues the specified file for printing or punching.

---

## Guidelines

- Qualifier and file names must conform to OS 2200 rules for standard names — only alphabetic, numeric, `$`, and `-` characters are allowed.
- Do not specify read or write keys when cataloging files.
- You can request a new cycle (`+1`) for an OS 2200 file. If requested, the file is cataloged with the same granularity, reserve, and pack-id (if previously cataloged on a removable drive) as the original file.
- Refer to the *ECL Operations and Programming Reference* for complete information on files and cataloging.

---

## Examples

Catalog `MYQUAL*MYFILE` with track granularity, maximum size of 999 tracks, on a removable drive with pack-id `J1D2`. On error, jump to label `99` and capture the Facility Request Status Word in `V1`:

```
@ECL,99 '@CAT,P MYQUAL*MYFILE.,f///999,J1D2' V1H12 .
```

Queue `MYQUAL*MYFILE` to printer `PR1` with a banner of `MYPRNT`. On error, jump to label `99` and capture the Facility Request Status Word in `V1`:

```
@ECL,99 '@SYM,U MYQUAL*MYFILE.,,PR1,MYPRNT' V1H12 .
```
