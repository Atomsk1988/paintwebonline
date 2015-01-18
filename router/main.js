module.exports=function(app){
	var mongo = require('mongodb');
	var monk = require('monk');
	var db = monk('localhost:27017/webpaint');
	var url = require('url');
	bodyParser= require('body-parser');
	

	// parse application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({ extended: false }))
	
	// parse application/json
	app.use(bodyParser.json())


	// Make our db accessible to our router
	app.use(function(req,res,next){
	    req.db = db;
	    next();
	});

	app.all('/', function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "X-Requested-With");
	  next();
	 });

	app.get('/',function(req,res){
		db = req.db;
		res.render('demo1.html')
	});
	app.get('/gallery',function(req,res){
		db = req.db;
		var gallery = db.get('gallery');
		var paints = [];
		
		gallery.find({}, function(e,gallery){
			//console.log(gallery);
		
			gallery.forEach(function(item){
				console.log(item._id);
				paints.push(item._id);
			})
			
			 res.render('gallery.html', { pagename: 'Gallery' , gallery: paints})
		});

		//
	});
	app.get('/canvas',function(req,res){
		db = req.db;
		var gallery = db.get('gallery');

		var url_parts = url.parse(req.url, true);
		var paint_id = url_parts.query.paint;
		console.log(paint_id);
		gallery.find({'_id':paint_id}, function(e,paint_data){
			//console.log(gallery);
			
			 res.render('canvas.html', { pagename: 'Canvas' , paint_data: JSON.stringify(paint_data)})
		});
	});
	app.post('/data', function(req,res){
		console.log(req.body);


		req.on('data', function(chunk) {
	      console.log("Received body data:");
	      console.log(chunk.toString());
	    });

		db = req.db;
		collection = db.get('gallery');
		collection.insert({ data: req.body }, function (err, doc) {
		  if (err) throw err;
		});
		res.send('ok');
	});
	
}