var $ = require('jquery');

var integerValidator = require('./validator-integer');
var numberValidator = require('./validator-number');

module.exports = function(item, digits) {
	var val;
	item = $(item)[0];
	if((/^\s+|\s+$/).test(item.value)) {
		return false;
	}
	if(!item.value) {
		return true;
	}
	if(!integerValidator({value: digits}).passed || !numberValidator(item).passed) {
		return {
			passed: false,
			msgData: [+digits]
		};
	}
	val = +item.value;
	var decimalPart = item.value.split('.')[1];
	if(!decimalPart || (val + '').split('.')[0] + '.' + decimalPart != item.value) {
		item.value = val;
	}
	decimalPart = item.value.split('.')[1];
	if(decimalPart && decimalPart.length > digits) {
		return {
			passed: false,
			msgData: [+digits]
		};
	}
	return {
		passed: true,
		data: val,
		msgData: [+digits]
	};
};
