# Managing Data

## Overview

This guide covers the following topics:
- [Locating Data](#locating-data)
- [Changing Data](#changing-data)
- [Sorting Data](#sorting-data)
- [Calculating Data](#calculating-data)

---

## Locating Data

1. Display the report in which you want to locate data.
2. On the control line, type `loc string`, where `string` is the data you want to find (e.g., `loc amco`).
3. Press **Transmit**.

The report is displayed at the first occurrence of the string. To find subsequent occurrences, press **Resume** (normally F1).

> **Note:** To locate a report identifier, enclose the string in quotation marks (e.g., `'2B0'`).

### Advanced Locate Commands

You can also use the **Search** (`S`), **Find** (`F`), or **Binary Find** (`BF`) commands to locate data in a specific column or across more than one report. Each command has unique features suited to different situations and database structures.

For complete information, see the Command Reference. When evaluating which command fits your needs, read the *Description* and *Outcome* sections, scan the *Options* and *Parameters* sections, and review the examples.

---

## Changing Data

1. Display the report in which you want to change data.
2. On the control line, type `chg ;/target/replacement/`, where `target` is the data to change and `replacement` is the new value. For example:
   ```
   chg ;/blackbox/mauvebox/
   ```
   > Before pressing **Transmit**, ensure the cursor is not resting on an unwanted character.
3. Press **Transmit**.

A result is displayed with all occurrences of the target string replaced. This result is **temporary** — if you display another report, release the screen, or sign off, it will no longer exist. See *Results* for more information.

### Other Ways to Change Data

- **Manual update** — Directly edit the report with your changes.
- **Arithmetic commands** — Perform calculations and place results into report fields, creating a saveable result.
- **Updating functions/options** — Create update results, modify them, and blend the changes back into the original report. See *Results* for more information.
- **Totalize + Search Update** — Use the `TOT` command to fill fields with data, in conjunction with Search Update (`SU`) to find the target data, then use the Update (`UPD`) command to blend changes back into the original report.

See the Command Reference for complete information.

---

## Sorting Data

1. Display the report you wish to sort.
2. On the control line, type `sort` and press **Transmit**. A function mask is displayed.
3. Tab to the field you wish to sort alphabetically.
4. In the line below the equal signs, type `1` in the first character position of that field.
5. Move the cursor to the next blank line and press **Transmit**.

A result is displayed with the selected field sorted in alphabetical order.

See the Command Reference for complete information on the `SORT` command.

---

## Calculating Data

### Totaling a Field Vertically

1. Display the report or result containing the data to process.
2. On the control line, type `tot` and press **Transmit**. A function mask is displayed.
3. In the function mask, type `+` in the field you wish to add.
4. Move the cursor to the next blank line and press **Transmit**.

A result is displayed with the sum of the selected field's values appearing at the bottom.

### Other Calculation Commands

For a broader overview of available calculation commands, see the *Developer's Guide*. Then consult the Command Reference for details on:

| Command | Description |
|---------|-------------|
| `CAL` | Calculate |
| `A` | Arithmetic |
| `CNT` | Count |
| `TOT` | Totalize |

For each command, read the first few screens or pages to understand its capabilities, and check the examples to see if they match your situation.
