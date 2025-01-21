/*Purpose: This template is used for the 1.7.1-incident filter(open incidnet),1.7.2- (rejected incident),1.9-direct LOD and 1.7.3 Collect CPE
Created Date: 2025-01-07
Created By: Naflan (naflanm084@gmail.com)
Last Modified Date: 2025-01-09
Version: node 20
ui number : 1.7.1, 1.7.2, 1.9 and 1.7.3
Dependencies: tailwind css
Related Files: (routes)
Notes: The following page conatins the code for open incidnet,rejected incident,direct LOD and Collect CPE the UI's 
*/

// import React, { useState } from "react";
// import GlobalStyle from "../../assets/prototype/GlobalStyle";
// import { FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// const IncidentFilter = () => {
//   const [activeTab, setActiveTab] = useState("OpenIncidents");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [source, setSource] = useState("");
//   const [fromDate, setFromDate] = useState(null);
//   const [toDate, setToDate] = useState(null);
//   const [error, setError] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const rowsPerPage = 4;
  
//   const handleProceedAll = () => {
//     alert("Proceed All clicked");
//   };

//   // Data for Open Incidents
//   const openIncidents = [
//     { id: "RC001", Status: "0115678", accountNo: "Arrears Collect", action: "54,000", amount: "Open" },
//     { id: "RC002", Status: "8765946", accountNo: "Arrears Collect", action: "-", amount: "Open" },
//   ];
  

 

//   const renderTableContent = () => {
//     let dataToDisplay = [];
//     if (activeTab === "OpenIncidents") {
//       dataToDisplay = openIncidents;
//     } else if (activeTab === "RejectedIncidents") {
//       dataToDisplay = rejectedIncidents;
//     } else if (activeTab === "DirectLOD") {
//       dataToDisplay = directLODData;
//     } else if (activeTab === "CollectCPE") {
//       dataToDisplay = collectCPEData;
//     }

//     const indexOfLastRow = currentPage * rowsPerPage;
//     const indexOfFirstRow = indexOfLastRow - rowsPerPage;
//     const currentRows = dataToDisplay.slice(indexOfFirstRow, indexOfLastRow);

//     //Handle individual row checkbox change
//       const handleRowCheckboxChange = (caseId) => {
//         if (selectedRows.includes(caseId)) {
//           setSelectedRows(selectedRows.filter((id) => id !== caseId));
//         } else {
//           setSelectedRows([...selectedRows, caseId]);
//         }
//       };
      
//       const handleSelectAllDataChange = () => {
//         if (selectedRows.length === displayedData.length) {
//           setSelectedRows([]);
//         } else {
//           const allRowIds = displayedData.map((row) => row.id);
//           setSelectedRows(allRowIds);
//         }
//       };

//       {/* Reject function */}
//     // const handleReject = (id) => {
//     //   alert(`Reject clicked for ID: ${id}`);
//     // };
  
//     {/* Reject All function */}
//     // const handleRejectAll = () => {
//     //   alert('Reject All clicked');
//     // };

//     // move forward function
//     // const handleMoveForward = () => {
//     //     alert('Move Forward clicked');
//     // };

