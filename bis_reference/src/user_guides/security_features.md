# Security Features

## Overview

This guide describes features that protect the BIS database from unauthorized users, covering the following topics:
- [Accessing Drawers](#accessing-drawers)
- [Protecting Reports](#protecting-reports)
- [Script Registration](#script-registration)

---

## Accessing Drawers

In a typical BIS installation, each user has access to specific drawers based on the permissions associated with their user-id. The system administrator sets up security groups that grant read-only or read/write access to the drawers each user requires.

The system checks your security group when you perform the following operations:

- *(Windows / Linux / UNIX)* **Cabinet Switch** (`C` or `CS`) — Changes your current cabinet. You must have read access to at least one drawer in a cabinet in order to switch to it.
- **Display Report** (`D`) and other manual functions when using the `rdc` format (report number, drawer letter, and cabinet number — e.g., `2B0`).

---

## Protecting Reports

Reports can be protected at the cabinet, drawer, and report levels.

### Cabinet Passwords *(OS 2200)*

The system administrator assigns cabinet passwords. To access a cabinet other than the one assigned to your user-id, use the `C` or `CS` commands and enter the cabinet password. Contact your supervisor for passwords to cabinets you need to access. See the Command Reference for information on cabinet switching.

### Drawer Passwords *(OS 2200)*

A drawer password prevents unauthorized users from displaying or updating any report in that drawer. You can assign or reset the drawer password for your own drawers. To access a password-protected drawer, obtain the password from your supervisor and use the **Drawer Password** (`DPW`) command. See the Command Reference for more information.

### Report Passwords

You can restrict read or write access to individual reports by creating a password using either the **Read Password** (`RPSW`) or **Password** (`PSW`) command. The password must then be entered to display or update the restricted report. See the Command Reference for more information.

### Encoded Reports

You can protect report data using the **Encode Report** (`ENCODE`) command, which transforms report contents into unreadable code. See the Command Reference for more information.

---

## Script Registration

The system administrator must register any script before it can be executed. When registering a script, the administrator can impose the following limits:

- The cabinets the script is allowed to access
- Which users are allowed to start the script
- The time period in which the script may execute

*(Windows / Linux / UNIX)* In addition to cabinet-level access, the administrator can register scripts to use specific drawers and assign security groups, providing security down to the drawer level on a per-user basis.

Contact your system administrator for additional information on script registration.
