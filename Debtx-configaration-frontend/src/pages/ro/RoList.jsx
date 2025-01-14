// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa";
// import GlobalStyle from "../../assets/prototype/GlobalStyle";
// import more_info from "../../assets/images/more-info.svg";
// import activeIcon from "../../assets/images/active.svg";
// import deactiveIcon from "../../assets/images/deactive.svg";
// import user_add from "../../assets/images/user-add.svg"

// const ROList = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(0);
//   const [status, setStatus] = useState("");
//   const [drc, setDrc] = useState("");
//   const [appliedFilters, setAppliedFilters] = useState({ status: "", drc: "" });

//   const rowsPerPage = 7;

//   // Dummy data for dropdown
//   const statuses = ["Active", "Inactive"];
//   const drcs = ["company 1", "company 2"];

//   // Dummy data for table
//   const roData = [
//     {
//       roId: "0001",
//       status: "Active",
//       drc_name: "company 1",
//       roName: "W.M. Wimalasiri",
//       contactNo: "0112345678",
//       rtomAreaCount: 6,
//     },
//     {
//       roId: "0002",
//       status: "Inactive",
//       drc_name: "company 2",
//       roName: "R.A. Siripala",
//       contactNo: "0112345678",
//       rtomAreaCount: 0,
//     },
//   ];

//   // Function to filter and search data
//   const filteredData = roData.filter((row) => {
//     const matchesSearchQuery = Object.values(row)
//       .join(" ")
//       .toLowerCase()
//       .includes(searchQuery.toLowerCase());
//     const matchesStatus =
//       !appliedFilters.status || row.status === appliedFilters.status;
//     const matchesDrc =
//       !appliedFilters.drc || row.drc_name === appliedFilters.drc;

//     return matchesSearchQuery && matchesStatus && matchesDrc;
//   });

//   const pages = Math.ceil(filteredData.length / rowsPerPage);

//   const handlePrevPage = () => {
//     if (currentPage > 0) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handleNextPage = () => {
//     if (currentPage < pages - 1) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handleFilter = () => {
//     setAppliedFilters({ status, drc });
//     setCurrentPage(0);
//   };

//   const startIndex = currentPage * rowsPerPage;
//   const endIndex = startIndex + rowsPerPage;
//   const paginatedData = filteredData.slice(startIndex, endIndex);

//   return (
//     <div className={GlobalStyle.fontPoppins}>
//       <div className="flex justify-between items-center mb-8">
//         <h1 className={`${GlobalStyle.headingLarge}`}>RO List</h1>
//         <Link to="/config/add-ro">
//           <button>
//             <img src={user_add} title="Add RO" className="w-8 h-8" />
//           </button>
//         </Link>
//       </div>

//       {/* Drop Down section */}
//       <div className="flex flex-col">
//         <div className="mb-10 flex justify-end">
//           <div className="flex gap-4">
//             <select
//               value={status}
//               onChange={(e) => setStatus(e.target.value)}
//               className={GlobalStyle.selectBox}
//             >
//               <option value="">Select Status</option>
//               {statuses.map((statusOption, index) => (
//                 <option key={index} value={statusOption}>
//                   {statusOption}
//                 </option>
//               ))}
//             </select>

//             <select
//               value={drc}
//               onChange={(e) => setDrc(e.target.value)}
//               className={GlobalStyle.selectBox}
//             >
//               <option value="">Select DRC</option>
//               {drcs.map((drcOption, index) => (
//                 <option key={index} value={drcOption}>
//                   {drcOption}
//                 </option>
//               ))}
//             </select>

//             <button
//               onClick={handleFilter}
//               className={`${GlobalStyle.buttonPrimary} flex items-center gap-2`}
//             >
//               Filter
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Table Section */}
//       <div className="flex flex-col">
//         {/* SearchBar */}
//         <div className="mb-4 flex justify-start">
//           <div className={GlobalStyle.searchBarContainer}>
//             <input
//               type="text"
//               placeholder=""
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className={GlobalStyle.inputSearch}
//             />
//             <FaSearch className={GlobalStyle.searchBarIcon} />
//           </div>
//         </div>
//         <div className={GlobalStyle.tableContainer}>
//           <table className={GlobalStyle.table}>
//             <thead className={GlobalStyle.thead}>
//               <tr>
//                 <th scope="col" className={GlobalStyle.tableHeader}>
//                   RO ID
//                 </th>
//                 <th scope="col" className={GlobalStyle.tableHeader}>
//                   STATUS
//                 </th>
//                 <th scope="col" className={GlobalStyle.tableHeader}>
//                   DRC Name
//                 </th>
//                 <th scope="col" className={GlobalStyle.tableHeader}>
//                   RO NAME
//                 </th>
//                 <th scope="col" className={GlobalStyle.tableHeader}>
//                   Contact No.
//                 </th>
//                 <th scope="col" className={GlobalStyle.tableHeader}>
//                   RTOM Area count
//                 </th>
//                 <th scope="col" className={GlobalStyle.tableHeader}></th>
//               </tr>
//             </thead>
//             <tbody>
//               {paginatedData.map((ro, index) => (
//                 <tr
//                   key={ro.roId}
//                   className={`${
//                     index % 2 === 0
//                       ? "bg-white bg-opacity-75"
//                       : "bg-gray-50 bg-opacity-50"
//                   } border-b`}
//                 >
//                   <td className={GlobalStyle.tableData}>{ro.roId}</td>
//                   <td className={GlobalStyle.tableData}>
//                     <div className="flex items-center justify-center gap-2">
//                       <img
//                         src={ro.status === "Active" ? activeIcon : deactiveIcon}
//                         alt={ro.status}
//                         className="w-5 h-5"
//                         title={ro.status === "Active" ? "Active" : "Deactive"}
//                       />
//                     </div>
//                   </td>

//                   <td className={GlobalStyle.tableData}>{ro.drc_name}</td>
//                   <td className={GlobalStyle.tableData}>{ro.roName}</td>
//                   <td className={GlobalStyle.tableData}>{ro.contactNo}</td>
//                   <td className={GlobalStyle.tableData}>{ro.rtomAreaCount}</td>
//                   <td className={GlobalStyle.tableData}>
//                     <div className="flex gap-4 items-center">
//                       <Link to="/config/ro-details">
//                         <img
//                           src={more_info}
//                           title="More Info"
//                           className="w-6 h-6"
//                         />
//                       </Link>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//               {paginatedData.length === 0 && (
//                 <tr>
//                   <td colSpan="7" className="text-center py-4">
//                     No results found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Navigation Button */}
//       {filteredData.length > rowsPerPage && (
//         <div className={GlobalStyle.navButtonContainer}>
//           <button
//             className={GlobalStyle.navButton}
//             onClick={handlePrevPage}
//             disabled={currentPage === 0}
//           >
//             <FaArrowLeft />
//           </button>
//           <span>
//             Page {currentPage + 1} of {pages}
//           </span>
//           <button
//             className={GlobalStyle.navButton}
//             onClick={handleNextPage}
//             disabled={currentPage === pages - 1}
//           >
//             <FaArrowRight />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ROList;


