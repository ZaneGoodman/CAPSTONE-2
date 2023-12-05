process.env.NODE_ENV === "test";
const db = require("../db.js");
const User = require("../models/user.js");
const UserNotes = require("../models/rosaryNotes.js");
const { createToken } = require("../helpers/token.js");

async function commonBeforeAll() {
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM users");
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM prayer_tracker");

  await User.register({
    username: "u1",
    password: "password1",
  });
  await User.register({
    username: "u2",
    password: "password2",
  });
  await User.register({
    username: "u3",
    password: "password3",
  });

  await UserNotes.addNotes({
    username: "u1",
    notes: "note1",
    has_prayed: true,
    date: "2023/12/3",
    season: "s1",
  });
  await UserNotes.addNotes({
    username: "u1",
    notes: "note2",
    has_prayed: true,
    date: "2023/12/4",
    season: "s1",
  });
  await UserNotes.addNotes({
    username: "u1",
    notes: "note3",
    has_prayed: true,
    date: "2023/12/4",
    season: "s1",
  });
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}

const u1Token = createToken({ username: "u1" });
const u2Token = createToken({ username: "u2" });

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  u2Token,
};
