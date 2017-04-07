var $ = require('jquery');

module.exports = function(item) {
	var passed;
	item = $(item)[0];
	item.value = $.trim(item.value.toLowerCase());
	if(!item.value) {
		return true;
	}
	passed = (/^https?:\/\//).test(item.value);
	return passed;
};
