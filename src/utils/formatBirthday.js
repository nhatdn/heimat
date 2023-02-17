export default function formatBirthday(dateInput) {
  var date = new Date(dateInput);
  var year = date.getFullYear();

  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : "0" + month;

  var day = date.getDate().toString();
  day = day.length > 1 ? day : "0" + day;

  console.log(year);
  console.log(month);
  console.log(day);
  return `${year}-${month}-${day}`;
}
