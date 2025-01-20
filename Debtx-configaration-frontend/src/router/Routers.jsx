import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import PrototypeA from "../assets/prototype/prototypeA";
import PrototypeB from "../assets/prototype/prototypeB";
import Individual from "../pages/incident/register/Individual";
import Bulk from "../pages/incident/register/Bulk";
import IncidentLog from "../pages/incident/log/IncidentLog";
import RejectIncidents from "../pages/incident/log/RejectIncidents";
import RejectLog from "../pages/incident/log/RejectLog";
import MediationBoard from "../pages/drc/MediationBoard";
import PeriodExtensionApproval from "../pages/drc/PeriodExtensionApproval";
import DRCLog from "../pages/drc/DrcLog";
import AssignedDRCLog from "../pages/drc/AssignedDRCLog";
import ReAssignDRC from "../pages/drc/ReAssignDRC";
import AssignDRC from "../pages/drc/AssignDRC";
import DRCApproval from "../pages/drc/DRCApproval";
import Pending from "../pages/drc/Pending";
import MediationBoardSendingRequests from "../pages/drc/MediationBoardSendingRequest";
import MediationBoardAccept from "../pages/drc/MediationBoardAccept";
import MediationBoardResponseLog from "../pages/drc/MediationBoardResponseLog";
import Logs from "../pages/drc/logs";

import FtlLodList from "../pages/lod/ftl_lod/ftl_lod/List";
import FtlLodLog from "../pages/lod/ftl_lod/ftl_lod_log/FltLodLog";
import Litigation from "../pages/lod/ftl_lod/litigation/Litigation";
import LitigationLog from "../pages/lod/ftl_lod/litigation/LitigationLog";
import PostLitigationLog from "../pages/lod/ftl_lod/litigation/PostLitigationLog";
import LitigationSubmission from "../pages/lod/ftl_lod/litigation/LitigationSubmission";
import LitigationPage from "../pages/lod/ftl_lod/litigation/LitigationPage";
import LODLog from "../pages/lod/digital_signature_lod/lod/LodLog";
import FinalReminderLog from "../pages/lod/digital_signature_lod/final_reminder/FRLog";
import ListLOdSubmission from "../pages/lod/ftl_lod/ftl_lod/list/ListOfLodSubmission";
import ListLOdSubmitedCases from "../pages/lod/ftl_lod/ftl_lod/list/ListOfSubmittedCases";
import Adjustments from "../pages/settlement/monitor_settlement/Adjusments";
// import IncidentDetails from "../pages/incident/log/details";
import IncidentFileDownload from "../pages/incident/log/file-download";
import IncidentUploadLog from "../pages/incident/log/upload-log";
import CaseDetails from "../pages/incident/log/CaseDetails";
import CaseList from "../pages/incident/log/CaseList";
import Welcome from "../pages/incident/log/WelcomePage";
import OpenPendingCases from "../pages/incident/log/OpenPendingCases";
import LODPreview from "../pages/lod/ftl_lod/ftl_lod/PreviewOfFtlLod";
import DownloadLOD from "../pages/lod/ftl_lod/ftl_lod/DownloadCreateFtlLod";
import CR_Update_LOD from "../pages/lod/digital_signature_lod/lod/CR_Update_LOD";
import CR_Update from "../pages/lod/digital_signature_lod/lod/CR_Update";
import CR_Update_FR from "../pages/lod/digital_signature_lod/lod/CR_Update(FR)";
import Dispute_Log from "../pages/lod/digital_signature_lod/dispute/Dispute_Log";
import Dispute_Submission from "../pages/lod/digital_signature_lod/dispute/Dispute_Submission";
import F2 from "../pages/lod/digital_signature_lod/F2";
import FR_Creation from "../pages/lod/digital_signature_lod/final_reminder/FR_Creation";
import LOD_Creation from "../pages/lod/digital_signature_lod/lod/LOD_Creation";
import Post_Dispute_Log from "../pages/lod/digital_signature_lod/dispute/Post_Dispute_Log";
import Sup_FR_Log from "../pages/lod/digital_signature_lod/final_reminder/Sup_FR_Log";
import Sup_LOD_Log from "../pages/lod/digital_signature_lod/lod/Sup_LOD_Log";
import DirectLOD from "../pages/incident/log/DirectLOD";
import DRCcaseList from "../pages/drc/DRCcaseList";




