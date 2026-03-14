
# CALENDAR

Use the **Calendar** run to display a two- or six-month calendar of any period. Useful when looking up dates while entering data in a report.

- **Report on display:** shows a two-month calendar (specified month + following month) above the report.
- **No report on display:** shows a six-month calendar (current or specified month + five following months).
- The current date is highlighted.

## Calendar Control Line Format

```
CALENDAR[,mmm,yyyy]
```

| Field | Description |
|---|---|
| `mmm` | First three letters of the month. Default = current month |
| `yyyy` | Year. Default = current year. Two-digit years 44–99 → add 1900; 00–43 → add 2000 (e.g. `44` = 1944, `43` = 2043) |

## Calendar Guidelines

- Calendar remains on display while you update and scroll the report.
- To remove: redisplay the report or type `h0` and transmit.
- Six-month calendar function bar: **Back** / **Ahead** (previous/next months); **Yr_Bk** / **Yr_Ahd** (same months previous/next year).

---
