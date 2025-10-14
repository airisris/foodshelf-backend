const express = require("express");
// create a express router
const router = express.Router();

const {
  getAllSupplies,
  getSupplies,
  getSupply,
  addSupply,
  deleteSupply,
} = require("../controllers/supply");

const { isValidUser } = require("../middleware/auth");

// get all supplies
router.get("/all", async (req, res) => {
  try {
    const supplies = await getAllSupplies();

    res.status(200).send(supplies);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

// get supplies
router.get("/", isValidUser, async (req, res) => {
  try {
    const user = req.user;
    const supplies = await getSupplies(user);

    res.status(200).send(supplies);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

// get supply
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const supply = await getSupply(id);

    res.status(200).send(supply);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Unknown Error" });
  }
});

// create new supply
router.post("/", async (req, res) => {
  try {
    const userEmail = req.body.userEmail;
    const ingredient = req.body.ingredient;

    const newSupply = await addSupply(userEmail, ingredient);

    res.status(200).send(newSupply);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Unknown Error" });
  }
});

// delete supply
router.delete("/", async (req, res) => {
  try {
    const userEmail = req.body.userEmail;
    const ingredient = req.body.ingredient;

    await deleteSupply(userEmail, ingredient);

    res.status(200).send({
      message: `Supply has been deleted`,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
