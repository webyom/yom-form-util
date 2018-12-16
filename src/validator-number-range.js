var $ = require('jquery');
var util = require('./util');
var numberValidator = require('./validator-number');

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
	var digits = Math.max((range[0].split('.')[1] || '').length, (range[1].split('.')[1] || '').length) + 1;
	var msgData = [util.formatDecimal(range[0], '0.' + new Array(digits).join('0')), util.formatDecimal(range[1], '0.' + new Array(digits).join('0'))];
	if(!numberValidator({value: range[0]}).passed || !numberValidator({value: range[1]}).passed || !numberValidator(item).passed) {
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