// Working code 1

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa";
// import GlobalStyle from "../../assets/prototype/GlobalStyle";
// import { fetchRODetails, fetchRODataByDRC } from "../../services/Ro/RO";
// import activeIcon from "../../assets/images/active.svg";
// import deactiveIcon from "../../assets/images/deactive.svg";
// import more_info from "../../assets/images/more-info.svg";
// import user_add from "../../assets/images/user-add.svg";

// const ROList = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(0);
//   const [status, setStatus] = useState("");
//   const [drc, setDrc] = useState("");
//   const [appliedFilters, setAppliedFilters] = useState({ status: "", drc: "" });
//   const [roData, setRoData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [selectedDRC, setSelectedDRC] = useState(""); // Tracks selected DRC
//   const [requestDrcId, setRequestDrcId] = useState(null); // Default to fetch all recovery officers

//   const rowsPerPage = 7;

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       setError(null);

//       try {
//         // Fetch RO data based on filters
//         if (requestDrcId) {
//           const data = await fetchRODataByDRC(requestDrcId); // Replace with actual API logic for filtering by DRC
//           setRoData(data);
//         } else {
//           const data = await fetchRODetails(); // Replace with API call to fetch all RO details
//           setRoData(data);
//         }
//       } catch (err) {
//         setError(err.message || "Error fetching data");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, [requestDrcId]); // Refetch when the DRC changes

//     // Helper to get the last status of the recovery officer
//     const getLastStatus = (statusArray) => {
//       if (Array.isArray(statusArray) && statusArray.length > 0) {
//         return statusArray[statusArray.length - 1].status; // Get the last status
//       }
//       return "Unknown"; // Default if no status
//     };

//   const filteredData = roData.filter((row) => {
//     const matchesSearchQuery = Object.values(row)
//       .join(" ")
//       .toLowerCase()
//       .includes(searchQuery.toLowerCase());
//     const matchesStatus =
//       // !appliedFilters.status || row.status === appliedFilters.status;
//       status === "" ||
//       getLastStatus(row.ro_status).toLowerCase() === status.toLowerCase();
//     const matchesDrc =
//       !appliedFilters.selectedDRC || row.drc_name === appliedFilters.selectedDRC;

//     return matchesSearchQuery && matchesStatus && matchesDrc;
//   });

//   const handleFilter = () => {
//     setAppliedFilters({ status, selectedDRC });
//     setCurrentPage(0);
//   };

//   const pages = Math.ceil(filteredData.length / rowsPerPage);
//   const startIndex = currentPage * rowsPerPage;
//   const endIndex = startIndex + rowsPerPage;
//   const paginatedData = filteredData.slice(startIndex, endIndex);

//   const handlePrevPage = () => {
//     if (currentPage > 0) setCurrentPage(currentPage - 1);
//   };

//   const handleNextPage = () => {
//     if (currentPage < pages - 1) setCurrentPage(currentPage + 1);
//   };

//     // Handle Status dropdown
//     const handleStatusChange = (status) => {
//       setStatus(status || ""); // Update selected status
//       setCurrentPage(0); // Reset pagination
//     };

//   // Handle DRC selection
//   const handleDRCChange = (drcId, drcName) => {
//     setRequestDrcId(drcId || null); // If drcId is null, fetch all recovery officers
//     setSelectedDRC(drcName || ""); // Update selected DRC name
//     setCurrentPage(0); // Reset pagination
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className={GlobalStyle.fontPoppins}>
//       <div className="flex justify-between items-center mb-8">
//         <h1 className={GlobalStyle.headingLarge}>RO List</h1>
//         <Link to="/config/add-ro">
//           <button>
//             <img src={user_add} title="Add RO" className="w-8 h-8" />
//           </button>
//         </Link>
//       </div>

//       {/* Filters */}
//       <div className="flex flex-col mb-10">
//         <div className="flex gap-4 justify-end">
//           <select
//             value={status}
//             onChange={(e) => handleStatusChange(e.target.value)}
//             className={GlobalStyle.selectBox}
//           >
//             <option value="">Select Status</option>
//             <option value="Active">Active</option>
//             <option value="Inactive">Inactive</option>
//           </select>

//           <select
//             value={selectedDRC}
//             onChange={(e) => {
//               const selectedOption = e.target.options[e.target.selectedIndex];
//               handleDRCChange(
//                 Number(selectedOption.value) || null, // Pass DRC ID or null
//                 selectedOption.text // Pass DRC name
//               );
//             }}
//             className={GlobalStyle.selectBox}
//           >
//             <option value="">Select DRC</option>
//             {/* Replace with dynamic DRC data */}
//             <option value={10}>Example Company</option>
//             <option value={11}>Mobitel</option>
//           </select>

//           <button
//             onClick={handleFilter}
//             className={`${GlobalStyle.buttonPrimary} flex items-center gap-2`}
//           >
//             Filter
//           </button>
//         </div>
//       </div>

//       {/* Search Bar */}
//       <div className="mb-4 flex justify-start">
//         <div className={GlobalStyle.searchBarContainer}>
//           <input
//             type="text"
//             placeholder="Search"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className={GlobalStyle.inputSearch}
//           />
//           <FaSearch className={GlobalStyle.searchBarIcon} />
//         </div>
//       </div>

