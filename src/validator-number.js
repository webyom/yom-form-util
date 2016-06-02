var $ = window.jQuery || window.$;

module.exports = function(item) {
	var val;
	item = $(item)[0];
	item.value = $.trim(item.value);
	if(!item.value) {
		return true;
	}
	val = +item.value;
	if(isNaN(val) || !isFinite(val)) {
		return false;
	}
	item.value = val;
	return true;
};
