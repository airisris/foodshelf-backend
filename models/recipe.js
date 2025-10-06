const { Schema, model } = require("mongoose");

/*
  Recipe model
  - name
  - instruction
  - category
  - ingredients
  - image
*/

const recipeSchema = new Schema({
  name: {
    type: String,
    requires: true,
  },
  instruction: {
    type: String,
    requires: true,
  },
  // linkage between the recipe and category
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  // linkage between the supply and ingredient
  ingredients: [
    {
      type: Schema.Types.ObjectId,
      ref: "Ingredient",
      required: true,
    },
  ],
  image: {
    type: String,
    required: true,
  },
});

// create a Modal from the schema
const Recipe = model("Recipe", recipeSchema);

// export the modal
module.exports = Recipe;
