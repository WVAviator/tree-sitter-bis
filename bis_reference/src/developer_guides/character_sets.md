# Character Sets and Sorting Orders

## Table of Contents

- [ASCII Character Set](#ascii-character-set)
- [Fieldata (Limited Character Set)](#fieldata-limited-character-set)
- [Using the C(S) Option](#using-the-cs-option)
- [Character Set Processing](#character-set-processing)
- [Coded Character Sets](#coded-character-sets)

---

## ASCII Character Set

| Character | Octal | Decimal | Hex |
|-----------|-------|---------|-----|
| Tab | 11 | 9 | 09 |
| Space | 40 | 32 | 20 |
| ! | 41 | 33 | 21 |
| " | 42 | 34 | 22 |
| # | 43 | 35 | 23 |
| $ | 44 | 36 | 24 |
| % | 45 | 37 | 25 |
| & | 46 | 38 | 26 |
| ' | 47 | 39 | 27 |
| ( | 50 | 40 | 28 |
| ) | 51 | 41 | 29 |
| * | 52 | 42 | 2A |
| + | 53 | 43 | 2B |
| , | 54 | 44 | 2C |
| - | 55 | 45 | 2D |
| . | 56 | 46 | 2E |
| / | 57 | 47 | 2F |
| 0 | 60 | 48 | 30 |
| 1 | 61 | 49 | 31 |
| 2 | 62 | 50 | 32 |
| 3 | 63 | 51 | 33 |
| 4 | 64 | 52 | 34 |
| 5 | 65 | 53 | 35 |
| 6 | 66 | 54 | 36 |
| 7 | 67 | 55 | 37 |
| 8 | 70 | 56 | 38 |
| 9 | 71 | 57 | 39 |
| : | 72 | 58 | 3A |
| ; | 73 | 59 | 3B |
| < | 74 | 60 | 3C |
| = | 75 | 61 | 3D |
| > | 76 | 62 | 3E |
| ? | 77 | 63 | 3F |
| @ | 100 | 64 | 40 |
| A | 101 | 65 | 41 |
| B | 102 | 66 | 42 |
| C | 103 | 67 | 43 |
| D | 104 | 68 | 44 |
| E | 105 | 69 | 45 |
| F | 106 | 70 | 46 |
| G | 107 | 71 | 47 |
| H | 110 | 72 | 48 |
| I | 111 | 73 | 49 |
| J | 112 | 74 | 4A |
| K | 113 | 75 | 4B |
| L | 114 | 76 | 4C |
| M | 115 | 77 | 4D |
| N | 116 | 78 | 4E |
| O | 117 | 79 | 4F |
| P | 120 | 80 | 50 |
| Q | 121 | 81 | 51 |
| R | 122 | 82 | 52 |
| S | 123 | 83 | 53 |
| T | 124 | 84 | 54 |
| U | 125 | 85 | 55 |
| V | 126 | 86 | 56 |
| W | 127 | 87 | 57 |
| X | 130 | 88 | 58 |
| Y | 131 | 89 | 59 |
| Z | 132 | 90 | 5A |
| [ | 133 | 91 | 5B |
| \ | 134 | 92 | 5C |
| ] | 135 | 93 | 5D |
| ^ | 136 | 94 | 5E |
| _ | 137 | 95 | 5F |
| ` (grave accent) | 140 | 96 | 60 |
| a | 141 | 97 | 61 |
| b | 142 | 98 | 62 |
| c | 143 | 99 | 63 |
| d | 144 | 100 | 64 |
| e | 145 | 101 | 65 |
| f | 146 | 102 | 66 |
| g | 147 | 103 | 67 |
| h | 150 | 104 | 68 |
| i | 151 | 105 | 69 |
| j | 152 | 106 | 6A |
| k | 153 | 107 | 6B |
| l | 154 | 108 | 6C |
| m | 155 | 109 | 6D |
| n | 156 | 110 | 6E |
| o | 157 | 111 | 6F |
| p | 160 | 112 | 70 |
| q | 161 | 113 | 71 |
| r | 162 | 114 | 72 |
| s | 163 | 115 | 73 |
| t | 164 | 116 | 74 |
| u | 165 | 117 | 75 |
| v | 166 | 118 | 76 |
| w | 167 | 119 | 77 |
| x | 170 | 120 | 78 |
| y | 171 | 121 | 79 |
| z | 172 | 122 | 7A |
| { | 173 | 123 | 7B |
| \| | 174 | 124 | 7C |
| } | 175 | 125 | 7D |
| ~ | 176 | 126 | 7E |

---

## Fieldata (Limited Character Set)

*(2200 only)*

| Character | Fieldata Internal Octal Code |
|-----------|------------------------------|
| @ | 00 |
| Space | 05 |
| A | 06 |
| B | 07 |
| C | 10 |
| D | 11 |
| E | 12 |
| F | 13 |
| G | 14 |
| H | 15 |
| I | 16 |
| J | 17 |
| K | 20 |
| L | 21 |
| M | 22 |
| N | 23 |
| O | 24 |
| P | 25 |
| Q | 26 |
| R | 27 |
| S | 30 |
| T | 31 |
| U | 32 |
| V | 33 |
| W | 34 |
| X | 35 |
| Y | 36 |
| Z | 37 |
| ) | 40 |
| - | 41 |
| + | 42 |
| ? | 43 |
| = | 44 |
| < | 45 |
| > | 46 |
| $ | 47 |
| * | 50 |
| ( | 51 |
| % | 52 |
| : | 53 |
| ^ | 54 |
| ! | 55 |
| , (comma) | 56 |
| \ | 57 |
| 0 | 60 |
| 1 | 61 |
| 2 | 62 |
| 3 | 63 |
| 4 | 64 |
| 5 | 65 |
| 6 | 66 |
| 7 | 67 |
| 8 | 70 |
| 9 | 71 |
| ' (apostrophe) | 72 |
| ; | 73 |
| / | 74 |
| . (period) | 75 |

---

## Using the C(S) Option

When you use a command **without** the `C(S)` option, the system treats lowercase and uppercase characters as equivalent. For example, when sorting a report, `a` and `A` are treated as the same value.

When you use the **`C(S)` option**, the report is sorted in strict ASCII code order — uppercase and lowercase are treated separately.

This also affects range searches. For example, a range search from `a` to `z` without options returns both `a`–`z` and `A`–`Z`. With `C(S)`, uppercase `A`–`Z` are excluded from that result.

> *(2200 only)* The following information applies only to FCS reports.

### Sort Order With the C(S) Option

*(Windows / Linux / UNIX)*

Characters are listed in sort order from first to last:

`Tab` `Space` `!` `"` `#` `$` `%` `&` `'` `(` `)` `*` `+` `,` `-` `.` `/` `0` `1` `2` `3` `4` `5` `6` `7` `8` `9` `:` `;` `<` `=` `>` `?` `@` `A` `B` `C` `D` `E` `F` `G` `H` `I` `J` `K` `L` `M` `N` `O` `P` `Q` `R` `S` `T` `U` `V` `W` `X` `Y` `Z` `[` `\` `]` `^` `` _ `` `` ` `` `a` `b` `c` `d` `e` `f` `g` `h` `i` `j` `k` `l` `m` `n` `o` `p` `q` `r` `s` `t` `u` `v` `w` `x` `y` `z` `{` `|` `}` `~`

### Sort Order Without the C(S) Option

*(Windows / Linux / UNIX)*

Characters are listed in sort order from first to last (uppercase and lowercase letters are interleaved as equivalent):

`Tab` `Space` `!` `"` `#` `$` `%` `&` `'` `(` `\` `*` `+` `,` `-` `.` `/` `0` `1` `2` `3` `4` `5` `6` `7` `8` `9` `:` `;` `=` `@` `a/A` `b/B` `c/C` `d/D` `e/E` `f/F` `g/G` `h/H` `i/I` `j/J` `k/K` `l/L` `m/M` `n/N` `o/O` `p/P` `q/Q` `r/R` `s/S` `t/T` `u/U` `v/V` `w/W` `x/X` `y/Y` `z/Z` `[` `\` `]` `^` `` _ `` `` ` ``

---

## Character Set Processing

*(2200 only)*

Business Information Server for OS 2200 processes both Fieldata and ASCII character sets. Certain characters used as control characters in report processing cannot be used as data.

### LCS, FCS, and FCSU

| Name | Description |
|------|-------------|
| **LCS** (Limited Character Set) | The Fieldata character set used in BIS. |
| **FCS** (Full Character Set) | The ASCII character set used in BIS. |
| **FCSU** (Full Character Set Upper) | FCS data stored and processed in uppercase alphabetic characters only. |

The character set of a drawer is determined when the drawer is generated. To see which character set a report is in, use the Line Zero command.

### Character Hierarchy

The hierarchy (the ordering relationship between characters) differs between LCS and FCS, since the system processes data according to its underlying Fieldata or ASCII codes.

For example, in **LCS**, numeric characters have higher values than alphabetic characters — so alphabetic characters sort before numerics. In **FCS**, alphabetic characters have higher values — so numerics sort before alphabetics.

Keep these differences in mind when processing drawers that use different character sets.

### Using the C(x) Option

By default, commands process characters according to their native code order. With some commands, you can use the `C(x)` option to override this:

| Option | Description |
|--------|-------------|
| `C(F)` | Process using Full Character Set (ASCII) order. |
| `C(L)` | Process using Limited Character Set (Fieldata) order. |
| `C(S)` | Process using strict character order, treating uppercase and lowercase differently. |

### Using C(L) and C(F) When Matching Across Character Sets

When a command processes reports in different character sets, use `C(F)` or `C(L)` to ensure a consistent hierarchy. This is especially important when pre-sorting reports for use with the `P` option of the Match command.

- If the **receiving** report is LCS and the **issuing** report is FCS → sort the issuing report with `C(L)`.
- If the **issuing** report is LCS and the **receiving** report is FCS → sort the issuing report with `C(F)`.

### LCS Sort Order by C(x) Option

Characters listed in ascending sort order:

| Basic / Sorted C(L) or C(S) | Sorted FCS C(S) | Sorted FCS C(F) |
|-----------------------------|-----------------|-----------------|
| @ | @ | Tab |
| Tab | Tab | Space |
| Space | Space | ! |
| A | A | $ |
| B | B | % |
| C | C | & |
| D | D | ' |
| E | E | ( |
| F | F | ) |
| G | G | * |
| H | H | + |
| I | I | , |
| J | J | - |
| K | K | . |
| L | L | / |
| M | M | 0 |
| N | N | 1 |
| O | O | 2 |
| P | P | 3 |
| Q | Q | 4 |
| R | R | 5 |
| S | S | 6 |
| T | T | 7 |
| U | U | 8 |
| V | V | 9 |
| W | W | : |
| X | X | ; |
| Y | Y | < |
| Z | Z | = |
| ) | ) | > |
| - | - | ? |
| + | + | @ |
| < | < | A |
| = | = | B |
| > | > | C |
| & | & | D |
| $ | $ | E |
| * | * | F |
| ( | ( | G |
| % | % | H |
| : | : | I |
| ? | ? | J |
| ! | ! | K |
| , | , | L |
| \ | \ | M |
| 0 | 0 | N |
| 1 | 1 | O |
| 2 | 2 | P |
| 3 | 3 | Q |
| 4 | 4 | R |
| 5 | 5 | S |
| 6 | 6 | T |
| 7 | 7 | U |
| 8 | 8 | V |
| 9 | 9 | W |
| ' | ' | X |
| ; | ; | Y |
| / | / | Z |
| . | . | \ |

### FCS Sort Order by C(x) Option

Characters listed in ascending sort order:

| Basic / Sorted C(F) | Sorted C(S) | Sorted C(L) |
|---------------------|-------------|-------------|
| Tab | Tab | @ |
| Space | Space | Tab |
| ! | ! | [ |
| " | " | ] |
| # | # | # |
| $ | $ | Space |
| % | % | A, a |
| & | & | B, b |
| ' | ' | C, c |
| ( | ( | D, d |
| ) | ) | E, e |
| * | * | F, f |
| + | + | G, g |
| , | , | H, h |
| - | - | I, i |
| . | . | J, j |
| / | / | K, k |
| 0 | 0 | L, l |
| 1 | 1 | M, m |
| 2 | 2 | N, n |
| 3 | 3 | O, o |
| 4 | 4 | P, p |
| 5 | 5 | Q, q |
| 6 | 6 | R, r |
| 7 | 7 | S, s |
| 8 | 8 | T, t |
| 9 | 9 | U, u |
| : | : | V, v |
| ; | ; | W, w |
| < | < | X, x |
| = | = | Y, y |
| > | > | Z, z |
| ? | ? | ) |
| @ | @ | - |
| A, a | A | + |
| B, b | B | < |
| C, c | C | = |
| D, d | D | > |
| E, e | E | & |
| F, f | F | $ |
| G, g | G | * |
| H, h | H | ( |
| I, i | I | % |
| J, j | J | : |
| K, k | K | ? |
| L, l | L | ! |
| M, m | M | , |
| N, n | N | \ |
| O, o | O | 0 |
| P, p | P | 1 |
| Q, q | Q | 2 |
| R, r | R | 3 |
| S, s | S | 4 |
| T, t | T | 5 |
| U, u | U | 6 |
| V, v | V | 7 |
| W, w | W | 8 |
| X, x | X | 9 |
| Y, y | Y | ' |
| Z, z | Z | ; |
| [ | [ | \ |
| \ | \ | . |
| ] | " | " |
| _ | - | _ |
| { | A | { |
| \| | B | \| |
| } | C | } |
| ~ | D | ~ |

---

## Coded Character Sets

*(2200 only)*

When creating files using the [`@ELT`](../statements/ELT.md) statement, you can specify a CCS-ID in the Character Set field of the Element input screen or the `cs` subfield. The CCS-ID is stored in the created file so that applications can detect and process the character set appropriately.

When retrieving a file using the [`@RET`](../statements/RET.md) statement, `STAT3$` contains the CCS-ID.

| Coded Character Set | Identifier |
|---------------------|------------|
| Fieldata | 0 |
| ASCII/ISO (Unknown 7/9 bit) | 1 |
| ASCII/APL | 2 |
| EBCDIC | 3 |
| Binary | 4 |
| Untyped (application dependent) | 5 |
| Column Binary | 6 |
| Operating System Reserved | 7 |
| Customer Reserved | 8–13 |
| Hangul | 14 |
| Hanzi | 15 |
| JIS | 16 |
| ISO 646 US | 17 |
| ISO 646 Norway/Denmark | 18 |
| ISO 646 France | 19 |
| ISO 646 German | 20 |
| ISO 646 UK | 21 |
| ISO 646 Italy | 22 |
| ISO 646 Spain | 23 |
| ISO 646 Sweden | 24 |
| ISO 646 Finland | 25 |
| ISO 646 Canada | 26 |
| ISO 646 Netherlands | 27 |
| ISO 646 Portugal | 28 |
| ISO Reserved | 29–32 |
| Customer Reserved | 33–34 |
| ISO 8859.1 | 35 |
| ISO 8859.2 | 36 |
| ISO 8859.3 | 37 |
| ISO 8859.4 | 38 |
| ISO 8859.5 | 39 |
| ISO 8859.6 | 40 |
| ISO 8859.7 | 41 |
| ISO 8859.8 | 42 |
| ISO 8859.9 | 43 |
| ISO 8859.10 | 44 |
| French/Arabic | 45 |
| Katakana | 46 |
| BICS | 47 |
| ISO Reserved | 48–50 |
| General Reserved (FUTURE) | 51–61 |
| Alternate Location (FUTURE) | 62 |
| ACD | 63 |
