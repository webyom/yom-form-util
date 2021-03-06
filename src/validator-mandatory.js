var $ = require('jquery');

module.exports = function(item) {
	var passed = false;
	var inputType, groupType;
	item = $(item)[0];
	if((/^\s+$/).test(item.value)) {
		return false;
	}
	switch(item.tagName) {
		case 'INPUT':
			inputType = item.type.toUpperCase()
			if(inputType == 'CHECKBOX' || inputType == 'RADIO') {
				passed = item.checked;
			} else {
				passed = !!item.value;
			}
			break;
		case 'SELECT':
		case 'TEXTAREA':
			passed = !!item.value;
			break;
		default:
			groupType = $(item).attr('data-validate-type');
			if(groupType == 'checkbox' || groupType == 'radio') {
				$('input[type="' + groupType + '"]', item).each(function(i, box) {
					if(box.checked) {
						passed = true;
						return false;
					}
				});
			} else if(groupType == 'input') {
				$('input', item).each(function(i, box) {
					if(!(/^button|submit|reset|image|checkbox|radio$/i).test(box.type) && $.trim(box.value)) {
						passed = true;
						return false;
					}
				});
			}
	}
	return passed;
};
