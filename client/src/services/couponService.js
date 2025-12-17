import { servicesAxiosInstance } from "./config";

/**
 * Coupon Services
 */

/**
 * Apply a coupon code
 * @param {Object} payload - Coupon application data
 * @param {string} payload.code - Coupon code
 * @param {string} payload.propertyId - Property ID
 * @param {number} payload.bookingAmount - Booking amount
 * @returns {Promise} - Axios response with discount details
 */
export const applyCoupon = async (payload) => {
  return servicesAxiosInstance.post("/coupons/apply", payload);
};

/**
 * Get all coupons
 * @param {Object} params - Query parameters
 * @param {number} params.page - Page number (default: 1)
 * @param {number} params.limit - Items per page (default: 10)
 * @param {boolean} params.isActive - Filter by active status
 * @returns {Promise} - Axios response with coupons
 */
export const getAllCoupons = async (params = { page: 1, limit: 10 }) => {
  return servicesAxiosInstance.get("/coupons", { params });
};

/**
 * Create a new coupon (Admin/Partner only)
 * @param {Object} payload - Coupon data
 * @returns {Promise} - Axios response
 */
export const createCoupon = async (payload) => {
  return servicesAxiosInstance.post("/coupons", payload);
};

/**
 * Toggle coupon status (Admin/Partner only)
 * @param {string} couponId - Coupon ID
 * @returns {Promise} - Axios response
 */
export const toggleCouponStatus = async (couponId) => {
  return servicesAxiosInstance.patch("/coupons/toggle-status", { couponId });
};

export default {
  applyCoupon,
  getAllCoupons,
  createCoupon,
  toggleCouponStatus,
};

