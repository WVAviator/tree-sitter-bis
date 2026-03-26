; neovim.io/doc/user/treesitter

(stmt_prefix) @punctuation.delimiter
(stmt_terminator) @punctuation.delimiter

("," @punctuation.delimiter)
(";" @punctuation.delimiter)
("(" @punctuation.bracket)
(")" @punctuation.bracket)
("[" @punctuation.bracket)
("]" @punctuation.bracket)

(operator) @operator

(comment) @comment
(display_line) @string

(label) @label
(label_reference) @label
(goto_reference) @label

(call) @keyword

(reserved_word) @constant.builtin
(constant) @constant

(named_variable) @variable
(global_variable) @variable
(env_variable) @variable
(numbered_variable) @variable

(type) @type.builtin
(substring) @function.builtin
(array_index) @variable

(keyword) @keyword
(numeric_literal) @number
(string_literal) @string
(integer) @number
(float) @number.float
(character) @character

(option) @attribute
(js_function) @function
(subroutine_parameter) @variable.parameter
(report_reference) @variable.builtin
