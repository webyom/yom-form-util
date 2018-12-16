var $ = require('jquery');

module.exports = function(item) {
	item = $(item)[0];
	if((/^\s+|\s+$/).test(item.value)) {
		return false;
	}
	return true;
};
