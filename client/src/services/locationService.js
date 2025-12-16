import { servicesAxiosInstance } from "./config";

/**
 * Location Services
 */

/**
 * Get popular locations
 * @returns {Promise} - Axios response with popular locations
 */
export const getPopularLocations = async () => {
  return servicesAxiosInstance.get("/locations/popular");
};

/**
 * Search locations by query
 * @param {string} query - Search query (e.g., "delhi", "goa", "paris")
 * @returns {Promise} - Axios response with search results
 */
export const searchLocations = async (query) => {
  return servicesAxiosInstance.get("/locations/search", {
    params: { query }
  });
};

/**
 * Get location details by ID (if available in your API)
 * @param {string} locationId - Location ID
 * @returns {Promise} - Axios response with location details
 */
export const getLocationDetails = async (locationId) => {
  return servicesAxiosInstance.get(`/locations/${locationId}`);
};

export default {
  getPopularLocations,
  searchLocations,
  getLocationDetails,
};