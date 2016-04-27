define(['require', 'exports', 'module', './validator-mandatory', './validator-email', './validator-email-list', './validator-mobile', './validator-name', './validator-password', './validator-max-length', './validator-max-byte-length', './validator-url', './validator-set', './validator-number', './validator-integer', './validator-number-range', './validator-integer-range', './validator-datetime', './validator-word-upper-case', './validator-domain', './validator-domain-list'], function(require, exports, module) {
var $ = window.jQuery || window.$;

var UNDEFINED = {};

var _msg = {};
var _commonMsg = {};
var _validators = {};

function _getEmptyValue(emptyValue) {
	return typeof emptyValue == 'undefined' ? null : emptyValue == UNDEFINED ? undefined : emptyValue;
}

function _getGroup(item) {
	var group = $(item).closest('.form-group, .validate-group');
	if(group.length) {
		return group;
	}
	return null;
}

function _getHelper(item, group) {
	var helper;
	group = group || _getGroup(item);
	if(group) {
		helper = $('.help-error', group);
		if(helper.length) {
			return helper;
		}
	}
	return null;
}

var YomFormUtil = {};

YomFormUtil.UNDEFINED = UNDEFINED;

YomFormUtil.getMsg = function(item, type, key) {
	var msg = $(item).attr('data-' + type + '-msg');
	return msg || key && _msg[key] && _msg[key][type] || _commonMsg[type];
};

YomFormUtil.formatMsg = function(msg, data) {
	msg = msg + '';
	if(data) {
		$.each(data, function(key, val) {
			msg = msg.replace(new RegExp('\\{\\{' + key + '\\}\\}', 'g'), val);
		});
	}
	return msg;
};

YomFormUtil.addValidator = function(name, validator) {
	if(validator) {
		_validators[name] = validator;
	} else if(typeof name == 'object') {
		for(var p in name) {
			if(name.hasOwnProperty(p)) {
				_validators[p] = name[p];
			}
		}
	}
};

YomFormUtil.highLight = function(item, msg, type) {
	var helper;
	var group = _getGroup(item);
	if(group) {
		helper = _getHelper(item, group);
		group.removeClass('has-error has-warning has-info has-success');
		if(type === '') {
			helper && helper.hide();
		} else {
			group.addClass('has-' + (type || 'error'));
			if(helper) {
				if(msg) {
					helper.html(msg).css('display', helper.hasClass('help-block') ? 'block' : 'inline-block');
					return true;
				} else {
					helper.hide();
				}
			}
		}
	}
	return false;
};

YomFormUtil.dehighLight = function(item) {
	YomFormUtil.highLight(item, '', '');
};

YomFormUtil.validateOne = function(item) {
	var res = {
		passed: true
	};
	var request = $(item).attr('data-validator');
	var tmp, key, list, fieldData;
	if(!request) {
		YomFormUtil.dehighLight(item);
		return res;
	}
	tmp = request.split(/\s*:\s*/);
	key = tmp[0];
	list= tmp[1];
	if(!list) {
		list = key;
		key = '';
	}
	if(!list) {
		return res;
	}
	list = list.split(/\s+/);
	$.each(list, function(i, type) {
		var passed = true;
		var tmp, msg, msgData, validator, validatorParam;
		if(!type) {
			return;
		}
		if(type.indexOf('@') > 0) {
			tmp = type.split('@');
			validatorParam = tmp[0];
			type = tmp[1];
		}
		validator = _validators[type];
		if(validator) {
			passed = validator(item, validatorParam);
			if(typeof passed == 'object') {
				fieldData = passed.data;
				msgData = passed.msgData;
				passed = passed.passed;
			}
		} else {
			var value = $.trim($(item).val());
			if(value) {
				validator = $(item).attr('data-' + type + '-regexp');
				if(validator) {
					passed = new RegExp(validator, $(item).attr('data-' + type + '-regexp-attr')).test(value);
				} else {
					validator = $(item).attr('data-' + type + '-neg-regexp');
					if(validator) {
						passed = !(new RegExp(validator, $(item).attr('data-' + type + '-neg-regexp-attr')).test(value));
					}
				}
			}
		}
		if(!passed) {
			msg = YomFormUtil.getMsg(item, type, key);
			if(msgData) {
				msg = YomFormUtil.formatMsg(msg, msgData);
			}
			res = {
				passed: false,
				helped: YomFormUtil.highLight(item, msg),
				failType: type,
				failMsg: msg
			};
			return false;
		}
	});
	if(res.passed) {
		if(fieldData) {
			res.data = fieldData;
		}
		YomFormUtil.dehighLight(item);
	}
	return res;
};

YomFormUtil.validate = function(container, opt) {
	var res = {
		passed: true,
		data: {},
		failList: [],
		helpList: []
	};
	$('[data-validator]', container).each(function(i, item) {
		var $item = $(item);
		var innerComponent = $item.closest('.yom-form-util-component')[0];
		if(innerComponent && $.contains($(container)[0], innerComponent)) {
			return;
		}
		if($item.closest('.display-none, .hide, .hidden').length) {
			return;
		}
		var oneRes = YomFormUtil.validateOne(item);
		var failItem
		if(!oneRes.passed) {
			res.passed = false;
			failItem = {item: item, failType: oneRes.failType, failMsg: oneRes.failMsg};
			res.failList.push(failItem);
			if(!oneRes.helped) {
				res.helpList.push(failItem);
			}
		} else if(oneRes.data) {
			res.data[this.name] = oneRes.data;
		}
	});
	res.data = $.extend(YomFormUtil.getData(container, opt), res.data);
	return res;
};

YomFormUtil.getData = function(container, opt) {
	opt = opt || {};
	var emptyValue = _getEmptyValue(opt.emptyValue);
	var returnArray = opt.returnArray;
	var res = returnArray ? [] : {};
	var inputType;
	$('input, select, textarea', container).each(function(i, item) {
		if(!item.name) {
			return;
		}
		var innerComponent = $(item).closest('.yom-form-util-component')[0];
		if(innerComponent && $.contains($(container)[0], innerComponent)) {
			return;
		}
		switch(item.tagName) {
			case 'INPUT':
				inputType = item.type.toUpperCase();
				if(inputType == 'CHECKBOX') {
					if(opt.stdForm) {
						if(returnArray) {
							res.push(item.checked ? 'on' : 'off');
						} else {
							if(item.checked) {
								res[item.name] = 'on';
							}
						}
					} else {
						if(returnArray) {
							res.push(item.checked);
						} else {
							res[item.name] = item.checked;
						}
					}
				} else if(inputType == 'RADIO') {
					if(returnArray) {
						res.push(item.checked ? item.value : emptyValue);
					} else {
						res[item.name] = item.checked ? item.value : emptyValue;
					}
				} else {
					if(returnArray) {
						res.push(item.value || emptyValue);
					} else {
						res[item.name] = item.value || emptyValue;
					}
				}
				break;
			case 'SELECT':
			case 'TEXTAREA':
				if(returnArray) {
					res.push(item.value || emptyValue);
				} else {
					res[item.name] = item.value || emptyValue;
				}
				break;
			default:
		}
	});
	return res;
};

YomFormUtil.focus = function(item, select) {
	item = $(item)[0];
	var tagName = item.tagName;
	if(!(tagName == 'INPUT' || tagName == 'SELECT' || tagName == 'TEXTAREA')) {
		item = $('.has-error input, .has-error input, .has-error textarea', item)[0];
	}
	if(item) {
		try {
			item.focus();
			select && item.select();
		} catch(e) {}
	}
};

YomFormUtil.setMsg = function(msg) {
	if(msg) {
		_msg = $.extend(_msg, msg);
	}
};

YomFormUtil.setCommonMsg = function(commonMsg) {
	if(commonMsg) {
		_commonMsg = $.extend(_commonMsg, commonMsg);
	}
};

YomFormUtil.initPlaceHolder = function(field, opt) {
	opt = opt || {};
	$(field).each(function(i, field) {
		field = $(field);
		var placeHolder = field.prev('.place-holder-text');
		if(!field.val()) {
			placeHolder.show();
		}
		placeHolder.on('click', function() {
			try {
				field[0].focus();
			} catch(e) {}
		});
		field.on('keyup', function() {
			if(this.value) {
				placeHolder.hide();
			} else {
				placeHolder.show();
			}
		}).on('focus', function() {
			placeHolder.addClass('focus');
			if(opt.onFocus) {
				opt.onFocus.call(field[0]);
			}
		}).on('blur', function() {
			if(this.value) {
				placeHolder.hide();
			} else {
				placeHolder.show();
			}
			placeHolder.removeClass('focus');
			if(opt.onBlur) {
				opt.onBlur.call(field[0]);
			}
		});
	});
};

YomFormUtil.checkPlaceHolder = function(field, opt) {
	opt = opt || {};
	$(field).each(function(i, field) {
		field = $(field);
		var placeHolder = field.prev('.place-holder-text');
		if(!field.val()) {
			placeHolder.show();
		} else {
			placeHolder.hide();
		}
	});
};

YomFormUtil.initInputHint = function() {
	$(document.body).delegate('.input-hint-wrapper .form-control', 'focus', function(evt) {
		var hintWrapper = $(this).closest('.input-hint-wrapper');
		var hintBox = $('.input-hint-box', hintWrapper);
		var hintContent = hintBox.html();
		if(hintContent) {
			if(!hintBox.attr('data-default-hint-content')) {
				hintBox.attr('data-default-hint-content', hintContent);
			}
			hintWrapper.addClass('input-hint-on');
		}
	}).delegate('.input-hint-wrapper .form-control', 'blur', function(evt) {
		var hintWrapper = $(evt.target).closest('.input-hint-wrapper');
		var hintBox = $('.input-hint-box', hintWrapper);
		var toRef = setTimeout(function() {
			hintWrapper.removeClass('input-hint-on');
		}, 200);
		hintBox.on('click', function boxClick(evt) {
			clearTimeout(toRef);
			hintBox.off('click', boxClick);
			$(document).on('click', function bodyClick(evt) {
				if($(evt.target).closest('.input-hint-wrapper')[0] == hintWrapper[0]) {
					return;
				}
				hintWrapper.removeClass('input-hint-on');
				$(document).off('click', bodyClick);
			});
		});
	});
	YomFormUtil.initInputHint = function() {};
};

YomFormUtil.showInputHint = function(inputBox, hint, type) {
	var hintWrapper = $(inputBox).closest('.input-hint-wrapper');
	var hintBox = $('.input-hint-box', hintWrapper);
	hintWrapper.removeClass('input-hint-error input-hint-success input-hint-warning input-hint-info');
	if(type) {
		hintWrapper.addClass('input-hint-' + type);
	}
	hintBox.html(hint);
	hintWrapper.addClass('input-hint-on');
};

YomFormUtil.hideInputHint = function(inputBox, clear) {
	var hintWrapper = $(inputBox).closest('.input-hint-wrapper');
	var hintBox = $('.input-hint-box', hintWrapper);
	hintWrapper.removeClass('input-hint-on input-hint-error input-hint-success input-hint-warning input-hint-info');
	if(clear) {
		hintWrapper.removeClass('input-hint-error, input-hint-success, input-hint-warning, input-hint-info');
		hintBox.html(hintBox.attr('data-default-hint-content') || '');
	}
};

YomFormUtil.moveInputEnd = function(boxEl) {
	var textRange;
	boxEl = $(boxEl)[0];
	YomFormUtil.focus(boxEl);
	if(boxEl.createTextRange) {
		textRange = boxEl.createTextRange();
		textRange.moveStart('character', boxEl.value.length);
		textRange.collapse(true);
		textRange.select();
	} else {
		boxEl.setSelectionRange(boxEl.value.length, boxEl.value.length);
	}
};

/**
 * getInputRange
 * 获取Input或者Textarea选中的文字的Range
 * @param {Element | jQuery DOM} textarea textarea元素或者input元素
 * @return {Range} 一个包含range信息的对象（如果要对IE7、IE8兼容，Range是无法伪造的）
 */
YomFormUtil.getInputRange = function(textarea) {
	(textarea instanceof $) && (textarea = textarea[0]);
	textarea.focus();
	var rangeData = {text: '', start: 0, end: 0 };
	if(textarea.setSelectionRange) { // W3C
		rangeData.start= textarea.selectionStart;
		rangeData.end = textarea.selectionEnd;
		rangeData.text = (rangeData.start != rangeData.end) ? textarea.value.substring(rangeData.start, rangeData.end): "";
	} else if(document.selection) { // IE
		var i,
			initRange = document.selection.createRange(),
			oS = document.selection.createRange(),
			oR = document.body.createTextRange();
		oR.moveToElementText(textarea);
		rangeData.text = oS.text;
		rangeData.bookmark = oS.getBookmark();
		textarea.select();
		oS.setEndPoint('StartToStart', document.selection.createRange());
		rangeData.end = oS.text.length;
		rangeData.start = rangeData.end - rangeData.text.length;
		initRange.select();
	}
	return rangeData;
};

/**
 * setInputRange
 * 按照Range设置input或者textarea的位置
 * @param {ELement | jQuery DOM} textarea textarea或input对象
 * @param {Range} 包含Range数据的对象，如果为空则与moveInputEnd一样
 */
function _setInputRange(textarea, rangeData) {
	var oR;
	textarea.focus();
	if(textarea.setSelectionRange) { // W3C
		textarea.setSelectionRange(rangeData.start, rangeData.end);
	} else if(textarea.createTextRange) { // IE
		oR = textarea.createTextRange();
		// Fixbug : ues moveToBookmark()
		// In IE, if cursor position at the end of textarea, the set function don't work
		if(textarea.value.length === rangeData.start) {
			oR.collapse(false);
			oR.select();
		} else {
			oR.moveToBookmark(rangeData.bookmark);
			oR.select();
		}
	}
}

/**
 * addText2Input
 * 向Input或Textarea添加文字
 * @param {ELement | jQuery DOM} textarea textarea或input对象
 * @param {String} text 添加的文字
 * @param {Range} rangeData 可选的range数据
 */
YomFormUtil.addText2Input = function (textarea, text, rangeData) {
	(textarea instanceof $) && (textarea = textarea[0]);
	(rangeData) || (rangeData = this.getInputRange(textarea));
	var oValue, nValue, sR, nStart, nEnd, st;
	if(textarea.setSelectionRange) { // W3C
		oValue = textarea.value;
		nValue = oValue.substring(0, rangeData.start) + text + oValue.substring(rangeData.end);
		nStart = nEnd = rangeData.start + text.length;
		st = textarea.scrollTop;
		textarea.value = nValue;
		// Fixbug:
		// After textarea.values = nValue, scrollTop value to 0
		if(textarea.scrollTop != st) {
			textarea.scrollTop = st;
		}
		setTimeout(function () {
			textarea.setSelectionRange(nStart, nEnd);
		}, 0);
	} else if(textarea.createTextRange) { // IE
		_setInputRange(textarea, rangeData); // in IE7 & IE8, we need set the range first.
		sR = document.selection.createRange();
		sR.text = text;
		sR.setEndPoint('StartToEnd', sR);
		sR.select();
		var _rangeData = this.getInputRange(textarea);
		rangeData.text = _rangeData;
		rangeData.start = _rangeData.start;
		rangeData.bookmark = _rangeData.bookmark;
		rangeData.end = _rangeData.end;
	}
};

YomFormUtil.addValidator({
	mandatory: require('./validator-mandatory'),
	email: require('./validator-email'),
	emailList: require('./validator-email-list'),
	mobile: require('./validator-mobile'),
	name: require('./validator-name'),
	password: require('./validator-password'),
	maxLength: require('./validator-max-length'),
	maxByteLength: require('./validator-max-byte-length'),
	url: require('./validator-url'),
	set: require('./validator-set'),
	number: require('./validator-number'),
	integer: require('./validator-integer'),
	numberRange: require('./validator-number-range'),
	integerRange: require('./validator-integer-range'),
	datetime: require('./validator-datetime'),
	wordUpperCase: require('./validator-word-upper-case'),
	domain: require('./validator-domain'),
	domainList: require('./validator-domain-list')
});

YomFormUtil.setCommonMsg(window.YomFormUtilCommonMsg || {
	mandatory: '必填项。',
	email: '无效的邮件地址。',
	emailList: '无效的邮件地址。',
	mobile: '无效的手机号码。',
	name: '不能包含分号。',
	password: '密码长度在6~16之间，必须包含大写字母、小写字母和数字，不能包含空格。',
	maxLength: '输入长度超过限制，需要删除{{1}}个字。',
	maxByteLength: '输入长度超过限制，需要删除{{1}}个字。',
	url: '无效的URL。',
	set: '不能含有重复的值，单个值的最大长度是80，值不能包含“||”。',
	number: '必须输入一个数字。',
	integer: '必须输入一个整数。',
	numberRange: '必须输入{{0}}到{{1}}范围之间的数字。',
	integerRange: '必须输入{{0}}到{{1}}范围之间的整数。',
	datetime: '无效的日期时间格式。',
	wordUpperCase: '只能输入大写字母、数字或下划线。',
	domain: '无效的域名。',
	domainList: '无效的域名。'
});

module.exports = YomFormUtil;

});

