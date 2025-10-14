const jwt = require("jsonwebtoken");

const { getUserByEmail } = require("../controllers/user");

// to check if the user is a valid user (control whether anyone who is calling the API is a valid logged in user)
const isValidUser = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    // extract the token from the authorization header
    const token = authorization.replace("Bearer ", "");

    // verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // get the user data by email
    const user = await getUserByEmail(decoded.email);

    // verify if the user exists and is an admin
    if (user) {
      // add the user data into the request
      req.user = user;
      // trigger the next function
      next();
    } else {
      // trigger error if not admin
      res.status(400).send({ error: "YOU SHALL NOT PASS" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "YOU SHALL NOT PASS" });
  }
};

// to check if the user is an admin or not
const isAdmin = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    // extract the token from the authorization header
    const token = authorization.replace("Bearer ", "");

    // verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // get the user data by email
    const user = await getUserByEmail(decoded.email);

    // verify if the user exists and is an admin
    if (user && user.role === "admin") {
      // add the user data into the request
      req.user = user;
      // trigger the next function
      next();
    } else {
      // trigger error if not admin
      res.status(400).send({ error: error.message});
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
};

module.exports = {
  isValidUser,
  isAdmin,
};