//       {/* Table */}
//       <div className={GlobalStyle.tableContainer}>
//         <table className={GlobalStyle.table}>
//           <thead className={GlobalStyle.thead}>
//             <tr>
//               <th scope="col" className={GlobalStyle.tableHeader}>RO ID</th>
//               <th scope="col" className={GlobalStyle.tableHeader}>Status</th>
//               <th scope="col" className={GlobalStyle.tableHeader}>DRC Name</th>
//               <th scope="col" className={GlobalStyle.tableHeader}>RO Name</th>
//               <th scope="col" className={GlobalStyle.tableHeader}>Contact No.</th>
//               <th scope="col" className={GlobalStyle.tableHeader}>RTOM Area count</th>
//               <th scope="col" className={GlobalStyle.tableHeader}></th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedData.map((ro, index) => (
//               <tr key={ro.ro_id} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} border-b`}>
//                 <td className={GlobalStyle.tableData}>{ro.ro_id}</td>
//                 <td className={GlobalStyle.tableData}>
//                   <div className="flex items-center justify-center gap-2">
//                     <img
//                       src={getLastStatus(ro.ro_status) === "Active" ? activeIcon : deactiveIcon}
//                       alt={getLastStatus(ro.ro_status)}
//                       className="w-5 h-5"
//                       title={getLastStatus(ro.ro_status)}
//                     />
//                   </div>
//                 </td>
//                 <td className={GlobalStyle.tableData}>{ro.drc_name}</td>
//                 <td className={GlobalStyle.tableData}>{ro.ro_name}</td>
//                 <td className={GlobalStyle.tableData}>{ro.ro_contact_no}</td>
//                 <td className={GlobalStyle.tableData}>{ro.rtoms_for_ro?.length || 0}</td>
//                 <td className={GlobalStyle.tableData}>
//                   <div className="flex gap-4">
//                     <Link to="/config/ro-details">
//                       <img src={more_info} alt="More Info" className="w-6 h-6" />
//                     </Link>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//             {paginatedData.length === 0 && (
//               <tr>
//                 <td colSpan="6" className="text-center py-4">
//                   No results found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       {filteredData.length > rowsPerPage && (
//         <div className={GlobalStyle.navButtonContainer}>
//           <button className={GlobalStyle.navButton} onClick={handlePrevPage} disabled={currentPage === 0}>
//             <FaArrowLeft />
//           </button>
//           <span>
//             Page {currentPage + 1} of {pages}
//           </span>
//           <button className={GlobalStyle.navButton} onClick={handleNextPage} disabled={currentPage === pages - 1}>
//             <FaArrowRight />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ROList;


//working code 2


// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa";
// import GlobalStyle from "../../assets/prototype/GlobalStyle";
// import { fetchRODetails, fetchRODataByDRC } from "../../services/Ro/RO";
// import activeIcon from "../../assets/images/active.svg";
// import deactiveIcon from "../../assets/images/deactive.svg";
// import more_info from "../../assets/images/more-info.svg";
// import user_add from "../../assets/images/user-add.svg";

// const ROList = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(0);
//   const [status, setStatus] = useState("");
//   const [drc, setDrc] = useState("");
//   const [appliedFilters, setAppliedFilters] = useState({ status: "", drc: "" });
//   const [roData, setRoData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [selectedDRC, setSelectedDRC] = useState(""); // Tracks selected DRC
//   const [requestDrcId, setRequestDrcId] = useState(null); // Default to fetch all recovery officers

//   const rowsPerPage = 7;

//   // Example DRC Areas Array
//   const drcAreas = [
//     { drc_id: 10, drc_name: "Example Company" },
//     { drc_id: 11, drc_name: "Mobitel" },
//     { drc_id: 12, drc_name: "Dialog" },
//     { drc_id: 13, drc_name: "Hutch" }
//   ];

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       setError(null);

//       try {
//         // Fetch RO data based on filters
//         if (requestDrcId) {
//           const data = await fetchRODataByDRC(requestDrcId); // Replace with actual API logic for filtering by DRC
//           setRoData(data);
//         } else {
//           const data = await fetchRODetails(); // Replace with API call to fetch all RO details
//           setRoData(data);
//         }
//       } catch (err) {
//         setError(err.message || "Error fetching data");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, [requestDrcId]); // Refetch when the DRC changes

//   // Helper to get the last status of the recovery officer
//   const getLastStatus = (statusArray) => {
//     if (Array.isArray(statusArray) && statusArray.length > 0) {
//       return statusArray[statusArray.length - 1].status; // Get the last status
//     }
//     return "Unknown"; // Default if no status
//   };

//   const filteredData = roData.filter((row) => {
//     const matchesSearchQuery = Object.values(row)
//       .join(" ")
//       .toLowerCase()
//       .includes(searchQuery.toLowerCase());
//     const matchesStatus =
//       status === "" ||
//       getLastStatus(row.ro_status).toLowerCase() === status.toLowerCase();
//     const matchesDrc =
//       !appliedFilters.selectedDRC || row.drc_name === appliedFilters.selectedDRC;

//     return matchesSearchQuery && matchesStatus && matchesDrc;
//   });

//   const handleFilter = () => {
//     setAppliedFilters({ status, selectedDRC });
//     setCurrentPage(0);
//   };

//   const pages = Math.ceil(filteredData.length / rowsPerPage);
//   const startIndex = currentPage * rowsPerPage;
//   const endIndex = startIndex + rowsPerPage;
//   const paginatedData = filteredData.slice(startIndex, endIndex);

//   const handlePrevPage = () => {
//     if (currentPage > 0) setCurrentPage(currentPage - 1);
//   };

//   const handleNextPage = () => {
//     if (currentPage < pages - 1) setCurrentPage(currentPage + 1);
//   };

//   // Handle Status dropdown
//   const handleStatusChange = (status) => {
//     setStatus(status || ""); // Update selected status
//     setCurrentPage(0); // Reset pagination
//   };

//   // Handle DRC selection
//   const handleDRCChange = (drcId, drcName) => {
//     setRequestDrcId(drcId || null); // If drcId is null, fetch all recovery officers
//     setSelectedDRC(drcName || ""); // Update selected DRC name
//     setCurrentPage(0); // Reset pagination
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className={GlobalStyle.fontPoppins}>
//       <div className="flex justify-between items-center mb-8">
//         <h1 className={GlobalStyle.headingLarge}>RO List</h1>
//         <Link to="/config/add-ro">
//           <button>
//             <img src={user_add} title="Add RO" className="w-8 h-8" />
//           </button>
//         </Link>
//       </div>

//       {/* Filters */}
//       <div className="flex flex-col mb-10">
//         <div className="flex gap-4 justify-end">
//           <select
//             value={status}
//             onChange={(e) => handleStatusChange(e.target.value)}
//             className={GlobalStyle.selectBox}
//           >
//             <option value="">Select Status</option>
//             <option value="Active">Active</option>
//             <option value="Inactive">Inactive</option>
//           </select>

//           <select
//             value={selectedDRC}
//             onChange={(e) => {
//               const selectedOption = e.target.options[e.target.selectedIndex];
//               handleDRCChange(
//                 Number(selectedOption.value) || null, // Pass DRC ID or null
//                 selectedOption.text // Pass DRC name
//               );
//             }}
//             className={GlobalStyle.selectBox}
//           >
//             <option value="">Select DRC</option>
//             {drcAreas.map((drc) => (
//               <option key={drc.drc_id} value={drc.drc_name}>
//                 {drc.drc_name}
//               </option>
//             ))}
//           </select>

