const express = require('express')
require('dotenv').config();
const PORT = process.env.PORT
const methodOverride = require("method-override")
const morgan = require("morgan") //gives us that db connection and cool methods for CRUD to the datas
const mongoose = require("mongoose")

const app = express();

/////////////////////////////////
//MIDDLEWARE
/////////////////////////////////
app.use(express.urlencoded({extended:true}))
app.use(morgan("tiny"))
app.use(methodOverride("_method"))
app.use("/static",express.static("public"))


//////////////////////////////////
//database connections
//////////////////////////////////
const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

//establish our connections
mongoose.connect(DATABASE_URL,CONFIG)

//log connections events from mongoose.
mongoose.connection
    .on("open", ()=> console.log("MONGOOSE CONNECTED"))
    .on("close", ()=>console.log("mikshake machine mongoose broke"))
    .on("error", (error) => console.log(error))

///////////////////////////////////
//Fruits model
///////////////////////////////////
const {Schema,model} = mongoose //destructuring, grabbing model and schema

const fruitsSchema = new Schema({
    name: String,
    color: String,
    readyToEat: Boolean
})

const Fruit = model("fruit",fruitsSchema) //"mold" for the creation of new tweets

////////////////////////////////////
//ROUTES
////////////////////////////////////

app.get("/",(req,res) =>{
    res.send("Serverd doing what it should be doing")
})

//SEED route - this will delete and refill database. Useful for testing purposes.
app.get("/fruits/seed",(req,res) =>{
    const startFruits = [ //seed file
        { name: "Orange", color: "orange", readyToEat: false },
        { name: "Grape", color: "purple", readyToEat: false },
        { name: "Banana", color: "orange", readyToEat: false },
        { name: "Strawberry", color: "red", readyToEat: false },
        { name: "Coconut", color: "brown", readyToEat: false },
      ]

      Fruit.deleteMany({},(err,data) => { //delete everything, since {} is first arg.

        Fruit.create(startFruits,(err, createdFruits) => {
            res.json(createdFruits)
        })
      })
})

app.get("/fruits",(req,res)=>{
    //Get all fruits from mongo and send them back
    Fruit.find({}) //apply open filter to mongoose obj
    .then((fruits) =>{ //.then means this executes after the previous line is done. use for asynchrnous
        res.json(fruits)
    })
    .catch(err => console.log(err))
})

app.listen(PORT, () => console.log(`It's go time! listening on port ${PORT}`))