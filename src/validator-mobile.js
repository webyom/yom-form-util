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
	passed = (/^(0|86|17951)?(13[0-9]|14[567]|15[012356789]|16[6]|17[0-9]|18[0-9]|19[0-9]|106[0-9]{2})[0-9]{8}$/).test(item.value);
	return passed;
};
