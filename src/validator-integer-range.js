var $ = window.jQuery || window.$;

var integerValidator = require('./validator-integer');

module.exports = function(item, range) {
	var val;
	item = $(item)[0];
	item.value = $.trim(item.value);
	if(!item.value) {
		return true;
	}
	range = range.split('~');
	if(!integerValidator({value: range[0]}) || !integerValidator({value: range[1]}) || !integerValidator(item)) {
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
		msgData: [+range[0], +range[1]]
	};
};
