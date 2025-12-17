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

/**
<<<<<<< HEAD
 * Google OAuth Login
 */
export const googleLogin = async (payload) => {
  return servicesAxiosInstance.post(
    "/auth/google/login",
    payload
  );
};



/**
=======
>>>>>>> dd81ab68ad52f6811e1cc2eec59ae94996be9e7f
 * Get User Profile
 */
export const getProfile = async () => {
  return servicesAxiosInstance.get("/auth/profile");
};