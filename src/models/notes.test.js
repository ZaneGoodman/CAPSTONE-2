/**Tesing Notes Class methods */
import Notes from "./notes";
const axios = require("axios");
jest.mock("axios");

describe("Notes addNote method", function () {
  test("addNote method works", async function () {
    axios.post.mockResolvedValue({
      data: "testuser",
    });
    const result = await Notes.addNotes(
      "testuser",
      "test notes",
      true,
      "2023/05/05",
      "Ordinary Time"
    );
    expect(result).toEqual("testuser");
  });
  test("Error if missing data", async function () {
    axios.post.mockResolvedValue({
      data: "ERROR",
    });
    const result = await Notes.addNotes(
      "testuser",
      true,
      "2023/05/05",
      "Ordinary Time"
    );
    expect(result).toEqual("ERROR");
  });
});

describe("Notes getAllNotes method", function () {
  test("getAllNotes method works", async function () {
    axios.post.mockResolvedValue([
      {
        username: "testuser",
        notes: "test notes",
        has_prayed: true,
        date: "2023/05/05",
        season: "Ordinary Time",
      },
      {
        username: "testuser",
        notes: "test notes2",
        has_prayed: true,
        date: "2023/05/05",
        season: "Ordinary Time",
      },
    ]);
    const result = await Notes.getAllNotes("testuser");
    expect(result).toEqual([
      {
        username: "testuser",
        notes: "test notes",
        has_prayed: true,
        date: "2023/05/05",
        season: "Ordinary Time",
      },
      {
        username: "testuser",
        notes: "test notes2",
        has_prayed: true,
        date: "2023/05/05",
        season: "Ordinary Time",
      },
    ]);
  });
  test("Error if missing data", async function () {
    axios.post.mockResolvedValue(["ERROR"]);
    const result = await Notes.getAllNotes();
    expect(result).toEqual(["ERROR"]);
  });
});

describe("Notes getRecentNotes method", function () {
  test("getRecentNotes method works", async function () {
    axios.post.mockResolvedValue([
      {
        username: "testuser",
        notes: "test notes",
        has_prayed: true,
        date: "2023/05/05",
        season: "Ordinary Time",
      },
      {
        username: "testuser",
        notes: "test notes2",
        has_prayed: true,
        date: "2023/05/05",
        season: "Ordinary Time",
      },
    ]);
    const result = await Notes.getRecentNotes("testuser");
    expect(result).toEqual([
      {
        username: "testuser",
        notes: "test notes",
        has_prayed: true,
        date: "2023/05/05",
        season: "Ordinary Time",
      },
      {
        username: "testuser",
        notes: "test notes2",
        has_prayed: true,
        date: "2023/05/05",
        season: "Ordinary Time",
      },
    ]);
  });
  test("Error if missing data", async function () {
    axios.post.mockResolvedValue(["ERROR"]);
    const result = await Notes.getRecentNotes();
    expect(result).toEqual(["ERROR"]);
  });
});
describe("Notes getNotesByRange method", function () {
  test("getNotesByRange method works", async function () {
    axios.post.mockResolvedValue([
      {
        username: "testuser",
        notes: "test notes",
        has_prayed: true,
        date: "2023/05/05",
        season: "Ordinary Time",
      },
      {
        username: "testuser",
        notes: "test notes2",
        has_prayed: true,
        date: "2023/05/05",
        season: "Ordinary Time",
      },
    ]);
    const result = await Notes.getNotesByRange(
      "testuser",
      "2023/05/05",
      "2023/05/05"
    );
    expect(result).toEqual([
      {
        username: "testuser",
        notes: "test notes",
        has_prayed: true,
        date: "2023/05/05",
        season: "Ordinary Time",
      },
      {
        username: "testuser",
        notes: "test notes2",
        has_prayed: true,
        date: "2023/05/05",
        season: "Ordinary Time",
      },
    ]);
  });
  test("Error if missing data", async function () {
    axios.post.mockResolvedValue(["ERROR"]);
    const result = await Notes.getNotesByRange();
    expect(result).toEqual(["ERROR"]);
  });
});

describe("Notes checkDateExists method", function () {
  test("checkDateExists method works when date exist", async function () {
    axios.post.mockResolvedValue({ data: { dateExists: true } });
    const result = await Notes.checkDateExists("testuser", "2023/05/05");
    expect(result).toEqual(true);
  });
  test("checkDateExists method works when date doesn't exist", async function () {
    axios.post.mockResolvedValue({ data: { dateExists: false } });
    const result = await Notes.checkDateExists("testuser", "2023/05/05");
    expect(result).toEqual(false);
  });
});
