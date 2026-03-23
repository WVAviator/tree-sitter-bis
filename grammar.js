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

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "bis",
  // Whitespace not included in extras because it is significant for separating tokens
  extras: ($) => [$.separator],
  rules: {
    source_file: ($) => repeat($._line),

    _line: ($) =>
      choice($.statement, $._blank_line, $.frontmatter, $.header_line),
    separator: ($) => seq(/\\/, $.comment, /\s*/),
    _blank_line: ($) => /\n/,
    frontmatter: ($) => seq(/\./, /[^\n]*/, /\n/),
    header_line: ($) => seq(/\*/, repeat(/=/)),

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
        repeat($._contents),
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
      seq($.call, choice(",", " "), repeat(seq($.stmt_group, " "))),

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
  },
});
