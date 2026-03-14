# PSW and @PSW (Password)

## Overview

Assigns, changes, or clears the write password on a report, or unlocks a write-protected report for updating.

> **Note:** Statements can overwrite reports with write passwords — this command restricts only manual function users. When a run replaces a report containing a write password, the password is removed.

*(2200 only)* The `@PSW` statement enables a run to update reports that have write passwords assigned. Only one write password can be specified per `@PSW` statement. The system retains one password per session and allows updates to any report with that write password until the run finishes.

> **Note:** *(2200 only)* The `@PSW` statement is available only if your system is set up for it. Contact your administrator for more information.

For the manual function, a report must be on display and you must have update control of the report to assign, change, or clear a write password.

---

## Manual Function Syntax

```
PSW [psw]
```

`psw` is the password currently assigned to the displayed report, a new password for the report, or `clear` to remove password protection. The password can be up to six alphanumeric characters with no spaces. This field is transparent — the password is not displayed as you type.

## Statement Syntax *(2200 only)*

```
@PSW,psw .
```

`psw` is the write password.

---

## Guidelines

If you forget the password:

- **If you were the last person to update the report:** Create an unprotected copy using the Create Result Copy command, then use the Replace Report command to replace the result into the original report. The original report will no longer have a password.
- **If you were not the last person to update the report:** Contact the report owner (the last person to update it) or your administrator.

---

## Examples

Set a password to `lockit`, or unlock a report that has `lockit` as its current password:
```
psw lockit
```

Remove a password from the displayed report:
```
psw clear
```
