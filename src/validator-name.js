var $ = require('jquery');

module.exports = function(item) {
	item = $(item)[0];
	var passed = item.value.indexOf(';') < 0;
	return passed;
};
