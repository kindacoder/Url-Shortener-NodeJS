var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/shortUrl');
var encoder=require('./encoder_decoder/encode');


///using middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

///setting view engine
app.set('view engine','ejs');

app.get('/',function(req,res){
  res.render('index');
})

//Handling the post request in the main setprototypeof
app.post('/shorten',function(req,res){
  var originalUrl=req.body.url;
  //passing the originalurl to encoder to get the shorten url;
  var shortenUrl=encoder(originalUrl);
  console.log(shortenUrl);
  res.send('hello Recieved the post Request');

})
app.listen(5100,function(){
  console.log('Listening to port 5100')
})
