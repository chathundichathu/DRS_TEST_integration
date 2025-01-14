
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
        message: "Case id not fund",
        errors: {
          code: 400,
          description: "caseid with the given ID not found.",
        },
      });
    }
    const caseDetails = await CaseDetails.findOne({ case_id: case_id }).select("drc");
    if (!caseDetails) {
      return res.status(404).json({
        status: "error",
        message: "Case not found.",
        errors: {
          code: 404,
          description: "No case found with the provided Caseid",
        },
      });
    }

    if (!caseDetails.drc) {
      return res.status(404).json({
        status: "error",
        message: "DRC details not found.",
        errors: {
          code: 404,
          description: `No DRC data available for the provided Case ID: ${case_id}.`,
        },
      });
    }

    // Return the DRC details
    return res.status(200).json({
      status: "success",
      message: "DRC details retrieved successfully.",
      data: caseDetails.drc,
    });
  } catch (err) {
    // Log the error for debugging
    console.error("Error fetching DRC data:", err.message);

    // Return 500 Internal Server Error response
    return res.status(500).json({
      status: "error",
      message: "Failed to retrieve DRC details.",
      errors: {
        code: 500,
        description: "internal server error occurred while fetching DRC details.",
      },
    });
  }
};




// export const getDRCDetailsByCaseId = async (req, res) => {
//     try {
//       const { case_id } = req.body;
  
//       // Validate `case_id`
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