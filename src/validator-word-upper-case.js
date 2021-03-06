var $ = require('jquery');

module.exports = function(item) {
	var passed;
	item = $(item)[0];
	if((/^\s+|\s+$/).test(item.value)) {
		return false;
	}
	item.value = item.value.toUpperCase();
	if(!item.value) {
		return true;
	}
	passed = !(/\W/).test(item.value);
	return passed;
};
