Rescheme 
=======

![logo](https://raw.github.com/kolarski/rescheme/master/logo.png)


JSON Rescheme project will help you change the JSON structure easily using declarative syntax. You just have to define your new JSON schema based on our current one, and let rescheme do the work for you. View the provided example.

## Install

```bash
$ npm install rescheme
```

## Usage

```js
var rescheme = require('rescheme');

var original = {
	_id: "54bd0a80e95d9263e0386d70",
	title: "Autocar service",
	city: "Sofia",
	neighbourhood: "Some neighbourhood",
	adress: "st. Marinov 18",
	details: {
		telephone: "+359 777 777",
		web_addr: "http://google.com",
		more_details: {
			full_desc: "Additional information goes here"
		}
	}
};

var new_schema = {
	name: "title",
	city: "city",
	address: "adress",
	phone: "telephone",
	web: "web_addr",
	phone: "details.telephone",
	web: "details.web_addr",
	desc: "details.more_details.full_desc"
}
var options = {
	addMissingKeys: false
};

var reschemedJSON = rescheme(original, new_schema, options);
```

### The result of above operation will be:
```js
{ name: 'Autocar service',
  city: 'Sofia',
  address: 'st. Marinov 18',
  phone: '+359 777 777',
  web: 'http://google.com',
  desc: 'Additional information goes here' }
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
