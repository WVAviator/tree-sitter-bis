# @CBX — Define Combo Box

## Overview

Use the Define Combo Box (`@CBX`) statement to define a combo box and display it on the user's screen. The `@CBX` statement provides a choice between a drop-down list or a list which is always visible to the user. The `@CBX` statement allows the software to closely simulate a Microsoft environment.

This statement requires a workstation session that is using one of the following clients:

- Graphical Interface for Business Information Server
- Business Information Server for Microsoft Windows Client

> **Notes:**
> - If this session is using Graphical Interface for Business Information Server or Business Information Server for Microsoft Windows Client, the reserved `WS$` (workstation flag) is equal to one.
> - Check `DWCAP$` for availability: `DWCAP$(12-1) = 1` if available. For more information on `DWCAP$`, see the Developer's Guide.

---

## Syntax

```
@CBX[,c,d,r,l,tf?,oname,vwh,vert,hort,vsiz,hsiz,fc/bc,o,hl] [vch] .
```

| Field | Description |
|-------|-------------|
| `c,d,r` | Report containing the list of items to be displayed within the combo box. |
| `l` | Line within the specified report at which to start transferring list items. Default = 3. |
| `tf?` | Unconditionally transfer the report (`c,d,r`) to the workstation before processing the `@CBX` statement? Y or N. Default = N. |
| `oname` | Name of the object that contains the list items. The object may specify either a PC file name or a version controlled name. If you do not specify a name in this field, then you must specify the name on line 2 (the title line) of the report specified in the `c,d,r` field. Note: This command fails if you specify a version controlled name and version control naming is not supported. For more information on version control availability, see the Developer's Guide. |
| `vwh` | Variable containing an existing window handle. |
| `vert` | Vertical position of the upper left corner of the combo box using a positioning unit (or row number). See [`@WIN`](WIN.md) for more information on positioning units. When you specify a row number, the position is based on the main run font. See [`@FON`](FON.md) for more information on fonts. If you are specifying a value for the vertical position, you must also specify values in the `hort`, `vsiz`, and `hsiz` subfields. Default = 1 (positioning unit or row number). |
| `hort` | Horizontal position of the upper left corner of the combo box using a positioning unit (or column number). See [`@WIN`](WIN.md) for more information on positioning units. When you specify a column number, the position is based on the main run font. See [`@FON`](FON.md) for more information on fonts. If you are specifying a value for the horizontal position, you must also specify values in the `vert`, `vsiz`, and `hsiz` subfields. Default = 1 (positioning unit or column number). |
| `vsiz` | Vertical size of the combo box specified in positioning units (or row numbers). See [`@WIN`](WIN.md) for more information on positioning units. When you specify row numbers, the size is based on the text run font. See [`@FON`](FON.md) for more information on fonts. If you are specifying a value for the vertical size, you must also specify values in the `vert`, `hort`, and `hsiz` subfields. Default = the combo box extends to the bottom of the window in which you place it and expands and contracts with that window. |
| `hsiz` | Horizontal size of the combo box specified in positioning units (or column numbers). See [`@WIN`](WIN.md) for more information on positioning units. When you specify column numbers, the size is based on the text run font. See [`@FON`](FON.md) for more information on fonts. If you are specifying a value for the horizontal size, you must also specify values in the `vert`, `hort`, and `vsiz` subfields. Default = the combo box extends to the right side of the window in which you place it and expands and contracts with that window. |
| `fc/bc` | Foreground and background colors for this combo box. See Set Default Color Codes for the available colors. |
| `o` | Options for the combo box. See [Define Combo Box Options](#define-combo-box-options). |
| `hl` | Number of the item to highlight in the combo box. |
| `vch` | Variable to capture the combo box handle. |

---

## Define Combo Box Options

| Option | Description |
|--------|-------------|
| `A` | Causes text typed in the combo edit box to automatically be sent to the host after a brief delay. Allows the application to dynamically validate or modify dialog content as the user enters data. See also the I option. Note: Check `DWCAP$` for availability: `DWCAP$(15-1) = 1` if available. |
| `D` | Produces a drop-down list (default option). Do not use the D option with the F option. |
| `E` | This value can be edited (default option). Do not use the E option with the P option. |
| `F` | List is always visible. Do not use the F option with D or P options. |
| `I` | Causes the combo list box selection to automatically be sent to the host after a brief delay. Allows the application to dynamically validate or modify dialog content as the user selects an item. See also the A option. |
| `L` | List contents are converted to lowercase. User input is also lowercase. Do not use the L option with the U option. |
| `P` | List contents are protected. You cannot change the list contents, and you must select from the list. This option also allows automatic positioning by keystroke within the list. Do not use the P option with E or F options. |
| `S` | List contents are sorted alphabetically prior to display. |
| `U` | List contents are converted to uppercase. User input is also uppercase. Do not use the U option with the L option. |
| `Y` | Allows the sizing of the control to be in row and column units, independent of the units used for placement. |

---

## Guideline

You can have an aggregate limit of 4000 BTN, CBX, EDT, LST, PIC, TXT, and WIN controls concurrently open.

> **Note:** The actual number of handles created can be lower depending on workstation PC memory configuration and usage.

---

## Example

This example uses the `@CBX` statement to display a protected drop-down combo box, and the `@INP` statement to determine where to continue the run after the user makes a selection from the box.

```
@cbx,0,a,155,6,,list.dat,<win1>,5600,9600,12000,24000,bla/whi,dp <cbx1>I6 .
@inp <cbx1>,(0100) .
 .
 .
@0100:chg input$ <name>s20 .
```

| Field | Description |
|-------|-------------|
| `0,a,155` | List data in report 155A. |
| `6` | Transfer data starting at line 6. |
| `list.dat` | Name of the PC file where the data for the combo box is stored. |
| `<win1>` | Specify the handle of the window in which to place the combo box. |
| `5600,9600,12000,24000` | Display the combo box starting at vertical positioning unit 5600 and horizontal positioning unit 9600. Make the combo box 12000 positioning units tall and 24000 positioning units wide. |
| `bla/whi` | The foreground color is black and the background color is white. |
| `dp` | Drop-down list (D) and protected list (P) options. |
| `<cbx1>i6` | Place the combo box handle in variable `<cbx1>i6`. |
| `@inp` | If the `@INP` statement detects that this window was used, the run continues processing at label 0100, where the input is placed into `<name>`. |
