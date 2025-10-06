const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const getUserByEmail = async (email) => {
  return await User.findOne({ email: email });
};

const login = async (email, password) => {
  // check if the email provided is in the system
  const user = await getUserByEmail(email);
  // if not exists, throw an error
  if (!user) {
    throw new Error("Invalid email or password");
  }
  // if exists, compare the password
  const passwordMatch = bcrypt.compareSync(password, user.password);
  if (!passwordMatch) {
    throw new Error("Invalid email or password");
  }

  // generate the JWT token
  let token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET, // secret
    { expiresIn: 60 * 60 * 8 } // expires after 8 hours
  );

  // if password is correct, return the user data
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: token,
  };
};

const signup = async (name, email, password) => {
  // check if the email provided is already exist
  const emailExists = await getUserByEmail(email);
  // if email exists, throw an error
  if (emailExists) {
    throw new Error(
      "Email already exists. Please use another email or login with your existing email."
    );
  }

  // create the new user
  const newUser = new User({
    name,
    email,
    password: bcrypt.hashSync(password, 10),
  });

  // save the user
  await newUser.save();

  // generate the JWT token
  let token = jwt.sign(
    {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    },
    process.env.JWT_SECRET, // secret
    { expiresIn: 60 * 60 * 8 } // expires after 8 hours
  );

  // return the user data
  return {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
    token: token,
  };
};

module.exports = {
  login,
  signup,
  getUserByEmail,
};
