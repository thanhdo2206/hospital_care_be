const moment = require("moment");

const getTimeZone = (dateString) => {
  const timeLocal = moment(dateString).local().format("HH:mm");
  return timeLocal;
  //  const date = new Date(dateString);
  // return new Intl.DateTimeFormat("vi-VN", {
  //   hour: "numeric",
  //   minute: "numeric",
  // }).format(date);
};

const addHoursToDate = (objDate, minuteDuration) => {
  let numberOfMilliseconds = objDate.getTime();
  let addMilliseconds = minuteDuration * 60 * 1000;
  let newDateObj = new Date(numberOfMilliseconds + addMilliseconds);
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

const getDateAndMonth = (dateString) => {
  const dateObj = new Date(dateString);
  const subDate = moment(dateObj).subtract(1, "days");
  const date = subDate.date();
  const month = subDate.month();

  return { date, month: month + 1 };
};

module.exports = { getTimeZone, addHoursToDate, formatDate, getDateAndMonth };
