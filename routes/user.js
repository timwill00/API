var express=require("express");
const mongoose = require("mongoose");
var router=express.Router();
const UserModel =  mongoose.model("User");
const bodyparser = require("body-parser");
// create application/json parser
var jsonParser = bodyparser.json();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyparser.urlencoded({ extended: true })

router.get("/",jsonParser,(req,res)=>{
    UserModel.find((err,docs)=>{
        res.status(200).json(docs);
    }).catch((err)=>{
        res.status(401).json(err);
    });
});


router.post("/",urlencodedParser,(req,res)=>{
    // a document instance
    var user = new UserModel({ name: req.body.name, email: req.body.email, password: req.body.password });
 
    // save model to database
    user.save((err, doc)=> {
      if (err) return console.error(err);
      console.log(doc.name + " saved to User collection.");
      res.status(200).json(doc);
    });
})


router.post("/update",urlencodedParser,(req,res)=>{
    UserModel.updateOne(
        { "_id" : req.body._id },
        { $set: {
            name: req.body.name, email: req.body.email, password: req.body.password,_id:req.body._id
        } 
    }).exec((err, doc) => {
        if (err){ res.status(401).json(err);}
        else { res.status(200).json(doc);};
      });
});


router.get("/delete/:_id?",jsonParser,(req,res)=>{
    UserModel.findByIdAndRemove(req.params._id, (err, docs) => {
        if (err) return res.status(500).send(err);
        const response = {
            message: "User successfully deleted",
            id: docs._id
        };
        return res.status(200).send(response);
    });
});


router.post("/login/",jsonParser,(req,res)=>{
    UserModel.find({email:req.body.email,password:req.body.password}, (err, docs) => {
        if (err) return res.status(500).send(err)
        return res.status(200).send(docs)
    });
});


module.exports=router;