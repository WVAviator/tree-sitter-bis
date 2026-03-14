# Analyzing and Debugging Your Scripts

## Table of Contents

- [Methods You Can Use to Debug Scripts](#methods-you-can-use-to-debug-scripts)
- [Analyzing Scripts with the LOG Statement](#analyzing-scripts-with-the-log-statement)
- [Generating Diagnostic Reports on Your Scripts](#generating-diagnostic-reports-on-your-scripts)

---

## Methods You Can Use to Debug Scripts

Debugging is an important step in creating a script. Any errors in the statements must be corrected for the script to perform as intended. The following methods are available:

### Interactive Debugging

When a script stops due to an error, a one-line system message and the failing statement line appear at the top of the screen. This technique works well for simple errors such as an incorrect drawer or a missing comma.

With the script on display, correct the erring line, move the cursor to the next line, and press transmit. The change is saved to your run control report. Execute the script again to test the correction.

### Online Help System

When a script stops due to an error, a system message is displayed on the control line. Press the **Help** key for more information about the error. From there, press **Help** again for more detailed documentation, or press the **Return** function key to return to the run control report where the error occurred.

### Checkpoint Displays

If your script has several stages of processing, add [`@DSP`](../statements/DSP.md) statements to display intermediate results and verify that previous statements executed correctly. If you write your script in modules, you can test each module individually with a checkpoint display. Remove the checkpoint displays once debugging is complete.

### Run Debug (RDB)

The [`@RDB`](../statements/RDB.md) statement lets you debug your script while it executes. It is available within the Graphical Interface; on BIS for 2200, debugging can be initiated from any user terminal. If the Business Information Server Developer Workshop is running on your workstation and you initiate the script from the Graphical Interface, the debugging session starts in the Developer Workshop.

`@RDB` can be used to debug both native BIS scripts and JavaScript-based scripts. For JavaScript scripts, BIS initiates a debugging session through the Developer Workshop. The Developer Workshop is also started if a [`@CALL`](../statements/CALL.md) statement invokes a registered JavaScript subroutine — to debug the subroutine, click the **STEP** button when the cursor is on the `@CALL` statement.

Unlike interactive debugging, `@RDB` allows you to:

- Watch or change the value of any variable
- Examine reports and results
- Set breakpoints to interrupt execution at specified locations

### JavaScript Debugging

You can use the `debug()` object method in a JavaScript session to initiate a debugging session with the Business Information Server Developer Workshop. Method arguments let you control where and when debugging is initiated. See the JavaScript Developer's Help for details.

### Register Error Routine (@RER)

Use the [`@RER`](../statements/RER.md) statement to register an error subroutine that captures pertinent information when a script fails — such as the system message number, the failing function call, and the line number.

---

## Analyzing Scripts with the LOG Statement

The [`@LOG`](../statements/LOG.md) statement lets you log statements as they execute, which is useful for analyzing script behavior.

You can also use Subroutine Logging (`SUB`) to write a log entry whenever any of the five subroutine calls or returns are executed.

To use the `@LOG` statement:

1. Include a `@LOG` statement in your script.
2. When your script reaches the end of the run control report or executes a `@GTO END` statement, resume to display the LOG result.

> **Note:** Remove the `@LOG` statement from your run control report after final debugging is complete.

---

## Generating Diagnostic Reports on Your Scripts

The `@DIAG` statement is an internal diagnostic tool for evaluating native scripts. It generates reports containing one or more of the following:

- General script information
- Call stack information
- All available diagnostic information

`@DIAG` can be placed within error routines in your scripts to help analyze the cause of an error.
