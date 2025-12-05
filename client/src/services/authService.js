import { servicesAxiosInstance } from "./config";

/**
 * Send OTP (Email or Phone)
 */
export const sendOtp = async (payload) => {
  return servicesAxiosInstance.post(
    "/auth/send-otp",
    payload
  );
};

/**
 * Verify OTP (Email or Phone)
 */
export const verifyOtp = async (payload) => {
  return servicesAxiosInstance.post(
    "/auth/verify-otp",
    payload
  );
};

/**
 * Complete Profile
 */
export const completeProfile = async (payload) => {
  return servicesAxiosInstance.post(
    "/auth/complete-profile",
    payload
  );
};
