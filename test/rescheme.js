var rescheme = require('../index');
exports.simpleObject = function(test){
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
    var reschemedJSON = rescheme(original, new_scheme);
    test.deepEqual(reschemedJSON, {
        "name": 1,
        "city": 2,
        "address": 3,
        "phone": 4
    }, 'Results match');
    test.done();
};

exports.arrayOfObjects = function(test){
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
    test.deepEqual(reschemedJSON, [
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
    ], 'Results match');
    test.done();
};

exports.nestedScheme = function(test){
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
    test.deepEqual(reschemedJSON, [
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
    ], 'Results match');
    test.done();
};

exports.arrayGrouping = function(test) {
    var original = {property1: 1, property2: 2};
    var new_scheme = {  myfield: ["property1", "property2"] }
    var reschemedJSON = rescheme(original, new_scheme);
    test.ok(reschemedJSON.myfield.length == 2, 'Ensure the arrays are proper arrays and not objects');
    test.deepEqual(reschemedJSON, {"myfield":[1, 2]}, 'Results match');
    test.done();
};

exports.extractFromArrays = function(test) {
    var original = {
        "days": {
            "flights": [
                null,
                {
                    "a": 2
                },
                {
                    "a": 3
                }
            ]
        }
    };
    var new_scheme = {myflights: "days.flights.a"};
    var reschemedJSON = rescheme(original, new_scheme);
    test.ok(reschemedJSON.myflights.length == 2, 'Ensure the arrays are proper arrays and not objects');
    test.deepEqual(reschemedJSON, {"myflights":[2,3]}, 'Results match');
    test.done();
};

exports.returnArrays = function(test) {
    var original = {
        books: [
            {
                name: 'Amazing techiques',
                authors: ['Alex', 'Bobi']
            },
            {
                name: 'Urban Music',
                authors: ['Chris', 'Tihcho']
            }
        ]
    };
    var new_scheme = {authors: "books.authors"};
    var reschemedJSON = rescheme(original, new_scheme);
    // test.ok(reschemedJSON.myflights.length == 2, 'Ensure the arrays are proper arrays and not objects');
    test.deepEqual(reschemedJSON, { authors: [ [ 'Alex', 'Bobi' ], [ 'Chris', 'Tihcho' ] ] }, 'Results match');
    test.done();
};
exports.returnArraysFlat = function(test) {
    var original = {
        books: [
            {
                name: 'Amazing techiques',
                authors: ['Alex', 'Bobi']
            },
            {
                name: 'Urban Music',
                authors: ['Chris', 'Tihcho']
            }
        ]
    };
    var new_scheme = {authors: "books.authors.$flat"};
    var reschemedJSON = rescheme(original, new_scheme);
    // test.ok(reschemedJSON.myflights.length == 2, 'Ensure the arrays are proper arrays and not objects');
    test.deepEqual(reschemedJSON, { authors: [ 'Alex', 'Bobi', 'Chris', 'Tihcho' ] }, 'Results match');
    test.done();
};

exports.returnComplexArrays = function(test) {
    var original = {
        books: [
            {
                name: 'Amazing techiques',
                authors: [{name: 'Alex'}, {name: 'Bobi'}]
            },
            {
                name: 'Urban Music',
                authors: [{name: 'Chris'}, {name:'Tihcho'}]
            }
        ]
    };
    var new_scheme = {authors: "books.authors"};
    var reschemedJSON = rescheme(original, new_scheme);
    // test.ok(reschemedJSON.myflights.length == 2, 'Ensure the arrays are proper arrays and not objects');
    test.deepEqual(reschemedJSON, {
        authors: [
            [ { name: 'Alex' }, { name: 'Bobi' } ],
            [ { name: 'Chris' }, { name: 'Tihcho' } ]
        ] 

 }, 'Results match');
    test.done();
};
exports.returnComplexArrays2 = function(test) {
    var original = {
        books: [
            {
                name: 'Amazing techiques',
                authors: [{name: 'Alex'}, {name: 'Bobi'}]
            },
            {
                name: 'Urban Music',
                authors: [{name: 'Chris'}, {name:'Tihcho'}]
            }
        ]
    };
    var new_scheme = {authors: "books.authors.$flat"};
    var reschemedJSON = rescheme(original, new_scheme);
    // test.ok(reschemedJSON.myflights.length == 2, 'Ensure the arrays are proper arrays and not objects');
    test.deepEqual(reschemedJSON, {
        authors:
        [
            { name: 'Alex' },
            { name: 'Bobi' },
            { name: 'Chris' },
            { name: 'Tihcho' }
        ]
 }, 'Results match');
    test.done();
};

exports.returnComplexArrays3 = function(test) {
    var original = {
        books: [
            {
                name: 'Amazing techiques',
                authors: [{name: 'Alex'}, {name: 'Bobi'}]
            },
            {
                name: 'Urban Music',
                authors: [{name: 'Chris'}, {name:'Tihcho'}]
            }
        ]
    };
    var new_scheme = {authors: "books.authors.$flat.name"};
    var reschemedJSON = rescheme(original, new_scheme);
    // test.ok(reschemedJSON.myflights.length == 2, 'Ensure the arrays are proper arrays and not objects');
    test.deepEqual(reschemedJSON, { authors: [ 'Alex', 'Bobi', 'Chris', 'Tihcho' ] }, 'Results match');
    test.done();
};

exports.startFromArray = function(test) {
    var original = [
            {
                name: 'Amazing techiques',
                authors: [{name: 'Alex'}, {name: 'Bobi'}]
            },
            {
                name: 'Urban Music',
                authors: [{name: 'Chris'}, {name:'Tihcho'}]
            }
        ];
    var new_scheme = {authors: "authors.name"};
    var reschemedJSON = rescheme(original, new_scheme);
    test.ok(reschemedJSON.myflights.length == 2, 'Ensure the arrays are proper arrays and not objects');
    test.deepEqual(reschemedJSON, [ { authors: [ 'Alex', 'Bobi' ] }, { authors: [ 'Chris', 'Tihcho' ] } ], 'Results match');
    test.done();
};

// exports.wizzair = function(test) {
//     var original = require('./wizzair');
//     // var original = require('./wizzair2');
//     var new_scheme = {
//         flights: "outboundLeg.days.$flat.flights.$flat"
//         // depTime: "outboundLeg.days.$flat.flights.$flat.localDepTime",
//         // arrTime: "outboundLeg.days.$flat.flights.$flat.localArrTime",
//         // price: "outboundLeg.days.$flat.flights.$flat.price",
//     };
//     // var new_scheme = {depTime: "outboundLeg.days.$flat.flights.$flat.localDepTime"};
//     var reschemedJSON = rescheme(original, new_scheme);
//     // test.ok(reschemedJSON.myflights.length == 2, 'Ensure the arrays are proper arrays and not objects');
//     test.deepEqual(reschemedJSON, [ { authors: [ 'Alex', 'Bobi' ] }, { authors: [ 'Chris', 'Tihcho' ] } ], 'Results match');
//     test.done();
// };