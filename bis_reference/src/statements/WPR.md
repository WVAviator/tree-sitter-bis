# WP and @WPR — Word Process

> **Note (Linux / UNIX):** This command may not be available as it is part of the Word Processing feature and might not be installed at your site. See your administrator if the command cannot be invoked.
>
> **Note:** The `WP` manual function is only available on the OS 2200 system.
>
> **Note:** Interactive word processing is not available for Business Information Server for Microsoft Windows Client, Windows Server, or Linux and UNIX.

## Overview

Executes word processing commands against reports, or enters interactive word processing. To exit interactive word processing, press the **Exit WP** key or type `exit` and transmit.

*(OS 2200 only)* The report must be full character set (FCS).

If no word processing command is specified in the control line or statement, the system enters interactive word processing. If a command is specified, the system processes the report accordingly and creates a result.

---

## Syntax

### Control Line *(OS 2200 only)*

```
WP [report]
```

`report` — the report to process. See *Specifying Reports or Drawers to Process*.

### Statement

```
@WPR,c,d,r[,l,lab] wpcmd .
```

| Field | Description |
|-------|-------------|
| `c,d,r` | Report to process. See *Specifying Reports or Drawers to Process*. |
| `l` | Line at which to start the display (interactive). |
| `lab` | Label to go to in case of an error. |
| `wpcmd` | Word processing command. See [Commands](#commands). |

---

## Reserved Words

On error, the run goes to the label in `lab` and sets:

- `STAT1$` — message number (use [`@LSM`](LSM.md) to obtain the message text).
- `STAT2$` — line number in the report where the error occurred.

---

## Control Characters

| Character | Name | Description |
|-----------|------|-------------|
| `~A` / `~a` | Lettering | Alphabetizes following item or paragraph. `~A` = uppercase letters; `~a` = lowercase. |
| `~B` / `~b` | Bolding | Starts bolding at `~B`; ends at `~b`. |
| `~C` | Center | Centers preceding text within margins, then starts a new line. |
| `~E` | Expand to Margins | Expands preceding text between left and right margins, then starts a new line. |
| `~F` | Freeze Data | Freezes the following text in its current position on the line. |
| `~G,n` | Figure | Next `n` lines contain a figure (receives title after `PRT` and is displayed in table of contents). |
| `~H` / `~h` | Highlighting *(OS 2200)* | Starts highlighting at `~H`; ends at `~h`. For use only with a downline loaded UTS 40 terminal [F15] key. |
| `~I` | Indent Data | Indents line five spaces or the number set in the `INDENT` parameter. |
| `~L` | Left-justify | Left-justifies preceding text, then starts a new line. |
| `~M` | Indented Paragraph | Indents following whole paragraph at first tab set or tab specified in the `BULLET` parameter. |
| `~N` | Numbering | Numbers following item or paragraph. |
| `~n` | Document Numbering | Produces chapter and paragraph numbers (up to 5 levels): `~1` = `1.`, `~2` = `1.1.`, `~3` = `1.1.1.`, `~4` = `1.1.1.1.`, `~5` = `1.1.1.1.1.` |
| `~O` | Omit from Print | Omits text between two `~O` characters from printing when `PRINTOFF` parameter is set to `Y`. |
| `~P` | Parameter Line | Comment line or line to change/add control parameters (does not print). |
| `~Q` | AUX Command | Specifies that the next string of characters is a command for an auxiliary device or printer (not counted as text). |
| `~R` | Right-justify | Right-justifies preceding text, then starts a new line. |
| `~T` | Position to Next Tab | Starts following text at the next available tab setting. |
| `~U` / `~u` | Underlining | Starts underlining at `~U`; ends at `~u`. |
| `~V` / `~v` | Vertical Bar | Vertical line for boxes (not displayed on terminal, but printed by Auxiliary command). *(OS 2200)* `~v` = corner of box; for use only with a downline loaded UTS 40 terminal [F15] key. |
| `~X` / `~x` | Strikethrough | Starts strikethrough at `~X`; ends at `~x`. |
| `~Z,n` | Table | Next `n` lines contain a table (receives title after `PRT` and is displayed in table of contents). |
| `~ ` (tilde-space) | Insert Edit Marker | Inserts an edit marker in the left margin. In adjusted reports, enter `~ ` starting in column 1 where an edit marker is wanted during `PRT`. |
| `~~` | Carriage Return | Moves following text to the next line. Use `~~~~` to leave a blank line between text. |
| `~.` | Tab Rack | Indicates left and right margins and tab settings. |
| `~/[n]` | Conditional Page Break | Starts a new page if the following `n` lines cannot fit on the current page. |
| `~*` | Generated Page Break | Breaks page (inserted by the `ADJ` command). |
| `~-` | Chapter Break | Breaks chapter (inserted by the `ADJ` command). |
| `~=` | List Merge | See [LMG](../statements/LMG.md). |
| `~&` | List Merge | See [LMG](../statements/LMG.md). |

---

## Commands

Commands marked with `*` work only in interactive word processing. Single-letter alphabetic commands may be entered in upper- or lowercase.

| Command | Platform | Description |
|---------|----------|-------------|
| `ADJ` | All | Paginates and formats data per report parameters and control characters, creating a result. Execute before `PRT` or `DOC`. |
| `ADJDOC` | All | Combination `ADJ` and `DOC` command. Use only with document-style reports. |
| `ADJPRT` | All | Combination `ADJ` and `PRT` command. |
| `ADJREP*` | OS 2200 | Combination `ADJ` and `REP` command. |
| `BACKUP*` | OS 2200 | Displays the report as it was at the start of the word processing session. Enter `rep` to keep this version, or `return` to go back to the updated copy. |
| `CHG*` | OS 2200 | Changes target string to replacement string. Format: `CHG ;/target/replacement/` |
| `CUT*` | OS 2200 | Enters cut control. |
| `D*` | OS 2200 | Displays named reports in interactive word processing. Use on named reports only. Format: `D report-name` |
| `DGG*` | OS 2200 | Displays item `x` from the system global glossary. Format: `DGG,x` |
| `DOC` | All | Prepares an adjusted document for printing including title pages, table of contents, body, and index. Use only with document-style reports. |
| `FRONT` | All | Creates front pages of a document up to the main body (used with `DOCUMENT` parameter). |
| `G*` | OS 2200 | Extracts item `x` from a glossary report and inserts it at the cursor position. Format: `G,x` |
| `GG*` | OS 2200 | Inserts item `x` from the system global glossary. Format: `GG,x` |
| `GGI*` | OS 2200 | Produces an index of all global glossary items. Press **Paint** to return to the report. |
| `GI*` | OS 2200 | Produces an index of your glossary report (all tab lines). Press **Paint** to return. |
| `GLOSSARY*` | OS 2200 | Defines your glossary report. Overrides the `GLOSSARY` parameter. Formats: `GLOSSARY report` or `GLOSSARY C npsw rd`. |
| `HELP*` | OS 2200 | Displays a brief description of control characters, parameters, and commands without exiting interactive word processing. Press **Paint** to return. |
| `$INCL$` | OS 2200 | Combines reports specified in `$INCL$` directives (column 1) into a result. Not available in interactive word processing. |
| `INCL` | Windows / Linux / UNIX | Combines reports specified in `$INCL$` directives into a result. |
| `INDEX` | All | Creates a result containing only the index from a document report. Use only with document-style reports. |
| `INS*` | OS 2200 | Inserts `n` blank lines (default = 1) at the cursor position. Format: `INS[,n]` |
| `L*` | OS 2200 | Restores the control line. |
| `LOC*` | OS 2200 | Locates a target string. Format: `LOC targetstring` |
| `LOWER` | All | Converts uppercase to lowercase (except after `.`, `?`, `!`, or `:`). In interactive mode, applies from the first displayed line to the cursor. For the entire report, use `wp lower` outside of interactive. |
| `MC` | All | Creates up to four columns of text based on bracket sets in the tab rack. Use after `ADJPRT`. Cannot be used with bold, underline, strikethrough control characters, or `EZWP`. Not available in interactive word processing. |
| `mmm*` | OS 2200 | Displays a calendar for month `mmm` and year `yy`/`yyyy` (1900–2099). Format: `mmm [[yy]yy]` |
| `NOCR*` | OS 2200 | Specifies standard updating — does not insert carriage returns (`~~`) in blank lines if `x = Y`. Format: `NOCR,x` |
| `PC*` | OS 2200 | Places a `~P` parameter control line at the cursor position, using existing parameter values or standard defaults. |
| `PG` | All | Displays the word processing report at page `n` (must be an adjusted report). Format: `PG,n` |
| `PR` | All | Prints the report on the system printer. Not available in interactive word processing. |
| `PREP` | All | Prepares a report for word processing by inserting control parameters, a tab rack, and `~~` in blank lines. Format: `PREP[,x]` where `x` = `C`, `R`, `L`, `F`, or `E` to add the corresponding control character after each line. |
| `PROOF` | All | Displays report with `~U...~u` as underline, `~B...~b` as bold, and `~X...~x` as strikethrough. `PROOF,_` uses `_` as the control character. Not available in interactive word processing or with `@WPR`. |
| `PRT` | All | Prepares report/result for printing by interpreting, performing, and removing control parameters and characters. Formats: `PRT` (entire report), `PRT,n` (page `n` only), `PRT,n-n` or `PRT,n-n\|,c-p\|,c-p-cc-pp` (interactive range). |
| `REP*` | OS 2200 | Replaces the word processing report with the result on display. Do not use on a `PRT` result. |
| `RETURN*` | OS 2200 | Redisplays the updated word processing report after a `BACKUP` command. |
| `SEC` | All | Displays the specified section of a document-style report. Format: `SEC,n[.n.n.n.n]` |
| `SP*` | OS 2200 | Checks spelling of a specified word. Format: `SP word` |
| `SV*` | OS 2200 | Sets the number of lines to remain on display at the top of the screen after each update. Format: `SV,n` |
| `TOC` | All | Creates a result containing only the table of contents. Use only with document-style reports. |
| `TR*` | OS 2200 | Inserts a tab rack at the cursor position, or inserts a numbered tab rack `n` (defined as `~.n`). Up to five numbered tab racks (`~.1`–`~.5`). Format: `TR[,n]` |
| `UPPER` | All | Converts all lowercase to uppercase. In interactive, applies from the first displayed line to cursor. For the entire report, use `wp upper` outside interactive. |
| `WC*` | OS 2200 | Changes word `x` to string `y`. Targets may contain A–Z, 0–9, hyphens, and apostrophes but not spaces. Replacements may contain spaces and special characters. Format: `WC,x,y[,xx,yy,...]` |
| `WCL*` | OS 2200 | Changes words from the report specified by the `WCLIST` parameter or another report. Format: `WCL[,report]` |
| `WCLREP*` | OS 2200 | Combination `WCL` and `REP` command. Format: `WCLREP[,report]` |
| `WL*` | OS 2200 | Locates all occurrences of target. Targets may contain A–Z, 0–9, hyphens, and apostrophes, but not spaces. Format: `WL,target[,target...]` |
| `WLL*` | OS 2200 | Locates words from the report specified by the `WCLIST` parameter or another report. Format: `WLL[,report]` |

---

## Control Parameters

Control parameters format text and modify or control the use of Word Process commands. Enter them anywhere in the report heading between the date line and the heading divider line. Some can also be changed using the `~P` control character.

*(Windows Server / Linux / UNIX / Windows Client)* Parameters on the same line must be separated by spaces.

Format:
```
parameter:value
```

| Parameter | Platform | Description |
|-----------|----------|-------------|
| `APPENDIX` | All | Indicates that the next chapter break (`~1`) will be the first appendix. A level-1 section must immediately follow the `~P` line. Format: `APPENDIX:` (must be in `~P` line) |
| `BULLET` | All | Sets tab set `n` as the left margin for indented paragraphs. Format: `BULLET:n` (use with `~M`) |
| `CONTROL` | All | Uses `~` or `_` to define control characters. Default = `~`. Format: `CONTROL:_` (must be in heading line) |
| `DOCUMENT` | All | Identifies the report as document-style. Format: `DOCUMENT:x,y,z,a,b,c` (heading line). `x` = title pages (Y/N, default Y); `y` = create index (Y/N, default Y); `z` = first section number (default 1); `a` = page breaks on chapter breaks (Y/N, default Y); `b` = level through which to force uppercase titles; `c` = level through which to bold titles. |
| `EDITMARK` | All | Uses character `x` as an editing mark. Format: `EDITMARK:x` (use with `~ ` tilde-space) |
| `EZWP` | All | Processes reports that may have no control characters. Default = `N`. Format: `EZWP:x` (x = Y or N) |
| `FOOTER` | All | Includes footers on the current page. Default = `Y`. Format: `FOOTER:x` (x = Y or N) |
| `FORMAL` | All | Identifies the report as a book-style report. Format: `FORMAL:x,y,z,a,b,c` (heading line). Same fields as `DOCUMENT`. `~1` titles are centered; `~2` are left-justified; subsection numbers (2–5) are omitted. Use `TOC` for table of contents; process with `DOC`. |
| `GLOSSARY` | All | Indicates the location of the glossary report. Format: `GLOSSARY:rd` (or name) (heading line) |
| `HEADER` | All | Includes headers on the current page. Default = `Y`. One default header line contains the page number, starting on page 2. Format: `HEADER:x` (x = Y or N) |
| `INDENT` | All | Specifies number of spaces to indent when `~I` is encountered. Use `-n` to move text left of the left margin. Format: `INDENT:n` or `INDENT:-n` |
| `LPP` | Linux / UNIX | Sets lines per page. If greater than 60, the print device must support it. Default = 60. Format: `LPP:n` |
| `LPP` | OS 2200 | Same as above. Default = 60 or the system-configured value for auxiliary devices. Format: `LPP:n` |
| `MARGINS` | All | Specifies text placement within report margins. `x` = `L` (left), `R` (right), `E` (even), `F` (freeze), `C` (center). Control characters `~L`, `~R`, `~E`, `~F`, `~C` override this. Default = left (with tab rack); otherwise frozen. Format: `MARGINS:x` |
| `NEWHEAD` | All | Specifies new header (`*/`) and footer (`*\`) lines from this point on, or deletes headers/footers (`x = N`). Format: `NEWHEAD:x` (x = Y or N) (must be in `~P` line) |
| `NOCR` | All | Specifies standard updating — does not insert `~~` in blank lines if `x = Y`. Default = `N`. Format: `NOCR:x` (heading line) |
| `OUTLINE` | OS 2200 | Clears or defines the outline numbering/lettering format. Format: `OUTLINE:` (clears, in `~P` line) or `OUTLINE:NxAxnxax`. `N`/`R` = numbering/Roman numerals at level `x`; `A` = uppercase letters; `n` = second-level numbers; `a` = lowercase letters. |
| `PACK` | All | Removes extra spaces between words. Leaves two spaces after `.`, `:`, `?`, `!` (if at least one space already follows). Default = `N`. Format: `PACK:x` (x = Y or N) |
| `PAGE` | All | Defines the first page number. Use to start numbering above 1. Format: `PAGE:n` (heading line) |
| `PAGEBODY` | Windows / Linux / UNIX | Sets the number of text lines per page. `n` may not exceed 60 (or `LPP`) minus `PAGETOP` minus header/footer lines (or minus 1 if none). Default = 58. Format: `PAGEBODY:n` |
| `PAGEBODY` | OS 2200 | Same as above, using system-configured LPP value. Default = 58. Format: `PAGEBODY:n` |
| `PAGETOP` | All | Inserts `n` blank lines between header lines and the main body. Default = 0 (single-page reports are centered vertically). Format: `PAGETOP:n` |
| `PRINTOFF` | All | Controls whether text between `~O` characters is printed. Default = `N` (print the characters). Format: `PRINTOFF:x` (x = Y or N) |
| `PRTSPACE` | All | Sets line spacing: `1` = single, `2` = double, up to `4`. Format: `PRTSPACE:n` |
| `RELEASE` | OS 2200 | Allows carets (`^`) in text (not supported with IBM terminals). Format: `RELEASE:x` (x = Y or N) |
| `SCREEN` | OS 2200 | Converts control characters to emphasis and FCC characters at entry into interactive word processing. Format: `SCREEN:x` (x = Y or N) |
| `SECTION` | All | Zeros out `~1`–`~5` numbering and restarts. Format: `SECTION:` (must be in `~P` line) |
| `SPACE` | All | Changes the nonbreaking space character to `x` (converted to a space after `PRT`). Default = grave accent (`` ` ``). Format: `SPACE:x` |
| `SV` | All | Sets the number of lines to remain on display at the top of the screen after each update in interactive word processing. Format: `SV:n` (heading line) |
| `UNADS` | OS 2200 | Inserts special characters for UNADS processing. Format: `UNADS:x,[H]` (x = Y or N) |
| `WCLIST` | OS 2200 | Defines the target list report for Word Change or Word Locate functions. Format: `WCLIST:rd` (or name) (heading line) |
| `WORDWRAP` | All | Specifies whether to wrap words from line to line. Default = `Y`. If `N`, lines are adjusted between margins but not joined if there is room. Format: `WORDWRAP:x` (x = Y or N) |
| `*/` | All | Places the full following line as a page header (up to three header lines). May contain page numbering, date, time, or other codes. |
| `*\` | All | Places the full following line as a footer (up to two footer lines). |

---

## Examples

Adjust report `22H0`, prepare it for printing, and produce a `-0` result. On error, continue at label `99`:

```
@wpr,0,h,22,,99 adjprt .
```

Place the run user in interactive word processing with report `22H0` on display:

```
@wpr,0,h,22 ' ' .
```
