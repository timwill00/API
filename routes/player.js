var express=require("express");
const mongoose = require("mongoose");
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var router=express.Router();
const PlayerModel =  mongoose.model("Player");

const bodyparser = require("body-parser");
// create application/json parser
var jsonParser = bodyparser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyparser.urlencoded({ extended: true })

router.get("/",urlencodedParser,(req,res)=>{
    PlayerModel.find((err,docs)=>{
        res.status(200).json(docs);
    }).catch((err)=>{
        res.status(401).json(err);
    });
});


router.post("/",jsonParser,upload.single('file'),(req,res)=>{
    // a document instance
    console.log(req.file)
    
    var player = new PlayerModel({  name: req.body.name, rank: req.body.rank, score: req.body.score, time: req.body.time,favouriteGame: req.body.favouriteGame,status: req.body.status});
    if(req.file){player.filePath = req.file.path;}else{player.filePath = ""}
    // save model to database
    player.save((err, doc)=> {
      if (err) return console.error(err);
      console.log(doc.name + " saved to player collection.");
      res.status(200).json(doc);
    });
})
router.post("/uploadfile",jsonParser,upload.single('file'),(req,res)=>{
    if(req.file){
        req.body.filePath=req.file.path;
    }else{
        req.body.filePath=req.body.filePath;
    }
    PlayerModel.updateOne(
        { "_id" : req.body._id },
        { $set: {
            name: req.body.name, rank: req.body.rank, score: req.body.score, time: req.body.time,favouriteGame: req.body.favouriteGame,status: req.body.status,_id:req.body._id,filePath:req.body.filePath
        }
        }).exec((err, doc) => {
        if (err){ res.status(401).json(err);}
        else { res.status(200).json(doc);};
    });
});

router.post("/update",jsonParser,upload.single('file'),(req,res)=>{
    if(req.file){
        req.body.filePath=req.file.path;
    }else{
        req.body.filePath=req.body.filePath;
    }
    PlayerModel.updateOne(
        { "_id" : req.body._id },
        { $set: {
            name: req.body.name, rank: req.body.rank, score: req.body.score, time: req.body.time,favouriteGame: req.body.favouriteGame,status: req.body.status,_id:req.body._id,filePath:req.body.filePath
        } 
    }).exec((err, doc) => {
        if (err){ res.status(401).json(err);}
        else { res.status(200).json(doc);};
      });
});


router.get("/delete/:_id?",jsonParser,(req,res)=>{
    PlayerModel.findByIdAndRemove(req.params._id, (err, docs) => {
        if (err) return res.status(500).send(err);
        const response = {
            message: "Player successfully deleted",
            id: docs._id
        };
        return res.status(200).send(response);
    });
});


router.get("/getbyId/:_id?",jsonParser,(req,res)=>{
    PlayerModel.findById(req.params._id, (err, docs) => {
        if (err) return res.status(500).send(err)
        return res.status(200).send(docs)
    });
});


module.exports=router;