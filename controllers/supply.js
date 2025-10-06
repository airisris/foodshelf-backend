const axios = require("axios");

const Supply = require("../models/supply");

const getSupplies = async (user) => {
  return await Supply.find({
    userEmail: user.email,
  })
    .populate("ingredient")
    .sort({ _id: -1 });
};

const getSupply = async (id) => {
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
    // if not, create new
    // create new supply in mongodb
    const newSupply = new Supply({
      userEmail,
      ingredient,
    });
    await newSupply.save();

    // return supply
    return newSupply;
  }
};

const deleteSupply = async (userEmail, ingredient) => {
  return await Supply.findOneAndUpdate(
    { userEmail },
    { $pull: { ingredient } }, // remove the ingredient
    {
      new: true,
    }
  ).populate("ingredient");
};

module.exports = {
  getSupplies,
  getSupply,
  addSupply,
  deleteSupply,
};
