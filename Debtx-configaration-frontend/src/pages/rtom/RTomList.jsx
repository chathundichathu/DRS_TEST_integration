// import { useState, useEffect } from "react";
// import { FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa";
// import GlobalStyle from "../../assets/prototype/GlobalStyle";
// import { Link } from "react-router-dom";
// import user_add from "../../assets/images/user-add.svg";
// import more_info from "../../assets/images/more-info.svg";
// import activeIcon from "../../assets/images/active.svg";
// import deactiveIcon from "../../assets/images/deactive.svg";

// const RTomList = () => {
//   const [searchQuery, setSearchQuery] = useState(""); // For searching
//   const [currentPage, setCurrentPage] = useState(0); // Pagination state
//   const [data, setData] = useState([]); // Fetched data
//   const [error, setError] = useState(""); // Error state for API calls
//   const [rtom_status, setRtom_status] = useState("");
//   const [appliedFilters, setAppliedFilters] = useState({ rtom_status: "", drc: "" });
  

//   const rowsPerPage = 7; // Rows to display per page

//   // Dummy data for dropdown
//   const statuses = ["Active", "Inactive"];

//   // Fetch data from backend
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:5000/api/RTOM/RTOM_Details" // Backend URL
//         ); 

//         if (!response.ok) {
//           throw new Error("Failed to fetch data.");
//         }

//         const result = await response.json();
//         console.log("API Response:", result); // Debugging: Log API response

//         // Ensure data is an array before setting it
//         setData(Array.isArray(result.data) ? result.data : []);
//       } catch (err) {
//         console.error("Error fetching data:", err.message);
//         setError(err.message); // Set error message to display in UI
//       }
//     };

//     fetchData();
//   }, []);

//   // Function to filter and search data
//   const filteredData = data.filter((row) => {
//     const matchesSearchQuery = Object.values(row)
//       .join(" ")
//       .toLowerCase()
//       .includes(searchQuery.toLowerCase());
//     const matchesStatus =
//       !appliedFilters.rtom_status || row.rtom_status === appliedFilters.rtom_status;

//     return matchesSearchQuery && matchesStatus;
//   });

//   // Pagination calculations
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

//   const handleFilter = () => {
//     setAppliedFilters({ rtom_status });
//     setCurrentPage(0); 
//   };

//   return (
//     <div className={GlobalStyle.fontPoppins}>
//       {/* Heading */}
//       <div className={`${GlobalStyle.headingLarge} mb-8`}>
//         <span>RTOM List</span>
//       </div>

//       {/* Add Button */}
//       <div className="flex justify-end mb-5">
//         <Link to="/config/regi-rtom">
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
//               value={rtom_status}
//               onChange={(e) => setRtom_status(e.target.value)}
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

//       {/* Error Message */}
//       {error && (
//         <div className="text-red-500 text-center mb-4">
//           <p>{error}</p>
//         </div>
//       )}

//       {/* Table Section */}
//       <div className={GlobalStyle.tableContainer}>
//         <table className={GlobalStyle.table}>
//           <thead className={GlobalStyle.thead}>
//             <tr>
//               <th className={GlobalStyle.tableHeader}>RTOM ID</th>
//               <th className={GlobalStyle.tableHeader}>Status</th>
//               <th className={GlobalStyle.tableHeader}>Abbreviation</th>
//               <th className={GlobalStyle.tableHeader}>Area Name</th>
//               <th className={GlobalStyle.tableHeader}>Telephone No</th>
//               <th className={GlobalStyle.tableHeader}>Fax No</th>
//               <th className={GlobalStyle.tableHeader}></th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedData.map((row, index) => (
//               <tr
//                 key={row.rtom_id}
//                 className={`${
//                   index % 2 === 0
//                     ? "bg-white bg-opacity-75"
//                     : "bg-gray-50 bg-opacity-50"
//                 } border-b`}
//               >
//                 <td className={GlobalStyle.tableData}>{row.rtom_id}</td>
//                 <td>
//                   <div className="flex items-center justify-center gap-2">
//                     <img
//                        src={row.status === "Active" ? activeIcon : deactiveIcon}
//                        alt={row.status}
//                        className="w-5 h-5"
//                        title={row.status === "Active" ? "Active" : "Deactive"}
//                        />
//                   </div>
//                 </td>
//                 <td className={GlobalStyle.tableData}>
//                   {row.rtom_abbreviation}
//                 </td>
//                 <td className={GlobalStyle.tableData}>{row.area_name}</td>
//                 <td className={GlobalStyle.tableData}>
//                   {row.rtom_contact_number}
//                 </td>
//                 <td className={GlobalStyle.tableData}>
//                   {row.rtom_fax_number}
//                 </td>
//                 <td className={GlobalStyle.tableData}>
//                   <Link to="/config/rtom-info">
//                     <img
//                       src={more_info}
//                       title="More Info"
//                       className="w-6 h-6"
//                     />
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//             {paginatedData.length === 0 && (
//               <tr>
//                 <td colSpan="7" className="text-center py-4">
//                   No results found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Navigation Buttons */}
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

