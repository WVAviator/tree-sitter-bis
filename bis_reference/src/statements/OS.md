# OS and @OS — Operating System Interface

*(Windows Server / Windows Client only)*

Executes native commands and programs on the host system.

---

## Control Line Syntax

```
OS [o cmd]
```

### Parameters

| Field | Required | Description |
|-------|----------|-------------|
| `o` | Optional | Options field. See [Options](#options). Enter options in lowercase. |
| `cmd` | Optional | Command to perform. The system uses standard path searching to find the command. Note that the system cannot determine whether the syntax is valid or if an error occurred — analyze the generated output to verify success. |

---

## Statement Syntax

```
@OS[,c,d,user,psw,lab] o '[cmd]' .
```

### Parameters

| Field | Platform | Required | Description |
|-------|----------|----------|-------------|
| `c,d` | All | Optional | Drawer into which the result is returned. See *Specifying Reports or Drawers to Process* for details. |
| `user` | Windows only | Optional | Windows Server user login. A remote user must provide a user ID and password. |
| `psw` | Windows only | Optional | Windows Server user password. |
| `lab` | All | Optional | Label to branch to if the command fails. |
| `o` | All | Required | Options field. See [Options](#options). Enter options in lowercase. If no options are specified, designate the field with `''`. |
| `cmd` | All | Optional | Command to perform. The system uses standard path searching. Enclose commands containing embedded spaces in apostrophes. If no command is specified, designate its position with `''`. |

---

## Options

| Option | Description |
|--------|-------------|
| `-d` | Executes the command using the `CMD.EXE` shell. Required for commands built into `CMD.EXE` (e.g. `DIR`). |
| `-f` | Always applied to `@OS`. Causes the command output to be returned as a result. If a file name immediately follows `-f`, the output is also placed into that file. |

> **Note:** When using both options, precede each with a hyphen and separate them with a space. Do not combine both on a single hyphen (e.g. use `-d -f`, not `-df`).

---

## Guidelines

Any command executed using `OS` must work correctly as a background program — there is no interactive connection to the command.

---

## Example

Obtain a directory listing and retrieve the output as a result, placing it in cabinet `0`, drawer `B`:

```
os -d -f dir c:\
```

Equivalent statement:

```
@os,0,b '-d -f' 'dir c:\' .
```

| Part | Description |
|------|-------------|
| `-d` | Uses `CMD.EXE` to access the `DIR` command |
| `-f` | Places the output in a temporary file and returns it as a result |
| `dir c:\` | Executes `DIR` in the root directory of the C drive |
