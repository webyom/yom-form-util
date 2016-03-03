var _SEPARATOR = '||';
var _MAX_LENGTH = 80;

module.exports = function(item) {
	var itemNameHash = {};
	var itemNames = [];
	var hasDuplicated = false;
	var hasSeparator = false;
	var hasLengthExceed = false;
	var passed = true;
	$.each($(item).val().split('\n'), function(i, name) {
		name = $.trim(name);
		if(name) {
			if(itemNameHash[name]) {
				hasDuplicated = true;
				return false;
			}
			if(name.indexOf(_SEPARATOR) >= 0) {
				hasSeparator = true;
				return false;
			}
			if(name.length > _MAX_LENGTH) {
				hasLengthExceed = true;
				return false;
			}
			itemNameHash[name] = 1;
			itemNames.push(name);
		}
	});
	passed = !hasDuplicated && !hasSeparator && !hasLengthExceed;
	passed && $(item).val(itemNames.join('\n'));
	return {
		passed: passed,
		data: itemNames
	};
};
