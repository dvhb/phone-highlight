var PhoneHightlight = function (options) {
	this.options = $.extend({}, defaults, options || {});
};

PhoneHightlight.prototype.replace = function (string) {
	var firstSign = string[0] === '+' ? '+' : '';
	return firstSign + string.replace(/[^\d]/g, '');	
};

PhoneHightlight.prototype.isMisformatted = function (string) {
	if (string[0] === '+' || string.length > this.options.minLenWithoutCodes) {
		return false;
	}
	return true;
};

PhoneHightlight.prototype.addCodes = function (phone, countryCode, cityCode) {
	return countryCode + cityCode + phone;
};

PhoneHightlight.prototype.getCodesFromElm = function ($elm) {
	var attributes = ['countryCode', 'cityCode'];
	var result = {};
	$.each(attributes, function (i, attr) {
		var value = $elm.data(attr);
		if (value) {
			result[attr] = value;
		}
	});
	return result;
};

PhoneHightlight.prototype.mergeCodes = function (codes) {
	var selfCodes = {
		countryCode: this.countryCode,
		cityCode: this.cityCode
	};
	return $.extend({}, selfCodes, codes);
};

PhoneHightlight.prototype.simulate = function ($elm) {
	var attributes = ['id', 'className', 'rel', 'shape', 'target', 'style'];
	var $result = $('<a></a>');
	var dataset = $elm.data();
	delete dataset.countryCode;
	delete dataset.cityCode;
	$.each(attributes, function (i, attr) {
		var value = $elm.prop(attr);
		if (value) {
			$result.prop(attr, value);
		}
	});
	$result.data(dataset);
	$result.text($elm.text());
	return $result;
};

PhoneHightlight.prototype.parse = function ($elm) {
	var $a = this.simulate($elm);
	var phone = this.replace($elm.text());

	if (this.isMisformatted(phone)) {
		var elmCodes = this.getCodesFromElm($elm);
		var resultCodes = this.mergeCodes(resultCodes);
		phone = this.addCodes(phone, resultCodes.countryCode, resultCodes.cityCode);
	}

	$a.attr('href', 'tel:' + phone);
	$elm.replaceWith($a);
};