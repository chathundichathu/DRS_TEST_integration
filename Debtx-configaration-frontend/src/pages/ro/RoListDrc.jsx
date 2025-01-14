// import React, { useState, useEffect } from "react";
// import { fetchRODataByDRC } from "../../services/Ro/RO"; // Update the path based on your project structure
// import { FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa";
// import GlobalStyle from "../../assets/prototype/GlobalStyle";
// import activeIcon from "../../assets/images/active.svg";
// import deactiveIcon from "../../assets/images/deactive.svg";

// const ROListDrc = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedStatus, setSelectedStatus] = useState("");
//   const [selectedDRC, setSelectedDRC] = useState("");
//   const [currentPage, setCurrentPage] = useState(0);
//   const rowsPerPage = 7;
//   const [roData, setRoData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [requestDrcId, setRequestDrcId] = useState(10); // Replace '10' with the initial drc_id

//   useEffect(() => {
//     const fetchRoData = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const data = await fetchRODataByDRC(requestDrcId);
//         setRoData(data);
//       } catch (err) {
//         setError(err.message || "Error fetching data");
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchRoData();
//   }, [requestDrcId]);

//   // Extract the latest status for each recovery officer
//   const getLastStatus = (statusArray) => {
//     if (Array.isArray(statusArray) && statusArray.length > 0) {
//       return statusArray[statusArray.length - 1].status; // Get the last status
//     }
//     return "Unknown"; // Default if no status
//   };

//   const filteredData = roData.filter((row) => {
//     // Match status filter
//     const statusMatch =
//       selectedStatus === "" ||
//       getLastStatus(row.ro_status).toLowerCase() ===
//         selectedStatus.toLowerCase();

//     // Match DRC filter
//     const drcMatch =
//       selectedDRC === "" ||
//       row.drc_name.toLowerCase() === selectedDRC.toLowerCase();

//     // Match search query
//     const searchMatch = Object.values(row)
//       .join(" ")
//       .toLowerCase()
//       .includes(searchQuery.toLowerCase());

//     return statusMatch && drcMatch && searchMatch;
//   });

//   const pages = Math.ceil(filteredData.length / rowsPerPage);
//   const startIndex = currentPage * rowsPerPage;
//   const endIndex = startIndex + rowsPerPage;
//   const paginatedData = filteredData.slice(startIndex, endIndex);

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

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className={GlobalStyle.fontPoppins}>
//       <h1 className={GlobalStyle.headingLarge}>RO List</h1>
//       <div className="flex justify-end gap-4 items-center mb-8">
//         <select
//           className={GlobalStyle.selectBox}
//           value={selectedStatus}
//           onChange={(e) => setSelectedStatus(e.target.value)}
//         >
//           <option value="">Status</option>
//           <option value="Active">Active</option>
//           <option value="Inactive">Inactive</option>
//         </select>

//         <select
//           className={GlobalStyle.selectBox}
//           value={selectedDRC}
//           onChange={(e) => setSelectedDRC(e.target.value)}
//         >
//           <option value="Example Company">Example Company</option>
//           <option value="Sensus BPO">Sensus BPO</option>
//           <option value="CMS">CMS</option>
//         </select>

//         <button
//           className={GlobalStyle.buttonPrimary}
//           onClick={() => setCurrentPage(0)}
//         >
//           Filter
//         </button>
//       </div>

