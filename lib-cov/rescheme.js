
// instrument by jscoverage, do not modifly this file
(function (file, lines, conds, source) {
  var BASE;
  if (typeof global === 'object') {
    BASE = global;
  } else if (typeof window === 'object') {
    BASE = window;
  } else {
    throw new Error('[jscoverage] unknow ENV!');
  }
  if (BASE._$jscoverage) {
    BASE._$jscmd(file, 'init', lines, conds, source);
    return;
  }
  var cov = {};
  /**
   * jsc(file, 'init', lines, condtions)
   * jsc(file, 'line', lineNum)
   * jsc(file, 'cond', lineNum, expr, start, offset)
   */
  function jscmd(file, type, line, express, start, offset) {
    var storage;
    switch (type) {
      case 'init':
        if(cov[file]){
          storage = cov[file];
        } else {
          storage = [];
          for (var i = 0; i < line.length; i ++) {
            storage[line[i]] = 0;
          }
          var condition = express;
          var source = start;
          storage.condition = condition;
          storage.source = source;
        }
        cov[file] = storage;
        break;
      case 'line':
        storage = cov[file];
        storage[line] ++;
        break;
      case 'cond':
        storage = cov[file];
        storage.condition[line] ++;
        return express;
    }
  }

  BASE._$jscoverage = cov;
  BASE._$jscmd = jscmd;
  jscmd(file, 'init', lines, conds, source);
})('lib/rescheme.js', [7,8,39,10,11,15,23,18,20,26,36,28,30,33,34], {"17_7_33":0,"26_21_7":0,"26_32_2":0,"27_6_30":0}, ["/*!"," * rescheme - lib/rescheme.js"," * Copyright(c) 2015 Alex Kolarski <aleks.rk@gmail.com>"," * MIT Licensed"," */","","\"use strict\";","var rescheme = {","\textractDataForKey: function (original, keys) {","\t\treturn keys.split('.').reduce(function (val, key) {","\t\t\treturn val[key];","\t\t}, original);","\t},","\treschemeObject: function (obj, newScheme) {","\t\tvar output = {};","\t\tfor(var key in newScheme) {","\t\t\tif (typeof newScheme[key] != 'object') {","\t\t\t\toutput[key] = rescheme.extractDataForKey(obj, newScheme[key]);","\t\t\t} else {","\t\t\t\toutput[key] = rescheme.reschemeObject(obj, newScheme[key]);","\t\t\t}","\t\t}","\t\treturn output;","\t},","\tmain: function (original, newScheme, options) {","\t\trescheme.options = options || {};","\t\tif (original.constructor === Array) {","\t\t\trescheme.output = [];","\t\t\tfor (var i in original) {","\t\t\t\trescheme.output.push(rescheme.reschemeObject(original[i], newScheme));","\t\t\t}","\t\t} else {","\t\t\trescheme.output = {};","\t\t\trescheme.output = rescheme.reschemeObject(original, newScheme);","\t\t}","\t\treturn rescheme.output;","\t}","}","module.exports = rescheme.main;"]);
/*!
 * rescheme - lib/rescheme.js
 * Copyright(c) 2015 Alex Kolarski <aleks.rk@gmail.com>
 * MIT Licensed
 */
_$jscmd("lib/rescheme.js", "line", 7);

"use strict";

_$jscmd("lib/rescheme.js", "line", 8);

var rescheme = {
    extractDataForKey: function(original, keys) {
        _$jscmd("lib/rescheme.js", "line", 10);
        return keys.split(".").reduce(function(val, key) {
            _$jscmd("lib/rescheme.js", "line", 11);
            return val[key];
        }, original);
    },
    reschemeObject: function(obj, newScheme) {
        _$jscmd("lib/rescheme.js", "line", 15);
        var output = {};
        for (var key in newScheme) {
            if (_$jscmd("lib/rescheme.js", "cond", "17_7_33", typeof newScheme[key] != "object")) {
                _$jscmd("lib/rescheme.js", "line", 18);
                output[key] = rescheme.extractDataForKey(obj, newScheme[key]);
            } else {
                _$jscmd("lib/rescheme.js", "line", 20);
                output[key] = rescheme.reschemeObject(obj, newScheme[key]);
            }
        }
        _$jscmd("lib/rescheme.js", "line", 23);
        return output;
    },
    main: function(original, newScheme, options) {
        _$jscmd("lib/rescheme.js", "line", 26);
        rescheme.options = _$jscmd("lib/rescheme.js", "cond", "26_21_7", options) || _$jscmd("lib/rescheme.js", "cond", "26_32_2", {});
        if (_$jscmd("lib/rescheme.js", "cond", "27_6_30", original.constructor === Array)) {
            _$jscmd("lib/rescheme.js", "line", 28);
            rescheme.output = [];
            for (var i in original) {
                _$jscmd("lib/rescheme.js", "line", 30);
                rescheme.output.push(rescheme.reschemeObject(original[i], newScheme));
            }
        } else {
            _$jscmd("lib/rescheme.js", "line", 33);
            rescheme.output = {};
            _$jscmd("lib/rescheme.js", "line", 34);
            rescheme.output = rescheme.reschemeObject(original, newScheme);
        }
        _$jscmd("lib/rescheme.js", "line", 36);
        return rescheme.output;
    }
};

_$jscmd("lib/rescheme.js", "line", 39);

module.exports = rescheme.main;