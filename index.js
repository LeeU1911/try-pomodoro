var express = require('express');
var app = express();

const PORT = process.env.PORT || 8081;

app.set('views', './static/views');
app.set('view engine', 'jade');
app.use(express.static('static'));

var title = "Pomodoro app"
var helloMessage = "Hello!\nWelcome to Pomodoro app!";

app.get('/', function(req, res){
  res.render('index', {title: title, message: helloMessage})
})

var server = app.listen(PORT, function(){
  console.log("App is running on port %s", PORT);
})
