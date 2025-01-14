import axios from "axios"

const BASE_URL = import.meta.env.VITE_BASE_URL;
const URL = `${BASE_URL}/Service`;

  
export const getAllServices = async () => {
    try {
        const response = await axios.get(`${URL}/Service_Details`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
};




export const getActiveServiceDetails = async () => {
    try {
      const response = await axios.get(`${URL}/Active_Service_Details`);
      return response.data.data; // Returns the list of active service types
    } catch (error) {
      console.error("Error fetching active services:", error.message);
      throw error;
    }
  };

export const changeServiceStatus = async (serviceId, serviceStatus) => {
    try {
      const response = await axios.patch(`${URL}/Change_Service_Status`, {
        service_id: serviceId,
        service_status: serviceStatus,
      });
      return response.data;
    } catch (error) {
      console.error("Error changing service status:", error.message);
      throw error;
    }
  };