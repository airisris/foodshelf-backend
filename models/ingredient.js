const { Schema, model } = require("mongoose");

/*
  Ingredient model
  - name
  - category
  - image
*/

const ingredientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["Fruit", "Meat", "Vegetable", "Seafood", "Dairy Product", "Carb & Grain"],
    // default: "Fruit", // will change
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Ingredient = model("Ingredient", ingredientSchema);
module.exports = Ingredient;
