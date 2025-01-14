// import { useState } from "react";
// import GlobalStyle from "../../assets/prototype/GlobalStyle";
// import { FaArrowLeft, FaArrowRight, FaSearch } from "react-icons/fa";

// const DRCsInfo = () => {
//   const [activeTab, setActiveTab] = useState("RO");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(0);

//   // Filters
//   const [status, setStatus] = useState("");
//   const [rtomFilter, setRtomFilter] = useState("");
//   const [serviceFilter, setServiceFilter] = useState("");
//   const [appliedFilters, setAppliedFilters] = useState({
//     status: "",
//     drc: "",
//     rtom: "",
//     service: "",
//   });

//   const rowsPerPage = 7;

//   // Dummy data for dropdown
//   const statuses = ["Active", "Inactive"];
//   const rtomNames = ["RTOM 1", "RTOM 2", "RTOM 3", "RTOM 4"];
//   const serviceTypes = ["PEO", "LTE", "FTTH", "DSL"];

//   // Dummy data
//   const roListData = [
//     { name: "AB", status: "Active", enableDate: "2024-12-24", contact: "0123456789" },
//     { name: "KU", status: "Inactive", enableDate: "2024-12-20", contact: "0111111111" },
//     { name: "XY", status: "Active", enableDate: "2025-01-01", contact: "0987654321" },
//     { name: "MN", status: "Inactive", enableDate: "2024-11-15", contact: "0223334444" },
//   ];

//   const rtomListData = [
//     { name: "RTOM 1", abbreviation: "AB", enableDate: "2024-12-24", contact: "0123456789", count: 10 },
//     { name: "RTOM 2", abbreviation: "KU", enableDate: "2024-12-20", contact: "0111111111", count: 5 },
//     { name: "RTOM 3", abbreviation: "XY", enableDate: "2025-01-01", contact: "0987654321", count: 7 },
//     { name: "RTOM 4", abbreviation: "MN", enableDate: "2024-11-15", contact: "0223334444", count: 3 },
//   ];

//   const servicesListData = [
//     { type: "PEO", enableDate: "2025-01-01", active: true },
//     { type: "LTE", enableDate: "2025-02-01", active: false },
//     { type: "FTTH", enableDate: "2025-03-01", active: true },
//     { type: "DSL", enableDate: "2025-04-01", active: false },
//   ];

//   const filteredData =
//     activeTab === "RO"
//       ? roListData.filter((row) => {
//           const matchesSearchQuery = Object.values(row)
//             .join(" ")
//             .toLowerCase()
//             .includes(searchQuery.toLowerCase());
//           const matchesStatus =
//             !appliedFilters.status || row.status === appliedFilters.status;
//           const matchesDrc =
//             !appliedFilters.drc || row.drc_name === appliedFilters.drc;

//           return matchesSearchQuery && matchesStatus && matchesDrc;
//         })
//       : activeTab === "RTOM"
//       ? rtomListData.filter((row) => {
//           const matchesSearchQuery = Object.values(row)
//             .join(" ")
//             .toLowerCase()
//             .includes(searchQuery.toLowerCase());
//           const matchesRtom =
//             !appliedFilters.rtom || row.name === appliedFilters.rtom;

//           return matchesSearchQuery && matchesRtom;
//         })
//       : activeTab === "Services"
//       ? servicesListData.filter((row) => {
//           const matchesSearchQuery = Object.values(row)
//             .join(" ")
//             .toLowerCase()
//             .includes(searchQuery.toLowerCase());
//           const matchesService =
//             !appliedFilters.service || row.type === appliedFilters.service;

//           return matchesSearchQuery && matchesService;
//         })
//       : [];

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
//     setAppliedFilters({ status, rtom: rtomFilter, service: serviceFilter });
//     setCurrentPage(0);
//   };

//   const toggleService = (id) => {
//     ((prevServices) =>
//       prevServices.map((service) =>
//         service.id === id ? { ...service, enabled: !service.enabled } : service
//       )
//     );
//   };

//   const startIndex = currentPage * rowsPerPage;
//   const endIndex = startIndex + rowsPerPage;
//   const paginatedData = filteredData.slice(startIndex, endIndex);

