var $ = require('jquery');

function getByteLength(str) {
  var res = 0;
  for(var i = 0, l = str.length; i < l; i++) {
    var charCode = str.charCodeAt(i);
    if(charCode <= 0x007f) {
      res++;
    } else if(charCode <= 0x07ff) {
      res += 2;
    } else if(charCode <= 0xffff) {
      res += 3;
    } else {
      res += 4;
    }
  }
  return res;
}

module.exports = function(item, maxLen) {
	item = $(item)[0];
	var inputLen = getByteLength(item.value);
	var passed = inputLen <= maxLen;
	return {
		passed: passed,
		msgData: [maxLen, inputLen - maxLen]
	};
};
