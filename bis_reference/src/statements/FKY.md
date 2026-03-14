# @FKY — Function Key

## Overview

Customizes the function key bar displayed at the bottom of the screen during a display by the [`@DSP`](DSP.md) (Display), [`@DSM`](DSM.md) (Display Message), or [`@OUM`](OUM.md) (Output Mask) statements.

Define the function keys in a separate report or in the output area of your run using Screen Control commands such as `FKEY`. For more information, see [`@SC`](SC.md) (Screen Control).

---

## Syntax

```
@FKY[,c,d,r] .
```

where `c,d,r` is the report containing the Screen Control commands that create a custom function key bar for the following `@DSP`, `@DSM`, or `@OUM` statement to display. If no report is specified, the default function key bar is restored.

---

## Outcome

The statement designates a Screen Control form that subsequent `@DSP`, `@DSM`, or `@OUM` statements use to display a custom function key bar. The custom bar remains in effect until one of the following occurs:

- The run terminates.
- The run links to another run via the [`@LNK`](LNK.md) (Link to Another Script) statement.
- Another `@FKY` statement designates a different Screen Control report.
- Another `@FKY` statement is used with no report specified (restores default function keys).

To return control to your run, use the `KEY` command.

---

## Example

Set up Screen Control commands in the output area, use [`@BRK`](BRK.md) and [`@RNM`](RNM.md) to make them accessible as `-1`, then use `@FKY` and `@DSP` to display reports with and without a customized function key bar:

```
@brk,fftype$ .
fkey,1,'Resume',rsm
fkey,2,'Paint',pnt
fkey,4,'Return',KEY
fkey,10,'Quit',^
@brk rnm -1 .              . Save FKEY result
@srh,0,b,2 d 2-2 ,ip rnm -2 . Save search result
@fky,-1 .                  . Customize func. key bar
@dsp,-2 .                  . Display search result
@if fkey$ eq 4,(0010) ;    . (other processing)
@fky .                     . Restore default func. keys
@dsp,0,b,2 .               . Display report
```
