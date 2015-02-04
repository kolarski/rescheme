var rescheme = require('./index');

var original = {
	_id: "54bd0a80e95d9263e0386d70",
	title: "ДжиПи сървис",
	city: "София",
	neighbourhood: "кв.Кръстова вада",
	adress: "ул. Проф. Марин Големинов, №5",
	details: {
		telephone: "02/86 22 800",
		web_addr: "http://gpservice.net/",
		more_details: {
			full_desc: "Допълнителна информация: Автосервиз, ремонт, коли под наем,пътна помощ, "
		}
	}
};

var new_scheme = {
	name: "title",
	city: "city",
	address: "adress",
	phone: "telephone",
	web: "web_addr",
	phone: "details.telephone",
	web: "details.web_addr",
	desc: "details.more_details.full_desc"
}
var reschemedJSON = rescheme(original, new_scheme);
console.log(reschemedJSON);