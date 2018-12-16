var $ = require('jquery');

module.exports = function(item) {
	var passed;
	item = $(item)[0];
	if((/^\s+|\s+$/).test(item.value)) {
		return false;
	}
	if(!item.value) {
		return true;
	}
	passed = (/^([a-zA-Z0-9\-]{1,63}\.)+[a-zA-Z0-9\-]{1,63}$/).test(item.value);
	return passed;
};
