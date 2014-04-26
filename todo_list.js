var qs = require('querystring');
var ds = require('./datastore');
var counter = 0;

module.exports = {

  changeStatus: function (req) {
        ds.getItem(req)
  },

  show: function (res) {
      var items = ds.get();
  		var html = '<h1>Todo app</h1>'
					//+ '<ul>'
					+ items.map(function(obj){
					return '<input type="checkbox">' + obj.item
                    }).join('<br>')
					//+ '</ul>'
					+ '<form method="post" action="/">'
                    + '<p><input type="text" name="item" /></p>'
					+ '<p><input type="submit" value="Adicionar" /></p>'
					+ '</form>'
                    + '<br> Author: Lucas Morano';

		res.setHeader('Content-Type', 'text/html');
		res.setHeader('Content-Length', Buffer.byteLength(html));
		res.end(html);
  },
  notFound: function (res) {
	    res.statusCode = 404;
		res.setHeader('Content-Type', 'text/plain');
		res.end('Not Found');
  },

  badRequest: function(res){
	  	res.statusCode = 400;
		res.setHeader('Content-Type', 'text/plain');
		res.end('Bad Request');
  },

  add: function(req, res,callback){
		var body = '';
		req.setEncoding('utf8');
		req.on('data', function(chunk) {
            body += chunk;
            body += '&id=' + counter++;
        }
        );
		req.on('end', function(){
			var obj = qs.parse(body);
			ds.add(obj);
			callback(res);
		});
  }


};

