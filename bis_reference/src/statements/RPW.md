# RPSW and @RPW (Read Password)

## Overview

Limits access to individual reports using read passwords.

The **manual function** (`RPSW`) allows you to assign a standard, user-private, or department-private read password, or clear an existing one. You must have update control of a report before you can assign, change, or clear its read password. When displaying a password-protected report, the system automatically prompts for a valid password.

The **`@RPW` statement** enables a run to access reports with standard read passwords. Up to two read passwords can be specified per `@RPW` statement. The system retains up to two passwords per session and allows access to any report with one of those passwords until the run finishes.

> **Note:** The only statements that can overwrite reports with read passwords are [`@PCR`](PCR.md) (Transfer from PC), [`@DEL`](DEL.md) (Delete), and [`@REP`](REP.md) (Replace Report). All other statements and manual functions cannot overwrite password-protected reports. When any of these statements updates a password-protected report, the password is removed.

> **Note:** You must use the control line format to access the manual Read Password command. The menu selection is available only for online help.

---

## Manual Function Syntax

```
RPSW {psw | keyw}
```

| Field | Description |
|-------|-------------|
| `psw` | The password (1–6 characters). |
| `keyw` | One of the following keywords: `Clear` = clears an existing password; `USER$` = assigns a user-private password (report can only be displayed by a user with your user-ID in your department); `DEPT$` = assigns a department-private password (report can only be displayed by users with your department number). |

---

## Statement Syntax

```
@RPW{,pw1 | ,pw1,pw2 | ,,pw2} .
```

| Field | Description |
|-------|-------------|
| `pw1` | First read password. |
| `pw2` | Second read password. |

---

## Guidelines

### Manual Function Guidelines

- You cannot assign a read-access password to report `0` or to results.
- *(Windows / Linux / UNIX)* A run can access a password-protected report if the password is supplied on `@RPW`, or if it was one of the last two read passwords supplied via the `RPSW` manual function.
- *(2200 only)* You can maintain access to a report as long as it remains displayed. If you release the report and try to redisplay it, you must enter the password again.
- When a command processing multiple reports in a drawer encounters a locked report, it treats the locked report as nonexistent.
- When the Index command encounters a locked report, it displays only the date and title lines — not the report contents.

### `@RPW` Statement Guidelines

- Only two passwords can be supplied per `@RPW` statement. Each `@RPW` statement replaces the previously stored passwords.
- You can use multiple `@RPW` statements throughout a run to access different reports. Specifying only `pw2` (e.g., `@rpw,,zzz .`) replaces only the second password while keeping the first unchanged.
- For greater security, solicit the password from the run user and conceal it within the run:
  ```
  @chg input$ v1h6 .
  @rpw,v1 .
  ```

---

## Examples

Set read password to `readme`:
```
rpsw readme
```

Set a read-access lock for your user-ID:
```
rpsw user$
```

Access one report with a read password:
```
@rpw,readme .
@srh,0,b,2 '' 'custcode' |,amco .
```

Access two reports with different read passwords:
```
@rpw,readme,readit .
@mch,0,b,2,0,c,1 n 'product' |,1 .
```
