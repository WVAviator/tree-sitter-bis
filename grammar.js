/**
 * @file Unisys Business Information Systems, also known as MAPPER.
 * @author Alexander Durham <wvaviator@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "bis",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => "hello"
  }
});
