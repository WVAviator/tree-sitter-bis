# ELT- and @EL- — Element Delete

> *(2200 only)*

## Overview

Deletes a standard OS 2200 data file or symbolic element of a program file. A program file may be a standard program file (PF), a large program file (LPF), or a large element program file (LEPF).

The file must be a sector-formatted file with no read or write keys.

> **Note:** This command cannot be used to delete a file — only a data file or symbolic element.

---

## Manual Function

```
ELT-
```

---

## Syntax

```
@EL-[,lab] qual,fn[,cyc,elt,ver,shrdir?] .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `lab` | Optional | Label to branch to if the run encounters an error. See [Reserved Words](#reserved-words) for `STAT1$` status codes. |
| `qual` | Required | Qualifier. |
| `fn` | Required | Name of the file to delete, or the file name containing the element to delete. |
| `cyc` | Optional | File cycle. |
| `elt` | Optional | Element name. |
| `ver` | Optional | Version. |
| `shrdir?` | Optional | Use the shared directory string when accessing the file? `Y` or `N`. If `N`, uses the `std` directory string. Default = blank (no directory string). |

---

## Reserved Words

`STAT1$` contains the following status codes if the statement is unable to delete the file:

| Code | Description |
|------|-------------|
| `0` | Requested element not found in specified file. |
| `1` | File does not exist. |
| `2` | File already assigned to the system. |
| `3` | File already assigned exclusively to the system. |
| `4` | File already assigned to another user. |
| `5` | File already assigned exclusively to another user. |
| `6` | File rolled out. |
| `7` | Facilities currently unavailable. |
| `8` | Private file, under different project ID. |
| `9` | Read or write restrictions on the file. |
| `10` | File is not a sector-formatted mass storage file. |
| `11` | File is not a program file (if element is specified). |
| `12` | File is a MAPPER file. |
| `13` | System I/O error. |
| `14` | Facility warning or reject. |
| `15` | Insufficient or improperly formatted statement. |
| `16` | Access permission denied. |

`STAT2$` contains the system message number. Use this number in the [`@LSM`](LSM.md) (Load System Message) statement to retrieve the text of the message.

---

## Example

Delete the file `MYQUAL*MYFILE`:

```
@el- myqual,myfile .
```
