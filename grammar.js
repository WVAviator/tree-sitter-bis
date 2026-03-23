/**
 * @file Unisys Business Information Systems, also known as MAPPER.
 * @author Alexander Durham <wvaviator@gmail.com>
 * @license MIT
 */

import { ALL_CALLS } from "./constants.js";

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

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "bis",
  // extras: ($) => [/\s/, ",", $.separator],
  extras: ($) => [$.separator],
  rules: {
    source_file: ($) => repeat($._line),
    _line: ($) => choice($.statement, $._blank_line),
    separator: ($) => seq(/\\/, $.comment),
    _blank_line: ($) => /\n/,

    // Statements are instructions entered into a run control report starting at line 3, forming a script.
    // Every statement line begins with `@` and follows this general format:
    //
    // @label:call,report options fields line-type,\ parameters variables . comment

    statement: ($) =>
      seq(
        repeat(" "),
        $.stmt_prefix,
        optional($.label),
        repeat(" "),
        repeat1($._contents),
        $.stmt_terminator,
        optional($.comment),
      ),

    stmt_prefix: ($) => token("@"),

    // `label` A number identifying the statement line.
    // Use three or four-character, zero-filled labels (e.g., `@0003`) for easier script maintenance.
    label: ($) => token(seq(/\d{3,4}/, optional(":"))),

    // `call` The function call — an abbreviation for the operation name.
    // All calls stored in constants.js and mapped through case-insensitive function
    call: ($) => token(choice(...ALL_CALLS.map(ci))),

    // The semicolon is allowed to appear before the terminator in IF statements, but otherwise it is space-period-space.
    stmt_terminator: ($) => token("."),

    comment: (_) => prec(-1, seq(/[^\n]+/, /\n/)),

    _contents: ($) =>
      seq(
        $.call,

        choice(
          // @label:call,[[report]] options fields line-type,\ parameters variables . comment
          // Report can be any sequence of string literals or numeric literals
          // optional(seq($.report, " ")),
          seq(",", $.report, " ", $.options, " "),

          // @label:call,report [[options]] fields line-type,\ parameters variables . comment
          // optional(seq(",", $.options, " ")),
          seq(",", $.options, " "),
          " ",
        ),

        // @label:call,report options [[fields]] line-type,\ parameters variables . comment
        // Fields are either string literals or column range i.e. 3-4, 12-3
        optional(seq($._field_list, " ")),

        // @label:call,report options fields [[line-type,\ parameters]] variables . comment
        // Parameters have a line type followed by any number of params, separted by a '/'
        optional(seq($._parameter_list, " ")),

        // @label:call,report options fields line-type,\ parameters [[variables]] . comment
        optional(seq($.variable_operations, " ")),
      ),

    // Basic Tokens

    numeric_literal: ($) => token(/[0-9]+/),
    numeric_range: ($) => seq($.numeric_literal, "-", $.numeric_literal),
    identifier: ($) => token(/[A-Za-z0-9]+/),
    string_literal: ($) =>
      token(choice(seq("'", /[^']*/, "'"), seq('"', /[^"]*/, '"'))),

    integer: ($) => token(choice(/\d+/, /\d+[Ee]\-?\d+/)),
    float: ($) => token(choice(/\d*\.\d+/, /\d*\.\d+[Ee]\-?\d+/)),
    character: ($) => token(prec(-1, /[^\s.]/)),

    line_type: ($) => token(choice("|", "*", ".", /[A-Za-z]/, /\$[TtAaBb]/)),

    // Essentially a RHS to an expression
    _value_definition: ($) =>
      choice($.string_literal, $.integer, $.float, $._variable_definition),

    // Variables

    named_variable: ($) => token(seq("<", /[^>]{1,12}/, ">")),
    global_variable: ($) => token(seq("<*", /[^>]{1,12}/, ">")),
    env_variable: ($) => token(seq("<$", /[^>]{1,12}/, ">")),
    numbered_variable: ($) => token(seq(/[Vv]/, /\d{1,3}/)),

    type: ($) =>
      token(prec(2, seq(/[afhiosAFHIOS]/, /\d{1,3}/, optional(/\.\d{1,2}/)))),
    substring: ($) => seq("(", $.numeric_range, ")"),
    array_index: ($) => seq("[", optional($.numeric_literal), "]"),

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
      prec.right(
        2,
        choice(
          seq(
            $._variable_definition,
            "=",
            $._value_definition,
            ",",
            $.numeric_literal,
            $.delimiter,
          ),
          seq(
            $._variable_definition,
            "=",
            $._value_definition,
            ",",
            $.numeric_literal,
          ),
          seq($._variable_definition, "=", $._value_definition),
        ),
      ),

    // Delimiters are used like this in LDV for extracting report columns
    delimiter: ($) => seq("(", $.character, ")"),

    report: ($) =>
      seq(
        choice($.string_literal, $.numeric_literal, $.identifier),
        repeat(seq(",", $.string_literal, $.numeric_literal, $.identifier)),
      ),

    // `fields` The report fields to process. Specify either column-character positions (e.g., `2-2`) or a
    // field name (e.g., `'StCd'`).
    field: ($) => choice($.numeric_range, $.string_literal),
    _field_list: ($) => seq($.field, repeat(seq(",", $.field))),

    // Options
    // Options can be any number of alpha characters but also may have numeric literals or other embedded arguments
    option: ($) =>
      choice(
        /[A-Za-z@/]/,
        seq(
          /[A-Za-z@]/,
          "(",
          choice($.character, $.numeric_literal, $._variable),
          ")",
        ),
        seq(
          /[A-Za-z@]/,
          choice($.numeric_literal, $._variable),
          "-",
          choice($.numeric_literal, $._variable),
        ),
      ),
    options: ($) => repeat1($.option),

    parameter: ($) =>
      seq(optional($.line_type), repeat1(seq(",", optional($.identifier)))),
    _parameter_list: ($) => seq($.parameter, repeat(seq("/", $.parameter))),

    _variable_operation: ($) =>
      choice($._variable_definition, $._variable_assignment),

    variable_operations: ($) =>
      seq($._variable_operation, repeat(seq(",", $._variable_operation))),
  },
});
