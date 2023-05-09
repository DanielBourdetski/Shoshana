import { z } from "zod";

const israeliPhoneNumberRegex =
  /^(?:(?:(\+?972|\(\+?972\)|\+?\(972\))(?:\s|\.|-)?([1-9]\d?))|(0[23489]{1})|(0[57]{1}[0-9]))(?:\s|\.|-)?([^0\D]{1}\d{2}(?:\s|\.|-)?\d{4})$/;

const usernameSchema = z.string().min(3).max(50);
const passwordSchema = z.string().min(8).max(50);
const emailSchema = z.string().email();
const phoneNumberSchema = z.string().regex(israeliPhoneNumberRegex);
const addressSchema = z.string().max(200);

export const validateUsername = (username: string) => {
  try {
    usernameSchema.parse(username);
    return true;
  } catch (err) {
    return false;
  }
};

export const validatePassword = (password: string) => {
  try {
    passwordSchema.parse(password);
    return true;
  } catch (err) {
    return false;
  }
};

export const validateEmail = (email: string) => {
  try {
    emailSchema.parse(email);
    return true;
  } catch (err) {
    return false;
  }
};

export const validatePhoneNumber = (phoneNumber: string) => {
  try {
    phoneNumberSchema.parse(phoneNumber);
    return true;
  } catch (err) {
    return false;
  }
};

export const validateAddress = (address: string) => {
  try {
    addressSchema.parse(address);
    return true;
  } catch (err) {
    return false;
  }
};

export default {
  validateUsername,
  validatePassword,
  validateEmail,
  validateAddress,
  validatePhoneNumber,
};
