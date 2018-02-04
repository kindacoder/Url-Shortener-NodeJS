var express=require('express');
var app=express();
//port setup
var port=process.env.PORT || 5100;
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
var encoder=require('./encoder_decoder/encode');

var Url=require('./models/url')


///requiring keys from config:
var keys=require('./config/keys');
mongoose.connect(keys.mongo.dbURL,function(){
  console.log('database connected');
});

///connect to mongodb
// console.log(keys.mongo.dbuser);
// console.log(keys.mongo.dbpassword);



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
///checkin gif the url is valid or not :)

var regex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/
  if(!regex.test(originalUrl)) {
    res.render('error',{message:'not a valid url'})
  } else {
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
      // var shortenFullUrl='http://localhost:5100/'+shortenUrl;
       var shortenFullUrl = req.protocol + '://' + req.get('host') +'/'+ shortenUrl;
      // console.log(shortenFullUrl);
      res.render('shorten',{shortenUrl:shortenFullUrl});
    });

  }

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
      if(doc.originalUrl[0]=='w'){
        res.redirect('http://'+doc.originalUrl)
      }
      else{
        res.redirect(doc.originalUrl);
      }

    }
  })
})

app.listen(port,function(){
  console.log("Listening on port " + (process.env.PORT || "5100"));
})
