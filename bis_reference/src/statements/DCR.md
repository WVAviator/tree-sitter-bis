# DECODE and @DCR — Decode Report

## Overview

Displays report data previously encoded with the Encode Report command. Available as both an interactive **control line function** (`DECODE`) and a **run statement** (`@DCR`).

> The same encryption key used to encode the report must be used to decode it. See [`ENCODE and @ECR`](ECR.md) for information on encoding reports.

---

## Syntax

**Control line (interactive):**
```
DECODE
```
*(2200 only)*
```
DECODE [key]
```

**Statement (in a run):**
```
@DCR,c,d,r,key .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `key` | Required | The 1–8 character key used to encode the report. See [`ENCODE and @ECR`](ECR.md) for key details. *(2200 interactive only: optional on the control line.)* |
| `c,d,r` | Required | Report to decode. See *Specifying Reports or Drawers to Process*. |

---

## Behavior

Executing the Decode Report command creates a result containing the restored report data, which can then be saved or updated.

### Error Conditions

**Windows / Linux / UNIX** — a message is displayed if:
- An incorrect key or encryption level was specified.
- The encoded report is corrupted.
- The report is not encoded.

**2200** — invalid characters are produced and a system message is displayed if:
- An incorrect key was specified.
- The encoded report is corrupted.
- The report is not encoded.

Each invalid character in the result is replaced with an SOE character. Characters shown as SOEs due to corruption cannot be recovered.

---

## Guidelines

- The `DECODE` manual function must be used via the control line format. The menu selection is available for online help only.
- **Do not forget your key.** A report cannot be decoded without it — the system keeps no record of encryption keys and administrators cannot retrieve them.
- Extensive use of this command may affect system performance due to high processing overhead.
- *(2200)* If using a normal ASCII terminal, you may not be able to decode a report that was encoded from a National Character Set (NCS) terminal.

---

## Example

Decodes report `10B0`, which was encoded using the key `jak`:

```
@dcr,0,b,10,jak .
```
