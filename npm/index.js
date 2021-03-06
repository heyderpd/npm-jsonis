'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * jsonis
 * Copyright (c) 2016 heyderpd <heyderpd@gmail.com>
 * ISC Licensed
 */

var tabSpaces = function tabSpaces(qtd) {
  qtd *= 2;
  var spaces = '';
  while (qtd-- > 0) {
    spaces += ' ';
  }
  return spaces;
};

var identJSONstr = function identJSONstr(obj) {
  var tabOld = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var ident = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var R = arguments[3];

  if (R++ > 42) throw new Error("Limit recursive exceeded in f.identJSONstr");

  ident += 1;
  var tabIn = tabSpaces(ident);
  var type = obj && obj.constructor ? obj.constructor : undefined;

  if (type !== Array && type !== Object) {
    return '"' + String(obj).replace(/\"/gim, '\\"') + '"';
  } else {
    var sta = void 0,
        end = void 0;
    if (type === Object) {
      sta = '{';
      end = '}';
    } else {
      sta = '[';
      end = ']';
    }
    if (length(obj) === 0) {
      return '' + sta + end;
    } else {
      var _ret = function () {
        var lines = [];
        if (type === Object) {
          each(obj, function (key, value) {
            value = identJSONstr(value, tabIn, ident, R);
            lines.push(tabIn + '"' + key + '": ' + value);
          });
        } else {
          each(obj, function (key, value) {
            value = identJSONstr(value, tabIn, ident, R);
            lines.push('' + tabIn + value);
          });
        }
        return {
          v: sta + '\n' + lines.join(',\n') + '\n' + tabOld + end
        };
      }();

      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    }
  }
};

var main = function main(obj) {
  return identJSONstr(obj);
};

var _require = require('pytils');

var length = _require.length;
var keys = _require.keys;
var each = _require.each;


module.exports = main;
