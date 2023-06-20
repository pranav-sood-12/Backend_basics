import express from "express";
import mongoose from "mongoose";



const app = express();
//using middleware
app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017",{
    dbName : "backendAPI"
})
.then(()=>{console.log("database connected");})
.catch((e)=>{
    console.log(e);
})

const schema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
})

const User = mongoose.model("User",schema);

app.get("/", (req,res) => {
    res.send("Nice working");
});

app.get("/users/all", async (req,res) => {

    const users = await User.find({});


    res.json({
        sucess : true,
        users : users,
    })
})



// app.get("/userid" , async (req,res) => {
//     // const id = req.body.id; // if we are sending id in the body
//     // const {id} = req.body;
//     // const id = req.query.id;
//     // const {id} = req.query; // this is destructuring of id



//     //or
//     // const {id} = req.body; // in this we have destructed the id 
//     const users = await User.findById(id)

//     res.json({
//         success : true,
//         users,
//     })
// })

// this by dynamic id
app.get("/userid/:id" , async (req,res) => {
    // const id = req.body.id; // if we are sending id in the body
    // const {id} = req.body;
    // const id = req.query.id;
    // const {id} = req.query; // this is destructuring of id

    const {id} = req.params;

    

    //or
    // const {id} = req.body; // in this we have destructed the id 
    const users = await User.findById(id)

    res.json({
        success : true,
        users,
    })
})

app.post("/users/new", async (req,res) => {

    const {name,email,password} = req.body;

    // when key value pair is same so we write in this way...
    await User.create({
        name,
        email,
        password
    });


    res.status(201).json({
        sucess : true,
        message : "registered successfully",
    })
})

app.listen(4000,()=>{
    console.log("server is working");
})