var $ = window.jQuery || window.$;

module.exports = function(item) {
	var passed;
	item = $(item)[0];
	item.value = $.trim(item.value.toUpperCase());
	if(!item.value) {
		return true;
	}
	passed = !(/\W/).test(item.value);
	return passed;
};
