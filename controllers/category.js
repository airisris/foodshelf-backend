// import the Category model
const Category = require("../models/category");

const getCategories = async () => {
  // get all categories
  const categories = await Category.find().sort({ _id: -1 });
  return categories;
};

const getCategory = async (id) => {
  // load the category data based on id
  const category = await Category.findById(id);
  return category;
};

const addCategory = async (name) => {
  // create new category in mongodb
  const newCategory = new Category({
    name,
  });
  await newCategory.save();
  return newCategory;
};

const updateCategory = async (id, name) => {
  // update the category
  const updateCategory = await Category.findByIdAndUpdate(
    id,
    {
      name,
    },
    { new: true }
  );
  return updateCategory;
};

const deleteCategory = async (id) => {
  // delete the category
  return await Category.findByIdAndDelete(id);
};

module.exports = {
  getCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
};
