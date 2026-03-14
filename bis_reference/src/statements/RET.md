# RET and @RET (Retrieve File)

## Overview

Retrieves a file into the database as a result.

- *(Windows / Linux / UNIX)* Retrieves a native data file.
- *(2200 only)* Retrieves OS 2200 data files or symbolic elements of program files. The file must be a sector-formatted file with no read or write keys.

---

## Manual Function Syntax

```
RET
```

*(2200 only)*
```
RET P
```

---

## Statement Syntax

*(Windows / Linux / UNIX)*
```
@RET,c,d[,mapperf?,hdgs?,lab] fn[,l,ststr,q,ltyp] .
```

*(2200 only)*
```
@RET,c,d[,lab] [qual],fn[,cyc,elt,ver,mapperf?,hdgs?,l,ststr,q,shrdir?] .
```

### Parameters

| Field | Platform | Description |
|-------|----------|-------------|
| `c,d` | All | Cabinet and drawer into which the file should be placed. See Specifying Reports or Drawers to Process. |
| `mapperf?` | All | File is in MAPPER format? `Y`, `N`, or `B` (binary). Default = `N`. |
| `hdgs?` | All | Add headings from the receiving drawer to the result? `Y` or `N`. Default = `N`. If `mapperf?` = `Y` and data already contains a date line, headings are not added even if requested. If `mapperf?` = `N` and data does not contain a date line, one is always added regardless of this setting. |
| `lab` | Windows / Linux / UNIX | Label to go to if the file is not found. |
| `lab` | 2200 | Label to go to if the file cannot be retrieved. See [Reserved Words](#reserved-words). |
| `qual` | 2200 | Qualifier. |
| `fn` | Linux / UNIX | Name of the file to retrieve. Include the complete path unless logged on to the directory where the file resides. File names are case-sensitive. |
| `fn` | Windows | Name of the file to retrieve. Include the complete path name. If using a backslash (`\`) to define a directory path, enclose it in apostrophes (`'`) to prevent misinterpretation as a line continuation. |
| `fn` | 2200 | Name of the file to retrieve. |
| `cyc` | 2200 | Relative or absolute file cycle number. |
| `elt` | 2200 | Element name. Leave blank for a data file. |
| `ver` | 2200 | Version. |
| `l` | Windows / Linux / UNIX | Line number at which to start the retrieval. If a `ststr` is specified, this is the line at which to begin the search. |
| `l` | 2200 | Line number at which to start the retrieval. Ignored for binary files. |
| `ststr` | Windows / Linux / UNIX | Character string to locate. Retrieval starts on the line containing this string. |
| `ststr` | 2200 | Character string to locate. Retrieval starts on the line containing this string. Ignored for binary files. |
| `q` | Windows / Linux / UNIX | Number of lines to retrieve beginning at the start line. If `ststr` is specified, defines the number of lines to search — retrieval extends from the line containing the string to the last line in the search set. If the string is not found, nothing is retrieved. |
| `q` | 2200 | Number of lines to retrieve. For files larger than 500 lines, specify the full size to reduce internal data copying. Ignored for binary files. |
| `ltyp` | Windows / Linux / UNIX | Line type to insert. |
| `shrdir?` | 2200 | Use the `shared` directory string when accessing the file? `Y` or `N`. If `N`, uses the `std` directory string. Default = blank (no directory string). |

---

## Outcome

- Creates a result containing the retrieved file.
- If a file was created with no headings and retrieved with no headings, the result contains only a new date line.
- A date line is never added if the file already contains one; a date line is always added if the file does not contain one, regardless of the `hdgs?` setting.
- *(Windows / Linux / UNIX)* A date line is always added to a file not in MAPPER format. If a file is created with headings and retrieved without them, the result may contain two date lines.
- *(Windows / Linux / UNIX)* If a MAPPER-format file is wider than the receiving drawer, extra characters are truncated. If not in MAPPER format, extra characters wrap to the next line. Wrap vs. truncate behavior can be configured in the MAPPER Administration Menu Utility.
- *(Windows only)* If a file is wider than the receiving drawer, extra characters wrap to the next line by default. This can be configured in the MAPPER Administration Menu Utility. Binary files cannot be retrieved into drawers wider than 256 characters.
- *(2200 only)* If a file is wider than the receiving drawer, extra characters are truncated. Binary files (omnibus elements from OS 2200 program files) retrieved with `mapperf?` = `B` are sized to the receiving drawer. The data must be in FCS format and is treated as one continuous line wrapping until end-of-element. The resulting report is marked non-displayable but includes a date, title (line 2), and End Report line.
- *(Linux / UNIX)* If your login does not have read permission for the file, a prompt is displayed to solicit a different login.

---

## Reserved Words *(2200 only)*

`STAT1$` contains the following status codes if the file cannot be retrieved:

| Code | Description |
|------|-------------|
| `1` | Insufficient data. |
| `2` | Unused. |
| `3` | Facility reject. |
| `4` | File does not exist. |
| `5` | File rolled out. |
| `6` | File exclusively assigned to another run. |
| `7` | Facilities currently unavailable. |
| `8` | Private file, under different project-ID. |
| `9` | File cannot be read (write only or missing key). |
| `10` | File is not a sector-formatted mass storage file. |
| `11` | File is not a program file (if element specified). |
| `12` | Element requested does not exist. |
| `13` | Report requested did not exist yesterday. |
| `14` | File is a MAPPER file; use the manual Retrieve File command. |
| `15` | Specified MAPPER file is being merged. |
| `16` | Internal software error. |
| `17` | Report cannot be retrieved while file is being merged. |
| `18` | Locate string is not found. |
| `19` | Program file must include element name. |
| `20` | File exists but is not readable. |
| `21` | Non-displayable data can be retrieved into FCS drawers only. |
| `22` | Non-displayable data width does not match the drawer width. |
| `23` | Access permission denied. |
| `24` | Invalid entry for qualifier. |
| `25` | Invalid entry for filename. |
| `26` | Invalid entry for cycle number. |
| `27` | Invalid entry for element name. |
| `28` | Invalid entry for version name. |
| `29` | Cannot find end-of-element character in final input I/O buffer (binary files). |
| `30` | The Cipher API interface (encryption) is down. |

`STAT2$` contains a line number identifying the system message. Use [`@LSM`](LSM.md) to obtain the message text.

If `mapperf?` = `N`, `STAT3$` contains the coded character set identifier (CCS-ID). If the file contains conflicting CCS-IDs, `STAT3$` contains `1`. For more information on CCS-IDs, see [`@ELT`](ELT.md) (Element).

---

## Guidelines

- *(Windows / Linux / UNIX)* Set `mapperf?` = `Y` only if you know the file was created by [`@FIL`](FIL.md) with the same setting for this parameter.
- *(Windows / Linux / UNIX)* If you used the Cabinet Switch (`CS`) command to switch to a remote cabinet, you must specify the full path name.
- *(2200 only)* When bringing large volumes of data from the batch environment, use `@RET` rather than sending data through the batch port.
- *(Linux / UNIX, trusted mode)* In foreground sessions, the system prompts for login and password if your current login does not allow access to the file. Background runs execute using the `mapper` login — if that login lacks access, the operation terminates with an error.
- *(Linux / UNIX, secure mode)* If your current login does not allow access, the operation terminates with the error "The Retrieve function cannot access the file."

### Restricted Characters in File Names

- *(Windows)* The following characters are not allowed in file names: `& [ ] * ? , \ ^ ;`
- *(2200 / Linux / UNIX)* The following characters are not allowed in file names: `& [ ] ( ) * ? , \ ^ ;`

### Sharing Native Files *(Linux / UNIX only)*

Files created at the system level or within the BIS context receive `rw-r--r--` permissions by default (owner read/write; group and others read-only), based on the default umask of `022`.

The file owner can change permissions by:
- Issuing the system `chmod` command (available to all workstation and terminal emulator users via the `UNIX` command or [`@UNX`](UNX.md) statement).
- Modifying the `umask` for the session (terminal emulator users only). For `mapper` login, add a `umask` command to the `mlogin` script in `M_ROOT/lbin`. For other logins, add it to the `.profile` file in the user's home directory.

Files created by runs initiated by MAPQUE or DISPATCHER are owned by the default user/group (`mapper`/`mapper` in Trusted instances) and receive `rw-rw-r--` permissions.

---

## Examples

*(Linux / UNIX)* Retrieve `/work/prod/status`, not in MAPPER format, into cabinet `0`, drawer `B` without headings:

```
@ret,0,b,n,n /work/prod/status .
```

*(2200)* Retrieve file `MYQUAL*MYFILE` starting at line 100:

```
@ret,0,a,099 myqual,myfile,,,,,,100 .
```

*(Windows)* Retrieve `STATUS.NEW` from `\WORK\PROD`, not in MAPPER format, into cabinet `0`, drawer `B` without headings:

```
@ret,0,b,n,n '\work\prod\status.new' .
```
