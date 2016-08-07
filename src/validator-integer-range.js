var $ = window.jQuery || window.$;

var integerValidator = require('./validator-integer');

module.exports = function(item, range) {
	var val;
	item = $(item)[0];
	item.value = $.trim(item.value);
	if(!item.value) {
		return {
			passed: true,
			data: null
		};
	}
	range = range.split('~');
	if(!integerValidator({value: range[0]}).passed || !integerValidator({value: range[1]}).passed || !integerValidator(item).passed) {
		return {
			passed: false,
			msgData: [+range[0], +range[1]]
		};
	}
	val = +item.value;
	if(!(val >= +range[0] && val <= +range[1])) {
		return {
			passed: false,
			msgData: [+range[0], +range[1]]
		};
	}
	return {
		passed: true,
		data: val,
		msgData: [+range[0], +range[1]]
	};
};
