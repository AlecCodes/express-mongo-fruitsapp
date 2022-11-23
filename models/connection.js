require('dotenv').config()
const mongoose = require("mongoose");

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


module.exports = mongoose