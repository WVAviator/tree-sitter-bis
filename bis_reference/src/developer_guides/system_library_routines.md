# System Library Routines

System Library Routines are common routines that can be called from any application executing on a Graphical Interface Workstation. They are stored in the Library Routines drawer. The `LIBDRW$` reserved word allows an application to call a library routine without knowing the location of the Library drawer.

Library routines adapt to any application by accepting various parameters on their call statements.

## Table of Contents

- [ABOUT](#about)
- [ACCESS](#access)
- [BROWSE](#browse)
- [DATES](#dates)
- [DIFDATE](#difdate)
- [DIFDATR](#difdatr)
- [DynaBIS](#dynabis)
- [GIUPDATE](#giupdate)
- [HELP](#help)
- [JVS MSG](#jvs-msg)
- [NETERR](#neterr)
- [SELECT](#select)
- [SYSTEM](#system)
- [UNISYS](#unisys)
- [VALIDATE](#validate)

---

## ABOUT

Displays a window showing the name and version of your application. Once displayed, provides easy access to the SYSTEM screen or to the Unisys web page.

### Call Syntax

```
@CALL,LIBDRW$,005 0001* ('MyApp','MyVersion')    .Call ABOUT
```
or
```
@CALL,"LIB$ABOUT" 0001* ('MyApp','MyVersion')    .Call ABOUT
```

### Parameters

| Parameter | Description |
|-----------|-------------|
| `MyApp` | A constant or variable defining your application name. Appears as the Application Name on the ABOUT screen. |
| `MyVersion` | A constant or variable defining your application version. Appears as the Application Version on the ABOUT screen. |

### Example

```
@LDV,p <MyApp>s20=APPLICATION .   Define your Application Name
@LDV,p <MyVersion>h12=01.234 .    Define your Application Version
@.
@CALL,LIBDRW$,005 0001* (<MyApp>,<MyVersion>) .  Call ABOUT
```

---

## ACCESS

Allows an application to be registered to access all cabinets and drawers while still maintaining security by checking the user's cabinet/drawer access at execution time.

> **Note:** The call statements using `LIB$ACCESS` are available only on the OS 2200 platform.

The application can use either traditional cabinet security or drawer security as defined by the Security Registration reports.

> **Note:** All users must be registered either in the cabinet access report (2G208) or the drawer security reports (G202/G2) for this routine to function correctly.

### Call Syntax

**Cabinet Security** *(2200 only)*

```
@CALL,LIBDRW$,002  0001* (*<usr>,*<dpn>,*<cab>,<sta>) .
```
or
```
@CALL,"LIB$ACCESS" 0001* (*<usr>,*<dpn>,*<cab>,<sta>) .
```

**Drawer Security**

```
@CALL,LIBDRW$,002  0003* (*<usr>,*<dpn>,*<cab>,<sta>,*<drw>,*<sec>,<sta>) .
```
or
```
@CALL,"LIB$ACCESS" 0003* (*<usr>,*<dpn>,*<cab>,<sta>,*<drw>,*<sec>,<sta>) .
```

### Parameters

| Parameter | Description |
|-----------|-------------|
| `<usr>` | A valid Business Information Server user-id. |
| `<dpn>` | Department number (1 to the value of `MAXRPT$`). |
| `<cab>` | Cabinet number (0 to the value of `MAXCAB$`). Even = Read/Write access; Odd = Read Only access. |
| `<sta>` | Returned status: `0`, `1`, or `2`. |
| `<drw>` | Drawer letter (`A` to `I`, or blank for cabinet switch access). |
| `<sec>` | *(2200 only)* `"0"` to check 2G208; `"1"` to check `SECDRW$` (G202 or G2). |

### Example

```
@LDV, w <usr>h11 = User-id
@LDV, w <dpn>i04 = Dept Number
@LDV, w <cab>i04 = Cabinet Number
@LDV    <sta>i01 = Zero
@CALL,LIBDRW$,002  0001* (*<usr>,*<dpn>,*<cab>,<sta>) .
@IF <sta> eq 0, (good),1,(IndexError),2,(SecurityViolation) ; .
```

```
@LDV, w <usr>h11 = User-id
@LDV, w <dpn>i04 = Dept Number
@LDV, w <cab>i04 = Cabinet Number
@LDV, w <drw>h01 = Drawer Letter
@LDV    <sec>i01 = "1" to check SECDRW$ (G202 or G2)
@LDV    <sta>i01 = Zero
@CALL,LIBDRW$,002  0003* (*<usr>,*<dpn>,*<cab>,<sta>,*<drw>,*<sec>,<sta>) .
@IF <sta> eq 0, (good),1,(IndexError),2,(SecurityViolation) ; .
```

---

## BROWSE

Allows a user to browse a client's PC file system and return either a folder path name or a complete file name.

### Call Syntax

```
@CALL,LIBDRW$,101  0001* (<MyFile>,<MyStatus>i3)    .Call BROWSE
```
or
```
@CALL,"LIB$BROWSE" 0001* (<MyFile>,<MyStatus>i3)    .Call BROWSE
```

### Parameters

| Parameter | Description |
|-----------|-------------|
| `<MyFile>` | A variable that optionally contains a path or file name used as the starting point for the BROWSE dialog. Also returns the user-selected path or file name to the calling script. |
| `<MyStatus>i3` | Returns a status from the BROWSE routine. A non-zero status indicates the dialog was terminated in error and `<MyFile>` may not be valid. |

### Example

```
@LDV,w <MyFile>s256='C:'RSLANT$ .  Define Complete Path Name
@.
@CALL,LIBDRW$,101 0001* (<MyFile>,<MyStatus>i3) .  Call BROWSE
@IF <MyStatus> ne 0,(0199) ; .  Check Returned Status
@.
@. ----- User Selected FILE <MyFile> -----
```

---

## DATES

Allows you to select a valid date from a list of available dates based on the calling parameters. All dates are passed and returned in `DATE11$` format (`YYYYMMDD`).

### Call Syntax

```
@CALL,LIBDRW$,127 0001* ('MyApp',<MyDate>,'Min','Max',<MyStatus>i3)
```
or
```
@CALL,"LIB$DATES" 0001* ('MyApp',<MyDate>,'Min','Max',<MyStatus>i3)
```

### Parameters

| Parameter | Description |
|-----------|-------------|
| `MyApp` | A constant or variable defining your application name. Appears as the caption on the Help screen and any error messages. |
| `<MyDate>` | A variable optionally defining a date as the initial value for the Date dialog (blank defaults to today's date). Also returns the user-selected date to the calling script. |
| `Min` | A constant or variable defining the minimum selectable date (blank defaults to `16000101`). |
| `Max` | A constant or variable defining the maximum selectable date (blank defaults to `22991231`). |
| `<MyStatus>i3` | Returns a status from the DATES routine. A non-zero status indicates the dialog was terminated in error and `<MyDate>` may not be valid. |

### Example

```
@LDV,p <MyApp>s20=APPLICATION . Define your Application Name
@LDV,w <MyDate>i8=DATE11$ .     Define Default Date as Today
@DC d11=TODAY-365 <Min>i8 .     Minimum is One Year Ago
@DC d11=TODAY+365 <Max>i8 .     Maximum is One Year Out
@.
@CALL,LIBDRW$,127 0001* (<MyApp>,<MyDate>,<Min>,<Max>,<MyStatus>i3) . Call DATES
@IF <MyStatus> ne 0,(0199) ; .  Check Returned Status
@.
@. ----- User Selected DATE <MyDate> -----
```

---

## DIFDATE

Calculates the difference in time between two dates passed as parameters. Returns the difference as total days and as a breakdown of years, months, and days.

> **Notes:**
> - If you have more than one pair of dates to calculate, consider using [DIFDATR](#difdatr), which uses report processing instead of parameter processing.
> - The difference between input dates can go forward or backward in time, but there can be a significant difference between the two directions when working with the last few days of a month.

### Call Syntax

```
@CALL,LIBDRW$,125 0001*  (<date1>,<date2>,<days>i8,<y>i4,<m>i2,<d>i2)
```
or
```
@CALL,"LIB$DIFDATE" 0001*  (<date1>,<date2>,<days>i8,<y>i4,<m>i2,<d>i2)
```

### Parameters

| Parameter | Direction | Description |
|-----------|-----------|-------------|
| `<date1>` | Input | Beginning date (`YYYYMMDD`). Blank defaults to today's date. |
| `<date2>` | Input | Ending date (`YYYYMMDD`). Blank defaults to today's date. |
| `<days>i8` | Output | Positive or negative total number of days between `<date1>` and `<date2>`. Asterisks indicate an error. |
| `<y>i4` | Output | Absolute number of years difference. Asterisks indicate an error. |
| `<m>i2` | Output | Absolute number of months difference. Asterisks indicate an error. |
| `<d>i2` | Output | Absolute number of days difference. Asterisks indicate an error. |

### Example

```
@LDV,w <date1>i8=20050101 . Beginning date (YYYYMMDD)
@LDV,w <date2>i8=20051231 . Ending    date (YYYYMMDD)
@CALL,LIBDRW$,125 0001*  (<date1>,<date2>,<days>i8,<y>i4,<m>i2,<d>i2) .
```

Expected output for the above dates:

```
Beginning Date = 20050101
Ending    Date = 20051231
-----------------------------
   Total Days = 364
        Years =   0
       Months =  11
         Days =  30
```

---

## DIFDATR

Uses report processing to calculate the difference in time between two date fields in a report. The difference is written back into a third field in the same report.

> **Notes:**
> - `DIFDATR` processes only tab code lines.
> - If you have only one pair of dates to calculate, consider using [DIFDATE](#difdate), which uses parameter processing.
> - The beginning date must be earlier in time than the ending date.
> - The difference is returned in `YYYYMMDD` form (zero-filled years, months, days). This resembles `DATE11$` format but cannot be used as a valid date, as any portion may be zero. Returned asterisks indicate an error condition.

### Call Syntax

```
@CALL,LIBDRW$,126 0001*  (<StartField>,<EndField>,<AnswerField>)
```
or
```
@CALL,"LIB$DIFDATR" 0001*  (<StartField>,<EndField>,<AnswerField>)
```

### Parameters

| Parameter | Description |
|-----------|-------------|
| `<StartField>` | A constant or variable defining the field containing beginning dates. |
| `<EndField>` | A constant or variable defining the field containing ending dates. |
| `<AnswerField>` | A constant or variable defining the field that will receive the calculated difference. |

A `-0` report (or result) must be passed on the call statement and must contain the field names defined in the parameter values.

### Example

```
@BRK,FFTYPE$ .                                 . Create a Result
*  BEG   .  END   .  DIF   .
*========.========.========.
20050101 20051231
20050101 20060101
20050101 20040101
@BRK .                                         . Pass -0 Result
@CALL,LIBDRW$,126 0001* ('BEG','END','DIF') .
@DSX,-0 .                                      . Display Result
```

Expected result:

```
*  BEG   .  END   .  DIF   .
*========.========.========.
20050101 20051231 00001130
20050101 20060101 00010000
20050101 20040101 ********
```

---

## DynaBIS

The DynaBIS (Dynamic Business Information Server Table Reader) routine converts tabled object definitions into executable Graphical Interface statements. The Table Reader builds the statements but does not execute them — the calling script executes them after control is returned. The result is a Graphical Interface window ready to be used by your business application.

> All System Library routines call DynaBIS internally to create their Graphical Interface screens.

### Call Syntax

```
@CALL,LIBDRW$,003   0001* ('MyTable','MyFont','MyParent',<MyStatus>i3)
```
or
```
@CALL,"LIB$DYNABIS" 0001* ('MyTable','MyFont','MyParent',<MyStatus>i3)
```

### Parameters

| Parameter | Description |
|-----------|-------------|
| `MyTable` | A constant or variable defining a report containing your tabled object definitions. Can be a name (e.g. `ABOUT`), a report (e.g. `11c200`), or a result (e.g. `-0`). **Note:** `MyTable` and `MyFont` cannot both be `-0`. |
| `MyFont` | A constant or variable defining a report containing your font definitions. Can be a name (e.g. `UniFont`), a report, or a result. For most applications, `'UniFont'` works fine. |
| `MyParent` | *(Optional)* A constant or variable containing an external window handle for parenting a child window. Leave blank if `MyTable` does not contain child windows with external parents. |
| `<MyStatus>i3` | Returns a status from the DynaBIS Table Reader. A non-zero status indicates the object table could not be built. |

### Example

```
@IF SYSNAM$(1-1) eq 'M' LDV <MyTable>h9=11c206 ; .  2200 BIS
@IF SYSNAM$(1-1) ne 'M' LDV <MyTable>h9=11c006 ; .  Non-2200 BIS
@.
@CALL,LIBDRW$,003 0001* (<MyTable>,'UniFont','',<MyStatus>i3) .  Call DynaBIS
@IF <MyStatus> ne 0,(0199) ; . Check Returned Status
@.
@RNM -16 .            Rename your Graphical Interface statements
@RSR,-16 0100 .       Execute your Graphical Interface statements
@.
@SHW,<WIN001> .       Show your Graphical Window
@INP,<BTNOK1>,,<WIN001> .  Set Focus and Wait for User Input
```

---

## GIUPDATE

Checks the level of the currently installed Graphical Interface for Business Information Server. If a new version is available, it is downloaded and installed.

### Call Syntax

```
@CALL,LIBDRW$,009    0001* (<nochk>)    . Check client level
```
or
```
@CALL,"LIB$GIUPDATE" 0001* (<nochk>)    . Check client level
```

### Parameters

| Parameter | Description |
|-----------|-------------|
| `<nochk>` | `0` — Conditionally start the installation routine (checks `NET$`, PowerClient, `APILVL$`, and DoNotAsk first). `1` — Unconditionally start the installation routine (used by the GIUPDATE script). |

### Example

```
@LDV <nochk>i1=0 .                      . Conditional installation
@CALL,LIBDRW$,009    0001* (<nochk>)    . Check client level
```

---

## HELP

Displays application information within a List box approximately 60 characters wide.

### Call Syntax

```
@CALL,LIBDRW$,008 0001* ('MyApp','MyHelp')  .Call HELP
```
or
```
@CALL,"LIB$HELP"  0001* ('MyApp','MyHelp')  .Call HELP
```

### Parameters

| Parameter | Description |
|-----------|-------------|
| `MyApp` | A constant or variable defining your application name. Appears as the caption on the list box. |
| `MyHelp` | A constant or variable defining a report containing your help text. Can be a report (e.g. `5c200`) or a result (e.g. `-0`). |

### Example

```
@LDV,p <MyApp>s20=APPLICATION . Define your Application Name
@IF SYSNAM$(1-1) eq 'M' LDV <MyHelp>h9=1c206 ; . 2200 BIS
@IF SYSNAM$(1-1) ne 'M' LDV <MyHelp>h9=1c006 ; . Non-2200 BIS
@.
@CALL,LIBDRW$,008 0001* (<MyApp>,<MyHelp>) .  Call HELP
```

---

## JVS MSG

*(2200 only)*

Provides the ability to process a large JavaScript error message. JavaScript error messages are large and contain Line Feed characters.

### Call Syntax

```
@CALL,LIBDRW$,011  0001* (<jvsmsg>,<dsp>,<sta>i3)  .
```
or
```
@CALL,"LIB$JVSMSG" 0001* (<jvsmsg>,<dsp>,<sta>i3)  .
```

### Parameters

| Parameter | Description |
|-----------|-------------|
| `<jvsmsg>` | JavaScript message text (900 characters). |
| `<dsp>` | Display option. `0` — return the message as a multi-line result with Line Feed characters removed (**Note:** `-0` is destroyed). `1` — display the message in a Graphical Interface message box or screen control form. |
| `<sta>i3` | Returned status. `0` = good; non-zero = error. |

### Example

```
@RER 0199.                               .  Register Error
@CALL,"JVS_Name" JVS_Function('data')    .  Call JavaScript
@.
@0199 LSM,XERR$ <jvsmsg>sMAXCHR$  .      .  Get Message Text
@     LDV <dsp>i1=1 .                    .  Set Parameter
@     CALL,LIBDRW$,11  0001  (<jvsmsg>,<dsp>,<sta>i3) .
@     IF <sta> ne 0,(ErrLab) ; .         .  Returned status
```

---

## NETERR

Converts the `<nercod>` from an `@NET` command that took an error label into a localized error text message.

> **Note:** This routine is not available on Business Information Server for ClearPath OS 2200.

### Call Syntax

```
@CALL,LIBDRW$,0012    0001 (<nercod>,<nertxt>s80)
```
or
```
@CALL,"LIB$NETERR" 0001  (<nercod>,<nertxt>s80)
```

### Parameters

| Parameter | Description |
|-----------|-------------|
| `<nercod>` | Input variable taken from the output of a failed [`@NET`](../statements/NET.md) command when it takes the error label. |
| `<nertxt>` | Returns the localized string describing the reason for the `@NET` failure. The return string is centered in an 80-character field. |

### Example

```
@NET,themap,,mapcoord,2,,,,0001 ,<nercod>i5         . @net fails to label 001
@REL .                                              . @net completed. Ok.
@0001:CALL,LIBDRW$,012 0001  (<nercod>,<rettxt>s80) . Failed. Find reason.
@DSP,edrw$,erid$,,,,,,<rettxt>
@REL .                                              . Done
```

---

## SELECT

Allows the user to select either a cabinet/drawer or a cabinet/drawer/report from an available list, based on the user's configured security report and security group.

### Call Syntax

**Cabinet/Drawer:**

```
@CALL,LIBDRW$,102  0001* (<MyCab>,<MyDrw>,'MyRw',<MyStatus>i3) .
```
or
```
@CALL,"LIB$SELECT"  0001* (<MyCab>,<MyDrw>,'MyRw',<MyStatus>i3) .
```

**Cabinet/Drawer/Report:**

```
@CALL,LIBDRW$,102  0003* (<MyCab>,<MyDrw>,<MyRpt>,'MyRw',<MyStatus>i3) .
```
or
```
@CALL,"LIB$SELECT" 0003* (<MyCab>,<MyDrw>,<MyRpt>,'MyRw',<MyStatus>i3) .
```

### Parameters

| Parameter | Description |
|-----------|-------------|
| `<MyCab>` | Optionally defines an initial cabinet number for the dialog. Returns the user-selected cabinet number. |
| `<MyDrw>` | Optionally defines an initial drawer letter for the dialog. Returns the user-selected drawer letter. |
| `<MyRpt>` | *(Cabinet/Drawer/Report only)* Optionally defines an initial report number. Returns the user-selected report number. |
| `MyRw` | Read/write preference: `R` = Read-only drawers; `W` = Write-access drawers; `RW` = Either. |
| `<MyStatus>i3` | Returns a status. Non-zero indicates the dialog was terminated in error and returned values may not be valid. |

**Return Statuses:**

| Status | Description |
|--------|-------------|
| `000` | Good status |
| `099` | Application error (old MPC level) |
| `100` | User has no cabinet/drawer permissions |
| `101` | User has a bad security report |
| `102` | User has no drawer access |

### Example

```
@LDV,p <MyCab>i4=0 .  Define your Cabinet Number
@LDV,p <MyDrw>h1=B .  Define your Drawer Letter
@LDV,p <MyRpt>i4=1 .  Define Highlighted Report
@LDV,p <MyRw>h2=RW .  Define Read/Write Preference
@.
@CALL,LIBDRW$,102 0003* (<MyCab>,<MyDrw>,<MyRpt>,<MyRw>,<MyStatus>i3) . Call SELECT
@IF <MyStatus> ne 0,(0199) ; . Check Returned Status
@.
@. ----- User Selected CAB=<MyCab>, DRW=<MyDrw>, RPT=<MyRpt> -----
```

---

## SYSTEM

Displays system information about Business Information Server. Once displayed, provides easy access to the Unisys web page.

No parameters are passed on the call statement.

### Call Syntax

```
@CALL,LIBDRW$,006  0001* () .       .Call SYSTEM
```
or
```
@CALL,"LIB$SYSTEM" 0001* () .       .Call SYSTEM
```

---

## UNISYS

Displays the Unisys web page in an Internet browser.

No parameters are passed on the call statement.

### Call Syntax

```
@CALL,LIBDRW$,007  0001* () .       . Call Web Page
```
or
```
@CALL,"LIB$UNISYS" 0001* () .       . Call Web Page
```

---

## VALIDATE

Checks the current level of the client's Graphical Interface workstation against a specified capability bit.

### Call Syntax

```
@CALL,LIBDRW$,010    0001* ('MyApp','DwCapBit',<MyStatus>i3) .
```
or
```
@CALL,"LIB$VALIDATE" 0001* ('MyApp','DwCapBit',<MyStatus>i3) .
```

### Parameters

| Parameter | Description |
|-----------|-------------|
| `MyApp` | A constant or variable defining your application name. Used to personalize any error messages. |
| `DwCapBit` | A constant or variable defining the `DWCAP$` bit to check. Allowable bits: `13` to `18`. |
| `<MyStatus>i3` | Returns a status. Non-zero indicates the client does not support the capabilities defined by the specified `DWCAP$` bit. |

**Return Statuses:**

| Status | Message | Description |
|--------|---------|-------------|
| `0` | *(none)* | Good status |
| `1` | `Bad Table` | Internal error — contact your administrator |
| `2` | `MSGE02` | Requires a Graphical Interface client |
| `3` | `MSGE03` | Requires features not supported in PowerClient |
| `4` | `MSGE04` | Client Graphical Interface must be upgraded |
| `5` | `MSGE05` | User abort |

### Example

```
@LDV,p <MyApp>s20=APPLICATION . Define your Application Name
@LDV,p <DwCapBit>i2=13 .        Define your DWCAP$ Bit
@.
@CALL,LIBDRW$,010 0001* (<MyApp>,<DwCapBit>,<MyStatus>i3) . Call VALIDATE
@IF <MyStatus> ne 0,(0199) ; . Check Returned Status
@.
@. ----- Script can execute all functions that require DWCAP$(13-1) -----
```
