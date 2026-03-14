# UNIX and @UNX — UNIX Interface

> **Linux / UNIX only**

## Overview

Accesses the Linux or UNIX operating system and executes Linux or UNIX commands.

> **Note:** This functionality should be used only by experienced Linux or UNIX users.

### UNIX Function Behavior

- **Terminal / Terminal Emulator:** Displays the shell prompt if the user entered the system from the Linux or UNIX shell. If the user entered via the MAPPER logon, a Linux or UNIX logon prompt is displayed.
- **Workstation:** Only the `-f` option is supported (returns output of a shell command as a result).

### @UNX Statement Behavior

- **Terminal / Terminal Emulator:** If the run user entered through the Linux or UNIX shell, any normally available command can be executed; the run continues when the command completes. If the user entered directly from the MAPPER logon, the run terminates with an error.
- **Workstation:** Only the `-f` option is supported.

---

## Syntax

### Control Line
```
UNIX [o cmd args]
```

| Field | Description |
|-------|-------------|
| `o` | Options field. See [Options](#options). |
| `cmd` | Linux or UNIX command to execute. A standard Linux or UNIX search is done to find the command — full path name not required if the command's directory is in your `PATH`. |
| `args` | Arguments to pass to the command. Full path names required only if the command itself requires them. |

### Statement
```
@UNX[,c,d,logon,pw,lab] o cmd [args] .
```

| Field | Description |
|-------|-------------|
| `c,d` | Drawer into which the result is returned (used with the `-f` option). See *Specifying Reports or Drawers to Process*. |
| `logon` | Linux or UNIX logon. Default = logon of the current run user. |
| `pw` | Logon password. Default = password of the current run user. |
| `lab` | Label to go to if the Linux or UNIX command fails. |
| `o` | Options field. Enter in lowercase. If no options are specified, designate the field with `''`. See [Options](#options). |
| `cmd` | Linux or UNIX command to execute. Full path name not required if the command's directory is in `PATH`. Enclose commands containing embedded spaces in apostrophes (`'`). If no command is specified, designate its position with `''`. BIS cannot determine whether the syntax is valid or if an error occurred during execution — analyze the generated output to verify success. |
| `args` | Arguments passed to the command. Full path names required only if the command requires them. Enclose the command and argument together in apostrophes when entering arguments. |

---

## Options

| Option | Description |
|--------|-------------|
| `-c` | Clears the screen after the statement finishes processing and returns to the system. (The manual UNIX function does this automatically.) |
| `-f` | Returns the output of the command as a result in drawer A, or in the drawer specified by the `@UNX` statement. If a filename immediately follows `-f`, a copy of the output is also placed in that file. Do not use with `-w`. Do not use when executing interactive Linux or UNIX processes such as `vi` or `ed`. |
| `-p` | Executes the user's `.profile` before executing the command. |
| `-w` | Enables the run user to press **Resume** (or **Return** on a Graphical Interface workstation using Ethernet) to resume the run after the command executes and output is displayed. Do not use with `-f`. |

---

## Guidelines

### General

- To return to the system from the UNIX shell, press **Ctrl-D** or type `exit` and press **Return**. The active screen is displayed.
- Linux and UNIX commands, arguments, and file names are case-sensitive. For example, `LS -L` does not execute `ls -l`.

### @UNX Statement

- You cannot use the `@UNX` statement to access the operating system without specifying a valid logon and password in a remote foreground session.
- Consider using the [`@PNT`](PNT.md) (Refresh Screen) statement following `@UNX` to re-establish screen attributes when returning from the Linux or UNIX environment.
- When using the `-p` option, the `PATH` environment variable in your `.profile` must include all directories being searched. For example:
  ```
  PATH=$PATH:/bin;export PATH
  ```
  If `PATH` does not include the directory containing the command executable, the shell returns: `-map: line 1: command: not found`

**Trusted mode installation:**
- Ensure the `@UNX` statement contains a valid logon and password for all users of the run to prevent termination. Consider prompting the user for credentials before executing.
- If used in runs started from a remote site on a remote host, specify a valid Linux or UNIX logon and password for that host. (Statements that can start runs at remote sites include `RRN`, `NRN`, `NRM`, and `STR` using the `BPRUN$` command.)

**Secure mode installation:**
- An error is returned if `logon` and `pw` syntax are specified, and the run terminates.
- If `@UNX` is in a foreground-started run, the system activity runs with the session's privileges. In background runs, it runs with the privileges of the default user.
- For runs executed from a remote site, Linux or UNIX access runs on the remote host with the identity of the default user.
- Environment variables in your original shell affect the new shell started by the UNIX function or `@UNX` statement. For example, if `LD_LIBRARY_PATH` is set to `/usr/ucblib` in your original shell, a `vi` command may fail in the new shell.

---

## Sharing Native Files

Files created by another session user may not be readable, overwritable, or removable depending on their permissions. Files created at the system level or within the BIS context using `FILE`, `UNIX`, `@FIL`, or `@UNX` receive `rw-r--r--` permissions by default (owner can read/write; group and others can only read), due to the default OS `umask` of `022`.

The file owner can change permissions by:

- Issuing the `chmod` command at the system level or within BIS via `UNIX` or `@UNX`. Available to all workstation and terminal emulator users.
- Modifying the `umask` for the system session (terminal emulator users only, including the `mapper` user on trusted sites):
  - **mapper login:** Add a `umask` command to the `mlogin` script in `M_ROOT/lbin`.
  - **Other logins:** Add a `umask` command to the `.profile` file in the user's home directory.

The `umask` argument is a three-digit octal number bitwise subtracted from octal `666`. For example:
```
umask 002
```
Changes file creation mode to `664`, giving `rw-rw-r--` permissions.

Files created by runs initiated by `MAPQUE` or `DISPATCHER` are owned by the default user/group (`mapper`/`mapper` on trusted instances) and receive `rw-rw-r--` permissions.

---

## Examples

### Accessing the Linux or UNIX Shell

> **Note:** This example does not apply to a workstation.

Control line:
```
unix
```

Equivalent statements:
```
@unx '' '' .
@unx,,<runlogon>,<runpw> '' '' .
```

To return to the system, press **Exit**.

---

### Executing a Command

Executes `cat` on the file `prod_status` and places output in the file `tmpfile`. The `@UNX` statement also places output in a cabinet 0, drawer E result.

Control line:
```
unix -f/tmpfile cat prod_status
```

Equivalent statement:
```
@unx,0,e -f/tmpfile 'cat prod_status' .
```

---

### Listing the Contents of a Directory

Lists the contents of `/usr/work/newuser`. The `@UNX` statement places output in a cabinet 0, drawer E result.

Control line:
```
unix -f ls -l /usr/work/newuser
```

Equivalent statement:
```
@unx,0,e -f 'ls -l /usr/work/newuser' .
```
