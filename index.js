'use strict';

var Promise = require('bluebird'),
    zlib    = require('zlib'),
    charset   = require('charset'),
    jschardet = require('jschardet'),
    iconv     = require('iconv-lite'),
    gunzip  = Promise.promisify(zlib.gunzip);




function detectEncoding(headers, body) {
  var enc = charset(headers, body);

  if (!enc) {
    enc = jschardet.detect(body).encoding;
  }

  if (enc) {
    enc = enc.toLowerCase();
    if (iconv.encodingExists(enc)) {
      return enc;
    }
  }
  
  return null;
}

function kwestText(kwest) {
  return kwest.wrap(function (makeRequest, request) {
    return makeRequest(request)
      .then(function (response) {
        var body        = response.body,
            detectedEnc = detectEncoding(response.headers, body),
            bodyBuffer  = new Buffer(body, 'binary'),
            utf8Body    = null;
        
        if (detectedEnc) {
          utf8Body = iconv.decode(bodyBuffer, detectedEnc);
        } else {
          // assume utf-8
          detectedEnc = null;
          utf8Body = iconv.decode(bodyBuffer, 'utf-8');
        }

        response.detectedEncoding = detectedEnc;
        response.body = utf8Body;
        
        return response;
      });
  });
}

module.exports = kwestText;
