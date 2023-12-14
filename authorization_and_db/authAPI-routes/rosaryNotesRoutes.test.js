process.env.NODE_ENV === "test";
const request = require("supertest");

const app = require("../app");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /rosary/notes/new */

describe("POST /rosary/notes/new", function () {
  test("works", async function () {
    const resp = await request(app).post("/rosary/notes/new").send({
      username: "u2",
      notes: "testing",
      has_prayed: true,
      date: "2023/12/03",
      season: "ordinary time",
    });
    expect(resp.body).toEqual({
      addedNotes: { username: "u2" },
    });
  });
  test("BadRequestError if missing data", async function () {
    const resp = await request(app).post("/rosary/notes/new").send({
      username: "u2",
      notes: "testing",
      has_prayed: true,
      season: "ordinary time",
    });
    expect(resp.statusCode).toEqual(400);
  });
  test("BadRequestError if wrong username", async function () {
    const resp = await request(app).post("/rosary/notes/new").send({
      username: "not-a-user",
      notes: "testing",
      has_prayed: true,
      date: "2023/12/03",
      season: "ordinary time",
    });
    expect(resp.statusCode).toEqual(400);
  });
});

/************************************** POST /rosary/notes/all */

describe("POST /rosary/notes/all", function () {
  test("works", async function () {
    const resp = await request(app).post("/rosary/notes/all").send({
      username: "u1",
    });
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({
      allNotes: [
        {
          date: "2023-12-03T05:00:00.000Z",
          has_prayed: true,
          notes: "note1",
          season: "s1",
          username: "u1",
        },
        {
          date: "2023-12-04T05:00:00.000Z",
          has_prayed: true,
          notes: "note2",
          season: "s1",
          username: "u1",
        },
        {
          date: "2023-12-05T05:00:00.000Z",
          has_prayed: true,
          notes: "note3",
          season: "s1",
          username: "u1",
        },
      ],
    });
  });

  test("bad request with missing fields", async function () {
    const resp = await request(app).post("/rosary/notes/all").send({
      username: "new",
    });
    expect(resp.statusCode).toEqual(400);
  });

  test("bad request with invalid data", async function () {
    const resp = await request(app).post("/rosary/notes/all").send({
      username: "new",
    });
    expect(resp.statusCode).toEqual(400);
  });
});

/************************************** POST /rosary/notes/recent */
describe("POST /rosary/notes/recent", function () {
  test("works", async function () {
    const resp = await request(app).post("/rosary/notes/recent").send({
      username: "u1",
    });
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({
      recentNotes: [
        {
          date: "2023-12-05T05:00:00.000Z",
          has_prayed: true,
          notes: "note3",
          season: "s1",
          username: "u1",
        },
        {
          date: "2023-12-04T05:00:00.000Z",
          has_prayed: true,
          notes: "note2",
          season: "s1",
          username: "u1",
        },
        {
          date: "2023-12-03T05:00:00.000Z",
          has_prayed: true,
          notes: "note1",
          season: "s1",
          username: "u1",
        },
      ],
    });
  });
  test("bad request with missing fields", async function () {
    const resp = await request(app).post("/rosary/notes/recent").send({
      username: "new",
    });
    expect(resp.statusCode).toEqual(400);
  });

  test("bad request with invalid data", async function () {
    const resp = await request(app).post("/rosary/notes/recent").send({
      username: "new",
    });
    expect(resp.statusCode).toEqual(400);
  });
});
/************************************** POST /rosary/notes/range */
describe("POST /rosary/notes/range", function () {
  test("works", async function () {
    const resp = await request(app).post("/rosary/notes/range").send({
      username: "u1",
      date1: "2023/12/03",
      date2: "2023/12/04",
    });
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({
      rangedNotes: [
        {
          date: "2023-12-03T05:00:00.000Z",
          has_prayed: true,
          notes: "note1",
          season: "s1",
          username: "u1",
        },
        {
          date: "2023-12-04T05:00:00.000Z",
          has_prayed: true,
          notes: "note2",
          season: "s1",
          username: "u1",
        },
      ],
    });
  });

  test("bad request with missing dates", async function () {
    const resp = await request(app).post("/rosary/notes/range").send({
      username: "u1",
    });
    expect(resp.statusCode).toEqual(400);
  });

  test("bad request with invalid data", async function () {
    const resp = await request(app).post("/rosary/notes/range").send({
      username: "new",
    });
    expect(resp.statusCode).toEqual(400);
  });
});

/************************************** POST /rosary/notes/check-date */

describe("POST /rosary/notes/check-date", function () {
  test("works for existing date", async function () {
    const resp = await request(app).post("/rosary/notes/check-date").send({
      username: "u1",
      date: "2023/12/03",
    });
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({ dateExists: true });
  });
  test("works for non-existing date", async function () {
    const resp = await request(app).post("/rosary/notes/check-date").send({
      username: "u1",
      date: "2023/01/05",
    });
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({ dateExists: false });
  });
  test("BadRequestError if missing data", async function () {
    const resp = await request(app).post("/rosary/notes/check-date").send({
      username: "u1",
    });
    expect(resp.statusCode).toEqual(400);
  });
  test("works for different format", async function () {
    const resp = await request(app).post("/rosary/notes/check-date").send({
      username: "u1",
      date: "12/03/2023",
    });
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({ dateExists: true });
  });
  test("works for different format v2", async function () {
    const resp = await request(app).post("/rosary/notes/check-date").send({
      username: "u1",
      date: "2023/5/5",
    });
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({ dateExists: false });
  });
  test("Error if invalid date", async function () {
    const resp = await request(app).post("/rosary/notes/check-date").send({
      username: "u1",
      date: "23/05/05",
    });
    expect(resp.statusCode).toEqual(500);
  });
});
