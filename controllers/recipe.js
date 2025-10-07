// import the Movie model
const Recipe = require("../models/recipe");

async function getRecipes(category, ingredients) {
  // create an empty container for filter
  let filter = {};
  // if exists, then only add it into the filter container
  if (category) {
    filter.category = category;
  }
  if (ingredients) {
    // match recipes that contain ANY of the user’s supplies
    filter.ingredients = { $in: ingredients };
  }

  // apply the filters
  return await Recipe.find(filter)
    .populate("category")
    .populate("ingredients")
    .sort({ _id: -1 });
}

async function getRecipe(id) {
  // load the recipe data based on id
  return await Recipe.findById(id).populate("ingredients");
}

async function addRecipe(name, instruction, category, ingredients, image) {
  // create new recipe
  const newRecipe = new Recipe({
    name,
    instruction,
    category,
    ingredients,
    image,
  });
  // save the new recipe into MongoDB
  await newRecipe.save(); // clicking the save button
  return newRecipe;
}

async function updateRecipe(
  id,
  name,
  instruction,
  category,
  ingredients,
  image
) {
  return await Recipe.findByIdAndUpdate(
    id,
    {
      name,
      instruction,
      category,
      ingredients,
      image,
    },
    {
      new: true,
    }
  );
}

async function deleteRecipe(id) {
  // delete the recipe
  return await Recipe.findByIdAndDelete(id);
}

module.exports = {
  getRecipes,
  getRecipe,
  addRecipe,
  updateRecipe,
  deleteRecipe,
};
