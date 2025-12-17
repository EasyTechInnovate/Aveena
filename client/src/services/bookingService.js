import { servicesAxiosInstance } from "./config";

/**
 * Booking Services
 */

// =========== BOOKING OPERATIONS ===========

/**
 * Create a new booking
 * @param {Object} bookingData - Booking details
 * @param {string} bookingData.propertyId - Property ID
 * @param {string} bookingData.checkInDate - Check-in date (YYYY-MM-DD)
 * @param {string} bookingData.checkOutDate - Check-out date (YYYY-MM-DD)
 * @param {number} bookingData.adults - Number of adults
 * @param {number} bookingData.childrens - Number of children
 * @param {number} bookingData.noOfRooms - Number of rooms
 * @returns {Promise} - Axios response
 */
export const createBooking = async (bookingData) => {
  return servicesAxiosInstance.post("/bookings", bookingData);
};

/**
 * Handle payment success
 * @param {Object} paymentData - Payment success data
 * @param {string} paymentData.txnid - Transaction ID
 * @param {string} paymentData.mode - Payment mode (CC, DC, NB, etc.)
 * @returns {Promise} - Axios response
 */
export const handlePaymentSuccess = async (paymentData) => {
  return servicesAxiosInstance.post("/bookings/payment-success", paymentData);
};

/**
 * Handle payment failure
 * @param {Object} paymentData - Payment failure data
 * @param {string} paymentData.txnid - Transaction ID
 * @returns {Promise} - Axios response
 */
export const handlePaymentFailure = async (paymentData) => {
  return servicesAxiosInstance.post("/bookings/payment-failure", paymentData);
};

/**
 * Get user's bookings
 * @param {Object} params - Query parameters
 * @param {number} params.page - Page number (default: 1)
 * @param {number} params.limit - Items per page (default: 10)
 * @returns {Promise} - Axios response
 */
export const getMyBookings = async (params = { page: 1, limit: 10 }) => {
  return servicesAxiosInstance.get("/bookings/my-bookings", { params });
};

/**
 * Get already booked dates for a property
 * @param {string} propertyId - Property ID
 * @param {Object} dateRange - Date range
 * @param {string} dateRange.startDate - Start date (YYYY-MM-DD)
 * @param {string} dateRange.endDate - End date (YYYY-MM-DD)
 * @returns {Promise} - Axios response
 */
export const getAlreadyBookedDates = async (propertyId, dateRange) => {
  return servicesAxiosInstance.get(
    `/bookings/already-booked-dates/${propertyId}`,
    { params: dateRange }
  );
};

/**
 * Cancel a booking
 * Note: This endpoint is not in your docs, but typically exists
 * @param {string} bookingId - Booking ID
 * @returns {Promise} - Axios response
 */
export const cancelBooking = async (bookingId) => {
  return servicesAxiosInstance.put(`/bookings/${bookingId}/cancel`);
};

/**
 * Get booking details by ID
 * Note: This endpoint is not in your docs, but typically exists
 * @param {string} bookingId - Booking ID
 * @returns {Promise} - Axios response
 */
export const getBookingDetails = async (bookingId) => {
  return servicesAxiosInstance.get(`/bookings/${bookingId}`);
};

export default {
  // Booking operations
  createBooking,
  handlePaymentSuccess,
  handlePaymentFailure,
  getMyBookings,
  getAlreadyBookedDates,
  
  // Optional endpoints (not in your docs but typically needed)
  cancelBooking,
  getBookingDetails,
};