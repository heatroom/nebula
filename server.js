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
  // important - you have to use the response.jsonp method
  // res.jsonp({
  //   'type': 1,
  //   'data': {
  //     'imgUrl': 'http://iwan.sogou.com',
  //     'imgSrc': 'http://imgstore02.cdn.sogou.com/app/a/53/0a4db766-0a44-428d-a29a-6f6822b2a912.jpg',
  //     'promote': 'http://wangmeng.sogou.com/'
  //   }
  // });
  res.jsonp(
    {
      "data":
      {
        "src": "http://img02.sogoucdn.com/app/a/100200007/6c5783a8-41ce-48d4-8080-8ac4e940a491.jpg",
        "type": 1,
        "url": "http://clk.brand.sogou.com/cl.gif?b=uMFEUHd9uZPYmgchXg-GujdAf1-7fbnvrH6kPjR1rDRsfWP7n1RYwjwAwb7AfWn3fzuGTjYkna3knWb8nHf4QWRsFMKETLw9UAPEuARqFhkWpA-b5HR3PaudThsqpZwYTaR1fiRzwBRzwMI-UMI-UB41UvIEIi4WUvY-nbulFHFAm1ckPjnsnWTzQh9YUf"
      },
      "success": true
    }
  )
});

app.get('/bar', function(req, res){
  res.jsonp({
    'type': 2,
    'data': {
      'swfSrc': 'http://img01.sogoucdn.com/app/a/4001/4b38275f-8670-44ab-9c19-1ea48821b1b7.swf',
      'swfUrl': 'http://iwan.sogou.com'
    }
  });
});

app.listen(3003);
console.log("Express server listening on port 3003");