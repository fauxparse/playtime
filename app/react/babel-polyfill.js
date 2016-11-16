"use strict";

require("core-js/shim");

require("regenerator-runtime/runtime");

require("core-js/fn/regexp/escape");

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  if (!O[key]) {
    Object[DEFINE_PROPERTY](O, key, {
      writable: true,
      configurable: true,
      value: value
    });
  }
}

if (!global._babelPolyfill) {
  global._babelPolyfill = true;

  define(String.prototype, "padLeft", "".padStart);
  define(String.prototype, "padRight", "".padEnd);

  "pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
    if (![][key]) define(Array, key, Function.call.bind([][key]));
  });
}
