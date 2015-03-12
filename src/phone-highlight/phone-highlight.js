var PhoneHighlight = function (options) {
	this.options = $.extend({}, defaults, options || {});
};

PhoneHighlight.prototype.replace = function (string) {
	var firstSign = string[0] === '+' ? '+' : '';
	return firstSign + string.replace(/[^\d]/g, '');	
};

PhoneHighlight.prototype.isMisformatted = function (string) {
	if (string[0] === '+' || string.length > this.options.minLenWithoutCodes) {
		return false;
	}
	return true;
};

PhoneHighlight.prototype.addCodes = function (phone, countrycode, citycode) {
	return '' + countrycode + citycode + phone;
};

PhoneHighlight.prototype.getCodesFromElm = function ($elm) {
	var attributes = ['countrycode', 'citycode'];
	var result = {};
	$.each(attributes, function (i, attr) {
		var value = $elm.data(attr);
		if (value) {
			result[attr] = value;
		}
	});
	return result;
};

PhoneHighlight.prototype.mergeCodes = function (codes) {
	var selfCodes = {
		countrycode: this.options.countrycode,
		citycode: this.options.citycode
	};
	return $.extend({}, selfCodes, codes);
};

PhoneHighlight.prototype.simulate = function ($elm) {
	var attributes = ['id', 'className', 'rel', 'shape', 'target', 'style'];
	var $result = $('<a></a>');
	var dataset = $elm.data();
	delete dataset.countrycode;
	delete dataset.citycode;
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

PhoneHighlight.prototype.parse = function ($elm) {
	var $a = this.simulate($elm);
	var phone = this.replace($elm.text());

	if (this.isMisformatted(phone)) {
		var elmCodes = this.getCodesFromElm($elm);
		var resultCodes = this.mergeCodes(elmCodes);
		phone = this.addCodes(phone, resultCodes.countrycode, resultCodes.citycode);
	}

	$a.attr('href', 'tel:' + phone);
	$elm.replaceWith($a);
};