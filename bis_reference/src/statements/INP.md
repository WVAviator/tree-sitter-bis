# @INP — Accept Input

## Overview

Temporarily suspends a run, waits for input from a graphical control, form, or DDE conversation, and specifies where the run should continue processing based on a user selection.

> **Note:** Information regarding controls and control handles also applies to DDE conversations and conversation handles unless otherwise noted.

Requires one of the following combinations of software:

- Business Information Server for Microsoft Windows Client and Microsoft Windows Server.
- Microsoft Windows and Business Information Server for Linux and the UNIX Operating System, or Business Information Server for ClearPath OS 2200. See the related Software Release Announcements for supported levels.

---

## Syntax

**Format 1 — Set Focus and Wait:**
```
@INP[,vfocus,,vinput vwh,(lab),...,vwh,(lab)] .
```

**Format 2 — Single Data Input:**
```
@INP[,vwh,fxmt?] .
```

**Format 3 — Multiple Data Input:**
```
@INP[,vwh,...,vwh] .
```

**Format 4 — Use with `@DDE`:**
```
@INP .
```

### Parameters

| Field | Format | Required | Description |
|-------|--------|----------|-------------|
| `vfocus` | 1 only | Optional | Variable containing a control handle. The specified control becomes the initial focus for user input. A button in focus can be selected with the mouse or the Enter key. |
| `vinput` | 1 only | Optional | Variable containing a window handle. If specified, input is accepted only from controls within this window. Does not apply to DDE conversations. |
| `vwh` | 1 only | Optional | Variable containing a control handle. If the user selects this control, execution transfers to the label in the following subfield. Maximum = 80 handles. If the user selects a control not listed, execution transfers to the next line (`lin+1`). |
| `lab` | 1 only | Optional | Label to branch to if the user selects the preceding control handle. Maximum = 80 entries. |
| `vwh` | 2 only | Optional | Variable containing a control handle. This control becomes the focus of a forced transmit specified in `fxmt?`. Designed to transfer data from an inactive control to `INPUT$`. |
| `fxmt?` | 2 only | Optional | Transmit from the control in the preceding field? `Y` or `N`. Default = `N` (no action). Does not apply to DDE conversations. |
| `vwh` | 3 only | Optional | Two or more variables containing control handles. Maximum = 80 handles. Forces a transmit from every listed control simultaneously, transferring data to `INPUT$`. Only one control handle may be that of a multi-item list or multiline edit box — specify it last. |

---

## Outcome

- **Format 1:** Suspends the run until input is received, then continues at the specified label (or the next line if no label is given). Places focus and the insertion point on `vfocus`; if the object is an edit box, highlights the text at the insertion point.
- **Formats 2 and 3:** Do not suspend the run. Control continues on the next line. Designed to transfer data from controls to `INPUT$`.
- **Format 4:** Suspends the run until input is received, then continues at the next line.

---

## Reserved Words

The following reserved words may be used in the `vwh` field:

| Reserved Word | Description |
|---------------|-------------|
| `WND$` | Handle of the main session window. |
| `ACTWIN$` | Handle of the currently active window. |
| `ACTINP$` | Handle of the control that last provided input. If the control is not a window, `ACTWIN$` contains the handle of its parent window. |

---

## Guidelines

- If receiving input from a list box containing tab characters, load the variable(s) with `INVR1$` before executing `@INP`.
- Input from a multiline edit box is limited to 256 characters per line. Total input cannot exceed 6,500 characters — excess input is truncated and a system message is displayed.
- `@INP` overrides the effect of [`@CHD`](CHD.md) (Command Handler). Any registered command handler routine is ignored while `@INP` is active.
- Use `@INP` with a DDE conversation only after setting up an advisory with the DDE server program.
- If a user presses **Esc** while the run is suspended on an `@INP` statement, the run aborts. Include an [`@RAR`](RAR.md) statement to handle this case.
- For more information, see [`@DDE`](DDE.md) (Dynamic Data Exchange Interface).

---

## Examples

### Focus and Label Branching (Format 1)

Set focus on `<BTNOK>`, restrict input to `<WIN001>`, and branch based on which control is selected. Use `ACTINP$` to determine the selected control and `INPUT$` to detect menu bar selections:

```
@0010 INP,<BTNOK>,,<WIN001> .
@.
@ IF ACTINP$ eq <BTNOK>,(0100) ;   . OK
@ IF ACTINP$ eq <BTNCAN>,(0199) ;  . Cancel
@ IF ACTINP$ eq <BTNHLP>,(0195) ;  . Help
@.
@ IF INPUT$ eq CANCEL,(0199) ;     . Cancel Application
@ IF INPUT$ eq HELP,(0195) ;       . Help screen
@ IF INPUT$ eq ABOUT,(0190) ;      . About screen
@ GTO 0010 .
```

Equivalent, using inline label list on the `@INP` statement:

```
@0010 INP,<BTNOK>,,<WIN001> \
    <BTNOK>,(0100),<BTNCAN>,(0199),<BTNHLP>,(0195) .
@ IF INPUT$ eq EXIT,(0199),HELP,(0195),ABOUT,(0190) ;
@ GTO 0010 .
```

---

### Single-Item List Box (Format 2)

Select an item from `<LST001>` and save it to `<LIST1>`:

```
@0100 INP,<LST001>,Y .
@ CHG INPUT$ <LIST1>S20 .
```

---

### Multi-Item List Box (Format 2)

Select items from `<LST001>` and save to multiple variables:

```
@0105 INP,<LST001>,Y .
@ CHG INPUT$ <LIST1>S20,<LIST2>S20,<LIST3>S20,<LIST4>S20 .
```

---

### Multiple Controls (Format 3)

Collect data from multiple edit and combo boxes simultaneously:

```
@0110 INP,<EDT001>,<EDT002>,<CBX001>,<EDT003>,<CBX002> .
@ CHG INPUT$ <ITEM1>S20,<ITEM2>S20,<ITEM3>S20,<ITEM4>S20,<ITEM5>S20 .
```

> **Note:** Only one multi-item control may be specified, and it must be listed last.
