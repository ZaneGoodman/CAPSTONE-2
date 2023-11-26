"use strict";

const User = require("../models/user");
const express = require("express");
const router = new express.Router();
const { createToken } = require("../helpers/token");
const { BadRequestError } = require("../expressError");

/** POST /auth/token {username, password} => {token}
 *
 * Will return a JWT token to be used for future route request in react
 *
 *
 */

router.post("/token", async function (req, res, next) {
  try {
    const { username, password } = req.body;
    const user = await User.authenticate(username, password);
    const token = createToken(user);
    return res.json({ token });
  } catch (err) {
    return next(err);
  }
});

/** POST /auth/register {username, password} => {token}
 *
 * required data = {username, password}
 *
 * will return JWT token to be used for furture request in react
 *
 */

router.post("/register", async function (req, res, next) {
  try {
    const { username, password } = req.body;
    const newUser = await User.register(username, password);
    const token = createToken(newUser);
    return res.status(201).json({ token });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
