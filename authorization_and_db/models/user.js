const db = require("../db");
const bcrypt = require("bcrypt");
const { UnauthorizedError, BadRequestError } = require("../expressError");
const { BCRYPT_WORK_FACTOR } = require("../config");

class User {
  /**
   * Check if passed in user is in the database
   * And validate the passed in password
   * Return error if unauthorized or if user not found
   */
  static async authenticate({ username, password }) {
    /**Find the user */
    const result = await db.query(
      `
        SELECT username, password
        FROM users
        WHERE username=$1
        `,
      [username]
    );

    const user = result.rows[0];

    if (user) {
      // compare hashed password to a new hash from the password
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        delete user.password;
        return user;
      }
    }
    throw new UnauthorizedError("Invalid username/password");
  }

  static async register({ username, password }) {
    const duplicateCheck = await db.query(
      `SELECT username 
        FROM users 
        WHERE username = $1`,
      [username]
    );
    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Username ${username} is taken`);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
      `
    INSERT INTO users
    (username, password)
    VALUES ($1, $2)
    RETURNING username
    `,
      [username, hashedPassword]
    );
    const user = result.rows[0];
    return user;
  }
}

module.exports = User;
