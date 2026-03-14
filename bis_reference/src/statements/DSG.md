# G and @DSG — Display Graphics

## Overview

Translates the primitive code from a report and displays it on a terminal.

---

## Manual Function

```
G report
```

where `report` is the report containing the graphics primitive code. Use `g -` to indicate the current report. For more details, see *Specifying Reports or Drawers to Process*.

---

## Syntax

**Windows / Linux / UNIX:**
```
@DSG,c,d,r[,,interim?] .
```

**2200:**
```
@DSG,c,d,r[,display,interim?,,sn,lab] .
```

### Parameters

| Field | Platform | Required | Description |
|-------|----------|----------|-------------|
| `c,d,r` | All | Required | Report containing the graphics primitive code. For more details, see *Specifying Reports or Drawers to Process*. |
| `display` | 2200 | Optional | What to display: `A` = alphanumeric text, `G` = graphics (default), `M` = both text and graphics. |
| `interim?` | All | Optional | Interim display? `Y` or `N`. If `Y`, the run continues automatically without the user pressing Resume. Default = `N`. |
| `sn` | 2200 | Optional | Station number where the graphics are to be displayed. Default = the station that executed the statement. |
| `lab` | 2200 | Optional | Label to branch to if the system cannot successfully display graphics at another station. If omitted, the run terminates with an error. See [Reserved Words](#reserved-words) for `STAT1$` status codes. |

---

## Outcome

- **Windows / Linux / UNIX:** Displays the graphic and clears the output area.
- **2200:** Displays graphics, text, or both depending on the `display` subfield, and clears the output area. If `interim?` = `Y`, the run continues automatically; otherwise the run user must press **Resume**.

---

## Reserved Words

*(2200 only)* `STAT1$` contains the following status codes if the system is unable to display graphics at another station:

| Code | Description |
|------|-------------|
| `1` | Station does not exist or is a batch port, remote run, or background station. |
| `2` | Station is not available — not currently connected to the system. |
| `3` | Either no one is signed on at the specified station and interim display was not specified, or the terminal is not a graphics terminal. |
| `4` | No answer — the user at the specified station did not respond to the message wait signal within one minute. |
| `5` | Communications timeout when plotting. |

---

## Guidelines

*(2200 only)*

- If no label is specified and the system cannot successfully display graphics at another station, the run terminates with an error.
- Use the `sn` and `lab` subfields to display graphics on stations other than the one executing the run. The system activates the message wait signal on the receiving station and the run stalls. The user must press **Message** to display the graphic.
- If `interim?` = `Y`, the run continues automatically; otherwise it stalls until the user at the receiving station presses any key.
- If the user does not respond within one minute, the run continues at the specified label or terminates with an error (`STAT1$` = `4`). Subsequent graphics displays to the same station each require a separate response to the message wait signal.
- If you know no user is signed on at the specified station, use `interim?` = `Y`. The system will not activate the message wait signal — it displays the graphic and continues the run. Without interim display, the run continues at the label or terminates with an error (`STAT1$` = `3`).

> **Note:** You cannot obtain exclusive use of any station. When more than one run is sending graphics to the same station, the displays may be intermixed and not displayed in the order they were sent. Additionally, the one-minute time limit may elapse for a second `@DSG` request before the first one finishes.

---

## Examples

Display text from the primitive graphics code in report `1A0`. The run user must press Resume to continue:

```
@dsg,0,a,1 .
```

Display graphics from report `2I0`. The run continues automatically:

```
@dsg,0,i,2,,y .
```

*(2200 only)* Display graphics on station `123` from report `3C0`. The run continues automatically:

```
@dsg,0,c,3,,y,,123 .
```
