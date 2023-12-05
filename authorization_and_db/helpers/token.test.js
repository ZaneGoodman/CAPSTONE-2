process.env.NODE_ENV === "test";

const { createToken } = require("./token");

describe("Testing token helper function", function () {
  test("works", function () {
    const res = createToken({ username: "testUser" });
    expect(res).toEqual(expect.any(String));
  });
});
