var $ = require('jquery');

module.exports = function(item) {
	item = $(item)[0];
	var len = item.value.length;
	var passed = len >= 6 && len <= 16 && !(/\s/).test(item.value) && (/[a-z]/).test(item.value) && (/[A-Z]/).test(item.value) && (/[0-9]/).test(item.value);
	return passed;
};
