const express = require("express");
const userModel = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const JWT_KEY = "nfa543gvaf31gae3r";
const { signup, login } = require("../Controllers/authController");

const userRouter = express.Router();

userRouter.route("/signup").post(signup); // signup the user
userRouter.route("/login").post(login); // login the user

module.exports = userRouter;
