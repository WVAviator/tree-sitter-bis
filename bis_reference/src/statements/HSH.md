# @HSH — Hash

## Overview

Assigns a numeric hash value within a specified range to a given piece of input. The same input always produces the same hash value as long as the range remains unchanged.

---

## Syntax

```
@HSH v=vld,min-max .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `v` | Required | Variable to receive the hash number. |
| `vld` | Required | Data to hash. Specify using a variable, constant, reserved word, literal, or any combination. |
| `min-max` | Required | Range within which the hash number is assigned. `min` is the lowest value and `max` is the highest. Valid range: `0`–`1,000,000`. |

---

## Guidelines

- For the most even distribution of hashed numbers, keep the `vld` field to seven characters or fewer.
- The system uses the current value of variables and reserved words at hash time. If the size or value of `vld` changes (day-to-day or system-to-system), the hashed result may also change.
- Hash values are useful as numeric identifiers for indexing data. Compared to alphabetic or numeric indexing schemes, hash values provide more even distribution across index identifiers — for example, avoiding the imbalance of many records under common letters like `R` or `S` and few under `Q` or `Z`.
- The system determines and maintains hash values, so you do not need to know or remember them.

---

## Examples

Index each user to a report number between `1` and `100`:

```
@HSH <usrpt>i3=USER$,1-100 .
```

Generate a random number between `1` and `999,999`:

```
@HSH <random>i6=MSEC$(6-0),1-999999 .
```
