import axios  from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const URL = `${BASE_URL}/service`;

export const RegisterServiceType = async (serviceType) => {
    try {
        const response = await axios.post(`${URL}/Register_Service_Type`,{
            service_type:serviceType
        })
        if (response.data.status ==="success") {
            return response.data;
        } else {
            console.error("Registering service type : ", response.data.message);
            throw new Error(response.data.message);
        }
    } catch (error) {
        console.error("Error Registering service type : ", error.message);
        throw error;
    }
}