//           <button
//             onClick={handleFilter}
//             className={`${GlobalStyle.buttonPrimary} flex items-center gap-2`}
//           >
//             Filter
//           </button>
//         </div>
//       </div>

//       {/* Search Bar */}
//       <div className="mb-4 flex justify-start">
//         <div className={GlobalStyle.searchBarContainer}>
//           <input
//             type="text"
//             placeholder="Search"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className={GlobalStyle.inputSearch}
//           />
//           <FaSearch className={GlobalStyle.searchBarIcon} />
//         </div>
//       </div>

//       {/* Table */}
//       <div className={GlobalStyle.tableContainer}>
//         <table className={GlobalStyle.table}>
//           <thead className={GlobalStyle.thead}>
//             <tr>
//               <th scope="col" className={GlobalStyle.tableHeader}>RO ID</th>
//               <th scope="col" className={GlobalStyle.tableHeader}>Status</th>
//               <th scope="col" className={GlobalStyle.tableHeader}>DRC Name</th>
//               <th scope="col" className={GlobalStyle.tableHeader}>RO Name</th>
//               <th scope="col" className={GlobalStyle.tableHeader}>Contact No.</th>
//               <th scope="col" className={GlobalStyle.tableHeader}>RTOM Area count</th>
//               <th scope="col" className={GlobalStyle.tableHeader}></th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedData.map((ro, index) => (
//               <tr key={ro.ro_id} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} border-b`}>
//                 <td className={GlobalStyle.tableData}>{ro.ro_id}</td>
//                 <td className={GlobalStyle.tableData}>
//                   <div className="flex items-center justify-center gap-2">
//                     <img
//                       src={getLastStatus(ro.ro_status) === "Active" ? activeIcon : deactiveIcon}
//                       alt={getLastStatus(ro.ro_status)}
//                       className="w-5 h-5"
//                       title={getLastStatus(ro.ro_status)}
//                     />
//                   </div>
//                 </td>
//                 <td className={GlobalStyle.tableData}>{ro.drc_name}</td>
//                 <td className={GlobalStyle.tableData}>{ro.ro_name}</td>
//                 <td className={GlobalStyle.tableData}>{ro.ro_contact_no}</td>
//                 <td className={GlobalStyle.tableData}>{ro.rtoms_for_ro?.length || 0}</td>
//                 <td className={GlobalStyle.tableData}>
//                   <div className="flex gap-4">
//                     <Link to="/config/ro-details">
//                       <img src={more_info} alt="More Info" className="w-6 h-6" />
//                     </Link>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//             {paginatedData.length === 0 && (
//               <tr>
//                 <td colSpan="6" className="text-center py-4">
//                   No results found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       {filteredData.length > rowsPerPage && (
//         <div className={GlobalStyle.navButtonContainer}>
//           <button className={GlobalStyle.navButton} onClick={handlePrevPage} disabled={currentPage === 0}>
//             <FaArrowLeft />
//           </button>
//           <span>
//             Page {currentPage + 1} of {pages}
//           </span>
//           <button className={GlobalStyle.navButton} onClick={handleNextPage} disabled={currentPage === pages - 1}>
//             <FaArrowRight />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ROList;

// working code 3

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa";
// import GlobalStyle from "../../assets/prototype/GlobalStyle";
// import { fetchRODetails, fetchRODataByDRC } from "../../services/Ro/RO";
// import activeIcon from "../../assets/images/active.svg";
// import deactiveIcon from "../../assets/images/deactive.svg";
// import more_info from "../../assets/images/more-info.svg";
// import user_add from "../../assets/images/user-add.svg";

// const ROList = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(0);
//   const [status, setStatus] = useState("");
//   const [selectedDRC, setSelectedDRC] = useState("");
//   const [appliedFilters, setAppliedFilters] = useState({ status: "", drc: "" });
//   const [roData, setRoData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [requestDrcId, setRequestDrcId] = useState(null); // Default to fetch all recovery officers

//   const rowsPerPage = 7;

//   const drcData = [
//     { drc_id: 10, drc_name: "Example Company" },
//     { drc_id: 11, drc_name: "Mobitel" },
//     // Add more DRCs here
//   ];

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       setError(null);

//       try {
//         // Fetch RO data based on filters
//         if (requestDrcId) {
//           const data = await fetchRODataByDRC(requestDrcId); // Fetch data for specific DRC
//           setRoData(data);
//         } else {
//           const data = await fetchRODetails(); // Fetch all RO details
//           setRoData(data);
//         }
//       } catch (err) {
//         setError(err.message || "Error fetching data");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, [requestDrcId]); // Refetch when DRC ID changes

//   // Helper to get the last status of the recovery officer
//   const getLastStatus = (statusArray) => {
//     if (Array.isArray(statusArray) && statusArray.length > 0) {
//       return statusArray[statusArray.length - 1].status; // Get the last status
//     }
//     return "Unknown"; // Default if no status
//   };

//   const filteredData = roData.filter((row) => {
//     const matchesSearchQuery = Object.values(row)
//       .join(" ")
//       .toLowerCase()
//       .includes(searchQuery.toLowerCase());
//     const matchesStatus =
//       status === "" ||
//       getLastStatus(row.ro_status).toLowerCase() === status.toLowerCase();

//     return matchesSearchQuery && matchesStatus;
//   });

//   const handleFilter = () => {
//     setAppliedFilters({ status, selectedDRC });
//     setCurrentPage(0);
//   };

//   const pages = Math.ceil(filteredData.length / rowsPerPage);
//   const startIndex = currentPage * rowsPerPage;
//   const endIndex = startIndex + rowsPerPage;
//   const paginatedData = filteredData.slice(startIndex, endIndex);

//   const handlePrevPage = () => {
//     if (currentPage > 0) setCurrentPage(currentPage - 1);
//   };

//   const handleNextPage = () => {
//     if (currentPage < pages - 1) setCurrentPage(currentPage + 1);
//   };

//   // Handle Status dropdown
//   const handleStatusChange = (status) => {
//     setStatus(status || ""); // Update selected status
//     setCurrentPage(0); // Reset pagination
//   };

//   // Handle DRC selection and fetch corresponding data
//   const handleDRCChange = (drcId, drcName) => {
//     setRequestDrcId(drcId || null); // If DRC ID is null, fetch all recovery officers
//     setSelectedDRC(drcName || ""); // Update selected DRC name
//     setCurrentPage(0); // Reset pagination
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className={GlobalStyle.fontPoppins}>
//       <div className="flex justify-between items-center mb-8">
//         <h1 className={GlobalStyle.headingLarge}>RO List</h1>
//         <Link to="/config/add-ro">
//           <button>
//             <img src={user_add} title="Add RO" className="w-8 h-8" />
//           </button>
//         </Link>
//       </div>

