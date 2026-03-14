# AUX and @AUX — Auxiliary

## Overview

Use the Auxiliary (AUX) function or `@AUX` statement to print reports on an auxiliary printer connected to a terminal or a printer configured in a Windows workstation.

The command queues the report to be printed; it does not create a result.

- When an auxiliary print is queued to a station connected via Graphical Interface for Business Information Server, printing will be initiated as soon as the input is allowed (the hourglass mouse pointer is turned off).
- When an auxiliary print is queued to a station connected via a terminal, printing will only be initiated when no one is signed on to the station.

*(Windows / Linux / UNIX only)* The Business Information Server administrator must use Business Information Server Graphical Administration (PCMA) to set up a positive station number and an auxiliary device model for printing to function properly.

*(2200 only)* The Business Information Server administrator must use RECON to set up the terminal or workstation to print properly.

If you are signed on to the Graphical Interface for Business Information Server, Text Print Options are available within the Aux Printer Select menu that control whether Escape Sequences are sent to the printer. Test your printing capabilities with a small report (10 lines or less) with Allow Escape Sequences unchecked. Next, check Allow Escape Sequences to test if your printer is compatible with escape sequences. The Graphical Interface for Business Information Server must have AUX printing enabled.

---

## Syntax

### Auxiliary Control Line Format

*(Windows / Linux / UNIX only)*
```
AUX sn[sl report f]
```

*(2200 only)*
```
AUX
```

*(Windows / Linux / UNIX)* Control line fields:

| Field | Description |
|-------|-------------|
| `sn` | Station number of the terminal to which the printer is connected. |
| `sl` | Remote site letter for printing at another site. (For a list of sites, press Remote from the active screen.) Default = local site. |
| `report` | Report to print. For more details, see Specifying Reports or Drawers to Process. |
| `f` | Report format to print (0 to 25). Default = basic, unshifted format. |

### Auxiliary Statement Format

*(Windows / Linux / UNIX)*
```
@AUX,c,d,r,sn[,dev,dlnos?,f,,dhdgs?,d1char?,lsp,,,sl,spcc] .
```

*(2200)*
```
@AUX,c,d,r,sn,dev[,dlnos?,f,tabs?,dhdgs?,d1char?,lsp,transp?,unit,,spcc,lab,qty] .
```

| Field | Platform | Description |
|-------|----------|-------------|
| `c,d,r` | All | Report to print. For more details, see Specifying Reports or Drawers to Process. |
| `sn` | All | Station number of the terminal to which the auxiliary printer is connected. |
| `dev` | Windows / Linux / UNIX | Auxiliary printer device name. Default = `COP`. Your administrator can help you determine the appropriate device name for this subfield. |
| `dev` | 2200 | Auxiliary printer device name. Use the Device command to obtain a list of devices connected to a particular station. |
| `dlnos?` | All | Delete the line numbers? Y or N. Default = N. |
| `f` | Windows / Linux / UNIX | Report format. Default = basic format or, if a report was on display, the columns currently displayed by means of the Create Temporary Format command or those selected by a Format (FMT) or Set Format Characters (SFC) statement. Valid entries = 0 to 25. |
| `f` | 2200 | Report format. Default = basic format or, if a report was on display, the columns currently displayed by means of the Create Temporary Format command or those selected by a Format (FMT) or Set Format Characters (SFC) statement. Valid entries = 0 to 6. |
| `tabs?` | 2200 | Include tab characters in the output? Y or N. Default = N, change them to spaces. |
| `dhdgs?` | All | Delete the report headings and end report line in the output? Y or N. Default = N. |
| `d1char?` | All | Delete the first character of each line in the output? Y or N. Default = N. |
| `lsp` | All | Line spacing (1, 2, or 3). Default = 1. |
| `transp?` | 2200 | On tape cassettes or diskettes: Transfer reports wider than the terminal screen width? Y or N. Default = N. If Y, lines wrap to the following line; otherwise, the command truncates (drops) the extra characters. The value of this field does not affect reports queued to an auxiliary printer. |
| `unit` | 2200 | Unit on which to locate data in subsequent search operations. (Applicable only for cassettes and diskettes.) |
| `sl` | Windows / Linux / UNIX | Site letter of the station to which the printer is attached. Default = local site. |
| `spcc` | Windows / Linux / UNIX | Special print control character used to specify printer device controls. Default = blank (printer ignores control characters in text and prints them literally). Use the default when the Graphical Interface for Business Information Server is used and Allow Escape Sequence is unchecked in the Aux Printer Select client menu. |
| `spcc` | 2200 | Special print control character used to specify printer device controls. Default = blank (printer ignores control characters in text and prints them literally). |
| `lab` | 2200 | Label to go to if the system Aux queue is temporarily full. If you do not use the `lab` subfield, your run fails if it encounters this condition. |
| `qty` | 2200 | Number of copies to print. Default = 1. Maximum copies = 63. |

