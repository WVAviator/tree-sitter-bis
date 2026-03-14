# DR and @DLR — Delete Report

## Overview

Deletes a specified report, result, or renamed report from the database.

Unlike the **DR** manual function, `@DLR` allows you to delete a report even if you were not the last person to update it. It also supports deleting reports protected by read or write passwords, as well as encoded reports.

---

## Manual Function

```
DR [report]
```

Executing `DR` as a manual function deletes the report currently on display and shows a confirmation message. The report to delete must be on display, and your user ID must match the user ID of the person who created or last updated it.

For details on specifying reports, see *Specifying Reports or Drawers to Process*.

---

## Syntax

```
@DLR,c,d,r[,lab] .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `c,d,r` | Required | The report to delete. For details, see *Specifying Reports or Drawers to Process*. |
| `lab` | Optional | Label to branch to if the report does not exist. Use `LIN1` to continue on the next line instead of specifying a label number. If the report number exceeds the system maximum, the command limit will not process the label. |

---

## Guidelines

- If the specified report does not exist, the run branches to `lab` if one is provided.
- To regain a report immediately after deleting it with the **DR** manual function, press **Undo**.
- To recover a report after deleting it and executing other functions, contact your administrator about retrieving it from a backup tape.

---

## Examples

Delete report `3B0`:

```
@dlr,0,b,3 .
```

Delete the `-3` result:

```
@dlr,-3 .
```
