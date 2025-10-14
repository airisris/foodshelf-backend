// load the environment variable
require("dotenv").config();

const express = require("express");
// import mongoose
const mongoose = require("mongoose");
const cors = require("cors");

// setup an express app
const app = express();

// setup a middleware to handle JSON request
app.use(express.json());

// setup cors policy
app.use(cors());

// connect to MongoDB using Mongoose
async function connectToMongoDB() {
  try {
    // wait for the MangoDB to connect
    await mongoose.connect(process.env.MONGODB_URL + "/foodshelf");
    console.log("MongoDB is connected");
  } catch (error) {
    console.log(error);
  }
}

// trigger the connection with MongoDB
connectToMongoDB();

// setup root route
app.get("/api", (req, res) => {
  res.send("Happy coding");
});

// import router
app.use("/api/supplies", require("./routes/supply"));
app.use("/api/recipes", require("./routes/recipe"));
app.use("/api/ingredients", require("./routes/ingredient"));
app.use("/api/image", require("./routes/image"));
app.use("/api/categories", require("./routes/category"));
app.use("/api/users", require("./routes/user"));

// set a folder as a static path
app.use("/api/uploads", express.static("uploads"));

// start the express
app.listen(5123, () => {
  console.log("Server is running at http://localhost:5123");
});
