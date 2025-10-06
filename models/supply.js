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

// create a Modal from the schema
const Supply = model("Supply", supplySchema);

// export the modal
module.exports = Supply;
