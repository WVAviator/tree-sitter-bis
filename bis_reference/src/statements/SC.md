# @SC — Screen Control

## Overview

Use the `@SC` statement to create menus, input screens, and overlays using screen commands.

`@SC` has two formats:
- **Format 1** — Directly specify screen commands inline.
- **Format 2** — Access a report containing screen commands (also called a **form**).

If you use Format 2, a report containing executable screen commands must already exist.

> **Tip:** You can also design screens using the menu-driven [`SCGEN`](../runs/SCGEN.md) (Screen Control Generator) run. Enter `apt` on the control line, tab to SCGEN, and press Help.

---

## Syntax

### Format 1 — Inline Screen Commands

```
@SC[,,,,,,tabp,sn,lab] o scmnd .
```

### Format 2 — Form (Report-Based)

```
@SC,c,d,r[,l,q,tabp,sn,lab] o [fldtxt] .
```

### Parameters

| Field | Format | Platform | Required | Description |
|-------|--------|----------|----------|-------------|
| `c,d,r` | 2 only | All | Required | Report containing screen commands (the form). |
| `l` | 2 only | All | Optional | Line number in the report at which to start reading screen commands. Default = 2. |
| `q` | 2 only | All | Optional | Number of lines to read in the report. Default = all lines to end of report. |
| `tabp` | Both | All | Optional | Tab position at which to place the cursor. `n` = forward, `-n` = backward from home position. Maximum = 100. Default = no positioning. |
| `sn` | Both | 2200 only | Optional | Station number where output is to be displayed. If omitted or zero, output displays at the station executing the run. |
| `lab` | Both | 2200 only | Optional | Label to go to if output to another station cannot be completed. If omitted and output fails, the run terminates with an error. |
| `o` | Both | All | Optional | Options field. See [Options](#options). |
| `scmnd` | 1 only | All | Required | Screen command or commands to execute. See [Screen Commands](#screen-commands). |
| `fldtxt` | 2 only | All | Optional | Field text. Comma-separated list of values to insert into unprotected fields, in the order fields appear. Only interpreted when the `T` option is specified. |

---

## A Form

A form is a report containing executable `@SC` commands. An SC form can consist of up to three sections:

- **Command section** — Starts at the beginning of the form and continues to the first `END` command.
- **Edit section** — Starts after the first `END` command and continues to the second `END` command. See [Verifying User Input (EDIT) Command](#verifying-user-input-edit-command).
- **Help section** — Begins immediately after the second `END` command and extends to the end of the form. See [Special FKEY Actions](#special-fkey-actions) for context-sensitive help information.

---

## Options

| Option | Platform | Description |
|--------|----------|-------------|
| `B` | All | Blink. Changes `<` and `>` signs to left and right blink characters in all literal text. |
| `C` | All | Center. Centers screen output designed for standard 80-character terminals on terminals of other widths. *(Windows / Linux / UNIX)* Note: An extra field is created when `C` is used with a screen that returns input and the screen width exceeds 80 columns, causing field/variable misalignment. Either remove `C`, reset terminal size to 80, or redesign the screen. |
| `H` | All | Home Cursor Bypass. Bypasses the initial automatic `HC` command. Cursor position is unknown until a command establishes an absolute position (e.g., `PREP`, `FLD,r,c`, `DATA,r,c`). |
| `I` | All | Interim Output. Resumes the run automatically when output is completed. Input is not accepted. See also `Q`. |
| `K` | All | Key Mapping. Keeps current function key mapping and input editing in effect. By default, `@SC` clears them before executing the first screen command. Does not prevent the bottom screen line from being erased. |
| `L` | All | Line Control. Enables regaining line control on the previously displayed report using the Paint key. |
| `M` | All | Mask. Sends data but not spaces. Only columns containing new data are overwritten — old and new data are blended. |
| `O` | All | Overlay menu. Reprocesses screen commands but repaints only the text. Efficiently repaints or puts new data onto a menu already on screen. |
| `Q` | All | Quick Output. Resumes the run as soon as output is displayed, without suspending pending completion. Similar to `I` but does not wait for completion. |
| `S` | Windows / Linux / UNIX | Sends data including all spaces. Without this option, if fewer than six consecutive spaces appear, they are sent; if six or more appear, the cursor skips over them. |
| `S` | 2200 only | Sends data including all spaces. Without this option, results are unpredictable across terminal types. |
| `T` | All | Field Text. Inserts values from the `fldtxt` field into unprotected screen fields created with `FLD` and `AREA` commands. Valid only in Format 2. Values are supplied in the order commands appear in the report. |
| `U` | Windows / Linux / UNIX | Update Control. Overlays a current report with data while enabling manual SOE updates. Only meaningful when a report is on display. Note: Some statements release update control without removing the report from screen. Update control requires both `DRW$` and `DLINE$` to be nonzero. |
| `U` | 2200 only | Same as above, and also enables the run user to update the current report or result (`-0`) whether it is on display or not. |
| `X` | All | Forces a screen transmit after it is displayed, as if the user pressed Transmit. |

---

## Screen Control Outcome

When `@SC` output is displayed, the run suspends until the user presses Transmit or a function key, unless the statement options indicate interim output (`I`) or a forced transmit (`X`).

---

## Error Status Reserved Words

If the run fails while processing an `@SC` statement:

- `STAT1$` — Column number where the error occurred. If reading commands from a report, contains a report column number; otherwise, contains the character position in the interpreted `scmnd` string.
- `STAT2$` — Report line number where the error occurred (Format 2 only).

---

## Screen Commands

Screen commands perform basic screen operations such as positioning the cursor, clearing the screen, defining fields, and mapping function keys. They are grouped into the following categories:

- **Field attribute commands:** `PREP`, `FLD`, `DFLD`, `AREA`, `DEF`, `MSG`, `ATT` — See [Field Attribute Commands](#field-attribute-commands).
- **Text handling commands:** `DATA`, `LIST`, `#PAGE`, `EMP`, `TIC`, `SOE`, `LB`, `RB` — See [Text Handling Commands](#text-handling-commands).
- **Cursor control commands:** `HC`, `PC`, `CR`, `TAB` — See [Cursor Control Commands](#cursor-control-commands).
- **Setup commands:** `END`, `FKEY`, `BEEP`, `CP`, `MODE`, `OPTS` — See [Setup Commands](#setup-commands).
- **Screen editing commands:** `PD`, `CS`, `ED`, `EUD`, `EEL`, `DIL`, `DID`, `IIL`, `IID`, `DL`, `IL`, `DUP` — See [Screen Editing Commands](#screen-editing-commands).
- **Screen printing commands:** `PRT`, `PRF`, `LF`, `FF` — See [Screen Printing Commands](#screen-printing-commands).
- **Special FKEY actions:** `DSPFORM`, `DSPHELP`, `FORMRET`, `PAGE`, `SELECT`, `KEY`, `$#`, `$n`, `%#`, `%n` — See [Special FKEY Actions](#special-fkey-actions).

### Command Quick Reference

| Command | Description |
|---------|-------------|
| `AREA[,,r,c,rsiz,csiz,o,attr,fldchar]` *(2200)* / `AREA[,name,r,c,rsiz,csiz,o,attr,fldchar]` *(Win/Linux)* | Lay out an entire region of the screen including text and fields. See [AREA Command](#area-command). |
| `ATT,attr[,r,c]` | Place an attribute at the current or designated cursor position. |
| `BEEP` | Cause the terminal beeper to sound once. |
| `CP[,p]` *(2200 only)* | Alter the terminal setup (control page). |
| `CR[,n]` | Move the cursor to column 1 of the next screen line. |
| `CS` | Erase the entire display and move the cursor to the home position. |
| `DATA[,r,c,rsiz,csiz,pn,o,attr]` | Display a specified number of lines of text data at a specified position. See [DATA Command](#data-command). |
| `DEF,n,attr` | Define a numbered attribute for subsequent use in other screen commands. |
| `DFLD[,name,o,attr,text]` | Define field characteristics for later use by the `AREA` command. |
| `DID[,n]` | Delete the unprotected character under the cursor, shifting succeeding characters left to end of field or display. |
| `DIL[,n]` | Delete the unprotected character under the cursor, shifting succeeding characters left to end of field or line. |
| `DL[,n]` | Delete the line the cursor is on, moving remaining lines up. |
| `DSPFORM,r[dc],pn,tabp,stack,o [fldtxt]` | Access a form when a function key is pressed. |
| `DSPHELP[,o]` | Display context-sensitive help text for a form field. |
| `DUP[,n]` | Duplicate the line the cursor is on onto the line directly below it. |
| `Dn [min-date[/max-date]]` | Specify a range of dates for a date field. Use `'TODAY'` for the current date. |
| `ED` | Erase the display from the current cursor position to the end of the screen. |
| `EDIT fld[,fld...,fld]` | Verify user input. See [Verifying User Input (EDIT) Command](#verifying-user-input-edit-command). |
| `EEL` | Erase from the current position to the end of the line or field, whichever comes first. |
| `EMP[,p,p,...,p]` | Highlight or emphasize text. |
| `END` | Mark the end of a form section or page section. |
| `EUD` | Erase the unprotected portion of the display from the cursor to end of screen. |
| `F [min[/max]]` *(2200 only)* | Specify a range of integer, fixed, or floating point numeric values for a numeric field. |
| `FF` | Place a form feed character at the current cursor position. |
| `FKEY,n,title,action` | Specify an action to perform if a particular function key is pressed at the next input. |
| `FLD[,r,c,rsiz,csiz,o,attr,,text]` | Generate a field on the screen. See [Field (FLD) Command](#field-fld-command). |
| `FORMRET,stack,o [fldtxt]` | Return to a previous form as determined by the forms return stack. |
| `HC` | Move the cursor to home position. |
| `HELP,fld,...fld row ... \|` | Identify help text and determine where context-sensitive help is placed on screen. |
| `IID[,n]` | Insert a space at the cursor, shifting characters right to end of field or display. |
| `IIL[,n]` | Insert a space at the cursor, shifting characters right to end of field or line. |
| `IL[,n]` | Insert a blank line at the cursor, moving the cursor line and remaining lines down. |
| `KEY[,text]` | Allow the function key to be passed directly to a run. |
| `LB[,c \| ,n]` | Place a left blink character at the current cursor position. |
| `LF[,n]` | Place `n` line feed characters at the current cursor position. |
| `LIST,r[dc],line fk,'Rollfw',fk,'RollBw'` | Create a list from a report and display it on a form. |
| `LOV "v1";"v2";...;"vn"` *(2200)* / `LOV[,C] "v1";"v2";...;"vn"` *(Win/Linux)* | Specify a list of legal values for a field. `C` option enables case-sensitive comparison. |
| `MODE[,p]` | Select the display mode of a graphics terminal. |
| `MSG,r,o,attr,text` | Display a message or prompt line. |
| `N [min[/max]]` | Specify a range of integer values for a numeric field. |
| `OPTS,[+\|-]` | Override a subset of `@SC` statement options in effect from the calling run. |
| `PAGE,p` | Page forward or backward in a form after the initial page is displayed. |
| `#PAGE[,n]` | Mark the beginning (and end) of a form page. |
| `PC,r,c` | Move the cursor to the specified row and column. |
| `PD` | Protect the display from the cursor position to end of display. |
| `PREP[,attr]` | Prepare the screen for an input menu by clearing the screen and placing an attribute at row 2, column 1. |
| `PRF` | Send unprotected data to the attached print device. |
| `PRT` | Send protected and unprotected data to the attached print device. |
| `RB[,c \| ,n]` | Place `n` right blink characters at the current cursor position. |
| `REQD[,n]` | Specify the minimum number of characters that must be entered into the field. |
| `RLOV rdc,linetype column-size` *(2200)* / `RLOV[,C] rdc[,linetype] column-size` *(Win/Linux)* | Similar to `LOV` but legal values come from the database. `C` option enables case-sensitive comparison. |
| `SELECT` | Select one of a group of actions or commands based on the field the cursor is in when a key is pressed. |
| `SOE[,c \| ,n]` | Place a start-of-entry (SOE) character at the current cursor position. |
| `Tn [min-time[/max-time]]` | Specify a range of times for a time field. Use `'TIME'` for the current time. |
| `TAB[,n]` | Tab the cursor forward `n` positions. |
| `TIC[,c \| ,n]` | Place `n` current literal delimiter characters at the current cursor position. |
| `$#` | Number of the field the cursor was in when the key was pressed. |
| `$n` *(Windows / Linux / UNIX)* | Insert the value of screen field `n`. |
| `%#` | Report line number of the currently selected list record. |
| `%n` | Insert the value of LIST data field `n`. |

---

## Syntax Rules for Screen Commands

- Use semicolons (`;`) to separate multiple commands on a line.
- If a command is too long for one report line, continue on the next line using a reverse slant (`\`) as a continuation character (outside literal delimiters).
- If a coordinate value is omitted, the current cursor position is used.
- If a coordinate value is signed (e.g., `+3` or `-10`), it is treated as relative to the current cursor position.
- The home position is `1,1` (row 1, column 1).
- Enclose attribute parameters in parentheses, e.g., `att,(rv,whi/red)`.
- Any string that is not a valid screen command name is treated as literal text.
- When commands are read from a report, a trailing space on any subfield or a space in column 1 terminates the scan of that report line. The remaining portion of the line can be used for comments.
- Not all screen commands produce the same results on all terminal types. Commands that cannot be executed on a particular terminal are generally ignored.

---

## Guidelines

- The system moves the cursor to the home position before the first screen command is interpreted, providing a known starting point.
- Screen commands are executed in the order they are specified.
- By default, `@SC` disables current function key mapping before the first command. Use the `K` option to retain the current mapping.

---

## Displaying and Processing Literal Text

Literal text (such as field or message text) containing spaces, commas, or semicolons must be enclosed in delimiters.

There are two run interpreters for processing literal text: **parameter** (Format 1) and **output area** (Format 2). Format 2 with a permanent report does not apply the parameter interpreter.

### Simple Literal Text

**Format 1 (statement):** Use a double set of literal delimiters:
```bismapper
@sc '' tic$'Glen Ellyn'tic$ .
```

**Format 2 (output area):** Enclose in single apostrophes:
```
''Glen Ellyn''
```

**Format 2 (permanent report):**
```
'Glen Ellyn'
```

### Literal Text Containing Apostrophes

**Format 1 (statement):** Redefine the delimiter to another character and use `TIC$` for the apostrophe:
```bismapper
@sc '' tic,%;%'We'tic$'ve got it!'% .
```

**Format 2 (output area):** Use two consecutive apostrophes to produce one:
```
tic,%;%We''ve got it!%
```

**Format 2 (permanent report):**
```
tic,%;%We've got it!%
```

### Literal Text from Run Variables

**Format 1 (statement):**
```bismapper
@sc '' tic$'Let '<who>' out'tic$ .
```

**Format 2 (output area):**
```
''Let <who> out''
```

### Complex Text with Variables and Apostrophes

**Format 1 (statement):**
```bismapper
@sc '' tic,%;%'Disa'tic$'s phone number is '<phone>% .
```

**Format 2 (output area):**
```
tic,%;%Disa''s phone number is <phone>%
```

---

## Field Attribute Commands

Use field attribute commands to define fields and their attributes. Attributes can be placed anywhere on the screen and extend forward to the immediate left of the next attribute or to the end of the screen.

### Prepare Screen for Painting (PREP) Command

Prepares the screen for an input menu by clearing the screen and assigning an attribute at row 2, column 1. Equivalent to: `CS;ATT,(attr),2,1`

```
PREP[,attr]
```

| Field | Platform | Description |
|-------|----------|-------------|
| `attr` | Windows / Linux / UNIX | Attribute to use in place of the default. Default = `pr, bac` (protected, background colors from Terminal Definition Report). |
| `attr` | 2200 only | Attribute to use in place of the default. Default = `pr, bac` (protected, white on black). |

### Field (FLD) Command

Generates a field on the screen.

```
FLD[,r,c,rsiz,csiz,o,attr,,text]
```

| Field | Platform | Description |
|-------|----------|-------------|
| `r,c` | All | Cursor position of upper left corner of the field. |
| `rsiz` | All | Vertical field size in rows. Default = 1. |
| `csiz` | Linux / UNIX / OS | Horizontal field size in columns. Default = 1. |
| `csiz` | 2200 only | Horizontal field size in columns. Maximum = one character fewer than screen width. Default = 1. |
| `o` | All | Border options: `A` (attributes, use with `B`), `B` (box), `F` (frame), `S` (sides), `T` (top), `U` (underline). Justification options: `C` (center), `L` (left), `R` (right), `V` (vary size to fit text). Miscellaneous: `E` (empty — don't display if no text), `P` (protect empty field or allow `T`-option data into PR-defined fields). |
| `attr` | All | Attribute defining field characteristics. Default = none. |
| `text` | All | Literal text for the field. If `T` option is used on `@SC`, text from `fldtxt` is used instead. |

After executing `FLD`, the cursor is placed on the last line of the field, two columns beyond the end of the field.

**Example — AR input screen:**
```
prep,(pr,bac)
fkey,1,Resume,rsm
fkey,2,Paint,pnt
fkey,4,Return,formret,7
fkey,8,Help,dsphelp
fkey,10,Quit,^
pc,1,61;'AR'
fld,2,6,6,69,afb,(PR,boc)
fld,2,6,,69,cv,(PR,tc),,' Add Report '
dfld,inp,u,(ts,ai,fc);dfld,,,(co,fc)
area,,3,8,4,65,,(pr,mc)
Report or drawer __inp_________
Title __inp_________________________________
end
```

### Define Field (DFLD) Command

Defines field characteristics for later use by the `AREA` command. Supplies all field information except screen location and size (supplied by `AREA`). All field definitions are discarded after an `AREA` command is processed. Up to 40 named and 40 unnamed fields may be defined.

```
DFLD[,name,o,attr,text]
```

| Field | Description |
|-------|-------------|
| `name` | Name of the field (maximum 12 characters). |
| `o` | Border options: `F`, `S`, `T`, `U`. Justification options: `C`, `L`, `R`, `V`. Miscellaneous: `E` (empty), `P` (protect or allow `T`-option data). |
| `attr` | Attribute for the field. Default = none. |
| `text` | Literal text. If `T` option is used on `@SC`, text from `fldtxt` is used instead. The statement supplies `T` option values in `AREA` command order, not `DFLD` command order. |

### AREA Command

Lays out an entire region of the screen including both text and fields. The area data begins in column 1 of the report line immediately following the `AREA` command. Fields within the area are indicated by underline characters (`_`).

> **Note:** `AREA` is valid only when reading screen commands from a report. It is recommended to use the `S` option on `@SC` when using `AREA`. Field characteristics must be pre-defined with `DFLD` commands.

```
AREA[,,r,c,rsiz,csiz,o,attr,fldchar]          (2200)
AREA[,name,r,c,rsiz,csiz,o,attr,fldchar]      (Windows / Linux / UNIX)
```

| Field | Platform | Description |
|-------|----------|-------------|
| `name` | Windows / Linux / UNIX | Name identifying the screen region. Valid until the screen is erased. System tracks up to 10 named areas. When input comes from a named area: `AREA$` = area name, `FIELD$` = field number within area, `CURV$/CURH$` = cursor coordinates relative to upper left of area. |
| `r,c` | All | Cursor position of upper left corner of the area. |
| `rsiz` | All | Vertical area size in rows. Default = 1. |
| `csiz` | All | Horizontal area size in columns. Default = 1. |
| `o` | All | Border options: `A` (attributes with `B`), `B` (box), `F` (frame), `U` (underline). Note: On 2200, box overwrites top/bottom rows and first/last columns; on Win/Linux, top/bottom rows are incorporated into the box. Miscellaneous: `D` (delimiter — mark fields with delimiter character only; named fields not recognized). |
| `attr` | All | Background attribute for the area. Default = none. |
| `fldchar` | All | Character that delimits fields within the area data. Default = underline (`_`). |

**Using AREA and DFLD Together:**
- Named fields in the area data use the `DFLD` command with the same name.
- Unnamed fields use `DFLD` commands with no name, in order. If there are more unnamed fields than definitions, the last definition is reused.

**Example — index user input menu:**
```
fld,3,9,10,60,afb,(pr,rv,boc)
fld,3,9,,60,cv,(pr,tc),,' Index User '
dfld,num,u,(ts,no,fc)
dfld,date,u,(ts,ai,fc)
dfld,,u,(ts,ao,fc)
dfld,,u,(ts,ai,fc),user$
dfld,,,(co,fc)
area,,4,11,8,56,,(pr,mc)
Number of lines from each report _num_
Drawer letter _
User-id (ALL for all) ____________
Last update start date (DDMMMYY) _date__
Last update end date (DDMMMYY) _date__
First report _num
Last report _num _
end
```

### Define Attribute (DEF) Command

Defines a numbered attribute for subsequent use in other screen commands.

```
DEF,n,attr
```

| Field | Description |
|-------|-------------|
| `n` | Attribute number (1 through 20). |
| `attr` | Attribute to define. See [Field Attribute Parameters](#field-attribute-parameters). |

**Example:**
```
def,1,(pr,whi/blu)
```

### Message (MSG) Command

Displays a message or prompt line.

```
MSG,r,o,attr,text
```

| Field | Platform | Description |
|-------|----------|-------------|
| `r` | All | Row on which to place the message. |
| `o` | All | Options: blank (display as given), `B` (blink), `E` (error format — center text, translate `<`/`>` to blink chars), `L` (left-justify), `R` (right-justify), `C` (center). |
| `attr` | Windows / Linux / UNIX | Screen attribute. Default = reverse video with system message color from user registration report. |
| `attr` | 2200 only | Screen attribute. Default = reverse video, white on red. |
| `text` | All | Literal text (up to 79 characters). |

After executing `MSG`, the cursor is placed in column 1 of the message line.

> **Note:** Placing `MSG` on a line other than the control line overrides previously defined attributes — lines below the message line are no longer protected.

**Example:**
```bismapper
@sc '' msg,1,e,,tic$'<That input is not valid>'tic$ .
```

### Attribute (ATT) Command

Places an attribute at the current or designated cursor position.

```
ATT,attr[,r,c]
```

**Example:**
```
att,(pr,whi/blu),2,1
```

### Using Inline Attributes

Use inline attributes in `DATA` and `AREA` commands to highlight words or phrases. Create inline attributes using the tilde (`~`) followed by a valid field attribute parameter or a previously defined attribute number.

**Example using attribute parameter:**
```
~(rv,yel/bla)SC uses inline attributes.~(whi/bla)
```

**Example using DEF-defined attributes:**
```
def,1,(pr,mc);def,2,(pr,whi/bla);def,3,(pr,yel/bla)
.
. (other screen control commands)
.
area,,3,2,4,76,,(pr,mc)
~3Move cursor to desired menu and press Transmit.~1
~2Accounting Functions~1
_ Payables Menu
_ Receivables Menu
```

---

## Text Handling Commands

### DATA Command

Displays a specified number of lines of text data starting at a specified screen position. Text begins in column 1 of the report line immediately following the `DATA` command, displayed exactly as it appears. The `DATA` command does not recognize commands or syntax characters within its text.

> **Note:** `DATA` is valid only when reading screen commands from a report. It is recommended to use the `S` option on `@SC` when using `DATA`.

```
DATA[,r,c,rsiz,csiz,pn,o,attr]
```

| Field | Description |
|-------|-------------|
| `r,c` | Cursor position at which to start displaying text. |
| `rsiz` | Number of rows of text to display. Default = 1. |
| `csiz` | Number of columns of text to display. Default = report line length or screen width, whichever is smaller. |
| `pn` | Page number. Indicates page-formatted data and specifies the default initial page. Use for multiple menus within one report or lengthy textual information. |
| `o` | Options: `W` (interpret reserved words, inline attributes, and literal delimiters), `L` (list data — precede `DATA` with a `LIST` command). |
| `attr` | Attribute for the data. Default = none. |

**Example:**
```
data,5,12,2,45,,,(co,mc,ts)
To stop the printer, press F1.
To resume printing, press F2.
```

---

## Verifying User Input (EDIT) Command

Use the `EDIT` command to verify user input. After a user completes fields on a form, the edit section verifies input before continuing. If any value is in error, a message is displayed and the cursor is placed in the error field.

> **Note:** All input fields must have the tab stop (`TS`) attribute for editing to work properly.

One `EDIT` command can apply to any number of fields.

### Format 1 — Date Validation *(2200 only)*

```
EDIT f Dn date1[/date2]
```

| Field | Description |
|-------|-------------|
| `f` | Input field number. |
| `Dn` | Date format number. |
| `date1` | Required single or starting date. |
| `date2` | Optional ending date. |

### Format 2 — Time Validation *(2200 only)*

```
EDIT f Tn time1[/time2]
```

| Field | Description |
|-------|-------------|
| `f` | Input field number. |
| `Tn` | Time format: `0`=HH:MM:SS, `1`=HH:MM, `2`=HHMMSS, `3`=HHMM. |
| `time1` | Required single or starting time. |
| `time2` | Optional ending time. |

### Format 3 — General Field Validation

```
EDIT fld[,fld...,fld]                       (Windows / Linux / UNIX)
EDIT fld[,fld...,fld "text"]                (2200)
```

| Field | Platform | Description |
|-------|----------|-------------|
| `fld,...fld` | All | Field number(s) to which subsequent rule statements apply. Use hyphens for ranges (e.g., `EDIT 1,3,7-10,12`). |
| `"text"` | 2200 only | Error message displayed when input does not pass the rule checks. Enclose in `"` or `'` as appropriate. |

The current editing remains in effect until the next output (see the `K` option).

### Rule Statements

| Rule | Platform | Description |
|------|----------|-------------|
| `REQD[,n]` | All | Minimum number of characters that must be entered. Default = 1. |
| `N [min[/max]]` | All | Range of integer values. Default = no limit. |
| `F [min[/max]]` | 2200 only | Range of integer, fixed, or floating point values. Default = no limit. |
| `Dn [min-date[/max-date]]` | All | Range of dates. Use `'TODAY'` for current date. Defaults = January 1, 1600 and December 31, 2299. |
| `Tn [min-time[/max-time]]` | All | Range of times. Use `'TIME'` for current time. Defaults = 00:00:00 and 23:59:59. (`'TIME'` not valid for `T4`/`T5`; no default limits for `T4`/`T5`.) |
| `LOV[,C] "v1";"v2";...;"vn"` | Windows / Linux / UNIX | List of legal values. `C` option = case-sensitive. |
| `LOV "v1";"v2";...;"vn"` | 2200 only | List of legal values. |
| `RLOV[,C] rdc[,linetype] column-size` | Windows / Linux / UNIX | Legal values from the database. Default = tab lines. `C` option = case-sensitive. |
| `RLOV 'report-name'[,linetype] 'field-name'` | 2200 only | Legal values from a named report and field. |

**Example:**
```
end                              (end of command section)
edit 1
  rlov 1c2, 21-1 2-20            (values from report lc2)
edit 2
  n 1/65                         (numeric range 1-65)
edit 3
  lov "1";"2";"3"
edit 4
  lov "N";"Y";"A"
edit 5,6
  lov "n";"y"
edit 7
  rlov 3c2, 2-10
edit 8
  n 1/25
edit 9
  reqd
  d18 11301990/11301999          (date between Nov 30, 1990 and Nov 30, 1999)
edit 10
  d12 today/07DEC2001            (date between today and Dec 7, 2001)
end                              (end of edit section)
```

**Example (statements):**
```bismapper
@sc,-0 'cs' .                                           (output the screen)
@if FKEY$ eq 00,(lin1),10,(0199) ;.                    (check for function keys)
@if FIELD$ eq <LastFieldNum>,(lin2) ;SC,,,,,,-1 KX 'HC' . (force xmit?)
@gto lin-1 .                                            (keep checking FIELD$)
```

---

## Screen Control Date Formats

- Two-digit year dates: must represent dates between 1944 and 2043.
- Four-digit year dates: must represent dates between 1600 and 2299.
- One-digit year dates: must represent dates within -4 to +5 years from the current date.

| Number | Format | Number | Format |
|--------|--------|--------|--------|
| `0` | YMMDD | `11` | YYYYMMDD |
| `1` | YYMMDD | `12` | DD MMM YYYY* |
| `2` | DD MMM YY* | `14` | YYYYDDD |
| `3` | YDDD | `15` | DDMMYYYY |
| `4` | YYDDD | `16` | MM/DD/YYYY |
| `5` | DDMMYY | `18` | MMDDYYYY |
| `6` | MM/DD/YY | `19` | DD/MM/YYYY |
| `7` | MONTH DD, YYYY | `20` | YYYY-MM-DD |
| `8` | MMDDYY | `21` | DD-MMM-YY |
| `9` | DD/MM/YY | | |

*On OS 2200, spaces are optional.

---

## Screen Control Time Formats

- *(2200)* Elapsed time formats `T4` and `T5`: valid range is -9544371:46:07 to 9544371:46:07.
- *(Windows / Linux / UNIX)* Elapsed time formats `T4` and `T5`: valid range is -9544371:59:59 to 9544371:59:59.

| Number | Format |
|--------|--------|
| `0` | HH:MM:SS |
| `1` | HH:MM |
| `2` | HHMMSS |
| `3` | HHMM |
| `4` | HHHHHHH:MM:SS* |
| `5` | HHHHHHH:MM* |

*Hours can be 1–7 digits. If negative, the minus sign can be an 8th character. Output field values are right-justified, space-filled. If the output field is too small, it is filled with asterisks (`*`).

---

## Field Attribute Parameters

Field attributes are terminal dependent and may not be available on all terminals.

### Input Control Parameters

| Parameter | Platform | Description |
|-----------|----------|-------------|
| `AI` | All | Any input allowed (except kanji). |
| `AO` | All | Alphabetic input only. |
| `CO` | Windows / Linux / UNIX | Cursor only — user can move cursor into field but cannot type. Useful for menu selection items. |
| `CO` | 2200 only | Treated as `NO` on UTS terminals. |
| `NO` | All | Numeric input only. |
| `PR` | All | Protected — cursor cannot be placed in field. |

### Kanji Input Control Parameters *(Windows / Linux / UNIX only)*

| Parameter | Description |
|-----------|-------------|
| `AIK` | Any input including kanji (default). |
| `AK` | Alpha and kanji input. |
| `KO` | Kanji input only. |
| `NK` | Numeric and kanji input. |

### Intensity Parameters

| Parameter | Description |
|-----------|-------------|
| `BL` | Blinking. |
| `LI` | Low intensity. |
| `NI` | Normal intensity (default). |
| `VO` | Video off — makes text invisible. |

### Justification Parameter

| Parameter | Description |
|-----------|-------------|
| `RJ` | Right-justify data entered by the user. |

### Tab Stop Parameter

| Parameter | Description |
|-----------|-------------|
| `TS` | Tab stop. The cursor stops at the attribute position rather than immediately after it. |

### Emphasis Protection Parameter

| Parameter | Description |
|-----------|-------------|
| `UE` | Unprotected emphasis. Causes emphasis to be destroyed if data at that location is erased or typed over. |

### Color Parameters

Specify color parameters in pairs separated by a slant (`/`). For example, `WHI/RED` = white on red. Default = white on black.

| Value | Color |
|-------|-------|
| `BLA` | Black |
| `BLU` | Blue |
| `CYA` | Cyan |
| `GRE` | Green |
| `MAG` | Magenta |
| `RED` | Red |
| `WHI` | White |
| `YEL` | Yellow |

To override color attributes of menus, input screens, or overlays generated by `@SC`, set the `BlackOnWhite` parameter in the `MPC.INI` file to `true` (1).

**Predefined screen colors:**

| Element | Foreground/Background |
|---------|-----------------------|
| Background | White/Black |
| Border | White/Black |
| Title | White/Blue |
| Menu | White/Black |
| Field *(Windows / Linux / UNIX)* | White |
| Field *(2200)* | Cyan/Black |
| Report *(Windows / Linux / UNIX)* | White/Black |
| Report *(2200)* | Yellow/Black |
| Result | Cyan/Black |

### Terminal-Defined Color Parameters

These parameters use the colors defined in the Terminal Definition Report or User Registration Report, freeing the screen designer from choosing colors for each element.

| Parameter | Description |
|-----------|-------------|
| `BAC` | Background color. |
| `BOC` | Border color. |
| `TC` | Title color. |
| `MC` | Menu color (background color inside the menu border). |
| `FC` | Field color. Use with input control parameters (`AI`, `AO`, `NO`, `CO`, `KO`, `PR`). |
| `RC` | Report color. Selects the user's configured report or result color based on the currently displayed report (`-0`). |

---

## Screen Control Reserved Words

The following reserved words can be used in forms to tailor screens to a site, user, and terminal, and to enhance portability.

| Reserved Word | Description |
|---------------|-------------|
| `ADRW$` | Alphabetic drawer of the current result. |
| `AKEY$` | Key or key sequence used to perform the Abort command. |
| `ALERT$` | Current site alert message text. |
| `CAB$` | Cabinet number of the report or result last processed, or on display when the run started (0 if none). *(Windows / Linux / UNIX)* Always contains the even cabinet number. *(2200)* Contains the odd cabinet number when an odd cabinet report is displayed or requested. If `CAB$` is odd, the run cannot update reports. If either `CAB$` or `CAB1$` is odd, the user cannot update reports manually. |
| `CAB1$` | Currently active cabinet number. *(2200)* If either `CAB$` or `CAB1$` is odd, the user cannot update reports manually. BIS runs ignore `CAB1$` — only `CAB$` needs to be odd to prevent run updates. |
| `DATE0$` | Current date: YMMDD |
| `DATE1$` | Current date: YYMMDD |
| `DATE2$` | Current date: DD MMM YY |
| `DATE3$` | Current date: YDDD |
| `DATE4$` | Current date: YYDDD |
| `DATE5$` | Current date: DDMMYY |
| `DATE6$` | Current date: MM/DD/YY |
| `DATE7$` | Current date: MONTH DD, YYYY |
| `DATE8$` | Current date: MMDDYY |
| `DATE9$` | Current date: DD/MM/YY |
| `DATE11$` | Current date: YYYYMMDD |
| `DATE12$` | Current date: DD MMM YYYY |
| `DATE14$` | Current date: YYYYDDD |
| `DATE15$` | Current date: DDMMYYYY |
| `DATE16$` | Current date: MM/DD/YYYY |
| `DATE18$` | Current date: MMDDYYYY |
| `DATE19$` | Current date: DD/MM/YYYY |
| `DATE20$` | Current date: YYYY-MM-DD |
| `DATE21$` | Current date: DD-MMM-YY |
| `DAY$` | Current day: MON, TUE, etc. |
| `DBASE$` | *(Windows / Linux / UNIX)* Current site database path. |
| `DEPN$` | User's department sign-on number. |
| `DEPT$` | User's department name. |
| `DLINE$` | Line number of the first non-held line on display. |
| `DMSG$` | *(2200 only)* System down or purge time message text. |
| `F1$`–`F10$` | Key or key sequence used as function keys F1–F10. |
| `FPAGE$` | Last explicitly called page of a Screen Control form. |
| `KKEY$` | Key or key sequence used to obtain keyboard help (if available). |
| `LEVEL$` | String identifying the current software level (formerly `MAPER$`; redefined with every product build). |
| `LINE1$` | *(2200 only)* Site-defined text for line 1 of sign-on, active, and offline logo screens. |
| `LOGO$` | Site-defined text for the sign-on and active screens. |
| `LRRSD$` | Local site identifier. |
| `MAPNAM$` | Name of the system. |
| `MAXCAB$` | Maximum cabinet number available on your system. |
| `MAXCHR$` | Maximum number of characters (width) of a report. Individual drawers may define smaller values. |
| `MAXDRW$` | Maximum drawer number available on your system. |
| `MAXFIL$` | *(2200 only)* Maximum number of MAPPER database files allowed. |
| `MAXLAB$` | Maximum number of labels allowed in your script. |
| `MAXLIN$` | Maximum number of lines (length) of a permanent report. Individual drawers may define smaller values. |
| `MAXLNS$` | Maximum number of lines (length) of a result report. Individual drawers may define smaller values. |
| `MAXRNM$` | Maximum number of renamed reports or results per script. |
| `MAXRPT$` | Maximum report number available on your system. |
| `MAXVAR$` | Maximum number of variables allowed in a script. |
| `MKEY$` | Key or key sequence used to perform the Message Waiting function. |
| `NETSIT$` | Network site identification letter. |
| `RPT$` | Number of the report or result last processed, or on display when the run started. (`-zero` = current result; `zero` = no report.) After `ADR` or `DUP`, contains the new report number. |
| `SOE$` | Start-of-entry (SOE) character. |
| `STERR$` | *(Windows / Linux / UNIX)* Current site startup system message text. |
| `STNUM$` | Station number executing the run. |
| `TIC$` | Apostrophe character. |
| `TIME$` | Current time: HH:MM:SS |
| `TITLE$` | Title of the current `-0` report, when present. |
| `USER$` | User-id of the user who started the run. |
| `XKEY$` | Key or key sequence used to transmit. |
| `YEAR$` | Current year: YYYY |

---

## See Also

- [`SCGEN`](../runs/SCGEN.md) — Screen Control Generator
- [`@DSP`](DSP.md) — Display
- [`@IF`](IF.md) — If
- [`@GTO`](GTO.md) — Go To