//       {/* Filters */}
//       <div className="flex flex-col mb-10">
//         <div className="flex gap-4 justify-end">
//           <select
//             value={status}
//             onChange={(e) => handleStatusChange(e.target.value)}
//             className={GlobalStyle.selectBox}
//           >
//             <option value="">Select Status</option>
//             <option value="Active">Active</option>
//             <option value="Inactive">Inactive</option>
//           </select>

//           <select
//             value={selectedDRC}
//             onChange={(e) => {
//               const selectedOption = e.target.options[e.target.selectedIndex];
//               handleDRCChange(
//                 Number(selectedOption.value) || null, // Pass DRC ID or null
//                 selectedOption.text // Pass DRC name
//               );
//             }}
//             className={GlobalStyle.selectBox}
//           >
//             <option value="">Select DRC</option>
//             {drcData.map((drc) => (
//               <option key={drc.drc_id} value={drc.drc_id}>
//                 {drc.drc_name}
//               </option>
//             ))}
//           </select>

//           <button
//             onClick={handleFilter}
//             className={`${GlobalStyle.buttonPrimary} flex items-center gap-2`}
//           >
//             Filter
//           </button>
//         </div>
//       </div>

//       {/* Search Bar */}
//       <div className="mb-4 flex justify-start">
//         <div className={GlobalStyle.searchBarContainer}>
//           <input
//             type="text"
//             placeholder="Search"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className={GlobalStyle.inputSearch}
//           />
//           <FaSearch className={GlobalStyle.searchBarIcon} />
//         </div>
//       </div>

//       {/* Table */}
//       <div className={GlobalStyle.tableContainer}>
//         <table className={GlobalStyle.table}>
//           <thead className={GlobalStyle.thead}>
//             <tr>
//               <th scope="col" className={GlobalStyle.tableHeader}>RO ID</th>
//               <th scope="col" className={GlobalStyle.tableHeader}>Status</th>
//               <th scope="col" className={GlobalStyle.tableHeader}>DRC Name</th>
//               <th scope="col" className={GlobalStyle.tableHeader}>RO Name</th>
//               <th scope="col" className={GlobalStyle.tableHeader}>Contact No.</th>
//               <th scope="col" className={GlobalStyle.tableHeader}>RTOM Area count</th>
//               <th scope="col" className={GlobalStyle.tableHeader}></th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedData.map((ro, index) => (
//               <tr key={ro.ro_id} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} border-b`}>
//                 <td className={GlobalStyle.tableData}>{ro.ro_id}</td>
//                 <td className={GlobalStyle.tableData}>
//                   <div className="flex items-center justify-center gap-2">
//                     <img
//                       src={getLastStatus(ro.ro_status) === "Active" ? activeIcon : deactiveIcon}
//                       alt={getLastStatus(ro.ro_status)}
//                       className="w-5 h-5"
//                       title={getLastStatus(ro.ro_status)}
//                     />
//                   </div>
//                 </td>
//                 <td className={GlobalStyle.tableData}>{ro.drc_name}</td>
//                 <td className={GlobalStyle.tableData}>{ro.ro_name}</td>
//                 <td className={GlobalStyle.tableData}>{ro.ro_contact_no}</td>
//                 <td className={GlobalStyle.tableData}>{ro.rtoms_for_ro?.length || 0}</td>
//                 <td className={GlobalStyle.tableData}>
//                   <div className="flex gap-4">
//                     <Link to="/config/ro-details">
//                       <img src={more_info} alt="More Info" className="w-6 h-6" />
//                     </Link>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//             {paginatedData.length === 0 && (
//               <tr>
//                 <td colSpan="6" className="text-center py-4">
//                   No results found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       {filteredData.length > rowsPerPage && (
//         <div className={GlobalStyle.navButtonContainer}>
//           <button className={GlobalStyle.navButton} onClick={handlePrevPage} disabled={currentPage === 0}>
//             <FaArrowLeft />
//           </button>
//           <span>
//             Page {currentPage + 1} of {pages}
//           </span>
//           <button className={GlobalStyle.navButton} onClick={handleNextPage} disabled={currentPage === pages - 1}>
//             <FaArrowRight />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ROList;


//working code 4

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa";
// import GlobalStyle from "../../assets/prototype/GlobalStyle";
// import { fetchRODetails, fetchRODataByDRC } from "../../services/Ro/RO";
// import activeIcon from "../../assets/images/active.svg";
// import deactiveIcon from "../../assets/images/deactive.svg";
// import more_info from "../../assets/images/more-info.svg";
// import user_add from "../../assets/images/user-add.svg";

// const ROList = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(0);
//   const [status, setStatus] = useState("");
//   const [selectedDRC, setSelectedDRC] = useState(""); // This holds the name of the selected DRC
//   const [appliedFilters, setAppliedFilters] = useState({ status: "", drc: "" });
//   const [roData, setRoData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [requestDrcId, setRequestDrcId] = useState(null); // Default to fetch all recovery officers

//   const rowsPerPage = 7;

//   const drcData = [
//     { drc_id: 10, drc_name: "Example Company" },
//     { drc_id: 11, drc_name: "Mobitel" },
//     // Add more DRCs here
//   ];

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       setError(null);

//       try {
//         if (requestDrcId) {
//           const data = await fetchRODataByDRC(requestDrcId); // Fetch data for specific DRC
//           setRoData(data);
//         } else {
//           const data = await fetchRODetails(); // Fetch all RO details
//           setRoData(data);
//         }
//       } catch (err) {
//         setError(err.message || "Error fetching data");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, [requestDrcId]); // Refetch when DRC ID changes

//   const getLastStatus = (statusArray) => {
//     if (Array.isArray(statusArray) && statusArray.length > 0) {
//       return statusArray[statusArray.length - 1].status;
//     }
//     return "Unknown";
//   };

//   const filteredData = roData.filter((row) => {
//     const matchesSearchQuery = Object.values(row)
//       .join(" ")
//       .toLowerCase()
//       .includes(searchQuery.toLowerCase());
//     const matchesStatus =
//       status === "" ||
//       getLastStatus(row.ro_status).toLowerCase() === status.toLowerCase();

//     return matchesSearchQuery && matchesStatus;
//   });

//   const handleFilter = () => {
//     setAppliedFilters({ status, selectedDRC });
//     setCurrentPage(0);
//   };

