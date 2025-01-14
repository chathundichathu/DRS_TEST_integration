import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

// Define the schema for remark
const remarkSchema = new Schema({
  remark: { type: String, required: true },
  remark_added_by: { type: String, required: true },
  remark_added_date: { type: Date, required: true }
}, { _id: false });

// Define the schema for approval
const approvalSchema = new Schema({
  approved_by: { type: String, default: null },
  approved_dtm: { type: Date, required: true },
  approved_process: { type: String, default: null }
}, { _id: false });

// Define the schema for case status
const caseStatusSchema = new Schema({
  drc_name: { type: String, required: true },
  status: { type: String, default: null },
  status_dtm: { type: Date, required: true }
}, { _id: false });

// Define the schema for DRC
const drcSchema = new Schema({
  drc_id: { type: Number, required: true },
  drc_name: { type: String, required: true },
  order_id: { type: Number, required: true },
  created_dtm: { type: Date, required: true },
  case_removal_remark: { type: String, required: true },
  removed_by: { type: String, required: true },
  removed_dtm: { type: Date, required: true },
  case_transfer_dtm: { type: Date, required: true },
  transferred_by: { type: String, required: true },
  expire_dtm: { type: Date, required: true }
}, { _id: false });

// Define the main case details schema
const caseDetailsSchema = new Schema({
  case_id: { type: Number, required: true },
  incident_id: { type: Number, required: true },
  account_no: { type: Number, required: true },
  customer_ref: { type: String, required: true },
  created_dtm: { type: Date, required: true },
  area: { type: String, required: true },
  rtom: { type: String, required: true },
  arrears_amount: { type: Number, required: true },
  action_type: { type: String, required: true },
  last_payment_date: { type: Date, required: true },
  days_count: { type: Number, required: true },
  last_bss_reading_date: { type: Date, required: true },
  commission: { type: Number, required: true },
  case_current_status: { type: String, required: true },
  remark: [remarkSchema],
  approve: [approvalSchema],
  case_status: [caseStatusSchema],
  drc: [drcSchema]
},
{
    collection: 'Case_details', 
    timestamps: true,
}
);

// Create the model from the schema
const CaseDetails = model('CaseDetails', caseDetailsSchema);

export default CaseDetails;
