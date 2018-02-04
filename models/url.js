var mongoose=require('mongoose');
mongoose.connect('mongodb://keys.mongo.dbuser:keys.mongo.dbpassword@ds223738.mlab.com:23738/a4surlshortener');
var Schema=mongoose.Schema;
var urlSchema=new Schema({
  originalUrl:String,
  shortenUrl:String
})

var Url=mongoose.model('url',urlSchema);
module.exports=Url;
