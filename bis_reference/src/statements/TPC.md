# @TPC — Client Interface

> **Windows / Linux / UNIX only**

## Overview

Develops Open Distributed Transaction Processing (ODTP) clients using the Application Transaction Message Interface (ATMI) for client/server application development. The software handles all buffer management and parameter handling required for the ODTP environment.

In general, a client calls on services but does not provide services to other clients. A service can also use many TPC options to call other services. In this context, *client* refers to an actual client or a service acting as a client by calling another service.

> **Requirement:** The Open Distributed Transaction Processing Transaction Manager must be running.

For more information on ODTP servers, see *Provided Servers*.

---

## Quick Reference

### Joining an ODTP Application
```
@TPC,I[,flags,lab]
config[,size,user,client,password,reserved,extra data] .
```

### Managing an ODTP or Global Transaction
```
@TPC,B[,,lab,timeout] .
@TPC,C[,,lab] .
@TPC,A[,,lab] .
```

### Calling Services
```
@TPC,W[,flags,lab,,c,d,r] service_name,buffer_type[,size,input_data output_data] .
@TPC,N[,flags,lab,,c,d,r] service_name,buffer_type[,size,input_data] .
@TPC,R,[flags],[lab],service_id [output_data] .
@TPC,M[,,lab] [output_data] .
```

### Carrying on a Conversation with a Service
```
@TPC,U[,flags,lab,,c,d,r] service_name,buffer_type[,size,input_data] .
@TPC,T,[flags],[lab],conversation_id[,c,d,r] buffer_type[,size,input_data] .
@TPC,L,[flags],[lab],conversation_id [output_data] .
@TPC,D,,[lab],conversation_id .
```

### Sending and Receiving Unsolicited Messages
```
@TPC,X[,flags,lab,,c,d,r] [machine_id],[client_id],[user_id],buffer_type[,size,input_data] .
@TPC,Q [buffer_type] [type_found] .
```

### Writing to the ODTP Central Event Log
```
@TPC,J[,,lab] 'text message' .
```

---

## Common Statement Fields

These fields are common across all or most TPC options. Option-specific fields are described under each option.

