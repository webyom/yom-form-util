var $ = window.jQuery || window.$;

module.exports = function(item) {
	var val;
	item = $(item)[0];
	item.value = $.trim(item.value);
	if(!item.value) {
		return true;
	}
	val = +item.value;
	if(isNaN(val) || !isFinite(val) || (/e|\.$/i).test(item.value)) {
		return false;
	}
	var decimalPart = item.value.split('.')[1];
	if(!decimalPart || (val + '').split('.')[0] + '.' + decimalPart != item.value) {
		item.value = val;
	}
	return true;
};
