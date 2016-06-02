var $ = window.jQuery || window.$;

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
