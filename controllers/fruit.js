const express = require('express') //bring this in so we can make our router
const Fruit = require('../models/fruit') //bring in fruit

////////////////////////
//Create router
////////////////////////
const router = express.Router()


///////////////////////////
//ROUTER MIDDLEWARE - This is where we check if user is logged into an active session
///////////////////////////
router.use((req,res,next)=>{
    if(req.session.loggedIn){
        next();
    } else {
        res.redirect("/user/login")
    }
})


////////////////////////////////////
//ROUTES
////////////////////////////////////

// router.get("/",(req,res) =>{
//     res.send("Serverd doing what it should be doing")
// })

//SEED route - this will delete and refill database. Useful for testing purposes.
router.get("/fruits/seed",(req,res) =>{
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

//INDEX route
router.get("/fruits/",(req,res)=>{
    //Get all fruits from mongo and send them back
    Fruit.find({}) //apply open filter to mongoose obj
    .then((fruits) =>{ //fruits is the response from Fruit.find. It could be anything..then means this executes after the previous line is done. use for asynchrnous
        res.render('fruits/index.ejs',{fruits})
    })
    .catch(err => console.log(err))
})

//NEW ROUTE
router.get('/fruits/new', (req,res)=>{
    res.render('fruits/new.ejs')
})

router.post('/fruits',(req,res)=>{
    req.body.readyToEat = req.body.readyToEat === 'on' ? true : false
    Fruit.create(req.body, (err, createdFruit)=>{
        console.log('created '+ createdFruit)
        res.redirect('/fruits')
    })
})

//DELETE Route
router.delete('/fruits/:id',(req,res)=>{
    //go and get fruit from db
    Fruit.findByIdAndDelete(req.params.id, (err,deletedFruit)=>{
        console.log(err,deletedFruit)
        res.redirect('/fruits')
    })
})

//UPDATE route
router.put("/fruits/:id",(req,res)=>{
    const id = req.params.id
    req.body.readyToEat = req.body.readyToEat === "on" ? true:false
    Fruit.findByIdAndUpdate(id, req.body,{new:true},(err, fruit) =>{
        res.redirect("/fruits")
    })
})

//EDIT route
router.get("/fruits/:id/edit",(req,res)=>{
    const id = req.params.id
    Fruit.findById(id,(err,foundFruit) =>{
        res.render("fruits/edit.ejs",{fruit:foundFruit})
    })
})

router.put("/fruits/:id",(req,res)=>{
    req.body.readyToEat = req.body.readyToEat === 'on' ? true : false
    Fruit.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err,updatedFruit)=>{
        res.redirect(`/fruits/${req.params.id}`)
    })
})


//SHOW route for individual fruit
router.get("/fruits/:id",(req,res)=>{
    Fruit.findById(req.params.id)
    .then((fruit) =>{
        res.render("fruits/show.ejs",{fruit})
    })
})

////////////////////////
//export this router
////////////////////////

module.exports = router 