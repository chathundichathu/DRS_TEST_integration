// import { useState } from "react";
// import GlobalStyle from "../../assets/prototype/GlobalStyle";
// import { FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa";

// const RTomEditDetails = () => {
//   const [showPopup, setShowPopup] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [telephoneno, setTelephoneNo] = useState("");
//   const [faxno, setFaxNo] = useState("");
//   const [currentPage, setCurrentPage] = useState(0);
//   const [checkboxStatus, setCheckboxStatus] = useState(true);
//   const rowsPerPage = 7;

//   const dummyData = {
//     addeddate: "12/01/2024",
//     rtomname: "RTOM Name",
//     abbreviation: "200045608621",
//     telephoneno: "",
//     faxno: "",
//   };

//   const logHistoryData = [
//     { editOn: "01/01/2024", action: "Added new RTOM Area", editBy: "Damithri" },
//     { editOn: "02/01/2024", action: "Disabled RO", editBy: "Saniru" },
//   ];

//   const filteredLogHistory = logHistoryData.filter((row) =>
//     Object.values(row)
//       .join(" ")
//       .toLowerCase()
//       .includes(searchQuery.toLowerCase())
//   );

//   const pages = Math.ceil(filteredLogHistory.length / rowsPerPage);
//   const startIndex = currentPage * rowsPerPage;
//   const endIndex = startIndex + rowsPerPage;
//   const paginatedLogHistory = filteredLogHistory.slice(startIndex, endIndex);

//   const handlePrevPage = () => {
//     if (currentPage > 0) setCurrentPage(currentPage - 1);
//   };

//   const handleNextPage = () => {
//     if (currentPage < pages - 1) setCurrentPage(currentPage + 1);
//   };

//   const handleSaveClick = () => {
//     if (!telephoneno || !faxno) {
//       alert("Please fill in all required fields.");
//       return;
//     }
//     alert("Form submitted successfully!");
//     console.log("Data saved:", {
//       telephoneno,
//       faxno,
//     });
//   };

//   const handleCheckboxChange = () => {
//     setCheckboxStatus(!checkboxStatus);
//   };

//   return (
//     <div className={GlobalStyle.fontPoppins}>
//       <div className={`${GlobalStyle.headingLarge} mb-4`}>
//         <span> RTOM Edit Details </span>
//       </div>

//       <div className="flex w-full justify-center">
        
//         <div className={`${GlobalStyle.cardContainer} p-4`}>
//         <div className="relative mb-10">
//             <div className="mb-2 text-end">
//               <span>{checkboxStatus ? "Enabled" : "Disabled"}</span>
//             </div>
//             <label className="absolute top-8 right-2 inline-flex items-center cursor-pointer">
//               <input
//                 type="checkbox"
//                 className="sr-only peer"
//                 onChange={handleCheckboxChange}
//               />
//               <div className="w-11 h-6 bg-green-600 rounded-full peer peer-focus:ring-4 peer-focus:ring-green-300 peer-checked:bg-red-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
//             </label>
//           </div>
//           <table className="mb-4 w-full">
//             <tbody>
//               <tr>
//                 <td>
//                   <label className={`${GlobalStyle.headingMedium}`}>Added Date</label>
//                 </td>
//                 <td> : </td>
//                 <td>
//                   <label>{dummyData.addeddate}</label>
//                 </td>
//               </tr>
//               <tr>
//                 <td>
//                   <label className={`${GlobalStyle.headingMedium}`}>RTOM Name</label>
//                 </td>
//                 <td> : </td>
//                 <td>
//                   <label>{dummyData.rtomname}</label>
//                 </td>
//               </tr>
//               <tr>
//                 <td>
//                   <label className={`${GlobalStyle.headingMedium}`}>Abbreviation</label>
//                 </td>
//                 <td> : </td>
//                 <td>
//                   <label>{dummyData.abbreviation}</label>
//                 </td>
//               </tr>
//               <tr>
//                 <td>
//                   <label className={`${GlobalStyle.headingMedium}`}>Telephone No</label>
//                 </td>
//                 <td> : </td>
//                 <td>
//                   <input
//                     type="text"
//                     className={`${GlobalStyle.inputText}`}
//                     value={telephoneno}
//                     onChange={(e) => setTelephoneNo(e.target.value)}
//                   />
//                 </td>
//               </tr>
//               <tr>
//                 <td>
//                   <label className={`${GlobalStyle.headingMedium}`}>Fax No</label>
//                 </td>
//                 <td> : </td>
//                 <td>
//                   <input
//                     type="text"
//                     className={`${GlobalStyle.inputText}`}
//                     value={faxno}
//                     onChange={(e) => setFaxNo(e.target.value)}
//                   />
//                 </td>
//               </tr>
//             </tbody>
//           </table>

