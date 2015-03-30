var rescheme = require('./lib/rescheme');

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
var new_scheme = {myflights: "days.flights.$each.a"};

var reschemedJSON = rescheme(original, new_scheme);
console.log(JSON.stringify(reschemedJSON));