(function phoneHighlightInit ($) {
    'use strict';

var defaults = {
    countrycode: '',
    citycode: '',
    minLen: 6,
    minLenWithouCodes: 7
};
/*
 * Constructor
 */
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
 * Creates regex based on min phone length
 */
PhoneHighlight.prototype.getRegex = function (minlen) {
    return new RegExp("(\<a.*>)?\\s?[-+()\\s\\d]{" + minlen + ",}\\s?", "g");
}

/*
 * Main function
 * Parses given element and replaces text phones with links
 */
PhoneHighlight.prototype.parse = function ($elm) {
    var self = this;
    var countrycode = $elm.data('countrycode') || self.options.countrycode;
    var citycode = $elm.data('citycode') || self.options.citycode;
    var minlenwithoutcodes = $elm.data('minlenwithoutcodes') || self.options.minLenWithoutCodes;
    var minlen = $elm.data('minlen') || self.options.minLen;
    var regex = self.getRegex(minlen);
    var html = $elm.html();
    var matches = html.match(regex);
    if (matches == null) {
        return;
    }
    matches = $.map(html.match(regex), function (item) {
        if (item[0] === ' ') {
            item = item.substr(1);
        }
        item = item.replace(/[\s]+$/, '');
        return item;
    });

    $.each(matches, function (index, item) {
        if (item.indexOf('href') > -1) return;
        if (!item.trim()) return;
        var phone = self.replace(item);
        if (self.isMisformatted(phone)) {
            phone = self.addCodes(phone, countrycode, citycode);
        }
        html = html.replace(item, '<a href="tel:' + phone + '">' + item + '</a>');
    });
    $elm.html(html);
};
$.fn.phoneHighlight = function (options) {
    var ph = new PhoneHighlight(options || {});

    this.each(function () {
        ph.parse($(this));
    });
};
})(window.$ || window.jQuery);