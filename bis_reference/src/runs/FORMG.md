# FORMG

## Overview

Generates experimental reports. Once an experimental report is completed, see the administrator to generate a drawer for the report.

---

## Control Line Format

```
FORMG
```

The script displays an input screen (FORMG worksheet) where you define field order, sizes, appearance in specific formats, acceptable character types, and field headings. You can also select fields from specific applications.

For help, enter `formg help` or press **F8** from within the script.

---

## Guidelines

- The FORMG worksheet accepts a variety of entries before it requires processing. For example, you can rearrange FN numbers, define some fields, accept fields from one or more applications, and pull information from specific fields within those applications — all before submitting the worksheet.
- Press **Show** to preview how the experimental report will appear in final form. The field with FN number `1` appears at the left; headings are displayed as they will exist in the report; the edit code for each field is shown below the heading divider line.
- The final six lines of the experimental report show which fields will be included in each format. A series of `X`s beneath a field means it will be included in that format. The first line of `X`s represents the first format, the second line the second format, and so on through the sixth format.
- You can define up to 99 fields.
