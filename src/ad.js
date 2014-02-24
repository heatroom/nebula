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
  	var template = '<div id="div_ad" class="sogou" style="text-align:left;vertical-align:middle">'
        + '<img style="position:absolute;z-index:0" src="#imgSrc" border="0" width="250px;" height="250px;" margin-top="0px;">'
        + '<a href="#imgUrl" target="_blank" style="vertical-align:middle;cursor:pointer;z-index:1;position:absolute;left:0px;top:0px;display:block;background:white;filter:alpha(opacity=0);opacity:0;width:250px;height:250px;"></a>'
        + '<a id="logo" class="logo" style="z-index:2" href="#promote" target="_blank"></a></div>';
  	jsonp(url, function(response) {
      console.log(response);
      var card = doc.createElement('div');

      var imgUrl = response['imgUrl'];
      var imgSrc = response['imgSrc'];
      var promote = response['promote'];

      
      template = template.replace('#imgUrl', imgUrl);
      template = template.replace('#imgSrc', imgSrc);
  		template = template.replace('#promote', promote);
  		card.innerHTML = template;
  		doc.body.appendChild(card);
  	});
  }

  adCard();


})(document);