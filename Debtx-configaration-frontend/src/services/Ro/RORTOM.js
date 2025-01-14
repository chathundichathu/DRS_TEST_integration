import axios from "axios"

const BASE_URL = import.meta.env.VITE_BASE_URL;
const URL = `${BASE_URL}/recovery_officer`;

export const IssueRtomToRO = async (roId,rtomId) => {
    try{
        const response = await axios.post(`${URL}/Issue_RTOM_To_RO`,{
            ro_id:roId,
            rtom_id:rtomId
        });
        if(response.data.status === "success"){
            return response.data;
        }
        else{
            console.error(response.data.message);
            throw new Error(response.data.message);
        }
    }catch(error){
        console.error("Adding RTOM to RO : ", error.message);
        throw error;
    }
}

export const SuspendRtomFromRo = async (roId, rtomId) =>{
    try {
        const response = await axios.post(`${URL}/Suspend_RTOM_From_RO`,{
            ro_id:roId,
            rtom_id:rtomId
        });
        if (response.data.status === "success") {
            return response.data;
        }else{
            console.log("Suspending Rtom from Ro ", response.data.message);
            throw new Error(response.data.message);
        }
    } catch (error) {
        console.error("Suspending RTOm from RO ", error.message);
        throw error;
    }
}

export const ListAllRtomOwnedByRo = async (roId) => {
    try {
        const response =  await axios.post(`${URL}/List_All_RTOM_Ownned_By_RO`,{
            ro_id:roId
        });
        if (response.data.status=== "success") {
            return response.data;
        }else{
            console.log('Get list of Rtoms od the RO', response.data.message);
            throw new Error(response.data.message);
        }
    } catch (error) {
        console.error("Getting Rtoms of Ro ", error.message);
        throw error;
    }
}

export const ListActiveRtomOwnedByRo = async (roId) => {
    try {
        const response = await axios.post(`${URL}/List_Active_RTOM_Ownned_By_RO`,{
            ro_id:roId
        });
        if (response.data.status==="success") {
            return response.data;
        } else {
            console.log("Get Active Rtom for Ro :",response.data.nessage);
            throw new Error(response.data.message);
        }
    } catch (error) {
        console.error("Getting Active Rtom for Ro ",error.message);
        throw error;
    }
}
