# Duplicate Line and @LNX

## Overview

Copies lines within a report. Compare with the Insert Line command:

- **Duplicate Line** copies lines at their current location in the report.
- **Insert Line** copies lines to another part of the report.

The command duplicates the specified lines; it does not create a `-0` result.

For the manual function, the report must be on display. For the `@LNX` statement, unless you are processing a result, you must precede it with an [`@LOK`](LOK.md) (Update Lock) statement.

---

## In-Report-Line Format

```
>]xX[q]
```

| Field | Description |
|-------|-------------|
| `>]` | SOE character and line change command. |
| `x` | Number of times to duplicate the line or lines. |
| `X` | Duplicate Line call. |
| `q` | Number of lines to duplicate. Default = `1`. |

---

## Statement Format

```
@LNX,c,d,r,l,x[,q] .
```

| Field | Required | Description |
|-------|----------|-------------|
| `c,d,r` | Required | Report in which lines are to be duplicated. For more details, see *Specifying Reports or Drawers to Process*. |
| `l` | Required | Number of the first line to duplicate. |
| `x` | Required | Number of times to duplicate the lines. No default. |
| `q` | Optional | Number of lines to duplicate. Default = `1`. |

---

## Procedure

**Using the Line Change menu:**

1. Press **Edit**.
2. Place the cursor on the first line to be duplicated.
3. Press **LineCh**. The Line Change menu is displayed.
4. In the *Duplicate multiple lines* field, enter the number of lines to duplicate.

**Using the in-report-line format:**

1. Place the cursor on the first line to be duplicated.
2. Erase to the end of the line.
3. Enter the Duplicate Line in-report-line format.

---

## Example

Duplicate three lines starting at line `6`, five times. Place the cursor on line `6`, erase to the end of the line, and enter:

```
>]5x3
```

Equivalent statement:

```
@lnx,0,b,3,6,5,3 .
```
