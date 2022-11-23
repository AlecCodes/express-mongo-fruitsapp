///////////////////////////////////
//Fruits model
///////////////////////////////////
const mongoose = require('./connection')

const {Schema,model} = mongoose //destructuring, grabbing model and schema

const fruitsSchema = new Schema({
    name: String,
    color: String,
    readyToEat: Boolean
})

const Fruit = model("fruit",fruitsSchema) //"mold" for the creation of new tweets


module.exports = Fruit