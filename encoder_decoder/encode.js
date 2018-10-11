///generating the sorten url;
var hasha=require('hasha');
var sha1 = require('sha1');
var encode = function(url) {
  ///using hasha to generate unique 3 digit letter:)
var hash=hasha(url);
var hash2=sha1(url);
///randomly choose 4 letters on hash by generating a number;
var loop=3;
var randomNumber;
var shortenUrl=''
while(loop){
  randomNumber=Math.floor((Math.random() * 100));
  shortenUrl+=hash[randomNumber];
  loop=loop-1;
}
return shortenUrl;
}
module.exports=encode;