// export default RTomList;

import { useState, useEffect } from "react";
import { FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import GlobalStyle from "../../assets/prototype/GlobalStyle";
import { Link } from "react-router-dom";
import user_add from "../../assets/images/user-add.svg";
import more_info from "../../assets/images/more-info.svg";
import activeIcon from "../../assets/images/active.svg";
import deactiveIcon from "../../assets/images/deactive.svg";
import { getRTOMDetails } from "../../services/rtom/RtomService";

const RTomList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [rtom_status, setRtom_status] = useState("");
  const [appliedFilters, setAppliedFilters] = useState({ rtom_status: "", drc: "" });
  const [loading, setLoading] = useState(true);

  const rowsPerPage = 7;

  // Dropdown options
  const statuses = ["Active", "Inactive"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRTOMDetails();
        const { data } = response; // Properly access response
  
        const formattedData = data.map((item) => ({
          rtomId: item.rtom_id || "N/A",
          areaName: item.area_name || "N/A",
          rtomAbbreviation: item.rtom_abbreviation || "N/A",
          contactNumber: item.rtom_contact_number || "N/A",
          status: item.rtom_status || "N/A",
          faxNumber: item.rtom_fax_number || "N/A",
        }));
  
        setData(formattedData);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch RTOM details. Please try again later.",error.message);
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  // Filtered data
  const filteredData = data.filter((row) => {
    const matchesSearchQuery = Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      !appliedFilters.rtom_status || row.status === appliedFilters.rtom_status;

    return matchesSearchQuery && matchesStatus;
  });

  // Pagination calculations
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

  const handleFilter = () => {
    setAppliedFilters({ rtom_status });
    setCurrentPage(0);
  };

  return (
    <div className={GlobalStyle.fontPoppins}>
      <div className={`${GlobalStyle.headingLarge} mb-8`}>
        <span>RTOM List</span>
      </div>

      <div className="flex justify-end mb-5">
        <Link to="/config/regi-rtom">
          <button>
            <img src={user_add} title="Add RO" className="w-8 h-8" />
          </button>
        </Link>
      </div>

      <div className="flex flex-col">
        <div className="mb-10 flex justify-end">
          <div className="flex gap-4">
            <select
              value={rtom_status}
              onChange={(e) => setRtom_status(e.target.value)}
              className={GlobalStyle.selectBox}
            >
              <option value="">Select Status</option>
              {statuses.map((statusOption, index) => (
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
        </div>
      </div>

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

      {error && (
        <div className="text-red-500 text-center mb-4">
          <p>{error}</p>
        </div>
      )}

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className={GlobalStyle.tableContainer}>
          <table className={GlobalStyle.table}>
            <thead className={GlobalStyle.thead}>
              <tr>
                <th className={GlobalStyle.tableHeader}>RTOM ID</th>
                <th className={GlobalStyle.tableHeader}>Status</th>
                <th className={GlobalStyle.tableHeader}>Abbreviation</th>
                <th className={GlobalStyle.tableHeader}>Area Name</th>
                <th className={GlobalStyle.tableHeader}>Telephone No</th>
                <th className={GlobalStyle.tableHeader}>Fax No</th>
                <th className={GlobalStyle.tableHeader}></th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, index) => (
                <tr
                  key={row.rtomId}
                  className={`${
                    index % 2 === 0
                      ? "bg-white bg-opacity-75"
                      : "bg-gray-50 bg-opacity-50"
                  } border-b`}
                >
                  <td className={GlobalStyle.tableData}>{row.rtomId}</td>
                  <td>
                    <div className="flex items-center justify-center gap-2">
                      <img
                        src={row.status === "Active" ? activeIcon : deactiveIcon}
                        alt={row.status}
                        className="w-5 h-5"
                        title={row.status}
                      />
                    </div>
                  </td>
                  <td className={GlobalStyle.tableData}>
                    {row.rtomAbbreviation}
                  </td>
                  <td className={GlobalStyle.tableData}>{row.areaName}</td>
                  <td className={GlobalStyle.tableData}>
                    {row.contactNumber}
                  </td>
                  <td className={GlobalStyle.tableData}>{row.faxNumber}</td>
                  <td className={GlobalStyle.tableData}>
                    <Link to={`/config/rtom-info/${row.rtomId}`}>
                      <img
                        src={more_info}
                        title="More Info"
                        className="w-6 h-6"
                      />
                    </Link>
                  </td>
                </tr>
              ))}
              {paginatedData.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

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

export default RTomList;

