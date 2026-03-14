# @XQT — Execute

## Overview

Executes one or more statements, including data for output areas. Up to 1280 characters of data (one logic line) may be executed.

After interpreting `@XQT`, the system executes either the data at the specified label or line number, or the data in the `vld` field. Once complete, the run continues at the line following `@XQT` — unless the executed statement transfers control to a new location (e.g., via `@GTO`, `@RUN`, or `@XIT`).

If the executed statement fails, the run goes to the label on the `@XQT` statement. If no label is specified, the run terminates with an error and a system message is displayed.

---

## Syntax

```
@XQT{,lab | vld} .
```

### Parameters

| Field | Description |
|-------|-------------|
| `lab` | Label or line number relative to the `@XQT` statement containing the statements to execute. For relative line numbers, prefix with `lin` (e.g., `@xqt,lin <lineno>`). A variable or constant containing the label or line number may also be used. |
| `vld` | Data to execute. May be specified using variables, literals, constants, reserved words, or any combination. Variables must be packed if combined with other data types. |

---

## Guidelines

- Use the `lab` subfield to execute a line already containing statements, or formulate the statement dynamically within the run using variables (e.g., data captured from an input screen).
- Do not place other statements on the same line after `@XQT` — they will be ignored. Put the next statement on a new line.
- If the data to execute is a statement, its first character must be `@`; otherwise it is treated as output area data and the run continues at the next line.
- Any characters may be included in the data to execute except the reverse slant (`\`). Commas (`,`) and slants (`/`) do not need to be enclosed in apostrophes.
- `@XQT` statements may be nested — one `@XQT` can execute another, which can execute another, and so on.

---

## Examples

### Executing from a Variable

Executes the statement stored in `<srh2b>`:

```
@xqt <srh2b> .
```

### Executing from a Label

Executes the statement at label 100:

```
@xqt,100 .
```

### Reading and Executing a Line from Another Report

Reads line 1–80 from report 2 in `EDRW$` into `<data>`, then executes it:

```
@rdl,edrw$,2,<line>,099 1-80 <data>s80 .
@xqt <data> .
```

### Executing a Line Based on Menu Selection

Determines which line to execute based on the user's menu selection from an input screen:

```
1. @out,-1,2,10,1,1,,,,5 .
2. @chg v1i2 curv$ +3 if v1 ge 3 &; le 5 gto lin+1 ; \ gto 001 .
3. @xqt,lin v1 .
4. @dsp,-0 .
5. @rel .
6. @srh,-0,,,099 dh 'status date' ,861225 .
7. @srh,-0,,,099 dh 'ship date' ,870614 .
8. @sor,-0 '' 'product type' ,1 .
```

| Line | Description |
|------|-------------|
| 1 | Display the menu to the user. |
| 2 | Capture the user's menu selection in `v1` based on vertical cursor position, then adjust it to the bias of the target line. |
| 3 | Execute the relative line pointed to by `CURV$+3`. |
| 4 | Display the result of the user's selection. |
| 5 | Release the display if the user resumes the run. |
| 6 | Executed if the user transmits from line 1 of the screen. |
| 7 | Executed if the user transmits from line 2 of the screen. |
| 8 | Executed if the user transmits from line 3 of the screen. |
