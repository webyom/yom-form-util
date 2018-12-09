var $ = require('jquery');
var util = require('./util');
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
	var msgData = [util.formatDecimal(range[0], '0'), util.formatDecimal(range[1], '0')];
	if(!integerValidator({value: range[0]}).passed || !integerValidator({value: range[1]}).passed || !integerValidator(item).passed) {
		return {
			passed: false,
			msgData: msgData
		};
	}
	val = +item.value;
	if(!(val >= +range[0] && val <= +range[1])) {
		return {
			passed: false,
			msgData: msgData
		};
	}
	return {
		passed: true,
		data: val,
		msgData: msgData
	};
};
