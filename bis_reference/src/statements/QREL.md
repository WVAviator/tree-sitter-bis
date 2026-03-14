# @QREL (Release Message)

*(2200 only)*

## Overview

Indicates that Data Transfer Module (DTM) processing is complete. The `@QREL` statement is never required, but may be useful if your run reaches a point where you would not want to reprocess the input in the case of a system failure.

---

## Syntax

```
@QREL .
```

---

## Guidelines

- Use `@QREL` only if the report was sent with a [`@QSND`](QSND.md) (Send Message, No Response) statement from another run, or a `CALL 'QSND'` from a batch COBOL program or COBOL TIP transaction.
- Do **not** use `@QREL` if the report was sent with a [`@QSNR`](QSNR.md) (Send Message, Response Expected) statement.
- To determine how the report was sent, examine the message type. For more information, see Functions for Loading Variables in [`@QCTL`](QCTL.md).
