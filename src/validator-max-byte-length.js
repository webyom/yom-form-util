var $ = window.jQuery || window.$;

function _getByteLength(str) {
	return str.replace(/[^\x00-\xff]/g, 'xx').length;
}

module.exports = function(item, maxLen) {
	item = $(item)[0];
	var inputLen = _getByteLength(item.value);
	var passed = inputLen <= maxLen;
	return {
		passed: passed,
		msgData: [maxLen, inputLen - maxLen]
	};
};
