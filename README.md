Rescheme [![Build Status](https://travis-ci.org/kolarski/rescheme.svg)](https://travis-ci.org/kolarski/rescheme)  [![npm version](https://badge.fury.io/js/rescheme.svg)](http://badge.fury.io/js/rescheme)  [![Coverage Status](https://coveralls.io/repos/kolarski/rescheme/badge.svg?branch=master)](https://coveralls.io/r/kolarski/rescheme?branch=master) [![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/kolarski/rescheme?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
=======

<img align="left" src="https://raw.github.com/kolarski/rescheme/master/logo.png">

JSON Rescheme project will help you change the JSON structure easily using declarative syntax.

# Install

```bash
$ npm install rescheme
```
# How it works ? 

1. Give it a JSON `original_json`
2. Define in what scheme you want your data back extracted from the original JSON `scheme_json`
3. Get new JSON in your defined scheme `output_json`

# Usage
```js
var rescheme = require('rescheme');
var output_json = rescheme(original_json, scheme_json);
```
## Lets see some examples
### Example 1
We will use this JSON: 
```js
{
    "book":  {
        "name": "JavaScript: The Good Parts",
        "publisher": "O'Reilly Media",
        "author": {
            "name": "Douglas Crockford",
            "website": "http://crockford.com"
        },
        "translations": ["English", "Spanish"]
    }
}
```

Then we can make ourselfs a new schema from this JSON to suit our needs. Here is one example schema we can build: 
```js
{
    book_name: "book.name",
    book_details: {
        author_name: "book.author.name",
        author_details: ["book.author.name", "book.author.website"],
        contact: "book.author.website",
        details: {
            book_publisher: "book.publisher",
            langs: "book.translations"
        }
    }
}
```

Note that: 
1. We define all the keys in our scheme (for example `book_name`)
2. We define the our new structure: (for example `book_details` as object and `author_details` as array)
3. The values for each key is the information we want to extract and replace from our original JSON (for example `"book.name"`)


The result will be : 
```js
{
    "book_name": "JavaScript: The Good Parts",
    "book_details":{
        "author_name": "Douglas Crockford",
        "author_details": [ "Douglas Crockford", "http://crockford.com" ],
        "contact": "http://crockford.com",
        "details":{
            "book_publisher": "O'Reilly Media",
            "langs": [ "English", "Spanish" ]
        }
    }
}
```

## How about arrays ?
### Here is the previous JSON, but this time we have 2 books in array

```js
[
    {
        "name": "JavaScript: The Good Parts",
        "publisher": "O'Reilly Media",
        "author": {
            "name": "Douglas Crockford",
            "website": "http://crockford.com"
        },
        "translations": ["English", "Spanish"]
    },
    {
        "name": "JavaScript: The Definitive Guide",
        "publisher": "O'Reilly Media",
        "author": {
            "name": "David Flanagan",
            "website": "https://github.com/davidflanagan"
        },
        "translations": ["French", "English"]
    }
]
```

As as scheme we want to get a list of only a book name and a author. Our scheme is pretty simple:

```js
{
    "name": "name",
    "author": "author.name"
}
```
As a result we will get: 
```js
[
    {
        name: 'JavaScript: The Good Parts',
        author: 'Douglas Crockford'
    },
    {
        name: 'JavaScript: The Definitive Guide',
        author: 'David Flanagan'
    }
]
```

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
