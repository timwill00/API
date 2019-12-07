var express=require("express");
const mongoose = require("mongoose");
var router=express.Router();
const GameModel =  mongoose.model("Game");
const bodyparser = require("body-parser");
// create application/json parser
var jsonParser = bodyparser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyparser.urlencoded({ extended: true })


router.get("/",jsonParser,(req,res)=>{
    GameModel.find((err,docs)=>{
        res.status(200).json(docs);
    }).catch((err)=>{
        res.status(401).json(err);
    });
});

router.post("/",jsonParser,(req,res)=>{
    var player = new GameModel({  title: req.body.title, platform: req.body.platform, genre: req.body.genre, rating: req.body.rating,publisher: req.body.publisher,status: req.body.status,release: req.body.release});
    // save model to database
    player.save((err, doc)=> {
      if (err) return console.error(err);
      console.log(doc.name + " saved to Game collection.");
      res.status(200).json(doc);
    });
})


router.post("/update",jsonParser,(req,res)=>{
    GameModel.updateOne(
        { "_id" : req.body._id },
        { $set: {
            title: req.body.title, platform: req.body.platform, genre: req.body.genre, rating: req.body.rating,publisher: req.body.publisher,status: req.body.status, release: req.body.release, _id: req.body._id
        } 
    }).exec((err, doc) => {
        if (err){ res.status(401).json(err);}
        else { res.status(200).json(doc);};
      });
});


router.get("/delete/:_id?",jsonParser,(req,res)=>{
    GameModel.findByIdAndRemove(req.params._id, (err, docs) => {
        if (err) return res.status(500).send(err);
        const response = {
            message: "Game successfully deleted",
            id: docs._id
        };
        return res.status(200).send(response);
    });
});


router.get("/getbyId/:_id?",jsonParser,(req,res)=>{
    GameModel.findById(req.params._id, (err, docs) => {
        if (err) return res.status(500).send(err)
        return res.status(200).send(docs)
    });
});


module.exports=router;