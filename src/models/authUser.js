import axios from "axios";
const API_BASE_URL = "http://localhost:3001";

class Authorization {
  /**Login method - by passing in a username and password that already exist the back-end server will return a bcrypt athenticated token */
  static async login(username, password) {
    try {
      const res = await axios.post("http://localhost:3001/auth/token", {
        username,
        password,
      });

      return res.data.token;
    } catch (err) {
      throw new Error(err);
    }
  }
  static async signup(username, password) {
    /**signup method - By passing in a new username and a password, it will return a bcrypt athenticated token from the back-end server. Usernames cannot be duplicated */
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/register`, {
        username,
        password,
      });

      return res.data.token;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default Authorization;
