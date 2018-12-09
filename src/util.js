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
