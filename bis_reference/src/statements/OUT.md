# @OUT (Output)

## Overview

Displays lines from a report on the screen. You can display information on the entire screen or part of the screen, starting with a blank screen or overlaying an existing one.

> **Note:** It is recommended that you use the [`@SC`](SC.md) (Screen Control) statement to display data on the screen, as it provides many features not available with `@OUT`.

---

## Syntax

```
@OUT,c,d,r,l,q[,outl,tabp,erase?,interim?,pdq,protect,fxmt?,outsp,blink?,sn,lab] .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `c,d,r` | Required | Report from which to display data. |
| `l` | Required | Line in the report from which output is to start. |
| `q` | Required | Number of lines to display. |
| `outl` | Optional | Line on the screen where output is to start. Default = top line of the screen. |
| `tabp` | Optional | Number of tab positions from home position after which to place the cursor. Use a negative number to move backwards from home position. Maximum = 100. Default = home position. |
| `erase?` | Optional | Erase to end of screen starting at the line specified in `outl`? `Y` or `N`. Default = `Y`. |
| `interim?` | Optional | Interim display? `Y` or `N`. If `Y`, the run continues even if the user does not respond by pressing Resume or Transmit. Default = `N`. |
| `pdq` | Optional | Number of lines to push down on the screen. |
| `protect` | Optional | Protected format option. See [Options](#options). |
| `fxmt?` | Optional | Force transmit? `Y` or `N`. If `Y`, the run continues and you can load variables with `ICVAR$`, `INPUT$`, `INSTR$`, `INVAR$`, or `INVR1$`. Default = `N`. |
| `outsp` | Optional | Determines how spaces and data are sent to the screen. `A`, `B`, or space. Default = space. See [Output Space Behavior](#output-space-behavior). |
| `blink?` | Optional | Change `<` and `>` characters to left and right blink characters? `Y` or `N`. Default = `N`. Hardware capabilities of supported terminals may not allow blinking. |
| `sn` | Optional | *(2200 only)* Station number where output is to be displayed. If omitted or zero, output is displayed at the station executing the run. |
| `lab` | Optional | *(2200 only)* Label to go to if output to another station cannot be completed successfully. If omitted and the run cannot be completed, it terminates with an error. |

---

## Output Space Behavior

| Value | Description |
|-------|-------------|
| `A` | Send the data, including all spaces. |
| `B` | Send the data, but not spaces. Only columns containing new data are overwritten; old and new data are blended on the same line. |
| Space (default) | Send the data including spaces if fewer than six consecutive spaces appear between characters. If six or more spaces appear, send data but not the spaces. This enables faster screen painting. |

---

## Options

| Option | Description |
|--------|-------------|
| `E` | Erases only unprotected fields on the screen (for use in clearing input fields of a displayed menu). |
| `F` | *(2200 only)* Allows full-screen input. Use only with IBM Series 3270 terminals. |
| `I` | Edits input characters in unprotected fields by character type. Use one of the edit codes in the first character position of the unprotected field. The presence of this option assumes output protect features (see `P` option). See [I Option Edit Codes](#i-option-edit-codes). |
| `P` | Protects fields when displaying data. Enter a protect code in column 1 of the output lines or immediately after the comma that ends an unprotected field. See [P Option Protect Codes](#p-option-protect-codes). |
| `4` | Specifies that fields are defined on four lines for one line of output (see [Four- and Five-To-One Output](#four--and-five-to-one-output)). |
| `5` | Specifies that fields are defined on five lines for one line of output (see [Four- and Five-To-One Output](#four--and-five-to-one-output)). |

### I Option Edit Codes

| Code | Description |
|------|-------------|
| Space or `0` or `A` | Any data, no editing. |
| `1` or `B` | Alphabetic data, no editing. |
| `2` or `C` | Numeric data, left-justified (including `+`, `-`, and period). |
| `3` or `D` | No data. |
| `4` or `E` | Any data, right-justified. |
| `5` or `F` | Alphabetic data, right-justified. |
| `6` or `G` | Numeric data, right-justified (including `+`, `-`, and period). |

> Numeric data includes plus and minus signs and the period. Letter codes make entered data transparent; numeric codes allow users to see data as they type.

### P Option Protect Codes

| Code | Description |
|------|-------------|
| `0` or space | Normal intensity. |
| `1` | No intensity (characters are not displayed). |
| `2` | Low intensity. |
| `3` | Blinking characters, alternating low and normal intensity. |

> If protected and unprotected fields appear on the same line, start the unprotected field with a tab character and end it with a comma. To use different intensities on the same line, place an unprotected field between the protected fields.

---

## Outcome

Executing this statement causes the following actions:

- Displays the specified lines on the screen and clears the output area.
- The run waits until the user transmits or resumes, unless `Y` is specified in `interim?` or `fxmt?`.
- If `N` is specified in `interim?`, the statement resets the I/O, LLP, and DLP counts.
- Clears any currently mapped function keys.

---

## Reserved Words / Input Variables

To capture user input, load input variables using `INPUT$`, `INSTR$`, `ICVAR$`, `INVAR$`, and `INVR1$`. If the user presses Resume instead of Transmit, the data entered is not captured.

### Station Output Status Codes (`STAT1$`) *(2200 only)*

If using the `lab` subfield and the `@OUT` statement cannot be completed, the run goes to the label. Examine `STAT1$` for the status:

| Code | Description |
|------|-------------|
| `1` | Station does not exist, or it is a batch port, remote run, or background station. |
| `2` | Station is not available because it is not currently connected to the system. |
| `3` | No one is signed on at the specified station and `interim?` was not specified. |
| `4` | User at the specified station did not respond to the message wait signal within one minute. |
| `5` | User answered the signal and received the screen, but did another operation rather than supply input. |

---

## Guidelines

- *(Windows / Linux / UNIX)* Do not use `@OUT` in a run started with the [`@BR`](BR.md) (Background Run) statement or from a remote site using a [`@RRN`](RRN.md) (Remote Run) statement.
- *(2200 only)* Do not use `@OUT` in a run started with `@BR` or `@RRN`, unless sending output to another terminal via the `sn` subfield.
- When output is displayed, load input variables using `INPUT$`, `INSTR$`, `ICVAR$`, `INVAR$`, and `INVR1$`. Press Transmit to resume; pressing Resume does not capture entered data.
- Put reserved words before the variable name in the [`@CHG`](CHG.md) (Change Variable) statement, and ensure the `@CHG` statement precedes the `@OUT` statement (`INSTR$`, `INVAR$`, `INVR1$`).
- Initialize variables with `INPUT$` following the `@OUT` statement.
- Do not place other statements on the same line after the `@OUT` statement — they will be ignored. Put the next statement on a new line.

---

## Displaying Information at Another Terminal *(2200 only)*

Use the `sn` and `lab` subfields to display information and obtain input from terminals other than the one executing the run. Background, batch port, and remote runs can solicit and obtain input, but output must be sent to a real terminal.

You cannot obtain exclusive use of any station. When more than one run sends output to the same station, the output may be intermixed and may not appear in the original order.

**If the user is at the terminal:** Sending output activates a message wait signal and stalls your run. If `interim?` is `N` or blank, the run stalls until any key is pressed. If `interim?` is `Y`, the run continues automatically. If no response is received within one minute, the run continues at the specified label or terminates with an error.

**If the user is not at the terminal:** You must specify `Y` in `interim?`. The message wait signal is not activated, the output is displayed, and your run continues. This is useful for system monitor terminals updated by a scheduled background run.

---

## Four- and Five-To-One Output

For display terminals that support emphasis control, `@OUT` supports four-to-one (monochrome) and five-to-one (color) output modes, specified via the `protect` option (`4` or `5`).

- **Four-to-one:** Three edit code lines + one data line per output line.
- **Five-to-one:** Four edit code lines + one data line per output line.

Line structure:

| Line | Four-to-One | Five-to-One |
|------|-------------|-------------|
| 1 | M attribute characters | M attribute characters |
| 2 | N attribute characters | N attribute characters |
| 3 | Emphasis characters | Color code characters |
| 4 | Data to display | Emphasis characters |
| 5 | — | Data to display |

> **Note:** On the same line, you cannot combine an M code with an N code.

### M Code Attributes

| M Code | Emphasis | Tab Stop | Field Changed | Low Intensity | Video On |
|--------|----------|----------|---------------|---------------|----------|
| `*` or `@` | N | Y | Y | N | Y |
| `A` | N | Y | Y | N | N |
| `B` | N | Y | Y | Y | Y |
| `C` | N | Y | Y | Y | N |
| `D` | N | Y | N | N | Y |
| `E` | N | Y | N | N | N |
| `F` | N | Y | N | Y | Y |
| `G` | N | Y | N | Y | N |
| `H` | N | N | Y | N | Y |
| `I` | N | N | Y | N | N |
| `J` | N | N | Y | Y | Y |
| `K` | N | N | Y | Y | N |
| `L` | N | N | N | N | Y |
| `M` | N | N | N | N | N |
| `N` | N | N | N | Y | Y |
| `O` | N | N | N | Y | N |
| `` ` `` | Y | Y | Y | N | Y |
| `a` | Y | Y | Y | N | N |
| `b` | Y | Y | Y | Y | Y |
| `c` | Y | Y | Y | Y | N |
| `d` | Y | Y | N | N | Y |
| `e` | Y | Y | N | N | N |
| `f` | Y | Y | N | Y | Y |
| `g` | Y | Y | N | Y | N |
| `h` | Y | N | Y | N | Y |
| `i` | Y | N | Y | N | N |
| `j` | Y | N | Y | Y | Y |
| `k` | Y | N | Y | Y | N |
| `l` | Y | N | N | N | Y |
| `m` | Y | N | N | N | N |
| `n` | Y | N | N | Y | Y |
| `o` | Y | N | N | Y | N |

