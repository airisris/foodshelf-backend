// import the Supply model
const Supply = require("../models/supply");

const getAllSupplies = async () => {
  // get all supplies data, not based on user
  return await Supply.find().populate("ingredient").sort({ _id: -1 });
};

const getSupplies = async (user) => {
  // get all supplies data, based on user
  return await Supply.find({
    userEmail: user.email,
  })
    .populate("ingredient")
    .sort({ _id: -1 });
};

const getSupply = async (id) => {
  // load the supply data based on id
  const supply = await Supply.findById(id);
  return supply;
};

const addSupply = async (userEmail, ingredient) => {
  // check if userEmail already exist
  const exist = await Supply.findOne({ userEmail });
  if (exist) {
    // if exist, just update
    return await Supply.findOneAndUpdate(
      { userEmail },
      { $addToSet: { ingredient } }, // only add if the ingredient is not already in the array
      {
        new: true,
      }
    ).populate("ingredient");
  } else {
    // if not, create new supply in mongodb
    const newSupply = new Supply({
      userEmail,
      ingredient,
    });
    await newSupply.save();
    return newSupply;
  }
};

const deleteSupply = async (userEmail, ingredient) => {
  // find and update the supply to delete an ingredient
  return await Supply.findOneAndUpdate(
    { userEmail },
    { $pull: { ingredient } }, // remove the ingredient
    {
      new: true,
    }
  ).populate("ingredient");
};

module.exports = {
  getAllSupplies,
  getSupplies,
  getSupply,
  addSupply,
  deleteSupply,
};
