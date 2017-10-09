describe('Phonehighlight with default options', function () {
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

        it('should not replace phone that already a link', function () {
            var testString = '<p><a href="tel:+7 (3812) 12-86-44">+7 (3812) 12-86-44</a></p>';
            var $testElm = $(testString);
            var expectedString = '<a href="tel:+7 (3812) 12-86-44">+7 (3812) 12-86-44</a>';
            ph.parse($testElm);
            assert.equal($testElm.html(), expectedString);
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
});