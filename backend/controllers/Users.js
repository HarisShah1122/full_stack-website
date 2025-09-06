const express = require("express"); 
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); 
const Users = require("../models/Users");
const { validateSignIn, validateSignUp } = require('../helpers/validation');

exports.controller = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // LOGIN
  app.post("/login", [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array().map((err) => err.msg).join(", "),
      });
    }
    try {
      const user = await Users.findOne({ where: { email: req.body.email } });
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials." });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" } // Token valid for 1 hour
      );

      return res.status(200).json({
        message: "User successfully logged in.",
        token,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Login failed: " + error.message });
    }
  });

  // SIGNUP
  app.post("/signup", validateSignUp, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array().map((err) => err.msg).join(", "),
      });
    }

    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = await Users.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPassword,
      });

      // Generate JWT token after signup
      const token = jwt.sign(
        { id: newUser.id, email: newUser.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.status(201).json({
        message: "User registered successfully.",
        token,
      });
    } catch (error) {
      console.log(error); 
      return res.status(500).json({ error: "User registration failed: " + error.message });
    }
  });

  // Protected route example
  app.get("/check-auth", (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ error: "No token provided" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ error: "Invalid token" });

      return res.status(200).json({ message: "Authenticated", user });
    });
  });
};
