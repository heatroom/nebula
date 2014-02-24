(function(doc) {

  
  function heighty(iframe) {
    if (window.addEventListener) {
      window.addEventListener('message', function(e) {
        if (iframe.id === e.data.sender) {
          iframe.height = e.data.height;
        }
      }, false);
    }
  }
  
  function queryclass(name) {
    if (doc.querySelectorAll) {
      return doc.querySelectorAll('.' + name);
    }
    var elements = doc.getElementsByTagName('div');
    var ret = [];
    for (i = 0; i < elements.length; i++) {
      if (~elements[i].className.split(' ').indexOf(name)) {
        ret.push(elements[i]);
      }
    }
    return ret;
  }


  function render(card, baseurl) {
    var iframe = doc.createElement('iframe');
    
    iframe.setAttribute('frameborder', 0);
    iframe.setAttribute('scrolling', 0);
    iframe.setAttribute('allowtransparency', true);

    var url = baseurl;

    iframe.src = url;
    iframe.width = xy_ad_width || Math.min(doc.body.clientWidth || 400, 400);
    if (xy_ad_height) {
      iframe.height = xy_ad_height;
    }

    card.parentNode.replaceChild(iframe, card);
    return iframe;
  }


  var card = doc.getElementById('nebula-card');

  render(card, "ad.html");
  
})(document);