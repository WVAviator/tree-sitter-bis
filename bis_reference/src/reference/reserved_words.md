# Reserved Words

The following table lists all reserved words available for use in BIS scripts. Type/size indicators are shown in brackets (e.g., `[H1]`, `[I4]`). Platform restrictions are noted inline.

| Reserved Word | Type | Description |
|---------------|------|-------------|
| `ACDRW$` | `[H1]` | Alphabetic drawer of the run control report issuing the external RSR statement. |
| `ACTINP$` | `[I6]` | Handle of the object last accessed — usually a control within a window, not the window itself. *(GI-BIS only)* |
| `ACTWIN$` | `[I6]` | Window handle of the last window accessed. When input is received from a control, contains the handle of the window containing that control. *(GI-BIS only)* |
| `ADRW$` | `[H1]` | Alphabetic drawer of the current result. |
| `ADRW1$`–`ADRW16$` | `[H1]` | Alphabetic drawer of the `-1` through `-16` results. |
| `AEDRW$` | `[H1]` | Alphabetic drawer of the run control report. |
| `AKEY$` | | Key or key sequence used to perform the Abort command. |
| `APILVL$` | | Functional level of the graphical user interface. Contact Customer Support for the correct value. |
| `AREA$` | `[H12]` | Named area. |
| `ASPECT$` | `[I12]` | Aspect ratio (used with graphics). *(Windows: provides a constant but is ignored.)* |
| `AXDRW$` | `[H1]` | Alphabetic drawer of the failing script. |
| `BPORT$` | `[I1]` | *(OS 2200 only)* Script started in the batch port. Nonzero = yes; zero = no. |
| `CAB$` | `[I4]` | Cabinet number of the report or result last processed, or on display when the script started. Zero if none. *(Windows/Linux/UNIX: always the even cabinet number. OS 2200: may contain the odd cabinet number when a script or CS command displays an odd cabinet report, or the user requests one using `rdc` format. If `CAB$` is odd, scripts cannot update reports; if either `CAB$` or `CAB1$` is odd, the user cannot update manually.)* |
| `CAB1$` | `[I4]` | Currently active cabinet number. *(OS 2200: scripts ignore `CAB1$` — only `CAB$` needs to be odd to prevent script updates.)* |
| `CALL$` | `[I3]` | Number of CALL levels remaining. |
| `CDRW$` | `[I6]` | Drawer number of the run control report issuing the RSR statement to start an external subroutine. Zero if the subroutine is internal. |
| `CERR$` | `[I6]` | Message number of the error. *(Windows/Linux/UNIX: same as `XERR$`, but also clears the error condition. OS 2200: same as `XERR$`.)* |
| `CHAR$` | `[I3]` | Number of characters per line in the drawer. |
| `CHKPSW$` | `[I1]` | *(OS 2200 only)* Write passwords must be specified (via PSW) before reports with write passwords can be updated. Nonzero = yes; zero = no. |
| `CHR$` | | Sets a variable to a specific ASCII character: `@CHG <variable>h1 CHR$ octal .` where `octal` is `000`–`377`. **Caution:** control characters (`000`–`037`) and extended ASCII (`177`–`377`) should not be written to BIS reports as they may cause data corruption. |
| `CLLADRW$` | `[H1]` | Alphabetic drawer of the run control report issuing the last CALL statement. Blank if CALL level 0. |
| `CLLCAB$` | `[I4]` | Cabinet number of the run control report issuing the last CALL statement. Zero if CALL level 0. |
| `CLLDRW$` | `[I6]` | Drawer number of the run control report issuing the last CALL statement. Zero if CALL level 0. |
| `CLLLIN$` | `[I4]` | Line number of the run control report issuing the last CALL statement. Zero if CALL level 0. |
| `CLLLVL$` | `[I3]` | Current CALL level. |
| `CLLNAM$` | `[H12]` | Name of the active registered CALL script. Blank if none active. |
| `CLLRPT$` | `[I4]` | Report number of the run control report issuing the last CALL statement. Range: `-0` to `MAXRNM$` if called from a temporary script report. Zero if CALL level 0. |
| `COLOR$` | `[I1]` | Color terminal flag. Nonzero = color display. Always returns nonzero, even for monochrome VGA. |
| `CPRIV$` | `[I1]` | User has coordinator privileges. Nonzero = yes; zero = no. *(Windows/Linux/UNIX: user must be in department 2.)* |
| `CRPT$` | `[I4]` | Report number of the run control report issuing the external RSR statement. Zero if internal subroutine. |
| `CURH$` | `[I3]` | Horizontal character position of the cursor. |
| `CURSEC$` | `[I12]` | *(Windows/Linux/UNIX only)* Current number of seconds since January 1, 1970. |
| `CURV$` | `[I2]` | Vertical character position of the cursor. |
| `DATE0$` | `[H5]` | Current date in `YMMDD` format. |
| `DATE1$` | `[H6]` | Current date in `YYMMDD` format. |
| `DATE2$` | `[H9]` | Current date in `DD MMM YY` format. |
| `DATE3$` | `[H4]` | Current date in `YDDD` format. |
| `DATE4$` | `[H5]` | Current date in `YYDDD` format. |
| `DATE5$` | `[I6]` | Current date in `DDMMYY` format. |
| `DATE6$` | `[H8]` | Current date in `MM/DD/YY` format. |
| `DATE7$` | `[H18]` | Current date in `MONTH DD, YYYY` format. |
| `DATE8$` | `[I6]` | Current date in `MMDDYY` format. |
| `DATE9$` | `[H8]` | Current date in `DD/MM/YY` format. |
| `DATE11$` | `[H8]` | Current date in `YYYYMMDD` format. |
| `DATE12$` | `[H11]` | Current date in `DD MMM YYYY` format. |
| `DATE14$` | `[H7]` | Current date in `YYYYDDD` format. |
| `DATE15$` | `[I8]` | Current date in `DDMMYYYY` format. |
| `DATE16$` | `[H10]` | Current date in `MM/DD/YYYY` format. |
| `DATE18$` | `[I8]` | Current date in `MMDDYYYY` format. |
| `DATE19$` | `[H10]` | Current date in `DD/MM/YYYY` format. |
| `DATE20$` | `[H10]` | Current date in `YYYY-MM-DD` format. |
| `DATE21$` | `[H9]` | Current date in `DD-MMM-YY` format. |
| `DATETZ$` | `[S24]` | *(OS 2200 only)* Current date/time/zone in `YYYY-MM-DD HH:MM:SS ZZZZ` format. Time zone derived from the `TZ` environmental variable via the `SYSTEM$TIME` Exec service call. |
| `DAY$` | `[H3]` | Current day of the week (e.g., `MON`, `TUE`). |
| `DBASE$` | | *(Windows/Linux/UNIX only)* Current site database path. |
| `DBTHRS$` | `[I4]` | *(Windows/Linux/UNIX only)* Configured database threshold value. If `DBUSG$` exceeds this at sign-on, a threshold warning appears with the sign-on logo. |
| `DBUSG$` | `[I4]` | *(Windows/Linux/UNIX only)* Percent of database space currently in use. |
| `DEBUG$` | `[I1]` | Script debug state. `0` = none, `1` = Workshop, `2` = Legacy RDB. |
| `DEPN$` | `[I4]` | User's department sign-on number. |
| `DEPT$` | `[H11]` | User's department name. |
| `DFUACT$` | `[I4]` | Number of reports currently locked by a script using deferred update that have actually been updated. |
| `DFULOK$` | `[I4]` | Number of reports currently locked by a script using deferred update at this point in time. |
| `DFUMAX$` | `[I4]` | Configured maximum number of reports that can be locked by a script for deferred update at one time. |
| `DLINE$` | `[I8]` | Line number of the first non-held line on display. |
| `DLP$` | `[I12]` | Number of data lines processed during the script (includes LLPs and all lines processed). Compare to `IO$` and `LLP$`. |
| `DRW$` | `[I6]` | Drawer number of the current result (`-0`). |
| `DRW1$`–`DRW16$` | `[I6]` | Drawer number of the `-1` through `-16` results. |
| `DTM$` | `[I1]` | *(OS 2200 only)* Data Transfer Module status. `0` = not configured; `1` = configured, not attached; `2` = configured and attached; `3` = script is processing DTM input. |
| `DTNAM$` | | *(OS 2200 only)* Name of this BIS system as known to DTM. |
| `DWCAP$` | `[S18]` | BIS API capabilities string — a sequence of `0`s and `1`s where `1` = supported. Positions: 2=blocked fonts, 3=host-generated handles, 7=DDE, 9=FON D/P options, 11=32-bit client, 12–15=BIS Modernization Features 2000–2010. Use substring format to check individual positions (e.g., `DWCAP$(9-1)`). |
| `ECAB$` | `[I4]` | Cabinet number of the run control report. |
| `EDRW$` | `[I6]` | Drawer number of the run control report. |
| `ELINE$` | `[I6]` | Current execution line in the run control report. |
| `ENVSTR$` | | Available environmental variable space in bytes. Maximum total size: 14,000 bytes. |
| `ERPT$` | `[I4]` | Report number of the run control report. |
| `ESC$` | | *(Windows/Linux/UNIX only)* Escape sequence. Value varies by platform — avoid in new applications. |
| `ETYPE$` | `[I6]` | Drawer number of the run control report. |
| `F1$`–`F10$` | | Key or key sequence used as function keys F1 through F10. |
| `FCAB$` | | Current form cabinet number. |
| `FCC$` | `[I1]` | *(OS 2200 only)* UTS 400 station has FCC hardware protect capability. Nonzero = yes; zero = no. |
| `FDRW$` | `[I6]` | Drawer number of the Screen Control form on display. |
| `FFTYPE$` | `[I6]` | Drawer (form type) number of freeform drawer A. |
| `FIELD$` | `[I4]` | Relative input field number in which the cursor is located. *(Windows/Linux/UNIX: max 255 fields. OS 2200: max 100 fields.)* |
| `FIELDN$` | | Field number relative to the beginning of the screen in which the cursor is located. |
| `FKEY$` | | Number of the function key pressed by the script user. |
| `FMT$` | `[I2]` | Format of the report on display (script must be registered as format sensitive). |
| `FPAGE$` | | Last explicitly called page of a Screen Control form. |
| `FRESTR$` | `[I6]` | Remaining available characters in the script string and array variable space. |
| `FRPT$` | `[I4]` | Report number of the Screen Control form on display. |
| `GLBSTR$` | | Available global variable space in bytes. Maximum size: 14,700 bytes. |
| `GRAPH$` | `[I1]` | Graphics terminal flag. Zero = terminal cannot display graphics. |
| `HLINES$` | | Number of held lines. |
| `ICVAR$` | `[S80]` | Input data entered on the control line (no leading tabs required; strings allowed). Used with CHD. |
| `INMSV$` | `[S80]` | Input data from the function mask on screen. Used with OUM. |
| `INPUT$` | | Input data from the screen or external source. Up to 80 variables and strings. Used with OUT, RRN, RUN, BR, SC. |
| `INSTR$` | | Input data from the screen or external source (line-based). Up to 80 variables and strings. Used with OUT, RRN, RUN, BR, SC. |
| `INVAR$` | | Input from tab-delimited input fields on screen. Up to 80 variables. Used with OUT or SC. |
| `INVR1$` | | Input from input fields on screen (multi-field into one variable). Up to 80 variables. Used with OUT or SC. |
| `IO$` | `[I12]` | Number of storage I/O requests processed during the script. |
| `IP$` | `[I12]` | Processing time consumed during a script, in milliseconds. |
| `LANG$` | `[I1]` | User's currently selected language number. |
| `LCAB$` | `[I4]` | Cabinet number of the user's currently selected language. |
| `LEVEL$` | `[H12]` | String identifying the current software level. Redefined with every product build. (Formerly `MAPER$`.) |
| `LIBDRW$` | | Drawer number of the System Library Routines. |
| `LINE$` | `[I8]` | Line number of the next line to read. Used with RDL, RLN. |
| `LINK$` | `[I1]` | Script started from another script via LNK. Nonzero = yes; zero = no. |
| `LITEM$` | `[I6]` | Line number in a list box from which the user transmitted. *(GI-BIS only)* |
| `LLP$` | `[I12]` | Number of logic lines processed during the script. |
| `LNKDRW$` | `[I6]` | Drawer number of the script that issued the LNK statement. |
| `LNKRPT$` | `[I4]` | Report number of the script that issued the LNK statement. |
| `LOOK$` | | *(OS 2200 only)* User interface in effect. `0` = Pre-35R1/Pre-35R1; `1` = Pre-35R1/Menu; `2` = Menu/Pre-35R1; `3` = Menu/Menu. |
| `LRRSD$` | | Local site identifier. *(OS 2200: `[I6]`. Windows/Linux/UNIX: `[A1]`.)* |
| `MAPNAM$` | | Name of the system. *(OS 2200: `[H6]`. Windows/Linux/UNIX: `[H14]`.)* |
| `MAXCAB$` | `[I4]` | Maximum cabinet number available on the system. |
| `MAXCHR$` | `[I6]` | Maximum number of characters (width) of a report. Individual drawers may define smaller values. |
| `MAXDRW$` | `[I6]` | Maximum drawer number available on the system. |
| `MAXEVR$` | `[I3]` | Maximum number of environmental variables allowed in the script. |
| `MAXGVR$` | `[I3]` | Maximum number of global variables allowed in the script. |
| `MAXLAB$` | `[I3]` | Maximum number of labels allowed in the script. |
| `MAXLIN$` | `[I9]` | Maximum number of lines (length) of a permanent report. Individual drawers may define smaller values. |
| `MAXLNS$` | `[I9]` | Maximum number of lines (length) of a result report. Individual drawers may define smaller values. |
| `MAXRNM$` | `[I9]` | Maximum number of renamed reports or results per script. |
| `MAXRPT$` | `[I4]` | Maximum report number available on the system. |
| `MAXRW$` | `[I3]` | Maximum number of characters (width) of a report. Individual drawers may define smaller values. |
| `MAXVAR$` | `[I3]` | Maximum number of variables allowed in a script. *(Windows/Linux/UNIX: includes 30 environmental and 70 global variables.)* |
| `MODE$` / `MODE1$` | | *(OS 2200 only)* If either is odd, the user cannot update reports manually. Scripts ignore `MODE1$` — only `MODE$` needs to be odd to prevent script updates. |
| `MSEC$` | `[I12]` | Current number of milliseconds since midnight. Resolution is hardware dependent. |
| `MSGQ$` | | Message queued for user (`USER$`) or station (`STNUM$`). `0` = no messages; `1` = messages queued. |
| `MXDEPN$` | `[I4]` | *(OS 2200 only)* Maximum number of departments. |
| `NET$` | `[I1]` | `0` = script running on local host; `1` = Network Remote (NRM) interactive session; `2` = Network Run (NRN) non-interactive session. |
| `NETDRW$` | `[I6]` | Drawer number of the Network Configuration drawer. |
| `NETOUT$` | | Network connection state following NRM. `0` = connection inactive; `1` = connection still active. |
| `NETRPT$` | `[I4]` | Report number of the Network Configuration report. |
| `NETSIT$` | | Network site identification letter. |
| `ODEPN$` | `[I4]` | Originating user's department sign-on number. Equals `DEPN$` if not in a network environment. *(FCS reports only.)* |
| `OLINE$` | `[I8]` | Number of the next line to write in the output area. |
| `OPRIV$` | `[I1]` | *(OS 2200 only)* User has operator privileges. Nonzero = yes; zero = no. |
| `ORSTAN$` | | Originating station number of a background script. *(Windows/Linux/UNIX: `[I5]`. OS 2200: size defined by HIGHST config parameter.)* |
| `ORUN$` | `[H12]` | Originating name of the executing script. If blank, session opened via MAPPER SYSSLCT. Equals `RUN$` if not in a network environment. *(FCS reports only.)* |
| `OSITE$` | `[H18]` | Originating name of the current site. Equals `SITE$` if not in a network environment. *(FCS reports only.)* |
| `OSFILS$` | | *(OS 2200 only)* `0` = external functions run with BIS background job credentials; `1` = run with OS 2200 user-id credentials. |
| `OSPLEN$` | `[I2]` | Maximum number of characters in an OS 2200 password (maximum 18). |
| `OSTNUM$` | `[I5]` | Originating station number executing the script. Zero if transient station (background, batch port, or negative). Equals `STNUM$` if not in a network environment. *(FCS reports only.)* |
| `OSUIDS$` | | Controls whether OS 2200 user-ids are allowed or required for BIS logon. `0` = irrelevant; `1` = allowed; `2` = required. |
| `OSUSER$` | | *(OS 2200 only)* `0` = user logged on with a non-OS 2200 user-id; `1` = logged on with an OS 2200 user-id. |
| `OSYSNAM$` | `[H5]` | Originating port identification name (5 characters). Blank if not all networked systems support originating site information. Check before using `OSITE$` or `OUSER$`. *(FCS reports only.)* |
| `OUSER$` | `[H11]` | Originating user-id of the user who started the script. Equals `USER$` if not in a network environment. *(FCS reports only.)* |
| `PLNG$` | | *(Windows/Linux/UNIX only)* Site's primary (default) language cabinet number. |
| `RPRIV$` | | *(OS 2200 only)* User has script design privileges (script errors, BLT, CLT, RDB). `0` = no privileges; nonzero = has privileges. |
| `RPT$` | `[I4]` | Number of the report or result last processed, or on display when the script started. `-0` = current result; `0` = no report. After ADR or DUP, contains the new report number. |
| `RRSID$` | `[I12]` | Remote script site-id. |
| `RSLANT$` | `[H1]` | Reverse slant character (`\`). |
| `RUN$` | `[H12]` | Name of the executing script. |
| `SCNH$` | `[I3]` | Number of columns displayable on the UTS terminal or GI-BIS main window, including those requiring scroll. |
| `SCNV$` | `[I2]` | Number of rows displayable on the UTS terminal or GI-BIS main window, including those requiring scroll. |
| `SCREEN$` | `[I3]` | Screen/session capabilities. *(Windows/Linux/UNIX: `006` if executed from ICE or Java EE Server. OS 2200: `000`–`005` = background/no screen variants; `100`–`103` = terminal types; `200`–`201` = workstation with/without repository.)* |
| `SECDRW$` | `[I6]` | Drawer number of the Security Registration reports. |
| `SECGRP$` | `[I3]` | User's security group number (1–200). |
| `SECRPT$` | `[I4]` | User's security registration report number. *(Windows/Linux/UNIX: reports 11–20. OS 2200: reports 1–2000.)* |
| `SECURE$` | `[I1]` | *(Linux/UNIX only)* Installation mode. `0` = Trusted Mode; `1` = Secure Mode. |
| `SGRACT$` | `[I2]` | Number of active reports in the Session Global Report Table. |
| `SGRMAX$` | `[I2]` | Maximum number of reports allowed in the Session Global Report Table. |
| `SITE$` | | Name of the current site. *(OS 2200: `[H8]`. Windows/Linux/UNIX: `[H14]`.)* |
| `SOE$` | `[H1]` | Start-of-entry (SOE) character. |
| `SOEH$` | `[I3]` | Horizontal cursor position of the SOE character. |
| `SOEV$` | `[I2]` | Vertical cursor position of the SOE character. |
| `SPRIV$` | `[I1]` | *(OS 2200 only)* User has system analyst privileges. Nonzero = yes; zero = no. |
| `STAT1$`–`STAT3$` | | Quantity or status reserved words. Contents defined per-statement in individual statement documentation. |
| `STAT4$` | | *(OS 2200 only)* Quantity or status reserved word. Contents defined per-statement. |
| `STNUM$` | | Station number executing the script. *(Windows/Linux/UNIX: `[I5]`. OS 2200: size defined by HIGHST start parameter.)* |
| `SYSNAM$` | `[H5]` | Platform identification code. `UNLNX` = Linux; `M1100` = OS 2200; `SUN_S` = UNIX (Sun SPARC); `PWNT0` = Windows. |
| `TAB$` | `[H1]` | Tab character (ASCII 011). |
| `TCCS$` | `[I4]` | *(OS 2200 only)* Terminal coded character set identifier (CCS-ID). |
| `TIC$` | `[H1]` | Apostrophe character. |
| `TIME$` | `[H8]` | Current time in `HH:MM:SS` format. |
| `TITLE$` | | Title of the current `-0` report, when present. |
| `TTYPE$` | `[H8]` | Terminal type of the station executing the script. *(Windows/Linux/UNIX: read from the configuration report or `MAPTERM` environment variable.)* |
| `USER$` | `[H11]` | User-id of the user who started the script. |
| `WEBBRK$` | `[I1]` | Current output area web script interpretation mode based on the last `@BRK` statement. `0` = normal mode; `1` = web script literal mode (outside delimiters); `2` = web script mode (inside delimiters). |
| `WND$` | `[I6]` | Main workstation window handle. *(GI-BIS and Windows Client only.)* |
| `WS$` | `[I1]` | Workstation session opened to a host system. Zero = not using GI-BIS or Windows Client. |
| `WSIPA$` | `[H15]` | IP address of the workstation in `xxx.xxx.xxx.xxx` format. Zero if not a workstation or address unavailable. *(GI-BIS and Windows Client only.)* |
| `WSITE$` | `[S26]` | Unique identifier string for each host system across all platforms. Used primarily for forming unique filenames for workstation objects. *(GI-BIS and Windows Client only.)* |
| `XDRW$` | `[I6]` | Drawer number of the run control report where the script aborted or failed. Used with RAR, RER. |
| `XERR$` | `[I6]` | Message number of the error encountered by an error routine (RER). |
| `XFUN$` | `[H6]` | Last function call before the script aborted or failed. Used with RAR, RER. |
| `XKEY$` | | Key or key sequence used to transmit. |
| `XLINE$` | `[I6]` | Line number in the run control report where the script aborted or failed. Used with RAR, RER. |
| `XRID$` | `[I4]` | Report number of the run control report where the script aborted or failed. Same as `XRPT$`. Used with RAR, RER. |
| `XRPT$` | `[I4]` | Report number of the run control report where the script aborted or failed. Used with RAR, RER. |
| `XSSBRK$` | | Current output area XSS encode interpretation mode based on the last `@BRK` statement. `0` = normal; `1` = XSS encoding active (outside delimiters); `H` = HTML encoding; `A` = Attribute encoding; `J` = JavaScript encoding; `C` = CSS encoding; `U` = URL encoding. |
| `XTYPE$` | `[I6]` | Drawer (form type) of the run control report where the script aborted or failed. Same as `XDRW$`. Used with RAR, RER. |
| `YEAR$` | `[I4]` | Current year in `YYYY` format. |
