(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery"], factory);
	else if(typeof exports === 'object')
		exports["default"] = factory(require("jquery"));
	else
		root["YomFormUtil"] = root["YomFormUtil"] || {}, root["YomFormUtil"]["default"] = factory(root["$"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__0__;

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);

module.exports = function(item) {
	var val;
	item = $(item)[0];
	item.value = $.trim(item.value);
	if(!item.value) {
		return {
			passed: true,
			data: null
		};
	}
	val = +item.value;
	if(isNaN(val) || !isFinite(val) || (/e|\.$/i).test(item.value)) {
		return {
			passed: false
		};
	}
	var decimalPart = item.value.split('.')[1];
	if(!decimalPart || (val + '').split('.')[0] + '.' + decimalPart != item.value) {
		item.value = val;
	}
	return {
		passed: true,
		data: val
	};
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);

var MAX_SAFE_INTEGER = 9007199254740991;
var MIN_SAFE_INTEGER = -9007199254740991;

module.exports = function(item) {
	var val;
	item = $(item)[0];
	item.value = $.trim(item.value);
	if(!item.value) {
		return {
			passed: true,
			data: null
		};
	}
	val = +item.value;
	if(isNaN(val) || !isFinite(val) || val > MAX_SAFE_INTEGER || MAX_SAFE_INTEGER < MIN_SAFE_INTEGER || (/e|\./i).test(item.value)) {
		return {
			passed: false
		};
	}
	item.value = val;
	return {
		passed: true,
		data: val
	};
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

exports.formatDecimal = function (decimal, format, opt) {
  opt = opt || {};
  function formatInteger(integer) {
    var res = [],
      count = 0;
    var arr = integer.split('');
    while (arr.length) {
      if (count && !(count % 3)) {
        res.unshift(',');
      }
      res.unshift(arr.pop());
      count++;
    }
    return res.join('');
  }
  var res = '';
  var decimalMatchRes, formatMatchRes, fLen, dLen;
  decimal += '';
  if (!decimal) {
    return decimal;
  }
  decimalMatchRes = decimal.match(/^(-?)(\w*)(.?)(\w*)/) || [];
  formatMatchRes = format.match(/^(-?)(\w*)(.?)(\w*)/) || [];
  if (formatMatchRes[2]) {
    res += decimalMatchRes[2];
  }
  if (formatMatchRes[3] && formatMatchRes[4]) {
    res += formatMatchRes[3];
  } else {
    if (opt.round) {
      res = Math.round(parseFloat(decimal)) + '';
    } else if (opt.ceil) {
      res = Math.ceil(parseFloat(decimal)) + '';
    }
    if (opt.formatInteger !== false) {
      res = formatInteger(res);
    }
    return res;
  }
  fLen = Math.min(formatMatchRes[4].length, 4);
  dLen = decimalMatchRes[4].length;
  res += decimalMatchRes[4].slice(0, fLen);
  if (fLen > dLen) {
    res += new Array(fLen - dLen + 1).join('0');
  }
  if (
    dLen > fLen
    && ((opt.round && +decimalMatchRes[4].charAt(fLen) >= 5)
      || (opt.ceil && +decimalMatchRes[4].charAt(fLen) > 0))
  ) {
    return formatDecimal(
      (parseFloat(res) * Math.pow(10, fLen) + 1) / Math.pow(10, fLen),
      format
    );
  }
  res = res.split('.');
  if (opt.formatInteger !== false) {
    res[0] = formatInteger(res[0]);
  }
  res = res.join('.');
  if (decimalMatchRes[1] && res != '0') {
    res = decimalMatchRes[1] + res;
  }
  return res;
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);

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
	if (typeof item == 'string') {
		type = item;
		key = type;
		item = null;
	}
	var msg = item && $(item).attr('data-' + type + '-msg');
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
					helper.html(msg).attr('title', msg).css('display', helper.hasClass('help-block') ? 'block' : 'inline-block');
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
			msg = YomFormUtil.getMsg($(item), type, key);
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
					} else if (item.checked) {
						if($(item).attr('data-value-type') == 'bool') {
							res[item.name] = (item.value + '').toLowerCase() == 'false' ? false : true;
						} else {
							res[item.name] = item.value || emptyValue;
						}
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
		item = $('.has-error input, .has-error select, .has-error textarea', item)[0];
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
	'mandatory': __webpack_require__(6),
	'email': __webpack_require__(7),
	'email-list': __webpack_require__(8),
	'mobile': __webpack_require__(9),
	'name': __webpack_require__(10),
	'password': __webpack_require__(11),
	'max-length': __webpack_require__(12),
	'max-byte-length': __webpack_require__(13),
	'url': __webpack_require__(14),
	'set': __webpack_require__(15),
	'number': __webpack_require__(2),
	'number-range': __webpack_require__(16),
	'number-digits': __webpack_require__(17),
	'integer': __webpack_require__(3),
	'integer-range': __webpack_require__(18),
	'datetime': __webpack_require__(19),
	'word-upper-case': __webpack_require__(20),
	'domain': __webpack_require__(21),
	'domain-list': __webpack_require__(22)
});

module.exports = YomFormUtil;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);

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


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);

module.exports = function(item) {
	var passed;
	item = $(item)[0];
	item.value = $.trim(item.value.toLowerCase());
	if(!item.value) {
		return true;
	}
	passed = (/^[a-zA-Z0-9_.-]{1,63}@([a-zA-Z0-9_-]{1,63}\.)+[a-zA-Z0-9_-]{1,63}$/).test(item.value);
	return passed;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);