//   const pages = Math.ceil(filteredData.length / rowsPerPage);
//   const startIndex = currentPage * rowsPerPage;
//   const endIndex = startIndex + rowsPerPage;
//   const paginatedData = filteredData.slice(startIndex, endIndex);

//   const handlePrevPage = () => {
//     if (currentPage > 0) setCurrentPage(currentPage - 1);
//   };

//   const handleNextPage = () => {
//     if (currentPage < pages - 1) setCurrentPage(currentPage + 1);
//   };

//   const handleStatusChange = (status) => {
//     setStatus(status || "");
//     setCurrentPage(0);
//   };

//   // Handle DRC selection
//   const handleDRCChange = (drcId, drcName) => {
//     if (drcId === "") {
//       // If 'Select DRC' is chosen, reset to fetch all recovery officers
//       setRequestDrcId(null);
//       setSelectedDRC("");
//     } else {
//       setRequestDrcId(drcId);
//       setSelectedDRC(drcName);
//     }
//     setCurrentPage(0);
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className={GlobalStyle.fontPoppins}>
//       <div className="flex justify-between items-center mb-8">
//         <h1 className={GlobalStyle.headingLarge}>RO List</h1>
//         <Link to="/config/add-ro">
//           <button>
//             <img src={user_add} title="Add RO" className="w-8 h-8" />
//           </button>
//         </Link>
//       </div>

//       {/* Filters */}
//       <div className="flex flex-col mb-10">
//         <div className="flex gap-4 justify-end">
//           <select
//             value={status}
//             onChange={(e) => handleStatusChange(e.target.value)}
//             className={GlobalStyle.selectBox}
//           >
//             <option value="">Select Status</option>
//             <option value="Active">Active</option>
//             <option value="Inactive">Inactive</option>
//           </select>

//           {/* DRC Dropdown */}
//           <select
//             value={selectedDRC || ""}
//             onChange={(e) => {
//               const selectedOption = e.target.options[e.target.selectedIndex];
//               handleDRCChange(
//                 selectedOption.value || "", // DRC ID, default to "" if "Select DRC"
//                 selectedOption.text || "" // DRC name
//               );
//             }}
//             className={GlobalStyle.selectBox}
//           >
//             <option value="">Select DRC</option>
//             {drcData.map((drc) => (
//               <option key={drc.drc_id} value={drc.drc_id}>
//                 {drc.drc_name}
//               </option>
//             ))}
//           </select>

//           <button
//             onClick={handleFilter}
//             className={`${GlobalStyle.buttonPrimary} flex items-center gap-2`}
//           >
//             Filter
//           </button>
//         </div>
//       </div>

//       {/* Search Bar */}
//       <div className="mb-4 flex justify-start">
//         <div className={GlobalStyle.searchBarContainer}>
//           <input
//             type="text"
//             placeholder="Search"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className={GlobalStyle.inputSearch}
//           />
//           <FaSearch className={GlobalStyle.searchBarIcon} />
//         </div>
//       </div>

//       {/* Table */}
//       <div className={GlobalStyle.tableContainer}>
//         <table className={GlobalStyle.table}>
//           <thead className={GlobalStyle.thead}>
//             <tr>
//               <th scope="col" className={GlobalStyle.tableHeader}>RO ID</th>
//               <th scope="col" className={GlobalStyle.tableHeader}>Status</th>
//               <th scope="col" className={GlobalStyle.tableHeader}>DRC Name</th>
//               <th scope="col" className={GlobalStyle.tableHeader}>RO Name</th>
//               <th scope="col" className={GlobalStyle.tableHeader}>Contact No.</th>
//               <th scope="col" className={GlobalStyle.tableHeader}>RTOM Area count</th>
//               <th scope="col" className={GlobalStyle.tableHeader}></th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedData.map((ro, index) => (
//               <tr key={ro.ro_id} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} border-b`}>
//                 <td className={GlobalStyle.tableData}>{ro.ro_id}</td>
//                 <td className={GlobalStyle.tableData}>
//                   <div className="flex items-center justify-center gap-2">
//                     <img
//                       src={getLastStatus(ro.ro_status) === "Active" ? activeIcon : deactiveIcon}
//                       alt={getLastStatus(ro.ro_status)}
//                       className="w-5 h-5"
//                       title={getLastStatus(ro.ro_status)}
//                     />
//                   </div>
//                 </td>
//                 <td className={GlobalStyle.tableData}>{ro.drc_name}</td>
//                 <td className={GlobalStyle.tableData}>{ro.ro_name}</td>
//                 <td className={GlobalStyle.tableData}>{ro.ro_contact_no}</td>
//                 <td className={GlobalStyle.tableData}>{ro.rtoms_for_ro?.length || 0}</td>
//                 <td className={GlobalStyle.tableData}>
//                   <div className="flex gap-4">
//                     <Link to="/config/ro-details">
//                       <img src={more_info} alt="More Info" className="w-6 h-6" />
//                     </Link>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//             {paginatedData.length === 0 && (
//               <tr>
//                 <td colSpan="6" className="text-center py-4">
//                   No results found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       {filteredData.length > rowsPerPage && (
//         <div className={GlobalStyle.navButtonContainer}>
//           <button className={GlobalStyle.navButton} onClick={handlePrevPage} disabled={currentPage === 0}>
//             <FaArrowLeft />
//           </button>
//           <span>
//             Page {currentPage + 1} of {pages}
//           </span>
//           <button className={GlobalStyle.navButton} onClick={handleNextPage} disabled={currentPage === pages - 1}>
//             <FaArrowRight />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ROList;

//working code 5

// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa";
// import GlobalStyle from "../../assets/prototype/GlobalStyle";
// import { fetchRODetails, fetchRODataByDRC } from "../../services/Ro/RO";
// import activeIcon from "../../assets/images/active.svg";
// import deactiveIcon from "../../assets/images/deactive.svg";
// import more_info from "../../assets/images/more-info.svg";
// import user_add from "../../assets/images/user-add.svg";

// const ROList = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(0);
//   const [status, setStatus] = useState("");
//   const [selectedDRC, setSelectedDRC] = useState(""); // This holds the name of the selected DRC
//   const [appliedFilters, setAppliedFilters] = useState({ status: "", drc: "" });
//   const [roData, setRoData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [requestDrcId, setRequestDrcId] = useState(null); // Default to fetch all recovery officers

//   const rowsPerPage = 7;

//   const drcData = [
//     { drc_id: 10, drc_name: "Example Company" },
//     { drc_id: 11, drc_name: "Mobitel" },
//     // Add more DRCs here
//   ];

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       setError(null);

