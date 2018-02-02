///generating the sorten url;
var encode = function(url) {
    //encode the url- generate the random number and add some integer to them
    //get random Character from url;
    var randomCharacter = ((url.split('.')[1])[0]) + ((url.split('//')[1])[2]);
    var randomNumber =  Math.floor((Math.random() * 100) + 3);
    return randomCharacter + randomNumber;
}
module.exports=encode;
