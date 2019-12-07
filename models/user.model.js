var mongoose=require("mongoose");
var Schema=mongoose.Schema;
const UserSchema=Schema({
    name: { type: String, required: "Required", maxlength:50 },
    email: {type: String, required: "Required"},
    password:{type: String, required: "Required"}
});
module.exports=mongoose.model("User",UserSchema);