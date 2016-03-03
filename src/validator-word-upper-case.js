module.exports = function(item) {
	var passed;
	item = $(item)[0];
	if(!$.trim(item.value)) {
		return true;
	}
	item.value = $.trim(item.value.toUpperCase());
	passed = !(/\W/).test(item.value);
	return passed;
};
