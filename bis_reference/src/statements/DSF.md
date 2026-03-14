# @DSF — Display Form

## Overview

Displays a report containing screen commands (a form) and returns control to the run. Use `@DSF` instead of `@SC` when displaying a form from within a run, particularly when you need to start at a specific page number.

---

## Syntax

```
@DSF,c,d,r[,pn,tabp,stack] o [fldtxt] .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `c,d,r` | Required | Report containing the form. |
| `pn` | Optional | Page number within the form at which to start the display. Valid only if the specified form uses paged data. |
| `tabp` | Optional | Tab position at which to place the cursor. A positive number represents a forward tab position (up to `100`); a negative number represents a backward tab position (up to `-100`). Default = `1`. Use `0` for no positioning. |
| `stack` | Optional | Return stack action. See [Stack Values](#stack-values) below. |
| `o` | Optional | T-field text option (`T`). Inserts text supplied in `fldtxt` into unprotected screen fields, allowing you to add values to menu fields. See *Field Attribute Commands*. |
| `fldtxt` | Optional | Field values to pass to the form when the `T` option is present. A comma-separated list where the first item is placed in the first field, the second in the second field, and so on. |

---

## Stack Values

The `stack` field controls the return stack action. Behavior differs slightly between platforms:

| Value | Windows / Linux / UNIX | 2200 |
|-------|------------------------|------|
| `0` | Puts this form on the top of the stack *(default)* | Puts this form on the top of the stack *(default)* |
| `1` | Clears the stack and puts this form on the bottom | Clears the stack and puts this form on the bottom |
| `2` | Marks the current stack position, then puts this form on the top | Marks the current stack position, then puts this form on the top |
| `3` | Saves the context of the current form so a return restores the screen as it currently exists. Useful for help displays. | Saves the current stack position, then puts this form on the top. The screen itself is not saved. |
| `4` | Does not put an entry on the return stack for this form | Does not put an entry on the return stack for this form |
| `5` | Overwrites the current entry on the return stack with this form | Overwrites the current entry on the return stack with this form |

---

## Example

Display the form in report `36E6` starting at page `100`, placing the cursor at tab position `1`. Pass the values `"redeem"` and the current user ID to the form, and do not put the form on the return stack:

```
@dsf,6,e,36,100,1,4 't' redeem,user$ .
```
