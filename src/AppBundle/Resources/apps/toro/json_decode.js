define(function() {
  var json_decode;
  return json_decode = function(str_json) {

    /*
         http://www.JSON.org/json2.js
         2008-11-19
         Public Domain.
         NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
         See http://www.JSON.org/js.html
     */
    var cx, err, error, j, json, text;
    json = this.window.JSON;
    if (typeof json === 'object' && typeof json.parse === 'function') {
      try {
        return json.parse(str_json);
      } catch (error) {
        err = error;
        if (!(err instanceof SyntaxError)) {
          throw new Error('Unexpected error type in json_decode()');
        }
        this.php_js = this.php_js || {};
        this.php_js.last_error_json = 4;
        return null;
      }
    }
    cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
    j = void 0;
    text = str_json;
    cx.lastIndex = 0;
    if (cx.test(text)) {
      text = text.replace(cx, function(a) {
        return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
      });
    }
    if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
      j = eval('(' + text + ')');
      return j;
    }
    this.php_js = this.php_js || {};
    this.php_js.last_error_json = 4;
    return null;
  };
});
