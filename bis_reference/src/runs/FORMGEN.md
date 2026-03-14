# FORMGEN

> *(Windows / Linux / UNIX only)*

## Overview

Creates experimental reports via an interactive input screen where you define or redefine the placement, size, format inclusion, edit codes, field heading names, and total line length for each field.

---

## Control Line Format

```
FORMGEN
```

---

## Outcome

- Displays an input screen for defining or redefining report field properties.
- When the result is displayed, you can continue to update it. The command either saves the result as a report in cabinet `0`, drawer `I`, or uses it to generate a modified input screen.
- Fields in the result are sorted by field number.

---

## Guidelines

- To divide a field title across two lines, mark the division point with an underscore (`_`).
- To rearrange the order of fields, renumber them in the **FN** column of the input screen.
- Use the **Roll** function key to toggle between the two input screens. Each screen allows you to define up to 15 fields.
- At any time during design, press **DspRpt** to preview the report being built. From there, you can return to FORMGEN for further processing or save the report permanently.
