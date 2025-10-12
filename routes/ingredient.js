const express = require("express");
// create a express router
const router = express.Router();

const { isAdmin } = require("../middleware/auth");

const {
  getIngredients,
  getIngredient,
  addIngredient,
  updateIngredient,
  deleteIngredient,
} = require("../controllers/ingredient");

// get all ingredients
router.get("/", async (req, res) => {
  try {
    const search = req.query.search;
    const category = req.query.category;
    res.status(200).send(await getIngredients(search, category));
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});

// get one ingredient
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    res.status(200).send(await getIngredient(id));
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Unknown error" });
  }
});

// add new ingredient
router.post("/", isAdmin, async (req, res) => {
  try {
    const name = req.body.name;
    const category = req.body.category;
    const image = req.body.image;

    // error checking
    if (!name || !category || !image) {
      return res.status(400).send({
        message: "All the fields are required",
      });
    }

    res.status(200).send(await addIngredient(name, category, image));
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Unknown error" });
  }
});

// update ingredient
router.put("/:id", isAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const name = req.body.name;
    const category = req.body.category;
    const image = req.body.image;

    if (!name || !category || !image) {
      return res.status(400).send({
        message: "All the fields are required",
      });
    }

    res.status(200).send(await updateIngredient(id, name, category, image));
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Unknown error" });
  }
});

// delete ingredient
router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    await deleteIngredient(id);

    res.status(200).send({
      message: `Ingredient with the ID of ${id} has been deleted`,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Unknown error" });
  }
});

module.exports = router;
