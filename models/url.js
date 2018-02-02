var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var urlSchema=new Schema({
  originalUrl:String,
  shortenUrl:String
})

var Url=mongoose.model('url',urlSchema);
module.exports=Url;
