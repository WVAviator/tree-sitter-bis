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

/**
 * Works like seq, splits each arg by a delim, and stops matching as soon as a match is not found.
 */
const param_list = (delim, ...args) => {
  if (args.length === 1) return args[0];
  return seq(
    args[0],
    optional(seq(delim, param_list(delim, ...args.slice(1)))),
  );
};

const repeat_params = (delim, arg) => {
  return seq(arg, repeat(seq(token.immediate(delim), arg)));
};

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "bis",
  extras: ($) => [/\s/, $._separator],

  rules: {
    source_file: ($) => repeat($._line),
    _line: ($) => choice($.statement),
    _separator: ($) => seq(/\\/, $.comment),
    comment: (_) => prec(-1, seq(/[^\n]*/, /\n/)),

    // Statements are instructions entered into a run control report starting at line 3, forming a script.
    // Every statement line begins with `@` and follows this general format:
    //
    // @label:call,report options fields line-type,\ parameters variables . comment

    stmt_prefix: (_) => token("@"),

    // `label` A number identifying the statement line.
    // Use three or four-character, zero-filled labels (e.g., `@0003`) for easier script maintenance.
    label: ($) => token(/\d{3,4}/),

    // `call` The function call — an abbreviation for the operation name.
    // All calls stored in constants.js and mapped through case-insensitive function
    call: ($) => token(choice(...ALL_CALLS.map(ci))),

    // `report` The cabinet, drawer, and report number or name to process.
    // Many statements contain a `c,d,r` field for specifying the cabinet, drawer, and report.
    // You can use a cabinet number, drawer letter, and report number — or a data name.
    // In some statements (e.g., `FND`, `SRH`), entering `0` or leaving the report (`r`) subfield
    // blank causes the system to process the entire drawer.
    //
    // **Name scope in statements:**
    //
    // | Name type | Replaces |
    // |-----------|----------|
    // | Report name | All three `c,d,r` subfields |
    // | Drawer name | Both `c` and `d` subfields |
    // | Cabinet name | Only the `c` subfield |
    //
    // Always enclose report, drawer, and cabinet names in apostrophes (`'`) in statements.

    data_name: ($) => token(seq("'", /[^']+/, "'")),
    cabinet: ($) => token(/\d{1,3}/),
    drawer: ($) => token(/[A-Fa-f]/),
    report: ($) => token(/\d{1,3}/),
    _named_cabinet: ($) => field("named_cabinet", $.data_name),
    _named_drawer: ($) => prec(1, field("named_drawer", $.data_name)),
    _named_report: ($) => prec(2, field("named_report", $.data_name)),

    // `options` Options specifying how to perform the operation.
    // These vary based on call, but can be any number of alpha characters
    options: ($) => token(/[A-Za-z]+/),

    // `fields` The report fields to process. Specify either column-character positions (e.g., `2-2`) or a
    // field name (e.g., `'StCd'`).
    //
    // **Column-character positions** — specify the starting column and number of characters:
    //
    // ```
    // @srh,0,d,1 '' 26-4 |,amco .
    // ```
    //
    // This searches the 4-character field beginning in column 26.
    //
    // **Field names** — use report heading names enclosed in apostrophes:
    //
    // ```
    // @srh,0,d,1 '' 'cust code' |,amco .
    // ```
    //
    // These two statements perform the same operation.
    //
    // Additional notes:
    // - The maximum number of report fields you can process is **80**, unless otherwise stated in a statement's documentation.
    // - For statements that support multiple reports (e.g., `SRH`, `FND`, `BFN`), entering `0` or omitting the `r` field processes all reports in the drawer.
    // - In most statements, adjacent or overlapping fields are not allowed. One exception is the **Read Line** (`RDL`) statement.

    field: ($) => token(choice(seq("'", /[^']+/, "'"), /\d+-\d+/)),

    // `line-type` The type of line to process.
    //
    // A single character identifying the structural role of a report line
    // Appears between the field/column spec and search parameters, separated by comma
    // May be empty (bare comma) wht the A option is used to process all line types

    line_type: ($) => token(choice("|", "*", ".", /[A-Za-z]/, /\$[TtAaBb]/)),

    // `parameters` Values or fields to process. In search statements (e.g., `FND`), a slant `/` within
    // apostrophes can be used to process a partial field.
    //
    // Searches for a space in the first column of Serial Number and across the entire Product Cost field:
    //
    // @srh,'report2b' @ 25-1,32-6 |,@'/',@@@@@@ .
    //
    // ### Searching for Multiple Data in a Range
    //
    // Includes lines with any 1980s status date and a serial number ending in 1–4, or lines with `sh` and `blackbox0`:
    //
    // @srh,'report2b' '' 2-2,5-1,15-9,30-1 |,,8,,1/r,,8,,4/|,sh,,blackbox0 .
    //
    //
    parameter: ($) => token(choice(/[A-Za-z0-9@]+/, seq("'", /[^']+/, "'"))),

    parameter_list: ($) =>
      seq(
        optional($.line_type),
        ",",
        repeat_params(",", optional($.parameter)),
      ),

    // Variables (See defining_variables.md)
    //

    named_variable: ($) => token(seq("<", /[^>]{1,12}/, ">")),
    global_variable: ($) => token(seq("<*", /[^>]{1,12}/, ">")),
    env_variable: ($) => token(seq("<$", /[^>]{1,12}/, ">")),
    numbered_variable: ($) => token(seq(/[Vv]/, /\d{1,3}/)),

    type: ($) => token(seq(/[afhiosAFHIOS]/, /\d{1,3}/, optional(/\.\d{1,2}/))),
    substring: ($) => seq("(", $.integer, "-", $.integer, ")"),
    array_index: ($) => seq("[", optional($.integer), "]"),

    // Used anywhere a variable's type can be defined or redefined
    _variable_definition: ($) =>
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

    // Used anywhere the variable's type must already be known at this point
    _variable_value: ($) =>
      seq(
        choice(
          $.named_variable,
          $.global_variable,
          $.env_variable,
          $.numbered_variable,
        ),
        optional($.array_index),
        optional($.substring),
      ),

    stmt_terminator: (_) => token("."),

    statement: ($) =>
      seq(
        $.stmt_prefix,
        optional(seq($.label, ":")),
        repeat($._stmt_contents),
        $.stmt_terminator,
        $.comment,
      ),

    // Literals

    keyword: ($) => token(/[A-Za-z]+/),

    // Strings can be enclosed by single or double quotes.
    string: ($) =>
      token(choice(seq("'", /[^']*/, "'"), seq(/"/, /[^"]*/, /"/))),
    // Single quote strings are used in some places where double quotes can't
    sq_string: ($) => token(seq("'", /[^']*/, "'")),

    // Integer, decimal, scientific notation, or combination
    _number: ($) => choice($.integer, $.float),
    integer: ($) => token(choice(/\d+/, /\d+[Ee]\-?\d+/)),
    float: ($) => token(choice(/\d*\.\d+/, /\d*\.\d+[Ee]\-?\d+/)),
    character: ($) => token(/./),

    // Statement Parts

    _value_definition: ($) =>
      choice($.string, $._number, $._variable_definition),
    _variable_assignment: ($) =>
      seq($._variable_definition, "=", $._value_definition),
    _integer_value: ($) =>
      choice(
        $.integer,
        choice(
          $.named_variable,
          $.global_variable,
          $.env_variable,
          $.numbered_variable,
        ),
      ),

    // Commands

    _stmt_contents: ($) => choice($.ldv, $.gto, $.srh, $.sru),

    ldv: ($) =>
      seq(
        alias(/[Ll][Dd][Vv]/, $.call),
        optional(seq(",", $.options)),
        choice(
          seq($._variable_definition, repeat(seq(",", $._variable_definition))),
          seq($._variable_assignment, repeat(seq(",", $._variable_assignment))),
          seq(
            $._variable_assignment,
            ",",
            seq($.integer, optional($._delimiter)),
            repeat(
              seq(
                ",",
                $._variable_assignment,
                ",",
                $.integer,
                optional($._delimiter),
              ),
            ),
          ),
        ),
      ),

    _delimiter: ($) => seq("(", $.character, ")"),

    // GTO (reference statments/GTO.md)

    gto: ($) =>
      seq(
        alias(/[Gg][Tt][Oo]/, $.call),
        choice(
          $.label,
          $._end,
          seq(
            $._end,
            ",",
            $._status_code,
            optional(
              seq(",", $._status_code, optional(seq(",", $._status_code))),
            ),
          ),
          seq(
            $._lin,
            optional(choice("+", "-")),
            choice($._variable_value, $.integer),
          ),
          seq($._rpx, $.report),
        ),
      ),
    _end: ($) => alias(/[Ee][Nn][Dd]/, $.keyword),
    _lin: ($) => alias(/[Ll][Ii][Nn]/, $.keyword),
    _rpx: ($) => alias(/[Rr][Pp][Xx]/, $.keyword),
    _status_code: ($) => choice($.integer, $._variable_value),

    // SRH (Search) and SRU (Search Update)

    srh: ($) =>
      seq(
        alias(/[Ss][Rr][Hh]/, $.call),
        ",",
        choice(
          $._named_report,
          seq($._named_drawer, ",", $.report),
          param_list(
            ",",
            choice($.cabinet, $._named_cabinet),
            choice($.drawer, $._named_drawer),
            optional(choice($.report, $._named_report)),
            optional($.integer),
            optional($.integer),
            $.label,
          ),
        ),
        $._srh_options,
        repeat_params(",", $.field),
        repeat_params("/", $.parameter_list),
        param_list(
          ",",
          optional($._variable_value),
          optional($._variable_value),
          $._variable_value,
        ),
      ),

    // Identical to SRH
    sru: ($) =>
      seq(
        alias(/[Ss][Rr][Uu]/, $.call),
        ",",
        choice(
          $._named_report,
          seq($._named_drawer, ",", $.report),
          param_list(
            ",",
            choice($.cabinet, $._named_cabinet),
            choice($.drawer, $._named_drawer),
            optional(choice($.report, $._named_report)),
            optional($.integer),
            optional($.integer),
            $.label,
          ),
        ),
        $._srh_options,
        repeat_params(",", $.field),
        repeat_params("/", $.parameter_list),
        param_list(
          ",",
          optional($._variable_value),
          optional($._variable_value),
          $._variable_value,
        ),
      ),

    _srh_options: ($) =>
      alias(
        repeat1(
          choice(
            /[AaDdFfHhNnPpSs@/]/,
            seq(/[BbQq]/, optional(seq("(", $._integer_value, ")"))),
            seq(/[Ee]/, "(", $._integer_value, ")"),
            seq(/[Cc]/, "(", /[FfLlSs]/, ")"),
            seq(/[LlTtUuYy@]/, optional(seq("(", $.line_type, ")"))),
            seq(
              /[Rr]/,
              repeat_params(
                ",",
                choice(
                  $._integer_value,
                  seq($._integer_value, "-", $._integer_value),
                ),
              ),
            ),
          ),
        ),
        $.options,
      ),
  },
});
