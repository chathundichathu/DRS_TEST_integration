
/* 
    Purpose: This template is used for the Case Controllers.
    Created Date: 2025-01-08
    Created By:  Naduni Rabel (rabelnaduni2000@gmail.com)
    Last Modified Date: 2025-01-08
    Modified By: Naduni Rabel (rabelnaduni2000@gmail.com)
    Version: Node.js v20.11.1
    Dependencies: axios , mongoose
    Related Files: Case_route.js
    Notes:  
*/


import db from "../config/db.js";
import Case_details from "../models/Service.js";
import CaseDetails from "../models/Case_details.js";




export const drcExtendValidityPeriod = async (req, res) => {}



export const getDRCDetailsByCaseId = async (req, res) => {
  try {
    const { case_id } = req.body;

    if (!case_id) {
      return res.status(400).json({
        status: "error",
        message: "Case ID is required",
        errors: {
          code: 400,
          description: "Case ID must be provided in the request body.",
        },
      });
    }

    // Find case details and select all fields except timestamps
    const caseDetails = await CaseDetails.findOne(
      { case_id: case_id },
   
    );

    if (!caseDetails) {
      return res.status(404).json({
        status: "error",
        message: "Case not found",
        errors: {
          code: 404,
          description: `No case found with the provided Case ID: ${case_id}`,
        },
      });
    }

    // Prepare response data - drc array is separated from other case details
    const { drc, ...caseData } = caseDetails.toObject();

    const responseData = {
      case_details: caseData,
      drc_details: drc || []
    };

    // Check if DRC details exist
    if (!drc || drc.length === 0) {
      return res.status(200).json({
        status: "success",
        message: "Case details retrieved successfully. No DRC details found.",
        data: responseData
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Case and DRC details retrieved successfully",
      data: responseData
    });

  } catch (err) {
    console.error("Error fetching case and DRC details:", err.message);
    return res.status(500).json({
      status: "error",
      message: "Failed to retrieve case and DRC details",
      errors: {
        code: 500,
        description: "Internal server error occurred while fetching case and DRC details.",
      },
    });
  }
};




// export const getDRCDetailsByCaseId = async (req, res) => {
//     try {
//       const { case_id } = req.body;
  
//       // Vadate `case_id`
//       if (!case_id) {
//         return res.status(400).json({
//           status: "error",
//           message: "Case ID is required to retrieve DRC details.",
//           errors: {
//             code: 400,
//             description: "The `case_id` parameter is missing in the request body.",
//           },
//         });
//       }
  
//       // Fetch DRC details for the given `case_id`
//       const caseDetails = await CaseDetails.findOne({ "case_details.case_id": case_id });
  
//       // Check if the case exists
//       if (!caseDetails) {
//         return res.status(404).json({
//           status: "error",
//           message: `No case found for the provided Case ID: ${case_id}`,
//         });
//       }
  
//       // Check if `drc` exists within the case
//       const drcDetails = caseDetails.drc; // Assuming `drc` is a field in the `caseDetails` document
//       if (!drcDetails) {
//         return res.status(404).json({
//           status: "error",
//           message: `No DRC data available for the provided Case ID: ${case_id}`,
//         });
//       }
  
//       // Return the DRC details successfully
//       return res.status(200).json({
//         status: "success",
//         message: "DRC details retrieved successfully.",
//         data: drcDetails,
//       });
//     } catch (err) {
//       // Log the error for debugging
//       console.error("Error fetching DRC data:", err);
  
//       // Return 500 Internal Server Error response
//       return res.status(500).json({
//         status: "error",
//         message: "Failed to retrieve DRC details.",
//         errors: {
//           code: 500,
//           description: "An internal server error occurred while fetching DRC details.",
//         },
//       });
//     }
//   };


// Get the case details by using case Id

// export const getCaseDetailsByCaseId = async (req, res) => {
//   try {
//     const {case_id} =req.body;
//     if(!case_id){
//       return res.status (400).json({
//         status : " error",
//         message: "unable to retrieve case details",
//         errors: {
//           code: 400,
//           description: "Case ID not found.",
//         },
//       });
//     } 
//     const cases = await CaseDetails.findOne({ case_id: case_id });
//     if(!cases){
//       return res.status (404).json({
//         status:"error",
//         message:"Case not Found",
//         errors:{
//           code:404,
//           description:"Case with the given ID not found."
//         },
//       })
//     }
//     return res.status (200).json({
//       status:"success",
//       message:"Case details retrived successfully",
//       data:cases,
//     })

//   }catch (error) {
//     return res.status (500).json ({
//       status : "error",
//       message : "Internal server error occurred while fetching case details.",
//       error : error.message
//     })
//   }

// }