const express = require("express");
const app = express();
const Restaurant = require("../models/index")
const db = require("../db/connection");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//TODO: Create your GET Request Route Below: 


//GET

app.get("/restaurants", async (req,res) => {
    const restaurants = await Restaurant.findAll();
    res.json(restaurants);
})

app.get("/restaurants/:id", async function(req,res) {
    const number = req.params.id;
    const restaurants = await Restaurant.findByPk(number);
    res.json(restaurants);
});


//PUT
app.put("/restaurants", async (req,res) => {
    res.json(await Restaurant.create(req));
});


//POST
app.post("/restaurants/:id", async (req,res) => {
    Restaurant[req.params.id] = req.body.Restaurant;
    res.json({Restaurant});
})

//DELETE
app.delete("/restaurants/:id", async (req,res) => {
    await Restaurant.splice(req.params.id, 1);
    res.json({Restaurant});
})




module.exports = app;