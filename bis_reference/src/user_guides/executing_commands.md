# Executing Commands

## Overview

There are two kinds of commands you may execute: **scripts** and **manual functions**.

**Scripts** are a series of statements that automatically start a sequence of equivalent manual functions, plus additional statements that control the logic of the script. Since scripts are written by many different designers, each script may be set up differently:
- Some require information to be entered along with the script name at invocation.
- Some allow you to either navigate through menus or pass information directly when invoking the script.
- Many provide online help, often accessible by typing `help` after the script name or by pressing the **Help** function key.

This guide focuses on **manual functions**. You can request a manual function in one of two ways:
- Navigating through a menu path
- Entering a command (also called a function call) on the control line

Once you request a manual function, you may need to complete an input screen and/or function mask for the command to finish executing. See *Input Screens and Function Masks* for more information.

---

## Requesting a Function via Menu Path

The following example shows how to request the Totalize (`TOT`) function through the menu system:

1. Press the **Task** key. The *Select Task* menu is displayed.
2. Move the cursor to **Perform math operations** and press **Transmit**. The *Perform Math Operations* menu is displayed.
3. Move the cursor to **Totalize data** and press **Transmit**.

Depending on whether a report was on display:
- **Report on display** — the function mask is displayed.
- **No report on display** — the input screen is displayed.
- In some cases, neither is displayed. See *Input Screens* for details.

---

## Requesting a Function on the Control Line

The following example shows how to request the `TOT` function from the control line:

1. Place the cursor in home position or any control position on the control line.
2. Type `tot`.
3. Erase the rest of the line by pressing the **Erase to End of Line** key, then press **Transmit**.

Depending on whether a report was on display:
- **Report on display** — the function mask is displayed.
- **No report on display** — the input screen is displayed.
- In some cases, neither is displayed. See *Input Screens* for details.

### Inline Parameters

Many functions support more than one command format, each serving a different purpose. For example, to run `TOT` on report `2B` in cabinet `0` without that report currently on display, you can enter the report identifier inline:

```
tot 2b0
```

This is equivalent to running `tot` and then specifying the report on the input screen.

> **Note:** If a system message erases the control line, press **Home** and enter `L` to restore it. You can also press the **Paint** key if it is present on the function key bar.
