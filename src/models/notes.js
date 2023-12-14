import axios from "axios";
const API_BASE_URL = "http://localhost:3001";

class Notes {
  /**addNotes method - by passing in:
   * username, notes, has_prayed(boolean), date(format: 2023/05/05), season(Catholic Church season)
   *
   * You will be adding new data to the database
   *
   * returning: {username}
   */
  static async addNotes(username, notes, has_prayed, date, season) {
    try {
      const res = await axios.post(`${API_BASE_URL}/rosary/notes/new`, {
        username,
        notes,
        has_prayed,
        date,
        season,
      });

      return res.data;
    } catch (err) {
      throw err;
    }
  }
  /**getAllNotes method - by passing in username, the server will
   * return all prayer tracker information associated with the user
   * {username} => [{username, notes, has_prayed, date, season}
   *                {username, notes, has_prayed, date, season}]
   */
  static async getAllNotes(username) {
    try {
      const res = await axios.post(`${API_BASE_URL}/rosary/notes/all`, {
        username,
      });

      return res;
    } catch (err) {
      throw new Error(err);
    }
  }
  /**getRecentNotes method - by passing in username, the server will
   * return all recent prayer tracker information (max 10 items)
   * associated with the user
   * {username} => [{username, notes, has_prayed, date, season}
   *                {username, notes, has_prayed, date, season}]
   */
  static async getRecentNotes(username) {
    try {
      const res = await axios.post(`${API_BASE_URL}/rosary/notes/recent`, {
        username,
      });

      return res;
    } catch (err) {
      throw new Error(err);
    }
  }
  static async getNotesByRange(username, date1, date2) {
    try {
      const res = await axios.post(`${API_BASE_URL}/rosary/notes/range`, {
        username,
        date1,
        date2,
      });

      return res;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**checkDateExist- by passing in a username and date the server returns
   * true/false depending on if it finds the passed in date
   */
  static async checkDateExists(username, date) {
    try {
      const res = await axios.post(
        `http://localhost:3001/rosary/notes/check-date`,
        {
          username,
          date,
        }
      );
      return res.data.dateExists;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default Notes;
