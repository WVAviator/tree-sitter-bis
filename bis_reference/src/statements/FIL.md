# FILE and @FIL — Create File

## Overview

Copies a report to a file in the native data file format.

---

## Manual Function

```
FILE
```

---

## Syntax

```
@FIL,c,d,r[,mapperf?,hdgs?,lab] fn .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `c,d,r` | Required | Report to copy. For more details, see *Specifying Reports or Drawers to Process*. |
| `mapperf?` | Optional | Create the report in MAPPER format? `Y`, `N`, or `B`. Default = `N` (standard data file format; converts tab characters to spaces). Use `B` to create a file in binary format from a binary report. |
| `hdgs?` | Optional | Include headings from the report? `Y` or `N`. Default = `N`. |
| `lab` | Optional | **Windows / Linux / UNIX:** Label to branch to if the report or drawer does not exist. **2200:** Label to branch to if the run encounters an error. For `STAT1$` and `STAT2$` error codes, see [`@ELT`](ELT.md). |
| `fn` | Required | Name of the file to create. See platform-specific notes below. |

### `fn` — Platform-Specific Notes

**Linux / UNIX:** Include the complete path name unless you logged on to the directory where the file is to reside. The specified directory must exist. File names are case-sensitive (e.g. `Abc` must always be referenced as uppercase `A`, lowercase `bc`). A file name cannot exceed the site-configured limit; a combined path and file name cannot exceed 70 characters.

**Windows:** Include the complete path name. The specified directory must exist. File name length cannot exceed the operating system maximum and must follow its naming conventions. If using a reverse slant (`\`) to define a directory path, enclose it in apostrophes (`'`) to prevent it from being misinterpreted as a line continuation character.

**2200:** Include the full file name. The qualifier and file name must conform to OS 2200 file naming standards — only alphabetic characters, numeric characters, `$`, and `-` are allowed. See the *Executive Control Language (ECL) and FURPUR Reference Manual* for complete information. The default character set of the created file is `F` (full character set; creates an ASCII file).

---

## Outcome

- If the file does not exist, the command creates it. If it already exists, the command overwrites it.
- If creating a file in a format other than MAPPER format and the original report contains tab characters, the command translates tab characters to spaces. Use the `$TABA$` data control command for information on retaining or translating tabs to other characters.
- If creating a file with headings, the file retains information such as the report identifier and the date the report was last updated. The date line of the original report is written into the file so it is part of the result when retrieved.
- With the manual function, the report that was on display when the function was requested is redisplayed.
- *(Linux / UNIX)* If your log-on does not have write permission for the specified file, a prompt is displayed soliciting a different log-on. The command creates the file with the following permissions: read and write by the owner, read by group, and read by other.
- *(2200)* If the `B` option is used, the input report must be full character set and is written as an omnibus element (no standard data file control words) to the specified program file. The `B` option indicates there are no heading lines — the date line (line 1), title line (line 2), and End Report line are not written to the file.

---

## Guidelines

- You can create the file in MAPPER format (which contains control characters and may be unreadable by text editors) or in standard data file format (which text editors can process). Files in MAPPER format are useful when transferring reports between systems.
- *(Linux / UNIX)* Avoid using Linux or UNIX edit utilities on files in MAPPER format — results may be unpredictable. You can use Linux or UNIX text editors on standard data files.
- *(Linux / UNIX)* Do not use Linux or UNIX metacharacters in file names (e.g. `*`, `^`, `[`, `]`). These are interpreted specially by the shell and may produce unexpected results.
- *(Linux / UNIX — trusted mode)* In foreground sessions, the system prompts for login and password if you attempt to create or overwrite a file whose permissions do not allow access. Background runs execute using the mapper login — if the current login does not allow access, the operation terminates with an error.
- *(Linux / UNIX — secure mode)* If you attempt to create or overwrite a file whose permissions do not allow access, the operation terminates with an error status of "This file cannot be accessed."
- *(Windows / Linux / UNIX)* If you used the Cabinet Switch (CS) run to switch to a remote cabinet, you must specify the full path name.
- *(2200)* Use the [`@ELT`](ELT.md) (Element) function to create data files or symbolic elements of a program file.
- The following characters are not allowed in file names:
  - **Windows:** `& [ ] * ? , \ ^ ;`
  - **2200 / Linux / UNIX:** `& [ ] ( ) * ? , \ ^ ;`

### Sharing Native Files *(Linux / UNIX)*

You might be unable to read, overwrite, or remove a native file created by another session user. All files created at the system level or within the BIS context receive `rw-r--r--` permissions by default (owner can read/write; group and others can only read), based on a default umask of `022`.

The file owner can change permissions by:
- Issuing the system `chmod` command (usable by all workstation and terminal emulator users via the UNIX command or [`@UNX`](UNX.md) statement).
- Modifying the umask for the system session (terminal emulator users only). For mapper logins, add a `umask` command to the `mlogin` script in `M_ROOT/lbin`. For other logins, add it to the `.profile` file in the user's home directory.

The `umask` argument is a three-digit octal number bitwise subtracted from octal `666`. For example, `umask 002` sets file creation mode to `664` (`rw-rw-r--`).

Files created by runs initiated by MAPQUE or DISPATCHER are owned by the default user/group (`mapper`/`mapper` in trusted instances) and receive `rw-rw-r--` permissions.

---

## Examples

**Linux / UNIX** — Create a standard file called `production` in the `/test` directory, using data from report `2B0` including headings:

```
@fil,0,b,2,n,y /test/production .
```

**2200** — Create a standard OS 2200 data file called `MYQUAL*MYFILE`, using data from report `2B0` including headings:

```
@fil,0,b,2,n,y myqual*myfile .
```

**Windows** — Create a file called `PRODSTAT.NEW` in the `\TEST` directory on drive `C`, using data from report `2B0` including headings:

```
@fil,0,b,2,n,y 'c:\test\prodstat.new' .
```
