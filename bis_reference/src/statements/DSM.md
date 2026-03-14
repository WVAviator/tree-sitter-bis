# @DSM — Display Message

## Overview

Displays a custom one-line message at the top of the screen. The message must reside in a report or result and is specified by its line number.

There are two ways to use `@DSM`:

- Display a message at the top of an existing screen.
- Display a report or result with the selected message at the top of the screen, starting at line 1 or a specified line number.

---

## Syntax

```
@DSM,c,d,r,lmsg[,tabp,erase?,interim?,pdq,dc,dd,dr,dspl,dspf] .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `c,d,r` | Required | Report containing the message. |
| `lmsg` | Required | Line number of the message in the report. |
| `tabp` | Optional | Tab position after which to place the cursor. Use a negative number to move backwards. Maximum = `100`. Default = home position. |
| `erase?` | Optional | Erase the screen? `Y` or `N`. Default = `N`. |
| `interim?` | Optional | Interim display? `Y` or `N`. If `Y`, the run continues automatically when the display is complete. Default = `N`. |
| `pdq` | Optional | Number of lines to push down on the screen. Default = `0`. Ignored if `dc`, `dd`, or `dr` subfields are used. |
| `dc` | Optional | Cabinet of the report to display. |
| `dd` | Optional | Drawer of the report to display. |
| `dr` | Optional | Report to display. |
| `dspl` | Optional | Line number of the specified report at which to start the display. Default = `1`. |
| `dspf` | Optional | Format of the report to display. Omit if displaying a format defined with an `@FMT` or `@SFC` statement. **Windows / Linux / UNIX:** `0`–`25`, default = `0` (basic format). **2200:** `0`–`6`, default = `0` (basic format). |

---

## Outcome

Executing `@DSM` causes the following:

- The specified message is displayed at the top of the screen or report.
- Message text is highlighted in the same manner as system messages.
- All `<` and `>` characters are translated into blinking characters.
- On a 132-character terminal, the message is automatically centered.
- The output area is cleared.

---

## Reserved Words

When displaying a message with no report on display, the following reserved words can be used to capture input data entered by the run user:

- `INVAR$`
- `INVR1$`
- `INPUT$`
- `INSTR$`

---

## Guidelines

- You can customize the report format by preceding `@DSM` with a [`@FMT`](FMT.md) (Format) or [`@SFC`](SFC.md) (Set Format Characters) statement.
- Do not place other statements on the same line after `@DSM` — they will be ignored. Put the next statement on a new line.
- `@DSM` stalls the run until the user presses Resume, unless `interim?` is set to `Y`, in which case the run continues automatically.
- The function key bar is displayed on screen and can be customized. See [`@FKY`](FKY.md) (Function Key) for more information.
- *(2200 only)* If you intend to display a report using the `dc,dd,dr` subfields and your message is in a `-0` result, use the [`@RNM`](RNM.md) (Rename) statement to rename the message beforehand.

> **Note *(2200 only)*:** If an error routine is registered via `@RER`, and `@DSM` errors due to a non-existent drawer or report, exceeding the largest report for the drawer, or requesting a line beyond the end of the report — the run will terminate and the `@RER` routine will **not** be executed.

---

## Examples

Display a message from line `4` of the current result at the top of the current screen:

```
@dsm,-0,4 .
```

Display report `2D0`, place a message from line `4` of report `12A0` at the top of the screen, and position the cursor at tab position `10`:

```
@dsm,0,a,12,4,10,,,,0,d,2 .
```
