require('dotenv').config
const mongoose = require("./connection")
const Fruit = require("./fruit")

mongoose.on("open", () => {
        const startFruits = [ //seed file
        { name: "Orange", color: "orange", readyToEat: false },
        { name: "Grape", color: "purple", readyToEat: false },
        { name: "Banana", color: "orange", readyToEat: false },
        { name: "Strawberry", color: "red", readyToEat: false },
        { name: "Coconut", color: "brown", readyToEat: false }
        ];

        Fruit.deleteMany({},(err,data) => { //delete everything, since {} is first arg.

            Fruit.create(startFruits,(err, createdFruits) => {
                console.log(createdFruits)
            })
        })
})