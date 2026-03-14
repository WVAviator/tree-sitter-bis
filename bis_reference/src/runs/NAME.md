# NAME

Creates a data name for a cabinet, drawer, or report. Data names can be used in place of cabinet numbers, drawer letters, and report numbers to make it easier to identify data. Existing names can also be changed or deleted — but only by the user who originally created them.

The data name can also define a **Namelist**, which lets a data set span drawers, cabinets, or discontinuous lists of reports.

---

## Syntax

**Windows / Linux / UNIX:**
```
NAME [nm,c,d,r,dept,user-id,act,desc]
```

**2200:**
```
NAME [nm,c,d,r,dept,user-id,func,upd?,namelist?]
```

### Parameters

| Field | Platform | Required | Description |
|-------|----------|----------|-------------|
| `nm` | All | Optional | Name to assign — up to 16 characters, beginning with a letter (A–Z). Single-character names A–I are reserved for drawers and cannot be used. *(Windows / Linux / UNIX)* Cannot contain `^`, `;`, `/`, `,`, or spaces. *(2200)* Only alphanumeric characters (A–Z, 0–9) are stored; all others are ignored. |
| `c` | All | Optional | Cabinet number to name. |
| `d` | All | Optional | Drawer letter to name. Leave blank when naming a cabinet. |
| `r` | All | Optional | Report number or range to name. Specify a range as `first-last` (e.g. `8-33` for reports 8 through 33). Leave blank when naming a cabinet or drawer. |
| `dept` | All | Optional | Department number that can use the name, or `all` for all departments. Default: your department. |
| `user-id` | All | Optional | User ID that can use the name, or `all` for all users. Default: your user ID. |
| `act` | Windows / Linux / UNIX | Optional | Action to perform: `C` = change a name; `D` = display directory information about an existing name; `I` = insert a new name; `Q` = quit and return to the active screen; `R` = remove a name (leave `c`, `d`, and `r` blank). |
| `desc` | Windows / Linux / UNIX | Optional | Brief description of the named cabinet, drawer, or report. Maximum: 25 characters. |
| `func` | 2200 only | Optional | Action to perform. Default: `ADD`. `ADD` = add a new name; `CHG` = change a name (cabinet, drawer, or report definition only); `DEL` = delete a name (leave `c`, `d`, and `r` blank). |
| `upd?` | 2200 only | Optional | Update names in the system directory? `Y` or `N`. Default: `Y`. When naming several reports, enter `N` for all but the last to improve efficiency — enter `Y` for the final report to commit all previously named reports at once. |
| `namelist?` | 2200 only | Optional | Create a Namelist? `Y` or `N`. Default: `N`. If `Y`, `c,d,r` is treated as the Namelist Definition Report and a screen is displayed to enter the body of the Namelist. |

---

## Examples

Assign the name `corpstat` to report `2B0` for your user ID and department:

```
name corpstat,0,b,2
```

Report `2B0` can now be accessed as `corpstat`, `2B0`, or `2B` (if signed on in cabinet 0).

Assign the name `newuser` to cabinet `0` for all departments and all users:

```
name newuser,0,,,all,all
```
