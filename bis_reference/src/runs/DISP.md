# DISP

*(Windows / Linux / UNIX)*

The DISP run is used interactively within an RDB (Run Debugger) session. It provides controls for displaying reports, stepping through scripts, and managing execution flow.

> **Note:** When the script is suspended and waiting for input — as with a [`@DSP`](../statements/DSP.md) (Display Report), [`@INP`](../statements/INP.md) (Accept Input), or [`@OUT`](../statements/OUT.md) (Output) statement — the RDB utility disables all RDB buttons and does not re-enable them until input is supplied.

---

## RDB Controls

### DISP

Displays an input line where you type the name of the report or result to display (for example, `2b0` or `-0`). Press **Enter** to display it.

To locate a string in the displayed report:
1. Type the target string in the input line.
2. Press the **LOCATE** button.
3. To continue searching for the next occurrence, press the **spacebar**.

---

### NORM

Continues the script normally until one of the following occurs:
- The script encounters a breakpoint or an `RDB` statement.
- The script finishes.
- The script fails.

---

### QUIT

Terminates your RDB session.

---

### STRM

Sets **streaming mode**, which causes the script to execute one logic line at a time (or one statement at a time if the **STEP** button was previously clicked) in a scrolling, uninterrupted manner.

To stop streaming mode:
- If the script is waiting for input from the main window, click the **STRM** button. When the script resumes after accepting input, streaming mode will no longer be active.
- Make the main window your active window, then press **Esc**.
