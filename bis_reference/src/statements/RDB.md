# RDB and @RDB (Run Debug)

## Overview

Locates and corrects errors in a script while it is executing. The manual function (`RDB`) initiates debugging from the control line. The statement (`@RDB`) starts debugging at a specific point within a script, which is especially useful for large or complex scripts.

### Developer Workshop Debugger

By default, BIS attempts to connect to the Developer Workshop debugger running on your workstation. This connection is attempted only when initiating the script from the Graphical Interface. If BIS cannot connect to the Developer Workshop, or if the script is not initiated from a Graphical Interface, it reverts to the legacy run debugger.

The Developer Workshop provides a comprehensive debugger including conditional and line breakpoints, expression tracking and evaluation, variable inspection, and execution flow examination — including support for JavaScript. For complete information, see the Business Information Server Developer Workshop Help.

> **Note:** The BIS administrator can disable the default behavior of connecting to the Developer Workshop.

RDB is turned off before starting a script on a remote BIS site. To continue debugging into a remote script, RDB must be restarted in the remote script. Similarly, RDB must be restarted when returning from a remote script initiated by NRM.

### Access Requirements

- *(Windows / Linux / UNIX)* You must have write access to the drawer of the run control report. The script must not be registered in the Master Script Registration report to execute RDB manually; however, the `@RDB` statement may still be used within the script.
- *(2200 only)* You must be registered as an application designer and have write access to the drawer of the run control report.

---

## Manual Function Syntax

```
RDB script[,v,...,v] .
```

| Field | Description |
|-------|-------------|
| `script` | Name of the script to debug. |
| `v,...,v` | Data supplied to the script to be initialized through `INPUT$`. |

---

## Statement Syntax

**Format 1 — Default**
```
@RDB .
```
Attempts to connect to the Developer Workshop client first. If unable to connect, reverts to the legacy debugger (if permitted); otherwise the command is ignored. If the script is already debugging, generates a breakpoint halt.

**Format 2 — Developer Workshop (specific host)**
```
@RDB[,WorkshopHostAddress,WorkshopPortNumber] .
```
Connects to a specified remote Developer Workshop client. Useful for debugging background scripts or scripts without an associated user workstation. If unable to connect, the command is ignored. If the script is already debugging, the format is ignored and a breakpoint halt is generated.

| Field | Description |
|-------|-------------|
| `WorkshopHostAddress` | Name or IP address of the host running the Developer Workshop. Default = host associated with the current session. |
| `WorkshopPortNumber` | Port number the Developer Workshop client is listening on. Default = `57006`. Only specify if the default port has been changed. |

---

## Examples

Debug to localhost (BIS and Developer Workshop on the same system):
```
@RDB, localhost .
```

Debug to a specific remote system using the default port (port number not required):
```
@RDB, my-test-system, 57006 .
```
