import moment from "moment";
import db from "../config/db.js";
import mongoose from "mongoose";
import Incident_log from "../models/Incident_log.js";
import Task from "../models/Task.js";
import FileUploadLog from "../models/file_upload_log.js";
import fs from "fs";
import path from "path";
import { Request_Incident_External_information } from "../services/IncidentService.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import Incident from '../models/Incident.js'; 
import CaseDetails from "../models/Case_details.js";

// Define __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export const Create_Incident = async (req, res) => {
  const { Account_Num, DRC_Action, Monitor_Months, Created_By } = req.body;

  try {
    // Validate required fields
    if (!Account_Num || !DRC_Action || !Monitor_Months || !Created_By) {
      return res.status(400).json({
        status: "error",
        message: "All fields are required.",
      });
    }

    // Validate Account_Num length
    if (Account_Num.length > 10) {
      return res.status(400).json({
        status: "error",
        message: "Account number must be 10 characters or fewer.",
      });
    }
    // Validate Actions against enum values
    const validActions = ["collect arrears", "collect arrears and CPE", "collect CPE"];
    if (!validActions.includes(DRC_Action)) {
      return res.status(400).json({
        status: "error",
        message: `Invalid action. Allowed values are: ${validActions.join(", ")}.`,
      });
    }

    // // Check if an active case exists for the Account_Num
    // const activeCase = await Incident_log.findOne({
    //   Account_Num,
    //   Actions: "Active", // Assuming this checks for active cases
    // });

    // if (activeCase) {
    //   return res.status(400).json({
    //     status: "error",
    //     message: "An active case already exists for the provided account number.",
    //   });
    // }
    // Set default Monitor_Months if not provided
    if (!Monitor_Months) {
      Monitor_Months = 3;
    }

    // Validate Monitor_Months range
    if (Monitor_Months < 1 || Monitor_Months > 3) {
      return res.status(400).json({
        status: "error",
        message: "Monitor_Months must be between 1 and 3.",
      });
    }
    // Generate a new Incident_Id
    const mongoConnection = await mongoose.connection;
    const counterResult = await mongoConnection.collection("counters").findOneAndUpdate(
      { _id: "incident_id" },
      { $inc: { seq: 1 } },
      { returnDocument: "after", upsert: true }
    );

    const Incident_Id = counterResult.seq;

    // Insert values into Incident_log
    const newIncident = new Incident_log({
      Incident_Id,
      Account_Num,
      Actions: DRC_Action,
      Monitor_Months, // Add Monitor_Months
      Created_By,
      Created_Dtm: moment().toDate(),
    });

    await newIncident.save();

    // Call external API: Request_Incident_External_information
    try {
      await Request_Incident_External_information({ Account_Num, Monitor_Months });
    } catch (apiError) {
      console.error("Error calling external API:", apiError.message);
      return res.status(500).json({
        status: "error",
        message: "Failed to request external incident information.",
      });
    }

    // Create task: "Extract data from data lake" (Template_Task_Id: 9)
    const mongo = await db.connectMongoDB();
    const TaskCounter = await mongo.collection("counters").findOneAndUpdate(
      { _id: "task_id" }, // Counter ID for task generation
      { $inc: { seq: 1 } }, // Increment the sequence
      { returnDocument: "after", upsert: true }
    );

    const Task_Id = TaskCounter.seq; // Get the generated Task_Id

    const taskData = {
      Task_Id, // Unique Task_Id
      Template_Task_Id: 9, // ID for "Extract data from data lake"
      parameters: {
        Incident_Id: Incident_Id.toString(), // Store values as strings for Map type
        Account_Num: Account_Num,
      },
      Created_By, // The user who initiated the task
      Execute_By: "SYS", // Default to null
      Sys_Alert_ID: null,
      Interaction_ID_Success: null,
      Interaction_ID_Error: null,
      Task_Id_Error: null,
      created_dtm: new Date(), // Current timestamp
      end_dtm: null, // Default to null
    };

    // Insert task into the database
    await Task.create(taskData);

    return res.status(201).json({
      status: "success",
      message: "Incident created successfully.",
      data: {
        Incident_Id,
        Account_Num,
        DRC_Action,
        Monitor_Months, // Include in the response
        Created_By,
        Created_Dtm: newIncident.Created_Dtm,
      },
    });
  } catch (error) {
    console.error("Unexpected error during incident creation:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to create incident.",
      errors: {
        exception: error.message,
      },
    });
  }
};





