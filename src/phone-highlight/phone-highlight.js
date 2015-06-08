var PhoneHighlight = function (options) {
	this.options = $.extend({}, defaults, options || {});
};

/*
 * Replaces non-digital characters from given string
 * except plus sign if it at the beginning of string
 */
PhoneHighlight.prototype.replace = function (string) {
	var firstSign = string[0] === '+' ? '+' : '';
	return firstSign + string.replace(/[^\d]/g, '');	
};

/*
 * Checks if given string starts from plus sign 
 * or longer than minimal phone lenght without codes
 */
PhoneHighlight.prototype.isMisformatted = function (string) {
	if (string[0] === '+' || string.length > this.options.minLenWithoutCodes) {
		return false;
	}
	return true;
};

/*
 * Concatinates codes with phone number
 */
PhoneHighlight.prototype.addCodes = function (phone, countrycode, citycode) {
	return '' + countrycode + citycode + phone;
};

/*
 * Extracts county and city codes from given DOM-elements's data-attributes
 */
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

/*
 * Merge codes from config with given
 */
PhoneHighlight.prototype.mergeCodes = function (codes) {
	var selfCodes = {
		countrycode: this.options.countrycode,
		citycode: this.options.citycode
	};
	return $.extend({}, selfCodes, codes);
};

/*
 * Creates A elm keeping attributes from source
 */
PhoneHighlight.prototype.simulate = function ($elm) {
	var attributes = ['id', 'className', 'rel', 'shape', 'target'];
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
	$result.get(0).style.cssText = $elm.get(0).style.cssText;
	return $result;
};

/*
 * Main function
 * Parses given element and replaces it with A elm with tel: attribute
 * if neccesary
 */
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