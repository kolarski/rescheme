/*!
 * rescheme - lib/rescheme.js
 * Copyright(c) 2015 Alex Kolarski <aleks.rk@gmail.com>
 * MIT Licensed
 */

"use strict";
var rescheme = {
	extractDataForKey: function (original, keys) {
		return keys.split('.').reduce(function (val, key) {
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