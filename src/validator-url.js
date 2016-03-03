module.exports = function(item) {
	var passed;
	item = $(item)[0];
	if(!$.trim(item.value)) {
		return true;
	}
	item.value = $.trim(item.value);
	passed = (/^https?:\/\//).test(item.value);
	return passed;
};
