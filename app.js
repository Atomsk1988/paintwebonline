var express=require('express'),
path= require('path');

var app=express();
require('./router/main')(app);
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);




var server=app.listen(3000,function(){
	console.log("Express is running on port 3000");
});

app.use("/src", express.static(path.join(__dirname, 'public/src')));
app.use("/images", express.static(path.join(__dirname, 'public/images')));


