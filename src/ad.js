(function(doc) {
  var baseurl = 'http://127.0.0.1:3003/foo', i;

  function querystring() {
    var href = window.location.href, kv;
    var params = href.slice(href.indexOf('?') + 1).split('&');

    var qs = [];
    for (i=0; i < params.length; i++) {
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
    var width = 175;
    var height = 300;
    swfobject.embedSWF(swfUrl, swfDivId, width,height,swfVersionStr,xiSwfUrlStr,flashvars,params,attributes);
  }

  var jsonpfunc = 'nebula' + new Date().valueOf();

  function jsonp(url, callback) {
    window[jsonpfunc] = function(response) {
      callback(response);
    }
    var script = doc.createElement('script');
    script.src = url + '?callback=' + jsonpfunc;
    doc.body.appendChild(script);
  }

  function adCard(){
    var url = baseurl;
    var img_tpl = '<div id="div_ad" class="sogou" style="text-align:left;vertical-align:middle">'
        + '<img style="position:absolute;z-index:0" src="#imgSrc" border="0" width="250px;" height="250px;" margin-top="0px;">'
        + '<a href="#imgUrl" target="_blank" style="vertical-align:middle;cursor:pointer;z-index:1;position:absolute;left:0px;top:0px;display:block;background:white;filter:alpha(opacity=0);opacity:0;width:250px;height:250px;"></a>'
        + '<a id="logo" class="logo" style="z-index:2" href="#promote" target="_blank"></a></div>';

    var swf_tpl = '<span id="swf-container"></span>'
        + '<a target="_blank" class="pz-rt-stat" href="#swfUrl"></a>';
    var card = doc.createElement('div');

    jsonp(url, function(response) {
      
      var data = response.data;
      
      if (response.type === 1) {
        var imgUrl = data['imgUrl'];
        var imgSrc = data['imgSrc'];
        var promote = data['promote'];
        
        img_tpl = img_tpl.replace('#imgUrl', imgUrl);
        img_tpl = img_tpl.replace('#imgSrc', imgSrc);
        img_tpl = img_tpl.replace('#promote', promote);
        card.innerHTML = img_tpl;
        doc.body.appendChild(card);
      } else if (response.type === 2) {
        var swfSrc = data['swfSrc'];
        var swfUrl = data['swfUrl'];
        swf_tpl = swf_tpl.replace('#swfUrl', swfUrl);
        console.log(swf_tpl);
        card.innerHTML = swf_tpl;
        doc.body.appendChild(card);
        createSwf("swf-container", swfSrc);
      }
    });
  }
  adCard();
})(document);