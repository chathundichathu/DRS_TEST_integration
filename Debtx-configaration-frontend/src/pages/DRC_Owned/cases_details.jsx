import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { getDRCDetailsByCaseId } from "../../services/Case/Cases";

const CaseDetails = () => {
  const location = useLocation();
  // Extract case ID from the URL path
  const caseId = location.pathname.split('/').pop();
  
  const [showCard, setShowCard] = useState(false);
  const [loading, setLoading] = useState(false);
  const [drcData, setDrcData] = useState(null);
  const [error, setError] = useState("");

  // Debug log for case ID
  useEffect(() => {
    console.log("Current case ID from URL:", caseId);
  }, [caseId]);

  const handleBackClick = () => {
    // Stay on the same page, just collapse the card if it's shown
    if (showCard) {
      setShowCard(false);
    }
  };

  const handleDownloadClick = () => {
    setShowCard(!showCard);
    if (!showCard) {
      fetchDRCDetails();
    }
  };

  const fetchDRCDetails = async () => {
    if (!caseId) {
      setError("No case ID available");
      return;
    }

    try {
      setLoading(true);
      setError("");
      
      const response = await getDRCDetailsByCaseId(caseId);
      
      if (response && response.data && response.data.length > 0) {
        const drc = response.data[0];
        setDrcData({
          drc_id: drc.drc_id || "N/A",
          drc_name: drc.drc_name || "N/A",
          created_dtm: drc.created_dtm ? new Date(drc.created_dtm).toLocaleDateString() : "N/A",
          status: drc.status  || "N/A",
          case_removal_remark: drc.case_removal_remark || "N/A",
          removed_by: drc.removed_by || "N/A",
          removed_dtm: drc.removed_dtm ? new Date(drc.removed_dtm).toLocaleDateString() : "N/A",
          case_transfer_dtm: drc.case_transfer_dtm ? new Date(drc.case_transfer_dtm).toLocaleDateString() : "N/A",
          transferred_by: drc.transferred_by || "N/A",
          expire_dtm: drc.expire_dtm ? new Date(drc.expire_dtm).toLocaleDateString() : "N/A",
          order_id: drc.order_id || "N/A"
        });
      } else {
        setError("No DRC data found for this case ID");
      }
    } catch (error) {
      console.error("Error fetching DRC details:", error);
      setError(error.message || "Failed to fetch DRC details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const dropdownOptions = [
    "RO - Negative | Arrears",
    "RO - Negative | CPE",
    "RO - Customer Updated Data",
    "Mediation Board",
    "Settlement",
    "Payment",
    "Commission | Arrears Collection",
    "Commission | CPE Collection",
    "LOD",
    "Dispute",
    "Write OFF",
  ];

  return (
    <div className="font-poppins">
      <div className="w-full mb-8 mt-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Case Details</h2>
        <div className="p-4 bg-white rounded-lg shadow-md w-2/4">
          <p className="mb-2">
            <strong>Case ID:</strong> {caseId}
          </p>
          <p className="mb-2">
            <strong>Created DTM:</strong> {drcData?.created_dtm}
          </p>
          <p className="mb-2">
            <strong>Days Count:</strong> {/* Add days count calculation if needed */}
          </p>
        </div>
      </div>
      
      <div>
        <div className="flex gap-4 mt-8">
          <select 
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleDownloadClick}
          >
            <option value="option1">DRC</option>
          </select>
        </div>

        {showCard && (
          <div className="p-4 bg-white rounded-lg shadow-md mt-4">
            {loading ? (
              <p>Loading DRC details...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <>
                <p className="mb-2"><strong>DRC ID:</strong> {drcData?.drc_id}</p>
                <p className="mb-2"><strong>DRC Name:</strong> {drcData?.drc_name}</p>
                <p className="mb-2"><strong>Order Id:</strong> {drcData?.order_id}</p>
                <p className="mb-2"><strong>Created Date:</strong> {drcData?.created_dtm}</p>
                <p className="mb-2"><strong>Status:</strong> {drcData?.status}</p>
                <p className="mb-2"><strong>Case Removal Remark:</strong> {drcData?.case_removal_remark}</p>
                <p className="mb-2"><strong>Removed By:</strong> {drcData?.removed_by}</p>
                <p className="mb-2"><strong>Removed Date:</strong> {drcData?.removed_dtm}</p>
                <p className="mb-2"><strong>Case Transfer Date:</strong> {drcData?.case_transfer_dtm}</p>
                <p className="mb-2"><strong>Case Transferred By:</strong> {drcData?.transferred_by}</p>
                <p className="mb-2"><strong>Expired Date:</strong> {drcData?.expire_dtm}</p>
                
              </>
            )}
          </div>
        )}

        {dropdownOptions.map((option, index) => (
          <div key={index} className="flex gap-4 mt-8">
            <select className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value={`option${index + 1}`}>{option}</option>
            </select>
          </div>
        ))}
      </div>

      <div className="flex justify-between w-full mt-8">
        <button 
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors" 
          onClick={handleBackClick}
        >
          <FaArrowLeft />
        </button>
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          onClick={handleDownloadClick}
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default CaseDetails;


// import React, { useState, useEffect } from "react";
// import GlobalStyle from "../../assets/prototype/GlobalStyle";
// import { FaArrowLeft } from "react-icons/fa";
// import { getDRCDetailsByCaseId } from "../../services/Case/Cases";

// const CaseDetails = () => {
//   const [showCard, setShowCard] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [drcData, setDrcData] = useState(null);
//   const [error, setError] = useState("");
//   const [caseId, setCaseId] = useState("1"); // Replace with actual case ID source

//   const handleBackClick = () => {
//     console.log("Back button clicked");
//   };

//   // Fixed handleDownloadClick function
//   const handleDownloadClick = () => {
//     setShowCard(!showCard); // Using showCard directly instead of prevState
//     if (!showCard) { // Check current state
//       fetchDRCDetails();
//     }
//   };

//   const fetchDRCDetails = async () => {
//     try {
//       setLoading(true);
//       setError("");
      
//       const response = await getDRCDetailsByCaseId(caseId);
      
//       if (response && response.data && response.data.length > 0) {
//         const drc = response.data[0];
//         setDrcData({
//           drc_id: drc.drc_id || "N/A",
//           drc_name: drc.drc_name || "N/A",
//           created_dtm: drc.created_dtm ? new Date(drc.created_dtm).toLocaleDateString() : "N/A",
//           case_removal_remark: drc.case_removal_remark || "N/A",
//           removed_by: drc.removed_by || "N/A",
//           removed_dtm: drc.removed_dtm ? new Date(drc.removed_dtm).toLocaleDateString() : "N/A",
//           case_transfer_dtm: drc.case_transfer_dtm ? new Date(drc.case_transfer_dtm).toLocaleDateString() : "N/A",
//           transferred_by: drc.transferred_by || "N/A",
//           expire_dtm: drc.expire_dtm ? new Date(drc.expire_dtm).toLocaleDateString() : "N/A",
//           order_id: drc.order_id || "N/A"
//         });
//       } else {
//         setError("No DRC data found");
//       }
//     } catch (error) {
//       console.error("Error fetching DRC details:", error);
//       setError(error.message || "Failed to fetch DRC details. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Rest of your component code remains the same...

//   useEffect(() => {
//     if (caseId && showCard) {
//       fetchDRCDetails();
//     }
//   }, [caseId]);

//   const dropdownOptions = [
//     "RO - Negative | Arrears",
//     "RO - Negative | CPE",
//     "RO - Customer Updated Data",
//     "Mediation Board",
//     "Settlement",
//     "Payment",
//     "Commission | Arrears Collection",
//     "Commission | CPE Collection",
//     "LOD",
//     "Dispute",
//     "Write OFF",
//   ];

//   return (
//     <div className={GlobalStyle.fontPoppins}>
//       <div className="w-full mb-8 mt-4 flex items-center justify-between">
//         <h2 className={GlobalStyle.headingLarge}>Case Details</h2>
//         <div className={`${GlobalStyle.cardContainer} w-2/4`}>
//           <p className="mb-2">
//             <strong>Case ID:</strong> {caseId}
//           </p>
//           <p className="mb-2">
//             <strong>Created DTM:</strong>
//           </p>
//           <p className="mb-2">
//             <strong>Days Count:</strong>
//           </p>
//         </div>
//       </div>
      
//       <div>
//         <div className="flex gap-4 mt-8">
//           <select 
//             className={`${GlobalStyle.selectBox} w-full`} 
//             onClick={handleDownloadClick}
//           >
//             <option value="option1">DRC</option>
//           </select>
//         </div>

//         {showCard && (
//           <div className={`${GlobalStyle.cardContainer} mt-4`}>
//             {loading ? (
//               <p>Loading DRC details...</p>
//             ) : error ? (
//               <p className="text-red-500">{error}</p>
//             ) : (
//               <>
//                 <p className="mb-2"><strong>DRC ID:</strong> {drcData?.drc_id}</p>
//                 <p className="mb-2"><strong>DRC Name:</strong> {drcData?.drc_name}</p>
//                 <p className="mb-2"><strong>Created Date:</strong> {drcData?.created_dtm}</p>
//                 <p className="mb-2"><strong>Case Removal Remark:</strong> {drcData?.case_removal_remark}</p>
//                 <p className="mb-2"><strong>Removed By:</strong> {drcData?.removed_by}</p>
//                 <p className="mb-2"><strong>Removed Date:</strong> {drcData?.removed_dtm}</p>
//                 <p className="mb-2"><strong>Case Transfer Date:</strong> {drcData?.case_transfer_dtm}</p>
//                 <p className="mb-2"><strong>Case Transferred By:</strong> {drcData?.transferred_by}</p>
//                 <p className="mb-2"><strong>Expired Date:</strong> {drcData?.expire_dtm}</p>
//                 <p className="mb-2"><strong>Selection Logic:</strong> {drcData?.order_id}</p>
//               </>
//             )}
//           </div>
//         )}

//         {dropdownOptions.map((option, index) => (
//           <div key={index} className="flex gap-4 mt-8">
//             <select className={`${GlobalStyle.selectBox} w-full`}>
//               <option value={`option${index + 1}`}>{option}</option>
//             </select>
//           </div>
//         ))}
//       </div>

//       <div className="flex justify-between w-full mt-8">
//         <button className={GlobalStyle.navButton} onClick={handleBackClick}>
//           <FaArrowLeft />
//         </button>
//         <button className={GlobalStyle.buttonPrimary} onClick={handleDownloadClick}>
//           Download
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CaseDetails;
