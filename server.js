const express = require('express')
require('dotenv').config();
const PORT = process.env.PORT
const methodOverride = require("method-override")
const morgan = require("morgan") //gives us that db connection and cool methods for CRUD to the datas
const mongoose = require("mongoose")

const Fruit = require('./models/fruit')
const FruitRouter = require('./controllers/fruit')
const UserRouter = require('./controllers/user')
const session = require("express-session")
const MongoStore = require("connect-mongo")

const app = express();

/////////////////////////////////
//MIDDLEWARE
/////////////////////////////////
app.use(express.urlencoded({extended:true}))
app.use(morgan("tiny"))
app.use(methodOverride("_method"))
app.use("/static",express.static("public"))
app.use(session({
    secret: process.env.SECRET,
    store: MongoStore.create({mongoUrl: process.env.DATABASE_URL}),
    saveUnititalized: true,
    resave: false
}))

app.use(FruitRouter)
app.use('/user', UserRouter)

app.get("/", (req,res)=>{
    res.render("index.ejs")
})




app.listen(PORT, () => console.log(`It's go time! listening on port ${PORT}`))