//       <div className="flex flex-col">
//         <div className="mb-4 flex justify-start">
//           <div className={GlobalStyle.searchBarContainer}>
//             <input
//               type="text"
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
//                   DRC ID
//                 </th>
//                 <th scope="col" className={GlobalStyle.tableHeader}>
//                   Status
//                 </th>
//                 <th scope="col" className={GlobalStyle.tableHeader}>
//                   DRC
//                 </th>
//                 <th scope="col" className={GlobalStyle.tableHeader}>
//                   RO ID
//                 </th>
//                 <th scope="col" className={GlobalStyle.tableHeader}>
//                   RO Name
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {paginatedData.map((row, index) => (
//                 <tr
//                   key={index}
//                   className={`${
//                     index % 2 === 0
//                       ? "bg-white bg-opacity-75"
//                       : "bg-gray-50 bg-opacity-50"
//                   } border-b`}
//                 >
//                   <td className={GlobalStyle.tableData}>{requestDrcId}</td>
//                   <td className={GlobalStyle.tableData}>
//                     <div className="flex items-center justify-center gap-2">
//                       <img
//                         src={getLastStatus(row.ro_status) === "Active" ? activeIcon : deactiveIcon}
//                         alt={getLastStatus(row.ro_status)}
//                         className="w-5 h-5"
//                         title={getLastStatus(row.ro_status)}
//                       />
//                     </div>
//                   </td>
//                   <td className={GlobalStyle.tableData}>{row.drc_name}</td>
//                   <td className={GlobalStyle.tableData}>{row.ro_id}</td>
//                   <td className={GlobalStyle.tableData}>{row.ro_name}</td>
//                 </tr>
//               ))}
//               {paginatedData.length === 0 && (
//                 <tr>
//                   <td colSpan="5" className="text-center py-4">
//                     No results found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

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

// export default ROListDrc;


// working code 



// import React, { useState, useEffect } from "react";
// import { fetchRODataByDRC } from "../../services/Ro/RO"; // Update the path based on your project structure
// import { FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa";
// import GlobalStyle from "../../assets/prototype/GlobalStyle";
// import activeIcon from "../../assets/images/active.svg";
// import deactiveIcon from "../../assets/images/deactive.svg";

// const ROListDrc = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedStatus, setSelectedStatus] = useState("");
//   const [selectedDRC, setSelectedDRC] = useState("");
//   const [currentPage, setCurrentPage] = useState(0);
//   const rowsPerPage = 7;
//   const [roData, setRoData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [requestDrcId, setRequestDrcId] = useState(10); // Replace '10' with the initial drc_id

//   // Define the DRC array
//   const drcArray = [
//     { id: 10, name: "Example Company" },
//     { id: 11, name: "Mobitel" },
//   ];

//   useEffect(() => {
//     const fetchRoData = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const data = await fetchRODataByDRC(requestDrcId);
//         setRoData(data);
//       } catch (err) {
//         setError(err.message || "Error fetching data");
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchRoData();
//   }, [requestDrcId]);

//   // Extract the latest status for each recovery officer
//   const getLastStatus = (statusArray) => {
//     if (Array.isArray(statusArray) && statusArray.length > 0) {
//       return statusArray[statusArray.length - 1].status; // Get the last status
//     }
//     return "Unknown"; // Default if no status
//   };

//   const filteredData = roData.filter((row) => {
//     // Match status filter
//     const statusMatch =
//       selectedStatus === "" ||
//       getLastStatus(row.ro_status).toLowerCase() ===
//         selectedStatus.toLowerCase();

//     // Match DRC filter
//     const drcMatch =
//       selectedDRC === "" ||
//       row.drc_name.toLowerCase() === selectedDRC.toLowerCase();

//     // Match search query
//     const searchMatch = Object.values(row)
//       .join(" ")
//       .toLowerCase()
//       .includes(searchQuery.toLowerCase());

//     return statusMatch && drcMatch && searchMatch;
//   });

//   const pages = Math.ceil(filteredData.length / rowsPerPage);
//   const startIndex = currentPage * rowsPerPage;
//   const endIndex = startIndex + rowsPerPage;
//   const paginatedData = filteredData.slice(startIndex, endIndex);

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

//   // Update the DRC ID based on selected DRC
//   const handleDRCChange = (e) => {
//     const selected = e.target.value;
//     setSelectedDRC(selected);
//     const selectedDrc = drcArray.find((drc) => drc.name === selected);
//     if (selectedDrc) {
//       setRequestDrcId(selectedDrc.id);
//     }
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className={GlobalStyle.fontPoppins}>
//       <h1 className={GlobalStyle.headingLarge}>RO List</h1>
//       <div className="flex justify-end gap-4 items-center mb-8">
//         <select
//           className={GlobalStyle.selectBox}
//           value={selectedStatus}
//           onChange={(e) => setSelectedStatus(e.target.value)}
//         >
//           <option value="">Status</option>
//           <option value="Active">Active</option>
//           <option value="Inactive">Inactive</option>
//         </select>

//         <select
//           className={GlobalStyle.selectBox}
//           value={selectedDRC}
//           onChange={handleDRCChange}
//         >
//           <option value="">Select DRC</option>
//           {drcArray.map((drc) => (
//             <option key={drc.id} value={drc.name}>
//               {drc.name}
//             </option>
//           ))}
//         </select>

//         <button
//           className={GlobalStyle.buttonPrimary}
//           onClick={() => setCurrentPage(0)}
//         >
//           Filter
//         </button>
//       </div>

//       <div className="flex flex-col">
//         <div className="mb-4 flex justify-start">
//           <div className={GlobalStyle.searchBarContainer}>
//             <input
//               type="text"
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
//                   DRC ID
//                 </th>
//                 <th scope="col" className={GlobalStyle.tableHeader}>
//                   Status
//                 </th>
//                 <th scope="col" className={GlobalStyle.tableHeader}>
//                   DRC
//                 </th>
//                 <th scope="col" className={GlobalStyle.tableHeader}>
//                   RO ID
//                 </th>
//                 <th scope="col" className={GlobalStyle.tableHeader}>
//                   RO Name
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {paginatedData.map((row, index) => (
//                 <tr
//                   key={index}
//                   className={`${
//                     index % 2 === 0
//                       ? "bg-white bg-opacity-75"
//                       : "bg-gray-50 bg-opacity-50"
//                   } border-b`}
//                 >
//                   <td className={GlobalStyle.tableData}>{requestDrcId}</td>
//                   <td className={GlobalStyle.tableData}>
//                     <div className="flex items-center justify-center gap-2">
//                       <img
//                         src={getLastStatus(row.ro_status) === "Active" ? activeIcon : deactiveIcon}
//                         alt={getLastStatus(row.ro_status)}
//                         className="w-5 h-5"
//                         title={getLastStatus(row.ro_status)}
//                       />
//                     </div>
//                   </td>
//                   <td className={GlobalStyle.tableData}>{row.drc_name}</td>
//                   <td className={GlobalStyle.tableData}>{row.ro_id}</td>
//                   <td className={GlobalStyle.tableData}>{row.ro_name}</td>
//                 </tr>
//               ))}
//               {paginatedData.length === 0 && (
//                 <tr>
//                   <td colSpan="5" className="text-center py-4">
//                     No results found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

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

// export default ROListDrc;


// working code 1/7/2025

import React, { useState, useEffect } from "react";
import { fetchRODataByDRC } from "../../services/Ro/RO"; // Update the path based on your project structure
import { FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import GlobalStyle from "../../assets/prototype/GlobalStyle";
import activeIcon from "../../assets/images/active.svg";
import deactiveIcon from "../../assets/images/deactive.svg";
import { fetchActiveDRCDetails } from "../../services/drc/DRCService";

const ROListDrc = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedDRC, setSelectedDRC] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 7;
  const [roData, setRoData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [requestDrcId, setRequestDrcId] = useState(10);
  const [drcArray, setDrcArray] = useState([]); // Updated to be dynamic

  useEffect(() => {
    const fetchDrcData = async () => {
      try {
        const drcDetails = await fetchActiveDRCDetails();
        setDrcArray(drcDetails);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchDrcData();
  }, []);

  useEffect(() => {
    const fetchRoData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchRODataByDRC(requestDrcId);
        setRoData(data);
      } catch (err) {
        setError(err.message || "Error fetching data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchRoData();
  }, [requestDrcId]);

  const getLastStatus = (statusArray) => {
    if (Array.isArray(statusArray) && statusArray.length > 0) {
      return statusArray[statusArray.length - 1].status;
    }
    return "Unknown";
  };

  const filteredData = roData.filter((row) => {
    const statusMatch =
      selectedStatus === "" ||
      getLastStatus(row.ro_status).toLowerCase() ===
        selectedStatus.toLowerCase();
    const drcMatch =
      selectedDRC === "" ||
      row.drc_name.toLowerCase() === selectedDRC.toLowerCase();
    const searchMatch = Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return statusMatch && drcMatch && searchMatch;
  });

  const pages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = currentPage * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

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

  const handleDRCChange = (e) => {
    const selected = e.target.value;
    setSelectedDRC(selected);
    const selectedDrc = drcArray.find((drc) => drc.name === selected);
    if (selectedDrc) {
      setRequestDrcId(selectedDrc.id);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={GlobalStyle.fontPoppins}>
      <h1 className={GlobalStyle.headingLarge}>RO List</h1>
      <div className="flex justify-end gap-4 items-center mb-8">
        <select
          className={GlobalStyle.selectBox}
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="">Status</option>
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
          className={GlobalStyle.buttonPrimary}
          onClick={() => setCurrentPage(0)}
        >
          Filter
        </button>
      </div>

      <div className="flex flex-col">
        <div className="mb-4 flex justify-start">
          <div className={GlobalStyle.searchBarContainer}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={GlobalStyle.inputSearch}
            />
            <FaSearch className={GlobalStyle.searchBarIcon} />
          </div>
        </div>

        <div className={GlobalStyle.tableContainer}>
          <table className={GlobalStyle.table}>
            <thead className={GlobalStyle.thead}>
              <tr>
                <th scope="col" className={GlobalStyle.tableHeader}>
                  DRC ID
                </th>
                <th scope="col" className={GlobalStyle.tableHeader}>
                  Status
                </th>
                <th scope="col" className={GlobalStyle.tableHeader}>
                  DRC
                </th>
                <th scope="col" className={GlobalStyle.tableHeader}>
                  RO ID
                </th>
                <th scope="col" className={GlobalStyle.tableHeader}>
                  RO Name
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
                  <td className={GlobalStyle.tableData}>{requestDrcId}</td>
                  <td className={GlobalStyle.tableData}>
                    <div className="flex items-center justify-center gap-2">
                      <img
                        src={
                          getLastStatus(row.ro_status) === "Active"
                            ? activeIcon
                            : deactiveIcon
                        }
                        alt={getLastStatus(row.ro_status)}
                        className="w-5 h-5"
                        title={getLastStatus(row.ro_status)}
                      />
                    </div>
                  </td>
                  <td className={GlobalStyle.tableData}>{row.drc_name}</td>
                  <td className={GlobalStyle.tableData}>{row.ro_id}</td>
                  <td className={GlobalStyle.tableData}>{row.ro_name}</td>
                </tr>
              ))}
              {paginatedData.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

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

export default ROListDrc;