//DRC OWNED

import AssignedCaseListforDRC from "../pages/DRC_Owned/Assigned case list for DRC";
import CaseDetailsView from "../pages/DRC_Owned/cases_details"; 



// config
import Config from "../pages/config/Config";
import RegDrc from "../pages/drc/RegDrc";
import EditDRC from "../pages/drc/EditDRC";
import DrcList from "../pages/drc/DrcList";
import DrcInfo from "../pages/drc/DrcInfo";
import DRCsInfo from "../pages/drc/DRC'sInfo";
import RTomList from "../pages/rtom/RTomList";
import DrcEditHistory from "../pages/drc/EditHistory";
import DrcEditDetails from "../pages/drc/DrcEditDetails";
import DrcEnd from "../pages/drc/DrcEnd";
import ServiceTypesList from "../pages/serviceType/ServiceTypesList";
import RoListDrc from "../pages/ro/RoListDrc";
import RoList from "../pages/ro/RoList";
import AddRo from "../pages/ro/AddRo";
import RODetails from "../pages/ro/RODetails";
import ROEdit from "../pages/ro/ROEdit";
import RoEditDetails from "../pages/ro/RoEditDetails";
import RoEnd from "../pages/ro/RoEnd";
import RTomLog from "../pages/rtom/RTomLog";
import RTomEditHistory from "../pages/rtom/RTomEditHistory";
import RegRTom from "../pages/rtom/RegRTom";
import RTomInfo from "../pages/rtom/RTomInfo";
import RTomEditDetails from "../pages/rtom/RTomEditDetails";
import RTomEnd from "../pages/rtom/RtomEnd";


// incident cases

import IncidentCase from "../pages/incident/IncidentCase";


