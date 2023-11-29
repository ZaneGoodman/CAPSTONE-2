import axios from "axios";
const API_BASE_URL = "http://localhost:3001";

class Authorization {
  static async login(username, password) {
    try {
      const res = await axios.post("http://localhost:3001/auth/token", {
        username: username,
        password: password,
      });
      console.log(res.data.token);
      return res.data.token;
    } catch (err) {
      throw new Error(err);
    }
  }
  static async signup(username, password) {
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/register`, {
        username,
        password,
      });
      console.log(res.data.token);
      return res.data.token;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default Authorization;
// const test = async () => {
//     const res = await axios.post("http://localhost:3001/auth/token", {
//       username: "bob",
//       password: "bob123",
//     });
//     console.log(res);
//   };
//   test();
