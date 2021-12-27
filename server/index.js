const express = require('express')
const app = express()
const mongoose = require('mongoose')
const ItemModel = require('./models/Item')

/// how we establish database connection
mongoose.connect(
    "mongodb://127.0.0.1:27017/mernApp?readPreference=primary&appName=MongoDB%20Compass&ssl=false", 
    { useNewUrlParser: true }
);

app.get("/insert", async (req, res) => {
    const item = new ItemModel({name: "Banana", amount: 4});
    await item.save()
    res.send('INSERTED DATA');
});

app.get("/read", async (req, res) => {
    ItemModel.find({}, (err, result) => {
        if (err) {
            res.send(err)
        }
        else {
            res.send(result)
        }
    })
});

app.listen(3001, ()=> {
    console.log('You are connected!');
})