define('./validator-mandatory', ['require', 'exports', 'module'], function(require, exports, module) {
var $ = window.jQuery || window.$;

module.exports = function(item) {
	var passed = false;
	var inputType, groupType;
	item = $(item)[0];
	switch(item.tagName) {
		case 'INPUT':
			inputType = item.type.toUpperCase()
			if(inputType == 'CHECKBOX' || inputType == 'RADIO') {
				passed = item.checked;
			} else {
				item.value = $.trim(item.value);
				passed = !!item.value;
			}
			break;
		case 'SELECT':
		case 'TEXTAREA':
			item.value = $.trim(item.value);
			passed = !!item.value;
			break;
		default:
			groupType = $(item).data('validate-type');
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

});

define('./validator-email', ['require', 'exports', 'module'], function(require, exports, module) {
module.exports = function(item) {
	var passed;
	item = $(item)[0];
	if(!$.trim(item.value)) {
		return true;
	}
	item.value = $.trim(item.value.toLowerCase());
	passed = (/^[a-zA-Z0-9_.-]{1,63}@([a-zA-Z0-9_-]{1,63}\.)+[a-zA-Z0-9_-]{1,63}$/).test(item.value);
	return passed;
};

});

define('./validator-email-list', ['require', 'exports', 'module'], function(require, exports, module) {
var $ = window.jQuery || window.$;

module.exports = function(item) {
	var passed, data;
	item = $(item)[0];
	if(!$.trim(item.value)) {
		return true;
	}
	item.value = item.value.toLowerCase()
		.replace(/\s*\n\s*/g, '\n')
		.replace(/,/g, ';')
		.replace(/;*\n;*/g, '\n')
		.replace(/(\s*;\s*)+/g, '; ')
		.replace(/^(;\s*)+|^\n+|(;\s*)+$|\n+$/g, '');
	item.value = $.trim(item.value);
	data = item.value.split(/; |\n/);
	$.each(data, function(i, val) {
		passed = (/^[a-zA-Z0-9_.-]{1,63}@([a-zA-Z0-9_-]{1,63}\.)+[a-zA-Z0-9_-]{1,63}$/).test(val);
		return passed;
	});
	return {
		passed: passed,
		data: data
	};
};

});

define('./validator-mobile', ['require', 'exports', 'module'], function(require, exports, module) {
module.exports = function(item) {
	var passed;
	item = $(item)[0];
	if(!$.trim(item.value)) {
		return true;
	}
	item.value = $.trim(item.value.toLowerCase());
	passed = (/^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57]|106[0-9]{2})[0-9]{8}$/).test(item.value);
	return passed;
};

});

