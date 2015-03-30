/*!
 * rescheme - lib/rescheme.js
 * Copyright(c) 2015 Alex Kolarski <aleks.rk@gmail.com>
 * MIT Licensed
 */

"use strict";
var rescheme = {
	flat: function(input, shallow, startIndex) {
	    var output = [], idx = 0;
	    for (var i = startIndex || 0, length = input && input.length; i < length; i++) {
	      	var value = input[i];
				if (value.constructor === Array) {
					//flat current level of array or arguments object
					if (!shallow) value = flat(value, shallow);
					var j = 0, len = value.length;
					output.length += len;
					while (j < len) {
					  	output[idx++] = value[j++];
					}
				}
	    }
	    return output;
	},
	extractDataForKey: function (original, keys) {
		return keys.split('.').reduce(function (val, key) {
			if (key == '$flat') {
				return rescheme.flat(val, true);
			} else if (val.constructor === Array) {
				var res = [];
				for(var item in val) {
					if (val[item] != null && val[item][key] != null) {
						res.push(val[item][key]);
					}
				}
				return res;
			}
			return val[key];
		}, original);
	},
	reschemeObject: function (obj, newScheme) {
		var output = (newScheme.constructor === Array) ? [] : {};

		for(var key in newScheme) {
			if (typeof newScheme[key] != 'object') {
				output[key] = rescheme.extractDataForKey(obj, newScheme[key]);
			} else {
				output[key] = rescheme.reschemeObject(obj, newScheme[key]);
			}
		}
		return output;
	},
	main: function (original, newScheme, options) {
		rescheme.options = options || {};
		if (original.constructor === Array) {
			rescheme.output = [];
			for (var i in original) {
				rescheme.output.push(rescheme.reschemeObject(original[i], newScheme));
			}
		} else {
			rescheme.output = {};
			rescheme.output = rescheme.reschemeObject(original, newScheme);
		}
		return rescheme.output;
	}
}
module.exports = rescheme.main;
