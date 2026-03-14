# Namelist Overview

A Namelist contains the name of a definition report and a list of any combination of reports and drawers, including ranges. It is a logical collection of reports that can be processed with many BIS functions, generally producing a single result containing the combined output. A Namelist can include individual reports, ranges of reports, entire drawers, or cabinets.

---

## Defining a Namelist

A Namelist can be defined using any of the following methods:

- Use the [`NAME`](../runs/NAME.md) run to define a Namelist in the System Data Directory.
- Use the [`NAMELIST`](../runs/NAMELIST.md) script to define a Namelist for manual use.
- Use the [`@NAMLST`](../statements/NAMLST.md) statement to define a Namelist on an ad hoc basis for local use.
- Use the [`@NAMDMP`](../statements/NAMDMP.md) (Namelist Dump) statement to create a result showing the contents of a pre-defined Namelist in a readable form.

---

## Structure

A Namelist consists of two components:

### Definition Report

The Namelist Definition Report gives the Namelist its structure, defining the headers and fields that apply to all reports in the body. Any function that reads this Namelist creates its result in the drawer of the Definition Report, using the headers from the Definition Report.

Multiple Namelists can reference a single Definition Report.

### Body

The body of the Namelist includes all the data lines from all reports that are part of the Namelist, without internal divisions or boundaries. Generally, all reports should have the same line width as the Definition Report.
