Rescheme [![Build Status](https://travis-ci.org/kolarski/rescheme.svg)](https://travis-ci.org/kolarski/rescheme)  [![npm version](https://badge.fury.io/js/rescheme.svg)](http://badge.fury.io/js/rescheme)  [![Coverage Status](https://coveralls.io/repos/kolarski/rescheme/badge.svg?branch=master)](https://coveralls.io/r/kolarski/rescheme?branch=master)
=======

<img align="left" src="https://raw.github.com/kolarski/rescheme/master/logo.png">

JSON Rescheme project will help you change the JSON structure easily using declarative syntax. You just have to define your new JSON schema based on your current JSON, and let rescheme do the work for you.

Check the examples.


# Install

```bash
$ npm install rescheme
```

## Example 1
__(Simple object transformation with flat schema)__

```js
var rescheme = require('rescheme');

var original = {
	a: 1,
	details1: {
		c: 2,
		d: 3,
		details2: {
			f: 4
		}
		we_dont_need_this: 5
	}
};

var new_scheme = {
	name: "a",
	city: "details1.c",
	address: "details1.d",
	phone: "details1.details2.f"
}

var options = {
	addMissingKeys: false
};

var reschemedJSON = rescheme(original, new_schema, options);
```

__The result of above operation will be:__
```js
{
	"name": 1,
	"city": 2,
	"address": 3,
	"phone": 4
}
```

## Example 2
__(Tranformation of arrays of objects)__

```js
var original = [
	{
		a: 1, b: 2, c: { d: 3 }, g: 4
	},
	{
		a: 5, b: 6, c: { d: 7, f: 8 }, d: { p: 9}
	}
];

var new_scheme = {
	name: "a",
	city: "b",
	address: "c.d"
};

var reschemedJSON = rescheme(original, new_scheme);
```

__The result of above operation will be:__
```js
[
    {
        "name":1,
        "city":2,
        "address":3
    },
    {
        "name":5,
        "city":6,
        "address":7
    }
]
```

## Example 3
__(Tranformation of arrays of objects with nasted scheme)__

```js
var original = [
	{
		a: 1, b: 2, c: { d: 3 }, g: 4
	},
	{
		a: 5, b: 6, c: { d: 7, f: 8 }, d: { p: 9}
	}
];

var new_scheme = {
	name: "a",
	details: {
		city: "b",
		more_details: {
			address: "c.d"
		}
	}	
};

var reschemedJSON = rescheme(original, new_scheme);
```

__The result of above operation will be:__
```js
[
    {
        "name":1,
        "details":{
            "city":2,
            "more_details":{
                "address":3
            }
        }
    },
    {
        "name":5,
        "details":{
            "city":6,
            "more_details":{
                "address":7
            }
        }
    }
]
```

__Options__

* `addMissingKeys` - true/false (default: false) - With this parameter all keys not defined in the new schema will be copied over from the original JSON. Not implemented.

## Author
Alex Kolarski (aleks.rk@gmail.com)

## License 

(The MIT License)

Copyright (c) 2015 Alex Kolarski &lt;aleks.rk@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
