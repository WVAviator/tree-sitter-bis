# @NET — Network Sign-On

## Overview

Signs on to a remote site.

---

## Syntax

**Windows / Linux / UNIX:**
```
@NET,net-id[,site-id,rmu,rmd,rmpw['/'newrmpw],trnrpt,,lab,con?,slrq] [nertxt,nercod] .
```

**2200:**
```
@NET,net-id[,site-id,[domain\]rmu,rmd,rmpw['/'newrmpw],trnrpt,mtr?,lab,con?,slrq] [nertxt,nercod] .
```

### Parameters

| Field | Platform | Required | Description |
|-------|----------|----------|-------------|
| `net-id` | All | Required | Network identifier of the remote site. Corresponds to the Network Name field in the Network Configuration Report. |
| `site-id` | All | Optional | Site letter of the remote site. Default: first site configured for the specified network identifier. Corresponds to the `sl` field in the Network Configuration Report. Press Remote from the active screen for a list of sites. |
| `domain` | 2200 only | Optional | Optional domain name used to qualify the user ID. |
| `rmu` | All | Optional | User ID registered on the remote site. Default: user ID of the user executing the run. |
| `rmd` | All | Optional | User department number for the remote sign-on. Default: department number of the user executing the run. *(2200)* If `rmd` is specified without `rmu` or `rmpw`, BIS attempts to read the user registration report for the specified department. If the executing user does not exist in that department, `rmu` = executing user, `rmd` = specified value, `rmpw` = null. If the remote user ID has a password, the NET statement will error due to a password mismatch. |
| `rmpw/newrmpw` | All | Optional | Password for the remote sign-on. Default: password of the user executing the run. If Network Sign-On Encryption is enabled, a new password may be specified in `newrmpw`. If encryption is not enabled, `newrmpw` cannot be used. *(Windows / Linux / UNIX)* The password sent matches the password of the user executing the NET statement. |
| `trnrpt` | All | Optional | Report containing a translation table for translating characters between local and remote sites. Must be in drawer `F` of the user's language cabinet. Default: no translation. Used by [`@NRD`](NRD.md), [`@NWR`](NWR.md), [`@NRN`](NRN.md), and reports returned through [`@NRT`](NRT.md). |
| `mtr?` | 2200 only | Optional | Monitor the transferred data on a terminal screen? `Y` or `N`. Default: `N`. |
| `lab` | All | Optional | Label to branch to if the connection cannot be established. |
| `con?` | All | Optional | Keep the network connection open after [`@NRT`](NRT.md) (Network Return) terminates the [`@NRM`](NRM.md) (Network Remote) session? `Y` or `N`. Default: `N`. This feature must also exist on the remote site — if it does not, this field is ignored. After the NRM session ends, test `NETOUT$` to determine if the session remained open. |
| `slrq` | All | Optional | Security level requested for this connection. If not specified, the system-defined security level is used. If specified, must be at least as strict as the system-defined level, or the system-defined level is used instead. See [Security Level Values](#security-level-values). |
| `nertxt` | All | Optional | Error text provided by the remote site if the connection cannot be established. Columns 1–80 contain the error message; columns 82–87 contain the 6-digit error message ID. Only returned for Network Sign-On Encryption attempts. |
| `nercod` | All | Optional | 2-digit network error code set when the connection cannot be established. See [Network Error Codes](#network-error-codes). |

---

## Security Level Values (`slrq`)

| Value | Description |
|-------|-------------|
| `NN` | Logon and data encryption are not requested. |
| `LN` | Logon encryption is requested. |
| `LY` | Logon encryption is required. |
| `DN` | Logon and data encryption are requested. |
| `DY` | Logon and data encryption are required. |

---

## Network Error Codes (`nercod`)

| Code | Description |
|------|-------------|
| `1` | Site does not exist. |
| `2` | Site is down. |
| `3` | Encryption error. |
| `4` | Invalid user ID, department, or password. |
| `5` | Password change required. |
| `6` | Invalid characters or pattern in new password. |
| `7` | User ID has been disabled. |
| `8` | Internal error or validation server is down. |
| `9` | INTER-RUN not registered for this user ID. |
| `10` | Maximum sessions already active. |
| `11` | Invalid command code. |
| `12` | Password may not be changed. |
| `13` | Terminal configuration error. |
| `14` | User configuration error. |
| `15` | Could not negotiate common protocol. |
| `16` | Network configuration error. |

---

## Reserved Words

*(2200 only)* If a label is specified and an error occurs, `STAT1$` contains one of the following status codes:

| Code | Description |
|------|-------------|
| `0` | Successful NET. |
| `1` | Remote site does not recognize the user ID, department number, or password; or the user is not registered for Inter-Run (or the WS run if using a workstation). |
| `2` | Cannot find the specified network ID in the Network Configuration Report. |
| `3` | Cannot access the Network Configuration Report. |
| `4` | Remote site does not respond. |
| `5` | Remote site responded with unexpected data. |
| `6` | Network Translation Report is not correct. |
| `7` | Remote site does not support remote message queuing. |
| `8` | Could not negotiate a common protocol. |
| `9` | Network Configuration Report is in error. |

---

## Guidelines

- The run user must be registered to execute the INTER-RUN run on the remote system.
- If the server is Business Information Server for ClearPath OS 2200, the run user must be registered to execute the INTER-RUN run. Contact the administrator to verify all access requirements.
- You must specify either the network identifier or the site identifier. If no site identifier is given, the software defaults to the first site configured for the specified network identifier.
- If only the site identifier is specified, the software reads the Network Configuration Report for the correct network identifier. Contact your administrator for the network and site identifiers configured on your system.

---

## Example

Sign on to remote host `SYS15`, MAPPER site `K`:

```
@net,SYS15,k,newuser,7,newuserpassword .
```
