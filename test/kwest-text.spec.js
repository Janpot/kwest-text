var kwestText = require('..'),
    Promise   = require('bluebird'),
    kwest     = require('kwest'),
    iconv     = require('iconv-lite'),
    assert    = require('chai').assert;

describe('kwest-text', function () {

  it('converts encoding', function (done) {

    var kwestMock = kwest.wrap(function (makeRequest, options) {
      return Promise.resolve({
        body: iconv.encode('¤', 'iso-8859-1'),
        headers: {
          'content-type': 'text/html; charset=iso-8859-1'
        }
      });
    });

    var textRequest = kwestText(kwestMock);
    textRequest('http://www.example.com')
      .then(function (res) {
        assert.deepPropertyVal(res, 'body', '¤');
        assert.deepPropertyVal(res, 'detectedEncoding', 'iso-8859-1');
        done();
      })
      .catch(done);

  });

});
