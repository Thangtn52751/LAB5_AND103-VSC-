const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const port = 3000;

// MongoDB connection URI
const COMMON = require('./COMMON');
const uri = COMMON.uri;

const cakeModel = require('./cakeModel');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

// Get all cakes
app.get('/', async (req, res) => {
    await mongoose.connect(uri);
    const cakes = await cakeModel.find();
    res.send(cakes);
});

// Add a new cake
app.post('/add_cake', async (req, res) => {
    await mongoose.connect(uri);
    const newCake = req.body;
    await cakeModel.create(newCake);
    const cakes = await cakeModel.find();
    res.send(cakes);
});

// Delete a cake by ID
app.get('/delete/:id', async (req, res) => {
    await mongoose.connect(uri);
    const { id } = req.params;
    await cakeModel.deleteOne({ _id: id });
    res.send({ message: 'Cake deleted successfully' });
});

// Update a cake by ID
app.put('/update/:id', async (req, res) => {
    await mongoose.connect(uri);
    const { id } = req.params;
    const updatedCake = req.body;
    await cakeModel.updateOne({ _id: id }, updatedCake);
    const cakes = await cakeModel.find();
    res.send(cakes);
});

// Search cakes by name
app.get('/search', async (req, res) => {
    const { name } = req.query;
    await mongoose.connect(uri);
    const cakes = await cakeModel.find({
        name: { $regex: name, $options: 'i' },
    });
    res.send(cakes);
});
