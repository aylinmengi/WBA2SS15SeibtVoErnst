var express = require('express');
var bodyParse = require('body-parser');
var jsonParser = bodyParse.json();
var redis = require("redis");

var app = express();
var db = redis.createClient();

app.use(bodyParse.json());

app.post('/series', function(req, res){
	var newSeries = req.body;

	db.incr('id:series', function(err, rep){
		newSeries.id = rep;

		db.set('series:'+newSeries.id, JSON.stringify(newSeries), function(err, rep){
			res.json(newSeries);
		});
	});
});

app.get('/series/:id', function(req, res){
	db.get('series:'+req.params.id, function(err, rep){
		if(rep) {
			res.type('json').send(rep);
		}
		else {
			res.status(404).type('text').send('Die Serie mit der ID '+req.params.id+' wurde nicht gefunden');
		}
	});
});

app.put('/series/:id', function(req, res) {
	db.get('series:' + req.params.id, function (err, rep) {
		console.log(req.body.name);
		var json = JSON.parse(rep);
		console.log(json);
		for (var key in req.body) {
			json[key] = req.body[key];
		}
		db.set('series:' + req.params.id, JSON.stringify(json), function (err, rep) {
			res.json(json);
		});
	});
		
	});

	/*db.exists('series:'+req.params.id, function(err, rep){
		if(rep==1) {
			var updatedSeries = req.body;
			updatedSeries.id = req.params.id;
			db.set('series:'+req.params.id, JSON.stringify(updatedSeries), function(err, rep) {
				res.json(updatedSeries);
			});
		}
		else {
			res.status(404).type('text').send('Die Serie mit der ID '+req.params.id+' wurde nicht gefunden.');
		}
	});*/


app.delete('/series/:id', function(req,res){
	db.del('series:'+req.params.id, function(err, rep){
		if(rep==1){
			res.status(200).type('text').send('OK');
		}
		else {
			res.status(404).type('text').send('Die Serie mit der ID '+req.params.id+' wurde nicht gefunden');
		}
	});
});


app.get('/series', function(req, res){
	db.keys('series:*', function(err, rep){
		var serieslist = [];

		if(rep.length == 0){
			res.json(serieslist);
			return;
		}

		db.mget(rep, function(err, rep){
			rep.forEach(function(val){
				serieslist.push(JSON.parse(val));
			});

			serieslist = serieslist.map(function(series){
				return {id: series.id, name: series.name, description: series.description, seasons: series.seasons};
			});
			res.json(serieslist);
		});
	});
});

app.get('/series/name/:id', function(req, res){
	db.get('series:'+req.params.id, function(err, rep){
		var serie = [];

		if(rep){

				serie.push(JSON.parse(rep));


			serie = serie.map(function(series){
				return {name: series.name};
			});
			res.json(serie);
		} else {
			res.status(404).type('text').send('Die Serie mit der ID '+req.params.id+' wurde nicht gefunden');
		}
	});

});

app.get('/series/description/:id', function(req, res){
	db.get('series:'+req.params.id, function(err, rep){
		var serie = [];

		if(rep){

				serie.push(JSON.parse(rep));


			serie = serie.map(function(series){
				return {description: series.description};
			});
			res.json(serie);
		} else {
			res.status(404).type('text').send('Die Serie mit der ID '+req.params.id+' wurde nicht gefunden');
		}
	});

});

//DIESE METHODE FUNKTIONIERT NOCH NICHT!!! NOCHMAL DRÜBERGUCKEN!!// 
app.put('/series/name/:id', function(req, res){
	var seriesAlldata;


	db.exists('series:'+req.params.id, function(err, rep){


			var updatedSeries = req.body;

			updatedSeries.id = req.params.id;

			var updatedName = req.body;

			updatedSeries.name = updatedName;


			db.set('series:'+req.params.id, JSON.stringify(updatedSeries), function(err, rep){
				res.json(updatedSeries);
			})



	});
});


/*
app.get('/', function(req, res) {
	var acceptedTypes = req.accepts(['html', 'json']);
	switch(acceptedTypes) {
		case 'html':
			res.type('html').send('<h1>'+JSON.stringify(series)+'</h1>');
			break;
		case 'json':
			res.json(series);
			break;
		default:
			res.status(406).end();
	}
});

app.post('/series', jsonParser, function(req, res){
	series.push(req.body);
	res.type('plain').send('Added!');
});

app.post('/series/name', jsonParser, function(req, res){
	series.push(req.body);
	res.type('plain').send('Added!');
});*/



app.listen(8888);