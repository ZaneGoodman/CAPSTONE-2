const RosaryNotes = require("../models/rosaryNotes");
const express = require("express");
const jsonschema = require("jsonschema");
const newRosaryNote = require("../schemas/newRosaryNote.json");
const { BadRequestError } = require("../expressError");
const router = new express.Router();

/** POST /rosary/notes {username, notes, has_prayed, date, season } => {username}
 *
 * Adds prayer tracker info into database
 */

router.post("/notes/new", async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, newRosaryNote);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }
    const { username, notes, has_prayed, date, season } = req.body;
    const addedNotes = await RosaryNotes.addNotes({
      username,
      notes,
      has_prayed,
      date,
      season,
    });
    console.log(req.body);
    return res.json({ addedNotes });
  } catch (err) {
    return next(err);
  }
});

/**
 * POST /rosary/notes {username} => {username, notes, has_prayed, date, season}
 *
 * Will get all prayer tracker information that is linked to the passed in username
 */
router.post("/notes/all", async function (req, res, next) {
  try {
    if (!req.body.username) {
      throw new BadRequestError("Missing username");
    }
    const { username } = req.body;
    const allNotes = await RosaryNotes.getAllNotes({ username });
    return res.send({ allNotes });
  } catch (err) {
    return next(err);
  }
});
/**
 * POST /rosary/notes {username} => {username, notes, has_prayed, date, season}
 *
 * Will get all prayer tracker information that is linked to the passed in username
 */
router.post("/notes/check-date", async function (req, res, next) {
  try {
    if (!req.body.username || !req.body.date) {
      throw new BadRequestError("Missing username/date");
    }
    const { username, date } = req.body;
    const dateExists = await RosaryNotes.checkForExistingDate({
      username,
      date,
    });
    return res.json({ dateExists });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
