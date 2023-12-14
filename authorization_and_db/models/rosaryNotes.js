const db = require("../db");
const bcrypt = require("bcrypt");
const { UnauthorizedError, BadRequestError } = require("../expressError");
const { BCRYPT_WORK_FACTOR } = require("../config");

class RosaryNotes {
  /**
   * Add prayer tracker information from the front-end to the database
   */
  static async addNotes({ username, notes, has_prayed, date, season }) {
    /**Find the user */
    const user = await db.query(
      `SELECT username FROM users WHERE username=$1`,
      [username]
    );

    if (!user.rows[0]) throw new BadRequestError("Invalid username");
    const result = await db.query(
      `
                    INSERT INTO prayer_tracker
                    (username, notes, has_prayed, date, season)
                    VALUES
                    ($1, $2, $3, $4, $5)
                    RETURNING username
                    `,
      [username, notes, has_prayed, date, season]
    );

    const tracker = result.rows[0];

    return tracker;
  }
  /**Get all prayer tracker information */
  static async getAllNotes({ username }) {
    const user = await db.query(
      `SELECT username FROM users WHERE username=$1`,
      [username]
    );
    if (!user.rows[0]) throw new BadRequestError("Invalid username");
    const results = await db.query(
      `
                     SELECT username,
                            notes,
                            has_prayed,
                            date,
                            season
                     FROM prayer_tracker
                     WHERE username = $1`,
      [username]
    );
    const trackerDetails = results.rows;
    return trackerDetails;
  }
  static async getMostRecentNotes({ username }) {
    const user = await db.query(
      `SELECT username FROM users WHERE username=$1`,
      [username]
    );
    if (!user.rows[0]) throw new BadRequestError("Invalid username");

    const results = await db.query(
      `
                    SELECT username,
                           notes,    
                           has_prayed,
                           date,
                           season
                    FROM prayer_tracker 
                    WHERE username = $1 
                    ORDER BY date 
                    DESC LIMIT 10
                    `,
      [username]
    );
    const recentNotes = results.rows;
    return recentNotes;
  }
  static async getNotesByRange({ username, date1, date2 }) {
    const user = await db.query(
      `SELECT username FROM users WHERE username=$1`,
      [username]
    );
    if (!user.rows[0]) throw new BadRequestError("Invalid username");
    if (!date1 || !date2) throw new BadRequestError("Invalid dates");

    const results = await db.query(
      `
                    SELECT username,
                           notes,    
                           has_prayed,
                           date,
                           season
                    FROM prayer_tracker 
                    WHERE username = $1 
                    AND date 
                    BETWEEN $2 
                    AND $3
                    ORDER BY date 
                    
                    `,
      [username, date1, date2]
    );
    const rangedNotes = results.rows;
    return rangedNotes;
  }

  static async checkForExistingDate({ username, date }) {
    const user = await db.query(
      `SELECT username FROM users WHERE username=$1`,
      [username]
    );
    if (!user.rows[0]) throw new BadRequestError("Invalid username");
    const result = await db.query(
      `
                    SELECT date
                    FROM prayer_tracker
                    WHERE username = $1
                    AND date = $2  `,
      [username, date]
    );

    if (result.rows[0]) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = RosaryNotes;