export const Upload_DRS_File = async (req, res) => {
  const { File_Name, File_Type, File_Content, Created_By } = req.body;

  try {
    // Validate required fields
    if (!File_Name || !File_Type || !File_Content || !Created_By) {
      return res.status(400).json({
        status: "error",
        message: "All fields are required.",
      });
    }

    // Validate File_Type against allowed values
    const validFileTypes = [
      "Incident Creation",
      "Incident Reject",
      "Distribute to DRC",
      "Validity Period Extend",
      "Hold",
      "Discard",
    ];

    if (!validFileTypes.includes(File_Type)) {
      return res.status(400).json({
        status: "error",
        message: `Invalid File Type. Allowed values are: ${validFileTypes.join(", ")}.`,
      });
    }

    // Generate a unique File_Id
    const mongoConnection = await db.connectMongoDB();
    const counterResult = await mongoConnection.collection("counters").findOneAndUpdate(
      { _id: "file_id" },
      { $inc: { seq: 1 } },
      { returnDocument: "after", upsert: true }
    );

    const File_Id = counterResult.seq;
    // Ensure the uploads directory exists
    const uploadDir = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }


    // Upload file to the server
    const uploadPath = path.join(__dirname, "../uploads", File_Name);
    fs.writeFileSync(uploadPath, File_Content, "utf8");

    // Insert into file_upload_log table
    const newFileLog = new FileUploadLog({
      File_Id,
      File_Name,
      File_Type,
      Uploaded_By: Created_By,
      Uploaded_Dtm: moment().toDate(),
      File_Path: uploadPath,
    });

    await newFileLog.save();

    // Create Task: "Extract Incident from File" (Template_Task_Id: 1)
    const taskCounter = await mongoConnection.collection("counters").findOneAndUpdate(
      { _id: "task_id" },
      { $inc: { seq: 1 } },
      { returnDocument: "after", upsert: true }
    );

    const Task_Id = taskCounter.seq;

    const taskData = {
      Task_Id,
      Template_Task_Id: 1,
      parameters: {
        File_Id: File_Id.toString(),
        File_Name,
        File_Type,
      },
      Created_By,
      Execute_By: null,
      Sys_Alert_ID: null,
      Interaction_ID_Success: null,
      Interaction_ID_Error: null,
      Task_Id_Error: null,
      created_dtm: new Date(),
      end_dtm: null,
      status: "pending",
      status_changed_dtm: null,
      status_description: "",
    };

    // Insert task into the System_tasks table
    await Task.create(taskData);

    return res.status(201).json({
      status: "success",
      message: "File uploaded successfully, and task created.",
      data: {
        File_Id,
        Task_Id,
        File_Name,
        File_Type,
        Created_By,
        Uploaded_Dtm: newFileLog.Uploaded_Dtm,
      },
    });
  } catch (error) {
    console.error("Error during file upload and task creation:", error.message);
    return res.status(500).json({
      status: "error",
      message: "Failed to upload file and create task.",
      errors: {
        exception: error.message,
      },
    });
  }
};


// controllers/IncidentController.js
export const listIncident = async (req, res) => {
  try {
      const { page = 1, limit = 10 } = req.query;
      const incidents = await Incident.find()
          .skip((page - 1) * limit)
          .limit(parseInt(limit));

      res.status(200).json({
          success: true,
          data: incidents,
      });
  } catch (error) {
      console.error('Error fetching incident:', error);
      res.status(500).json({ success: false, message: 'Error fetching incident.' });
  }
};



export const getIncidentDetailsByCaseID = async (req, res) => {
  const { case_id } = req.body;
  
  try {
      // Validate if case_id is provided
      if (!case_id) {
          return res.status(400).json({
              status: "error",
              message: "Case ID is required.",
              errors: {
                  code: 400,
                  description: "Please provide a valid Case ID in the request body.",
              }
          });
      }

      // Step 1: Find the case record and get the incident_id
      const caseDetails = await CaseDetails.findOne({
          case_id: { $in: [case_id, case_id.toString(), Number(case_id)] }
      });

      if (!caseDetails) {
          return res.status(404).json({
              status: "error",
              message: `No case found for the provided ID: ${case_id}.`,
              errors: {
                  code: 404,
                  description: "The case record does not exist in the database.",
              }
          });
      }

      const incident_id = caseDetails.incident_id;

      // Step 2: Find the incident details with specific field selection
      const incidentDetails = await Incident.findOne(
          { Incident_Id: { $in: [incident_id, incident_id.toString(), Number(incident_id)] } },
          // {
          //     Incident_Id: 1,
          //     Account_Num: 1,
          //     Arrears: 1,
          //     Created_By: 1,
          //     Created_Dtm: 1,
          //     Incident_Status: 1,
          //     'Contact_Details.Contact_Type': 1,
          //     'Customer_Details.Customer_Name': 1,
          //     'Account_Details.Account_Status': 1,
          //     _id: 0 // Exclude the _id field
          // }
      );

      if (!incidentDetails) {
          return res.status(404).json({
              status: "error",
              message: `No incident found for the incident ID: ${incident_id}.`,
              errors: {
                  code: 404,
                  description: "The incident record does not exist in the database.",
              }
          });
      }

      return res.status(200).json({
          status: "success",
          message: `Incident details for Incident Id : ${incident_id} of Case Id : ${case_id}`,
          data: incidentDetails,
      });

  } catch (error) {
      console.error("Error retrieving incident details:", error);
      return res.status(500).json({
          status: "error",
          message: "Failed to retrieve incident details.",
          error: error.message,
          errors: {
              code: 500,
              description: error.message || "Internal server error occurred while retrieving incident details.",
          }
      });
  }
};