const Routers = () => {
  return (
    <Routes>
      {/* Prototype Routes */}
      <Route path="/" element={<Dashboard />} />
      <Route path="/prototypeA" element={<PrototypeA />} />
      <Route path="/prototypeB" element={<PrototypeB />} />

      {/* Incident Routes */}
      <Route path="/incident/register/individual" element={<Individual />} />
      <Route path="/incident/register/bulk" element={<Bulk />} />
      <Route path="/incident/log" element={<IncidentLog />} />
      <Route path="/incident/log/rejectincidents" element={<RejectIncidents />} />
      <Route path="/incident/log/rejectlog" element={<RejectLog />} />
      <Route path="/incident/log/directlod" element={<DirectLOD />} />
      <Route path="/incident/log/welcome" element={<Welcome />} />
      <Route path="/incident/log/open-pending-cases" element={<OpenPendingCases />} />
      <Route path="/incident/log/case-details/:id" element={<CaseDetails />} />
      <Route path="/incident/log/case-list" element={<CaseList />} />
      <Route path="/incident/log/file-download" element={<IncidentFileDownload />} />
      <Route path="/incident/log/upload-log" element={<IncidentUploadLog />} />








      <Route path = "/incident/case-list" element={<IncidentCase />} />
     

      

      {/* DRC Routes */}
      <Route path="/drc/mediation-board" element={<MediationBoard />} />
      <Route path="/drc/period-extension" element={<PeriodExtensionApproval />} />
      <Route path="/drc/log" element={<DRCLog />} />
      <Route path="/drc/assigned-DRC-log" element={<AssignedDRCLog />} />
      <Route path="/drc/re-assign-DRC" element={<ReAssignDRC />} />
      <Route path="/drc/assign-DRC" element={<AssignDRC />} />
      <Route path="/drc/drcapproval" element={<DRCApproval />} />
      <Route path="/drc/pending" element={<Pending />} />
      <Route path="/drc/mediation-board-requests" element={<MediationBoardSendingRequests />} />
      <Route path="/drc/mediation-board-accept" element={<MediationBoardAccept />} />
      <Route path="/drc/mediation-board-response-log" element={<MediationBoardResponseLog />} />
      <Route path="/drc/case-list" element={<DRCcaseList />} />

      <Route path="/drc/logs" element={<Logs />} />

      
      

      {/* DRC OWNED  */}
      <Route
        path="/drc/assigned-case-list-for-drc/:drc_id"
        element={<AssignedCaseListforDRC />}
      />
      {/* <Route path ="/drc/cases-details/:case_id" element={<CaseDetailsView/>}/> */}
      <Route path="/drc/cases-details/:caseId" element={<CaseDetailsView />} />

      

      {/* LOD Routes */}
      <Route path="/lod/ftl-list" element={<FtlLodList />} />
      <Route path="/lod/ftl-log" element={<FtlLodLog />} />
      <Route path="/lod/litigation" element={<Litigation />} />
      <Route path="/lod/litigation-log" element={<LitigationLog />} />
      <Route path="/lod/post-litigation-log" element={<PostLitigationLog />} />
      <Route path="/lod/litigation-submission" element={<LitigationSubmission />} />
      <Route path="/lod/litigation-page" element={<LitigationPage />} />
      <Route path="/lod/digital-signature-log" element={<LODLog />} />
      <Route path="/lod/final-reminder-log" element={<FinalReminderLog />} />
      <Route path="/lod/submission-list" element={<ListLOdSubmission />} />
      <Route path="/lod/submitted-cases" element={<ListLOdSubmitedCases />} />
      <Route path="/lod/preview" element={<LODPreview />} />
      <Route path="/lod/download" element={<DownloadLOD />} />

      {/* Settlement Routes */}
      <Route path="/settlement/adjustments" element={<Adjustments />} />

      {/* Additional DRC Routes */}
      <Route path="/lod/cr-update-lod" element={<CR_Update_LOD />} />
      <Route path="/lod/cr-update" element={<CR_Update />} />
      <Route path="/lod/cr-update-fr" element={<CR_Update_FR />} />
      <Route path="/dispute/Dispute_Log" element={<Dispute_Log />} />
      <Route path="/lod/digital_signature_lod/dispute/Dispute_Submission" element={<Dispute_Submission />} />
      <Route path="/lod/digital_signature_lod/F2" element={<F2 />} />
      <Route path="/final_riminder/fr_creation" element={<FR_Creation />} />
      <Route path="/lod/lod-creation" element={<LOD_Creation />} />
      <Route path="/lod/digital_signature_lod/dispute/Post_Dispute_Log" element={<Post_Dispute_Log />} />
      <Route path="/lod/digital_signature_lod/final_riminder/sup_fr_log" element={<Sup_FR_Log />} />
      <Route path="/lod/Sup_LOD_Log" element={<Sup_LOD_Log />} />

      {/* config */}
      <Route path="/config" element={<Config />} />
      <Route path="/config/regi-drc" element={<RegDrc />} />
      <Route path="/config/edit-drc" element={<EditDRC />} />
      <Route path="/config/drc-list" element={<DrcList />} />
      <Route path="/config/drc-info/:drcId" element={<DrcInfo />} />
      <Route path="/config/drc's-info" element={<DRCsInfo />} />
      <Route path="/config/rtom-list" element={<RTomList />} />
      <Route path="/config/drc-edit-history" element={<DrcEditHistory />} />
      <Route path="/config/drc-edit-details/:drcId" element={<DrcEditDetails />} />
      <Route path="/config/service-types-list" element={<ServiceTypesList />} />
      <Route path="/config/ro-list-drc" element={<RoListDrc />} />
      <Route path="/config/drc-end/:drcId" element={<DrcEnd />} />
      <Route path="/config/ro-list" element={<RoList />} />
      <Route path="/config/add-ro" element={<AddRo />} />
      <Route path="/config/ro-details/:roId" element={<RODetails />} />
      <Route path="/config/ro-edit-details/:roId" element={<RoEditDetails />} />
      <Route path="/config/ro-end/:roId" element={<RoEnd />} />
      <Route path="/config/ro-edit/:roId" element={<ROEdit />} />
      <Route path="/config/rtom-log" element={<RTomLog />} />
      <Route path="/config/rtom-edit-history" element={<RTomEditHistory />} />
      <Route path="/config/regi-rtom" element={<RegRTom />} />
      <Route path="/config/rtom-info/:rtomId" element={<RTomInfo />} />
      <Route path="/config/rtom-end/:rtomId" element={<RTomEnd />} />
      <Route path="/config/rtom-edit-details/:rtomId" element={<RTomEditDetails />} />
    </Routes>
  );
};

export default Routers;
