import User from "../models/User.model.js";
import generateToken from "../utils/generateToken.js";

export const register = async (req, res) => {
  const { username, password } = req.body;

  const exists = await User.findOne({ username });
  if (exists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({ username, password });

  res.status(201).json({
    token: generateToken(user._id),
    user: { id: user._id, username: user.username },
  });
};

// export const login = async (req, res) => {
//   const { username, password } = req.body;

//   console.log("LOGIN ATTEMPT:", username, password);

//   const user = await User.findOne({ username });

//   console.log("USER FOUND:", !!user);

//   if (!user || !(await user.comparePassword(password))) {
//     return res.status(401).json({ message: "Invalid credentials" });
//   }

//   res.json({
//     token: generateToken(user._id),
//     user: { id: user._id, username: user.username },
//   });
// };

export const login = async (req, res) => {
  const { username, password } = req.body;

  console.log("LOGIN ATTEMPT:", username, password);

  const user = await User.findOne({ username });
  console.log("USER FOUND:", !!user);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await user.comparePassword(password);
  console.log("PASSWORD MATCH:", isMatch);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({
    token: generateToken(user._id),
    user: { id: user._id, username: user.username },
  });
};

export const getProfile = async (req, res) => {
  res.json(req.user);
};
