/**Tesing Rosary Class methods */
import Rosary from "./rosary";
const axios = require("axios");
jest.mock("axios");

describe("Rosary getByDay method", function () {
  test("addNote method works", async function () {
    axios.get.mockResolvedValue("Prayer Stuff");
    const result = await Rosary.getByDay("tuesday");
    expect(result).toEqual("Prayer Stuff");
  });
});
describe("Rosary getByDate method", function () {
  test("addNote method works", async function () {
    axios.get.mockResolvedValue({
      data: {
        season_week: "Ordinary Time",
        weekday: "tuesday",
        prayerStuff: "prayer stuff",
      },
    });

    const result = await Rosary.getByDate("2023/05/05");
    expect(result.data.prayerStuff).toEqual("prayer stuff");
  });
});
