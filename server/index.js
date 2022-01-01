const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const ItemModel = require('./models/Item');
require('dotenv').config();

app.use(cors());
app.use(express.json())

/// how we establish database connection
mongoose.connect(
    "mongodb+srv://klm4life:mikoandcait2903@mern.vcns2.mongodb.net/mernApp?retryWrites=true&w=majority", 
    { useUnifiedTopology: true, useNewUrlParser: true }
);

app.post("/additem", async (req, res) => {
    const name = req.body.name
    const amount = req.body.amount

    const item = new ItemModel({name: name, amount: amount});
    await item.save()
    res.send(item);
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

app.put('/update', async (req, res) => {
    const newAmount = req.body.newAmount
    const id = req.body.id
    // await ItemModel.findById(id, (error, itemToUpdate)
    try {
        await ItemModel.findById(id, (error, itemToUpdate) => {
            itemToUpdate.amount = Number(newAmount);    
            itemToUpdate.save()

        })
    } catch(err) {
        console.log(err)
    }

    res.send("updated");
})

app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id
    await ItemModel.findByIdAndRemove(id).exec()
    res.send('item deleted');
})

app.listen(process.env.PORT || 3001, ()=> {
    console.log('You are connected!');
});