var mongoose=require("mongoose");
var Schema=mongoose.Schema;
const PlayerSchema=Schema({
    name: { type: String, required: "Required", maxlength:50 },
    rank: {type: String, required: "Required"},
    score: {type: String},
    time: {type: String},
    favouriteGame: {type: String},
    status:{type: String, required: "Required"},
    filePath:{type:String}
});
module.exports=mongoose.model("Player",PlayerSchema);