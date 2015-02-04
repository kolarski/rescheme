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
	main: function (original, newScheme, options) {
		rescheme.output 	= {};
		rescheme.options 	= options || {};
		
		for(var key in newScheme) {
			rescheme.output[key] = rescheme.extractDataForKey(original, newScheme[key]);
		}
		return rescheme.output;
	}
}
module.exports = rescheme.main;