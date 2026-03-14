# GOC and @GOC — Generate Organization Charts

## Overview

Creates organization charts from primitive commands stored in a report.

---

## Manual Function

```
GOC [report]
```

where `report` is the report containing Generate Organization Chart commands. Use `goc -` to indicate the current report. For more details, see *Specifying Reports or Drawers to Process*.

---

## Syntax

```
@GOC,c,d,r[,lab] ulvl?[,notxt?,ige?,igcz?,fxcz?]
    optmz?[,outrslt?,unp? vlinesi,vlineso,vco,vbuffz] .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `c,d,r` | Required | Report containing Generate Organization Chart commands. For more details, see *Specifying Reports or Drawers to Process*. |
| `lab` | Optional | Label to branch to in case of error. |
| `ulvl?` | Required | Create an upper level chart? `Y` or `N`. If `Y`, produces a chart with only one box at all levels except the bottom. |
| `notxt?` | Optional | Eliminate all text? `Y` or `N`. If `Y`, produces a chart with empty boxes — useful for determining box sizes. |
| `ige?` | Optional | Ignore all error conditions? `Y` or `N`. |
| `igcz?` | Optional | Ignore the character size? `Y` or `N`. If `Y`, does not check whether the resulting character size is within the correct range for the selected display device. |
| `fxcz?` | Optional | Use a fixed character size? `Y` or `N`. The size depends on the selected display device. |
| `optmz?` | Required | Optimize the result? `Y` or `N`. If `Y`, produces a result and links to the Graphics Scaler command with optimize options selected. Required to be `Y` if the `FONT` parameter is used. |
| `outrslt?` | Optional | Display the graphics result on screen? `Y` or `N`. If `optmz?` = `Y`, optimizes with Graphics Scaler first, then displays. |
| `unp?` | Optional | Unpack the result? `Y` or `N`. If `Y`, displays the result in unpacked format where primitive commands are not split across lines. Ignored if `optmz?` = `Y`. |
| `vlinesi` | Optional | Variable to capture the number of input lines scanned following the heading divider line. |
| `vlineso` | Optional | Variable to capture the number of output lines in the result following the heading divider line. |
| `vco` | Optional | Variable to capture the number of characters to send out. |
| `vbuffz` | Optional | Variable to capture the size of the buffer used to hold chart information. |

---

## Reserved Words

If an error occurs in the report, the run continues at the specified label. `STAT1$` is loaded with the system message number and `STAT2$` with the line number of the error. Use [`@LSM`](LSM.md) (Load System Message) to obtain the message text.

---

## Screen Position Options

| Code | Description |
|------|-------------|
| `UL` | Upper Left |
| `UC` | Upper Center |
| `UR` | Upper Right |
| `ML` | Middle Left |
| `MR` | Middle Right |
| `LL` | Lower Left |
| `LC` | Lower Center |
| `LR` | Lower Right *(default)* |

---

## Colors

| Color | Pen Stall |
|-------|-----------|
| Aqua | 8 |
| Black | 1 |
| Blue | 2 |
| Cyan | 2 |
| Gray | 1 |
| Green | 4 |
| Hot pink | 3 |
| Lime | 6 |
| Magenta | 7 |
| Pink | 3 |
| Red | 3 |
| Tan | 5 |
| Turquoise | 8 |
| Violet | 7 |
| White | 1 |
| Yellow | 5 |

> **Note:** When charts are printed on a plotter, the color white prints as black.

---

## Outcome

- Generates a result containing graphics primitive code to draw an organization chart, using the commands in the input report. Use the Display Graphics (`G` / [`@DSG`](DSG.md)) command to display the chart.
- Uses freeform data as it appears, including spaces. If data on a line exceeds the screen width, type a semicolon (`;`) and continue on the next line.
- Detects commands only when the first nonblank character on a line is a dollar sign (`$`), or when the command is in the global parameter section. Any other `$` is treated as literal chart data.

---

## Guidelines

- Data commands provide text and other visible data. Global parameters define data placement; global commands insert comments, specify filler characters, and produce chart variations.
- The term *boxes* refers to blocks of text representing names and titles, regardless of whether they have visible borders.
- Sketch the desired level and box layout before entering commands, to make it easier to enter them in the correct order.
- Place global commands on any line between the heading divider line and the `$END` command.
- If a parameter or data command is used more than once, only the last instance is used — except for `$APPROVED` and `$SIGNATURE`, which can appear up to two times combined.
- Global commands may be used more than once.
- Charts displayed on screen do not show actual character size. Use screen displays to verify box placement; character sizes are correct only in printed output.
- To return to the text screen:
  - *(2200 — PC terminals)* Press **Shift + Esc** twice.
  - *(2200 — UTS 30 or UTS 60)* Press **Shift + Disp**.
  - *(Windows Client / GI-BIS)* The chart is displayed in a separate window. Use the mouse to activate the main text window.

---

## Procedures

**To create an organization chart**, in a blank freeform report, enter commands in this order:

1. `$PARAMETERS` command
2. Global parameters as needed
3. `$DATA` command
4. Data commands as needed
5. `$END` command

**To enter names**, start with the top level name. Enter one name per level down to the bottom level, then return to the topmost level of the same branch. Continue in this manner until all names in a branch are entered, then move to the topmost name in the next branch.

**To enter command subfields**, enter them in any order using only the subfields you need. Separate subfields and commands with commas (e.g. `confidential,red,ur`). Tab characters and leading spaces within a subfield are ignored.

**To expand box width**, use a row of filler characters. See the `$FILLER` global command.

---

## Global Parameters

Begin the global parameter section with the `$PARAMETERS` command. Multiple parameters may appear on a single line, separated by spaces.

| Parameter | Format | Description |
|-----------|--------|-------------|
| `BACKGROUND` | `BACKGROUND,color` | Background color of the screen. If an item matches the background color, it displays in black. Ignored if `PLOTTER` is specified. Default = black. |
| `COLOR` | `COLOR,action` | `On` = use all colors as specified (default). `Off` = black and white output (for plotter). |
| `COLUMNS` | `COLUMNS` | Arranges the bottom level into a maximum of two vertical columns. Valid for upper-level charts only (`ulvl?` = `Y`). |
| `CONFIDENTIAL` | `CONFIDENTIAL,color,position` | Places the word CONFIDENTIAL on the chart. Default color = black. Default position = `UR`. |
| `FONT` | `FONT,n` | Specifies the character font number (`0`–`28`). Default = `0`. For any value other than `0`, `optmz?` must be `Y`. |
| `HORIZONTAL` | `HORIZONTAL` | Arranges the bottom level of boxes horizontally. Not valid for upper-level charts. |
| `IGNORE` | `IGNORE` | Ignores any errors encountered in the `$DATA` section. |
| `LEVEL` | `LEVEL,n,qty,color1,color2,...` | Defines a level of boxes. `n` = level label (0–9 or A–Z). `qty` = max lines of text (0–128); `0` splits the bottom level into more than two columns. `color1,color2,...` = text color per line (default = white). Use `color(n)` syntax to apply one color to multiple lines (e.g. `blue(1),red(2)`). |
| `PAGE` | `PAGE,pageid,position,color` | Places a page identifier on the chart. Default position = `LR`. Default color = white. |
| `PLOTTER` | `PLOTTER,size,orientation` | Creates plotter output. `size` = `SMALL` (8½×11", default) or `LARGE` (11×15¼"). `orientation` = `WIDE` (11", default) or `TALL` (8½") — valid only for `SMALL`. |
| `SCOPE` | `SCOPE` *(Windows/Linux/UNIX)* / `SCOPE,type` *(2200)* | Displays the chart. On 2200, `type` = `UTS60` or `AQUA`. Not valid on PCC, PCE, or PCS terminals. |
| `STAGGER` | `STAGGER` | Displays the bottom level as two horizontal, staggered rows. Valid for upper-level charts only (`ulvl?` = `Y`). |
| `SUBLEVEL` | `SUBLEVEL,n,qty,color1,color2,...` | Defines a nonsupervisory staff sublevel. `n` = corresponding `LEVEL` label. `qty` = lines in sublevel (1–128, must be ≤ corresponding LEVEL qty). Minimum 1, maximum 12 levels. |
| `VERTICAL` | `VERTICAL,STK,qty` or `VERTICAL,SPREAD,position` | Arranges the bottom level vertically. `STK,qty` stacks boxes (no space between them) up to `qty` per column (0–99) before splitting. `SPREAD,position` stacks boxes with spacing; `L` = left of connecting line, `R` = right. Not valid for upper-level charts. |

---

## Global Commands

Place global commands anywhere in the report between the heading divider line and `$END`.

| Command | Format | Description |
|---------|--------|-------------|
| `$COMMENT` | `$COMMENT,x` | Changes the comment character to `x` (any non-letter, non-`$` character). Default = `.`. Lines beginning with the comment character in column 1 are not printed on the chart. |
| `$FILLER` | `$FILLER,x` | Changes the filler character to `x` (any non-letter, non-`$` character). Default = `\`. Use filler characters to arrange text when `$JUSTIFY` is not sufficient. |
| `$INCLUDE` | `$INCLUDE,name` | Marks the beginning of a named block of commands. Used with `$SET` and `$ENDI`. |
| `$ENDI` | `@ENDI` | Marks the end of a named block started by `$INCLUDE`. |
| `$SET` | `$SET,label,condition` | Defines a label as `t` (true — include named commands) or `f` (false — exclude named commands). `label` is up to 8 alphanumeric characters (no commas). If `$INCLUDE` commands are nested, the outermost false label has priority. |

---

## Data Commands

Begin the data section with `$DATA`. Enter no more than one data command per line.

| Command | Format | Description |
|---------|--------|-------------|
| `$APPROVED` | `$APPROVED,position,line?,color` | Places up to 12 text lines on the chart with a solid signature line above. Max two `$SIGNATURE`/`$APPROVED` commands total. Default position = `LL`. |
| `$BLANK` | `$BLANK` | Inserts a blank line into text following `$LEVEL`, `$SUBLEVEL`, `$SIGNATURE`, `$APPROVED`, `$DUTIES`, `$MISSION`, `$OBJECTIVE`, or `$RESPONSIBILITY`. |
| `$BOX` | `$BOX,style` | Sets box style for subsequent levels. Styles: `NORMAL` (single line, default), `OUTLINE` (double lines), `BOLD` (double solid filled), `3D-LEFT`, `3D-RIGHT`. |
| `$BOX-COLOR` | `$BOX-COLOR,color` | Sets box color for subsequent items. Default = white. |
| `$CONFIDENTIAL` | `$CONFIDENTIAL,position,color` then text | Places a confidentiality message on the chart. Overrides `CONFIDENTIAL` global parameter. Default position = `UR`. Default color = black. |
| `$DASHED` | `$DASHED` | Draws all subsequent connecting lines as dashed. See also `$SOLID`. |
| `$DATA` | `$DATA` | Marks the beginning of data commands. |
| `$DATE[n]` | `$DATEn,position,color [date]` | Adds a date to the chart. Formats `0`–`20` (and `21` on 2200). Default format = `MONTH DD, YYYY`. Default position = `LL`. Default = current date. |
| `$DUTIES` | `$DUTIES,position,color` | Places up to 12 text lines as a block with no boxes or lines. Use only one of `$DUTIES`, `$OBJECTIVE`, `$MISSION`, or `$RESPONSIBILITY` per chart. Default position = `UR`. |
| `$END` | `$END` | Signals the end of commands. Anything after `$END` is ignored. |
| `$JUSTIFY` | `$JUSTIFY,type` | Sets text justification: `l`/`left`, `r`/`right`, or `c`/`center` (default). Remains in effect until changed. |
| `$LEVEL` | `$LEVEL,n,color1,...` or `$LEVEL,n,V` | Text for the specified level. Format 1 draws the level normally. Format 2 (`V`) indicates a missing box at any non-top, non-bottom level. Colors override those in the `LEVEL` global parameter. |
| `$LINE-COLOR` | `$LINE-COLOR,color` | Sets the color of subsequent connecting lines. Default = black. |
| `$LINES` | `$LINES,action` | `On` = draw connecting lines (default). `Off` = do not draw connecting lines. |
| `$LOWERCASE` | `$LOWERCASE` | Displays text exactly as typed (mixed case). See also `$UPPERCASE`. |
| `$MISSION` | `$MISSION,position,color` | Same as `$DUTIES`. Default position = `UR`. |
| `$NO-BOX` | `$NO-BOX` | Draws no boxes around subsequent levels. |
| `$OBJECTIVE` | `$OBJECTIVE,position,color` | Same as `$DUTIES`. Default position = `UR`. |
| `$PAGE` | `$PAGE,position,color` then text | Places a page identifier on the chart. Overrides `PAGE` global parameter. Default position = `UR`. |
| `$RESPONSIBILITY` | `$RESPONSIBILITY,position,color` | Same as `$DUTIES`. Default position = `UR`. |
| `$SIGNATURE` | `$SIGNATURE,position,line?,color` | Places up to 12 text lines with a solid signature line above. Max two `$SIGNATURE`/`$APPROVED` commands total. Default position = `LL`. Default color = white. Line color set by `$LINE-COLOR`. |
| `$SOLID` | `$SOLID` | Draws all subsequent connecting lines as solid. See also `$DASHED`. |
| `$SUBLEVEL` | `$SUBLEVEL,n,position,color1,...` | Text for the specified sublevel. `position` = `l`/`left` or `r`/`right` relative to the main level box. Colors override those in the `SUBLEVEL` global parameter. |
| `$TITLE` | `$TITLE,position,color` then text | Places a title on the chart. Maximum two title commands; the second title uses a slightly smaller character size. Default position = `UC`. Default color = black. |
| `$UPPERCASE` | `$UPPERCASE` | Displays all alphabetic characters as uppercase. See also `$LOWERCASE`. |

---

## Example

Generate an organization chart using commands in report `2H0`. Not optimized, not an upper-level chart:

```
@goc,0,h,2 n n .
```

Example report contents:

```
$parameters
horizontal
plotter,small
level,1,2,red,blue
level,2,2,green,blue
$data
$level,1
PRESIDENT
J. A. DOE
$level,2
DISTRICT 1 CHIEF
J. B. DOE
$level,2
DISTRICT 2 CHIEF
J. C. DOE
$level,2
DISTRICT 3 CHIEF
J. D. DOE
$end
```

To view a sample organization chart, enter `chart,e` on the control line. Press **Resume** to return to the CHART run menu.
