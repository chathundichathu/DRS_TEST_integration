import axios from "axios"

const BASE_URL = import.meta.env.VITE_BASE_URL;
const URL = `${BASE_URL}/DRC_service`;



/**
 * Register a DRC with associated services.
 * @param {Object} drcData - The DRC data including services.
 * @returns {Promise<Object>} - The API response.
 */
export const registerDRCWithServices = async (drcData) => {
  try {
    const response = await axios.post(`${URL}/Register_DRC_with_Services`, drcData);
    return response.data;
  } catch (error) {
    console.error("Error registering DRC with services:", error.message);
    throw error;
  }
};
export const assignServiceToDrc = async (drcId, serviceId) => {
    try {
      const response = await axios.post(`${URL}/Service_to_DRC`, {
        DRC_ID: drcId,
        Service_ID: serviceId,
      });
      return response.data;
    } catch (error) {
      console.error("Error assigning service to DRC:", error.message);
      throw error;
    }
  };

  export const manageDrcDetails = async (payload) => {
    try {
      const response = await axios.post(`${URL}/manageDRC`, payload);
      return response.data;
    } catch (error) {
      console.error("Error managing DRC details:", error);
      throw error;
    }
  };