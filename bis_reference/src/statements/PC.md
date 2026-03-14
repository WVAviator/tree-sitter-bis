# @PC (Run PC Program)

## Overview

Executes a specified local PC application. This statement requires a workstation session using one of the following clients:

- Graphical Interface for Business Information Server
- Business Information Server for Microsoft Windows Client

> **Note:** If the session is using either of these clients, the reserved word `WS$` (workstation flag) will equal `1`.

> **Note:** This statement is restricted to foreground runs.

### WinHelp (Format 2)

Use Format 2 to access Windows WinHelp. Since `@PC` performs only a limited syntax check before passing information to WinHelp, your run should validate WinHelp parameters before executing the statement.

The command string has two parts: the command name and optional parameters. Windows imposes a **256-character combined limit** on these strings — if exceeded, the statement will fail. There is also a **127-character limit** on the parameter string alone; exceeding this causes silent truncation without an error, but does not cause the statement to fail.

### Additional Behaviors

- `@PC` releases all reports opened by a [`@FDR`](FDR.md) (Find and Read Line) statement. Any subsequent [`@RDL`](RDL.md) (Read Line) or [`@RLN`](RLN.md) (Read Line Next) statements become invalid.
- A DOS program can cause a Graphical Interface for Business Information Server or Business Information Server for Microsoft Windows Client session to end unexpectedly if it is configured for exclusive PC use, as this prevents host communication and triggers a cleanup procedure.

---

## Syntax

**Format 1**
```
@PC[,o,lab] command .
```

**Format 2**
```
@PC 'WinHelp help-file help-command [parameter]' .
```

**Format 3**
```
@PC[,o,lab] application parameter .
```

> **Note:** Format 3 can be used to launch `Winhlp32.exe`.

> **Note:** `Winhelp.exe` and `Winhlp32.exe` are Microsoft products. For documentation, see article 115183 at the Microsoft.com website.

### Parameters

| Field | Description |
|-------|-------------|
| `o` | Action option. See [Options](#options). |
| `lab` | Label to continue processing at if the statement fails (e.g., request not found or destination unavailable). `STAT1$` contains `0` if successful; a nonzero value otherwise. See Graphical Interface Returned Status Codes for possible `STAT1$` values. |
| `command` | Name of the application to execute. Enclose in quotation marks if the name contains embedded spaces. |
| `WinHelp` | Specifies access to WinHelp. |
| `help-file` | Help file name for WinHelp to use. Specify as much of the path as necessary to identify the file. |
| `help-command` | The help command to perform. Supported commands: `CONTEXT`, `CONTENTS` (default), `SETCONTENTS`, `CONTEXTPOPUP`, `KEY`, `PARTIALKEY`, `COMMAND`, `FORCEFILE`, `HELPONHELP`, `QUIT`. |
| `parameter` | *(Format 2)* Parameter specific to each help command, if required. |
| `application` | *(Format 3)* An application to be started. |
| `parameter` | *(Format 3)* A list of command line options to be passed to the application. |

---

## Options

| Option | Formats | Description |
|--------|---------|-------------|
| `B` | All | Executes the specified program and minimizes it as an icon. |
| `C` or `N` | All | Identifies the specified program as not being a Windows program (such as an MS-DOS command). |
| `W` | All | Waits for the main window of the specified program to close before continuing. Note: some programs may not support this option (e.g., WinWord). |
| `R` | Format 3 only | Designates an application and a parameter. Check `DWCAP$(12-1)` — equals `1` if available. Supports embedded DOS environment variables using `%variable%` syntax (e.g., `%TEMP%`). On Business Information Server for ClearPath OS 2200, use the reserved word `RSLANT$` for the backslash. `MAPPER-API` defines a special variable `DATADIR` to represent the default data directory. |

### `C` Option Error Label Behavior

If the `C` option is used and an error label is provided, MAPPER goes to the error label when:
- `CMD.EXE` (Windows Server) or `COMMAND.COM` (Windows) is not present on the client system.
- `CMD.EXE` or `COMMAND.COM` returns an error status.

MAPPER does **not** go to the error label when the program named in the command argument itself fails or errors.

---

## Reserved Word

If `@PC` specifies a label in the `lab` field and the statement does not complete, the run continues at that label. `STAT1$` contains the error status. See Graphical Interface Returned Status Codes for possible values.

---

## Printing Data or Bitmap Images

To print whatever is in the main window as data:
```
@pc 'windowprint' .
```

To print another window as a bitmap, where `var` is a variable containing the window handle:
```
@pc 'windowprint var' .
```

---

## Examples

Execute the PC program `solitaire`:
```
@pc 'sol.exe' .
```

Execute the WinHelp CONTENTS command:
```
@pc 'WinHelp c:\mydir\myhlpfil contents' .
@.
```

Combined application and parameter workflow using Format 3:
```
@pcw,100,b,5 'mywords.rtf' .              \ Writes to MAPPER-API's data directory
@pc,rw 'wordpad' '%datadir%'rslant$'mywords.rtf' .  \ W suspends run until Word closed
@pcr,100,b,5,n 'mywords.rtf' .            \ Reads from PC data directory
@pc,n 'del %datadir%'rslant$'mywords.rtf' .         \ Clean-up
```