*FIELD CHANGED used only for IBM 3270 terminals. Y = Yes, N = No.*

### N Code Attributes

| N Code | Reverse Video | Blink | Right-Justify | Number Only | Alpha Only |
|--------|---------------|-------|---------------|-------------|------------|
| `@` | N | N | N | N | N |
| `A` | N | N | N | N | Y |
| `B` | N | N | N | Y | N |
| `C` | N | N | P | P | P |
| `D` | N | N | Y | N | N |
| `E` | N | N | Y | N | Y |
| `F` | N | N | Y | Y | N |
| `G` | N | N | P | P | P |
| `H` | N | Y | N | N | N |
| `I` | N | Y | N | N | Y |
| `J` | N | Y | N | Y | N |
| `K` | N | Y | N | Y | Y |
| `L` | N | Y | Y | N | N |
| `M` | N | Y | Y | N | Y |
| `N` | N | Y | Y | Y | N |
| `O` | N | Y | P | P | P |
| `P` | Y | N | N | N | N |
| `Q` | Y | N | N | N | Y |
| `R` | Y | N | N | Y | N |
| `S` | Y | N | N | P | P |
| `T` | Y | N | Y | N | N |
| `U` | Y | N | Y | N | Y |
| `V` | Y | N | Y | Y | N |
| `W` | Y | N | P | P | P |
| `X` | Y | Y | N | N | N |
| `Y` | Y | Y | N | N | Y |
| `Z` | Y | Y | N | Y | N |
| `[` | Y | Y | P | P | P |
| `\` | Y | Y | Y | N | N |
| `]` | Y | Y | Y | N | Y |
| `^` | Y | Y | Y | Y | N |
| `~` | Y | Y | P | P | P |

*Y = Yes, N = No, P = Protected input field; no input allowed.*

### Terminal Attributes *(Linux/UNIX OS only)*

| Terminal | Attributes |
|----------|------------|
| SVT-1210 | Reverse video; no distinction between normal and low intensity. |
| SVT-1220 / UVT-1224 | Normal intensity displayed as high intensity. Normal/high intensity, reverse video, blinking characters. |

### Color Codes *(Five-to-One only)*

The third line in a five-to-one output contains the color code. Color codes sent to a monochrome terminal are ignored.

> **Note:** If the same color is selected for both background and character, the result is "invisible" characters. To override color attributes, you can set the `BlackOnWhite` parameter in `MPC.INI` to `true (1)`.

| Character Color | Background Color | Code |
|-----------------|-----------------|------|
| Black | Black / Red / Green / Yellow / Blue / Magenta / Cyan / White | `@` `H` `P` `X` `` ` `` `h` `p` `x` |
| Red | Black / Red / Green / Yellow / Blue / Magenta / Cyan / White | `A` `I` `Q` `Y` `a` `i` `q` `y` |
| Green | Black / Red / Green / Yellow / Blue / Magenta / Cyan / White | `B` `J` `R` `Z` `b` `j` `r` `z` |
| Yellow | Black / Red / Green / Yellow / Blue / Magenta / Cyan / White | `C` `K` `S` `[` `c` `k` `s` `{` |
| Blue | Black / Red / Green / Yellow / Blue / Magenta / Cyan / White | `D` `L` `T` `\` `d` `l` `t` `\|` |
| Magenta | Black / Red / Green / Yellow / Blue / Magenta / Cyan / White | `E` `M` `U` `]` `e` `m` `u` `}` |
| Cyan | Black / Red / Green / Yellow / Blue / Magenta / Cyan / White | `F` `N` `V` `^` `f` `n` `v` `~` |
| White | Black / Red / Green / Yellow / Blue / Magenta / Cyan / White | `G` `O` `W` `_` `g` `o` `w` `?` |

### Emphasis Characters

Emphasis characters consist of the column separator, underscore, and strikethrough. Due to hardware limitations, the software ignores all emphasis characters at the software level, but they are sent to the terminal. Hardware capabilities vary — see your terminal documentation.

Emphasis characters are normally displayed as white text on a black background. Foreground and background colors are ignored.

| Code | Strikethrough | Underscore | Column Separator |
|------|---------------|------------|-----------------|
| space | — | — | — |
| `!` | — | — | Yes |
| `$` | — | Yes | — |
| `%` | — | Yes | Yes |
| `(` | Yes | — | — |
| `)` | Yes | — | Yes |
| `,` | Yes | Yes | — |
| `-` | Yes | Yes | Yes |

---

## Examples

Display five lines of the current result starting at report line 2, on the first line of the screen:

```
@out,0,2,5,1 .
```

Display one line from the current result, pushing the currently displayed data down:

```
@out,-0,4,1,1,,n,y,2 .
```

| Field | Value | Description |
|-------|-------|-------------|
| `-0,4` | | Displays lines from the current result, starting at report line 4. |
| `1` | | Displays one line. |
| `1` | | Starts display on the first line of the screen. |
| `n` | | Do not erase the screen. |
| `y` | | Interim display; run continues even if user does not respond. |
| `2` | | Pushes currently displayed data down two lines before displaying. |

### Four-to-One Data Entry Screen Example

```
1.  @brk .
2.  N d N
3.  S @ S
4.  $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
5.  Name:
6.  d N
7.  @ S
8.  $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
9.  Street:
10. d N
11. @ S
12. $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
13. City:
14. d N d N d N d N d N
15. A S B S B S B S B S
16. $$ $$$$$ $$$ $$$ $$$$$
17. State: Zip: Phone:( )
18. @brk out,-0,2,4,1,1,y,,,4 .
```

When executed, source lines 2–5 combine into the first output line, lines 6–9 into the second, and so on, producing the following screen:

```
Name:   ___________________________________
Street: ___________________________________
City:   ___________________________________
State: __  Zip: _____  Phone: (___)___-______
```

The underscored areas are unprotected and of normal intensity. Field labels are protected and low intensity. The State field allows only alphabetic input; Zip and Phone allow only numeric input.
