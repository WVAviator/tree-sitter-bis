# PNT (Paint) and @PNT (Refresh Screen)

## Overview

**PNT** (manual function) redsiplays the screen as it was displayed after the last transmit. For example, if you made changes to a report but have not yet transmitted, executing Paint restores the report to its original state.

*(Windows / Linux / UNIX)* **@PNT** (statement) restores the screen attributes.

---

## Outcome

The Paint manual function restores the report and places the cursor in the Roll field on the control line. The `@PNT` statement restores the screen attributes.

---

## Syntax

**Manual function (all platforms):**
```
PNT
```
Or press **Paint**.

**Statement *(Windows / Linux / UNIX)*:**
```
@PNT .
```

---

## Example

Refresh the screen after displaying report `2B0`:

```
@dsp,0,b,2,,,,y .
@pnt .
```
