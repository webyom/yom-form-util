var $ = require('jquery');

module.exports = function(item) {
	var passed, data;
	item = $(item)[0];
	if((/^\s+|\s+$/).test(item.value)) {
		return false;
	}
	item.value = item.value.toLowerCase()
		.replace(/\s*\n\s*/g, '\n')
		.replace(/,/g, ';')
		.replace(/;*\n;*/g, '\n')
		.replace(/(\s*;\s*)+/mg, '; ')
		.replace(/^(;\s*)+|^\n+|(;\s*)+$|\n+$/g, '');
	if(!item.value) {
		return true;
	}
	data = item.value.split(/; |\n/);
	$.each(data, function(i, val) {
		passed = (/^([a-zA-Z0-9\-]{1,63}\.)+[a-zA-Z0-9\-]{1,63}$/).test(val);
		return passed;
	});
	return {
		passed: passed,
		data: data
	};
};
