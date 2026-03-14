# @DDE — Dynamic Data Exchange Interface

## Overview

Provides a front-end interface to the Microsoft Windows Dynamic Data Exchange (DDE) feature, enabling "conversations" between the system (acting as a DDE **client**) and a Windows application that supports the DDE protocol (acting as a **server**, such as Excel or Word for Windows).

A client can converse with multiple servers simultaneously, and a server can converse with multiple clients simultaneously.

> **Session Requirement:** This statement requires a workstation session using one of the following clients:
> - Graphical Interface for Business Information Server
> - Business Information Server for Microsoft Windows Client
>
> When using either of these clients, the reserved word `WS$` (workstation flag) equals `1`.

> **Restricted to foreground runs.**

> **Prerequisites:** You must be familiar with the syntax and DDE interface of the target Windows application. Ensure the Windows application is running before `@DDE` executes — start it manually or use the [`@PC`](PC.md) (Run PC Program) statement.

---

## Syntax

```
@DDE,{"string"|c,d[,r,l],filename},vcon,cmd,{conversation_topic|item},datatype,o,lab vcon .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `"string"` | Conditional | Data or command to send to the server. Enclose in double quotes (`"`); enclose any embedded quotes in apostrophes (`'`). Maximum = 1,280 characters (or max statement size). When using the `I` command, specify the application name (typically the filename without `.EXE`). Mutually exclusive with `c,d,r,l,filename`. |
| `c,d` | Conditional | Cabinet and drawer for the result (`R` command) or of the report to send to the server. Do not use with `"string"`. |
| `r,l` | Conditional | Report number and optional starting line number to send to the server. Use for larger data. Required with `filename`. Do not use with `I` or `R` commands. |
| `filename` | Conditional | File to send to the server. Specify as much of the path as needed. Required whenever sending a report. Not used with `I` or `R` commands. The file is deleted after the data is sent. |
| `vcon` *(input)* | Conditional | Variable containing the window handle identifying an active conversation. Leave blank when using the `I` command. |
| `cmd` | Required | DDE operation to perform. See [Commands](#commands). |
| `conversation_topic` \| `item` | Required | Conversation topic when using `I`; otherwise the conversation item. Content varies by application — see the Microsoft SDK documentation and the target application's documentation. |
| `datatype` | Required | Type of data being sent. Currently only `text` is valid. |
| `o` | Optional | Options field. See [Option](#option). |
| `lab` | Optional | Label to branch to if the DDE operation fails. |
| `vcon` *(output)* | Conditional | Variable to capture the window handle returned after `I` (initiate). Use only with the `I` command. |

---

## Commands

| Command | Description |
|---------|-------------|
| `I` | **Initiate** — starts a DDE conversation. Use with the first `@DDE` statement. Leave `vcon` (input) blank. Returns a window handle in the `vcon` output variable for use in subsequent statements. Creates a two-line result: line 1 = application name, line 2 = conversation topic. |
| `P` | **Poke** — sends data to the server. Data must be in a format the server is designed to handle. |
| `R` | **Request** — requests data from the server. Returns data in `-0` of the specified `c,d` cabinet/drawer, or the current drawer if `c,d` is omitted (use `"string"` with an empty string `""` and omit `r,l,filename`). Data exceeding the drawer line length is truncated. |
| `E` | **Execute** — executes a command or application-specific macro on the server. Requires familiarity with the target application. |
| `A` | **Advise** — establishes a "warm" link to a data item. The server notifies the client whenever the item changes. Use [`@INP`](INP.md) after an `A` request to wait for the advisory. Use `U` to cancel. See [Advise Guidelines](#advise-guidelines). |
| `U` | **Unadvise** — cancels a previous `A` (Advise) request. |

---

## Option

| Option | Description |
|--------|-------------|
| `T` | Special text handling. When **sending**: only tab lines are sent (tab character in column 1 is excluded); other line types are skipped. Has no effect with `"string"`. When **receiving**: attempts to align fields to match those defined in report `0` of the specified drawer (or current drawer with `"string"`), using zero (`0`) in the input edit codes line as a field delimiter. Adds spaces or truncates to fit. Right-justifies numeric values (field is considered numeric if the first character is a digit `0`–`9`). If report `0` has no input edit codes, the option is ignored and the result is returned as-is. |

---

## Reserved Words

| Reserved Word | Description |
|---------------|-------------|
| `STAT1$` | Interface error code. See [Error Codes](#error-codes). |
| `STAT2$` | Server-specific error code (when the server generates an application error). |

---

## Error Codes

| STAT1$ | Description | Suggested Action | Conversation State |
|--------|-------------|------------------|--------------------|
| `0` | Operation completed successfully. | — | open |
| `1` | Window handle is not a valid DDE conversation window. | Ensure the handle returned by `I` is being used correctly. | unchanged |
| `2` | Server rejected the request — busy. | Try again later. | open |
| `3` | Server returned an application-specific error. | See `STAT2$` and server documentation. | open |
| `4` | Server acknowledged but returned no data. | Server may not recognize the topic. See server documentation. | open |
| `5` | Conversation not started — new window control could not be created. | Exceeded window control limit or memory shortage; close idle applications. | closed |
| `6` | Conversation handle does not represent a valid window. | Verify the handle from `I` is correct and the conversation was not closed. | closed |
| `7` | Failed to send DDE message to the server. | Memory shortage; close idle applications. | unchanged |
| `8` | File specified in the statement could not be opened. | Verify the file path and accessibility. | unchanged |
| `9` | Error reading the specified file. | Likely a media problem; ensure the file is readable. | unchanged |
| `10` | Failed to obtain or lock required memory during processing. | Memory shortage; close idle applications. | unchanged |
| `11` | Conversation handle was zero or too large. | Run design error; verify the handle from `I`. | closed |
| `12` | Data transferred exceeds 64,000 bytes. | Use `PCR`/`PCW` to transfer large data indirectly via file. | open |
| `13` | Initiate failed — no server responded. | Verify server is running and correct topic was used. Use `@PC` to start the server. | closed |
| `14` | Server could not satisfy the `R` request. | Server may not recognize the topic. See server documentation. | open |
| `15` | Invalid DDE command specified. | Valid commands are `I`, `P`, `R`, `E`, `A`, `U`. | unchanged |
| `16` | `@DDE` not processed — new DDE window could not be created. | Memory shortage; close idle applications. | closed |
| `17` | `R` command does not use the `filename` field. | Correct the statement. | open |
| `18` | `datatype` was required but missing or blank. | Correct the statement. | unchanged |
| `19` | Conversation terminated by the server. | Not necessarily an error — servers may end conversations. | closed |
| `20` | Entry detected in `vcon` input during `I` command. | `vcon` must be blank for `I`; handle is returned after initiation. | unchanged |
| `21` | Data exceeded 6,000 characters with `"string"` format. | Use `filename` form for larger data. | open |
| `22` | Data from server is not in the proper format. | Server-side DDE protocol issue (e.g., missing null terminator). | open |

---

## Data Size Limits

| Method | Client → Server | Server → Client |
|--------|----------------|----------------|
| `"string"` | 1,280 characters *(entire statement including string)* | 6,000 characters |
| `c,d,r,l,filename` | 64,000 characters | 6,000 characters *(returned as result, not file)* |
| `PCR` / `PCW` | No practical limit | No practical limit |

---

## Guidelines

- DDE data, macros, commands, and topic syntax are entirely application-specific. You must be familiar with how the target application handles the DDE interface.
- The statement does not perform language translation on strings (application names, topic names, item names). The server must use the same language as the run.
- Leading, trailing, and embedded spaces may be significant. For example, `EXCEL` and ` EXCEL ` may produce different results.
- Tabs have special meaning in many applications — they typically delimit data items.
- Data returned from a DDE server must go into a report. Use [`@BRK`](BRK.md) to direct output to the widest available drawer to minimize truncation risk.
- If an odd-numbered cabinet is specified, the report cannot be updated.

### Advise Guidelines

- Ensure the run is ready to receive advisories (waiting on [`@INP`](INP.md)) when the advisory is sent. If the run is busy, the DDE interface notifies the server it is busy, and the server may not retry.
- If other input is simultaneously being processed, the system may reject the DDE request with a busy status.
- Some servers send only one advisory even after receiving a busy status — design accordingly.
- To monitor more than one data item, use a separate conversation per item (no way to distinguish which item changed within a single conversation).
- Use `U` to cancel an active Advise request.
- Normally the DDE client controls when the conversation ends, but a server may also terminate it.

---

## DDE Tracing

Enable DDE tracing to observe the DDE messages and data exchanged between client and server.

Add the `DDERunTraceLevel` tag to the appropriate INI file:

| Client | INI File | Section |
|--------|----------|---------|
| Business Information Server for Microsoft Windows Client | `MAPPER.INI` (create in the Windows directory if absent) | `[MAPPER]` |
| Graphical Interface for Business Information Server | `MPC.INI` | `[MPC]` |

| Trace Level | Description |
|-------------|-------------|
| `0` | No tracing. Existing trace file is not altered. |
| `1` | Minimal — logs each `@DDE` execution with a timestamp and real window handle (milliseconds since Windows started). |
| `2` | Medium — adds tracing for each Windows DDE message sent and received. |
| `3+` | Maximum — adds a full hex and ASCII dump of all data exchanged. |

Output is written to `DDETRACE.TXT` in the default Windows directory, initialized each time the client launches.

> **Note:** Do not rely on the format or content of this trace file — it may change with each product release.

### DDE Messages Reference

| Message | Description |
|---------|-------------|
| `WM_DDE_ACK` | Sent in response to another application's message; indicates assent or dissent. |
| `WM_DDE_ADVISE` | Sent by client to request continuously updated data from a server (permanent data link). |
| `WM_DDE_DATA` | Sent by server in response to a client request. |
| `WM_DDE_EXECUTE` | Sends a command string to the server to process as a series of commands. |
| `WM_DDE_INITIATE` | Sent by client to one or more applications to initiate a DDE conversation. |
| `WM_DDE_POKE` | Unsolicited data sent by a client to a server. |
| `WM_DDE_REQUEST` | Sent by client requesting a one-time data transfer (item = bookmark, cell reference, named range, etc.). |
| `WM_DDE_TERMINATE` | Sent by either party to end a DDE conversation. |
| `WM_DDE_UNADVISE` | Sent by client indicating continuous updates are no longer required. |

> The window handle of the receiving window appears as the first parameter of these calls (actual window handle, not the host-generated handle used by `@DDE`). The second parameter contains the message; the third identifies the sending window; the fourth contains message-specific arguments.

---

## Examples

### Advise and Unadvise

Sets up an advisory for Excel cell R1C1, waits for a change, then retrieves the updated value:

```
@dde,"excel",,i,mysheet.xls,text <xl>i6 .         initiate conversation
@dde,"",<xl>,a,R1C1,text .                         set up advisory for R1C1
@inp .                                              wait for something to happen
@if actinp$ ne <xl> gto lin-1 .                    was this the EXCEL advisory?
@dde,"",<xl>,u,R1C1,text .                         cancel the advisory
@dde,"",<xl>,r,R1C1,text .                         get the changed data
@dsx,-0 .                                          show the changed data
```

### Poke and Execute — Excel

Manipulates a document in Excel. Note: does not apply if a Microsoft Excel document is already open.

```
@ BRK PCW,-0,2 'C:\TEMP\test.txt' .               download the file
@ DDE,"Excel",,i,,text,,0010 <DDE>i6 .             check if Excel is already running
@ DDE,"[Open('"'C:\TEMP\test.txt'"')]",<DDE>,e,,text .
@ CLS,<DDE> .
@ DDE,"Excel",,i,,text,,0010 <DDE>i6 .
@0005:DDE,"1234]5678",<DDE>,p,R1C1:R1C2,text .    ] represents tab character
@ REL .
@ .~~~~ Start Excel ~~~~
@0010:PC 'C:\Program Files\Microsoft Office\Office11\Excel C:\TEMP\test.txt' .
@ DDE,"Excel",,i,,text <DDE>i6 .                  initiate conversation
@ GTO 0005 .
```

### Find and Replace in Word

```
@ RSL,0,b,2 .
@ PCW,-0,45 'C:\TEMP\mydoc.rtf' .
@ PC 'Winword C:\TEMP\mydoc.rtf' .
@ DDE,"WinWord",,i,C:\TEMP\mydoc.rtf,text <word>i4 .
@ DDE,"[EditFind.Find='"'GREENBOX8'"']",<word>,e,,text .
@ DDE,"[Insert '"'BLUEBOX'"']",<word>,e,,text .
@ REL .
```

### Transferring Large Data (over 64,000 characters)

Uses `PCW` to write a large report to a file, opens it in Word, processes it, saves it, then retrieves the result with `PCR`:

```
@dde,"WinWord",,i,system,text <word>i6 .
@pcw,0,f,10 'c:'RSLANT$'large.fil' .              write large report to file
@dde,"[FileOpen .Name ='"'c:\large.fil'"']",<word>,e,,text .
@dde,"[FileSaveAs .Name='"'c:\large.fil'"',.Format=2]",<word>,e,,text .
@cls,<word> .                                      terminate the conversation
@pcr,0,f,10,n,y 'c:\large.fil' .                  retrieve the returned result
```

### Transferring Medium Data (under 64,000 characters)

```
@dde,"WinWord",,i,SomeWordFile,text <word>i6 .
@dde,0,b,2,,MyFile,<word>,p,SomeWordItem,text .    pass data from report
@dde,"",<word>,r,SomeWordItem,text .               return processed data
@cls,<word> .
@dsx,-0 .                                          display the result
```

### Conversation without a Topic

Initiates a topicless conversation to open a spreadsheet, then starts a new focused conversation:

```
@dde,"Excel",,i,,text <xl>i6 .                    initiate without a topic
@dde,"[Open('"'c:\mysheet.xls'"')] [CALCULATE.NOW()]",<xl>,e,,text .
@cls,<xl> .                                        close this conversation
@dde,"Excel",,i,mysheet.xls,text <xl>i6 .         start focused conversation
@dde,"",<xl>,r,R1C1,text .                        grab a data item
@rdl,-0,2 2-10 <data>s10 .                        read the data
@dde,"[File.Close(False)][Quit()]",<xl>,e,,text .
@cls,<xl> .
```

### Sending Small Data to Excel

Sends two values to adjacent cells in `expenses.xls`. The tab character (`|`) tells Excel to place data in adjacent cells:

```
@dde,"1234|5678",<comm>,p,expenses.xls,text .
```

### Requesting Data from Excel

Requests data from rows 1–2, columns 1–10 of `expenses.xls`:

```
@dde,"",<comm>,r,R1C1:R2C10,text .
```

### Returning Data to a Specific Drawer

Both statements below return `SomeItem` to drawer A. The first defaults to the current drawer (set with `@BRK`); the second specifies `c,d` explicitly:

```
@brk,0,a dde,"",<dde>,r,SomeItem,text .
@dde,0,a,,,,<dde>,r,SomeItem,text .
```

### Handling Error Conditions

Starts a conversation with `MyApp`, starting the application if it is not already running:

```
@0010 .
@dde,"MyApp",,i,MyTopic,text,,0015 <app>i6 .      start conversation
@esr .                                             successful — exit subroutine
@.
@0015:if stat1$ = 13 gto lin+1 ; gto 0020 .       MyApp failed to respond?
@pc,b c:\MyPath\MyAppExe.exe .                     not running — start it
@gto 0010 .                                        try again
@0020:brk .                                        unrecoverable error
Failed to start conversation with MyApp
@brk dsx,-0 .
```

### Ending a Conversation

```
@dde,"MyApp",,i,MyTopic,text <app>i6 .            start conversation
@.
@. ... conversation ...
@.
@cls,<app> .                                       close the conversation
```
