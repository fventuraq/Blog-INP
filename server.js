var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('bloginp', ['bloginp']);
var bodyParser = require ('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/bloginp', function (req, res){
	console.log("Estor recibiendo el requerimiento")

	db.bloginp.find(function (err, docs){
		console.log(docs);
		res.json(docs);
	});
});

app.post('/bloginp', function (req, res){
	console.log(req.body);
	db.bloginp.insert(req.body, function(err, doc){
		res.json(doc);
	});
});

app.delete('/bloginp/:id', function (req, res){
	var id = req.params.id;
	console.log(id);
	db.bloginp.remove({_id: mongojs.ObjectId(id)}, function (err, doc){
		res.json(doc);
	})
});

app.get('/bloginp/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.bloginp.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/bloginp/:id', function (req, res){
	var id = req.params.id;
	console.log(req.body.name);
	db.bloginp.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {titulo: req.body.titulo, autor: req.body.autor, descripcion: req.body.descripcion}},
		new: true}, function (err, doc){
			res.json(doc);
		});
});

app.listen(3000);
console.log("Server running on port 3000");
console.log("Hola que hace?");
