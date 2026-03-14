# @RELRNM (Release Rename)

*(2200 only)*

## Overview

Disassociates a report from a rename value.

A rename can be released even if there is no current report associated with it. Rename values may also be specified multiple times in the same list.

The entire `rename_list` is parsed before any renames are released. If there is a syntax error in the list, no renames are released.

---

## Syntax

```
@RELRNM rename_list .
```

`rename_list` is one or more rename values in the range of `-0` to `MAXRNM$`, separated by commas. Each rename value can optionally specify a quantity after a colon separator. If no quantity is specified, `1` is assumed.

> **Note:** If variables are used, specify one variable for the rename value and a separate variable for the quantity. A single variable cannot specify both subfields.

---

## Examples

Release a single rename:
```
@RELRNM -5
```

Release multiple renames, including one with a quantity:
```
@RELRNM -5,-2:3,-14
```
