const express = require("express");
// create a express router
const router = express.Router();

const { isAdmin } = require("../middleware/auth");

const {
  getRecipes,
  getRecipe,
  addRecipe,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/recipe");

// get all recipes
router.get("/", async (req, res) => {
  try {
    console.log("---");
    const category = req.query.category;
    const ingredients = req.query.ingredients;
    console.log(category, ingredients);

    res.status(200).send(await getRecipes(category, ingredients));
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});

// get one recipe
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    res.status(200).send(await getRecipe(id));
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Unknown error" });
  }
});

// add new recipe
router.post("/", isAdmin, async (req, res) => {
  try {
    const name = req.body.name;
    const instruction = req.body.instruction;
    const category = req.body.category;
    const ingredients = req.body.ingredients;
    const image = req.body.image;

    // error checking
    if (!name || !instruction || !category || !ingredients || !image) {
      return res.status(400).send({
        message: "All the fields are required",
      });
    }

    res
      .status(200)
      .send(await addRecipe(name, instruction, category, ingredients, image));
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Unknown error" });
  }
});

// update recipe
router.put("/:id", isAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const name = req.body.name;
    const instruction = req.body.instruction;
    const category = req.body.category;
    const ingredients = req.body.ingredients;
    const image = req.body.image;

    // error checking
    if (!name || !instruction || !category || !ingredients || !image) {
      return res.status(400).send({
        message: "All the fields are required",
      });
    }

    res
      .status(200)
      .send(
        await updateRecipe(id, name, instruction, category, ingredients, image)
      );
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Unknown error" });
  }
});

// delete recipe
router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    
    await deleteRecipe(id);

    res.status(200).send({
      message: `Recipe with the ID of ${id} has been deleted`,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Unknown error" });
  }
});

module.exports = router;
