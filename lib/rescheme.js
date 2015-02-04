/*!
 * rescheme - lib/rescheme.js
 * Copyright(c) 2015 Alex Kolarski <aleks.rk@gmail.com>
 * MIT Licensed
 */

"use strict";
var rescheme = {
	extractDataForKey: function (original, key) {
		var keys = key.split('.');
		var value = original;
		for (var i = 0; i < keys.length; i++) {
			value = value[keys[i]];
		};
		return value;
	},
	reschemeObject: function (obj, newScheme) {
		var output = {};
		for(var key in newScheme) {
			output[key] = rescheme.extractDataForKey(obj, newScheme[key]);
		}
		return output;
	},
	main: function (original, newScheme, options) {
		rescheme.options 	= options || {};
		if (original.constructor === Array)
		{
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