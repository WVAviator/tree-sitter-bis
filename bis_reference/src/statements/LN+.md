# Add Line and @LN+

## Overview

Use the Add Line function or `@LN+` statement to add blank, predefined, or customized lines to a report. (You can also add lines in the report headings.)

- For the Add Line manual function, the report must be on display.
- For the `@LN+` statement, unless you are processing a result, you must precede the `@LN+` statement with an Update Lock ([`@LOK`](LOK.md)) statement.

With the Add Line command, you can do the following tasks:

- Add blank lines at the end of a report in order to enter new data.
- Add blank lines between data lines to add new data.
- Add one blank line or several at once.
- Add predefined lines, which contain fields already filled in.

The command adds the specified number of lines to the report; it does not create a result.

---

## Syntax

### Add Line In-Report-Line Format

```
>]q+[predfl]
```

| Field | Description |
|-------|-------------|
| `>]` | SOE character and line change command. |
| `q` | Number of lines to add. |
| `+` | Add Line call. |
| `predfl` | Reference number of the predefined line to add. |

### @LN+ Statement Format

```
@LN+,c,d,r,[lb4],q[,predfl,vld] .
```

| Field | Description |
|-------|-------------|
| `c,d,r` | Report in which lines are to be added. For more details, see Specifying Reports or Drawers to Process. |
| `lb4` | Number of the line preceding the lines to be added. If this subfield is blank or 0, lines are added at the end of the report. Default = blank or 0. |
| `q` | Number of lines to add. No default. |
| `predfl` | Reference number of the predefined line to add from report 0 of the drawer. |
| `vld` | Content of variable, literal, reserved word, constant, or any combination of these, to insert on the added lines. |

> *(Windows / Linux / UNIX only)* **Note:** If you use the `vld` field, the `q` field can only be one.

---

## @LN+ Reserved Word

If the report exists and a new line is inserted, `STAT1$` returns the line number of the first new line. `STAT1$` eliminates the need to perform a Line Zero ([`@LZR`](LZR.md)) after the `@LN+` statement, when adding lines to the end of a report.

---

## Guidelines

- To add predefined lines, you must use the in-report-line format or the `@LN+` statement; you cannot use **Addlin** or **LineCh** on the function key bar.
- To see the predefined lines available for a specific report, add a report using the Add Report command. The new report displays any predefined lines set up for the current drawer, or you can display report 0 to see the predefined lines.
- Before pressing Transmit, be sure the cursor does not rest on an unwanted character that will be sent to the system for processing.

---

## Procedures

### To add just one line or a few lines

**Option 1:**
1. Place the cursor on the line above the line where you want the new lines to be added.
2. Press **Edit**.
3. Press **AddLin** once for each line to be added.

**Option 2:**
1. Place the cursor on the line above the line where you want the new lines to be added.
2. Erase to the end of the line.
3. Enter the Add Line in-report-line format. Before pressing Transmit, be sure the cursor does not rest on an unwanted character that will be sent to the system for processing.

### To add several lines

1. Place the cursor on the line above the line where you want the new lines to be added.
2. Press **Edit**.
3. Press **LineCh**. The Line Change menu is displayed. Type the number of lines in the **Add lines** field and transmit.

---

## Examples

This example adds three copies of predefined line 2 after line 5 in report 1B0. Position the cursor on line 5, erase to the end of the line, and enter the following text:

```
>]3+2
```

**Equivalent Statement:**
```
@LN+,0,b,1,5,3,2 .
```

This statement adds one custom data line after the last line in report 3B0:

```
@LN+,0,b,3,,1,,<CustomData> .
```
