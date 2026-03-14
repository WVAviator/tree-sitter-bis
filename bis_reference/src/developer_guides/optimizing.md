# Optimizing Your Scripts

## Table of Contents

- [General Guidelines](#general-guidelines)
- [Guidelines on the Use of Specific Statements](#guidelines-on-the-use-of-specific-statements)
- [Guidelines for Loading Variables](#guidelines-for-loading-variables)
- [Guidelines for Updating Reports](#guidelines-for-updating-reports)
- [Guidelines for Improving Logic](#guidelines-for-improving-logic)
- [Script Registration Strategies](#script-registration-strategies)
- [Bringing Large Amounts of Data into Business Information Server](#bringing-large-amounts-of-data-into-business-information-server)

---

## General Guidelines

- Use a space-period-space (` . `) to terminate the logic scan of a statement. Place short comments after it to document your script.
- Place as many statements on one line as possible.
- If you use `DEFINE` and `INCLUDE` statements during development, use the [`BLT`](../runs/BLT.md) command to convert defined constants. Save the result in a separate report and use that for the production script. See *Using Predefined Constants*.
- Use the `BLT` command to build a label table even when not using `DEFINE` statements. This reduces overhead by allowing the script to jump directly to a label address rather than scanning the run control report.
- If possible, use an 80-character (or narrower) drawer for run control reports. Efficiency generally decreases as run control report width increases.
- With the [`@BRK`](../statements/BRK.md) statement, you can create an output area wider than 80 characters by specifying a wider drawer, then write to it using an [`@XQT`](../statements/XQT.md) statement with a continuation line or by using large variables.

> *(2200 only)* Choosing the right character set for your database can improve script performance. For standard column-formatted reports where lowercase characters are not required, use Full Character Set Upper (FCSU) instead of Full Character Set (FCS) — the system searches and sorts much more efficiently with FCSU.

---

## Guidelines on the Use of Specific Statements

- If `D` and `H` options are available for a command, use them whenever possible to eliminate detail and heading lines.
- Use [`@INC`](../statements/INC.md) or [`@DEC`](../statements/DEC.md) statements whenever possible to add and subtract numeric variables.
- Use an [`@ART`](../statements/ART.md) statement for complex equations only.
- Use a [`@CHG`](../statements/CHG.md) statement for simple arithmetic operations rather than `@ART` whenever possible.
- In [`@SRH`](../statements/SRH.md) statements, use the `B` option to stop a search after the first find when you know there is only one matching item.

> *(2200 only)* Use the `E` option to estimate the number of lines in the result if you expect the result to be larger than about 500 lines. This reserves space beforehand and avoids moving the result from a smaller to a larger area as the system builds it.

- Sort reports on the intended match fields before using a [`@MCH`](../statements/MCH.md) statement; otherwise, MCH sorts the data, matches it, and then sorts it again to restore the original order. Use the `P` or `Q` option when matching presorted data.
- Use a label with the `P` option so the script continues at another routine if data is unsorted. At that routine, sort the data and return to the `@MCH` statement.
- Use a [`@BFN`](../statements/BFN.md) statement to find a single item in a large report or drawer. Ensure the data is presorted on the search field(s). You can also use `@BFN` with the `K` option to verify ascending sort order — but use it with discretion on large databases, as it verifies every line.
- Use a [`@CAL`](../statements/CAL.md) statement instead of multiple [`@ART`](../statements/ART.md) and [`@TOT`](../statements/TOT.md) statements when performing several calculations. Use `@TOT` when only one calculation is needed.
- Use a [`@FDR`](../statements/FDR.md) statement followed by a [`@RLN`](../statements/RLN.md) statement instead of a [`@FND`](../statements/FND.md) and [`@RDL`](../statements/RDL.md) combination.
- Use a [`@CNT`](../statements/CNT.md) statement instead of [`@SOR`](../statements/SOR.md) and [`@TOT`](../statements/TOT.md) when computing subtotals. `@CNT` also offers additional advantages for analyzing and summarizing data.

---

## Guidelines for Loading Variables

- Define variables within statements rather than predefining a table of variables at the start of a script — predefining variables creates extra processing overhead.
- Use a [`@JUV`](../statements/JUV.md) statement instead of [`@CHG`](../statements/CHG.md) to justify the contents of variables that contain numbers.
- Use a [`@LDV`](../statements/LDV.md) statement instead of `@CHG` to load variables with data. Use `@LDV` to right-justify, left-justify, and center variables.
- Use the `P` option with `@LDV` rather than an `@IF`/`@CHG` loop to delete unnecessary leading or trailing spaces from variables.

---

## Guidelines for Updating Reports

- Write lines into results whenever possible. The [`@FND`](../statements/FND.md)/[`@WRL`](../statements/WRL.md) combination is more efficient than the [`@SRU`](../statements/SRU.md)/[`@TOT`](../statements/TOT.md) combination.
- Add multiple blank lines to a report when you need more data lines, then update the added lines. Either find a blank line and write it, or write into a heading line the line number of the next line to write or the last one written.
- Write spaces into existing lines instead of deleting them with [`@LN-`](../statements/LN-.md), so the software does not need to rewrite the entire report to mass storage.
- Enter `y` in the `ntuid?` subfield of the [`@WRL`](../statements/WRL.md) statement — it is 50% more efficient.
- Rename results instead of using pivot reports (reports created as accumulators in the script and deleted at the end).
- When creating results in the output area, include a heading divider line before the first data line. This prevents the system from scanning the result unnecessarily to locate the first data line when processing it in subsequent commands.

> *(2200 only)* Deferred updating (via [`@DFU`](../statements/DFU.md)) may cause extra lines to be processed and can increase response time compared to traditional [`@LOK`](../statements/LOK.md)/[`@WRL`](../statements/WRL.md) sequences. To minimize the impact:
> - Keep all reports as small as possible.
> - Limit the amount of time a report is locked.
> - Limit the number of `@WRL` statements to one or two if possible.
>
> **Note:** If you must use several `@WRL` statements on a report being accessed by other users, consider using the `ccpy` subfield in `@WRL`, which forces the system to write a complete copy of the report. While this may add I/O overhead, it can significantly reduce contention costs for other users accessing the same report.

---

## Guidelines for Improving Logic

- Put as many [`@IF`](../statements/IF.md), [`@GTO`](../statements/GTO.md), [`@CHG`](../statements/CHG.md), and [`@LDV`](../statements/LDV.md) statements as possible on one line, especially when used in a loop against an [`@RLN`](../statements/RLN.md) statement. Keep the most frequently used logic paths short.
- Loop on an [`@RLN`](../statements/RLN.md) statement rather than on an [`@RDL`](../statements/RDL.md) statement.

---

## Script Registration Strategies

- Have your system administrator place frequently used scripts near the beginning of the registration report.

> *(2200 only)*
> - If your department has several hundred scripts registered, have the administrator sort the registration report.
> - If multiple users are likely to execute your script, register it in the Master Script Registration department.

---

## Bringing Large Amounts of Data into Business Information Server

*(2200 only)*

When bringing large volumes of data from the batch environment into BIS, use one of the following methods to split the data into properly sized reports ahead of time:

- Use the `l` and `q` subfields in the [`@RET`](../statements/RET.md) statement to retrieve a specified number of records from a large file, transferring them into as many separate reports as necessary. Alternatively, store each report as a separate element in a program file and retrieve the elements one at a time.
- Instead of passing data in a `BPRUN$` command, start a script through the batch port that sends a message to your station when data is ready. Then manually retrieve the data from separate elements, or start a new script to retrieve it. This frees the batch port for other users.
- Use multiple Symbiont Output File Queuing (SYM) commands to bring in data one report at a time.
- Use an [`@RET`](../statements/RET.md) statement to retrieve data from the batch environment instead of passing it through the batch port. When using `@RET`, enter the expected number of lines in the `q` subfield to allocate sufficient storage space.
- In applications where you transfer identical data to the batch environment repeatedly, use an [`@ELT`](../statements/ELT.md) statement. `@ELT` transfers data directly to a program file where multiple batch jobs can access it.
