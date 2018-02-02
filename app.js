var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/shortUrl');
var encoder=require('./encoder_decoder/encode');
var Url=require('./models/url')


///using middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

///setting view engine
app.set('view engine','ejs');



///setting the get route to view the main page:)
app.get('/',function(req,res){
  res.render('index');
})

//Handling the post request in the main setprototypeof
app.post('/shorten',function(req,res){
  var originalUrl=req.body.url;
  //passing the originalurl to encoder to get the shorten url;
  var shortenUrl=encoder(originalUrl);
  // console.log(shortenUrl);
  //save the url in database-
  var newUrl=new Url({
    originalUrl:originalUrl,
    shortenUrl:shortenUrl
  }).save(function(err){
    if(err){
      console.log(err);
    }
    var shortenFullUrl='http://localhost:5100/'+shortenUrl;
    // console.log(shortenFullUrl);
    res.render('shorten',{shortenUrl:shortenFullUrl});
  });
})



////handling the get request to encode the shortenUrl and get the originalUrl
app.get('/:shortenUrl',function(req,res){
  ///access the parameter
  var shortenUrl=req.params.shortenUrl;
  // console.log(shortenUrl)
  ///query if shortenUrl is available in database
  Url.findOne({shortenUrl:shortenUrl},function(err,doc){
    if(err){
console.log(err);
    }
    if(doc==null){
      res.render('index');
    }
    else{
      res.redirect(doc.originalUrl);
    }
  })
})

app.listen(5100,function(){
  console.log('Listening to port 5100')
})