//     // Table structure for Direct LOD and Collect CPE tabs
//       return (
//         <>
//           {/* table */}
//           <div className={GlobalStyle.tableContainer}>
//             <table className={GlobalStyle.table}>
//               <thead className={GlobalStyle.thead}>
//                 <tr>
//                   <th className={GlobalStyle.tableHeader}></th>
//                   <th className={GlobalStyle.tableHeader}>ID</th>
//                   <th className={GlobalStyle.tableHeader}>Status</th>
//                   {activeTab === "DirectLOD" ? (
//                     <>
//                       <th className={GlobalStyle.tableHeader}>Account No</th>
//                       <th className={GlobalStyle.tableHeader}>Amount</th>
//                     </>
//                   ) : (
//                     <>
//                       <th className={GlobalStyle.tableHeader}>Account No</th>
//                       <th className={GlobalStyle.tableHeader}>Action</th>
//                     </>
//                   )}
//                   <th className={GlobalStyle.tableHeader}></th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentRows.map((row, index) => (
//                   <tr
//                     key={index}
//                     className={`${
//                       index % 2 === 0
//                         ? "bg-white bg-opacity-75"
//                         : "bg-gray-50 bg-opacity-50"
//                     } border-b`}
//                   >
//                     <td className={GlobalStyle.tableData}>
//                       <input
//                         type="checkbox"
//                         className="rounded-lg"
//                         checked={selectedRows.includes(row.id)}
//                         onChange={() => handleRowCheckboxChange(row.id)}
//                       />
//                     </td>
//                     <td className={GlobalStyle.tableData}>{row.id}</td>
//                     <td className={GlobalStyle.tableData}>{row.Status}</td>
//                     {activeTab === "DirectLOD" ? (
//                       <> 
//                         <td className={GlobalStyle.tableData}>{row.accountNo}</td>
//                         <td className={GlobalStyle.tableData}>{row.amount}</td>
//                       </>
//                     ) : (
//                       <>
//                         <td className={GlobalStyle.tableData}>{row.accountNo}</td>
//                         <td className={GlobalStyle.tableData}>{row.action}</td>
//                       </>
//                     )}
//                   </tr>
//                 ))}
//                 {currentRows.length === 0 && (
//                   <tr>
//                     <td colSpan="5" className="text-center py-4">
//                       No results found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </>
//       );   
//   };
//   const handleCreateTask = () => {
//     alert("Clicked create task and let me know!");
//   };
// }

