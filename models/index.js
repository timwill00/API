const mongoose =  require("mongoose");
mongoose.connect("mongodb+srv://COMP:comp3123@comp-3123-4v5fg.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true } ,(error)=>{
    if(!error){
        console.log("successfully");
    }
    else{
        console.log("error");
    }
});

const Player = require("./player.model");
const Game = require("./game.model");
const User = require("./user.model");