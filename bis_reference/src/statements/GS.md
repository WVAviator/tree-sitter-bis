# GS and @GS — Graphics Scaler

## Overview

Modifies, scales, rotates, or offsets a chart, and can convert expanded syntax into graphics primitive code.

Your terminal must be configured for graphics, and you must have saved the graphics primitive code for the chart you want to modify.

---

## Manual Function

```
GS [report]
```

where `report` is the report containing graphics primitive code. Use `gs -` to indicate the current report. For more details, see *Specifying Reports or Drawers to Process*.

---

## Syntax

```
@GS,c,d,r[,lab]
    maxy[,o,ige?,unp?,aga?,expand?,ighitxt?,outrslt?,plotter?]
    sfx[,offx,offy,]sfy
    angle[,absx,absy
    vci,vco,vminx,vmidx,vmaxx,vminy,vmidy,vmaxy] .
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `c,d,r` | Required | Report containing the graphics primitive code. For more details, see *Specifying Reports or Drawers to Process*. |
| `lab` | Optional | Label to branch to in case of error. |
| `maxy` | Required | Maximum Y value to check limits against (`0`–`32767`; enter `0` to use `32767`). See [Maximum Y Coordinates](#maximum-y-coordinates) for device-specific values. |
| `o` | Optional | Options field for IN/OUT format. See [Options](#options). |
| `ige?` | Optional | Ignore errors? `Y` or `N`. If `Y`, truncates out-of-range values and ignores invalid commands. Must be `N` if using the `S` option. |
| `unp?` | Optional | Unpack the result? `Y` or `N`. If `Y`, displays one command per line. Must be `N` if using the `S` option or if `outrslt?` = `Y`. |
| `aga?` | Optional | Assume graphics active? `Y` or `N`. If `Y`, assumes a `ZI` command preceded the data and does not require a closing `ZT` command. Must be `N` if using the `S` option or if `outrslt?` = `Y`. |
| `expand?` | Optional | Handle expanded syntax? `Y` or `N`. If `Y`, converts expanded syntax into graphics primitive code. Must be `N` if using the `S` option or if `outrslt?` = `Y`. |
| `ighitxt?` | Optional | Ignore high text? `Y` or `N`. If `Y`, never converts data to high-quality text even if a `CT2` command or rotated text is encountered. |
| `outrslt?` | Optional | Display the graphics result on screen? `Y` or `N`. If `Y`, both `unp?` and `aga?` must be `N`. |
| `plotter?` | Optional | Add or delete plotter primitives. `P` = add `ZO1ZS1R` (small plotter). `L` = add `ZO1ZS1` (large plotter). `D` = delete `ZO1`, `ZS1`, and initial `R` command. Any other character causes no change. |
| `sfx` | Required | Scale factor for X parameters (`0.0`–`32767.0`). Default = `1` (entering `0` uses `1`). A factor of `2.0` doubles size; `0.5` halves it. To scale only the X axis, set `sfx` to the desired value and `sfy` to `1.0`. |
| `offx` | Optional | Offset value (`-9999999999`–`9999999999`) to add to absolute X components. |
| `offy` | Optional | Offset value (`-9999999999`–`9999999999`) to add to absolute Y components. |
| `sfy` | Required | Scale factor for Y parameters (`0.0`–`32767.0`). Default = `1` (entering `0` uses `1`). To scale only the Y axis, set `sfy` to the desired value and `sfx` to `1.0`. |
| `angle` | Required | Rotation angle (`-360.0`–`360.0`). Positive = counterclockwise; negative = clockwise. |
| `absx` | Optional | Absolute X rotation value (`-9999999999`–`9999999999`). |
| `absy` | Optional | Absolute Y rotation value (`-9999999999`–`9999999999`). |
| `vci` | Optional | Variable to capture the number of characters scanned. |
| `vco` | Optional | Variable to capture the number of characters to send. |
| `vminx` | Optional | Variable to capture the minimum X value. |
| `vmidx` | Optional | Variable to capture the midpoint X value. |
| `vmaxx` | Optional | Variable to capture the maximum X value. |
| `vminy` | Optional | Variable to capture the minimum Y value. |
| `vmidy` | Optional | Variable to capture the midpoint Y value. |
| `vmaxy` | Optional | Variable to capture the maximum Y value. |

---

## Options

| Option | Description |
|--------|-------------|
| `A` | Result with all absolute commands. |
| `C` | Optimize and combine successive commands into a single comma-separated command. |
| `N` | Normal mode — ignore leading spaces *(default)*. |
| `O` | Optimize the resulting code. |
| `R` | Result with all relative commands. |
| `S` | Strict interpretation of graphics primitive code. If used, `ige?`, `unp?`, `aga?`, and `expand?` must all be `N`. Without this option, all lowercase characters not in a text string are treated as uppercase. |

---

## Maximum Y Coordinates

The maximum X coordinate is `32767` for all devices. Aspect ratio = `max Y / 32767`.

| Device | Mnemonic | Max Y | Aspect Ratio |
|--------|----------|-------|--------------|
| 8½×11 printing device | `HP4` or `HP8` | 24143 | 0.7368 |
| 11×17 printing device | `HP4` or `HP8` | 22145 | 0.6758 |
| UTS 60 *(2200)* | `6S` | 23999 | 0.7324 |
| UTS 30 *(2200)* | `3S` | 23999 | 0.7324 |
| PC/CGA monitor *(2200)* | `PCC` | 21818 | 0.6659 |
| PC/EGA monitor *(2200)* | `PCE` | 22367 | 0.6826 |
| PC/Unisys high-res monitor *(2200)* | `PCS` | 21818 | 0.6659 |
| UTS 400 Master *(2200)* | `400` | 21844 | 0.6667 |
| Intercolor Scope *(2200)* | `ISC` | 25197 | 0.769 |
| AQUASTAR *(2200)* | `AQUA` | 21049 | 0.6424 |

To determine your terminal type, enter `chart` on the control line and select "Determine Type of Terminal" from the Chart menu.

---

## Reserved Words

In case of an error, the run continues at the specified label. `STAT1$` is loaded with the system message number; `STAT2$` is loaded with one less than the line number in the report where the error occurred. Use [`@LSM`](LSM.md) (Load System Message) to obtain the message text.

---

## Outcome

Offsets, scales, or rotates the chart as requested, and processes expanded syntax. The first move is always performed as an absolute move, even if no move is present or if the `R` option is selected.

---

## Examples

Process report `1A0` with no scaling or rotation:

```
@gs,0,a,1 20000 1 0 .
```

| Subfield | Description |
|----------|-------------|
| `0,a,1` | Process report `1A0`. |
| `20000` | Set maximum Y value to 20,000. |
| `1` | Scale factor of 1 (no scaling). |
| `0` | Rotation angle of 0 (no rotation). |

Process report `1A0` with scaling, offset, rotation, and variable capture:

```
@gs,0,a,1,10 23999,o,n,n,n,n,n,y 0.75,2000,\
1000 45,16383,11399 <scanned>i5,\
<chars>i5,<minx>i5,<midx>i5,<maxx>i5,\
<miny>i5,<midy>i5,<maxy>i5 .
```

| Subfield | Description |
|----------|-------------|
| `0,a,1` | Process report `1A0`. |
| `10` | Branch to label `10` on error. |
| `23999` | Set maximum Y value. |
| `o` | Optimize the results. |
| `n,n,n,n,n` | Do not ignore errors, unpack, assume graphics active, handle expanded syntax, or ignore high text. |
| `y` | Display the result on screen. |
| `0.75` | Reduce to ¾ size. |
| `2000` | Offset right by 2,000. |
| `1000` | Offset up by 1,000. |
| `45` | Rotate 45° counterclockwise. |
| `16383` | Rotate around X value 16,383. |
| `11399` | Rotate around Y value 11,399. |
| `<scanned>i5` | Capture number of characters scanned. |
| `<chars>i5` | Capture number of characters in the result. |
| `<minx>i5` | Capture minimum X value. |
| `<midx>i5` | Capture midpoint X value. |
| `<maxx>i5` | Capture maximum X value. |
| `<miny>i5` | Capture minimum Y value. |
| `<midy>i5` | Capture midpoint Y value. |
| `<maxy>i5` | Capture maximum Y value. |
