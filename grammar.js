/**
 * @file Unisys Business Information Systems, also known as MAPPER.
 * @author Alexander Durham <wvaviator@gmail.com>
 * @license MIT
 */

import { ALL_CALLS, ALL_RESERVED_WORDS } from "./constants.js";

function ci(str) {
  return new RegExp(
    str
      .split("")
      .map((c) =>
        /[a-zA-Z]/.test(c) ? `[${c.toLowerCase()}${c.toUpperCase()}]` : c,
      )
      .join(""),
  );
}

const IMPLEMENTED_CALLS = new Set([
  "LDV",
  "SRH",
  "SRU",
  "GTO",
  "INC",
  "DEC",
  "IF",
]);

function get_calls() {
  return ALL_CALLS.filter((call) => !IMPLEMENTED_CALLS.has(call)).map(ci);
}

/**
 * Matches a delimited list that may end early.
 */
const delimited_content = (delim, ...args) => {
  if (args.length === 1) return args[0];
  return seq(
    args[0],
    optional(seq(delim, delimited_content(delim, ...args.slice(1)))),
  );
};

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "bis",
  // Whitespace not included in extras because it is significant for separating tokens
  extras: ($) => [$.separator],
  rules: {
    source_file: ($) => repeat($._line),

    _line: ($) => choice($.statement, $._blank_line, $.display_line),
    separator: ($) => seq(/\\/, optional($.comment), /\s*/),
    _blank_line: ($) => /\n/,
    display_line: ($) =>
      prec(-1, seq(/[^@]/, repeat(choice($._variable, /[^\n]/)), /\n/)),

    // Statements are instructions entered into a run control report starting at line 3, forming a script.
    // Every statement line begins with `@` and follows this general format:
    //
    // @label:call,report options fields line-type,\ parameters variables . comment

    statement: ($) =>
      seq(
        $.stmt_prefix,
        optional($.label),
        repeat(" "),
        choice(repeat($._contents), $.if),
        $.stmt_terminator,
        optional($.comment),
      ),

    stmt_prefix: ($) => token("@"),

    // `label` A number identifying the statement line.
    // Use three or four-character, zero-filled labels (e.g., `@0003`) for easier script maintenance.
    label: ($) => token(seq(/\d{3,4}/, optional(":"))),
    label_reference: ($) => token(/\d{3,4}/),

    // `call` The function call — an abbreviation for the operation name.
    // All calls stored in constants.js and mapped through case-insensitive function
    call: ($) => token(choice(...get_calls())),

    // The semicolon is allowed to appear before the terminator in IF statements, but otherwise it is space-period-space.
    stmt_terminator: ($) => token("."),

    comment: (_) => prec(-1, seq(/[^\n]+/, /\n/)),

    _contents: ($) =>
      choice($.ldv, $.srh, $.sru, $.gto, $.inc, $.dec, $._generic_statement),

    _generic_statement: ($) =>
      prec(-1, seq($.call, choice(",", " "), repeat(seq($.stmt_group, " ")))),

    stmt_group: ($) =>
      choice(
        seq($._stmt_item, repeat(seq(",", optional($._stmt_item)))),
        seq(
          ",",
          seq(optional($._stmt_item), repeat(seq(",", optional($._stmt_item)))),
        ),
      ),

    _stmt_item: ($) =>
      repeat1(
        choice(
          $._variable_definition,
          $.reserved_word,
          $.numeric_range,
          $.keyword,
          $.string_literal,
          $.numeric_literal,
          $.integer,
          $.float,
          $.operator,
          $.character,
        ),
      ),

    // Basic Tokens

    numeric_literal: ($) => token(/[0-9]+/),
    numeric_range: ($) =>
      seq(
        choice($._variable, $.numeric_literal),
        "-",
        choice($._variable, $.numeric_literal),
      ),
    identifier: ($) => token(/[A-Za-z][A-Za-z0-9]+/),
    string_literal: ($) =>
      token(choice(seq("'", /[^']*/, "'"), seq('"', /[^"]*/, '"'))),
    keyword: ($) =>
      token(
        choice(
          seq(/[Ll][Ii][Nn]/, optional(choice("-", "+")), /[0-9]+/),
          /[Ee][Nn][Dd]/,
          /[Rr][Pp][Xx]/,
        ),
      ),

    integer: ($) => token(choice(/\d+/, /\d+[Ee]\-?\d+/)),
    float: ($) => token(choice(/\d*\.\d+/, /\d*\.\d+[Ee]\-?\d+/)),
    operator: ($) => token(choice(/[=+\-/*]/, /\*\*/, /\/\//)),
    character: ($) => token(prec(-1, /[^\s.,]/)),

    line_type: ($) => token(choice("|", "*", ".", /[A-Za-z]/, /\$[TtAaBb]/)),

    // Essentially a RHS to an expression
    _value_definition: ($) =>
      choice(
        $.string_literal,
        $.integer,
        $.float,
        $._variable_definition,
        $.reserved_word,
        $.constant,
      ),

    expression: ($) =>
      seq(
        $._value_definition,
        optional(" "),
        $.operator,
        optional(" "),
        $._value_definition,
      ),

    // Variables

    named_variable: ($) => token(seq("<", /[^>]{1,12}/, ">")),
    global_variable: ($) => token(seq("<*", /[^>]{1,12}/, ">")),
    env_variable: ($) => token(seq("<$", /[^>]{1,12}/, ">")),
    numbered_variable: ($) => token(seq(/[Vv]/, /\d{1,3}/)),

    type: ($) =>
      token(prec(2, seq(/[afhiosAFHIOS]/, /\d{1,3}/, optional(/\.\d{1,2}/)))),
    substring: ($) => seq("(", $.numeric_range, ")"),
    array_index: ($) => seq("[", optional($.numeric_literal), "]"),

    reserved_word: ($) =>
      token(seq(choice(...ALL_RESERVED_WORDS.map(ci)), "$")),

    constant: ($) => token(/[A-Za-z]+[A-Za-z0-9]*/),

    _variable: ($) =>
      choice(
        $.named_variable,
        $.global_variable,
        $.env_variable,
        $.numbered_variable,
      ),
    _variable_definition: ($) =>
      prec.left(
        2,
        seq(
          choice(
            $.named_variable,
            $.global_variable,
            $.env_variable,
            $.numbered_variable,
          ),
          optional($.type),
          optional($.array_index),
          optional($.substring),
        ),
      ),

    _variable_assignment: ($) =>
      seq($._variable_definition, "=", $._value_definition),

    _variable_assignment_delimited: ($) =>
      seq(
        $._variable_assignment,
        ",",
        $.numeric_literal,
        optional($.delimiter),
      ),

    // Common Groupings by Multiple Commands

    // Delimiters are used like this in LDV for extracting report columns
    delimiter: ($) => seq("(", $.character, ")"),

    // Represents a cdr (cabinet-drawer-report) location
    // Can be just a report name, drawer name with report, or all three named or unnamed
    address: ($) =>
      choice(
        field("report", $.string_literal),
        seq(
          field("drawer", $.string_literal),
          ",",
          field("report", choice($.string_literal, $.numeric_literal)),
        ),
        seq(
          field("cabinet", choice($.string_literal, $.numeric_literal)),
          ",",
          field(
            "drawer",
            choice($.string_literal, alias(/[A-Fa-f]/, $.identifier)),
          ),
          ",",
          field("report", choice($.string_literal, $.numeric_literal)),
        ),
      ),

    // Many commands have options which are sequences of characters
    option: ($) => /[A-Za-z@/]/,

    // Column character positions
    field: ($) => choice($.string_literal, $.numeric_range),

    // Search parameters list
    search_param: ($) =>
      seq(optional($.line_type), repeat1(seq(",", optional($._parameter)))),

    _parameter: ($) =>
      choice(
        $._variable,
        $.string_literal,
        alias(/[A-Za-z0-9@]+/, $.identifier),
      ),

    // Specific calls

    // LDV - Load Variables

    ldv: ($) => choice($._ldv_fmt1_fmt2, $._ldv_fmt3),

    // In practice it would seem that you can mix and match fmt1 and fmt2
    _ldv_fmt1_fmt2: ($) =>
      seq(
        $._ldv_call,
        optional(seq(",", repeat1($._ldv_base_options))),
        " ",
        choice($._variable_definition, $._variable_assignment),
        repeat(
          seq(",", choice($._variable_definition, $._variable_assignment)),
        ),
        " ",
      ),
    _ldv_fmt3: ($) =>
      seq(
        $._ldv_call,
        seq(
          ",",
          repeat($._ldv_base_options),
          alias(/[Qq]/, $.option),
          repeat($._ldv_base_options),
        ),
        " ",
        $._variable_assignment_delimited,
        repeat(seq(",", $._variable_assignment_delimited)),
        " ",
      ),
    _ldv_call: ($) => alias(/[Ll][Dd][Vv]/, $.call),
    _ldv_base_options: ($) => alias(/[CHLOPRUWZchlopruwz]/, $.option),

    // SRH and SRU - Search Records

    srh: ($) =>
      seq(
        alias(/[Ss][Rr][Hh]/, $.call),
        ",",
        alias($._srh_report, $.address),
        " ",
        optional(seq(repeat1(alias($._srh_option, $.option)), " ")),

        $.field,
        repeat(seq(",", $.field)),
        " ",
        $.search_param,
        repeat(seq("/", $.search_param)),
        " ",
        optional(
          seq(
            delimited_content(
              ",",
              optional($._variable_definition),
              optional($._variable_definition),
              $._variable_definition,
            ),
            " ",
          ),
        ),
      ),

    sru: ($) =>
      seq(
        alias(/[Ss][Rr][Uu]/, $.call),
        ",",
        alias($._srh_report, $.address),
        " ",
        optional(seq(repeat1(alias($._srh_option, $.option)), " ")),

        $.field,
        repeat(seq(",", $.field)),
        " ",
        $.search_param,
        repeat(seq("/", $.search_param)),
        " ",
        optional(
          seq(
            delimited_content(
              ",",
              optional($._variable_definition),
              optional($._variable_definition),
              $._variable_definition,
            ),
            " ",
          ),
        ),
      ),

    _srh_report: ($) =>
      choice(
        field("report", $.string_literal),
        seq(
          field("drawer", $.string_literal),
          ",",
          field("report", choice($.string_literal, $.numeric_literal)),
        ),
        seq(
          field("cabinet", choice($.string_literal, $.numeric_literal)),
          ",",
          field(
            "drawer",
            choice($.string_literal, alias(/[A-Fa-f]/, $.identifier)),
          ),
          ",",
          delimited_content(
            ",",
            optional(
              field("report", choice($.string_literal, $.numeric_literal)),
            ),
            optional(field("start_line", $.numeric_literal)),
            optional(field("num_lines", $.numeric_literal)),
            field("missing_goto", $.label_reference),
          ),
        ),
      ),

    _srh_option: ($) =>
      choice(
        seq(/[@]/, "(", $.character, ")"),
        seq(/[LlUu]/, "(", $.line_type, ")"),
        seq(/[TtYy]/, optional(seq("(", $.line_type, ")"))),
        seq(/[Cc]/, "(", /[FfLlSs]/, ")"),
        seq(/[Ee]/, "(", $.numeric_literal, ")"),
        seq(/[BbQq]/, optional(seq("(", $.numeric_literal, ")"))),
        seq(
          /[Rr]/,
          choice($.numeric_range, $.numeric_literal),
          repeat(seq(",", choice($.numeric_range, $.numeric_literal))),
        ),
        /[AaDdFfHhNnPpSs@/]/,
      ),

    // GTO Statement

    gto: ($) =>
      seq(
        alias(/[Gg][Tt][Oo]/, $.call),
        " ",
        choice(
          choice($.label_reference, $._variable),
          delimited_content(
            ",",
            alias(/[Ee][Nn][Dd]/, $.keyword),
            optional(choice($.numeric_literal, $._variable)),
            optional(choice($.numeric_literal, $._variable)),
            choice($.numeric_literal, $._variable),
          ),
          seq(
            alias(/[Ll][Ii][Nn]/, $.keyword),
            optional(choice("+", "-")),
            field("line_count", $.numeric_literal),
          ),
          seq(
            alias(/[Rr][Pp][Xx]/, $.keyword),
            " ",
            field("report", choice($.numeric_literal, $.string_literal)),
          ),
        ),
        " ",
      ),

    // INC Statement

    inc: ($) =>
      seq(
        alias(/[Ii][Nn][Cc]/, $.call),
        optional(
          seq(",", choice($._variable, $.integer, $.float, $.reserved_word)),
        ),
        " ",
        $._variable,
        repeat(seq(",", $._variable)),
        " ",
      ),

    // DEC Statement

    dec: ($) =>
      seq(
        alias(/[Dd][Ee][Cc]/, $.call),
        optional(
          seq(",", choice($._variable, $.integer, $.float, $.reserved_word)),
        ),
        " ",
        $._variable,
        repeat(seq(",", $._variable)),
        " ",
      ),

    // IF Statement

    if: ($) => choice($._if_basic),

    condition: ($) =>
      seq($._if_basic_statement, " ", repeat(seq($._if_basic_statement, " "))),
    branch: ($) => repeat1($._contents),

    _if_basic: ($) =>
      seq(
        $.condition,
        $.branch,
        ";",
        choice(
          seq(" ", repeat($._if_basic_statement), $.branch),
          optional(" "),
        ),
      ),

    _if_call: ($) => alias(/[Ii][Ff]/, $.call),

    _if_basic_statement: ($) =>
      seq(
        $._if_call,
        optional(seq(",", repeat1($._if_option))),
        " ",
        alias($._if_expression, $.expression),
      ),

    _if_expression: ($) =>
      seq(
        $._value_definition,
        optional(" "),
        $._if_operator,
        optional(" "),
        $._value_definition,
      ),

    _if_operator: ($) =>
      alias(
        choice(
          seq(
            /[Nn][Oo][Tt]/,
            choice("=", "<", ">", /[Ee][Qq]/, /[Ll][Tt]/, /[Gg][Tt]/),
          ),
          "=",
          "<",
          ">",
          /[Ee][Qq]/,
          /[Ll][Tt]/,
          /[Gg][Tt]/,
          /[Gg][Ee]/,
          /[Ll][Ee]/,
          /[Nn][Ee]/,
        ),
        $.operator,
      ),
    _if_option: ($) =>
      alias(
        choice(/[CcSs]/, seq(/[Dd]/, alias(/[0-9]{1,2}/, "date_format_id"))),
        $.option,
      ),
  },
});
