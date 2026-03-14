# Managing Reports

## Overview

This guide covers the following topics:
- [Creating a Report](#creating-a-report)
- [Opening a Report](#opening-a-report)
- [Copying a Report](#copying-a-report)
- [Saving a Report](#saving-a-report)
- [Closing a Report](#closing-a-report)
- [Deleting a Report](#deleting-a-report)
- [Viewing a Report](#viewing-a-report)
- [Moving Through a Report](#moving-through-a-report)
- [Updating a Report](#updating-a-report)
- [Printing a Report](#printing-a-report)

---

## Creating a Report

1. From home position, or on the control line (if a report is already on display), type `ar` and press **Transmit**.
2. In the **Report or Drawer** field, type the drawer letter in which to create the new report.
3. Tab to the **Title** field and type a title for the new report.
4. Press **Transmit**.

The system creates a new, blank report. Write down the new report identifier, or plan to access the report by title using the `RL` command or the **Report** key.

See the Command Reference for more information.

---

## Opening a Report

You can open a report in several ways:
- Type a report identifier containing a report number, drawer letter, and cabinet number (e.g., `2B0`).
- Press **Report** to display a list of available drawers, highlight the desired drawer, press **Transmit**, highlight the desired report, and press **Transmit**.

> **Note:** If you omit the cabinet number from the report identifier, the system uses the current cabinet as the default.

The demonstration database contains the following reports: `1B` / `1B0`, `2B` / `2B0`, `1C` / `1C0`, `1D` / `1D0`.

To protect reports from unauthorized access, BIS includes a number of security features. For more information, see *Accessing Drawers* or *Protecting Reports*.

### Example: Displaying Report 2B

1. Position the cursor in home position (upper-left corner of the screen).
2. Type `2b` and press **Transmit**.

Report 2B is displayed. For more information on specifying reports, see the Command Reference.

---

## Copying a Report

1. Display the report you wish to copy (e.g., `2B`).
2. On the control line, type `xr` and press **Transmit**.
3. In the **Title** field, type a title for the new report (e.g., `Practice Report`).
4. Press **Transmit**.

The system copies the report. The new report identifier is displayed in the middle of the second line on the screen — write it down for later access. You can also use the `RL` command or the **Drawer** key to find the report by title.

See the Command Reference for more information.

---

## Saving a Report

**To save a copy of a report or result**, follow the steps under [Copying a Report](#copying-a-report).

**To replace a report with a result or a different report:**

> **Note:** You cannot replace a report unless you were the last person to update it. A system message will appear if this is not the case.

1. With the result or report to save on display, type `rep` and press **Transmit**.
2. In the **Report** field, type the report identifier of the report to be replaced. To replace a nonexistent report, type a new report identifier.
3. Optionally, type a title for the report.
4. Press **Transmit**.

The system replaces the specified report with the result or report currently on display.

To undo the replace, press **Undo** immediately after performing the replace, before doing anything else. If **Undo** is shown on the function key bar, the previous transaction can be undone. See the Command Reference for complete information.

---

## Closing a Report

**To close a report and release the screen:**

1. On the control line, type `^` (a caret) and press **Transmit**.

The active screen is displayed. Other ways to release the screen:
- Press **Quit** if it is displayed on the function key bar.
- Press **Return** repeatedly until the active screen is displayed.

### Related Commands

For more details on manipulating the screen display, see the following in the Command Reference:

| Command | Description |
|---------|-------------|
| `VIEW` | Create Temporary Format |
| `Fn` | Display Alternate Format |
| `DH` | Display and Hold Headings |
| `HCn` | Hold Characters on Screen |
| `Hn` | Hold Lines on Screen |
| `L` | Line Control |
| `^` | Release Display |
| `Sn` | Shift Display |

---

## Deleting a Report

> **Note:** You cannot delete a report unless you are the owner of that report.

1. Display the report you wish to delete.
2. On the control line, type `dr` and press **Transmit**.
3. In the **Report** field, type the report number and drawer letter of the report to delete.
4. Press **Transmit**.

The system deletes the report. See the Command Reference for complete information.

---

## Viewing a Report

When you display a report, a screen similar to the following is shown:

```
Line> 1  Roll> 2B0
.DATE 02 NOV 04  12:38:12  RID 2B  20 JAN 04  MAPPER
.Production Status Report       Corporate Production  B000002
*St. Status.By. Product
...
1 2Paint 3SOE 4Return 5 6Tasks 7View 8Help 9 10Edit
```

The top line is the **control line**, where you position the cursor to type requests. You can type commands such as `2b` after `Line?` or `Roll?`.

> **Note:** Make sure the cursor is resting on a space or on the last character of your request when you press **Transmit** — the character under the cursor is sent to the system for processing.

For more information on BIS reports and screens, see *Screens, Reports, and Results*.

---

## Moving Through a Report

### Horizontal Navigation

> **Note:** You must use a workstation to view all fields of a wide report.

**To change the horizontal view:**

1. On the control line, type `view` and press **Transmit**. A function mask (a blank version of the report layout) is displayed.
2. Tab to the first field you wish to view. The cursor moves to positions beneath the line of equal signs (`=`), where you enter parameters.
3. In the line below the equal signs, type `x` in the first character position of each field you wish to view.
4. Press **Transmit**.

The selected fields are displayed. See *Filling Out Function Masks* for more information.

**To return to the original view:**

1. On the control line, type `f0` and press **Transmit**.

The leftmost columns of the report are displayed.

### Vertical Navigation

| Action | Steps |
|--------|-------|
| Scroll down | After `Roll?` on the control line, type the number of lines to scroll down, then press **Transmit**. |
| Scroll up | After `Roll?`, type `-` followed by the number of lines to scroll up, then press **Transmit**. |
| Go to a specific line | After `Line?`, type the line number, then press **Transmit**. |
| Return to the top | After `Line?`, type `-`, then press **Transmit**. |

---

## Updating a Report

### Adding Blank Lines

**To add one blank line:**

1. Position the cursor on the line above where you want to add a line.
2. Press **Edit** (if shown on the function key bar), then press **Addlin**.
   - If neither **Edit** nor **Addlin** is displayed, type `looksw` on the control line and press **Transmit** to display the menu interface.

**To add more than one blank line:**

1. Position the cursor on the line above where you want to add lines.
2. Press **Edit** (if shown), then press **LineCh**.
3. Type the number of lines to add in the **Add lines** field.
4. Press **Transmit**.

**To add a blank line using a Graphical Presentation Client:**

1. Position the cursor after the line you want the blank line to follow.
2. From the **Edit** menu, select **Add Line(s)**.

> Remember to press **Undo** if practicing on the demonstration database.

See the Command Reference for more information.

---

### Deleting Lines

**To delete one line:**

1. Position the cursor on the line to delete.
2. Press **Edit** (if shown), then press **Delete**.

**To delete more than one line:**

1. Position the cursor on the first line to delete.
2. Press **Edit** (if shown), then press **LineCh**.
3. Type the number of lines to delete in the **Delete lines** field.
4. Press **Transmit**.

**To delete lines using a Graphical Presentation Client:**

1. Position the cursor before the first line to delete.
2. Highlight all lines to delete.
3. From the **Edit** menu, select **Delete Line(s)**.

> Remember to press **Undo** after deleting.

See the Command Reference for more information.

---

### Copying Lines

**To copy one line multiple times at the current location:**

1. Position the cursor on the line to copy.
2. Press **Edit** (if shown), then press **LineCh**.
3. Type the number of times to copy the line in the **Duplicate line** field.
4. Press **Transmit**.

**To copy lines using a Graphical Presentation Client:**

1. Position the cursor before the line(s) to copy and highlight them.
2. From the **Edit** menu, select **Copy**.
3. Position the cursor at the destination.
4. From the **Edit** menu, select **Paste**.

> Remember to press **Undo** after copying.

See the following topics in the Command Reference for more information: *Move Line*, *Put Line*, *Yank Line*.

---

## Printing a Report

> The printer you wish to use must be properly configured in BIS before printing.

**To print on a system printer:**

1. Display the report or result to print.
2. On the control line, type `pr` and press **Transmit**.
3. Fill out the **Print** input screen. Press **Help** with the cursor in any field for field-level help.
4. Press **Transmit**.

The system prints the report on the configured system printer. Contact your supervisor or system administrator for the printer location.

**To print on an auxiliary printer:**

1. Display the report or result to print.
2. On the control line, type `cop` and press **Transmit**.
3. Fill out the input screen and press **Transmit**.
4. If the printer is connected to your workstation, press **SgnOff**.

See the Command Reference for complete information, including the `AUX` command for controlling printing.
