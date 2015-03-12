$.fn.phoneHighlight = function (options) {
	var ph = new PhoneHighlight(options);

	this.each(function () {
		ph.parse($(this));
	});
};