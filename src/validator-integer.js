var $ = require('jquery');

var MAX_SAFE_INTEGER = 9007199254740991;
var MIN_SAFE_INTEGER = -9007199254740991;

module.exports = function(item) {
	var val;
	item = $(item)[0];
	if((/^\s+|\s+$/).test(item.value)) {
		return false;
	}
	if(!item.value) {
		return true;
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
