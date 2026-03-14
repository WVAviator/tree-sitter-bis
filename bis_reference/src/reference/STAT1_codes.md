# Graphical Interface Returned Status Codes (STAT1$ Values)

Some workstation run commands are defined to use a label. If the run specifies a label on the statement and the command fails, a status code is returned in the `STAT1$` reserved word. The Workstation Client does not display a message box — the run continues at the label.

Affected statements: [`@BTN`](../statements/BTN.md), [`@FON`](../statements/FON.md), [`@HELP`](../statements/HELP.md), [`@PC`](../statements/PC.md), [`@PIC`](../statements/PIC.md), and [`@TIP`](../statements/TIP.md).

> **Note:** Messages may contain variable data (indicated by `<placeholder>` fields in the descriptions below).

---

## Status Codes

| Code | Description |
|------|-------------|
| 1 | The system failed to create a window. Probable cause: insufficient memory. |
| 3 | Invalid window number. Verify your statement variables. |
| 9 | Insufficient memory available. Terminate unused applications and try again. |
| 10 | Internal failure locking a memory handle. |
| 11 | Internal failure converting a memory location to a handle. |
| 12 | Internal failure attempting to release memory. |
| 15 | Insufficient memory available to enumerate all sizes for a font. |
| 21 | Internal error — host handle not assigned or out of range. |
| 26 | Internal failure — tried to lock a null or invalid global memory handle. |
| 34 | Request to read or write file `<file>` failed. Check filename and path name and try again. |
| 46 | Starting row or column must be greater than zero. |
| 47 | The column dimension `csiz` specification for a windows object exceeds the maximum of 500. |
| 50 | `@FON` statement failed. The font face name is too long to be valid. |
| 51 | Unable to create object (window property). Terminate unused applications and try again. |
| 52 | Unable to create window object. Memory exhausted. |
| 53 | Internal failure. Unable to get object information (window property). |
| 59 | `@FON` statement failed. Font `<name>` is not available. Specify a valid font. |
| 60 | `@FON` statement failed. Specify a valid font size. |
| 61 | The attempt to create that font failed. Most likely cause: low memory. |
| 62 | `@FON` statement failed. Font for main window must be a fixed-pitch font. |
| 64 | The main window font must not be italic. Please select a different font. |
| 66 | WindowPrint function failed. The run must specify a valid window handle to be printed. |
| 69 | Cannot determine the type of image from file name `<name>`. Specify a `.MGL`, `.BMP`, `.PCX`, `.JPG`, or `.GIF` file extension. |
| 75 | WindowPrint function failed. Enable your printer from the menu bar: File → Aux Print Disabled. |
| 78 | Business Information Server software or host application error (unknown RGE command). |
| 84 | System message queue could not be expanded. Terminate unused applications. |
| 85 | Kanji data is required. |
| 86 | `@FON` statement failed. Only 100 fonts can be active at a time. |
| 87 | `@BTN` statement failed. Specify a `0`, a WIN number, or a BTN number in the `vwh` field. |
| 89 | `@PIC` statement failed. Specify a `0`, a WIN number, or a PIC number in the `vwh` field. |
| 92 | BTN group box sent from Business Information Server is not supported by the Workstation Client. |
| 107 | Host generated handles mode has been disabled. Contact the Support Center with this example. |
| 112 | Internal error — blocking request error. Try again. |
| 119 | Alphabetic data is required. |
| 120 | Numeric data is required. |
| 121 | Close host session requested. Continue with the close? |
| 126 | Invalid or unsupported character sequence received from the host and will be ignored. |
| 128 | Unable to create `<directory>` directory. Use File Manager to create the directory. |
| 131 | No printer has been configured in Windows. Use Windows Setup to define your auxiliary printing device. |
| 133 | Unable to create a device context for the printer driver. Terminate unused applications and try again. |
| 136 | Unable to create Windows paint brushes. Terminate unused applications and try again. |
| 137 | PCW statement failed. Failed to write `<file>` file. |
| 140 | `<File>` Help is unavailable. The Winhelp request to file `<file>` failed. Error: `<description>`. Contact your `<name>` administrator for assistance. |
| 141 | `@PC` statement failed. File `<file>` not found. |
| 142 | `@PC` statement failed. Path `<path>` not found. |
| 150 | `<File>` Help is not installed. Contact your `<name>` administrator for assistance installing online help. |
| 151 | `<File>` Help is unavailable. Error opening registry key `HKLM\<path>`. Description: `<description>`. Contact your `<name>` administrator. |
| 152 | `<File>` Help is unavailable. Error opening helpfile `<name>`. Description: `<description>`. Contact your `<name>` administrator. |
| 153 | `<File>` Help is unavailable. Registry key `<key>` contains a filename with a length (`<length>`) exceeding the Windows filename maximum. Contact your `<name>` administrator. |
| 154 | The `<file>` helpfile could not be opened at the registry-specified location. Contact your `<name>` administrator to ensure your helpfile is current. Terminal operation will continue with a helpfile found in the install directory. |
| 156 | The column position/dimension limit for a windows object was exceeded. |
| 157 | The row position/dimension limit for a windows object was exceeded. |
| 158 | The column and row position/dimension limit for a windows object was exceeded. |
| 179 | `@FON` statement failed. `FON,R` can be called only once at the start of an application. |
| 184 | Warning: `<characters>` characters sent to printer; character count returned is `<count>`. |
| 193 | Unable to load library `<library>`. Please reinstall. *(Graphical Interface for BIS or BIS for Microsoft Windows Client)* |
| 196 | `@PC` statement failed. Unable to locate `COMMAND.COM`. |
| 200 | `@PC` statement failed. Application startup error. Start the application manually in Windows and try again. |
| 201 | Unable to start a timer. Terminate unused applications and restart your application. |
| 202 | `@PC` statement failed with `W` option (wait for application to close). No timer available. Terminate unused applications and try again. |
| 207 | PCR statement failed. Unable to list files in DOS path `<path>`. |
| 210 | Unable to find procedure in `<name>`. `<Name>` may be the wrong version. |
| 211 | Internal error — timer already active. |
| 214 | Unable to open or create repository object. |
| 223 | Non-zero HIWORD detected by `HWND_TO_USINT`. Contact the Support Center with this example. |
| 224 | Non-zero HIWORD detected by `USINT_TO_HWND`. Contact the Support Center with this example. |
| 228 | Unable to start Graphical Interface for Business Information Server communications component. |
| 288 | Error trying to eject to a new print page. Check your print and try again if required. |
| 289 | Error trying to place bitmap onto printer. Go to Windows paint program, capture the BMP to a file, and send this and printer information to support. |
| 323 | Illegal multi-character sequence. |
| 324 | The row-dimension `rsiz` specification for a windows object exceeds the maximum of 200. |
| 325 | The row-dimension `rsiz` specification exceeds the maximum of 200, and the column-dimension `csiz` specification for the same object exceeds the maximum of 500. |
| 407 | Internal error — invalid screen coordinate received from host. Report this situation to the support center. |
| 409 | Unable to open or create repository object for this user-id. |
| 500 | The creation of the Tool Tip control has failed. |
| 501 | Unable to add a Tool Tip to the Tool Tip control. |
| 503 | Tool Tips are not allowed for `@WIN` windows. |
| 504 | No data on the `@TIP` statement. |
| 505 | Data on the `@TIP` statement has an invalid format. |
| 506 | Tool Tip: Parent was not created by `@WIN` statement. |
| 507 | Tool Tip: Cannot access parent's Control Data. |
| 508 | `@PC` internal error: invalid data format. |
| 540 | `@ATR` statement failed. Font face name is too long to be valid. |
| 541 | `@ATR` statement failed. Font name `<name>` is invalid. Specify a valid font. |
| 542 | `@ATR` statement failed. Font size specification `<size>` is invalid. Font size must be `S`, `M`, `L`, or numeric. |
| 543 | `@ATR` statement failed. Font size specification `<size>` is invalid for face name `<name>`. |
| 550 | Unable to perform the operation. There seems to be an error with a directory or filename. |
| 2003 | No print or plot devices configured in Windows. |
| 2004 | Please select plotter from the list. |
| 2005 | Library `MBCSCONV.DLL` for multibyte character conversion is missing. |
| 2013 | Can't open file `<file>` to read. |
| 2014 | Can't determine size of file `<file>`. |
| 2016 | Can't read file `<file>`. |
| 2017 | Can't close file `<file>`. |
| 2018 | Can't open file `<file>` to write. |
| 2019 | Can't write to file `<file>`. |
| 2020 | Can't close file `<file>`. |
| 2026 | File `<file>` will be created. |
| 2027 | File `<file>` will be overwritten. |
| 2030 | Internal failure — tried to lock a null or invalid global memory handle. |
| 2031 | Insufficient memory available. Terminate unused applications and try again. |
| 2032 | Internal failure locking a memory handle. |
| 2033 | Internal failure attempting to release memory. |
| 2043 | Can't create font for Business Information Server Graphics. |
| 2047 | Business Information Server Graphics close window error (no data). |
| 2080 | Undefined command in string. |
| 2081 | Parameter out of range. |
| 2082 | Protocol ended without ZT. |
| 2083 | No ZI found in protocol. |
| 2084 | Extra ZI found in protocol. |
| 2085 | Text string exceeds limit. |
| 3101 | Internal failure — tried to lock a null or invalid global memory handle. |
| 3102 | Insufficient memory available. Terminate unused applications and try again. |
| 3103 | Internal failure locking a memory handle. |
| 3104 | Internal failure attempting to release memory. |
| 3105 | Can't open file `<file>`. |
| 3106 | Create palette failed. Terminate unused applications and try again. |
| 3107 | Unable to create bitmap. Please send `<file>` to Unisys support for analysis. |
| 3108 | Unable to create color palette for picture. Unknown color palette or bad picture. Please send `<file>` to Unisys support for analysis. |
| 3109 | Unable to read picture. Unknown picture format or bad picture. Please send `<file>` to Unisys support for analysis. |
| 3110 | Internal failure accessing data attached to picture window. |
| 3111 | Picture may be PCX format. File name `<name>` should have a `.PCX` extension. Continue with picture build? |
| 3112 | Picture may be BMP format. File name `<name>` should have a `.BMP` extension. Continue with picture build? |
| 3113 | Picture `<name>` is not a BMP. |
| 3116 | File of unknown picture format. Restore `<file>` from a backup. |
| 3144 | Unable to load `<file>`. Please install `<file>` from your installation disks. |
| 3151 | Unable to create file to write. Select a different file. |
| 4101 | Internal failure to obtain a device context for a device-independent bitmap. |
| 4102 | Insufficient memory available. Terminate unused applications and try again. |
| 4103 | Internal failure locking a memory handle. |
| 4104 | Internal failure attempting to release memory. |
| 4105 | Can't open file `<file>`. |
| 4106 | Error initializing Colorspace Tables. |
| 4107 | Error initializing Huffman Tables. |
| 4108 | Error initializing Quantizer Tables. |
| 4114 | Unsupported subsampling factor. |
| 4115 | Pixel size must be equal to 24. |
| 4116 | Pixel size must be equal to 8. |
| 5101 | Unable to open file `<file>`. |
| 5102 | Unable to determine file size of `<file>`. |
| 5103 | Internal failure — unable to allocate memory. |
| 5104 | Internal failure — unable to lock memory. |
| 5105 | Unable to read picture file `<file>`. |
| 5106 | Internal failure — unable to create stream. |
| 5107 | OleLoadPicture failed on file `<file>`. |
| 5108 | Internal failure — unable to get picture width. |
| 5109 | Internal failure — unable to get picture height. |
| 5110 | Internal failure — unable to get picture palette. |
| 5111 | Internal failure — unable to get picture handle. |
| 5112 | Unable to decode picture file `<file>`. Unsupported format or format variant. |
