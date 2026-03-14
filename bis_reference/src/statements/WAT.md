# @WAT — Wait

## Overview

Suspends the execution of a run, specifically useful in the following situations:

- While waiting for a message to be received (the message becomes the current `-0` result).
- To reduce system impact during extensive logic loops in a run.
- To hold an interim display (shown via `DSM`, `DSP`, `OUT`, or `SC`) on screen long enough to read it.

---

## Syntax

```
@WAT[,M,lab] ms .
```

### Parameters

| Field | Platform | Description |
|-------|----------|-------------|
| `M` | All | Suspends the run until an outstanding message is received or until the time specified by `ms` elapses. |
| `lab` | All | Label to go to if an outstanding message is received. The message becomes the current `-0` result. |
| `ms` | Windows / Linux / UNIX | Time in milliseconds to suspend the run. Specify an integer from `0` to `600000` (maximum 600 seconds). Wait time is expressed in milliseconds but performed in granularity of seconds. Example: `@WAT 1000 .` waits for 1 second. |
| `ms` | OS 2200 | Time in milliseconds to suspend the run. Specify an integer from `0` to `60000` (maximum 60 seconds). |

---

## Guidelines

- With the `M` option, the run stalls until an outstanding message is received or the wait time is reached. If a message is received and a label is specified, the run continues at the label. If no message is received within the wait time, the run continues at the next statement.
- Do not place any statements on the same line following `@WAT`. The logic scan of the line terminates after executing the statement.

---

## Example

Sends a message and suspends the run until a response is received, then continues at label `099`. If no response is received within 60 seconds, a message is displayed on screen.

```
@ ldv,c <nomsg>s80='Message not received' .  . Load msgs
@ ldv,c <error>s80='Problem with user-id or dept.' .
@020:snu,0,b,2,<user>,<dept>,,y,199 .         . Send a report
@ wat,m,099 60000 .                            . Wait for user to receive message
@ sc 'Q' tic,";msg,1,e,,"<nomsg>" .            . Display message
@ wat 4000 .                                   . Suspend run
@ rel .                                        . Release the screen
@099:                                          . Process the response
@ .                                            . (other processing based on response)
@ rel .                                        . Release the screen
@199:sc 'Q' tic,";msg,1,e,,"<error>" .         . Error routine
@ wat 4000 .                                   . Suspend run
@ rel .                                        . Release the screen
```
