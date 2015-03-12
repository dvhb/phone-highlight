# jQuery Phone Hightlight

jQuery plugin which helps you replace text phone numbers with
user friendly `<a href="tel:...">` tag.

### Basic usage

At first, add `jquery.phone-highlight.js` into your `<head>`.

Now you have to mark phone numbers somehow in your `HTML`,
for example, wrap them with `<span class="phone"></span>`:

```HTML
Lorem ipsum dolor <span class="phone">+7 (3812) 78-66-44</span>
```

Then, put following into in you `main.js`:

```javascript
$('.phone').phoneHighlight();
```

Now if you open the page, plugin replace existing markup with the following:

```HTML
Lorem ipsum dolor <a href="tel:+73812786644" class="phone">+7 (3812) 78-66-44</a>
```

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