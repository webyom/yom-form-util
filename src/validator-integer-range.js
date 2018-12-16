var $ = require('jquery');
var util = require('./util');
var integerValidator = require('./validator-integer');

module.exports = function(item, range) {
	var val;
	item = $(item)[0];
	if((/^\s+|\s+$/).test(item.value)) {
		return false;
	}
	if(!item.value) {
		return true;
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
