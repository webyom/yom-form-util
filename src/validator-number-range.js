var numberValidator = require('./validator-number');

module.exports = function(item, range) {
	range = range.split('~');
	if(!numberValidator({value: range[0]}) || !numberValidator({value: range[1]}) || !numberValidator(item)) {
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
