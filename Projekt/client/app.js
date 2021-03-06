var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var ejs = require('ejs');
var fs = require('fs');
var http = require('http');

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/allseries', jsonParser, function(req, res){
	fs.readFile('./allseries.ejs', {encoding: 'utf-8'}, function(err, filestring) {
		if(err) {
			throw err;
		} else {
			var options = {
				host: 'localhost',
				port: 8888,
				path: '/series',
				method: 'GET',
				headers: {
					accept: 'application/json'
				}
			}
			var externalRequest = http.request(options, function(externalRequest) {
				console.log('Connected');
				externalRequest.on('data', function(chunk) {

					var seriesdata = JSON.parse(chunk);

					var html = ejs.render(filestring, seriesdata);
					res.setHeader('content-type', 'text/html');
					res.writeHead(200);
					res.write(html);
					res.end();

				});

			});

			externalRequest.end();
		}
	});
});




app.get('/cover/:id', function (req, res, next) {

  var options = {
    root: __dirname + '/img/series/cover/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };

  var fileName = req.params.id+'.jpg';
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:', fileName);
    }
  });

});

app.get('/css/:stylesheetname', function (req, res, next) {

  var options = {
    root: __dirname + '/css/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };

  var fileName = req.params.stylesheetname;
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      //console.log('Sent:', fileName);
    }
  });

});


app.get('/allseries/:id', jsonParser, function(req, res){
	fs.readFile('./series.ejs', {encoding: 'utf-8'}, function(err, filestring) {
		if(err) {
			throw err;
		} else {
			var options = {
				host: 'localhost',
				port: 8888,
				path: '/series/'+req.params.id,
				method: 'GET',
				headers: {
					accept: 'application/json'
				}
			}
			var externalRequest = http.request(options, function(externalRequest) {
				console.log('Connected');
				externalRequest.on('data', function(chunk) {

					var seriesdata = JSON.parse(chunk);

					var html = ejs.render(filestring, seriesdata);
					res.setHeader('content-type', 'text/html');
					res.writeHead(200);
					res.write(html);
					res.end();

				});

			});

			externalRequest.end();
		}
	});
});


app.get('/user/:id', jsonParser, function(req, res){
	fs.readFile('./user.ejs', {encoding: 'utf-8'}, function(err, filestring) {
		if(err) {
			throw err;
		} else {
			var options = {
				host: 'localhost',
				port: 8888,
				path: '/user/'+req.params.id,
				method: 'GET',
				headers: {
					accept: 'application/json'
				}
			}
			var externalRequest = http.request(options, function(externalRequest) {
				console.log('Connected');
				externalRequest.on('data', function(chunk) {

					var userdata = JSON.parse(chunk);

					var html = ejs.render(filestring, userdata);
					res.setHeader('content-type', 'text/html');
					res.writeHead(200);
					res.write(html);
					res.end();

				});

			});

			externalRequest.end();
		}
	});
});


app.get('/index', jsonParser, function(req, res){
	fs.readFile('./index.ejs', {encoding: 'utf-8'}, function(err, filestring) {
		if(err) {
			throw err;
		} else {
			var options = {
				host: 'localhost',
				port: 8888,
				path: '/user/',
				method: 'GET',
				headers: {
					accept: 'application/json'
				}
			}
			var externalRequest = http.request(options, function(externalRequest) {
				console.log('Connected');
				externalRequest.on('data', function(chunk) {

					var seriesdata = JSON.parse(chunk);

					var html = ejs.render(filestring, seriesdata);
					res.setHeader('content-type', 'text/html');
					res.writeHead(200);
					res.write(html);
					res.end();

				});

			});

			externalRequest.end();
		}
	});
});




app.get('/userpost', jsonParser, function(req, res){
	fs.readFile('./userpost.ejs', {encoding: 'utf-8'}, function(err, filestring) {
		if(err) {
			throw err;
		} else {
			var options = {
				host: 'localhost',
				port: 8888,
				path: '/user',
				method: 'GET',
				headers: {
					accept: 'application/json'
				}
			}
			var externalRequest = http.request(options, function(externalRequest) {
				console.log('Connected');
				externalRequest.on('data', function(chunk) {

					var seriesdata = JSON.parse(chunk);

					var html = ejs.render(filestring, seriesdata);
					res.setHeader('content-type', 'text/html');
					res.writeHead(200);
					res.write(html);
					res.end();

				});

			});

			externalRequest.end();
		}
	});
});



app.use('/userlogin', function(req, res){
		var currentUser = req.body;
		 console.log(req.body);
			var options = {
				host: 'localhost',
				port: 8888,
				path: '/user',
				method: 'GET',
				headers: {
					accept: 'application/json'
				}
			}

			var externalRequest = http.request(options, function(externalRequest) {
				console.log('Connected');
				console.log(options);
				externalRequest.on('data', function(chunk) {

					var userdata = JSON.parse(chunk);
					console.log(userdata);
					console.log(currentUser);
					function checkForValue(json, value) {
  				  	for (name in json) {
     			    if (typeof (json[name]) === "object") {
     			    	console.log(json[name]);
     		        return checkForValue(json[name], value);

        } else if (json[name] === value) {

            return true;
        }
    }
    console.log("false");
    console.log(json);
         console.log(value);
    return false;
}
		checkForValue(userdata, currentUser.name);
					
					//var html = ejs.render(filestring, seriesdata);
				//	res.setHeader('content-type', 'text/html');
					//res.writeHead(200);
					//res.write(html);
					res.end();

				});

			});

			externalRequest.end();
		
	
});

app.post('/postuser', function(req, res){
	var data = JSON.stringify(req.body);
	console.log(req.body);
	console.log(data);
	var options = {
				host: 'localhost',
				port: 8888,
				path: '/user',
				method: 'POST',
				headers: {
				accept: 'application/json',
				'Content-Type': 'application/json',
       		    'Content-Length': Buffer.byteLength(data)
				}
			};

	var externalRequest = http.request(options, function(res){
		
		externalRequest.on('data', function(chunk) {
			console.log("blablabla");
					console.log("body: " + chunk);
					

				});
		
	});
	externalRequest.write(data);
	externalRequest.end();
	
});

app.get('/user/:id/watched', jsonParser, function(req, res){
	fs.readFile('./watchedseries.ejs', {encoding: 'utf-8'}, function(err, filestring) {
		if(err) {
			throw err;
		} else {
			var options = {
				host: 'localhost',
				port: 8888,
				path: '/user/'+req.params.id,
				method: 'GET',
				headers: {
					accept: 'application/json'
				}
			}
			var externalRequest = http.request(options, function(externalRequest) {
				console.log('Connected');
				externalRequest.on('data', function(chunk) {

					var seriesdata = JSON.parse(chunk);

					var html = ejs.render(filestring, seriesdata);
					res.setHeader('content-type', 'text/html');
					res.writeHead(200);
					res.write(html);
					res.end();

				});

			});

			externalRequest.end();
		}
	});
});





app.listen(3001);