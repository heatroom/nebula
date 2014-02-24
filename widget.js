(function(d) {

  var i, count = 0;

  function queryclass(name) {
    if (d.querySelectorAll) {
      return d.querySelectorAll('.' + name);
    }
    var elements = d.getElementsByTagName('div');
    var ret = [];
    for (i = 0; i < elements.length; i++) {
      if (~elements[i].className.split(' ').indexOf(name)) {
        ret.push(elements[i]);
      }
    }
    return ret;
  }

  function querydata(element, name) {
    return element.getAttribute('data-' + name);
  }

  function heighty(iframe) {
    if (window.addEventListener) {
      window.addEventListener('message', function(e) {
        if (iframe.id === e.data.sender) {
          iframe.height = e.data.height;
        }
      }, false);
    }
  }

  function render(card, baseurl) {
    var iframe = d.createElement('iframe');
    iframe.setAttribute('id', identity);
    iframe.setAttribute('frameborder', 0);
    iframe.setAttribute('scrolling', 0);
    iframe.setAttribute('allowtransparency', true);

    var url = baseurl + '?user=' + user + '&identity=' + identity;

    iframe.src = url;
    iframe.width = width || Math.min(d.body.clientWidth || 400, 400);
    if (height) {
      iframe.height = height;
    }

    card.parentNode.replaceChild(iframe, card);
    return iframe;
  }


  render(card, baseurl);
  
})(document);