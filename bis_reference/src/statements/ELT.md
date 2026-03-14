# ELT and @ELT — Element

> *(2200 only)*

## Overview

Copies a report to a standard OS 2200 data file or element (symbolic or omnibus) of a program file. A program file may be a standard program file (PF), a large program file (LPF), or a large element program file (LEPF).

The file must be a sector-formatted file with no read or write keys, and cannot be in read-only or write-only mode.

> **Note:** Use the Retrieve File command to copy an OS 2200 file to a report.

For the manual function, you must be in the cabinet containing the report you wish to copy.

---

## Manual Function

```
ELT
```

---

## Syntax

```
@ELT,c,d,r[,lab] \
qual,fn[,cyc,elt,ver,mapperf?,hdgs?,cs,newcyc?,shrdir?,ftype] .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `c,d,r` | Required | Report to copy. For more details, see *Specifying Reports or Drawers to Process*. |
| `lab` | Optional | Label to branch to if the run encounters an error. |
| `qual` | Required | Qualifier. |
| `fn` | Required | File name to transfer the report to. |
| `cyc` | Optional | File cycle. |
| `elt` | Optional | Element name. Required for Binary (`B`) and Encryption (`E`) formats. |
| `ver` | Optional | Version. |
| `mapperf?` | Optional | MAPPER format? `Y` (Yes), `N` (No), `B` (Binary), or `E` (Encryption). Default = `N`. Non-MAPPER (`N`) format converts tab characters to spaces and translates data control commands. Binary (`B`) and Encryption (`E`) formats require an element name. Encryption (`E`) creates Cryptographic Program Files readable only by BIS systems configured with the correct Cipher key. |
| `hdgs?` | Optional | Include headings? `Y` or `N`. Default = `N`. When processing a result, omits only the date line. When processing a report, omits only the heading lines defined in report `0` of the drawer. To exclude all lines above and including the heading divider line in all cases, use the [`@FIL`](FIL.md) statement with headings excluded. |
| `cs` | Optional | Character set of the new file: `L` = Fieldata, `F` = ASCII (default), `U` = ASCII uppercase, `0`–`53`, `63` = operating system CCS ID. See [Coded Character Set Identifiers](#coded-character-set-identifiers-ccs-id). |
| `newcyc?` | Optional | Create a new cycle? `Y` or `N`. If `Y`, creates a `+1` cycle and ignores the `cyc` subfield. The run fails if a new cycle is requested for a nonexistent file. |
| `shrdir?` | Optional | Use the shared directory string when accessing the file? `Y` or `N`. If `N`, uses the `std` directory string. Default = blank (no directory string). |
| `ftype` | Optional | Controls the type of file created if it does not already exist: `S` = Standard program file (5,000 elements, 29.3 MB/element), `L` = Large program file (26,146 elements, 29.3 MB/element), `E` = Large element program file (26,146 elements, 1.8 GB/element). If the file already exists, this field is ignored. If not specified, defaults to large program file or large element program file depending on element size. |

---

## Reserved Words

`STAT1$` contains the following status codes:

| Code | Description |
|------|-------------|
| `1` | File (relative cycle requested) does not exist. |
| `2` | File is already assigned to the system. |
| `3` | File is already assigned exclusively to the system. |
| `4` | File is already assigned to another user. |
| `5` | File is already assigned exclusively to another user. |
| `6` | File is rolled out. |
| `7` | Facilities currently unavailable. |
| `8` | Private file, under different project ID. |
| `9` | Read or write restrictions are on the file. |
| `10` | File is not a sector-formatted mass storage file. |
| `11` | File is not a program file (if element is specified). |
| `12` | File is a MAPPER file. |
| `13` | System I/O error. |
| `14` | Facility warning or reject. |
| `15` | Insufficient or improperly formatted statement. |
| `16` | File is not a data file (if element is not specified). |
| `17` | Cycle attempted on nonexistent file. |
| `18` | Attempted to write past end of file. |
| `19` | Access permission denied. |
| `20` | File creation denied. |
| `21` | File specified is not a Cryptographic Program File. |
| `22` | The Cipher API interface (encryption) is down. |

`STAT2$` contains a line number identifying the system message. Use an [`@LSM`](LSM.md) (Load System Message) statement to read the message — place the value of `STAT2$` in the `msgno` subfield of the `@LSM` statement.

---

## Coded Character Set Identifiers (CCS-ID)

The CCS-ID is stored in the created file so that applications can detect the character set type and process the file accordingly.

| Coded Character Set | CCS-ID |
|---------------------|--------|
| Fieldata | `0` |
| ASCII/ISO (Unknown 7/9 bit) | `1` |
| ASCII/APL | `2` |
| EBCDIC | `3` |
| Binary | `4` |
| Untyped (application dependent) | `5` |
| Column Binary | `6` |
| Operating System Reserved | `7` |
| Customer Reserved | `8`–`13` |
| Hangul | `14` |
| Hanzi | `15` |
| JIS | `16` |
| ISO 646 US | `17` |
| ISO 646 Norway/Denmark | `18` |
| ISO 646 France | `19` |
| ISO 646 German | `20` |
| ISO 646 UK | `21` |
| ISO 646 Italy | `22` |
| ISO 646 Spain | `23` |
| ISO 646 Sweden | `24` |
| ISO 646 Finland | `25` |
| ISO 646 Canada | `26` |
| ISO 646 Netherlands | `27` |
| ISO 646 Portugal | `28` |
| ISO Reserved | `29`–`32` |
| Customer Reserved | `33`–`34` |
| ISO 8859.1 | `35` |
| ISO 8859.2 | `36` |
| ISO 8859.3 | `37` |
| ISO 8859.4 | `38` |
| ISO 8859.5 | `39` |
| ISO 8859.6 | `40` |
| ISO 8859.7 | `41` |
| ISO 8859.8 | `42` |
| ISO 8859.9 | `43` |
| ISO 8859.10 | `44` |
| French/Arabic | `45` |
| Katakana | `46` |
| BICS | `47` |
| ISO Reserved | `48`–`50` |
| General Reserved (FUTURE) | `51`–`61` |
| Alternate Location (FUTURE) | `62` |
| ACD | `63` |

---

## Outcome

- If the file being copied is not currently assigned and the OS 2200 enables large files, it is assigned with a maximum of 262,143 positions; otherwise, a maximum of 262,143 tracks.
- When headings are excluded, the behavior depends on context — for reports, heading lines defined in report `0` of the drawer are omitted; for results, only the date line is omitted.
- The `B` (Binary) option in `mapperf?` indicates no heading lines. The input report must be full character set and is written as an omnibus element (no standard data file control words).
- To exclude all lines above and including the heading divider line in all cases, use the Create File command with headings excluded.

---

## Guidelines

- The qualifier, file name, element, and version must conform to OS 2200 rules for standard names — only alphabetic, numeric, `$`, and `-` characters are allowed. See the *Executive Control Language (ECL) and FURPUR Reference Manual* for complete information.
- You can control which data is copied using the same data control commands used with the Start command. These can be placed on any line in the report and take effect from that point onward.
- Spaces at the right of data lines are not transferred. Characters that cannot be translated are changed to spaces.
- Use the `$INCL$` command to copy more than one report or drawer.
- You can request a new cycle (`+1`) for an OS 2200 file. If requested, the file is cataloged public with the same granularity and reserve as the original.
- If saving to an element, the file must be a program file, not a data file. If no element name is provided, the file must be a data file.
- If saving to an existing element, it is marked for deletion and a new element is inserted. If saving to an existing data file, it is overwritten.

---

## Example

Create `MYQUAL*MYFILE` and copy data from report `2B0` to it. On error, branch to label `99`:

```
@elt,0,b,2,99 myqual,myfile .
```
