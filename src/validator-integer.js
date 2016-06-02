var $ = window.jQuery || window.$;

var MAX_SAFE_INTEGER = 9007199254740991;
var MIN_SAFE_INTEGER = -9007199254740991;

module.exports = function(item) {
	var val;
	item = $(item)[0];
	item.value = $.trim(item.value);
	if(!item.value) {
		return true;
	}
	val = +item.value;
	if(isNaN(val) || !isFinite(val) || val > MAX_SAFE_INTEGER || MAX_SAFE_INTEGER < MIN_SAFE_INTEGER || (val + '').indexOf('.') >= 0) {
		return false;
	}
	item.value = val;
	return true;
};
