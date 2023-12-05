/**Tesing Authorization Class methods */
import Authorization from "./authUser";
const axios = require("axios");
jest.mock("axios");

describe("Authorization Model", function () {
  test("signup method works", async function () {
    axios.post.mockResolvedValue({
      data: { token: "EncryptedToken" },
    });
    const result = await Authorization.signup("testuser", "testPassword");
    expect(result).toEqual("EncryptedToken");
  });
  test("Error if missing date in signup method", async function () {
    axios.post.mockResolvedValue({
      data: { token: "ERROR" },
    });
    const result = await Authorization.signup("testPassword");
    expect(result).toEqual("ERROR");
  });
  test("login method works", async function () {
    axios.post.mockResolvedValue({
      data: { token: "EncryptedToken" },
    });
    const result = await Authorization.signup("testuser", "testPassword");
    expect(result).toEqual("EncryptedToken");
  });
  test("Error if missing date in login method", async function () {
    axios.post.mockResolvedValue({
      data: { token: "ERROR" },
    });
    const result = await Authorization.signup("testPassword");
    expect(result).toEqual("ERROR");
  });
});
