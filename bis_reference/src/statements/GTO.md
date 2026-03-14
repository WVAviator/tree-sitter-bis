# @GTO — Go To

## Overview

Branches unconditionally to another location in the run, or to another run control report in the same cabinet and drawer.

---

## Syntax

```
@GTO {lab | END[,n,n,n] | LIN[+]n | LIN-n | RPX r} .
```

### Parameters

| Field | Description |
|-------|-------------|
| `lab` | Label at which to continue execution. Specify the label number or a variable containing the label number. |
| `END` | Terminate the run and display the output area. |
| `END,n,n,n` | Same as `END`, but passes up to three integer status codes back to the calling run (valid only in runs started with [`@LNK`](LNK.md)). The original run can access the codes via `STAT1$`, `STAT2$`, and `STAT3$`. |
| `LIN[+]n` | Jump forward `n` lines from the current line. Specify `n` as an integer or a variable containing an integer. When using a variable, do not include a `+` prefix — if the variable contains a negative number, execution jumps backward by that many lines. When continued lines are present (reverse slant `\` at end of a line), the last line of the continuation sequence is treated as the current line. |
| `LIN-n` | Jump backward `n` lines from the current line. Specify `n` as an integer or a variable containing the negative integer — do not include a `-` prefix when using a variable. Continuation line behavior is the same as `LIN[+]n`. *(Windows / Linux / UNIX)* Plus and minus signs are allowed when named variables are used. |
| `RPX r` | Jump to run control report `r` in the same cabinet and drawer as the current run. The target report need not be registered, but inform your administrator that it is being used as part of a registered run. |

---

## Guidelines

- When using `RPX` to jump to another run control report, all security checks for the first run must be satisfied by the target report. All variables and labels remain valid after the jump.
- Avoid jumping to line numbers — it is poor practice since any modification to the run requires updating all line references. Use labels instead, and use the Build Label Table command to maintain a label/line-number table.
- For computed branching, see [`@IF`](IF.md) (If Conditional).

---

## Examples

Jump to the label contained in `<start>`:

```
@gto <start> .
```

Jump to label `010`:

```
@gto 010 .
```

Continue execution at report `2` in the same cabinet and drawer:

```
@gto rpx 2 .
```
