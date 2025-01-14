import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const URL = `${BASE_URL}/case`;

export const getDRCDetailsByCaseId = async (case_id) => {
  if (!case_id) {
    throw new Error('Case ID is required');
  }

  try {
    console.log('Fetching DRC details for case:', case_id);
    const response = await axios.post(
      `${URL}/getDRCDetailsByCaseId`,
      { case_id },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    if (response.data && response.status === 200) {
      return response.data;
    }

    throw new Error(response.data?.message || 'Failed to fetch DRC details');
    
  } catch (error) {
    console.error("Error in getDRCDetailsByCaseId:", error);
    
    if (error.response?.status === 400) {
      throw new Error('Invalid case ID or case not found');
    }
    
    throw new Error(
      error.response?.data?.message || 
      error.message || 
      'An error occurred while fetching DRC details'
    );
  }
};

// import axios from "axios";

// const BASE_URL = import.meta.env.VITE_BASE_URL;
// const URL = `${BASE_URL}/case`;


// export const getDRCDetailsByCaseId = async (case_id) => {
//   try {
//     const response = await axios.post(`${URL}/getDRCDetailsByCaseId`, {
//       case_id,
//     });

//     if (response.data.status === "success") {
//       return response.data;
//     } else {
//       throw new Error(response.data.message);
//     }
//   } catch (error) {
//     console.error("Error fetching DRC details:", error.message);
//     throw error;
//   }
// };

// services/Case/Cases.js
// import axios from "axios";

// const BASE_URL = import.meta.env.VITE_BASE_URL;
// const URL = `${BASE_URL}/case`;

// export const getDRCDetailsByCaseId = async (case_id) => {
//   try {
//     console.log('Fetching DRC details for case:', case_id);
//     const response = await axios.post(`${URL}/getDRCDetailsByCaseId`, {
//       case_id: case_id
//     }, {
//       headers: {
//         'Content-Type': 'application/json',
//         // Add any auth headers if needed
//         // 'Authorization': `Bearer ${token}`
//       }
//     });

//     console.log('API Response:', response.data);

//     if (response.data.status === "success") {
//       return response.data;
//     } else {
//       throw new Error(response.data.message || 'Failed to fetch DRC details');
//     }
//   } catch (error) {
//     console.error("Error in getDRCDetailsByCaseId:", error.response || error);
//     throw new Error(
//       error.response?.data?.message || 
//       error.message || 
//       'An error occurred while fetching DRC details'
//     );
//   }
// };