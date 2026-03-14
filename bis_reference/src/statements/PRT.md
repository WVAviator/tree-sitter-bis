# PR and @PRT (Print)

## Overview

Prints a report on a system printer. The manual function (`PR`) redisplays the report on the screen and places it in a queue for the requested printer. The statement (`@PRT`) places the report in the print queue without creating a result.

---

## Manual Function Syntax

```
PR
```

*(Windows / Linux / UNIX)*
```
PR [report f]
```

| Field | Description |
|-------|-------------|
| `report` | Report to print. See Specifying Reports or Drawers to Process. |
| `f` | Report format to print (0–25). Default = basic unshifted format. |

---

## Statement Syntax

*(Windows / Linux / UNIX)*
```
@PRT,c,d[,r,dlnos?,f,sl,cys,all?,lsp,prtqueue,banner,hdgs?] .
```

*(2200 only)*
```
@PRT,c,d[,r,dlnos?,f,prtsite,cys,all?,lsp,banner,formsid,hdgs?,lab,fn,pre-c,pre-d,pre-r] .
```

### Parameters

| Field | Platform | Description |
|-------|----------|-------------|
| `c,d,r` | All | Report to print. See Specifying Reports or Drawers to Process. |
| `dlnos?` | Windows / Linux / UNIX | Delete line numbers? `Y` or `N`. Default = `Y`. |
| `dlnos?` | 2200 | Delete line numbers? `Y` or `N`. Default = `N`. |
| `f` | Windows / Linux / UNIX | Report format. Valid values: 0–25. Default = basic format, or the columns currently displayed via `VIEW`, `FMT`, or `SFC` if a report was on display. |
| `f` | 2200 | Report format. Valid values: 0–6. Default = basic format, or the columns currently displayed via `VIEW`, `FMT`, or `SFC` if a report was on display. |
| `sl` | Windows / Linux / UNIX | Site at which to print the report (A–Z). Default = local site. Note: printing to a remote Business Information Server OS 2200 site is not supported. |
| `prtsite` | 2200 | Device name or number of any printer available to the system. Default = first available printer in the configured default printer group. Print site numbers start at zero and correspond to the position of the printer name in the `PRTSIT` start parameters. |
| `cys` | Windows / Linux / UNIX | Number of copies to print. Default = `1`. Maximum = `64`. |
| `cys` | 2200 | Number of copies to print. Default = `1`. Maximum = `63`. |
| `all?` | All | Print all reports in the specified drawer? `Y` or `N`. Default = `N`. Leave the `r` field blank if using this subfield. |
| `lsp` | All | Line spacing (1, 2, or 3). Default = `1` (single spacing). |
| `prtqueue` | Windows / Linux / UNIX | Name of the printer queue. |
| `banner` | Windows / Linux / UNIX | Print banner text. Default = `MAPPER`. |
| `banner` | 2200 | Print banner name. Embedded tab codes or spaces are not permitted. Enter a leading asterisk (`*`) to skip printing the banner page. |
| `formsid` | 2200 | Indicates the predefined or special forms identification. |
| `hdgs?` | Windows / Linux / UNIX | Print report headings? `Y` = first page only (default), `N` = none, `A` = every page. |
| `hdgs?` | 2200 | Print report headings? `Y` = first page only (default), `N` = none, `A` = every page. When printing on special forms paper, the banner page, report headers, and end-of-report line are not printed; enter `*Y` to override. |
| `lab` | 2200 | Label to go to when the `@PRT` statement encounters an error. If omitted, the run aborts on error. |
| `fn` | 2200 | Filename for the print file. Up to 10 characters; may include only `A`–`Z`, `-`, and `$`. A dash and number are appended to ensure uniqueness. Truncated if the full name exceeds 12 characters. If omitted, the requester's user-id is used. |
| `pre-c, pre-d, pre-r` | 2200 | Cabinet, drawer, and report of a preamble report to process before the report(s) specified in `c,d,r`. A preamble report can contain both fixed and dynamic control information (such as email routing information). |

---

## Reserved Words *(2200 only)*

When a label is specified on `@PRT` and an error is encountered, `STAT1$` returns one of the following values:

| Value | Description |
|-------|-------------|
| `1` | Device name specified is not configured. |
| `2` | Predefined form definition is invalid. |
| `3` | Line, page, or margin definition is invalid. |
| `4` | Any other error (usually system or file errors). |

