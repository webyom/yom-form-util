var $ = require('jquery');

module.exports = function(item, maxLen) {
	item = $(item)[0];
	var inputLen = item.value.length;
	var passed = inputLen <= maxLen;
	return {
		passed: passed,
		msgData: [maxLen, inputLen - maxLen]
	};
};
