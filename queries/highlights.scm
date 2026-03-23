; neovim.io/doc/user/treesitter

(stmt_prefix) @punctuation.delimiter
(stmt_terminator) @punctuation.delimiter

("," @punctuation.delimiter)
("/" @punctuation.delimiter)
("-" @punctuation.delimiter)
("=" @operator)
("(" @punctuation.bracket)
(")" @punctuation.bracket)
("[" @punctuation.bracket)
("]" @punctuation.bracket)

(comment) @comment

(label) @label

(call) @keyword

(named_variable) @variable
(global_variable) @variable
(env_variable) @variable
(numbered_variable) @variable

(type) @type.builtin
(substring) @function.builtin
(array_index) @variable

(identifier) @attribute
(numeric_literal) @number
(string_literal) @string
(integer) @number
(float) @number.float
(character) @character
