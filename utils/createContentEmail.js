const { getTimeZone, addHoursToDate, formatDate } = require("./date");
const { ACCEPT_APPOINTMENT } = require("./constant");

const createContentEmailNotificationAppointment = (appointment) => {
  const patient = appointment.patient;
  const timeSlot = appointment.TimeSlot;
  const doctor = appointment.doctor;
  const contentAccept = `
        <h3>Hello ${patient.firstName} ${patient.lastName}</h3>
        <p>You received this email because you booked an online medical appointment on Hospital Care</p>
        <p>Information to schedule an appointment:</p>
        <div><b>Day: ${formatDate(timeSlot.startTime)}</b></div>
        <div><b>Time: ${getTimeZone(timeSlot.startTime)} - ${getTimeZone(
    addHoursToDate(new Date(timeSlot.startTime), timeSlot.duration)
  )}</b></div>
        <div><b>Doctor: ${doctor.firstName} ${doctor.lastName}</b></div>
      `;

  const contentRefuse = `
        <h3>Hello ${patient.firstName} ${patient.lastName}</h3>
        <p>You received this email because you booked an online medical appointment on Hospital Care</p>
        <p>We apologize for canceling your medical appointment:</p>
        <div><b>Day: ${formatDate(timeSlot.startTime)}</b></div>
        <div><b>Time: ${getTimeZone(timeSlot.startTime)} - ${getTimeZone(
    addHoursToDate(new Date(timeSlot.startTime), timeSlot.duration)
  )}</b></div>
        <p>Please forgive us for this inconvenience.</p>
      `;

  let content =
    appointment.status === ACCEPT_APPOINTMENT ? contentAccept : contentRefuse;
  return content;
};

module.exports = { createContentEmailNotificationAppointment };
