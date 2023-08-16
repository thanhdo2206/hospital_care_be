const getTimeZone = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("vi-VN", {
    hour: "numeric",
    minute: "numeric",
  }).format(date);
};

const addHoursToDate = (objDate, minuteDuration) => {
  var numberOfMilliseconds = objDate.getTime();
  var addMilliseconds = minuteDuration * 60 * 1000;
  var newDateObj = new Date(numberOfMilliseconds + addMilliseconds);
  return newDateObj;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const dayOfWeek = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  }).format(date);
  const dateFormat = date.toLocaleDateString("en-US");
  const rs = `${dayOfWeek} - ${dateFormat}`;
  return rs;
};

module.exports = { getTimeZone, addHoursToDate, formatDate };
