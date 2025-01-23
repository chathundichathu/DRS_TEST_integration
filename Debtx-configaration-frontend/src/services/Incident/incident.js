import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const URL = `${BASE_URL}/incident`;

export const getIncidentDetailsByCaseID = async (case_id) => {
    if(!case_id){
        throw new Error ("case id is required");
    }
    try{
        console.log("Fetching incident details for case:", case_id);
        const response = await axios.post(
            `${URL}/getIncidentDetailsByCaseId`,
            {case_id},
            {
                headers:{
                    "Content-Type": "application/json",
                }
            }
        );
        if(response.data && response.status === 200){
            return response.data;
        }
        throw new Error(response.data?.message || "Failed to fetch incident details");
        
    } catch (error){
        console.error("Error in getIncidentDetailsByCaseId:", error);
        if (error.response?.status === 400){
            throw new Error("invalid case id or case not found");
        }
        throw new Error(
            error.response?.data?.message || 
            error.message ||
            'An eror occurred while fetching incident details'
        );
    }
};