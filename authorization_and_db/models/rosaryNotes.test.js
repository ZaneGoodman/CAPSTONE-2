const { BadRequestError } = require("../expressError");
const db = require("../db.js");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon");
const RosaryNotes = require("./rosaryNotes.js");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** Add Note method */

describe("Add Note", function () {
  test("works", async function () {
    const result = await RosaryNotes.addNotes({
      username: "u1",
      notes: "test note",
      has_prayed: true,
      date: "2023/05/05",
      season: "Lenten Season",
    });
    const found = await db.query(
      `SELECT username, notes FROM prayer_tracker WHERE date = '2023/05/05' AND username = 'u1'`
    );
    expect(result).toEqual({
      username: "u1",
    });

    expect(found.rows).toEqual([{ notes: "test note", username: "u1" }]);
  });
  test("Bad Request Error if username not found", async function () {
    try {
      await RosaryNotes.addNotes({
        username: "not a user",
        notes: "test note",
        has_prayed: true,
        date: "2023/05/05",
        season: "Lenten Season",
      });
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});
//   /************************************** get all notes method */

describe("getAllNotes", function () {
  test("works", async function () {
    const notes = await RosaryNotes.getAllNotes({
      username: "u1",
    });
    expect(notes).toEqual([
      {
        date: expect.any(Date), //This does not return a string, in order to implement this test, date must be passed in this way to ensure proper testing.
        has_prayed: true,
        notes: "note1",
        season: "advent time",
        username: "u1",
      },
    ]);
  });
  test("Bad Request Error if invalid username", async function () {
    try {
      await RosaryNotes.getAllNotes({
        username: "not a user",
      });
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});
//   /************************************** get most recent notes method */

describe("getMostRecentNotes", function () {
  test("works", async function () {
    const notes = await RosaryNotes.getMostRecentNotes({
      username: "u1",
    });
    expect(notes).toEqual([
      {
        date: expect.any(Date), //This does not return a string, in order to implement this test, date must be passed in this way to ensure proper testing.
        has_prayed: true,
        notes: "note1",
        season: "advent time",
        username: "u1",
      },
    ]);
  });
  test("Bad Request Error if invalid username", async function () {
    try {
      await RosaryNotes.getMostRecentNotes({
        username: "not a user",
      });
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});
//   /************************************** get notes by range method */

describe("getNotesByRange", function () {
  test("works", async function () {
    const notes = await RosaryNotes.getNotesByRange({
      username: "u2",
      date1: "2023/12/04",
      date2: "2023/12/04",
    });
    expect(notes).toEqual([
      {
        date: expect.any(Date), //This does not return a string, in order to implement this test, date must be passed in this way to ensure proper testing.
        has_prayed: true,
        notes: "note2",
        season: "advent time",
        username: "u2",
      },
    ]);
  });
  test("Bad Request Error if invalid username", async function () {
    try {
      await RosaryNotes.getNotesByRange({
        username: "not a user",
      });
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
  test("Bad Request Error if invalid dates", async function () {
    try {
      await RosaryNotes.getNotesByRange({
        username: "u2",
      });
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

/************************************** Check if date exist method */

describe("Check if date exist", function () {
  test("works, returns true for found date", async function () {
    const notes = await RosaryNotes.checkForExistingDate({
      username: "u1",
      date: "2023/12/03",
    });
    expect(notes).toEqual(true);
  });
  test("works, returns fale for not found date", async function () {
    const notes = await RosaryNotes.checkForExistingDate({
      username: "u1",
      date: "2022/12/03",
    });
    expect(notes).toEqual(false);
  });
  test("Bad Request Error if invalid username", async function () {
    try {
      await RosaryNotes.checkForExistingDate({
        username: "not a user",
        date: "2023/12/03",
      });
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});
