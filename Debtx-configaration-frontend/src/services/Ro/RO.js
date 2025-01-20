import axios from "axios"

const BASE_URL = import.meta.env.VITE_BASE_URL;
const URL = `${BASE_URL}/recovery_officer`;

export const SuspendRO = async (roId,remark) => {
    try {
        const response = await axios.patch(`${URL}/Suspend_RO`,{
            ro_id:roId,
            ro_remark:remark
        });

        if (response.data.status === 'success') {
            return response.data;
        }
        else{
            console.error(response.data.message);
            throw new Error(response.data.message);
        }
    } catch (error) {
        console.error("Error suspending Ro:", error.message);
        throw error;
    }
};

export const GetRODetailsByID = async (roId) => {
    try {
        const response = await axios.post(`${URL}/RO_Details_By_ID`,{
            ro_id:roId
        });

        if (response.data.status === 'success') {
            return response.data;
        }
        else{
            console.error(response.data.message);
            throw new Error(response.data.message);
        }
    } catch (error) {
        console.error("Error Geting details of Ro:", error.message);
        throw error;
    }
};


export const fetchRODataByDRC = async (drc_id) => {
    try {
        const response = await axios.post(`${URL}/List_RO_Owned_By_DRC`, {
            drc_id,
        });

        // Ensure the data aligns with the updated backend response structure
        return response.data?.data || [];
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching RO data');
    }
};


export const fetchRODetails = async () => {
    try {
        const response = await axios.get(`${URL}/RO_Details`);

        // Ensure the data aligns with the updated backend response structure
        return response.data?.data || [];
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching Recovery Officer details');
    }
};



// export const fetchRODataByID = async (roId) => {
//     const response = await fetch("http://localhost:5000/api/recovery_officer/RO_Details_By_ID", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ ro_id: roId }),
//     });
//     return response.json();
// };



export const fetchRODataByID = async (roId) => {
    try {
      const response = await fetch(
        `${URL}/RO_Details_By_ID`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ro_id: roId }),
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      if (!data || !data.data) {
        throw new Error("Invalid response structure");
      }
  
      return data; // Return full response to handle `data.data` in the calling function
    } catch (error) {
      console.error("Error fetching recovery officer details:", error);
      throw error; // Rethrow for the calling function to handle
    }
  };
  
  
  
// export const editRecoveryOfficer = async (data) => {
//     const response = await fetch("http://localhost:5000/api/recovery_officer/Change_RO_profile", {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });
//     return response.json();
// };


export const editRecoveryOfficer = async (data) => {
    try {
      const response = await fetch(
        `${URL}/Change_RO_profile`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const responseData = await response.json();
      if (!responseData || !responseData.message) {
        throw new Error("Invalid response structure");
      }
  
      return responseData;
    } catch (error) {
      console.error("Error editing recovery officer:", error);
      throw error;
    }
  };
  
  

  export const ChangeRoStatus = async (rodetails) => {
    try {
        const response = await axios.patch(`${URL}/Change_RO_Status`,{
            ro_id:rodetails.roId,
            ro_status:rodetails.ro_status
        });

        if (response.data.status === 'success') {
            return response.data;
        }
        else{
            console.error(response.data.message);
            throw new Error(response.data.message);
        }
    } catch (error) {
        console.error("Error suspending Ro:", error.message);
        throw error;
    }
};

// Register Recovery Officer
export const registerRecoveryOfficer = async (data) => {
    try {
      const response = await axios.post(
        `${URL}/Register_RO`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error in RegisterRO:", error.response?.data || error.message);
      throw error.response?.data || new Error("An error occurred while registering the Recovery Officer.");
    }
  };


export const List_CasesOwened_By_DRC = async (drc_id) => {
  try {
      const response = await axios.post(`${URL}/List_CasesOwened_By_DRC`,{
        drc_id,
      });

      if (response.data.status === 'success') {
        // console.log(response.data.data)
        return response.data;
      }
      else{
          // console.error(response.data.message);
          throw new Error(response.data.message);
      }
  } catch (error) {
      console.error("Error Geting details of Ro:", error.message);
      throw error;
  }
};

  // export const List_CasesOwned_By_DRC = async (drc_id) => {
  //   if (!drc_id) {
  //     throw new Error('drc ID is required');
  //   }
  
  //   try {
  //     console.log('Fetching case details for case:', drc_id);
  //     const response = await axios.post(
  //       `${URL}/List_CasesOwned_By_DRC`,
  //       { drc_id },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //         }
  //       }
  //     );
  
  //     if (response.data && response.status === 200) {
  //       return response.data;
  //     }
  
  //     throw new Error(response.data?.message || 'Failed to fetch DRC details');
      
  //   } catch (error) {
  //     console.error("Error in getDRCDetailsByCaseId:", error);
      
  //     if (error.response?.status === 400) {
  //       throw new Error('Invalid case ID or case not found');
  //     }
      
  //     throw new Error(
  //       error.response?.data?.message || 
  //       error.message || 
  //       'An error occurred while fetching DRC details'
  //     );
  //   }
  // };