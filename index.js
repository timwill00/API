const connection =  require("./models/index");
const express =  require("express");
const application =  express();
var cors = require('cors')
application.use(cors());
var path = require("path")
application.use('/uploads', express.static(path.join(__dirname, '/uploads')))

var port = process.env.PORT || 8080;
//routes
var PlayerController=require("./routes/player");
application.use("/player",PlayerController);
var GameController=require("./routes/game");
application.use("/game",GameController);
var UserController=require("./routes/user");
application.use("/user",UserController);

application.get("/",(req,res)=>{
    res.send("<h1>Hello world</h1>")
});

application.listen(port,()=>{
    console.log("Server started");
})