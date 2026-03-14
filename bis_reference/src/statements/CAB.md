# C, CS, and @CAB — Cabinet Switch

## Overview

Use the Cabinet Switch (C command or CS run) or the Cabinet Switch (`@CAB`) statement to change the current working cabinet number in the active session.

The CS command can also be used to initiate an interactive user session with another site.

> *(2200 only)* **Note:** You cannot update reports from an odd-numbered cabinet. To update a report, switch to the even-numbered cabinet containing the same data.

For the C command, you must have cabinet switching capability and you must know the password of the cabinet you are switching to. Contact your supervisor or administrator to obtain the password. For the CS run, the administrator must give you access privileges for the cabinet, or you must know the cabinet password and have cabinet switching capabilities.

*(Windows / Linux / UNIX only)* Cabinet access is based on drawer permissions (by security groups). The user's security group must allow access to at least one drawer in the specified cabinet, or the working cabinet will not be changed. See your administrator for more details.

---

## Syntax

### C Command

*(Windows / Linux / UNIX)*
```
C cnbr
```

*(2200)*
```
C cnbrpsw
```

| Field | Platform | Description |
|-------|----------|-------------|
| `cnbr` | Windows / Linux / UNIX | Cabinet number or cabinet name. |
| `cnbrpsw` | 2200 | Cabinet number and password. (Note that there is no space between them.) |

### CS Command

*(2200)*
```
CS rdc
```

```
CS report name
CS site letter
CS cab,rptdrw,line
```

| Field | Platform | Description |
|-------|----------|-------------|
| `rdc` | 2200 | Report, drawer, and cabinet you are switching to. Note that there are no spaces between report, drawer, and cabinet. |
| `report name` | All | Report name you are switching to. |
| `site letter` | All | Site letter of new site you are switching to. |
| `cab` | All | Cabinet number. |
| `rptdrw` | All | Report number and drawer. Note that there are no spaces between report number and drawer. |
| `line` | All | Line number in the report to display. |

### Cabinet Switch Formats

| Format | Syntax |
|--------|--------|
| Format 1 | `CS,c` |
| Format 2 | `CS,site letter.` |
| Format 3 | `CS,cab,report,line.` |
| Format 4 | `CS,report name.` |
| Format 5 | `CS,rdc.` |

### Cabinet Switch Statement Format

```
@CAB,c,d .
```

Where `c,d` is the cabinet and drawer to switch control to.

---

## Outcome

Executing the CS run causes the following actions to occur:

- If you specified a report, the system switches you to the specified cabinet and displays the report.
- If you did not specify a report, the system switches you to the specified cabinet and displays the Drawer Select menu.
- *(2200 only)* If the administrator did not give you access privileges to the cabinet, an input screen is displayed asking for the cabinet password.

The C command switches you to the cabinet you specify.

*(Windows / Linux / UNIX only)* The drawer list contains only those drawers that your security group allows access to.

When you execute the `@CAB` statement, the current working cabinet number is changed, and the run continues at the next statement.

---

## Guidelines

- If the Cabinet Switch (CS) command is used to begin a remote network session, the Exit function causes both the remote and local Business Information Server sessions to close. If the F7 remote key is used, only the remote session is closed and control returns to the local session.
- To transfer a result saved with the Save Report Version (SV) command, you must use the C command.
- *(Windows / Linux / UNIX only)* If you switch to a remote cabinet and then wish to create or retrieve a file with the Create File or Retrieve File commands, you must specify the full path name.
