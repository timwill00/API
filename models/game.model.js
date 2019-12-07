var mongoose=require("mongoose");
var Schema=mongoose.Schema;
const GameSchema=Schema({
    title: { type: String, required: true,maxlength:50 },
    platform: {type: String},
    genre: {type: String},
    rating: {type: String},
    publisher: {type: String},
    release: {type: String},
    status: {type: String},
});
module.exports=mongoose.model("Game",GameSchema);