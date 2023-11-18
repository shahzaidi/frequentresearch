const express = require("express");
const router = express.Router();
const User = require("../models/usersModel");

router.get("/users", async (req, res) => {
  const result = await User.find();

  res.status(200).json({ success: true, users: result });
});

router.post("/postuser", async (req, res) => {
  const { firstname, lastname, email, country, state, city, gender, dob, age } =
    req.body;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  if (
    !firstname ||
    !lastname ||
    !email ||
    !country ||
    !state ||
    !city ||
    !gender ||
    !dob ||
    !age
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill each field properly" });
  } else if (!regex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address",
    });
  } else {
    try {
      const userExist = await User.findOne({ email: email });
      if (userExist) {
        return res
          .status(400)
          .json({ success: false, message: "Email already exist" });
      }
      const result = await new User({
        firstname,
        lastname,
        email,
        country,
        state,
        city,
        gender,
        dob,
        age,
      }).save();
      // await result.save();
      res
        .status(200)
        .json({ success: true, message: "User added succefully", result });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
});

module.exports = router;