---

## Procedures

### To Stop Printing

Be sure that you are at the station you specified in the AUX request. Type the `SX` directive on the control line and transmit:

```
SX [sn]
```

Where `sn` is the station number of the printer, if different from your station.

The `SX` directive can stop printing only for large reports that are still being processed by the AUX output function. Due to the way the operating system handles terminal devices, the `SX` directive may not be able to abort the printing.

### To Suspend Printing Temporarily

*(Linux / UNIX / 2200)* When using a terminal, press **Abort** to temporarily suspend printing. The printing stops and the sign-on screen is displayed. You can then sign on to the system. Printing resumes the next time you sign off the system.

To suspend printing temporarily when using Business Information Server for Microsoft or Graphical Interface for Business Information Server, press **Cancel** on the Printing in Progress dialog box. If the AUX report being printed is short, the Printing in Progress dialog box only appears for a brief time. You can use normal Windows Print Control to delete the report.

### To Restart Printing

*(Linux / UNIX / 2200)* If you pressed **Abort** to suspend the printing temporarily and then signed on, printing resumes when you sign off the system.

When using Business Information Server for Microsoft or Graphical Interface for Business Information Server to restart printing after you have canceled, from the **File** menu, select **Aux Printing Disabled**.

When printing is suspended because of a device error, such as being out of paper, type the `SQ` directive on the control line and transmit:

```
SQ [sn]
```

Where `sn` is the station number of the printer, if different from your station.

The `SQ` directive can restart printing only for large reports that are still being processed by the AUX output function. Due to the way the operating system handles terminal devices, the `SQ` directive may not be able to restart printing of smaller reports.

*(2200 only)* Use the following `@SQ` statement to restart printing from a run:

```
@SQ[,lab] sn .
```

Where `lab` is the label to go to if the station table does not exist and `sn` is the station number of the printer.

> **Note:** If the printing was suspended because the printer was powered down, it may be necessary to clear the terminal by transmitting a caret to receive a logo, or perform an `SI` keyin for this station from another station.

### To Start the Printer at Another Station

Use the `SI` directive to start printing at another station, generally a screen bypass terminal:

```
SI [sn]
```

Where `sn` is the station number of the other station, normally a screen bypass terminal.

*(2200 only)* Use the following `@SI` statement to use a run to start the printer at another station:

```
@SI[,lab] sn .
```

Where `lab` is the label to go to if the statement cannot build the station table. (The `SI` statement first tries to build a station table if one does not exist.) `sn` is the station number of the printer.

> **Note:** If you used an `SI` directive to resume printing after clearing a device error, such as being out of paper or being powered down, data may be lost. To avoid data loss after a device error, perform an `SQ` directive prior to the `SI` directive.

### To Skip Pages

*(2200 only)*

Be sure that you are at the station you specified in the AUX request.

1. If necessary, suspend printing by pressing **Abort**, then sign on. Otherwise, sign on if you are not already signed on.
2. Type the `SR` directive on the control line and transmit:

```
SR,[sn],page
```

Where `sn` is the station number of the printer (if different from your station) and `page` is the page number relative to the page currently being printed. For example, an entry of `5` indicates printing should resume at the current page number plus 5.

For example, this `SR` directive resumes printing at the current page minus 4 on the printer connected to your station:

```
sr,,-4
```

---

## Guidelines

Follow these guidelines when inserting the printer commands in your report:

