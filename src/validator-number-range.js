var $ = window.jQuery || window.$;

var numberValidator = require('./validator-number');

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
	if(!numberValidator({value: range[0]}).passed || !numberValidator({value: range[1]}).passed || !numberValidator(item).passed) {
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