//   return (
//     <div className={GlobalStyle.fontPoppins}>
//       <div className="flex justify-between items-center mb-8">
//         <h1 className={GlobalStyle.headingLarge}>
//           Sensus - Sensus BPO Services (Pvt) Ltd
//         </h1>
//       </div>

//       {/* Filter Section */}
//       <div className="flex flex-col mb-10">
//         {activeTab === "RO" && (
//           <div className="flex gap-4 justify-end">
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
//             <button
//               onClick={handleFilter}
//               className={`${GlobalStyle.buttonPrimary} flex items-center gap-2`}
//             >
//               Filter
//             </button>
//           </div>
//         )}
//         {activeTab === "RTOM" && (
//           <div className="flex gap-4 justify-end">
//             <select
//               value={rtomFilter}
//               onChange={(e) => setRtomFilter(e.target.value)}
//               className={GlobalStyle.selectBox}
//             >
//               <option value="">Select RTOM</option>
//               {rtomNames.map((rtomOption, index) => (
//                 <option key={index} value={rtomOption}>
//                   {rtomOption}
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
//         )}
//         {activeTab === "Services" && (
//           <div className="flex gap-4 justify-end">
//             <select
//               value={serviceFilter}
//               onChange={(e) => setServiceFilter(e.target.value)}
//               className={GlobalStyle.selectBox}
//             >
//               <option value="">Select Service</option>
//               {serviceTypes.map((serviceOption, index) => (
//                 <option key={index} value={serviceOption}>
//                   {serviceOption}
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
//         )}
//       </div>

//       {/* Rest of the Component */}
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

//       {/* Tabs */}
//       <div className="flex border-b mb-4">
//         {["RO", "RTOM", "Services"].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`px-4 py-2 ${
//               activeTab === tab
//                 ? "border-b-2 border-blue-500 font-bold"
//                 : "text-gray-500"
//             }`}
//           >
//             {tab} List
//           </button>
//         ))}
//       </div>

