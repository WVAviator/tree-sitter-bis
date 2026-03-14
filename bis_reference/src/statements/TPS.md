# @TPS — Server Interface

> **Windows / Linux / UNIX only**

## Overview

Develops Open Distributed Transaction Processing (ODTP) servers using the Application Transaction Message Interface (ATMI) for client/server application development. The software handles all buffer management and parameter handling required for the ODTP environment.

In general, a server provides a service, but can also use the [`@TPC`](TPC.md) statement to call other services. In this context, *server* refers to the operations provided by the TPS statement, not to operations where a server acts as a client.

> **Requirements:**
> - The server must be configured in the ODTP Transaction Manager.
> - This statement is usable only in the MAPPER server (`TPMAPPER`).

For more information on ODTP servers, see [Provided Servers](#provided-servers).

---

## Quick Reference

### Receiving and Returning Client Requests
```
@TPS,P,[,lab output_data] .
@TPS,R[,flags,lab,c,d,r] [result_status],[usercode],buffer_type[,size,input_data] .
@TPS,F[,flags,lab,c,d,r] service_name,buffer_type[,size,input_data] .
@TPS,M[,,lab] [output_data] .
```

### Dynamically Changing Service Names
```
@TPS,A[,,lab] 'service_name' .
@TPS,U[,,lab] 'service_name' .
```

### Participating in a Conversation with a Client
```
@TPS,T[,flags,lab,c,d,r] buffer_type[,size,input_data] .
@TPS,L[,flags,lab] [output_data] .
```

### Writing to the ODTP Central Event Log
```
@TPS,J[,,lab] 'text message' .
```

### Sending Unsolicited Messages to Clients
```
@TPS,X[,flags,lab,c,d,r] [machine_id],[client_id],[user_id],buffer_type[,size,input_data] .
@TPS,N[,flags,lab,c,d,r] buffer_type[,size,input_data] .
```

---

## Common Statement Fields

| Field | Description |
|-------|-------------|
| `flags` | Flag values to send to ODTP. See [Flag Values](#flag-values). |
| `lab` | Label to go to if an error occurs. See [Reserved Words](#reserved-words). |
| `c,d,r` | A report from which to read input data. |
| `service_name` | Name of the service to which the request is being forwarded. Case-sensitive. |
| `buffer_type` | Buffer type to return to the requester. Must be uppercase. Values: `STRING`, `CARRAY` (or `X_OCTET`), `FML`, `NULL`, `MAPPER_REPORT`. |
| `size` | Buffer size required for `STRING`, `CARRAY`, `X_OCTET`, or `MAPPER_REPORT` input (not required for `FML` or `NULL`). If blank and a report (`c,d,r`) is specified, the software calculates the required buffer size; otherwise default = 500 bytes. |
| `input_data` | Result data from the service, returned to the client. |
| `output_data` | Data sent by the requester of this service. |

---

## Options

### `P` — Suspend Until Activated

Suspends the service until activated by the Bulletin Board. Marks the end of the server run's initialization stage. Server execution begins on the line immediately following this request.

```
@TPS,P,[,lab output_data] .
```

### `R` — Return Result to Client

Returns the result of this service request to the client.

```
@TPS,R[,flags,lab,c,d,r] [result_status],[usercode],buffer_type[,size,input_data] .
```

| Field | Description |
|-------|-------------|
| `result_status` | Status of the result. Default = `S`. Values: `S` = Success, `F` = Fail. |
| `usercode` | User-defined code returned to the requester. Default = `0`. |

### `F` — Forward Request to Another Service

```
@TPS,F[,flags,lab,c,d,r]
service_name,buffer_type[,size,input_data] .
```

### `M` — Retrieve Values from Buffer

Retrieves values from any buffer type.

```
@TPS,M[,,lab] [output_data] .
```

### `A` — Advertise a Service

Advertises `service_name` (a quoted literal string or variable) as a service.

```
@TPS,A[,,lab] 'service_name' .
```

### `U` — Unadvertise a Service

Unadvertises `service_name` as a service. The service name can be a quoted literal string or a variable.

```
@TPS,U[,,lab] 'service_name' .
```

### `T` — Talk During a Conversation

Sends a message during a conversation with the client.

```
@TPS,T[,flags,lab,c,d,r]
buffer_type[,size,input_data] .
```

### `L` — Listen During a Conversation

Receives a message during a conversation with a client.

```
@TPS,L[,flags,lab] [output_data] .
```

### `J` — Write to the Event Log

Writes a message to the ODTP central event log. `'text message'` is a quoted literal string or variable.

```
@TPS,J[,,lab] 'text message' .
```

### `X` — Broadcast an Unsolicited Message

Broadcasts to all registered clients matching all non-wildcard identifiers specified for `machine_id`, `client_id`, and `user_id`.

```
@TPS,X[,flags,lab,c,d,r] [machine_id],[client_id],[user_id],
buffer_type[,size,input_data] .
```

| Field | Description |
|-------|-------------|
| `machine_id` | Logical machine identifier. Default = wildcard (matches all). |
| `client_id` | Client name. Default = wildcard (matches all). |
| `user_id` | User name. Default = wildcard (matches all). |

### `N` — Send an Unsolicited Message to the Client

```
@TPS,N[,flags,lab,c,d,r]
buffer_type[,size,input_data] .
```

---

## Reserved Words

| Reserved Word | Option | Description |
|---------------|--------|-------------|
| `STAT1$` | Any | Contains the last status from ODTP. Valid for all TPS options. If nonzero and a label is specified, the run continues at the label. |
| `STAT2$` | `T` or `L` | Contains the return event status from ODTP. See [Event Status Names](#event-status-names). |
| `STAT2$` | `P` | If `-1`, the service was called in RPC mode. Otherwise, called in conversation mode: `0` = listen mode, `1` = talk mode. |
| `STAT3$` | Any | If FML buffers are in use, contains the FML error code. |

---

## Flag Values

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

---

## Event Status Names

Applicable with the `L` and `T` options (`STAT2$`).

| Value | Event Status Name | Description |
|-------|-------------------|-------------|
| 1 | `SEND` | Conversation mode has been switched; the service may now talk (`L` option only). Not applicable for the `T` option. |
| 2 | `DISCONNECT` | Orderly disconnect of the conversation by the client. The service must use `TPS,R S,,NULL` to exit the conversation. |
| 3 | `DISCONNECT IMMEDIATELY` | Disorderly disconnect of the conversation. No further communication possible. |
| 4 | `SVCERR` | Not applicable. |
| 5 | `SVCFAIL` | Not applicable. |
| 6 | `SVCSUCC` | Not applicable. |

---

## Guidelines

For guidelines on data formatting, input data, and output data, see [`@TPC` — Client Interface Guidelines](TPC.md#guidelines).

---

## Provided Servers

> **Note:** See the related Software Release Announcement for information on supported levels.

The ODTP server provides services enabling a client to access Informix or Oracle databases. All provided services:

- Are called using the `W` or `N` options of the [`@TPC`](TPC.md) statement.
- Expect an FML buffer as input. `Route =` is used to route data to the correct server; `Info =` provides data needed by the service.
- Return database error status in `STAT2$`.

### Available Services

| Service | Description |
|---------|-------------|
| `MPR_COL` | Retrieve the description of a table. |
| `MPR_TBL` | Retrieve a list of named reports in the system. |
| `MPR_SQL` | Send SQL statements to the database. |

### MPR_COL — Retrieve Table Description

Returns a description of the specified table in the same format as the Data Definition Information (DDI) statement.

```
@tpc,w,,99 'MPR_COL','FML',,(route)=Informix,(info)='gwo.houses' .
```

| Field | Description |
|-------|-------------|
| `99` | Label to pass control to if an error occurs. |
| `MPR_COL` | Name of the service to call. |
| `FML` | Buffer type to send to the service. |
| `(route)` | FML field name used to direct the request to the correct service. Use when data-dependent routing is needed. |
| `(info)` | FML buffer (must be present for services to work). |
| `'gwo.houses'` | Name of the table to describe. Formats accepted: `owner_id.tablename` or `tablename`. |

### MPR_TBL — Retrieve List of Named Reports

Returns a list of tables that are public or have a matching `owner_id`.

```
@tpc,w,99 'MPR_TBL','FML',,(route)=Informix,(info)='gwo'
```

| Field | Description |
|-------|-------------|
| `99` | Label to pass control to if an error occurs. |
| `MPR_TBL` | Name of the service to call. |
| `FML` | Buffer type to send to the service. |
| `(route)` | FML field name used to direct the request to the correct service. |
| `(info)` | FML buffer (must be present for services to work). |
| `'gwo'` | `*` to select all tables in the database, or an `owner_id` to select tables with that owner or a `public` attribute. |

### MPR_SQL — Send SQL Statements to the Database

Sends SQL requests to the Informix database. If multiple SQL statements are sent on a single call, all are processed before any results are returned. If a fatal Informix error occurs, all processing stops and `STAT2$` contains the Informix error code. Multiple `SELECT` statements may also be sent on a single call.

If `output_data` is specified on the `@TPC` statement, results are returned in variables; otherwise they are placed in the output area. Each output line contains the selected columns from the corresponding row. If columns are wider than the output area line length, the data wraps. The string `END SELECT DATA` is written at the end of data returned for each `SELECT` statement.

```
@brk
@tpc,w,,99 'MPR_SQL','FML',,(route)='Informix',(info)='SQL statement' .
@brk
```

| Field | Description |
|-------|-------------|
| `99` | Label to pass control to if an error occurs. |
| `MPR_SQL` | Name of the service to call. |
| `FML` | Buffer type to send to the service. |
| `'SQL statement'` | SQL statement to send to the Informix database. |

> The first `@BRK` clears the output area. The `@TPC` `W` option with no `output_data` places results in the output area. The second `@BRK` closes the output area and makes it the current result (`-0`).

---

## MAPPER Server (MAPSVR)

The MAPPER Server provides services usable in the ODTP environment, accepting FML buffers with values in the FML `info` field.

| Service | Description |
|---------|-------------|
| `MPR_COL` | Provides a description of a report. |
| `MPR_TBL` | Provides a list of named reports available. |
| `MPR_SQL` | Provides an SQL interface into the software using the MQL statement. |