import { useState } from "react";
import GlobalStyle from "../../assets/prototype/GlobalStyle";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function IncidentFilter() {
  const [error, setError] = useState(""); // for error message
  const [searchQuery, setSearchQuery] = useState(""); // for searching
  const [selectAllData, setSelectAllData] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
  const navigate = useNavigate();
  const rowsPerPage = 7;


  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const data = [
    {
      id : "RC001",
      status : "open no agent",
      account_number : "0115678",
      action : "arreas collect",
      amount : "54000",
      source_type :"pilot - suspended"
    },
    {
        id : "RC001",
        status : "open no agent",
        account_number : "0115678",
        action : "arreas collect",
        amount : "7000",
        source_type :"special"
    },
    {
        id : "RC001",
        status : "open no agent",
        account_number : "0115678",
        action : "arreas collect",
        amount : "5000",
        source_type :"product terminal"
    },
    {
        id : "RC001",
        status : "open no agent",
        account_number : "0115678",
        action : "arreas collect",
        amount : "4000",
        source_type :"pilot - suspended"
    },
    {
        id : "RC001",
        status : "open no agent",
        account_number : "0115678",
        action : "arreas collect",
        amount : "60000",
        source_type :"pilot - suspended"
    },
    {
        id : "RC001",
        status : "open no agent",
        account_number : "0115678",
        action : "arreas collect",
        amount : "54000",
        source_type :"pilot - suspended"
    },
    {
        id : "RC001",
        status : "open no agent",
        account_number : "0115678",
        action : "arreas collect",
        amount : "56000",
        source_type :"special"
    },
    {
        id : "RC001",
        status : "open no agent",
        account_number : "0115678",
        action : "arreas collect",
        amount : "54000",
        source_type :"pilot - suspended"
    },
    {
        id : "RC001",
        status : "open no agent",
        account_number : "0115678",
        action : "arreas collect",
        amount : "60000",
        source_type :"special"
    },
  ];

  const filteredData = data.filter((row) =>
    Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const navi = () => {
    navigate("/lod/ftl-log/preview");
  };

  const pages = Math.ceil(filteredData.length / rowsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const startIndex = currentPage * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handleRowCheckboxChange = (caseId) => {
    if (selectedRows.includes(caseId)) {
      setSelectedRows(selectedRows.filter((id) => id !== caseId));
    } else {
      setSelectedRows([...selectedRows, caseId]);
    }
  };

  const handleSelectAllDataChange = () => {
    if (selectAllData) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((row) => row.caseId));
    }
    setSelectAllData(!selectAllData);
  };


  return (  
    <>

<div className={`p-4 ${GlobalStyle.fontPoppins}`}>
    
<div className="flex justify-between items-center w-full">
  <h1 className={`${GlobalStyle.headingLarge} m-0`}>Incidents Open for Distribution</h1>
  <Link
    className={`${GlobalStyle.buttonPrimary}`}
    to="/lod/ftllod/ftllod/downloadcreateftllod"
  >
    Create task and let me know
  </Link>
</div>
      {/* case count Bar */}
      <div className={`${GlobalStyle.caseCountBar}`}>
        <div className="flex">
          <span className={GlobalStyle.countBarTopic}>Open Pending Cases</span>
        </div>
        <div className={GlobalStyle.countBarSubTopicContainer}>
          <div className={GlobalStyle.countBarMainBox}>
            <span>Total:</span>
            <p className={GlobalStyle.countBarMainTopic}>1259</p>
          </div>
          <div className={GlobalStyle.countBarSubBox}>
            <span>5,000 - 10,000</span>
            <p className={GlobalStyle.countBarSubTopic}>100</p>
          </div>
          <div className={GlobalStyle.countBarSubBox}>
            <span>10,000 - 25,000</span>
            <p className={GlobalStyle.countBarSubTopic}>250</p>
          </div>
          <div className={GlobalStyle.countBarSubBox}>
            <span>25,000 - 50,000</span>
            <p className={GlobalStyle.countBarSubTopic}>800</p>
          </div>
          <div className={GlobalStyle.countBarSubBox}>
            <span>50,000 - 100,000</span>
            <p className={GlobalStyle.countBarSubTopic}>61</p>
          </div>
          <div className={GlobalStyle.countBarSubBox}>
            <span>&gt; 100,000</span>
            <p className={GlobalStyle.countBarSubTopic}>98</p>
          </div>
        </div>
      </div>
</div>

<div className="flex flex-col">
        {/* Search Bar Section */}
        <div className="mb-4 flex justify-start">
          <div className={GlobalStyle.searchBarContainer}>
            <input
              type="text"
              placeholder=""
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={GlobalStyle.inputSearch}
            />
            <FaSearch className={GlobalStyle.searchBarIcon} />
          </div>
        </div>

        {/* table */}
        <div className={GlobalStyle.tableContainer}>
          <table className={GlobalStyle.table}>
            <thead className={GlobalStyle.thead}>
              <tr>
                <th scope="col" className={GlobalStyle.tableHeader}></th>
                <th scope="col" className={GlobalStyle.tableHeader}>
                  ID
                </th>
                <th scope="col" className={GlobalStyle.tableHeader}>
                  Status
                </th>
                <th scope="col" className={GlobalStyle.tableHeader}>
                  Account No
                </th>
                <th scope="col" className={GlobalStyle.tableHeader}>
                  Action
                </th>
                <th scope="col" className={GlobalStyle.tableHeader}>
                  Amount
                </th>
                <th scope="col" className={GlobalStyle.tableHeader}>
                  Source Type
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0
                      ? "bg-white bg-opacity-75"
                      : "bg-gray-50 bg-opacity-50"
                  } border-b`}
                >
                  <td className={GlobalStyle.tableData}>
                    <input
                      type="checkbox"
                      className={"rounded-lg"}
                      checked={selectedRows.includes(row.caseId)}
                      onChange={() => handleRowCheckboxChange(row.caseId)}
                    />
                  </td>
                  <td className={GlobalStyle.tableData}>
                    <a href={`#${row.id}`} className="hover:underline">
                      {row.id}
                    </a>
                  </td>
                  <td className={GlobalStyle.tableData}>{row.status}</td>
                  <td className={GlobalStyle.tableData}>{row.account_number}</td>
                  <td className={GlobalStyle.tableData}>{row.action}</td>
                  <td className={GlobalStyle.tableData}>{row.amount}</td>
                  <td className={GlobalStyle.tableData}>{row.source_type}</td>
                  
                </tr>
              ))}
              {paginatedData.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          
          </div>

          <div className="flex justify-end items-center w-full mt-6">
        {/* Select All Data Checkbox */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="rounded-lg"
            checked={selectAllData}
            onChange={handleSelectAllDataChange}
          />
          Select All
        </label>

        <Link
          className={`${GlobalStyle.buttonPrimary} ml-4`}
          to="/lod/ftllod/ftllod/downloadcreateftllod"
        >
          Proceed
        </Link>
      </div>
          </div>
    </>
  );    
}   