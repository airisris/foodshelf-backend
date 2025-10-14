const { Schema, model } = require("mongoose");

/*
  Supply model
  - userEmail
  - ingredient
*/

const supplySchema = new Schema({
  userEmail: {
    type: String,
    required: true,
  },
  // linkage between the supply and ingredient
  ingredient: [
    {
      type: Schema.Types.ObjectId,
      ref: "Ingredient",
      required: true,
    },
  ],
});

const Supply = model("Supply", supplySchema);
module.exports = Supply;
