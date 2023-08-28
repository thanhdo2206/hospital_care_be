const { getTimeZone, addHoursToDate, formatDate } = require("./date");
const { ACCEPT_APPOINTMENT } = require("./constant");

const createContentEmailNotificationAppointment = (appointment) => {
  const patient = appointment.patient;
  const timeSlot = appointment.TimeSlot;
  const startTime = new Date(timeSlot.startTime);
  const endTime = addHoursToDate(
    new Date(timeSlot.startTime),
    timeSlot.duration
  );

  const doctor = appointment.doctor;
  const contentAccept = `
        <h1 style="text-align:center;margin-bottom:20px">Appointment Confirmation</h1>
        <h3>Hello ${patient.firstName} ${patient.lastName},</h3>
        <p>You received this email because you booked an online medical appointment on Hospital Care.</p>
        <h3>Information to schedule an appointment:</h3>
        <div><b>Day</b>: ${formatDate(timeSlot.startTime)}</div>
        <div><b>Time</b>: ${getTimeZone(startTime)} - ${getTimeZone(endTime)}</div>
        <div ><b>Doctor</b>: ${doctor.firstName} ${doctor.lastName}</div>
        <p style="margin-top:30px">We look forward to seeing you soon,</p>
        <p>Thank you for scheduling an appointment through our system.</p>

      `;

  const contentRefuse = `
        <h3>Hello ${patient.firstName} ${patient.lastName},</h3>
        <p>This confirms your appointrment on ${formatDate(
          timeSlot.startTime
        )}, 
          at ${getTimeZone(timeSlot.startTime)} - ${getTimeZone(
    addHoursToDate(new Date(timeSlot.startTime), timeSlot.duration)
  )} has been canceled.</p>
     
        <p>Please forgive us for this inconvenience.</p>
        <p style="margin-top:30px">Many Thanks</p>
      `;

  let content =
    appointment.status === ACCEPT_APPOINTMENT ? contentAccept : contentRefuse;
  return content;
};

module.exports = { createContentEmailNotificationAppointment };
