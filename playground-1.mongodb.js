// Create a new database
use("foodshelf");

// Create a new collection
db.createCollection("ingredients");

db.ingredients.insertMany([
  {
    name: "Apple",
    category: "Fruit",
  },
  {
    name: "Fish",
    category: "Meat",
  },
]);
