module.exports = function(item) {
	var val;
	item = $(item)[0];
	if(!$.trim(item.value)) {
		return true;
	}
	item.value = $.trim(item.value);
	val = +item.value;
	if(isNaN(val) || (val + '').indexOf('.') >= 0) {
		return false;
	} else {
		item.value = val;
		return true;
	}
};
