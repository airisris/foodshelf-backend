// import the Movie model
const Ingredient = require("../models/ingredient");

async function getIngredients(category) {
  // create an empty container for filter
  let filter = {};
  // if category exists, then only add it into the filter container
  if (category) {
    filter.category = category;
  }

  // apply the filters
  return await Ingredient.find(filter)
    .sort({ name: 1 });
}

async function getIngredient(id) {
  // load the ingredient data based on id
  return await Ingredient.findById(id);
}

async function addIngredient(name, category, image) {
  // create new ingredient
  const newIngredient = new Ingredient({
    name,
    category,
    image,
  });
  // save the new ingredient into MongoDB
  await newIngredient.save(); // clicking the save button
  return newIngredient;
}

async function updateIngredient(id, name, category, image) {
  return await Ingredient.findByIdAndUpdate(
    id,
    {
      name,
      category,
      image,
    },
    {
      new: true,
    }
  );
}

async function deleteIngredient(id) {
  // delete the ingredient
  return await Ingredient.findByIdAndDelete(id);
}

module.exports = {
  getIngredients,
  getIngredient,
  addIngredient,
  updateIngredient,
  deleteIngredient,
};
