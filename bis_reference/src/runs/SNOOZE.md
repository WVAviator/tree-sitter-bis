# SNOOZE — Snooze

> *2200 only*

## Overview

Use the `SNOOZE` command to return a received alarm message to the message queue and have it sent back to your station at a later time. The system delays the message for the amount of time you specify.

---

## Syntax

```
SNOOZE [time]
```

where `time` is the amount of time to delay the message. Enter a plain number for minutes, or follow a number with a unit suffix: `H` for hours, `D` for days, or `W` for weeks. Maximum delay = 52 weeks. Default = 1 hour.

---

## Examples

Defer the alarm message for one hour (default):

```
snooze
```

Send the message again in 30 minutes:

```
snooze 30
```

Send the message again in two and a half hours:

```
snooze 2.5h
```

Send the message again in two days:

```
snooze 2d
```