//           {/* Save Button */}
//           <div className="flex justify-end items-center">
//             <button
//               className={`${GlobalStyle.buttonPrimary} ml-auto`}
//               onClick={handleSaveClick}
//             >
//               Save
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-col">
//         {/* Log History Button */}
//         <div className="flex justify-start">
//           <button
//             className={`${GlobalStyle.buttonPrimary}`}
//             onClick={() => setShowPopup(true)}
//           >
//             Log History
//           </button>
//         </div>
//       </div>

//       {showPopup && (
//         <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-md shadow-lg w-3/4">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-bold">Log History</h2>
//               <button
//                 className="text-red-500 text-lg font-bold"
//                 onClick={() => setShowPopup(false)}
//               >
//                 ×
//               </button>
//             </div>
//             <div>
//               <div className="mb-4 flex justify-start">
//                 <div className={GlobalStyle.searchBarContainer}>
//                   <input
//                     type="text"
//                     placeholder=""
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className={GlobalStyle.inputSearch}
//                   />
//                   <FaSearch className={GlobalStyle.searchBarIcon} />
//                 </div>
//               </div>
//               <div className={GlobalStyle.tableContainer}>
//                 <table className={GlobalStyle.table}>
//                   <thead className={GlobalStyle.thead}>
//                     <tr>
//                       <th className={GlobalStyle.tableHeader}>Edit On</th>
//                       <th className={GlobalStyle.tableHeader}>Action</th>
//                       <th className={GlobalStyle.tableHeader}>Edit By</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {paginatedLogHistory.map((row, index) => (
//                       <tr
//                         key={index}
//                         className={`${
//                           index % 2 === 0
//                             ? "bg-white bg-opacity-75"
//                             : "bg-gray-50 bg-opacity-50"
//                         } border-b`}
//                       >
//                         <td className={GlobalStyle.tableData}>{row.editOn}</td>
//                         <td className={GlobalStyle.tableData}>{row.action}</td>
//                         <td className={GlobalStyle.tableData}>{row.editBy}</td>
//                       </tr>
//                     ))}
//                     {paginatedLogHistory.length === 0 && (
//                       <tr>
//                         <td colSpan="3" className="text-center py-4">
//                           No results found
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//               {filteredLogHistory.length > rowsPerPage && (
//                 <div className={GlobalStyle.navButtonContainer}>
//                   <button
//                     className={GlobalStyle.navButton}
//                     onClick={handlePrevPage}
//                     disabled={currentPage === 0}
//                   >
//                     <FaArrowLeft />
//                   </button>
//                   <span>
//                     Page {currentPage + 1} of {pages}
//                   </span>
//                   <button
//                     className={GlobalStyle.navButton}
//                     onClick={handleNextPage}
//                     disabled={currentPage === pages - 1}
//                   >
//                     <FaArrowRight />
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RTomEditDetails;

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import GlobalStyle from "../../assets/prototype/GlobalStyle";
import { getRTOMDetailsById, updateRTOMDetails } from "../../services/rtom/RtomService";

