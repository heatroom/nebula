(function(doc) {
  var baseurl = 'http://10.16.131.58/wenwen';
  var i;
  var encode = encodeURIComponent;
  var decode = decodeURIComponent;

  var cookie = {};
  cookie.get = function(name, options) {
    validateCookieName(name);

    if (typeof options === 'function') {
      options = {converter: options};
    } else {
      options = options || {};
    }

    var cookies = parse(document.cookie, !options['raw']);
    return (options.converter || same)(cookies[name]);
  };

  function querystring() {
    var href = window.location.href, kv;
    var params = href.slice(href.indexOf('?') + 1).split('&');

    var qs = [];
    for (i = 0; i < params.length; i++) {
      kv = params[i].split('=');
      qs.push(kv[0]);
      qs[kv[0]] = kv[1];
    }
    return qs;
  }

  function createSwf(swfDivId, swfUrl){
    var swfVersionStr = "9.0.0";
    var xiSwfUrlStr = "";
    var attributes = {};
    var flashvars = {};
    var params = {};
    params.quality = "high";
    params.allowscriptaccess = "always";
    params.allowfullscreen = "true";
    params.wmode = "opaque";
    attributes.id = "right-pz-swf-obj";
    var width = xy_ad_width;
    var height = xy_ad_height;
    swfobject.embedSWF(swfUrl, swfDivId, width,height,swfVersionStr,xiSwfUrlStr,flashvars,params,attributes);
  }

  var jsonpfunc = 'nebula' + new Date().valueOf();

  function jsonp(url, callback) {
    window[jsonpfunc] = function(response) {
      callback(response);
    }
    var script = doc.createElement('script');
    var yyid = cookie.get("yyid") || "";
    script.src = url + "?yyid="+ yyid +"&pos_id=" + xy_ad_id +"&categoryInfo=youxi&callback=" + jsonpfunc;
    doc.body.appendChild(script);
  }

  function adCard(){
    var url = baseurl;
    var img_tpl = '<div id="nebula-ad" class="sogou-nebula" style="text-align:left;vertical-align:middle">'
        + '<img style="position:absolute;z-index:0" src="#imgSrc" border="0" width="#width;" height="#height" margin-top="0px;">'
        + '<a href="#imgUrl" target="_blank" style="vertical-align:middle;cursor:pointer;z-index:1;position:absolute;left:0px;top:0px;display:block;background:white;filter:alpha(opacity=0);opacity:0;width:250px;height:250px;"></a>'
        + '</div>';

    var swf_tpl = '<span id="swf-container"></span>'
        + '<a target="_blank" class="pz-rt-stat" href="#swfUrl"></a>';
    var card = doc.createElement('div');

    jsonp(url, function(response) {

      var data = response.data;

      if (data.type === 1) {
        var imgUrl = data['url'];
        var imgSrc = data['src'];

        img_tpl = img_tpl.replace('#imgUrl', imgUrl);
        img_tpl = img_tpl.replace('#imgSrc', imgSrc);
        img_tpl = img_tpl.replace('#width', xy_ad_width);
        img_tpl = img_tpl.replace('#height', xy_ad_height);

        card.innerHTML = img_tpl;
        doc.body.appendChild(card);
      } else if (data.type === 2) {
        var swfSrc = data['src'];
        var swfUrl = data['url'];
        swf_tpl = swf_tpl.replace('#swfUrl', swfUrl);

        card.innerHTML = swf_tpl;
        doc.body.appendChild(card);
        createSwf("swf-container", swfSrc);
      } else if(data.type === 3) {
        var htmlURL = data['src'];

        var iframe = doc.createElement('iframe');
        iframe.setAttribute('frameborder', 0);
        iframe.setAttribute('scrolling', 0);
        iframe.setAttribute('allowtransparency', true);

        iframe.src = htmlURL;
        doc.body.appendChild(iframe);
      }
    });
  }
  adCard();

  /**
   * Parse cookie `str`
   */

  function parse(str, shouldDecode) {
    var obj = {};
    if (isString(str) && str.length > 0) {
      var decodeValue = shouldDecode ? decode : same;
      var cookieParts = str.split(/;s+/g);
      var cookieName;
      var cookieValue;
      var cookieNameValue;

      for (var i = 0, len = cookieParts.length; i < len; i++) {
        //Check for normally-formatted cookie (name-value)
        cookieNameValue = cookieParts[i].match(/([^=]+)/i);
        if (cookieNameValue instanceof Array) {
          try {
            cookieName = decode(cookieNameValue[1]);
            cookieValue = decodeValue(cookieParts[i].substring(cookieNameValue[1].length + 1));
          } catch (ex) {
            //Intentionally ignore the cookie
            //the encoding is wrong.
          }
        } else {
          //Means the cookie does not have an "=", so treat it as a boolean flag
          cookieName = decode(cookieParts[i]);
          cookieValue = '';
        }

        if (cookieName) {
          obj[cookieName] = cookieValue;
        }
      }
    }
    return obj;
  }

  //Helpers

  function isString(o) {
    return typeof o === 'string';
  }

  function isNonEmptyString(s) {
    return isString(s) && s !== '';
  }

  function validateCookieName(name) {
    if(!isNonEmptyString(name)) {
      throw new TypeError('Cookie name must be a non-empty string');
    }
  }

  function same(s) {
    return s;
  }
})(document);