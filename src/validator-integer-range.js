var integerValidator = require('./validator-integer');

module.exports = function(item, range) {
	range = range.split('~');
	if(!integerValidator({value: range[0]}) || !integerValidator({value: range[1]}) || !integerValidator(item)) {
		return {
			passed: false,
			msgData: [+range[0], +range[1]]
		};
	}
	if(!(+item.value >= +range[0] && +item.value <= +range[1])) {
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
