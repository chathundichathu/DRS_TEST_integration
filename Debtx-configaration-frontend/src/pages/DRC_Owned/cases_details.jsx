import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { getDRCDetailsByCaseId } from "../../services/Case/Cases";
import GlobalStyle from "../../assets/prototype/GlobalStyle";

const IncidentCase = () => {
  const [showSection, setShowSection] = useState({
    contact: false,
    product: false,
    customer: false,
    account: false,
    last_actions: false,
    marketing_details: false,
  });

  const toggleSection = (section) => {
    const allClosed = Object.keys(showSection).reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {});
    
    setShowSection({
      ...allClosed,
      [section]: !showSection[section]
    });
  };

  return (
    <div>
      <div className={`${GlobalStyle.cardContainer} w-full`}>
        <div className="grid grid-cols-2 gap-8">
          {/* Left Column */}
          <div>
            <div className="mb-4">
              <p className="font-semibold">Incident Id : </p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Account No : </p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Area : </p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Rtom : </p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Current Selection Logic : </p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">bss arrears amount : </p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Action Type : </p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Last Payment Date : </p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Monitor Months : </p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Case Current Status : </p>
            </div>
          </div>

          {/* Right Column */}
          <div>
            <div className="mb-4">
              <p className="font-semibold">Customer Reference : </p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Created Date : </p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Implemented Date : </p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">DRC Selection Rule Base : </p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Current Arrears Amount : </p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Selection Rule : </p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Last bss Reading Date : </p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Commission : </p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Filtered Reason : </p>
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Sections */}
      <div className="mt-8 space-y-4">
        {/* Contact Section */}
        <div>
          <button 
            className={`${GlobalStyle.selectBox} w-full text-left px-4 py-2 flex justify-between items-center`}
            onClick={() => toggleSection('contact')}
          >
            Contact
            <span>{showSection.contact ? '▲' : '▼'}</span>
          </button>
          {showSection.contact && (
            <div className="mt-2 p-4 border border-gray-200 rounded">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="mb-2"><strong>Mobile : </strong></p>
                  <p className="mb-2"><strong>Email : </strong></p>
                </div>
                <div>
                  <p className="mb-2"><strong>Land : </strong></p>
                  <p className="mb-2"><strong>Address : </strong></p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Product Details Section */}
        <div>
          <button 
            className={`${GlobalStyle.selectBox} w-full text-left px-4 py-2 flex justify-between items-center`}
            onClick={() => toggleSection('product')}
          >
            Product Details
            <span>{showSection.product ? '▲' : '▼'}</span>
          </button>
          {showSection.product && (
            <div className="mt-2 p-4 border border-gray-200 rounded">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="mb-2"><strong>Product Label : </strong></p>
                  <p className="mb-2"><strong>Customer Reference : </strong></p>
                  <p className="mb-2"><strong>Product Sequence : </strong></p>
                  <p className="mb-2"><strong>Equipment Ownership : </strong></p>
                  <p className="mb-2"><strong>Product Id : </strong></p>
                  <p className="mb-2"><strong>Product Name : </strong></p>
                  <p className="mb-2"><strong>Product Status : </strong></p>
                  <p className="mb-2"><strong>Effective Date : </strong></p>
                </div>
                <div>
                  <p className="mb-2"><strong>Service Address : </strong></p>
                  <p className="mb-2"><strong>Category : </strong></p>
                  <p className="mb-2"><strong>Db_Cpe_Status : </strong></p>
                  <p className="mb-2"><strong>Received_List_Cpe_Status : </strong></p>
                  <p className="mb-2"><strong>Service Type : </strong></p>
                  <p className="mb-2"><strong>Region : </strong></p>
                  <p className="mb-2"><strong>Province : </strong></p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Customer Details Section */}
        <div>
          <button 
            className={`${GlobalStyle.selectBox} w-full text-left px-4 py-2 flex justify-between items-center`}
            onClick={() => toggleSection('customer')}
          >
            Customer Details
            <span>{showSection.customer ? '▲' : '▼'}</span>
          </button>
          {showSection.customer && (
            <div className="mt-2 p-4 border border-gray-200 rounded">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="mb-2"><strong>Customer Name : </strong></p>
                  <p className="mb-2"><strong>Company Name : </strong></p>
                  <p className="mb-2"><strong>Company Registry Number : </strong></p>
                  <p className="mb-2"><strong>Full Address : </strong></p>
                </div>
                <div>
                  <p className="mb-2"><strong>Zip code : </strong></p>
                  <p className="mb-2"><strong>Customer Type Name : </strong></p>
                  <p className="mb-2"><strong>NIC : </strong></p>
                  <p className="mb-2"><strong>Customer Type Id : </strong></p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Account Details Section */}
        <div>
          <button 
            className={`${GlobalStyle.selectBox} w-full text-left px-4 py-2 flex justify-between items-center`}
            onClick={() => toggleSection('account')}
          >
            Account Details
            <span>{showSection.account ? '▲' : '▼'}</span>
          </button>
          {showSection.account && (
            <div className="mt-2 p-4 border border-gray-200 rounded">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="mb-2"><strong>Account Status : </strong></p>
                  <p className="mb-2"><strong>Account Effective Date : </strong></p>
                  <p className="mb-2"><strong>Account Active Date : </strong></p>
                  <p className="mb-2"><strong>Credit Class Id : </strong></p>
                  <p className="mb-2"><strong>Credit Class Name : </strong></p>
                  <p className="mb-2"><strong>Billing Centre : </strong></p>
                </div>
                <div>
                  <p className="mb-2"><strong>Customer Segment : </strong></p>
                  <p className="mb-2"><strong>Mobile Contact Telephone : </strong></p>
                  <p className="mb-2"><strong>Daytime Contact Telephone : </strong></p>
                  <p className="mb-2"><strong>Email Address : </strong></p>
                  <p className="mb-2"><strong>Last Rated Date : </strong></p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Last Actions Section */}
        <div>
          <button 
            className={`${GlobalStyle.selectBox} w-full text-left px-4 py-2 flex justify-between items-center`}
            onClick={() => toggleSection('last_actions')}
          >
            Last Actions
            <span>{showSection.last_actions ? '▲' : '▼'}</span>
          </button>
          {showSection.last_actions && (
            <div className="mt-2 p-4 border border-gray-200 rounded">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="mb-2"><strong>Billed Sequence : </strong></p>
                  <p className="mb-2"><strong>Billed Created : </strong></p>
                </div>
                <div>
                  <p className="mb-2"><strong>Payment Sequence : </strong></p>
                  <p className="mb-2"><strong>Billed Sequence : </strong></p>
                  <p className="mb-2"><strong>Payment Created : </strong></p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Remark Section */}
        <div>
          <button 
            className={`${GlobalStyle.selectBox} w-full text-left px-4 py-2 flex justify-between items-center`}
            onClick={() => toggleSection('marketing_details')}
          >
            Remark
            <span>{showSection.marketing_details ? '▲' : '▼'}</span>
          </button>
          {showSection.marketing_details && (
            <div className="mt-2 p-4 border border-gray-200 rounded">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="mb-2"><strong>Account Manager : </strong></p>
                  <p className="mb-2"><strong>Consumer Market : </strong></p>
                </div>
                <div>
                  <p className="mb-2"><strong>Informed To : </strong></p>
                  <p className="mb-2"><strong>Informed On : </strong></p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CaseDetails = () => {
  const location = useLocation();
  const caseId = location.pathname.split("/").pop();

  const [showDRCCard, setShowDRCCard] = useState(false);
  const [loading, setLoading] = useState(false);
  const [caseData, setCaseData] = useState(null);
  const [drcData, setDrcData] = useState(null);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("CaseDetails");
  const [loadingTab, setLoadingTab] = useState(false);
  const [showSection, setShowSection] = useState({
    contact: false,
    product: false,
    customer: false,
    account: false,
    last_actions: false,
    marketing_details: false,
  });

  useEffect(() => {
    if (caseId) {
      fetchCaseAndDRCDetails();
    }
  }, [caseId]);

  const handleBackClick = () => {
    if (showDRCCard) {
      setShowDRCCard(false);
    }
  };

  const handleDownloadClick = () => {
    setShowDRCCard(!showDRCCard);
  };

  const toggleSection = (section) => {
    const allClosed = Object.keys(showSection).reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {});
    
    setShowSection({
      ...allClosed,
      [section]: !showSection[section]
    });
  };

  const handleTabChange = async (tab) => {
    setLoadingTab(true);
    setActiveTab(tab);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (tab === "IncidentDetails") {
        console.log("Loading incident details...");
      }
    } catch (error) {
      console.error("Error loading tab data:", error);
      setError("Failed to load tab content");
    } finally {
      setLoadingTab(false);
    }
  };

  const fetchCaseAndDRCDetails = async () => {
    if (!caseId) {
      setError("No case ID available");
      return;
    }
    try {
      setLoading(true);
      setError("");

      const response = await getDRCDetailsByCaseId(caseId);

      if (response && response.data) {
        setCaseData(response.data.case_details || {});

        if (response.data.drc_details && response.data.drc_details.length > 0) {
          const drc = response.data.drc_details[0];
          setDrcData({
            drc_id: drc.drc_id || "N/A",
            drc_name: drc.drc_name || "N/A",
            created_dtm: drc.created_dtm ? new Date(drc.created_dtm).toLocaleDateString() : "N/A",
            status: drc.status || "N/A",
            case_removal_remark: drc.case_removal_remark || "N/A",
            removed_by: drc.removed_by || "N/A",
            removed_dtm: drc.removed_dtm ? new Date(drc.removed_dtm).toLocaleDateString() : "N/A",
            case_transfer_dtm: drc.case_transfer_dtm ? new Date(drc.case_transfer_dtm).toLocaleDateString() : "N/A",
            transferred_by: drc.transferred_by || "N/A",
            expire_dtm: drc.expire_dtm ? new Date(drc.expire_dtm).toLocaleDateString() : "N/A",
            order_id: drc.order_id || "N/A"
          });
        }
      } else {
        setError("No data found for this case ID");
      }
    } catch (error) {
      console.error("Error fetching details:", error);
      setError(error.message || "Failed to fetch details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const dropdownOptions = [
    "RO - Negatiation | Arrears",
    "RO - Negatiation | CPE",
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

  const renderCaseDetails = () => (
    <div>
      <div className="w-64 ml-auto">
        <p className="mb-2">
          <strong>Case ID&nbsp;:&nbsp;</strong> {caseId}
        </p>
        <p className="mb-2">
          <strong>Created dtm&nbsp;:&nbsp;</strong> {caseData?.created_dtm ? new Date(caseData.created_dtm).toLocaleDateString() : 'N/A'}
        </p>
        <p className="mb-2">
          <strong>Days count&nbsp;:&nbsp;</strong> {caseData?.days_count || 'N/A'}
        </p>
      </div>

      <div className={`${GlobalStyle.cardContainer} w-full p-4 bg-white shadow-md rounded-md`}>
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          <p className="flex items-center">
            <span className="font-medium">Account No&nbsp;:&nbsp;</span>
            <span className="text-gray-700">{caseData?.account_no || 'N/A'}</span>
          </p>
          <p className="flex items-center">
            <span className="font-medium">Customer Ref&nbsp;:&nbsp;</span>
            <span className="text-gray-700">{caseData?.customer_ref || 'N/A'}</span>
          </p>
          <p className="flex items-center">
            <span className="font-medium">Area&nbsp;:&nbsp;</span>
            <span className="text-gray-700">{caseData?.area || 'N/A'}</span>
          </p>
          <p className="flex items-center">
            <span className="font-medium">RTOM&nbsp;:&nbsp;</span>
            <span className="text-gray-700">{caseData?.rtom || 'N/A'}</span>
          </p>
          <p className="flex items-center">
            <span className="font-medium">Arrears Amount&nbsp;:&nbsp;</span>
            <span className="text-gray-700">{caseData?.arrears_amount || 'N/A'}</span>
          </p>
          <p className="flex items-center">
            <span className="font-medium">Action Type&nbsp;:&nbsp;</span>
            <span className="text-gray-700">{caseData?.action_type || 'N/A'}</span>
          </p>
          <p className="flex items-center">
            <span className="font-medium">Last Payment Date&nbsp;:&nbsp;</span>
            <span className="text-gray-700">
              {caseData?.last_payment_date ? new Date(caseData.last_payment_date).toLocaleDateString() : 'N/A'}
            </span>
          </p>
          <p className="flex items-center">
            <span className="font-medium">Last BSS Reading Date&nbsp;:&nbsp;</span>
            <span className="text-gray-700">
              {caseData?.last_bss_reading_date ? new Date(caseData.last_bss_reading_date).toLocaleDateString() : 'N/A'}
            </span>
          </p>
          <p className="flex items-center">
            <span className="font-medium">Current Status&nbsp;:&nbsp;</span>
            <span className="text-gray-700">{caseData?.case_current_status || 'N/A'}</span>
          </p>
          <p className="flex items-center">
            <span className="font-medium">Commission&nbsp;:&nbsp;</span>
            <span className="text-gray-700">{caseData?.commission || 'N/A'}</span>
          </p>
        </div>
      </div>

      <div>
        <div className="flex gap-4 mt-8">
          <select 
            className={`${GlobalStyle.selectBox} w-full`}
            onClick={handleDownloadClick}
          >
            <option value="option1">DRC</option>
          </select>
        </div>

        {showDRCCard && (
          <div className={`${GlobalStyle.cardContainer} mt-8 w-full`}>
            {loading ? (
              <p>Loading details...</p>
            ) : error ? (
              <p className={GlobalStyle.errorText}>{error}</p>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <p className="mb-2">
                  <span className="font-medium">DRC ID:</span> {drcData?.drc_id}
                </p>
                <p className="mb-2">
                  <span className="font-medium">DRC Name:</span> {drcData?.drc_name}
                </p>
                <p className="mb-2">
                  <span className="font-medium">Order Id:</span> {drcData?.order_id}
                </p>
                <p className="mb-2">
                  <span className="font-medium">Created Date:</span> {drcData?.created_dtm}
                </p>
                <p className="mb-2">
                  <span className="font-medium">Status:</span> {drcData?.status}
                </p>
                <p className="mb-2">
                  <span className="font-medium">Case Removal Remark:</span> {drcData?.case_removal_remark}
                </p>
                <p className="mb-2">
                  <span className="font-medium">Removed By:</span> {drcData?.removed_by}
                </p>
                <p className="mb-2">
                  <span className="font-medium">Removed Date:</span> {drcData?.removed_dtm}
                </p>
                <p className="mb-2">
                  <span className="font-medium">Case Transfer Date:</span> {drcData?.case_transfer_dtm}
                </p>
                <p className="mb-2">
                  <span className="font-medium">Case Transferred By:</span> {drcData?.transferred_by}
                </p>
                <p className="mb-2">
                  <span className="font-medium">Expired Date:</span> {drcData?.expire_dtm}
                </p>
              </div>
            )}
          </div>
        )}

        {dropdownOptions.map((option, index) => (
          <div key={index} className="flex gap-4 mt-8">
            <select className={`${GlobalStyle.selectBox} w-full`}>
              <option value={`option${index + 1}`}>{option}</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );

  const renderIncidentDetails = () => (
    <IncidentCase />
  );

  const renderTabContent = () => {
    if (loadingTab) {
      return (
        <div className="flex justify-center items-center p-8">
          <div className="animate-pulse text-gray-500">Loading...</div>
        </div>
      );
    }
    return activeTab === "CaseDetails" ? renderCaseDetails() : renderIncidentDetails();
  };

  return (
    <div className={GlobalStyle.fontPoppins}>
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => handleTabChange("CaseDetails")}
          className={`px-4 py-2 transition-colors duration-200 ${
            activeTab === "CaseDetails"
              ? "border-b-2 border-blue-500 font-bold"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Case Details
        </button>
        <button
          onClick={() => handleTabChange("IncidentDetails")}
          className={`px-4 py-2 transition-colors duration-200 ${
            activeTab === "IncidentDetails"
              ? "border-b-2 border-blue-500 font-bold"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Incident Details
        </button>
      </div>

      {renderTabContent()}

      {/* <div className={GlobalStyle.navButtonContainer}>
        <button 
          className={GlobalStyle.navButton}
          onClick={handleBackClick}
        >
          <FaArrowLeft />
        </button>
        <button 
          className={GlobalStyle.buttonPrimary}
          onClick={handleDownloadClick}
        >
          Download
        </button>
      </div> */}
    </div>
  );
};

export default CaseDetails;



// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { FaArrowLeft } from "react-icons/fa";
// import { getDRCDetailsByCaseId } from "../../services/Case/Cases";
// import GlobalStyle from "../../assets/prototype/GlobalStyle";

// const CaseDetails = () => {
//   const location = useLocation();
//   const caseId = location.pathname.split("/").pop();

//   const [showDRCCard, setShowDRCCard] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [caseData, setCaseData] = useState(null);
//   const [drcData, setDrcData] = useState(null);
//   const [error, setError] = useState("");
//   const [activeTab, setActiveTab] = useState("CaseDetails");
//   const [loadingTab, setLoadingTab] = useState(false);

//   useEffect(() => {
//     if (caseId) {
//       fetchCaseAndDRCDetails();
//     }
//   }, [caseId]);

//   const handleBackClick = () => {
//     if (showDRCCard) {
//       setShowDRCCard(false);
//     }
//   };

//   const handleDownloadClick = () => {
//     setShowDRCCard(!showDRCCard);
//   };

//   const handleTabChange = async (tab) => {
//     setLoadingTab(true);
//     setActiveTab(tab);
    
//     try {
//       await new Promise(resolve => setTimeout(resolve, 500));
      
//       if (tab === "IncidentDetails") {
//         console.log("Loading incident details...");
//       }
//     } catch (error) {
//       console.error("Error loading tab data:", error);
//       setError("Failed to load tab content");
//     } finally {
//       setLoadingTab(false);
//     }
//   };

//   const fetchCaseAndDRCDetails = async () => {
//     if (!caseId) {
//       setError("No case ID available");
//       return;
//     }
//     try {
//       setLoading(true);
//       setError("");

//       const response = await getDRCDetailsByCaseId(caseId);

//       if (response && response.data) {
//         setCaseData(response.data.case_details || {});

//         if (response.data.drc_details && response.data.drc_details.length > 0) {
//           const drc = response.data.drc_details[0];
//           setDrcData({
//             drc_id: drc.drc_id || "N/A",
//             drc_name: drc.drc_name || "N/A",
//             created_dtm: drc.created_dtm ? new Date(drc.created_dtm).toLocaleDateString() : "N/A",
//             status: drc.status || "N/A",
//             case_removal_remark: drc.case_removal_remark || "N/A",
//             removed_by: drc.removed_by || "N/A",
//             removed_dtm: drc.removed_dtm ? new Date(drc.removed_dtm).toLocaleDateString() : "N/A",
//             case_transfer_dtm: drc.case_transfer_dtm ? new Date(drc.case_transfer_dtm).toLocaleDateString() : "N/A",
//             transferred_by: drc.transferred_by || "N/A",
//             expire_dtm: drc.expire_dtm ? new Date(drc.expire_dtm).toLocaleDateString() : "N/A",
//             order_id: drc.order_id || "N/A"
//           });
//         }
//       } else {
//         setError("No data found for this case ID");
//       }
//     } catch (error) {
//       console.error("Error fetching details:", error);
//       setError(error.message || "Failed to fetch details. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const dropdownOptions = [
//     "RO - Negatiation | Arrears",
//     "RO - Negatiation | CPE",
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

//   const renderCaseDetails = () => (
//     <div>
//       <div className="w-64 ml-auto">
//   <p className="mb-2">
//     <strong>Case ID&nbsp;:&nbsp;</strong> {caseId}
//   </p>
//   <p className="mb-2">
//     <strong>Created dtm&nbsp;:&nbsp;</strong> {caseData?.created_dtm ? new Date(caseData.created_dtm).toLocaleDateString() : 'N/A'}
//   </p>
//   <p className="mb-2">
//     <strong>Days count&nbsp;:&nbsp;</strong> {caseData?.days_count || 'N/A'}
//   </p>
// </div>

        
// <div className={`${GlobalStyle.cardContainer} w-full p-4 bg-white shadow-md rounded-md`}>
//   <div className="grid grid-cols-2 gap-x-6 gap-y-4">
//     <p className="flex items-center">
//       <span className="font-medium">Account No&nbsp;:&nbsp;</span>
//       <span className="text-gray-700">{caseData?.account_no || 'N/A'}</span>
//     </p>
//     <p className="flex items-center">
//       <span className="font-medium">Customer Ref&nbsp;:&nbsp;</span>
//       <span className="text-gray-700">{caseData?.customer_ref || 'N/A'}</span>
//     </p>
//     <p className="flex items-center">
//       <span className="font-medium">Area&nbsp;:&nbsp;</span>
//       <span className="text-gray-700">{caseData?.area || 'N/A'}</span>
//     </p>
//     <p className="flex items-center">
//       <span className="font-medium">RTOM&nbsp;:&nbsp;</span>
//       <span className="text-gray-700">{caseData?.rtom || 'N/A'}</span>
//     </p>
//     <p className="flex items-center">
//       <span className="font-medium">Arrears Amount&nbsp;:&nbsp;</span>
//       <span className="text-gray-700">{caseData?.arrears_amount || 'N/A'}</span>
//     </p>
//     <p className="flex items-center">
//       <span className="font-medium">Action Type&nbsp;:&nbsp;</span>
//       <span className="text-gray-700">{caseData?.action_type || 'N/A'}</span>
//     </p>
//     <p className="flex items-center">
//       <span className="font-medium">Last Payment Date&nbsp;:&nbsp;</span>
//       <span className="text-gray-700">
//         {caseData?.last_payment_date ? new Date(caseData.last_payment_date).toLocaleDateString() : 'N/A'}
//       </span>
//     </p>
//     <p className="flex items-center">
//       <span className="font-medium">Last BSS Reading Date&nbsp;:&nbsp;</span>
//       <span className="text-gray-700">
//         {caseData?.last_bss_reading_date ? new Date(caseData.last_bss_reading_date).toLocaleDateString() : 'N/A'}
//       </span>
//     </p>
//     <p className="flex items-center">
//       <span className="font-medium">Current Status&nbsp;:&nbsp;</span>
//       <span className="text-gray-700">{caseData?.case_current_status || 'N/A'}</span>
//     </p>
//     <p className="flex items-center">
//       <span className="font-medium">Commission&nbsp;:&nbsp;</span>
//       <span className="text-gray-700">{caseData?.commission || 'N/A'}</span>
//     </p>
//   </div>
// </div>
//       <div>
//         <div className="flex gap-4 mt-8">
//           <select 
//             className={`${GlobalStyle.selectBox} w-full`}
//             onClick={handleDownloadClick}
//           >
//             <option value="option1">DRC</option>
//           </select>
//         </div>

//         {showDRCCard && (
//           <div className={`${GlobalStyle.cardContainer} mt-8 w-full`}>
//             {loading ? (
//               <p>Loading details...</p>
//             ) : error ? (
//               <p className={GlobalStyle.errorText}>{error}</p>
//             ) : (
//               <div className="grid grid-cols-2 gap-4">
//                 <p className="mb-2">
//                   <span className="font-medium">DRC ID:</span> {drcData?.drc_id}
//                 </p>
//                 <p className="mb-2">
//                   <span className="font-medium">DRC Name:</span> {drcData?.drc_name}
//                 </p>
//                 <p className="mb-2">
//                   <span className="font-medium">Order Id:</span> {drcData?.order_id}
//                 </p>
//                 <p className="mb-2">
//                   <span className="font-medium">Created Date:</span> {drcData?.created_dtm}
//                 </p>
//                 <p className="mb-2">
//                   <span className="font-medium">Status:</span> {drcData?.status}
//                 </p>
//                 <p className="mb-2">
//                   <span className="font-medium">Case Removal Remark:</span> {drcData?.case_removal_remark}
//                 </p>
//                 <p className="mb-2">
//                   <span className="font-medium">Removed By:</span> {drcData?.removed_by}
//                 </p>
//                 <p className="mb-2">
//                   <span className="font-medium">Removed Date:</span> {drcData?.removed_dtm}
//                 </p>
//                 <p className="mb-2">
//                   <span className="font-medium">Case Transfer Date:</span> {drcData?.case_transfer_dtm}
//                 </p>
//                 <p className="mb-2">
//                   <span className="font-medium">Case Transferred By:</span> {drcData?.transferred_by}
//                 </p>
//                 <p className="mb-2">
//                   <span className="font-medium">Expired Date:</span> {drcData?.expire_dtm}
//                 </p>
//               </div>
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
//     </div>
//   );

//   const renderIncidentDetails = () => (
//     <div className={`${GlobalStyle.cardContainer} mt-4`}>
//       <h3 className="text-xl font-semibold mb-4">Incident Details</h3>
//       <div className="space-y-4">
//         <p className="text-gray-600">Incident information will be displayed here.</p>
//       </div>
//     </div>
//   );

//   const renderTabContent = () => {
//     if (loadingTab) {
//       return (
//         <div className="flex justify-center items-center p-8">
//           <div className="animate-pulse text-gray-500">Loading...</div>
//         </div>
//       );
//     }
//     return activeTab === "CaseDetails" ? renderCaseDetails() : renderIncidentDetails();
//   };

//   return (
//     <div className={GlobalStyle.fontPoppins}>
//       <div className="flex gap-4 mb-6">
//         <button
//           onClick={() => handleTabChange("CaseDetails")}
//           className={`px-4 py-2 transition-colors duration-200 ${
//             activeTab === "CaseDetails"
//               ? "border-b-2 border-blue-500 font-bold"
//               : "text-gray-500 hover:text-gray-700"
//           }`}
//         >
//           Case Details
//         </button>
//         <button
//           onClick={() => handleTabChange("IncidentDetails")}
//           className={`px-4 py-2 transition-colors duration-200 ${
//             activeTab === "IncidentDetails"
//               ? "border-b-2 border-blue-500 font-bold"
//               : "text-gray-500 hover:text-gray-700"
//           }`}
//         >
//           Incident Details
//         </button>
//       </div>

//       {renderTabContent()}

//       <div className={GlobalStyle.navButtonContainer}>
//         <button 
//           className={GlobalStyle.navButton}
//           onClick={handleBackClick}
//         >
//           <FaArrowLeft />
//         </button>
//         <button 
//           className={GlobalStyle.buttonPrimary}
//           onClick={handleDownloadClick}
//         >
//           Download
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CaseDetails;











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
