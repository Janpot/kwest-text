var kwestText = require('..'),
    Promise   = require('bluebird'),
    kwest     = require('kwest-base'),
    iconv     = require('iconv-lite'),
    caseless  = require('caseless'),
    assert    = require('chai').assert;

describe('kwest-text', function () {

  function mockResponse(response) {
    response.headers = response.headers || {};
    caseless.httpify(response, response.headers);
    return Promise.resolve(response);
  }

  it('converts encoding', function (done) {

    var textRequest = kwest(function (request) {
      return mockResponse({
        body: iconv.encode('¤', 'iso-8859-1'),
        headers: {
          'content-type': 'text/html; charset=iso-8859-1'
        }
      });
    }).use(kwestText());

    textRequest('http://www.example.com')
      .then(function (res) {
        assert.deepPropertyVal(res, 'body', '¤');
        assert.deepPropertyVal(res, 'detectedEncoding', 'iso-8859-1');
        done();
      })
      .catch(done);

  });

});
