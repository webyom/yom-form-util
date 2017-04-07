var $ = require('jquery');

module.exports = function(item) {
	var passed, data;
	item = $(item)[0];
	item.value = item.value.toLowerCase()
		.replace(/\s*\n\s*/g, '\n')
		.replace(/,/g, ';')
		.replace(/;*\n;*/g, '\n')
		.replace(/(\s*;\s*)+/g, '; ')
		.replace(/^(;\s*)+|^\n+|(;\s*)+$|\n+$/g, '');
	item.value = $.trim(item.value);
	if(!item.value) {
		return true;
	}
	data = item.value.split(/; |\n/);
	$.each(data, function(i, val) {
		passed = (/^[a-zA-Z0-9_.-]{1,63}@([a-zA-Z0-9_-]{1,63}\.)+[a-zA-Z0-9_-]{1,63}$/).test(val);
		return passed;
	});
	return {
		passed: passed,
		data: data
	};
};
