module.exports = function(item) {
	var passed;
	item = $(item)[0];
	if(!$.trim(item.value)) {
		return true;
	}
	item.value = $.trim(item.value);
	passed = (/^([a-zA-Z0-9\-]{1,63}\.)+[a-zA-Z0-9\-]{1,63}$/).test(item.value);
	return passed;
};
