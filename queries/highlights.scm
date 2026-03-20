; neovim.io/doc/user/treesitter

(stmt_prefix) @punctuation.delimiter

(statement "," @punctuation.delimiter)
(statement "=" @operator)

(comment) @comment

(label) @label

(call) @keyword

(report) @property

(options) @attribute.builtin

(field) @string.special.path

(line_type) @character.special

(parameter) @string.regexp

(named_variable) @variable
(global_variable) @variable
(env_variable) @variable
(numbered_variable) @variable

(type) @type.builtin
(substring) @function.builtin
(array_index) @variable

(stmt_terminator) @punctuation.delimiter

(string) @string
(integer) @number
(float) @number.float
(delimiter) @character.special

(keyword) @keyword.operator

