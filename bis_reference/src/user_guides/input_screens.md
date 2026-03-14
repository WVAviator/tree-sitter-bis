# Input Screens

## Overview

An input screen is displayed when you request a function that needs additional information to execute. It contains fields where you specify how you want to use the function. Some fields are automatically filled with default values, which you can use as-is or overwrite by typing over them.

The following is an example input screen for the **Index User** (`IU`) function. Note that the `User-id` field is pre-filled with a default value:

```
Index User Request

Number of lines from each report  _________
Drawer                             _________
User-id (ALL for all)              NEWUSER
Last update start date (DDMMMYY)   _________
Last update end date   (DDMMMYY)   _________
First report                       _________
Last report                        _________
```

---

## Completing an Input Screen

1. Type information in each field you want to fill in or change.
2. Press **Transmit** when the form is complete.

> **Note:** Some fields require a value. If you leave a required field blank, a system message is displayed and the command will not execute.

### Control Line Shortcut

Many commands let you skip the input screen entirely by specifying values directly on the control line. For example, instead of filling out the `IU` input screen, you could enter:

```
iu 5d
```

This displays five lines from each report in drawer D, equivalent to filling in those fields on the input screen.

---

## When Input Screens Are Displayed

An input screen may be displayed in any of the following situations:

- You request a manual function while no report is on display.
- You request a manual function that requires more information than just the report name and format number.
- You have a report on display and call a manual function that can process an entire drawer, but you enter only the function call without specifying a drawer (e.g., you enter `i` rather than `i b`).

---

## Getting Help

The following help is available while filling out an input screen:

- **Field-level help** — Tab to a field and press **Help** to display a brief description of the field and its possible values.
- **Function help** — Press **Help** again to display the full help topic for the function.

---

## What Happens After You Submit

After you complete an input screen, the next screen displayed depends on the command and what was previously on display:

| Outcome | Description |
|---------|-------------|
| Immediate execution | Some functions execute immediately and display a result. |
| Function mask displayed | Some functions need additional information about report fields. See *Function Masks*. |
| System message displayed | If the command cannot execute (e.g., a required field was left blank or the specified report does not exist), the system displays a message and does not execute the command. |
