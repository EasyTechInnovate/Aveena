import { servicesAxiosInstance } from "./config";

/**
 * Property Services
 */

/**
 * Get properties with search filters and sorting
 * @param {Object} params - Search parameters
 * @param {string} params.whereTo - Location/Destination
 * @param {string} params.checkIn - Check-in date (YYYY-MM-DD)
 * @param {string} params.checkOut - Check-out date (YYYY-MM-DD)
 * @param {number} params.adults - Number of adults
 * @param {number} params.childrens - Number of children
 * @param {number} params.rooms - Number of rooms
 * @param {number} params.page - Page number
 * @param {number} params.limit - Items per page
 * @param {string} params.sortBy - Sorting option (price_low_to_high, price_high_to_low, recommended)
 * @param {string} params.search - Search by property name
 * @returns {Promise} - Axios response with properties
 */
export const getProperties = async (params = {}) => {
  return servicesAxiosInstance.get("/properties", {
    params: {
      page: 1,
      limit: 10,
      ...params
    }
  });
};

/**
 * Get random properties for recommendations
 * @param {Object} params - Query parameters
 * @param {number} params.limit - Number of properties to return (default: 5)
 * @returns {Promise} - Axios response with random properties
 */
export const getRandomProperties = async (params = { limit: 5 }) => {
  return servicesAxiosInstance.get("/properties/random", { params });
};

/**
 * Get property details by ID
 * @param {string} propertyId - Property ID
 * @returns {Promise} - Axios response with property details
 */
export const getPropertyById = async (propertyId) => {
  return servicesAxiosInstance.get(`/properties/${propertyId}`);
};

/**
 * Get filtered properties based on advanced filters
 * @param {Object} params - All search parameters
 * @param {Object} filters - Additional filters
 * @returns {Promise} - Axios response with filtered properties
 */
export const getFilteredProperties = async (params, filters = {}) => {
  const queryParams = {
    ...params,
    ...filters
  };
  
  return servicesAxiosInstance.get("/properties", {
    params: queryParams
  });
};

export default {
  getProperties,
  getRandomProperties,
  getPropertyById,
  getFilteredProperties
};