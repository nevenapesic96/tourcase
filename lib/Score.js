var mongoose=require('mongoose');

var scoreschema=new mongoose.Schema({
    username: {type: String, required: true, index: { unique: true } },
    score: {type: Number}
});

var Score=mongoose.model('score',scoreschema);
module.exports=Score;