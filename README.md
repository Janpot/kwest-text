# kwest-text

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
