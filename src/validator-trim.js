var $ = require('jquery');

module.exports = function(item, type) {
	item = $(item)[0];
	if (type != 'warn') {
		item.value = $.trim(item.value);
		return true;
	}
	if((/^\s+|\s+$/).test(item.value)) {
		return false;
	}
	return true;
};