- *(Windows / Linux / UNIX)* Printer commands can begin either in column 1 or in the first nonblank column following column 1.
- *(2200)* Printer commands must begin in the first nonblank column beginning with column 2.
- Enter the commands in either uppercase or lowercase letters.

| Command | Platform | Description |
|---------|----------|-------------|
| `$DAT$` | Windows / Linux / UNIX | Turns off two-for-one (two lines of coding for one line of print) emphasis. |
| `.EJECT` | 2200 | Advances the paper to the top of the next page before continuing to print. The paper is advanced to the Home position if the first nonblank string on the line is `.EJECT`. This command must start from column 1. |
| `.EJECT` | Windows / Linux / UNIX | Advances the paper to the top of the next page before continuing to print. The paper is advanced to the Home position if the first nonblank string on the line is `.EJECT`. This command must begin in column 1. |
| `$EMP$` | Windows / Linux / UNIX | Turns on two-for-one emphasis (strikethrough, underscore, and column separator). To specify the emphasis character, use four-to-one style coding as you would with the Output (OUT) statement (except use only two lines). See [Emphasizing Text When Printing Reports](#emphasizing-text-when-printing-reports) for details. |
| `$FNW$` | Windows / Linux / UNIX | Turns off (finishes) wide printing. |
| `$HOM$` | All | Advances the paper (same as `.EJECT`, but does not have to begin in column 1). |
| `$INS$` | Windows / Linux / UNIX | Sends the string of characters that follows, unaltered, to a peripheral device. This is similar to the `~^` control character, except that the `$INS$` command affects only the current line. |
| `$KIP$ n` | All | Skips `n` lines on this page. If `n` is greater than the number of lines remaining on the page, the printer advances to the top of the next page. |
| `$LPP$ n` | 2200 | Prints `n` lines per page. Default = 60, including header and footer margins. |
| `$LPP$ n` | Windows / Linux / UNIX | Prints `n` lines per page. Default = 66, including header and footer margins. |
| `$STW$` | Windows / Linux / UNIX | Turns on (starts) wide printing. |
| `$TAB$ n` | 2200 | Moves `n` vertical tab positions and resumes printing. This command is for model 0786 printers only. The printer handler loses the line count following the `$TAB$` command. To reset the counter, enter `$hom$` before the end of the page. The handler automatically executes a `$HOM$` command at the end of the report. |

---

## Emphasizing Text When Printing Reports

Insert the following control characters surrounding text you want to emphasize. Use the uppercase letters to start the operations and the lowercase letter to end them. The Auxiliary command interprets and removes the control characters from the report before it prints.

| Control Character | Description |
|-------------------|-------------|
| `~B` and `~b` | Specifies bold text. |
| `~U` and `~u` | Underlines text. |
| `~V` or `~v` | Creates a vertical line. `~V` creates a vertical line and a space (`| `). `~v` creates a space and a vertical line (` |`). |
| `~X` and `~x` | Strikes through a character. |
| `~^` | *(Windows / Linux / UNIX)* Toggles between sending data directly to the printer and processing it before being sent. For example, the system either prints `~X` and `~x` and does not strike through the text, or it processes `~X` and `~x` (does not print those characters) and strikes through the text. |

### Redefining the Control Characters

The tilde (`~`) is the default primary control character. You can change the primary control character to any other printable character, except a caret (`^`).

To redefine a primary control character, enter that character in the CC field of the AUX input screen. For example, if you have defined boldface with a `$B` and `$b` control code, enter a `$` in the CC field of the AUX input screen.

*(Windows / Linux / UNIX only)* Additionally, you can send device control codes directly to the auxiliary printer. The device code interpretation toggles on and off using a `~^` print control. For example, a `~^` followed by `^J^M` directs the printer to perform a line feed (`^J`) and carriage return (`^M`). Another `~^` turns off the device code interpretation and any device code is printed literally.

---

## Example

This example prints report 2B0:

```
@aux,0,b,2,9,cop,y,,,y,,2 .
```

| Field | Description |
|-------|-------------|
| `0,b,2,9` | Print report 2B0 on the auxiliary printer connected to station 9. |
| `cop` | Specify the device code as COP. |
| `y,,,y` | Delete the line numbers from the printout and delete the report headings and the end report line. |
| `2` | Double-space the printed report. |
