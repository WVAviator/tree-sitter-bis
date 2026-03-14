# BIS Scripting Best Practices & Guidelines

## Overview

The Unisys Business Information Server (BIS) provides a scripting language (commonly known as **BIS Script**) for developing custom applications. This document covers best practices and guidelines used by Unisys developers when creating BIS scripts.

> This document applies to all versions of Business Information Server: ClearPath® OS 2200, Red Hat Linux, SUSE Linux, and Microsoft Windows. It covers BIS Script only — not other scripting languages such as JavaScript.

BIS Script may also be referred to as:
- BIS Script / BIS Run language / ICE Run language / Run language

Programs written in BIS Script are referred to as:
- BIS Runs / ICE Runs
- BIS Applications / ICE Applications
- BIS Scripts / ICE Scripts
- Runs

---

## Development Environment

Script writers and inspectors should be familiar with:
- The **Business Information Server Command Reference** (in the BIS Standard Help Library)
- The **Business Information Server Application Portability Quick Reference**

Both are available at [http://www.support.unisys.com](http://www.support.unisys.com) under *Application Development Solutions*.

The **Business Information Server Developer Workshop** is the recommended IDE for creating, maintaining, and debugging BIS applications. Key features include:
- A project-based approach for organizing application components
- A modern script editor with syntax highlighting and context-sensitive help
- A powerful interactive script debugger
- A Form Designer tool for creating GUI forms and dialogs

---

## Guidelines Format

Each guideline is categorized as **Required**, **Recommended**, or **Suggested**, based on usage by Unisys application developers.

---

## Script Control Report (SCR)

**Required:**
- Ensure that all new user interface scripts executing on the Graphical Interface for BIS (GI-BIS) are graphical.

**Recommended:**
- Ensure that business logic executes from 80-character reports.
- *(OS 2200)* Ensure that business logic executes from a Full Character Set (FCS) report.
- Make graphical screens table-driven. Locate tables in drawer C of the Language Cabinet (`LCAB$`).
- Write scripts to be portable to all business unit product platforms, except for platform-specific scripts.

---

## Labels

**Required:**
- Create all labels to be exactly four characters in length, with leading zeros.
- Create a label table (BLT) for all released scripts.
- Never place label numbers inside a variable — make labels visible and straightforward for readability and supportability.
- *(OS 2200)* Ensure no label number exceeds configuration parameter `LABNUM` (maximum label count, currently defaults to 399).

**Recommended:**
- Create all labels in numeric order.
- Use numeric gaps between labels to allow for future expansion while maintaining numeric order (e.g., using only odd-numbered labels leaves even numbers available for future additions).
- Maintain consistency in the use of colons following a label for readability.

**Suggested:**
- Relative line numbers `LIN-0`, `LIN1`, and `LIN-1` may be used in some situations as an alternative to label numbers. `LIN2` and `LIN-2` are marginally acceptable. Avoid all other relative line numbers.

---

## Variables

**Required:**
- Always use named variables rather than numbered variables, except when setting `v190`–`v194` for the system register-an-error (RER) routine.
- *(OS 2200)* Ensure the number of local variables used does not exceed configuration parameter `VARNUM` (maximum variable count, currently defaults to 199).
- Use a [`@LDV`](../statements/LDV.md) (Load Variable) statement to load variables with data.
- Use a [`@JUV`](../statements/JUV.md) (Justify Variable) statement to justify variables containing numbers.
- Use a [`@LDV`](../statements/LDV.md) statement to justify variables that do not contain numbers.
- Use [`@INC`](../statements/INC.md) (Increment) and [`@DEC`](../statements/DEC.md) (Decrement) statements to increment and decrement variable contents.
- Use a [`@CHG`](../statements/CHG.md) (Change Variable) statement for simple math on variable contents.
- Use [`@ART`](../statements/ART.md) (Arithmetic) only when `@CHG` cannot accomplish the task.

**Recommended:**
- Use `I`-type or `F`-type variables for numeric data.
- Use `H`-type or `S`-type variables for character data.
- Avoid `A`-type variables (they do not port well, are expensive to process, and are generally unnecessary), with these exceptions:
  - On `INPUT$` statements where you need to distinguish a zero from a blank (I-type converts blanks to zeros; H-type cannot manipulate numeric data).
  - To allow an `IF` statement to differentiate between a blank and a zero.
  - To maintain and process leading zeros on certain date formats.
- Never use `O`-type (octal) variables — they are not supported on open systems platforms.
- Avoid reusing the same variable name for multiple different data types throughout a script.
- Define variables containing fixed data values at the beginning of the routine for easier maintenance.
- Define variables containing temporary data values only when and where they are used.
- Do not overuse global variables — passing data on the `CALL` statement to called routines is the industry standard.
- Maintain meaningful variable names; use abbreviations only when relevant to usage.

---

## Field Names

**Required:**
- Never place a field name inside a variable — make all field names visible and straightforward for readability and supportability.

**Recommended:**
- Use the full field name when referenced in a statement.

---

## Formatting Statements

**Required:**
- Begin all executable lines with a master space (`@`) in column 1. If a label is required, place it next. If no label is required, place five spaces and then the first script statement in column 7 (allowing easy reference to labels).
- Terminate all executable lines with a space-period-space (` . `).
- Ensure all `IF` statements contain a semicolon followed by a statement (or a period) to handle the `ELSE` condition.
- Never hard-code cabinet and drawer letters. Use `ECAB$` and `EDRW` for portability, and `:DEFINE` values for other cabinets and drawers.
- Always use `LDV,W` when loading reserved words for script portability, or specify `:OPTIONS +LDVRW` if available.

**Recommended:**
- Understand the effects of using the asterisk on the `CALL` statement — know when to use it and when not to.
- For `IF` statements, prefer the computational `IF/GTO` format when applicable. For example:
  ```
  @IF <xxx> EQ 1,(label),2,(label),3,(label) ;
  ```
  rather than:
  ```
  @IF <xxx> EQ 1 GTO label ; IF <xxx> EQ 2 GTO label ;
  ```
- Avoid continuation lines where possible — multiple lines usually execute as fast or faster and are much easier to read and maintain.

**Suggested:**
- Avoid placing multiple statements on one line except when space or performance is an issue, as this improves readability and reduces the need for continuation lines.
- Combine multiple related run statements on the same line, separated by two spaces.
- Place short comments after the space-period-space to document your code. Block comments can reduce or eliminate this need.

---

## Formatting Reports

**Required:**
- Do not use `:DEFINE` and `:INCLUDE` in production scripts. Instead, use a source report containing `DEFINE` and `INCLUDE`, BLT that version, and save it as an executable report in a separate location. Always run the executable report and retain the source report for future updates.
- Use only one entrance and one exit in called subroutines.
- Maintain consistent capitalization of variable names, `RESERVED$` words, and constant variables throughout a project. Define this convention at project definition time.
- Isolate logical sections of the report with comments or comment lines. Keep logical sections to a size that fits on a normal screen (approximately 30–40 lines). For example:

  ```
  @. --------------------------------------------- . –.INITIALIZE.------
  @. --------------------------------------------- . –.L O G I C.-------
  @. --------------------------------------------- . –.C H E C K.-------
  @. --------------------------------------------- . – L O O P.---------
  @. --------------------------------------------- . – B U I L D.-------
  @. --------------------------------------------- . – Subroutine ------
  @. --------------------------------------------- . – E R R O R -------
  @. --------------------------------------------- . – E N D -----------
  ```

**Recommended:**
- Specify BIS command names in either consistently lowercase (e.g., `ldv`) or consistently uppercase (e.g., `LDV`) — define this convention at project definition time.
- Capitalize the first letter of variable names. When using multiple words, capitalize the initial letter of each word (e.g., `<MyScreen>`).
- Use block comments by placing `@` in column 1, `.` in column 2, and a space in column 3, then placing the comment text in the remaining columns.
- Dedicate the first 10–30 lines of every script to documentation. Example header template:

  ```
  @. ***************************************************************
  @. SCRIPT - Name of Script, (Parameter1, Parameter2 and so on...)
  @.
  @. SYNOPSIS –
  @. Enter the description of the script and what is the expected
  @. outcome.
  @.
  @. CALLING PARAMETERS -
  @. This section describes the individual parameters passed to
  @. the script.
  @.
  @. LOCATION of EXTERNAL ROUTINES –
  @. This section should contain all external subroutines called
  @. by this script such as external screens.
  @.
  @. MESSAGES -
  @. This section should contain all error message descriptions.
  @.
  @. COMMENTS:
  @. This section is reserved for any additional information the
  @. scriptwriter would like to add to describe this script.
  @. ***************************************************************
  ```

  And for subroutines:

  ```
  @. ***************************************************************
  @. SUBROUTINE - Name of Subroutine, (Par1, Par2 and so on...)
  @.
  @. SYNOPSIS –
  @. Enter the description of the subroutine and what is the
  @. expected outcome.
  @.
  @. CALLING PARAMETERS -
  @. This section describes the individual parameters passed to
  @. the subroutine.
  @.
  @. MESSAGES -
  @. This section should contain all error message descriptions.
  @.
  @. COMMENTS:
  @. This section is reserved for any additional information the
  @. scriptwriter would like to add to describe this subroutine.
  @. ***************************************************************
  ```

**Suggested:**
- Use line spacing consistently within a report (e.g., blank lines following logical sections improve readability, but can affect performance). Consistency is the key.
- Ensure blank lines contain `@.` in the first two columns to avoid inserting blank lines into the output area.

---

## Unisys Graphical Interface (GI-BIS)

**Required:**
- Ensure consistent look and feel throughout the script.
- Ensure the script verifies client and server capabilities (`DWCAP$`) and gracefully errors if the user's environment does not support the features used.
- Specify default colors as `3d/3d`. Few exceptions require other colors — 3-D objects (Text Box and Edit Box) work best with 3D colors.

**Recommended:**
- Keep GUI screen design clean and simple — avoid cluttered screens.
- Use standard library routines whenever possible (e.g., About and Help).
- Use the Developer Workshop Form Designer to simplify form/dialog layout.

**Suggested:**
- Because F1 is the Microsoft standard Help key, consider this where possible.
- Avoid using the X-option and F-option when creating windows, as these allow users to resize windows at execution time, which interferes with dynamic positioning.

---

## Register an Error Routine / Register an Abort Routine

**Required:**
- Always register an error routine (`RER`). In the main routine, register the RER to execute the system dump routine (`2200=2F0`, `CORE=2E0`). In called subroutines, the RER may return to the main routine instead.
- Always register an abort routine (`RAR`) to handle the ESC key, both in the main routine and in all called routines.

**Recommended:**
- While in debug mode, send error dumps to your station (`STNUM$`) or user-ID. For production scripts, send error dumps to the BIS administrator station (`COORD$`).
- Always remove `DEBUG` code from scripts before release. Debug code in a production product is not acceptable.

---

## Outdated Statements

The following statements must **never** be used:

| Statement | Description | Replacement |
|-----------|-------------|-------------|
| `OUT` | Output data statement | — |
| `OUV` | Output Variable statement | — |
| `OTV` | Output Variable statement | — |
| `ITV` | Input Variable statement | — |
| `PSH` | Push Variable statement | Use [`@CALL`](../statements/CALL.md) |
| `POP` | Pop Variable statement | Use [`@CALL`](../statements/CALL.md) |
| `PEK` | Peek Variable statement | Use [`@CALL`](../statements/CALL.md) |
| `POK` | Poke Variable statement | Use [`@CALL`](../statements/CALL.md) |
| `RMV` | Remove Variables statement | Use [`@CALL`](../statements/CALL.md) |
| `XCH` | Exchange Variable statement | Use [`@CALL`](../statements/CALL.md) |
| `RRN` | Remote Run statement | Use [`@NET`](../statements/NET.md) |
| `RTN` | Remote Return statement | Use [`@NRT`](../statements/NRT.md) |
| `GTO RPX` | Go execute in another report | Use [`@CALL`](../statements/CALL.md) or `RSR` |
| `CHD` | Command Line Handler | — |

The following statements are **not recommended**:

| Statement | Notes |
|-----------|-------|
| [`@CLV`](../statements/CLV.md) | Clear Variables |
| `LMG` | List Merge function |
| `OUM` | Output Mask function |
| `WPR` | Word Processing function |
| `WSF` | Display Workstation Form |

The following statements are **not suggested**:

| Statement | Notes |
|-----------|-------|
| `DAT` | When processing report data, `CAL` is more efficient |
| `INS` | Insert in Variable — use `LDV` substrings instead |
| `LLN` | Last Line function — use `LZR` instead |
| *(platform-specific functions)* | Avoid functions that do not exist on all platforms |

---

## Conclusion

Following these guidelines when creating BIS scripts enables you to develop applications with optimum quality, reliability, and maintainability.
