# Mathematical Operators

## List of Mathematical Operators

The following table lists valid mathematical operators. Values `a` and `b` can be integers, real numbers, or expressions composed of integers and real numbers.

> *(2200 only)*
> - Maximum scientific notation (double precision) value able to be processed: `8.988465674312E307`
> - Minimum scientific notation (double precision) value able to be processed: `1.00000000000E-307`; however, the minimum output value is `0.0000000000000001`. The system does not output scientific notation values with a negative characteristic.

> *(Windows / Linux / UNIX)* The maximum and minimum double-float precision values that can be processed is determined by the operating system platform on which Business Information Server is running. Check your system documentation for the supported values.

| Operator | Description |
|----------|-------------|
| `+` | **Addition:** `a+b` |
| `-` | **Subtraction:** `a-b` |
| `/` | **Division:** `a/b` |
| `//` | **Integer division:** `a//b` — gives the unrounded integer portion of the dividend of `a` divided by `b`. |
| `*` | **Multiplication:** `a*b` — note that `(a)(b)` and `ab` are improper notations for multiplication. |
| `**` | **Exponentiation:** `a**b` — gives the result of `a` raised to the power of `b`. |
| `-` | **Unary minus:** `-a` — gives the negative of value `a`. |

---

## Priorities of Mathematical Operators

Operators are evaluated in the following order of precedence (highest to lowest):

| Priority | Operator(s) |
|----------|-------------|
| First | Unary minus (`-`) |
| Second | Exponentiation (`**`) |
| Third | Multiplication (`*`), Division (`/`), Integer division (`//`) |
| Fourth | Addition (`+`), Subtraction (`-`) |

Use parentheses to override default priority. For example:

- `4*3+2` is evaluated as `(4*3)+2 = 14`
- `4*(3+2)` is evaluated as `4*5 = 20`