| Field | Description |
|-------|-------------|
| `flags` | Flag values to send to ODTP. See [Flag Values](#flag-values). |
| `lab` | Label to go to if an error occurs. See [Reserved Words](#reserved-words). |
| `conversation_id` | Identifier assigned to the conversation by a previous `U` option request. |
| `c,d,r` | A report from which to read input data. |
| `service_name` | Name of the service being called. Case-sensitive. |
| `service_id` | Service ID number returned in `STAT2$` by a previous `N` option request. |
| `buffer_type` | Buffer type to send to the service. Must be uppercase. Values: `STRING`, `CARRAY` (or `X_OCTET`), `FML`, `NULL`, `MAPPER_REPORT`. Note: `X_OCTET` is the only buffer type supported in the X/Open environment and is mandatory for interoperating with OS 2200 ODTP. |
| `size` | Number of bytes needed for extra data. For the `I` option, default = 500. For other options, required for `STRING`, `CARRAY`/`X_OCTET`, or `MAPPER_REPORT` input (not required for `FML` or `NULL`). If blank and a report (`c,d,r`) is specified, the statement calculates the buffer size; otherwise default = 500 bytes. |
| `input_data` | Data sent as input to the service. |
| `output_data` | Data received as output from the service. |

---

## Options

### `I` — Join an ODTP Application

Joins the run to the ODTP application specified by `TUXCONFIG`. Required only if security is used or if the `TUXCONFIG` environment variable needs to be set. If already attached to an ODTP application, the `I` option leaves the current application before joining the new one. When a run exits, it also leaves the System/T application.

```
@TPC,I[,flags,lab]
config[,size,user,client,password,reserved,extra data] .
```

| Field | Description |
|-------|-------------|
| `config` | To set a new `TUXCONFIG` environment variable, enter a value. To use the current setting, enter `''`. A BIS workstation client can also set a new `WSENVFILE` environment variable by entering a value here. |
| `size` | Number of bytes needed for extra data. Default = 500. |
| `user` | ODTP user name. |
| `client` | ODTP client name. |
| `password` | ODTP password for level two security. |
| `reserved` | Reserved for future use (group name). |
| `extra data` | Extra data added to the `TPINIT` buffer for level three security. Enter in the same manner as CARRAY `input_data`. |

### `B` — Begin a Global Transaction

Needed only when accessing XA-compliant databases.

```
@TPC,B[,,lab,timeout] .
```

`timeout` — time limit for the transaction. If not completed in time, the transaction aborts. Default = system default configured by the ODTP application.

### `C` — Commit a Transaction

Valid only after using the `B` option.

```
@TPC,C[,,lab] .
```

### `A` — Abort a Transaction

Valid only after using the `B` option.

```
@TPC,A[,,lab] .
```

### `W` — Call a Service and Wait for Reply

```
@TPC,W[,flags,lab,,c,d,r]
service_name,buffer_type[,size,input_data output_data] .
```

### `N` — Call a Service and Continue

Retrieves the response using the `R` option. Can also be used for services that do not return a response. `STAT2$` contains the service ID handling the request.

```
@TPC,N[,flags,lab,,c,d,r]
service_name,buffer_type[,size,input_data] .
```

### `R` — Retrieve a Reply

Retrieves the reply from a previous `N` option request.

```
@TPC,R,[flags],[lab],service_id [output_data] .
```

### `M` — Retrieve Remaining Values

Retrieves values from a previous `W`, `R`, `L`, or `Q` call that were not retrieved in the original statement and have not already been retrieved by a previous `M` call.

```
@TPC,M[,,lab] [output_data] .
```

### `U` — Begin a Conversation

Begins a conversation with the specified server and optionally sends the initial message. `STAT2$` contains the `conversation_id` assigned to this conversation.

```
@TPC,U[,flags,lab,,c,d,r]
service_name,buffer_type[,size,input_data] .
```

### `T` — Send a Conversational Message

Sends a message to the conversational service identified by `conversation_id` (returned in `STAT2$` by a previous `U` request).

```
@TPC,T,[flags],[lab],conversation_id[,c,d,r]
buffer_type[,size,input_data] .
```

### `L` — Receive a Conversational Message

```
@TPC,L,[flags],[lab],conversation_id [output_data] .
```

### `D` — Stop a Conversation

```
@TPC,D,,[lab],conversation_id .
```

### `X` — Broadcast an Unsolicited Message

Broadcasts to all registered clients matching all non-wildcard identifiers specified for `machine_id`, `client_id`, and `user_id`.

```
@TPC,X[,flags,lab,,c,d,r] [machine_id],[client_id],[user_id],
buffer_type[,size,input_data] .
```

| Field | Description |
|-------|-------------|
| `machine_id` | Logical machine identifier. Default = wildcard (matches all). |
| `client_id` | Client name. Default = wildcard (matches all). |
| `user_id` | User name. Default = wildcard (matches all). |

### `Q` — Retrieve an Unsolicited Message

Retrieves the first unsolicited message of `buffer_type` into the current buffer. Use the `M` option to retrieve data from the buffer. Use `Q` again to retrieve the next unsolicited message.

```
@TPC,Q [buffer_type] [type_found] .
```

| Field | Description |
|-------|-------------|
| `buffer_type` | Buffer type (`STRING`, `CARRAY`, `X_OCTET`, `FML`) of the message desired. To accept any buffer type, enter `''`. |
| `type_found` | Buffer type of the retrieved message. |

### `J` — Write to the Event Log

Writes a message to the ODTP central event log.

```
@TPC,J[,,lab] 'text message' .
```

`'text message'` is a quoted literal string or variable.

---

## Reserved Words

| Reserved Word | Option | Description |
|---------------|--------|-------------|
| `STAT1$` | Any | Contains the last status from ODTP. If nonzero and an error label is defined, run control transfers to the error label. |
| `STAT2$` | `W` or `R` | Contains the usercode returned by the service. |
| `STAT2$` | `N` | Contains the `server_id` of the server processing the request. |
| `STAT2$` | `U` | Contains the `conversation_id` assigned to this conversation. |
| `STAT3$` | `T` or `L` | Contains the event status returned by ODTP. See [Event Status Names](#event-status-names). |
| `STAT3$` | `Q` | Contains the number of unsolicited messages including the current message. If FML buffers are in use, contains the FML error code. |

---

## Flag Values

### General Flags

| Flag | TM Equivalent | Description |
|------|---------------|-------------|
| `B` | `TPNOBLOCK` | If data cannot be sent or received, do not wait. |
| `C` | `TPNOCHANGE` | Service must return the same type of buffer it receives. |
| `G` | `TPGETANY` | Get any waiting reply. Not available on the Transactional Desktop for MS-DOS. |
| `I` | `TPNOTIME` | Wait forever; ignore blocking time-outs. |
| `R` | `TPNOREPLY` | Service will not send a reply back. |
| `S` | `TPSIGRSTRT` | If a service call is interrupted by a signal, reissue the call. |
| `T` | `TPNOTRAN` | Service being called will not be part of this transaction. |
| `X` | `TPRECVONLY` | Switch conversation mode — the listener becomes the speaker and the speaker becomes the listener. |

### Unsolicited Message Flags (`I` option only — specify one of D, N, Y)

| Flag | TM Equivalent | Description |
|------|---------------|-------------|
| `D` | `TPU_DIP` | Use the DIP IN method for unsolicited messages. |
| `N` | `TPU_IGN` | Ignore unsolicited messages. |
| `Y` | `TPU_SIG` | Use the SIGNAL method for unsolicited messages. |

### System Access Flags (`I` option only — specify one of F, P)

| Flag | TM Equivalent | Description |
|------|---------------|-------------|
| `F` | `TPSA_FASTPATH` | Set system access to fastpath. Allows application code outside of ODTP libraries access to ODTP shared memory. |
| `P` | `TPSA_PROTECTED` | Set system access to protected. Protects ODTP shared memory from access by application code outside of System/T libraries. |

---

## Event Status Names

Applicable with the `L` and `T` options (`STAT3$`).

| Value | Event Status Name | Description |
|-------|-------------------|-------------|
| 1 | `SEND` | Conversation mode has been switched; the client may now talk (`L` option only). Not applicable for the `T` option. |
| 2 | `DISCONNECT` | Not applicable. |
| 3 | `DISCONNECT IMMEDIATELY` | Disorderly disconnect of the conversation. No further communication possible. |
| 4 | `SVCERR` | Service error. |
| 5 | `SVCFAIL` | Service returned with FAIL status. |
| 6 | `SVCSUCC` | Service terminated successfully. |

---

## Guidelines

### Buffer Types

| Type | Description |
|------|-------------|
| `STRING` | Single null-terminated string. If input is from a report, all text following the heading divider line is passed as a single string (terminated by end of report or a semicolon as the last nonspace character on a line). |
| `CARRAY` / `X_OCTET` | Series of NULL-terminated strings. Report input is treated as a single string following the heading divider line. All strings are placed in the buffer as NULL-terminated strings. |
| `FML` | Flexible format supporting a variety of data types and multiple field occurrences within the buffer. |
| `NULL` | Format for sending no buffer. |
| `MAPPER_REPORT` | CARRAY buffer where each line of the input report (beginning at line 2) is treated as a NULL-terminated string. All lines are sent. |

`X_OCTET` is the only buffer type supported in the X/Open environment and is mandatory for interoperating with OS 2200 ODTP.

### Input Data from Variables

| Type | Description |
|------|-------------|
| `STRING` | Expects one text string, placed in the buffer as a NULL-terminated string. |
| `CARRAY` / `X_OCTET` / `MAPPER_REPORT` | Each comma-separated value is placed into the buffer as a NULL-terminated string, one after another. |
| `FML` | Express values as `[(fml_field)=]value,...`. Default = type 5 (NULL-terminated string) with field numbers generated automatically starting at 1. For multiple occurrences of the same field: `(RTK)=v1,v2,v3,(GWO)=v4,v5` places three occurrences of RTK and two of GWO into the FML buffer. |

### Input Data from a Report

If buffer size is not specified, it is calculated as: `(characters-per-line + 1) * number-of-lines-in-report`. The statement first accepts input from the command line, then from the input report.

| Type | Description |
|------|-------------|
| `STRING` | Transfers report text following the heading divider line into the buffer as a single string (terminated by end of report or a semicolon as the last nonspace character). |
| `CARRAY` / `X_OCTET` | Transfers report text following the heading divider line as a series of NULL-terminated strings. Only one trailing space is placed in the buffer on lines not terminated with a semicolon. |
| `MAPPER_REPORT` | Transfers report content as NULL-terminated strings beginning with the line following the date line, to end of report. Each line is treated as a string. |
| `FML` | FML fields specified on the command line without a value are placed in a list. Report values for FML fields must be delimited by beginning and ending tab codes. Lines are read until a value is found for each FML field. Nonblank values are placed in the FML buffer as occurrences of that field. To pack trailing spaces, type `\` as the last nonspace character on a line. The process repeats from the next line until all lines are read. |

### Output Data in Variables

| Type | Description |
|------|-------------|
| `STRING` | Returns a single text string. Truncated if larger than the variable. |
| `CARRAY` / `X_OCTET` | Returns multiple text strings (one per variable) until the buffer is empty or the variable list is exhausted. Truncated if a string exceeds the receiving variable. |
| `FML` | Returns values from the FML buffer starting with the first occurrence of the lowest `field_id`, continuing through the last occurrence of the highest. If no FML format specification is used on the first field, values are returned in order; a subsequent FML format specification on a later field causes the run to fail. For multiple occurrences: `v1=(RTK),v2,v3,v4=(GWO),v5` places three occurrences of RTK into v1–v3 and two of GWO into v4–v5. |

### Output Data in the Output Area

If no variables are specified, the statement places values in the output area.

| Type | Description |
|------|-------------|
| `STRING` | Places one text string in the output area. Wraps to next line if it exceeds the drawer line length. |
| `CARRAY` / `X_OCTET` | Places each character string as a new line. Wraps if it exceeds drawer line length. |
| `FML` | An output line must follow the TPC statement or the run will fail. Use `(sz)` or `(*sz)` as placeholders, where `sz` defines field size. If `sz = 0`, uses the size defined in the FML buffer. If `sz` is smaller than the FML field, the value is left-justified and truncated; if larger, left-justified and space-filled. The `*` repeat flag causes the last occurrence of that field to repeat on every line until all occurrences of other fields are retrieved. Without a repeat flag, all output area lines after the first are changed to asterisk type (`*`). |

---

## FML Fields

Use one of the following methods to specify an FML field:

**By field name** (must be defined in a `fieldtbl` file listed in `TUXCONFIG`; must begin with an alphabetic character):
```
(RTK)=value
```

**By combined field type and field number:**
```
(40961)=value
```

**By explicit type and number:**
```
(5,1)=value
```

Field type values: `0` = Short, `1` = Long, `2` = Character, `3` = Single precision float, `4` = Double precision float, `5` = NULL-terminated string.

---

## Examples

### FML Output — Fixed Repeat

Places all occurrences of RTK in the first field (column 2, 5 characters), a constant `xyz` at column 8, and all occurrences of GWO in the second field (column 12, 6 characters). The first output line is space type; remaining lines are asterisk type (`*`). Space-fills fields where no occurrence exists.

```
@tpc,w service_id,buffer_type,size,value1 (RTK),(GWO) .
(5) xyz (6)
```

### FML Output — Repeat Flag

Produces the same result as above, except the last occurrence of RTK is repeated on every line until the last occurrence of GWO is retrieved. All output lines are space type.

```
@tpc,w service_id,buffer_type,size,value1 (RTK),(GWO) .
(*5) xyz (6)
```