const RTomEditDetails = () => {
  const { rtomId } = useParams();
  const [telephoneNo, setTelephoneNo] = useState("");
  const [faxNo, setFaxNo] = useState("");
  const [remark, setRemark] = useState("");
  const [checkboxStatus, setCheckboxStatus] = useState(true);
  const [rtomDetails, setRtomDetails] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await getRTOMDetailsById(rtomId);
  
          const formattedDetails = {
            areaName: data.area_name || "N/A",
            rtomAbbreviation: data.rtom_abbreviation || "N/A",
            addedDate: data.created_dtm || "N/A",
            telephoneNo: data.rtom_contact_number || "",
            faxNo: data.rtom_fax_number || "",
            status: data.rtom_status === "Active" ? "Enabled" : "Disabled", // Convert to toggle-compatible status
          };
  
          setRtomDetails(formattedDetails);
          setTelephoneNo(formattedDetails.telephoneNo);
          setFaxNo(formattedDetails.faxNo);
          setCheckboxStatus(formattedDetails.status === "Enabled");
          setLoading(false);
        } catch (error) {
          setError("Failed to fetch RTOM details. Please try again later.",error.message);
          setLoading(false);
        }
      };
  
      fetchData();
    }, [rtomId]);


  const handleSaveClick = async () => {
    if (!telephoneNo || !faxNo || !remark) {
      alert("Please fill in all required fields.");
      return;
    }
  
    const rtom_status = checkboxStatus ? "Active" : "Inactive";
    const reason = remark; // Use remark as the reason
  
    try {
      const response = await updateRTOMDetails(rtomId, rtom_status, telephoneNo, faxNo, reason);
  
      if (response.status === "success") {
        alert("RTOM details updated successfully!");
        console.log("Data saved:", { telephoneNo, rtom_status, faxNo, remark });
        // Optionally, reload the page or refetch data
      } else {
        alert(response.message || "Failed to update RTOM details.");
      }
    } catch (error) {
      console.error("Error while updating RTOM details:", error);
      alert("An error occurred. Please try again later.");
    }
  };
  

  const handleCheckboxChange = () => {
    setCheckboxStatus(!checkboxStatus);
  };

  {error && (
    <div className="text-red-500 text-center mb-4">
      <p>{error}</p>
    </div>
  )}

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className={GlobalStyle.fontPoppins}>
      <div className={`${GlobalStyle.headingLarge} mb-4`}>
        <span> RTOM Edit Details - {rtomDetails.areaName} </span>
      </div>

      <div className="flex w-full justify-center">
        
        <div className={`${GlobalStyle.cardContainer} p-4`}>
          <div className="relative mb-10">
            <div className="mb-2 text-end">
              <span>{checkboxStatus ? "Enabled" : "Disabled"}</span>
            </div>
            <label className="absolute top-8 right-2 inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={checkboxStatus}
                onChange={handleCheckboxChange}
              />
              <div className="w-11 h-6 bg-red-600 rounded-full peer peer-focus:ring-4 peer-focus:ring-green-300 peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>
          <table className="mb-4 w-full">
            <tbody>
              <tr>
                <td>
                  <label className={`${GlobalStyle.headingMedium}`}>Added Date</label>
                </td>
                <td> : </td>
                <td>
                  <label>{rtomDetails.addedDate}</label>
                </td>
              </tr>
              <tr>
                <td>
                  <label className={`${GlobalStyle.headingMedium}`}>RTOM Name</label>
                </td>
                <td> : </td>
                <td>
                  <label>{rtomDetails.areaName}</label>
                </td>
              </tr>
              <tr>
                <td>
                  <label className={`${GlobalStyle.headingMedium}`}>Abbreviation</label>
                </td>
                <td> : </td>
                <td>
                  <label>{rtomDetails.rtomAbbreviation}</label>
                </td>
              </tr>
              <tr>
                <td>
                  <label className={`${GlobalStyle.headingMedium}`}>Telephone No</label>
                </td>
                <td> : </td>
                <td>
                  <input
                    type="text"
                    className={`${GlobalStyle.inputText}`}
                    value={telephoneNo}
                    onChange={(e) => setTelephoneNo(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label className={`${GlobalStyle.headingMedium}`}>Fax No</label>
                </td>
                <td> : </td>
                <td>
                  <input
                    type="text"
                    className={`${GlobalStyle.inputText}`}
                    value={faxNo}
                    onChange={(e) => setFaxNo(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label className={`${GlobalStyle.headingMedium}`}>Remark</label>
                </td>
                <td> : </td>
                <td>
                  <textarea
                    type="text"
                    className={`${GlobalStyle.inputText}`}
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          {/* Save Button */}
          <div className="flex justify-end items-center">
            <button
              className={`${GlobalStyle.buttonPrimary} ml-auto`}
              onClick={handleSaveClick}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RTomEditDetails;
