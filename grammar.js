/**
 * @file Unisys Business Information Systems, also known as MAPPER.
 * @author Alexander Durham <wvaviator@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "bis",
  extras: (_) => [],

  rules: {
    source_file: ($) => repeat($._line),
    _line: ($) => choice($.statement),
    statement: ($) =>
      seq(
        repeat(/\s/),
        $.stmt_prefix,
        repeat(/\s/),
        repeat($._stmt_contents),
        $.stmt_terminator,
        $.comment,
      ),
    stmt_prefix: (_) => "@",
    _stmt_contents: ($) => choice($.ldv),
    stmt_terminator: (_) => ".",
    separator: ($) => seq(/\\/, $.comment),
    comment: (_) => prec(-1, seq(/[^\n]*/, /\n/)),
    variable: ($) => seq("<", /[^>]+/, ">"),
    variable_type: ($) =>
      seq(/[afhiosAFHIOS]/, /\d{1,3}/, optional(/\.\d{1,2}/)),
    _variable_definition: ($) => seq($.variable, optional($.variable_type)),
    string: ($) => seq("'", /[^']*/, "'"),
    number: ($) => /\d+/,
    character: ($) => /./,
    _value_definition: ($) => choice($.string, $.number, $.variable),

    ldv: ($) => choice($._ldv_fmt_1, $._ldv_fmt_2, $._ldv_fmt_3),
    ldv_options: $ => seq(',', repeat1(/[CHLOPRUWZchlopruwz]/)),
    _ldv_fmt_1: ($) =>
      seq(
        /[Ll][Dd][Vv]/,
        optional($.ldv_options),
        /\s/,
        seq($._variable_definition, "=", $._value_definition),
        repeat(seq(",", $._variable_definition, "=", $._value_definition)),
        /\s/,
      ),
    _ldv_fmt_2: ($) =>
      seq(
        /[Ll][Dd][Vv]/,
        $.ldv_options,
        /\s/,
        $._variable_definition,
        repeat(seq(",", $._variable_definition)),
        /\s/,
      ),
    _ldv_fmt_3: ($) =>
      seq(
        /[Ll][Dd][Vv]/,
        ',',
        alias(/[CHLOPRUWZchlopruwz]*[Qq][CHLOPRUWZchlopruwz]*/, $.ldv_options),
        /\s/,
        seq(
          $._variable_definition,
          "=",
          $._value_definition,
          ",",
          $.number,
          optional(seq("(", $.character, ")")),
        ),
        repeat(
          seq(
            ",",
            $._variable_definition,
            "=",
            $._value_definition,
            ",",
            $.number,
            optional(seq("(", $.character, ")")),
          ),
        ),
        /\s/,
      ),
  },
});
