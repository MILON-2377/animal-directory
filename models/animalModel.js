const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema({
  name:String,
  species: String,
  age: Number,
  habitat: String,
});

const Animal = mongoose.models.animal || mongoose.model("Animal", animalSchema);
module.exports = Animal;
