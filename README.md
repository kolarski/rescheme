Rescheme 
=======

![logo](https://raw.github.com/kolarski/rescheme/master/logo.png)


JSON Rescheme project will help you change the JSON structure easily using declarative syntax. You just have to define your new JSON schema based on our current one, and let rescheme do the work for you. View the provided example.

## Install

```bash
$ npm install rescheme
```

## Usage 1

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

### The result of above operation will be:
```js
{
	name: 1,
	city: 2,
	address: 3,
	phone: 4
}
```

## Usage 2 (Working with arrays of objects)

```js
var original2 = [
	{
		a: 1,
		b: 2,
		c: { d: 3 }
	}
];

var new_scheme2 = {
	name: "a",
	city: "b",
	address: "c.d"
};

var reschemedJSON2 = rescheme(original2, new_scheme2);
```

### The result of above operation will be:
```js
[ { name: 1, city: 2, address: 3 } ]
```

__Options__

* `addMissingKeys` - true/false (default: false) - With this parameter all keys not defined in the new schema will be copied over from the original JSON. Not implemented.

## Note
This is still in beta. Currently works only with flat schema format as shown in example. I'm working on arrays and recursive schema formats. Any ideas and contributions will be greatly appreciated.

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