//       {/* Table */}
//       <div className={GlobalStyle.tableContainer}>
//         <table className={GlobalStyle.table}>
//           <thead className={GlobalStyle.thead}>
//             <tr>
//               {activeTab === "RO" && (
//                 <>
//                   <th className={GlobalStyle.tableHeader}>RO Name</th>
//                   <th className={GlobalStyle.tableHeader}>Status</th>
//                   <th className={GlobalStyle.tableHeader}>Enable Date</th>
//                   <th className={GlobalStyle.tableHeader}>Contact</th>
//                 </>
//               )}
//               {activeTab === "RTOM" && (
//                 <>
//                   <th className={GlobalStyle.tableHeader}>RTOM Name</th>
//                   <th className={GlobalStyle.tableHeader}>Abbreviation</th>
//                   <th className={GlobalStyle.tableHeader}>Enable Date</th>
//                   <th className={GlobalStyle.tableHeader}>Contact</th>
//                 </>
//               )}
//               {activeTab === "Services" && (
//                 <>
//                   <th className={GlobalStyle.tableHeader}>Service Type</th>
//                   <th className={GlobalStyle.tableHeader}>Enable Date</th>
//                   <th className={GlobalStyle.tableHeader}>Active</th>
//                 </>
//               )}
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedData.map((row, index) => (
//               <tr
//                 key={index}
//                 className={`${
//                   index % 2 === 0
//                     ? "bg-white bg-opacity-75"
//                     : "bg-gray-50 bg-opacity-50"
//                 } border-b`}
//               >
//                 {activeTab === "RO" && (
//                   <>
//                     <td className={GlobalStyle.tableData}>{row.name}</td>
//                     <td className={GlobalStyle.tableData}>{row.status}</td>
//                     <td className={GlobalStyle.tableData}>
//                       {row.enableDate}
//                     </td>
//                     <td className={GlobalStyle.tableData}>{row.contact}</td>
//                   </>
//                 )}
//                 {activeTab === "RTOM" && (
//                   <>
//                     <td className={GlobalStyle.tableData}>{row.name}</td>
//                     <td className={GlobalStyle.tableData}>
//                       {row.abbreviation}
//                     </td>
//                     <td className={GlobalStyle.tableData}>
//                       {row.enableDate}
//                     </td>
//                     <td className={GlobalStyle.tableData}>{row.contact}</td>
//                   </>
//                 )}
//                 {activeTab === "Services" && (
//                   <>
//                     <td className={GlobalStyle.tableData}>{row.type}</td>
//                     <td className={GlobalStyle.tableData}>
//                       {row.enableDate}
//                     </td>
//                     <td className={GlobalStyle.tableData}>
//                     <label className="inline-flex relative items-center cursor-pointer">
//                           <input
//                             type="checkbox"
//                             className="sr-only peer"
//                             checked={row.enabled}
//                             onChange={() => toggleService(row.id)}
//                           />
//                           <div className="w-11 h-6 bg-gray-500 rounded-full peer peer-focus:ring-4 peer-focus:ring-green-300 peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
//                         </label>
//                     </td>
//                   </>
//                 )}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
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

// export default DRCsInfo;


// code v2 

// import { useState, useEffect } from "react";
// import GlobalStyle from "../../assets/prototype/GlobalStyle";
// import { FaArrowLeft, FaArrowRight, FaSearch } from "react-icons/fa";
// import { getAllRTOMsByDRCID } from "../../services/rtom/RtomService";

// const DRCsInfo = () => {
//   const [activeTab, setActiveTab] = useState("RO");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [data, setData] = useState([]);
//   const [error, setError] = useState("");

//   // Filters
//   const [status, setStatus] = useState("");
//   const [rtomFilter, setRtomFilter] = useState("");
//   const [serviceFilter, setServiceFilter] = useState("");
//   const [appliedFilters, setAppliedFilters] = useState({
//     status: "",
//     drc: "",
//     rtom: "",
//     service: "",
//   });

//   const rowsPerPage = 7;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await getAllRTOMsByDRCID();
//         const { data } = response; // Properly access response
  
//         const formattedData = data.map((item) => ({
//           rtomId: item.rtom_id || "N/A",
//           areaName: item.area_name || "N/A",
//           rtomAbbreviation: item.rtom_abbreviation || "N/A",
//           contactNumber: item.rtom_contact_number || "N/A",
//           status: item.rtom_status || "N/A",
//           faxNumber: item.rtom_fax_number || "N/A",
//         }));
  
//         setData(formattedData);
//         setLoading(false);
//       } catch (error) {
//         setError("Failed to fetch RTOM details. Please try again later.",error.message);
//         setLoading(false);
//       }
//     };
  
//     fetchData();
//   }, []);

//   // Dummy data for dropdown
//   const statuses = ["Active", "Inactive"];
//   const rtomNames = ["RTOM 1", "RTOM 2", "RTOM 3", "RTOM 4"];
//   const serviceTypes = ["PEO", "LTE", "FTTH", "DSL"];

//   // Dummy data
//   const roListData = [
//     { name: "AB", status: "Active", enableDate: "2024-12-24", contact: "0123456789" },
//     { name: "KU", status: "Inactive", enableDate: "2024-12-20", contact: "0111111111" },
//     { name: "XY", status: "Active", enableDate: "2025-01-01", contact: "0987654321" },
//     { name: "MN", status: "Inactive", enableDate: "2024-11-15", contact: "0223334444" },
//   ];

//   // const rtomListData = [
//   //   { name: "RTOM 1", abbreviation: "AB", enableDate: "2024-12-24", contact: "0123456789", count: 10 },
//   //   { name: "RTOM 2", abbreviation: "KU", enableDate: "2024-12-20", contact: "0111111111", count: 5 },
//   //   { name: "RTOM 3", abbreviation: "XY", enableDate: "2025-01-01", contact: "0987654321", count: 7 },
//   //   { name: "RTOM 4", abbreviation: "MN", enableDate: "2024-11-15", contact: "0223334444", count: 3 },
//   // ];

//   const servicesListData = [
//     { type: "PEO", enableDate: "2025-01-01", active: true },
//     { type: "LTE", enableDate: "2025-02-01", active: false },
//     { type: "FTTH", enableDate: "2025-03-01", active: true },
//     { type: "DSL", enableDate: "2025-04-01", active: false },
//   ];

//   const filteredData =
//     activeTab === "RO"
//       ? roListData.filter((row) => {
//           const matchesSearchQuery = Object.values(row)
//             .join(" ")
//             .toLowerCase()
//             .includes(searchQuery.toLowerCase());
//           const matchesStatus =
//             !appliedFilters.status || row.status === appliedFilters.status;
//           const matchesDrc =
//             !appliedFilters.drc || row.drc_name === appliedFilters.drc;

//           return matchesSearchQuery && matchesStatus && matchesDrc;
//         })
//       : activeTab === "RTOM"
//       ? rtomListData.filter((row) => {
//           const matchesSearchQuery = Object.values(row)
//             .join(" ")
//             .toLowerCase()
//             .includes(searchQuery.toLowerCase());
//           const matchesRtom =
//             !appliedFilters.rtom || row.name === appliedFilters.rtom;

//           return matchesSearchQuery && matchesRtom;
//         })
//       : activeTab === "Services"
//       ? servicesListData.filter((row) => {
//           const matchesSearchQuery = Object.values(row)
//             .join(" ")
//             .toLowerCase()
//             .includes(searchQuery.toLowerCase());
//           const matchesService =
//             !appliedFilters.service || row.type === appliedFilters.service;

//           return matchesSearchQuery && matchesService;
//         })
//       : [];

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
//     setAppliedFilters({ status, rtom: rtomFilter, service: serviceFilter });
//     setCurrentPage(0);
//   };

//   const toggleService = (id) => {
//     ((prevServices) =>
//       prevServices.map((service) =>
//         service.id === id ? { ...service, enabled: !service.enabled } : service
//       )
//     );
//   };

//   const startIndex = currentPage * rowsPerPage;
//   const endIndex = startIndex + rowsPerPage;
//   const paginatedData = filteredData.slice(startIndex, endIndex);

//   return (
//     <div className={GlobalStyle.fontPoppins}>
//       <div className="flex justify-between items-center mb-8">
//         <h1 className={GlobalStyle.headingLarge}>
//           Sensus - Sensus BPO Services (Pvt) Ltd
//         </h1>
//       </div>

//       {/* Filter Section */}
//       <div className="flex flex-col mb-10">
//         {activeTab === "RO" && (
//           <div className="flex gap-4 justify-end">
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
//             <button
//               onClick={handleFilter}
//               className={`${GlobalStyle.buttonPrimary} flex items-center gap-2`}
//             >
//               Filter
//             </button>
//           </div>
//         )}
//         {activeTab === "RTOM" && (
//           <div className="flex gap-4 justify-end">
//             <select
//               value={rtomFilter}
//               onChange={(e) => setRtomFilter(e.target.value)}
//               className={GlobalStyle.selectBox}
//             >
//               <option value="">Select RTOM</option>
//               {rtomNames.map((rtomOption, index) => (
//                 <option key={index} value={rtomOption}>
//                   {rtomOption}
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
//         )}
//         {activeTab === "Services" && (
//           <div className="flex gap-4 justify-end">
//             <select
//               value={serviceFilter}
//               onChange={(e) => setServiceFilter(e.target.value)}
//               className={GlobalStyle.selectBox}
//             >
//               <option value="">Select Service</option>
//               {serviceTypes.map((serviceOption, index) => (
//                 <option key={index} value={serviceOption}>
//                   {serviceOption}
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
//         )}
//       </div>

//       {/* Rest of the Component */}
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

//       {/* Tabs */}
//       <div className="flex border-b mb-4">
//         {["RO", "RTOM", "Services"].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`px-4 py-2 ${
//               activeTab === tab
//                 ? "border-b-2 border-blue-500 font-bold"
//                 : "text-gray-500"
//             }`}
//           >
//             {tab} List
//           </button>
//         ))}
//       </div>

//       {/* Table */}
//       <div className={GlobalStyle.tableContainer}>
//         <table className={GlobalStyle.table}>
//           <thead className={GlobalStyle.thead}>
//             <tr>
//               {activeTab === "RO" && (
//                 <>
//                   <th className={GlobalStyle.tableHeader}>RO Name</th>
//                   <th className={GlobalStyle.tableHeader}>Status</th>
//                   <th className={GlobalStyle.tableHeader}>Enable Date</th>
//                   <th className={GlobalStyle.tableHeader}>Contact</th>
//                 </>
//               )}
//               {activeTab === "RTOM" && (
//                 <>
//                   <th className={GlobalStyle.tableHeader}>RTOM Name</th>
//                   <th className={GlobalStyle.tableHeader}>Abbreviation</th>
//                   <th className={GlobalStyle.tableHeader}>Enable Date</th>
//                   <th className={GlobalStyle.tableHeader}>Contact</th>
//                 </>
//               )}
//               {activeTab === "Services" && (
//                 <>
//                   <th className={GlobalStyle.tableHeader}>Service Type</th>
//                   <th className={GlobalStyle.tableHeader}>Enable Date</th>
//                   <th className={GlobalStyle.tableHeader}>Active</th>
//                 </>
//               )}
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedData.map((row, index) => (
//               <tr
//                 key={index}
//                 className={`${
//                   index % 2 === 0
//                     ? "bg-white bg-opacity-75"
//                     : "bg-gray-50 bg-opacity-50"
//                 } border-b`}
//               >
//                 {activeTab === "RO" && (
//                   <>
//                     <td className={GlobalStyle.tableData}>{row.name}</td>
//                     <td className={GlobalStyle.tableData}>{row.status}</td>
//                     <td className={GlobalStyle.tableData}>
//                       {row.enableDate}
//                     </td>
//                     <td className={GlobalStyle.tableData}>{row.contact}</td>
//                   </>
//                 )}
//                 {activeTab === "RTOM" && (
//                   <>
//                     <td className={GlobalStyle.tableData}>{row.name}</td>
//                     <td className={GlobalStyle.tableData}>
//                       {row.abbreviation}
//                     </td>
//                     <td className={GlobalStyle.tableData}>
//                       {row.enableDate}
//                     </td>
//                     <td className={GlobalStyle.tableData}>{row.contact}</td>
//                   </>
//                 )}
//                 {activeTab === "Services" && (
//                   <>
//                     <td className={GlobalStyle.tableData}>{row.type}</td>
//                     <td className={GlobalStyle.tableData}>
//                       {row.enableDate}
//                     </td>
//                     <td className={GlobalStyle.tableData}>
//                     <label className="inline-flex relative items-center cursor-pointer">
//                           <input
//                             type="checkbox"
//                             className="sr-only peer"
//                             checked={row.enabled}
//                             onChange={() => toggleService(row.id)}
//                           />
//                           <div className="w-11 h-6 bg-gray-500 rounded-full peer peer-focus:ring-4 peer-focus:ring-green-300 peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
//                         </label>
//                     </td>
//                   </>
//                 )}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
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

// export default DRCsInfo;



//code v3 , Working code RO Integration done and Rtom integration done but it shows data get from the responce upto now.

import { useState, useEffect } from "react";
import GlobalStyle from "../../assets/prototype/GlobalStyle";
import { FaArrowLeft, FaArrowRight, FaSearch } from "react-icons/fa";
import { getAllRTOMsByDRCID } from "../../services/rtom/RtomService";
import { fetchRODataByDRC } from "../../services/Ro/RO"; // Import for RO fetch function

const DRCsInfo = () => {
  const [activeTab, setActiveTab] = useState("RO");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [roData, setRoData] = useState([]); // Separate state for RO data
  const [rtomData, setRtomData] = useState([]); // Separate state for RTOM data
  const [servicesData, setServicesData] = useState([]); // Separate state for Services data
  const [error, setError] = useState("");
  const [drcName, setDrcName] = useState("");
  const [selectedDRCId, setSelectedDRCId] = useState("10"); // Default DRC ID

  // Filters
  const [status, setStatus] = useState("");
  const [rtomFilter, setRtomFilter] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [appliedFilters, setAppliedFilters] = useState({
    status: "",
    rtom: "",
    service: "",
  });

  const rowsPerPage = 7;

  // Fetch RO data
  useEffect(() => {
    const fetchROData = async () => {
      if (activeTab !== "RO") return; // Only fetch if active tab is RO
      try {
        setLoading(true);
        const roDataResponse = await fetchRODataByDRC(selectedDRCId);

        // Extract the DRC name from the response
        if (roDataResponse.length > 0) {
          setDrcName(roDataResponse[0].drc_name || "Unknown DRC");
        } else {
          setDrcName("Unknown DRC");
        }

        // Process RO data
        const formattedROData = roDataResponse.map((item) => ({
          name: item.ro_name || "N/A",
          status:
            item.ro_status.length > 0
              ? item.ro_status[item.ro_status.length - 1].status || "N/A"
              : "N/A",
          enableDate:
            item.ro_status.length > 0
              ? new Date(
                  item.ro_status[item.ro_status.length - 1].ro_status_date
                ).toLocaleDateString() || "N/A"
              : "N/A",
          contact: item.ro_contact_no || "N/A",
        }));

        setRoData(formattedROData);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch RO details. Please try again later.");
        setLoading(false);
      }
    };

    fetchROData();
  }, [activeTab, selectedDRCId]);


  // Fetch RTOM data
  useEffect(() => {
    const fetchRTOMData = async () => {
      if (activeTab !== "RTOM") return; // Only fetch if active tab is RTOM
      try {
        setLoading(true);
        const rtomDataResponse = await getAllRTOMsByDRCID(selectedDRCId);
  
        // Process RTOM data
        const formattedRTOMData = rtomDataResponse.map((item) => ({
          name: item.area_name || "N/A", // RTOM Name
          abbreviation: item.rtom_abbreviation || "N/A",
          enableDate:
            item.createdAt !== undefined
              ? new Date(item.createdAt).toLocaleDateString()
              : "N/A",
          contact: item.rtom_contact_number || "N/A",
        }));
  
        setRtomData(formattedRTOMData);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch RTOM details. Please try again later.");
        setLoading(false);
       }
    };
     
    fetchRTOMData();
  }, [activeTab, selectedDRCId]);

  // Fetch Services data (dummy data for now)
  useEffect(() => {
    if (activeTab !== "Services") return; // Only fetch if active tab is Services

    // Simulating a service data fetch
    const services = [
      { type: "PEO", enableDate: "2025-01-01", active: true },
      { type: "LTE", enableDate: "2025-02-01", active: false },
      { type: "FTTH", enableDate: "2025-03-01", active: true },
      { type: "DSL", enableDate: "2025-04-01", active: false },
    ];
    setServicesData(services);
    setLoading(false);
  }, [activeTab]);

  const filteredData =
    activeTab === "RO"
      ? roData.filter((row) => {
          const matchesSearchQuery = Object.values(row)
            .join(" ")
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
          const matchesStatus =
            !appliedFilters.status || row.status === appliedFilters.status;

          return matchesSearchQuery && matchesStatus;
        })
      : activeTab === "RTOM"
      ? rtomData.filter((row) => {
          const matchesSearchQuery = Object.values(row)
            .join(" ")
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
          const matchesRtom =
            !appliedFilters.rtom || row.name === appliedFilters.rtom;

          return matchesSearchQuery && matchesRtom;
        })
      : activeTab === "Services"
      ? servicesData.filter((row) => {
          const matchesSearchQuery = Object.values(row)
            .join(" ")
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
          const matchesService =
            !appliedFilters.service || row.type === appliedFilters.service;

          return matchesSearchQuery && matchesService;
        })
      : [];

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

  const handleFilter = () => {
    setAppliedFilters({ status, rtom: rtomFilter, service: serviceFilter });
    setCurrentPage(0);
  };

  const startIndex = currentPage * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return (
    <div className={GlobalStyle.fontPoppins}>
      <div className="flex justify-between items-center mb-8">
        <h1 className={GlobalStyle.headingLarge}>{`${drcName}`}</h1>
      </div>

      {/* Filter Section */}
      <div className="flex flex-col mb-10">
        {activeTab === "RO" && (
          <div className="flex gap-4 justify-end">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={GlobalStyle.selectBox}
            >
              <option value="">Select Status</option>
              {["Active", "Inactive"].map((statusOption, index) => (
                <option key={index} value={statusOption}>
                  {statusOption}
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
        )}
        {activeTab === "RTOM" && (
          <div className="flex gap-4 justify-end">
            <select
              value={rtomFilter}
              onChange={(e) => setRtomFilter(e.target.value)}
              className={GlobalStyle.selectBox}
            >
              <option value="">Select RTOM</option>
              {["RTOM 1", "RTOM 2", "RTOM 3", "RTOM 4"].map(
                (rtomOption, index) => (
                  <option key={index} value={rtomOption}>
                    {rtomOption}
                  </option>
                )
              )}
            </select>
            <button
              onClick={handleFilter}
              className={`${GlobalStyle.buttonPrimary} flex items-center gap-2`}
            >
              Filter
            </button>
          </div>
        )}
        {activeTab === "Services" && (
          <div className="flex gap-4 justify-end">
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className={GlobalStyle.selectBox}
            >
              <option value="">Select Service</option>
              {["PEO", "LTE", "FTTH", "DSL"].map((serviceOption, index) => (
                <option key={index} value={serviceOption}>
                  {serviceOption}
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
        )}
      </div>

      {/* Rest of the Component */}
      <div className="mb-4 flex justify-start">
        <div className={GlobalStyle.searchBarContainer}>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={GlobalStyle.inputSearch}
          />
          <FaSearch className={GlobalStyle.searchBarIcon} />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-4">
        {["RO", "RTOM", "Services"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 ${
              activeTab === tab
                ? "border-b-2 border-blue-500 font-bold"
                : "text-gray-500"
            }`}
          >
            {tab} List
          </button>
        ))}
      </div>

      {/* Table */}
      <div className={GlobalStyle.tableContainer}>
        <table className={GlobalStyle.table}>
          <thead className={GlobalStyle.thead}>
            <tr>
              {activeTab === "RO" && (
                <>
                  <th className={GlobalStyle.tableHeader}>RO Name</th>
                  <th className={GlobalStyle.tableHeader}>Status</th>
                  <th className={GlobalStyle.tableHeader}>Enable Date</th>
                  <th className={GlobalStyle.tableHeader}>Contact</th>
                </>
              )}
              {activeTab === "RTOM" && (
                <>
                  <th className={GlobalStyle.tableHeader}>RTOM Name</th>
                  <th className={GlobalStyle.tableHeader}>Abbreviation</th>
                  <th className={GlobalStyle.tableHeader}>Enable Date</th>
                  <th className={GlobalStyle.tableHeader}>Contact</th>
                </>
              )}
              {activeTab === "Services" && (
                <>
                  <th className={GlobalStyle.tableHeader}>Service Type</th>
                  <th className={GlobalStyle.tableHeader}>Enable Date</th>
                  <th className={GlobalStyle.tableHeader}>Active</th>
                </>
              )}
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
                {activeTab === "RO" && (
                  <>
                    <td className={GlobalStyle.tableData}>{row.name}</td>
                    <td className={GlobalStyle.tableData}>{row.status}</td>
                    <td className={GlobalStyle.tableData}>{row.enableDate}</td>
                    <td className={GlobalStyle.tableData}>{row.contact}</td>
                  </>
                )}
                {activeTab === "RTOM" && (
                  <>
                    <td className={GlobalStyle.tableData}>{row.name}</td>
                    <td className={GlobalStyle.tableData}>
                      {row.abbreviation}
                    </td>
                    <td className={GlobalStyle.tableData}>
                      {row.enableDate}
                    </td>
                    <td className={GlobalStyle.tableData}>{row.contact}</td>
                  </>
                )}
                {activeTab === "Services" && (
                  <>
                    <td className={GlobalStyle.tableData}>{row.type}</td>
                    <td className={GlobalStyle.tableData}>{row.enableDate}</td>
                    <td className={GlobalStyle.tableData}>
                      {row.active ? "Yes" : "No"}
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredData.length > rowsPerPage && (
        <div className={GlobalStyle.navButtonContainer}>
          <button
            className={GlobalStyle.navButton}
            onClick={handlePrevPage}
            disabled={currentPage === 0}
          >
            <FaArrowLeft />
          </button>
          <span>
            Page {currentPage + 1} of {pages}
          </span>
          <button
            className={GlobalStyle.navButton}
            onClick={handleNextPage}
            disabled={currentPage === pages - 1}
          >
            <FaArrowRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default DRCsInfo;

