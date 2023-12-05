import axios from "axios";
const API_BASE_URL = "https://the-rosary-api.vercel.app";
const CALENDAR_BASE_URL =
  "http://calapi.inadiutorium.cz/api/v0/en/calendars/default";
axios.defaults.withCredentials = false;

class Rosary {
  /**getByDay method - by passing in a weekday like 'tuesday' this method
   * returns an object of rosary information.
   */
  static async getByDay(weekday) {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/v1/${weekday.toLowerCase()}`
      );
      return res;
    } catch (error) {
      throw error;
    }
  }
  /**
   * getByDate method - By passing in a date in '2023/05/05' format
   * a Catholic Calendar API will return season information and use the
   * weekday of that information to call getByDay method to get the
   * correct rosary data for the passed in date.
   */
  static async getByDate(date) {
    // YYYY/MM/DD
    try {
      const dateResponse = await axios.get(`${CALENDAR_BASE_URL}/${date}`);

      const season = `Week ${dateResponse.data.season_week} of the ${dateResponse.data.season} season`;

      const weekday = dateResponse.data.weekday;
      const rosaryResponse = await this.getByDay(weekday);
      return { ...rosaryResponse, season };
    } catch (error) {
      throw error;
    }
  }
}
export default Rosary;
