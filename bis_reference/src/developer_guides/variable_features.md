# Variable Features and Techniques

## Overview

This section covers the following topics:
- [Using the VARIABLE Script](#using-the-variable-script)
- [Testing the Contents of Variables](#testing-the-contents-of-variables)
- [Referring to Other Variables](#referring-to-other-variables)
- [Using a Variable Table](#using-a-variable-table)

---

## Using the VARIABLE Script

The `VARIABLE` script demonstrates how a variable's type affects its contents. When run, it loads a value you supply into a series of variables of different types and displays the results.

To use the script:

1. Type `variable` on the control line and press **Transmit**.
2. Enter a value when prompted.

The system loads the value into variables of each type and displays their contents for comparison.

---

## Testing the Contents of Variables

Use the following statements to test the contents of a variable:

| Statement | Use |
|-----------|-----|
| [`@DEF`](../statements/DEF.md) | Determines the defined name, type, and size of a variable. Also provides information about the contents: number of significant characters, type of data stored, and size of the data if packed. |
| [`@IF`](../statements/IF.md) | Uses relational operators to compare the value of a variable to one or more values. |
| [`@LCV`](../statements/LCV.md) | Finds and optionally replaces strings within a variable. Can specify a label at which to continue execution when a find is made. More efficient than an `IF`/`GTO` sequence for compare-and-branch operations. |

---

## Referring to Other Variables

To use the contents of one variable as the name or number of another variable, use one of the following formats:

| Variable type | Format | Description |
|---------------|--------|-------------|
| Named | `<<name>>` | `name` is the variable whose contents are used as the actual variable reference. |
| Numbered | `VVn` | `n` is the number of the variable whose contents are used as the actual variable reference. |

**Example** — using `<one>` to indirectly reference `<two>`:

```
@ldv <one>h3=two .       . load <one> with the characters two
@ldv <<one>>i2=2 .       . load variable <two> with 2
```

The second statement uses the contents of `<one>` (which is `two`) as the name of the variable to load, effectively executing `@ldv <two>i2=2`.

---

## Using a Variable Table

A variable table lists all variables used in a script, marking the statement where each variable was defined and all subsequent references to it.

### Building a Variable Table

1. Display the run control report for which you want a variable table.
2. Execute the `BVT` command.
3. When the result is displayed, either press **Resume** to replace the original run control report with the result, or duplicate the result into another run control report.

### BVT Command Options

Use the **Build Variable Table** (`BVT`) command to build or rebuild a variable table. Each of the following requests also calls the **Build Label Table** (`BLT`) command. When rebuilding, the new table is matched with the existing table to preserve any user-defined names or comments.

| Command | Description |
|---------|-------------|
| `BVT` | Builds or rebuilds a variable table. The Line Numbers field lists locations for all variables (defined and regular usage). |
| `BVT,Q` | Same as `BVT`, but the Line Numbers field lists only defined variables (e.g., `<total>i6`), not regular-usage references (e.g., `<total>`). |
| `BVT,S` *(OS 2200)* | Same as `BVT`, but the variable table is sorted by variable name instead of variable number. |
| `CVT` | Converts v-type variables (e.g., `v1`) to named variables (e.g., `<name>`) using a previously built variable table at the end of the run control report. |
| `CVT,N` | Converts all named variables to v-type variables. |
| `CVZ` | Converts all v-type variables to three-character variables (e.g., `v1` → `v001`). |

### Variable Table Format

The `BVT` command produces the following result at the end of the run control report:

```
.VARIABLE TABLE
* Name       .Vnum.Sq. Line Numbers                .Comment
*============.====.==.=============================.=======
```

| Field | Description |
|-------|-------------|
| `Name` | Variable name (`<name>`) to equate to the v-type number. Default = `N000`. |
| `Vnum` | V-type number to equate to the variable name. |
| `Sq` | Sequence number used to match and preserve user comments when rebuilding. |
| `Line Numbers` | Line numbers where the variable is located. |
| `Comment` | Any user-supplied comments. |

### Guidelines

- When using `BVT` or `BVT,Q`, the command checks for an existing table to determine a v-type number for each named variable. It does **not** read `USE` statements — for example, `@use name=v199` does not necessarily associate `<name>` with `v199`.
- When using `CVT` or `CVT,N`, you are not notified when a variable-variable is converted. For example, converting `vv199` to `<<name>>` may not execute correctly.
- When using `CVT`, `CVT,N`, or `CVZ`, if the new variable name causes a statement to extend beyond the end of the line, the original report is displayed at that line number. No changes are made to the run control report until you correct that statement.
