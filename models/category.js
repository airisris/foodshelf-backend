const {Schema, model} = require("mongoose");

/*
  Category model
  - name
*/

const categorySchema = new Schema ({
    name: {
        type: String,
        required: true,
    }
});

const Category = model("Category", categorySchema);
module.exports = Category;