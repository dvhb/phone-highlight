# jQuery Phone Hightlight

jQuery plugin which helps you replace text phone numbers with `<a href="tel:...">` tag.

It may be useful if you want to add user friendly markup on mobile devices, 
but want to keep text phone numbers in desktop version.

This plugin don't have library for detecting mobiles devices as a hard dependency.
You are free to use your favorite one. For example [mobile-detect.js](https://github.com/hgoebl/mobile-detect.js)

Check out [demo](http://dvhbru.github.io/dvhb-phone-hightlight/) (open from mobile device or use emulation).

### Basic usage

At first, add `jquery.phone-highlight.js` into your `<head>`.

Then, put following into in you `main.js`:

```javascript
$('p.containing-phones').phoneHighlight();
```

Or with mobile-detect.js

```javascript
var md = new MobileDetect(window.navigator.userAgent);
if (md.mobile()) {
    $('.phones').phoneHighlight();
}
```

Plugin will replace text phones with `a` tag. 

```HTML
Lorem ipsum dolor <a href="tel:+73812786644" class="phone">+7 (3812) 78-66-44</a>
```

*NOTE!* Do not execute plugin on whole body or other huge/interactive parts of 
the page! It may break other scripts or cause perfomance issues.

### Configuring

Plugin have 3 options which can be passed into plugin call:

```javascript
$('.phone').phoneHighlight({
	countrycode: '+7',
	citycode: '3812',
	minLenWithouCodes: 7
});
```

### How it works

It tooks text content of marked nodes and removes all symbols
excepting digits and leading plus sign.

Then plugin checks format of obtained result. There are 2 possible cases:

1. Current result already starts with plus sign or its length is greater than 
`minLenWithouCodes` option value. In this case `countrycode` and `citycode`
won't be added to phone.
2. Otherwise phone will be concatinated with `countrycode` and `citycode`
Note, that default values of `countrycode` and `citycode` options is
empty strings.

You can also override global code options by setting 
appropriate `data` attributes:

```HTML
<span class="phone" data-countrycode="+1" data-citycode="123">999-44-22</span>
```

### Running tests

At firts, you have to install dependencies by running `npm install`
and `bower install`. Now execute `npm run test` command.

### License

[MIT License](./LICENSE) © [dvhb](https://github.com/dvhbru)
