var $ = window.jQuery || window.$;

module.exports = function(item) {
	var passed;
	item = $(item)[0];
	item.value = $.trim(item.value.toLowerCase());
	if(!item.value) {
		return true;
	}
	passed = (/^[a-zA-Z0-9_.-]{1,63}@([a-zA-Z0-9_-]{1,63}\.)+[a-zA-Z0-9_-]{1,63}$/).test(item.value);
	return passed;
};
