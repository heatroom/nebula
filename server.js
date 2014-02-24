var express = require('express');
 
var app = module.exports = express();
// this enables jsonp support
app.enable("jsonp callback");
 
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');

  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});
 
app.get('/foo', function(req, res){ 
  // important - you have to use the response.json method
  res.jsonp({ 
  	imgUrl: 'http://iwan.sogou.com',
  	imgSrc: 'http://imgstore02.cdn.sogou.com/app/a/53/0a4db766-0a44-428d-a29a-6f6822b2a912.jpg',
  	promote: 'http://wangmeng.sogou.com/',
  });
});
 
app.listen(3003);
console.log("Express server listening on port 3003");