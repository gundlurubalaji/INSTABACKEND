const express =require("express")
const mongoose = require("mongoose")
const cors =require("cors")
const app =express()
const dotenv=require('dotenv').config()
app.use(cors())
const corsOptions ={
  origin:'*', 
  credentials:true,            
  optionSuccessStatus:200
}
app.use(cors(corsOptions));

const url ="mongodb+srv://balaji:Balaji@cluster0.5ea88qe.mongodb.net/?retryWrites=true&w=majority";
const PORT =8000;
app.use(express.json())
app.listen(PORT,()=>{
    console.log(`my backend app running on${PORT}`)
})
//mongodb connection
mongoose.
connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then((e) => {
    console.log("database is connected");
  })
  .catch((e) => {
    console.log(e);
  });
//create the sechema
  const postSchema=new mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
})
const Posts=mongoose.model('post',postSchema)


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 next()
});
app.post("/create",async(req,res)=>{
  try{
    const newposts =await Posts.create(req.body)
    res.status(201).json({
      status:"success",
      newposts
    })
  }
  catch(error){
    res.status(500).json({message:error.message})
  }
})

app.get('/posts',async (req,res)=>{
  try{
      const allposts=await Posts.find()
      res.status(200).json({
          status:"Success",
          allposts
      })
  }
  catch(err){
      res.status(500).json({message:err.message})
  }
})



  
