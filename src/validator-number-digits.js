var $ = window.jQuery || window.$;

var integerValidator = require('./validator-integer');
var numberValidator = require('./validator-number');

module.exports = function(item, digits) {
	var val;
	item = $(item)[0];
	item.value = $.trim(item.value);
	if(!item.value) {
		return true;
	}
	if(!integerValidator({value: digits}) || !numberValidator(item)) {
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
	decimalPart = (val + '').split('.')[1] || item.value.split('.')[1];
	if(decimalPart && decimalPart.toLowerCase().indexOf('e') === -1 && decimalPart.length > digits) {
		return {
			passed: false,
			msgData: [+digits]
		};
	}
	return {
		passed: true,
		msgData: [+digits]
	};
};
