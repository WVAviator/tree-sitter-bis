# ENCODE and @ECR — Encode Report

## Overview

Transforms report data into unreadable code. The report cannot be displayed in readable form until the correct key is supplied using the Decode Report command.

This command is particularly useful for highly sensitive reports and messages. It is more secure than read/write passwords because no one — including the administrator — can decode the report without knowing the key.

> **Caution:** Excessive use of this command may affect system performance due to high processing overhead.

---

## Manual Function

**Windows / Linux / UNIX:**
```
ENCODE
```

**2200:**
```
ENCODE key
```
where `key` is a one- to eight-character code. Valid characters are `A`–`Z` and `0`–`9`.

---

## Syntax

**Windows / Linux / UNIX:**
```
@ECR,c,d,r,key[,hdgs?,dsp?] .
```

**2200:**
```
@ECR,c,d,r,key[,hdgs?,nodsp?] .
```

### Parameters

| Field | Platform | Required | Description |
|-------|----------|----------|-------------|
| `c,d,r` | All | Required | Report to encode. For more details, see *Specifying Reports or Drawers to Process*. |
| `key` | All | Required | One- to eight-character key with which to encode the report. **2200:** Valid characters are `A`–`Z` and `0`–`9`; the more characters used, the more difficult it is for an unauthorized user to guess the key. The following special keys are only effective in a script: `key:user` (limits decoding to a script running under the current user ID), `key:rcr` (limits decoding to a script in the same report as the current script), `key:site` (limits decoding to a script on the current site). |
| `hdgs?` | All | Optional | Encode report headings? `Y` or `N`. Default = `N`. |
| `dsp?` | Windows / Linux / UNIX | Optional | Create a displayable result? `Y` or `N`. If `Y`, the encoded (unreadable) data can be seen when the report is displayed or printed. Default = `N`. |
| `nodsp?` | 2200 | Optional | Create a non-displayable result? `Y` or `N`. If `Y`, the encoded data cannot be seen. Default = `N`. |

---

## Outcome

### Manual Function

- **Windows / Linux / UNIX:** Displays a result containing only the heading lines and a message indicating the result is protected. If `Y` was specified in the Include Headers field, headings are not displayed.
- **2200:** Displays a result with the data scrambled.

### `@ECR` Statement

- **Windows / Linux / UNIX:** Creates a result containing encoded data. If `dsp?` = `Y`, the encoded (unreadable) data is visible when displayed or printed; otherwise it is not.
- **2200:** Creates a result with the data scrambled. If `nodsp?` = `Y`, the encoded data cannot be seen.

---

## Guidelines

- **Do not forget your key.** A report cannot be decoded if the key is lost — the system keeps no record of it and no administrator can recover it.
- Do not move encoded data between drawers of different report widths — the data will be corrupted and unreadable.
- Do not update an encoded report. Any change corrupts it and makes it undecodable. Protect encoded reports from updates using an update password.
- You must use the control line format or the `@ECR` statement to access this command. The menu selection is available for online help only.
- *(Windows / Linux / UNIX)* You cannot display or update the result until you use the Decode Report command.
- *(2200)* You may not be able to decode data with a normal ASCII terminal if it was encoded with a National Character Set (NCS) terminal. Reports containing special NCS characters cannot be decoded with a normal ASCII terminal.
- *(2200)* Encoding a report approximately doubles its size.

---

## Example

Encode report `10B0` including headings, using the key `jak`:

```
@ecr,0,b,10,jak,y .
```
