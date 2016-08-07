var $ = window.jQuery || window.$;

var MAX_SAFE_INTEGER = 9007199254740991;
var MIN_SAFE_INTEGER = -9007199254740991;

module.exports = function(item) {
	var val;
	item = $(item)[0];
	item.value = $.trim(item.value);
	if(!item.value) {
		return {
			passed: true,
			data: null
		};
	}
	val = +item.value;
	if(isNaN(val) || !isFinite(val) || val > MAX_SAFE_INTEGER || MAX_SAFE_INTEGER < MIN_SAFE_INTEGER || (/e|\./i).test(item.value)) {
		return {
			passed: false
		};
	}
	item.value = val;
	return {
		passed: true,
		data: val
	};
};
