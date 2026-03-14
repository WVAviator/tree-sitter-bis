# @QINQ (Inquire on Object Attribute)

## Overview

Retrieves selector attributes from a queue manager or queue. Part of a group of statements for working with message queues:

- [`@QCLS`](QCLS.md) — Close Message Queue Object
- [`@QGET`](QGET.md) — Get Message from Message Queue
- [`@QOPN`](QOPN.md) — Open Message Queue Object
- [`@QPUT`](QPUT.md) — Put Message on Message Queue

> **Note:** You should be familiar with IBM WebSphere MQ and have a thorough understanding of message queues before using this statement.

---

## Syntax

**Format 1** — Inquire on a single selector within an object type:
```
@QINQ,"valid_selector"[,lab] vobjhandle,o vselectordata .
```

**Format 2** — Inquire on all selectors within an object type:
```
@QINQ,c,d[,lab] vobjhandle,o .
```

### Parameters

| Field | Format | Description |
|-------|--------|-------------|
| `valid_selector` | 1 | A valid selector (for a Queue Manager or Queue Name) enclosed in quotation marks. See the IBM WebSphere MQ Application Programming Reference, or execute a Format 2 inquiry to view all valid selectors. |
| `c,d` | 2 | Cabinet and drawer into which the data should be placed. The drawer width must be at least 289 characters to capture all possible selector values. |
| `lab` | Both | Label to go to if an error or warning is received (e.g., if the selector is not valid for the object type). See [Returned Status](#returned-status). |
| `vobjhandle` | Both | Variable containing an existing object handle. |
| `o` | Both | Option field. See [Options](#options). At least one option must be specified. |
| `vselectordata` | 1 | Variable to capture the selector attribute. Maximum size is 256 characters, though most values are much smaller and can be stored in small integer variables. |

---

## Options

| Option | Description |
|--------|-------------|
| `M` | Inquire on a Queue Manager. |
| `Q` | Inquire on a Queue. |

> **Note:** The option specified on `@QINQ` must match the option used on the corresponding [`@QOPN`](QOPN.md) statement.

---

## Outcome

If the inquiry is successful, selector attributes are returned in the `-0` result or the returning variable. All returned status reserved words are set to zero.

If an individual selector is not applicable to the type of the queue being inquired:
- Integer attributes are set to `-1`.
- Character attributes are set to all asterisks (`*`).
- *(Format 1)* The label exit is taken with `STAT1$=1`, `STAT2$=6`, and `STAT3$=2068`.
- *(Format 2)* The label exit is **not** taken and all status words remain `0`.

If an error occurs, the script continues at the specified label with `STAT1$`, `STAT2$`, and `STAT3$` set as described in [Returned Status](#returned-status). If no label is specified, the script errors.

---

## Returned Status

`STAT1$` — Completion code:

| Value | Description |
|-------|-------------|
| `0` | OK |
| `1` | Warning message |
| `2` | Command failed |

`STAT2$` — Status code:

| Value | Description |
|-------|-------------|
| `0` | No error |
| `6` | WebSphere MQ inquire error |
| `100` | The WebSphere MQ interface is down |
| `101` | Invalid object handle specified |
| `200` | URTS NPESTAT error *(2200 only)* |
| `201` | URTS TPENPE error *(2200 only)* |
| `202` | URTS NPESETUP error *(2200 only)* |

`STAT3$` — Reason code:

- For `STAT2$` values 1–99: see the WebSphere MQ Application Programming Reference for a complete list of reason codes.
- For `STAT2$` values 100–199: use the [`@LSM`](LSM.md) statement to retrieve the actual message.
- For `STAT2$` values 200–299: contact the Unisys Support Center.

---

## Guidelines

Always specify a label to assist in evaluating errors. If no label is specified and the operation fails, the script errors. Obtain `STAT1$`, `STAT2$`, and `STAT3$` values at the contingency label.

---

## Examples

Inquire on all attributes of a queue manager. Results are returned as a `-0` result:

```
@QOPN,0199 'my-qmgr',,I(M) <vObjHandle>i6 .
@QINQ,0,I,0199 <vObjHandle>,M .
@DSP,-0 .
```

Sample output:
```
.WebSphere MQ Inquire on Queue Manager Selectors
* Selector                      . Selector Attribute
*==============================.================================
MQCA_ALTERATION_DATE             2003-03-20
MQCA_ALTERATION_TIME             11.46.30
MQCA_CHANNEL_AUTO_DEF_EXIT
MQCA_CLUSTER_WORKLOAD_DATA
MQCA_CLUSTER_WORKLOAD_EXIT
MQCA_COMMAND_INPUT_Q_NAME        SYSTEM.ADMIN.COMMAND.QUEUE
MQCA_DEAD_LETTER_Q_NAME
MQCA_DEF_XMIT_Q_NAME
MQCA_Q_MGR_DESC
MQCA_Q_MGR_IDENTIFIER            my.qmgr_2003-03-20_11.46.30
MQCA_Q_MGR_NAME                  my.qmgr
MQCA_REPOSITORY_NAME
MQCA_REPOSITORY_NAMELIST
MQIA_AUTHORITY_EVENT             0
MQIA_CHANNEL_AUTO_DEF            0
MQIA_CHANNEL_AUTO_DEF_EVENT      0
MQIA_CLUSTER_WORKLOAD_LENGTH     100
MQIA_CODED_CHAR_SET_ID           819
MQIA_COMMAND_LEVEL               520
MQIA_DIST_LISTS                  1
MQIA_INHIBIT_EVENT               0
MQIA_LOCAL_EVENT                 0
MQIA_MAX_HANDLES                 256
MQIA_MAX_MSG_LENGTH              4194304
MQIA_MAX_PRIORITY                9
MQIA_MAX_UNCOMMITTED_MSGS        10000
MQIA_PERFORMANCE_EVENT           0
MQIA_PLATFORM                    3
MQIA_REMOTE_EVENT                0
MQIA_START_STOP_EVENT            1
MQIA_SYNCPOINT                   1
MQIA_TRIGGER_INTERVAL            999999999
```

Inquire on all attributes of a queue:

```
@QOPN,0199 '','MY.LOCAL.Q',I(Q) <vHanQ>i6 .
@QINQ,0,I,0199 <vHanQ>,Q .
@DSP,-0 .
```

Sample output:
```
.WebSphere MQ Inquire on Queue Selectors
* Selector                      . Selector Attribute
*==============================.================================
MQCA_ALTERATION_DATE             2003-03-20
MQCA_ALTERATION_TIME             11.47.15
MQCA_BACKOUT_REQ_Q_NAME
MQCA_BASE_Q_NAME                 *******************************
MQCA_CLUSTER_NAME
MQCA_CLUSTER_NAMELIST
MQCA_CREATION_DATE               2003-03-20
MQCA_CREATION_TIME               11.47.15
MQCA_INITIATION_Q_NAME
MQCA_PROCESS_NAME
MQCA_Q_DESC
MQCA_Q_NAME                      MY.LOCAL.Q
MQCA_REMOTE_Q_MGR_NAME           *******************************
MQCA_REMOTE_Q_NAME               *******************************
MQCA_TRIGGER_DATA
MQCA_XMIT_Q_NAME                 *******************************
MQIA_BACKOUT_THRESHOLD           0
MQIA_CURRENT_Q_DEPTH             4
MQIA_DEF_BIND                    0
MQIA_DEF_INPUT_OPEN_OPTION       2
MQIA_DEF_PERSISTENCE             0
MQIA_DEF_PRIORITY                0
MQIA_DEFINITION_TYPE             1
MQIA_DIST_LISTS                  0
MQIA_HARDEN_GET_BACKOUT          1
MQIA_INHIBIT_GET                 0
MQIA_INHIBIT_PUT                 0
MQIA_MAX_MSG_LENGTH              4194304
MQIA_MAX_Q_DEPTH                 5000
MQIA_MSG_DELIVERY_SEQUENCE       0
MQIA_OPEN_INPUT_COUNT            0
MQIA_OPEN_OUTPUT_COUNT           0
MQIA_Q_DEPTH_HIGH_EVENT          0
MQIA_Q_DEPTH_HIGH_LIMIT          80
MQIA_Q_DEPTH_LOW_EVENT           0
MQIA_Q_DEPTH_LOW_LIMIT           20
MQIA_Q_DEPTH_MAX_EVENT           1
MQIA_Q_SERVICE_INTERVAL          999999999
MQIA_Q_SERVICE_INTERVAL_EVENT    0
MQIA_Q_TYPE                      1
MQIA_RETENTION_INTERVAL          999999999
MQIA_SCOPE                       1
MQIA_SHAREABILITY                1
MQIA_TRIGGER_CONTROL             0
MQIA_TRIGGER_DEPTH               1
MQIA_TRIGGER_MSG_PRIORITY        0
MQIA_TRIGGER_TYPE                1
MQIA_USAGE                       0
```

Inquire on a specific selector to get the current queue depth:

```
@QOPN,0199 '','MY.LOCAL.Q',I(Q) <vObjHandle>i6 .
@QINQ,"MQIA_CURRENT_Q_DEPTH",0199 <vObjHandle>,Q \
    <vAttribute>i9 .
```

On success, `<vAttribute>` contains the current number of messages on the queue.
