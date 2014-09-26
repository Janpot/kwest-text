# kwest-text [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url]

Text fetching plugin for the [kwest](https://github.com/Janpot/kwest) module

## Installation

    $ npm install --save kwest-text

## Use


```js
var kwestText = require('kwest-text'),
    kwest = require('kwest'),
    request = kwestText(kwest);

// requests text
request('http://www.example.com/some-encoded-text')
  .then(function (res) {
    // detects encoding and converts to utf-8
    console.log(res.body);
  })
```


[travis-url]: http://travis-ci.org/Janpot/kwest-text
[travis-image]: http://img.shields.io/travis/Janpot/kwest-text.svg?style=flat

[depstat-url]: https://david-dm.org/Janpot/kwest-text
[depstat-image]: http://img.shields.io/david/Janpot/kwest-text.svg?style=flat