define('./validator-name', ['require', 'exports', 'module'], function(require, exports, module) {
module.exports = function(item) {
	item = $(item)[0];
	var passed = item.value.indexOf(';') < 0;
	return passed;
};

});

define('./validator-password', ['require', 'exports', 'module'], function(require, exports, module) {
module.exports = function(item) {
	item = $(item)[0];
	var len = item.value.length;
	var passed = len >= 6 && len <= 16 && !(/\s/).test(item.value) && (/[a-z]/).test(item.value) && (/[A-Z]/).test(item.value) && (/[0-9]/).test(item.value);
	return passed;
};

});

define('./validator-max-length', ['require', 'exports', 'module'], function(require, exports, module) {
module.exports = function(item, maxLen) {
	item = $(item)[0];
	var inputLen = item.value.length;
	var passed = inputLen <= maxLen;
	return {
		passed: passed,
		msgData: [maxLen, inputLen - maxLen]
	};
};

});

define('./validator-max-byte-length', ['require', 'exports', 'module'], function(require, exports, module) {
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

});

define('./validator-url', ['require', 'exports', 'module'], function(require, exports, module) {
module.exports = function(item) {
	var passed;
	item = $(item)[0];
	if(!$.trim(item.value)) {
		return true;
	}
	item.value = $.trim(item.value);
	passed = (/^https?:\/\//).test(item.value);
	return passed;
};

});

define('./validator-set', ['require', 'exports', 'module'], function(require, exports, module) {
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

});

define('./validator-number', ['require', 'exports', 'module'], function(require, exports, module) {
module.exports = function(item) {
	var val;
	item = $(item)[0];
	if(!$.trim(item.value)) {
		return true;
	}
	item.value = $.trim(item.value);
	val = +item.value;
	if(isNaN(val)) {
		return false;
	} else {
		item.value = val;
		return true;
	}
};

});

define('./validator-integer', ['require', 'exports', 'module'], function(require, exports, module) {
module.exports = function(item) {
	var val;
	item = $(item)[0];
	if(!$.trim(item.value)) {
		return true;
	}
	item.value = $.trim(item.value);
	val = +item.value;
	if(isNaN(val) || (val + '').indexOf('.') >= 0) {
		return false;
	} else {
		item.value = val;
		return true;
	}
};

});

define('./validator-number-range', ['require', 'exports', 'module', './validator-number'], function(require, exports, module) {
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

});

define('./validator-integer-range', ['require', 'exports', 'module', './validator-integer'], function(require, exports, module) {
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

});

define('./validator-datetime', ['require', 'exports', 'module'], function(require, exports, module) {
var _MONTH_DAYS = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

module.exports = function(item, format) {
	var tmp, val, dateVal, timeVal, dateFormat, timeFormat, year, month, hour, minute, second, date;
	item = $(item)[0];
	if(!$.trim(item.value)) {
		return {
			passed: true,
			data: null
		};
	}
	val = item.value = $.trim(item.value.replace(/(\s)+/g, '$1'));
	val = val.split(' ');
	format = format.split(' ');
	if(val.length != format.length) {
		return {
			passed: false,
			data: null
		};
	}
	dateVal = val[0];
	timeVal = val[1];
	dateFormat = format[0];
	timeFormat = format[1];
	val = dateVal.match(/\d+/g);
	format = dateFormat.match(/[yMd]+/g);
	if(!val || val.length != format.length) {
		return {
			passed: false,
			data: null
		};
	}
	year = +val[0];
	month = +val[1];
	date = +val[2];
	if(val[1].length > 2 || val[2].length > 2 || month === 0 || date === 0 || month > 12 || date > _MONTH_DAYS[month]) {
		return {
			passed: false,
			data: null
		};
	}
	if(month === 2 && !(year % 4 == 0 && year % 100 !=0 || year % 400==0) && date > 28) {
		return {
			passed: false,
			data: null
		};
	}
	if(format[1] == 'M' && month < 10 && val[1].charAt(0) == '0') {
		return {
			passed: false,
			data: null
		};
	}
	if(format[1] == 'MM' && month < 10 && val[1].charAt(0) != '0') {
		return {
			passed: false,
			data: null
		};
	}
	if(format[2] == 'd' && date < 10 && val[2].charAt(0) == '0') {
		return {
			passed: false,
			data: null
		};
	}
	if(format[2] == 'dd' && date < 10 && val[2].charAt(0) != '0') {
		return {
			passed: false,
			data: null
		};
	}
	if(dateFormat.replace(format[0], val[0]).replace(format[1], val[1]).replace(format[2], val[2]) != dateVal) {
		return {
			passed: false,
			data: null
		};
	}
	if(!timeFormat) {
		return {
			passed: true,
			data: new Date(year, month - 1, date)
		};
	}
	val = timeVal.match(/\d+/g);
	format = timeFormat.match(/[Hhms]+/g);
	if(!val || val.length != format.length) {
		return {
			passed: false,
			data: null
		};
	}
	hour = +val[0];
	minute = +val[1];
	second = +val[2];
	if(val[0].length > 2 || val[1].length > 2 || val[2].length > 2 || hour > 24 || minute > 59 || second > 59) {
		return {
			passed: false,
			data: null
		};
	}
	if((format[0] == 'h' || format[0] == 'hh') && hour > 12) {
		return {
			passed: false,
			data: null
		};
	}
	if((format[0] == 'H' || format[0] == 'h') && hour < 10 && val[0].charAt(0) == '0') {
		return {
			passed: false,
			data: null
		};
	}
	if((format[0] == 'HH' || format[0] == 'hh') && hour < 10 && val[0].charAt(0) != '0') {
		return {
			passed: false,
			data: null
		};
	}
	if(format[1] == 'm' && minute < 10 && val[1].charAt(0) == '0') {
		return {
			passed: false,
			data: null
		};
	}
	if(format[1] == 'mm' && minute < 10 && val[1].charAt(0) != '0') {
		return {
			passed: false,
			data: null
		};
	}
	if(format[2] == 's' && second < 10 && val[2].charAt(0) == '0') {
		return {
			passed: false,
			data: null
		};
	}
	if(format[2] == 'ss' && second < 10 && val[2].charAt(0) != '0') {
		return {
			passed: false,
			data: null
		};
	}
	if(timeFormat.replace(format[0], val[0]).replace(format[1], val[1]).replace(format[2], val[2]) != timeVal) {
		return {
			passed: false,
			data: null
		};
	}
	return {
		passed: true,
		data: new Date(year, month - 1, date, hour, minute, second)
	};
};

});

define('./validator-word-upper-case', ['require', 'exports', 'module'], function(require, exports, module) {
module.exports = function(item) {
	var passed;
	item = $(item)[0];
	if(!$.trim(item.value)) {
		return true;
	}
	item.value = $.trim(item.value.toUpperCase());
	passed = !(/\W/).test(item.value);
	return passed;
};

});

define('./validator-domain', ['require', 'exports', 'module'], function(require, exports, module) {
module.exports = function(item) {
	var passed;
	item = $(item)[0];
	if(!$.trim(item.value)) {
		return true;
	}
	item.value = $.trim(item.value);
	passed = (/^([a-zA-Z0-9\-]{1,63}\.)+[a-zA-Z0-9\-]{1,63}$/).test(item.value);
	return passed;
};

});

define('./validator-domain-list', ['require', 'exports', 'module'], function(require, exports, module) {
var $ = window.jQuery || window.$;

module.exports = function(item) {
	var passed, data;
	item = $(item)[0];
	if(!$.trim(item.value)) {
		return true;
	}
	item.value = item.value.toLowerCase()
		.replace(/\s*\n\s*/g, '\n')
		.replace(/,/g, ';')
		.replace(/;*\n;*/g, '\n')
		.replace(/(\s*;\s*)+/mg, '; ')
		.replace(/^(;\s*)+|^\n+|(;\s*)+$|\n+$/g, '');
	item.value = $.trim(item.value);
	data = item.value.split(/; |\n/);
	$.each(data, function(i, val) {
		passed = (/^([a-zA-Z0-9\-]{1,63}\.)+[a-zA-Z0-9\-]{1,63}$/).test(val);
		return passed;
	});
	return {
		passed: passed,
		data: data
	};
};

});