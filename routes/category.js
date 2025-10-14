const express = require("express");
// create a express router
const router = express.Router();

const {
  getCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");

// get categories
router.get("/", async (req, res) => {
  try {
    const categories = await getCategories();
    
    res.status(200).send(categories);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Unknown Error" });
  }
});

// get category
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const category = await getCategory(id);

    res.status(200).send(category);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Unknown Error" });
  }
});

// create new category
router.post("/", async (req, res) => {
  try {
    const name = req.body.name;

    const newCategory = await addCategory(name);

    res.status(200).send(newCategory);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Unknown Error" });
  }
});

// update category
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const name = req.body.name;

    const updatedCategory = await updateCategory(id, name);

    res.status(200).send(updatedCategory);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Unknown Error" });
  }
});

// delete category
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await deleteCategory(id);
    res.status(200).send({
      message: `Category #${id} has been deleted`,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Unknown Error" });
  }
});

module.exports = router;
