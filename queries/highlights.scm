; neovim.io/doc/user/treesitter

(stmt_prefix) @punctuation.delimiter

("," @punctuation.delimiter)
("-" @punctuation.delimiter)
("=" @operator)

(comment) @comment

(label) @label

(call) @keyword

(cabinet) @property
(drawer) @property
(report) @property
(data_name) @string

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
(character) @character

(keyword) @keyword.operator