`STAT2$` returns the line number of the system error message. Use the [`@LSM`](LSM.md) (Load System Message) statement to retrieve the message for display purposes.

---

## Guidelines

- To advance the printer paper to the top of the next page, insert the `.EJECT` command in the report at the desired page break location. The command must begin in column 1.
- *(Windows / Linux / UNIX)* If logged into Linux or UNIX under a restricted shell, the commands `lp`, `rm`, `lpstat`, and `cancel` must be in your path (both `lp` and `rm` are required) to send prints, cancel prints, and check printer status.
- *(2200 only)* Use the `PRINTFORM` command to create, edit, and delete banner reports and predefined printer forms. Enter `printform,help` for more information.
- *(2200 only)* To print to a device across a network, enter both the node name and queue name (`ndnm[quenm]`) as the destination printer. The combined node and queue name cannot exceed 14 characters.

---

## System Printer Control Commands

The following commands can be typed in a report to control printing on system printers. Commands must begin in column 1 and may be in uppercase or lowercase.

*(Windows / Linux / UNIX)*

| Command | Description |
|---------|-------------|
| `.EJECT` | Advances paper to the top of the next page. Triggered when the first nonblank string on the line is `.EJECT`. |
| `$HOM$` | Advances the paper to the top of the next page (same as `.EJECT`, but does not need to begin in column 1). |
| `$KIP$ n` | Skips `n` lines on the current page. If `n` exceeds the remaining lines on the page, advances to the top of the next page. |
| `$LPP$ n` | Prints `n` lines per page. Default = 60, including header and footer margins. |

*(2200 only)*

| Command | Description |
|---------|-------------|
| `.EJECT` | Advances paper to the top of the next page. The leading period can be any non-blank character. |
| `$HOME$` | Go to the top of the next page (same as `.EJECT`). |
| `$MARG$ lpp,tm,bm,lpi,lsp` | Sets page parameters: `lpp` = lines per page (1–192), `tm` = top margin (0–99), `bm` = bottom margin (0–99), `lpi` = lines per inch (6 or 8), `lsp` = line spacing (1–3). Parameters are optional; omitted values retain their current setting. Use `*` in place of a value to restore the system default. |
| `$HDNG$ o,pgn,ejct?,pghdtxt` | Controls page heading. `o`: blank = normal headings, `N` = no headings, `X` = no page numbers or dates. `pgn` = optional starting page number. `ejct?`: `Y` = position paper at the top. `pghdtxt` = up to 96 characters of page heading text. |
| `$SKIP$ n \| x` | Skips `n` lines, or begins skipping lines until a matching `$ESKP$ x` is encountered (where `x` is any non-numeric character). Place a blank line before `$SKIP$` if it follows `$HOME$` or `.EJECT`. |
| `$ESKP$ x` | Ends line skipping begun by `$SKIP$ x`, where `x` matches the non-numeric character used in `$SKIP$`. Use `$ESKP$` without a character to end skipping unconditionally. |
| `$SKPL$ n` | Skips `n` lines on the current page. If `n` exceeds remaining lines, advances to the next page. Place a blank line before `$SKPL$` if it follows `$HOME$` or `.EJECT`. |
| `$BLOK$ x` | Block-prints `x` (1–8 alphanumeric characters, hyphens, and colons). If the block doesn't fit on the current page, advances to the next page first. |
| `$USER$` | Block-prints the active user-id (up to 8 characters). |
| `$DATE$` | Block-prints the current date (`MM/DD/YY`). |
| `$TIME$` | Block-prints the current time (`HH:MM:SS`). |
| `$DEPN$` | Block-prints the user's department number (`DEPTnnn`). |
| `$DEPT$` | Block-prints the user's department name (up to 8 characters). |
| `$EOM$` | Enables Output Manager control images in the output print file. Text beginning in column 7 of the `$EOM$` command is appended to the `<Esc>60<Esc>S` escape sequence and written to the print file. |

---

## Example

Print report `2B0`, two copies:

```
@prt,0,b,2,,,,2 .
```

| Field | Value | Description |
|-------|-------|-------------|
| `c,d,r` | `0,b,2` | Print report `2B0`. |
| `dlnos?,f,sl,cys` | `,,,,` | All columns, no line numbers, basic format. |
| `cys` | `2` | Print two copies. |
