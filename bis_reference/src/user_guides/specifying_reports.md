# Specifying Reports or Drawers to Process

Since BIS is based on a report and drawer structure, most commands require you to specify the report or drawer to process. This page describes how to do so — this information is not repeated for each individual command.

---

## Identifying Reports (Manual Functions)

When using manual functions, identify a report by entering one of the following:

| Input | Description |
|-------|-------------|
| `2B` | A report number and drawer letter — specifies a report in your current cabinet. |
| `2B0` | A report number, drawer letter, and cabinet number. |
| `Monthly` | A report name. See [NAME](../runs/NAME.md). |
| `-` | A minus sign — specifies the report or result currently on display. |

> **Note:** For security reasons, the administrator controls cabinet-number-based report access. If you have trouble accessing a report this way, contact your supervisor or administrator.

---

## Identifying Drawers (Manual Functions)

When using manual functions, identify a drawer by entering one of the following:

| Input | Description |
|-------|-------------|
| `B` | A drawer letter — specifies a drawer in your current cabinet. |
| `B0` | A drawer letter and cabinet number. See also the security note above. |
| `Orders` | A drawer name. See [NAME](../runs/NAME.md). |

---

## Specifying Reports and Drawers in Statements

Many statement formats contain a `c,d,r` field in which you specify the cabinet, drawer, and report to process. You may use the cabinet number, drawer letter, and report number, or a **data name**.

In some statements (such as `FND` and `SRH`), one or more of the `c,d,r` subfields are optional. If you enter `0` in the report (`r`) field, the system processes the entire drawer starting at report 1.

### Examples

Process report `1D0` using all three subfields:
```
@srh,0,d,1 '' 'cust code' |,amco .
```

Process all reports in a drawer using only the `c` (cabinet) and `d` (drawer) subfields:
```
@srh,0,b '' 'producttype' |,blackbox7 .
```

Use a report name (data name) in apostrophes:
```
@srh,'order status' '' 'cust code' |,amco .
```

> To specify a data name, use the name of a cabinet, drawer, or report as defined in the system directory, enclosed in apostrophes.

---

## Specifying Results

To access results, specify the **result identifier** in the appropriate subfields of a statement:

| Identifier | Description |
|------------|-------------|
| `-0` | The current result, or a report/result that was on display before the run started. Use `-0` until your run creates another result. |
| `-1` | A renamed result (example identifier). |
