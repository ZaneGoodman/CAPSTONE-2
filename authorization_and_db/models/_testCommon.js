process.env.NODE_ENV === "test";
const bcrypt = require("bcrypt");

const db = require("../db.js");
const { BCRYPT_WORK_FACTOR } = require("../config");

async function commonBeforeAll() {
  await db.query("DELETE FROM prayer_tracker");
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM users");

  await db.query(
    `
        INSERT INTO users (username,
                          password)
        VALUES ('u1', $1 ),
               ('u2', $2 )
        RETURNING username`,
    [
      await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
      await bcrypt.hash("password2", BCRYPT_WORK_FACTOR),
    ]
  );

  await db.query(`
  INSERT INTO prayer_tracker(id, username, notes, has_prayed, date, season)
  VALUES (1, 'u1', 'note1', true, '2023/12/03', 'advent time'),
         (2, 'u2', 'note2' , true, '2023/12/04', 'advent time')`);
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

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
};