//       try {
//         if (requestDrcId) {
//           const data = await fetchRODataByDRC(requestDrcId); // Fetch data for specific DRC
//           setRoData(data);
//         } else {
//           const data = await fetchRODetails(); // Fetch all RO details
//           setRoData(data);
//         }
//       } catch (err) {
//         setError(err.message || "Error fetching data");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, [requestDrcId]); // Refetch when DRC ID changes

//   const getLastStatus = (statusArray) => {
//     if (Array.isArray(statusArray) && statusArray.length > 0) {
//       return statusArray[statusArray.length - 1].status;
//     }
//     return "Unknown";
//   };

//   const filteredData = roData.filter((row) => {
//     const matchesSearchQuery = Object.values(row)
//       .join(" ")
//       .toLowerCase()
//       .includes(searchQuery.toLowerCase());
//     const matchesStatus =
//       status === "" ||
//       getLastStatus(row.ro_status).toLowerCase() === status.toLowerCase();

//     return matchesSearchQuery && matchesStatus;
//   });

//   const handleFilter = () => {
//     setAppliedFilters({ status, selectedDRC });
//     setCurrentPage(0);
//   };

//   const pages = Math.ceil(filteredData.length / rowsPerPage);
//   const startIndex = currentPage * rowsPerPage;
//   const endIndex = startIndex + rowsPerPage;
//   const paginatedData = filteredData.slice(startIndex, endIndex);

//   const handlePrevPage = () => {
//     if (currentPage > 0) setCurrentPage(currentPage - 1);
//   };

//   const handleNextPage = () => {
//     if (currentPage < pages - 1) setCurrentPage(currentPage + 1);
//   };

//   const handleStatusChange = (status) => {
//     setStatus(status || "");
//     setCurrentPage(0);
//   };

//   // Handle DRC selection
//   const handleDRCChange = (drcId, drcName) => {
//     if (drcId === "") {
//       // If 'Select DRC' is chosen, reset to fetch all recovery officers
//       setRequestDrcId(null);
//       setSelectedDRC(""); // Reset to show 'Select DRC'
//     } else {
//       setRequestDrcId(drcId);
//       setSelectedDRC(drcName); // Set selected DRC name
//     }
//     setCurrentPage(0);
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className={GlobalStyle.fontPoppins}>
//       <div className="flex justify-between items-center mb-8">
//         <h1 className={GlobalStyle.headingLarge}>RO List</h1>
//         <Link to="/config/add-ro">
//           <button>
//             <img src={user_add} title="Add RO" className="w-8 h-8" />
//           </button>
//         </Link>
//       </div>

//       {/* Filters */}
//       <div className="flex flex-col mb-10">
//         <div className="flex gap-4 justify-end">
//           <select
//             value={status}
//             onChange={(e) => handleStatusChange(e.target.value)}
//             className={GlobalStyle.selectBox}
//           >
//             <option value="">Select Status</option>
//             <option value="Active">Active</option>
//             <option value="Inactive">Inactive</option>
//           </select>

//           {/* DRC Dropdown */}
//           <select
//             value={selectedDRC || ""}
//             onChange={(e) => {
//               const selectedOption = e.target.options[e.target.selectedIndex];
//               handleDRCChange(
//                 selectedOption.value || "", // DRC ID, default to "" if "Select DRC"
//                 selectedOption.text || "" // DRC name
//               );
//             }}
//             className={GlobalStyle.selectBox}
//           >
//             <option value="">Select DRC</option>
//             {drcData.map((drc) => (
//               <option key={drc.drc_id} value={drc.drc_id}>
//                 {drc.drc_name}
//               </option>
//             ))}
//           </select>

//           <button
//             onClick={handleFilter}
//             className={`${GlobalStyle.buttonPrimary} flex items-center gap-2`}
//           >
//             Filter
//           </button>
//         </div>
//       </div>

//       {/* Search Bar */}
//       <div className="mb-4 flex justify-start">
//         <div className={GlobalStyle.searchBarContainer}>
//           <input
//             type="text"
//             placeholder=""
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className={GlobalStyle.inputSearch}
//           />
//           <FaSearch className={GlobalStyle.searchBarIcon} />
//         </div>
//       </div>

//       {/* Table */}
//       <div className={GlobalStyle.tableContainer}>
//         <table className={GlobalStyle.table}>
//           <thead className={GlobalStyle.thead}>
//             <tr>
//               <th scope="col" className={GlobalStyle.tableHeader}>RO ID</th>
//               <th scope="col" className={GlobalStyle.tableHeader}>Status</th>
//               <th scope="col" className={GlobalStyle.tableHeader}>DRC Name</th>
//               <th scope="col" className={GlobalStyle.tableHeader}>RO Name</th>
//               <th scope="col" className={GlobalStyle.tableHeader}>Contact No.</th>
//               <th scope="col" className={GlobalStyle.tableHeader}>RTOM Area count</th>
//               <th scope="col" className={GlobalStyle.tableHeader}></th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedData.map((ro, index) => (
//               <tr key={ro.ro_id} 
//               className={`${
//                 index % 2 === 0
//                   ? "bg-white bg-opacity-75"
//                   : "bg-gray-50 bg-opacity-50"
//               } border-b`}
//             >
//                 <td className={GlobalStyle.tableData}>{ro.ro_id}</td>
//                 <td className={GlobalStyle.tableData}>
//                   <div className="flex items-center justify-center gap-2">
//                     <img
//                       src={getLastStatus(ro.ro_status) === "Active" ? activeIcon : deactiveIcon}
//                       alt={getLastStatus(ro.ro_status)}
//                       className="w-5 h-5"
//                       title={getLastStatus(ro.ro_status)}
//                     />
//                   </div>
//                 </td>
//                 <td className={GlobalStyle.tableData}>{ro.drc_name}</td>
//                 <td className={GlobalStyle.tableData}>{ro.ro_name}</td>
//                 <td className={GlobalStyle.tableData}>{ro.ro_contact_no}</td>
//                 <td className={GlobalStyle.tableData}>{ro.rtoms_for_ro?.length || 0}</td>
//                 <td className={GlobalStyle.tableData}>
//                   <div className="flex gap-4">
//                     <Link to={`/config/ro-details/${ro.ro_id}`}>
//                       <img src={more_info} alt="More Info" className="w-6 h-6" />
//                     </Link>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//             {paginatedData.length === 0 && (
//               <tr>
//                 <td colSpan="6" className="text-center py-4">
//                   No results found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       {filteredData.length > rowsPerPage && (
//         <div className={GlobalStyle.navButtonContainer}>
//           <button className={GlobalStyle.navButton} onClick={handlePrevPage} disabled={currentPage === 0}>
//             <FaArrowLeft />
//           </button>
//           <span>
//             Page {currentPage + 1} of {pages}
//           </span>
//           <button className={GlobalStyle.navButton} onClick={handleNextPage} disabled={currentPage === pages - 1}>
//             <FaArrowRight />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ROList;


