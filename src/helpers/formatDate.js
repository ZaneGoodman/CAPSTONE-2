/**Format date function. It will parse out a JavaScript Date object that
 * looks something like this: '2023-12-05T03:29:57.167Z'
 * It returns: '2023/12/05'
 *
 * The purpose of the function is to change the format in order to insert
 * the date into the back-end database properly.
 *
 * It will only work properly when a new Date object is passed into it
 *
 */

function formatDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  const formattedDate = `${year}/${month}/${day}`;
  return formattedDate;
}

export default formatDate;
