const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { default: Animal } = require("./models/animalModel");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(bodyParser.json());

// mongodb connection
const uri = `mongodb+srv://${process.env.dbName}:${process.env.dbPass}@cluster0.emrwzgv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to Mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

// get all animals
app.get("/animals", async (req, res) => {
  try {
    const animals = await Animal.find();
    res.send(animals);
  } catch (error) {
    res.status(500).send(error);
  }
});

// post new animal
app.post("/animals", async (req, res) => {
  const animal = new Animal(req.body);
  try {
    await animal.save();
    res.status(201).send(animal);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Put (update) an animal by id
app.put("/animals/:id", async (req, res) => {
  try {
    const animal = await Animal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!animal) return res.status(404).send();
    res.json(animal);
  } catch (error) {
    res.status(400).send(error);
  }
});

// DELETE an animal by id
app.delete("/animals/:id", async (req, res) => {
  try {
    const animal = await Animal.findByIdAndDelete(req.params.id);
    if (!animal) return res.status(404).send();
    res.json(animal);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log("server running on port ", port);

});
