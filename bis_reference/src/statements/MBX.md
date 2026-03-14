# @MBX — Define Message Box

## Overview

Defines a message box and displays it on the user screen. The user must respond to the message before the application can continue.

This statement requires a workstation session using one of the following clients:
- Graphical Interface for Business Information Server
- Business Information Server for Microsoft Windows Client

> **Note:** If the session is using either of these clients, the reserved word `WS$` (workstation flag) equals `1`.

---

## Syntax

```
@MBX[,btyp,ityp],caption message code,(lab)[,code,(lab),...,code,(lab)] .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `btyp` | Optional | Type of button(s) displayed in the message box. See [Button Options](#button-options-btyp). Default: `OK`. |
| `ityp` | Optional | Type of icon displayed in the message box. See [Icon Options](#icon-options-ityp). Default: no icon. |
| `caption` | Required | Text displayed in the header of the message box. Can be a literal or variable. Maximum: 100 characters (truncated if exceeded). Default: the name of the application. |
| `message` | Required | Text lines of the message. May be any combination of literals and variables. Each parameter value starts on a new line when displayed — use `/` to separate multiple parameters. Maximum: 800 characters total. |
| `code,(lab)` | Required | Label to branch to when the user selects the specified button. The first code listed is the default button. See [Button Response Codes](#button-response-codes-code). |

---

## Options

### Button Options (`btyp`)

| Option | Buttons Displayed |
|--------|------------------|
| `OK` | OK |
| `OC` | OK and Cancel |
| `RC` | Retry and Cancel |
| `YN` | Yes and No |
| `YNC` | Yes, No, and Cancel |
| `ARI` | Abort, Retry, and Ignore |

### Icon Options (`ityp`)

| Option | Icon |
|--------|------|
| `E` | Exclamation point |
| `I` | Informational |
| `S` | Stop sign |
| `Q` | Question mark |

### Button Response Codes (`code`)

| Code | Button |
|------|--------|
| `O` | OK |
| `C` | Cancel |
| `A` | Abort |
| `R` | Retry |
| `I` | Ignore |
| `Y` | Yes |
| `N` | No |

---

## Example

Display a two-button message box with an exclamation icon:

```
@ldv v1s5='FIRST' .
@ldv v2s7='SECOND' .
@mbx,OC,E,Continue? 'You may Continue'/'or Cancel' O,(0005),C,(0199) .
```

| Part | Description |
|------|-------------|
| `OC` | Display OK and Cancel buttons |
| `E` | Display an exclamation point icon |
| `Continue?` | The message box title |
| `'You may Continue'/'or Cancel'` | Message text — the `/` splits the text onto two lines |
| `O,(0005)` | Branch to label 0005 if the user selects OK |
| `C,(0199)` | Branch to label 0199 if the user selects Cancel |

---

## Notes on Message Text Syntax

The `/` character splits message text onto multiple lines.

When using **single quotes**, no space is allowed between variables and the `/` delimiter (which must be outside the quotes):

```
@mbx,OC,E,Continue? 'You may 'V1'Continue'/'or 'V2'Cancel' O,(0005),C,(0199) .
```

When using **double quotes**, variables and the `/` delimiter are used without any quotation marks:

```
@mbx,OC,E,Continue? "You may V1 Continue/or V2 Cancel" O,(0005),C,(0199) .
```
