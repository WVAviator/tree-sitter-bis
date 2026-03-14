# @MNU — Define Menu Bar

## Overview

Defines a menu bar and displays it on the user screen, providing available selections to the user.

> **Note:** The number of items visible in the menu bar depends on the run user's monitor — not all requested items may be visible on all monitors.

This statement requires a workstation session using one of the following clients:
- Graphical Interface for Business Information Server
- Business Information Server for Microsoft Windows Client

> **Note:** If the session is using either of these clients, the reserved word `WS$` (workstation flag) equals `1`.

---

## Syntax

```
@MNU,type[,vwh] keyword["label",o,action/val] .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `type` | Optional | Type of menu bar: `P` (permanent) or `T` (temporary). Leave blank when using the `RESET` keyword. Default: `T`. |
| `vwh` | Optional | Window handle. When specified, the menu bar is attached to that window rather than the main window. |
| `keyword` | Required | Specifies the structure and behavior of the menu bar. See [Keywords](#keywords). |
| `"label"` | Optional | Names each position on the menu bar. Use with `MENUBAR` and `SUBMENU` keywords only. Maximum: 79 characters per label; up to 500 labels per `@MNU` statement, up to 100 per menu bar item. |
| `o` | Optional | Options controlling item display. See [Options](#options). Default: `E` and `U`. |
| `action/val` | Optional | Action to perform or value to provide when the item is selected. If omitted, one or more `SUBMENU` definitions must immediately follow the `MENUBAR` command. For permanent menu bars with no pull-down selections, this field must contain a valid control line action. |

---

## Keywords

| Keyword | Description |
|---------|-------------|
| `MENUBAR` | Names each position on the menu bar from left to right. Multiple `MENUBAR` keywords may be specified per `@MNU` statement. Each must either specify an action or be immediately followed by a `SUBMENU` keyword. Terminated by any `@` command, an `END` keyword not paired with a `SUBMENU`, or when another `MENUBAR` keyword begins. |
| `SUBMENU` | Specifies that a pop-up menu is associated with the current pull-down item. The lines defining the pop-up menu immediately follow this keyword. Multiple `SUBMENU` keywords may be used per `MENUBAR` keyword. Must be terminated with an `END` keyword. |
| `END` | Signals the end of a `SUBMENU` or `MENUBAR` keyword. If an open `SUBMENU` exists, `END` closes it. If no open `SUBMENU` exists, `END` closes the `MENUBAR`. |
| `RESET` | Restores the previous permanent menu bar. When using this keyword, omit the `type`, `label`, `o`, and `action/val` fields. |

---

## Options

These options apply only to pull-down or pop-up menu definition lines. They are not valid on `MENUBAR` or `SUBMENU` keywords that specify an action.

| Option | Description |
|--------|-------------|
| `A` | Adds a hot key for the menu item. The item must be a pop-up menu item. The `label` field must use the format `<Menu Name>\<any printable character>`. Check `DWCAP$(15-1) = 1` for availability. |
| `C` | Displays the item as checked. Do not use with `U` or `S`. |
| `D` | Displays the item as disabled (grayed). Do not use with `E` or `S`. |
| `E` | Displays the item as enabled. Do not use with `D` or `S`. |
| `M` | Marks the end of one column of pull-down selections — the next item begins a new column. Do not use with `S`. |
| `S` | Displays a separator bar. The `label` field must contain only `""`. Do not combine with any other option. |
| `U` | Displays the item as unchecked. Do not use with `C` or `S`. |

---

## Guidelines

- A **permanent** menu bar remains active until another menu bar replaces it. It does not terminate when the run terminates.
- A **temporary** menu bar remains active until it is replaced by another menu bar, the run terminates, or a previous menu bar is restored via the `RESET` keyword.
- To define a keyboard hot key, place an ampersand (`&`) immediately before the character in the label. The character is underlined when the menu is displayed and can be activated with the ALT key. If multiple entries share the same hot key, only the first is used.
- For **permanent** menu bars with no pull-down selections, an action must be provided in `action/val`.
- For **temporary** menu bars, use [`@INP`](INP.md) to receive the contents of `action/val`. The value is then accessible via `INPUT$`, `INVAR$`, etc.
- If the run suspends via a [`@DSP`](DSP.md), [`@OUM`](OUM.md), [`@OUT`](OUT.md), or `SC` statement and the user selects a menu bar item, the `action/val` content is treated as input from the home position of the screen.
- Adding a menu bar to a window reduces the number of lines available within that window. The actual height of the menu bar depends on monitor type (VGA or EGA).

---

## Example

Create a temporary menu bar in window `<win1>` with three main items — Border, Font, and Color. Color includes a submenu for additional colors, with Purple disabled:

```
@win,,2,2,30,30,,o 'Menubar Example' <win1>i6 .
@mnu,t,<win1> MENUBAR,"&Border"
    "&None",,NONE
    "&Frame",,FRAME
  MENUBAR,"&Font"
    "&Courier New",,CN
    "&Lucinda Console",,LC
    "&MAPPER Standard",,MS
  MENUBAR,"&Color"
    "&Blue",,blu
    "&Red",,red
    "&Yellow",,yel
    "",s,0
    SUBMENU,"&More Colors"
      "&Orange",,ora
      "&Green",,gre
      "&Purple",d,pur
@0002: INP .
@IF INPUT$ eq NONE,(0010),FRAME,(0020),CN,(0030),LC,(0040),\
  MS,(0050),BLU,(0060),RED,(0070),YEL,(0080),ORA,(0090),GRE,(0100),\
  PUR,(0110) ; gto 0002
```

| Part | Description |
|------|-------------|
| `t,<win1>` | Temporary menu bar attached to window `<win1>` |
| `MENUBAR,"&Border"` | First menu bar item; `&B` sets `B` as the hot key |
| `"&None",,NONE` | Pull-down item; selects action `NONE` |
| `"&Frame",,FRAME` | Pull-down item; selects action `FRAME` |
| `MENUBAR,"&Font"` | Second menu bar item with three font selections |
| `MENUBAR,"&Color"` | Third menu bar item with color selections |
| `"",s,0` | Separator bar between color items and the More Colors submenu |
| `SUBMENU,"&More Colors"` | Pop-up submenu containing Orange, Green, and Purple |
| `"&Purple",d,pur` | Purple is disabled (`d`) and cannot be selected |
| `@INP` | Receives the selected `action/val` value into `INPUT$` |
| `@IF INPUT$ eq ...` | Branches to the appropriate label based on the user's selection; loops back to `0002` if no match |