// working code 1/7/2025

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import GlobalStyle from "../../assets/prototype/GlobalStyle";
import { fetchRODetails, fetchRODataByDRC } from "../../services/Ro/RO";
import activeIcon from "../../assets/images/active.svg";
import deactiveIcon from "../../assets/images/deactive.svg";
import more_info from "../../assets/images/more-info.svg";
import user_add from "../../assets/images/user-add.svg";
import { fetchActiveDRCDetails } from "../../services/drc/DRCService";

const ROList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [status, setStatus] = useState("");
  const [selectedDRC, setSelectedDRC] = useState(""); // This holds the name of the selected DRC
  const [appliedFilters, setAppliedFilters] = useState({ status: "", drc: "" });
  const [roData, setRoData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [requestDrcId, setRequestDrcId] = useState(null); // Default to fetch all recovery officers
  const [drcArray, setDrcData] = useState([]); // Dynamically fetched DRC data

  const rowsPerPage = 7;

  useEffect(() => {
    const fetchDrcData = async () => {
      try {
        const data = await fetchActiveDRCDetails(); // Fetch DRC details
        setDrcData(data); // Update DRC data
      } catch (err) {
        setError(err.message);
      }
    };

    fetchDrcData();
  }, []); // Fetch DRC details once on component mount

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        if (requestDrcId) {
          const data = await fetchRODataByDRC(requestDrcId); // Fetch data for specific DRC
          setRoData(data);
        } else {
          const data = await fetchRODetails(); // Fetch all RO details
          setRoData(data);
        }
      } catch (err) {
        setError(err.message || "Error fetching data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [requestDrcId]); // Refetch when DRC ID changes

  const getLastStatus = (statusArray) => {
    if (Array.isArray(statusArray) && statusArray.length > 0) {
      return statusArray[statusArray.length - 1].status;
    }
    return "Unknown";
  };

  const filteredData = roData.filter((row) => {
    const matchesSearchQuery = Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      status === "" ||
      getLastStatus(row.ro_status).toLowerCase() === status.toLowerCase();

    return matchesSearchQuery && matchesStatus;
  });

  const handleFilter = () => {
    setAppliedFilters({ status, selectedDRC });
    setCurrentPage(0);
  };

  const pages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = currentPage * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < pages - 1) setCurrentPage(currentPage + 1);
  };

  const handleStatusChange = (status) => {
    setStatus(status || "");
    setCurrentPage(0);
  };

  const handleDRCChange = (e) => {
    const selected = e.target.value;
    setSelectedDRC(selected);
    
    if (selected === "") {
      // If "Select DRC" is chosen, reset to fetch all recovery officers
      setRequestDrcId(null);
    } else {
      // Find the selected DRC by name and set its ID
      const selectedDrc = drcArray.find((drc) => drc.name === selected);
      if (selectedDrc) {
        setRequestDrcId(selectedDrc.id);
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={GlobalStyle.fontPoppins}>
      <div className="flex justify-between items-center mb-8">
        <h1 className={GlobalStyle.headingLarge}>RO List</h1>
        <Link to="/config/add-ro">
          <button>
            <img src={user_add} title="Add RO" className="w-8 h-8" />
          </button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col mb-10">
        <div className="flex gap-4 justify-end">
          <select
            value={status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className={GlobalStyle.selectBox}
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <select
          className={GlobalStyle.selectBox}
          value={selectedDRC}
          onChange={handleDRCChange}
        >
          <option value="">Select DRC</option>
          {drcArray.map((drc) => (
            <option key={drc.id} value={drc.name}>
              {drc.name}
            </option>
          ))}
        </select>

          <button
            onClick={handleFilter}
            className={`${GlobalStyle.buttonPrimary} flex items-center gap-2`}
          >
            Filter
          </button>
        </div>
      </div>

      {/* Search Bar */}
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

      {/* Table */}
      <div className={GlobalStyle.tableContainer}>
        <table className={GlobalStyle.table}>
          <thead className={GlobalStyle.thead}>
            <tr>
              <th scope="col" className={GlobalStyle.tableHeader}>RO ID</th>
              <th scope="col" className={GlobalStyle.tableHeader}>Status</th>
              <th scope="col" className={GlobalStyle.tableHeader}>DRC Name</th>
              <th scope="col" className={GlobalStyle.tableHeader}>RO Name</th>
              <th scope="col" className={GlobalStyle.tableHeader}>Contact No.</th>
              <th scope="col" className={GlobalStyle.tableHeader}>RTOM Area count</th>
              <th scope="col" className={GlobalStyle.tableHeader}></th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((ro, index) => (
              <tr key={ro.ro_id} 
              className={`${
                index % 2 === 0
                  ? "bg-white bg-opacity-75"
                  : "bg-gray-50 bg-opacity-50"
              } border-b`}
            >
                <td className={GlobalStyle.tableData}>{ro.ro_id}</td>
                <td className={GlobalStyle.tableData}>
                  <div className="flex items-center justify-center gap-2">
                    <img
                      src={getLastStatus(ro.ro_status) === "Active" ? activeIcon : deactiveIcon}
                      alt={getLastStatus(ro.ro_status)}
                      className="w-5 h-5"
                      title={getLastStatus(ro.ro_status)}
                    />
                  </div>
                </td>
                <td className={GlobalStyle.tableData}>{ro.drc_name}</td>
                <td className={GlobalStyle.tableData}>{ro.ro_name}</td>
                <td className={GlobalStyle.tableData}>{ro.ro_contact_no}</td>
                <td className={GlobalStyle.tableData}>{ro.rtoms_for_ro?.length || 0}</td>
                <td className={GlobalStyle.tableData}>
                  <div className="flex gap-4">
                    <Link to={`/config/ro-details/${ro.ro_id}`}>
                      <img src={more_info} alt="More Info" className="w-6 h-6" />
                    </Link>
                  </div>
                </td>
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

      {/* Pagination */}
      {filteredData.length > rowsPerPage && (
        <div className={GlobalStyle.navButtonContainer}>
          <button className={GlobalStyle.navButton} onClick={handlePrevPage} disabled={currentPage === 0}>
            <FaArrowLeft />
          </button>
          <span>
            Page {currentPage + 1} of {pages}
          </span>
          <button className={GlobalStyle.navButton} onClick={handleNextPage} disabled={currentPage === pages - 1}>
            <FaArrowRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default ROList;



