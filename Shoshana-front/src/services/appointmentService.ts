import httpService from "./httpService";

export const addAppointment = async () => {};

export const updateAppointment = async () => {};

export const getAppointmentById = async () => {};

export const getAppointments = async () => {
  const res = await httpService.get("http://localhost:3000/appointment/");
  return res.data;
};

export const getAppointmentsByDate = async () => {};

export const getAppointmentsByDateRange = async () => {};

export const cancelAppointment = async () => {};

export const deleteAppointment = async () => {};

export default {
  addAppointment,
  updateAppointment,
  getAppointmentById,
  getAppointments,
  getAppointmentsByDate,
  getAppointmentsByDateRange,
  cancelAppointment,
  deleteAppointment,
};
