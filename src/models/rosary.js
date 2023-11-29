import { getByPlaceholderText } from "@testing-library/react";
import axios from "axios";
const API_BASE_URL = "https://the-rosary-api.vercel.app";
const CALENDAR_BASE_URL =
  "http://calapi.inadiutorium.cz/api/v0/en/calendars/default";

class Rosary {
  /**MM/DD/YY */
  static async getByDay() {
    try {
      const date = await axios.get(`${CALENDAR_BASE_URL}/2023/11/29`);
      console.log(date.data.weekday);

      const res = await axios.get(`${API_BASE_URL}/v1/tuesday`);
      console.log(res);

      // return date;
    } catch (err) {
      throw new Error(err);
    }
  }
  static async getByDate(date) {
    try {
      const result = await axios.get(`${API_BASE_URL}/v1/date/${date}`, {
        "access-control-allow-origin": "*",
      });

      // const day = await this.getByDay("tuesday");
      // console.log(day);

      console.log(result);
      return result;
    } catch (err) {
      throw new Error(err);
    }

    // const res = await this.getByDay(result.data.rosary_day);
    // console.log(res);
    // return res;
  }
}
export default Rosary;