module.exports = function(item) {
	var passed, data;
	item = $(item)[0];
	item.value = item.value.toLowerCase()
		.replace(/\s*\n\s*/g, '\n')
		.replace(/,/g, ';')
		.replace(/;*\n;*/g, '\n')
		.replace(/(\s*;\s*)+/g, '; ')
		.replace(/^(;\s*)+|^\n+|(;\s*)+$|\n+$/g, '');
	item.value = $.trim(item.value);
	if(!item.value) {
		return true;
	}
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


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);

module.exports = function(item) {
	var passed;
	item = $(item)[0];
	item.value = $.trim(item.value.toLowerCase());
	if(!item.value) {
		return true;
	}
	passed = (/^(0|86|17951)?(13[0-9]|14[57]|15[012356789]|16[6]|17[0-9]|18[0-9]|19[0-9]|106[0-9]{2})[0-9]{8}$/).test(item.value);
	return passed;
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);

module.exports = function(item) {
	item = $(item)[0];
	var passed = item.value.indexOf(';') < 0;
	return passed;
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);

module.exports = function(item) {
	item = $(item)[0];
	var len = item.value.length;
	var passed = len >= 6 && len <= 16 && !(/\s/).test(item.value) && (/[a-z]/).test(item.value) && (/[A-Z]/).test(item.value) && (/[0-9]/).test(item.value);
	return passed;
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);

module.exports = function(item, maxLen) {
	item = $(item)[0];
	var inputLen = item.value.length;
	var passed = inputLen <= maxLen;
	return {
		passed: passed,
		msgData: [maxLen, inputLen - maxLen]
	};
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);

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


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);

module.exports = function(item) {
	var passed;
	item = $(item)[0];
	item.value = $.trim(item.value.toLowerCase());
	if(!item.value) {
		return true;
	}
	passed = (/^https?:\/\//).test(item.value);
	return passed;
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);

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


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);
var util = __webpack_require__(4);
var numberValidator = __webpack_require__(2);

module.exports = function(item, range) {
	var val;
	item = $(item)[0];
	item.value = $.trim(item.value);
	if(!item.value) {
		return {
			passed: true,
			data: null
		};
	}
	range = range.split('~');
	var digits = Math.max((range[0].split('.')[1] || '').length, (range[1].split('.')[1] || '').length) + 1;
	var msgData = [util.formatDecimal(range[0], '0.' + new Array(digits).join('0')), util.formatDecimal(range[1], '0.' + new Array(digits).join('0'))];
	if(!numberValidator({value: range[0]}).passed || !numberValidator({value: range[1]}).passed || !numberValidator(item).passed) {
		return {
			passed: false,
			msgData: msgData
		};
	}
	val = +item.value;
	if(!(val >= +range[0] && val <= +range[1])) {
		return {
			passed: false,
			msgData: msgData
		};
	}
	return {
		passed: true,
		data: val,
		msgData: msgData
	};
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);

var integerValidator = __webpack_require__(3);
var numberValidator = __webpack_require__(2);

module.exports = function(item, digits) {
	var val;
	item = $(item)[0];
	item.value = $.trim(item.value);
	if(!item.value) {
		return {
			passed: true,
			data: null
		};
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


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);
var util = __webpack_require__(4);
var integerValidator = __webpack_require__(3);

module.exports = function(item, range) {
	var val;
	item = $(item)[0];
	item.value = $.trim(item.value);
	if(!item.value) {
		return {
			passed: true,
			data: null
		};
	}
	range = range.split('~');
	var msgData = [util.formatDecimal(range[0], '0'), util.formatDecimal(range[1], '0')];
	if(!integerValidator({value: range[0]}).passed || !integerValidator({value: range[1]}).passed || !integerValidator(item).passed) {
		return {
			passed: false,
			msgData: msgData
		};
	}
	val = +item.value;
	if(!(val >= +range[0] && val <= +range[1])) {
		return {
			passed: false,
			msgData: msgData
		};
	}
	return {
		passed: true,
		data: val,
		msgData: msgData
	};
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);

var _MONTH_DAYS = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

module.exports = function(item, format) {
	var tmp, val, dateVal, timeVal, dateFormat, timeFormat, year, month, hour, minute, second, date;
	item = $(item)[0];
	val = item.value = $.trim(item.value.replace(/(\s)+/g, '$1'));
	if(!item.value) {
		return {
			passed: true,
			data: null
		};
	}
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


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);

module.exports = function(item) {
	var passed;
	item = $(item)[0];
	item.value = $.trim(item.value.toUpperCase());
	if(!item.value) {
		return true;
	}
	passed = !(/\W/).test(item.value);
	return passed;
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);

module.exports = function(item) {
	var passed;
	item = $(item)[0];
	item.value = $.trim(item.value);
	if(!item.value) {
		return true;
	}
	passed = (/^([a-zA-Z0-9\-]{1,63}\.)+[a-zA-Z0-9\-]{1,63}$/).test(item.value);
	return passed;
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);

module.exports = function(item) {
	var passed, data;
	item = $(item)[0];
	item.value = item.value.toLowerCase()
		.replace(/\s*\n\s*/g, '\n')
		.replace(/,/g, ';')
		.replace(/;*\n;*/g, '\n')
		.replace(/(\s*;\s*)+/mg, '; ')
		.replace(/^(;\s*)+|^\n+|(;\s*)+$|\n+$/g, '');
	item.value = $.trim(item.value);
	if(!item.value) {
		return true;
	}
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


/***/ })
/******/ ]);
});