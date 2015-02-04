var rescheme = require('./index');

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
console.log(reschemedJSON);

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
console.log(reschemedJSON2);