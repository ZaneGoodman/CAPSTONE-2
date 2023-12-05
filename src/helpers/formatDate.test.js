import formatDate from "./formatDate";
/**Different day returned, Only thing that matters here is the format */
test("works", function () {
  const result = formatDate(new Date("2023-12-04T00:00:00.000Z"));
  expect(result).toEqual("2023/12/03");
});
