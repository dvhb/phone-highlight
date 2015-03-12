describe('PhoneHightlight with default options', function () {
	var ph = null;

	beforeEach(function () {
		ph = new PhoneHighlight;
	});

	describe('#replace', function () {
		it('should erase non digital symbols from given string', function () {
			var testString = '8 (3812) 12-86-44';
			var expectedString = '83812128644';
			assert.equal(ph.replace(testString), expectedString);
		});

		it('should not replace plus sign from the start of given string', function () {
			var testString = '+7 (3812) 12-86-44';
			var expectedString = '+73812128644';
			assert.equal(ph.replace(testString), expectedString);
		});
	});

	describe('#isMisformatted', function () {
		it('should return false if given string starts from + sign', function () {
			var testString = '+73812128644';
			assert.equal(ph.isMisformatted(testString), false);
		});

		it('should return true if number is too short', function () {
			var testString = '123456';
			assert.equal(ph.isMisformatted(testString), true);
		});
	});

	describe('#getCodesFromElm', function () {
		var $elm = null;
		beforeEach(function () {
			$elm = $('<div></div>');
		});
		
		it('should return empty object if elm don\'t have data attributes', function () {
			assert.deepEqual(ph.getCodesFromElm($elm), {});
		});

		it('should return correct data from data attributes', function () {
			var countrycode = '+7';
			var citycode = '3812';
			$elm.data('countrycode', countrycode);
			$elm.data('citycode', citycode);
			var result = ph.getCodesFromElm($elm);
			assert.property(result, 'countrycode');
			assert.equal(result.countrycode, countrycode);
			assert.property(result, 'citycode');
			assert.equal(result.citycode, citycode);
		});
	});

	describe('#simulate', function () {
		var $elm = null;
		var className = 'some-class';
		var id = 'some-id';
		var dataset = {
			'citycode': '3812',
			'countrycode': '+7',
			'someAnatherProp': 'foo'
		};

		beforeEach(function () {
			$elm = $('<div></div>');
			$elm.attr('id', id).addClass(className).data(dataset);
		})

		it('should create A element', function () {
			var $result = ph.simulate($elm); 
			var result = $result[0];
			assert.equal(result.tagName, 'A');
		});

		it('should have same ID with original elm', function () {
			var $result = ph.simulate($elm); 
			assert.equal($result.prop('id'), id);
		});

		it('should have same className with original elm', function () {
			var $result = ph.simulate($elm); 
			assert.equal($result.prop('className'), className);
		});

		it('should exclude codes from dataset', function () {
			var resultDataset = ph.simulate($elm).data(); 
			assert.notProperty(resultDataset, 'citycode');
			assert.notProperty(resultDataset, 'countrycode');
			assert.property(resultDataset, 'someAnatherProp');
			assert.equal(resultDataset.someAnatherProp, 'foo');
		});
	});
});