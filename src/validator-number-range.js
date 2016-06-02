var $ = window.jQuery || window.$;

var numberValidator = require('./validator-number');

module.exports = function(item, range) {
	var val;
	item = $(item)[0];
	item.value = $.trim(item.value);
	if(!item.value) {
		return true;
	}
	range = range.split('~');
	if(!numberValidator({value: range[0]}) || !numberValidator({value: range[1]}) || !numberValidator(item)) {
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
