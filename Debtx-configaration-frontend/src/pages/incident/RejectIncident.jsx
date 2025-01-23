import DatePicker from "react-datepicker";
import { FaArrowLeft, FaArrowRight, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import GlobalStyle from "../../assets/prototype/GlobalStyle.jsx"; // Import GlobalStyle
import Reject_Pending from "../../assets/images/Reject_Pending.png"

export default function DRCcaseList() {
    const navigate = useNavigate();

    // Table data
    const tableData = [
        {
            id: "RC001",
            status: "Reject Pending4",
            account_no: "12345",
            filtered_reason: "Credit-class = VIP",
            rejected_on: "2024-11-01",
            source_type: "pilot-suspended",
        },
        {
            id: "RC002",
            status: "Reject Pending4",
            account_no: "12345",
            filtered_reason: "Customer Type = slt",
            rejected_on: "2024-11-01",
            source_type: "pilot-suspended",
        },
        {
            id: "RC003",
            status: "Reject Pending4",
            account_no: "12345",
            filtered_reason: "Credit-class = VIP",
            rejected_on: "2024-11-01",
            source_type: "pilot-suspended",
        }
        , {
            id: "RC001",
            status: "Reject Pending4",
            account_no: "12345",
            filtered_reason: "Credit-class = VIP",
            rejected_on: "2024-11-01",
            source_type: "pilot-suspended",
        },
        {
            id: "RC003",
            status: "Reject Pending4",
            account_no: "12345",
            filtered_reason: "Customer Type = slt",
            rejected_on: "2024-11-01",
            source_type: "pilot-suspended",
        },
        {
            id: "RC002",
            status: "Reject Pending4",
            account_no: "12345",
            filtered_reason: "Credit-class = VIP",
            rejected_on: "2024-11-01",
            source_type: "pilot-suspended",
        },
        {
            id: "RC001",
            status: "Reject Pending4",
            account_no: "12345",
            filtered_reason: "Credit-class = VIP",
            rejected_on: "2024-11-01",
            source_type: "pilot-suspended",
        },
        {
            id: "RC001",
            status: "Reject Pending4",
            account_no: "12345",
            filtered_reason: "Customer segment =2467",
            rejected_on: "2024-11-01",
            source_type: "pilot-suspended",
        },
    ];

    // Filter state
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [filteredData, setFilteredData] = useState(tableData);
    const [selectAllData, setSelectAllData] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    //search fuction 1
    const filteredSearchData = filteredData.filter((row) =>
        Object.values(row)
            .join(" ")
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
    );

    // Pagination state
    const itemsPerPage = 7;
    const totalPages = Math.ceil(filteredSearchData.length / itemsPerPage);

    // Filter handler
    const handleFilter = () => {
        if (startDate && endDate) {
            const filtered = tableData.filter((row) => {
                const assignedDate = new Date(row.assignedDate);
                const endDate1 = new Date(row.endDate);
                return assignedDate >= startDate && endDate1 <= endDate;
            });
            setFilteredData(filtered);
        } else {
            setFilteredData(tableData); // Reset if dates are not selected
        }
    };

    // Pagination handler
    const handlePrevNext = (direction) => {
        if (direction === "prev" && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
        if (direction === "next" && currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Paginated data
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filteredSearchData.slice(startIndex, endIndex);

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

            {/* Filter Section */}
            <div className="flex justify-end gap-10 my-12">
            
                <div className="flex flex-col">
                    
                    <div className="flex flex-col mb-4">
                        
                        <div className={GlobalStyle.datePickerContainer}>
                            <label className={GlobalStyle.dataPickerDate}>Date </label>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="dd/MM/yyyy"
                                className={GlobalStyle.inputText}
                            />
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="dd/MM/yyyy"
                                className={GlobalStyle.inputText}
                            />
                        </div>

                    </div>
                </div>
                <button
                    className={`${GlobalStyle.buttonPrimary} h-[35px] mt-2`}
                    onClick={handleFilter}
                >
                    Filter
                </button>
            </div>

            {/* Table Section */}
            <div className="flex flex-col">
                <div className="flex justify-start mb-4">
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
                </div>{" "}
                <div className={GlobalStyle.tableContainer}>
                    <table className={`${GlobalStyle.table}`}>
                        <thead className={GlobalStyle.thead}>
                            <tr>
                                <th scope="col" className={GlobalStyle.tableHeader}>
                                    Id
                                </th>
                                <th scope="col" className={GlobalStyle.tableHeader}>
                                    Status
                                </th>
                                <th scope="col" className={GlobalStyle.tableHeader}>
                                    Account No
                                </th>
                                <th scope="col" className={GlobalStyle.tableHeader}>
                                    Filtered Reason
                                </th>
                                <th scope="col" className={GlobalStyle.tableHeader}>
                                    Rejected On
                                </th>
                                <th scope="col" className={GlobalStyle.tableHeader}>
                                    Source Type
                                </th>
                                <th scope="col" className={GlobalStyle.tableHeader}></th>

                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((row, index) => (
                                <tr
                                    key={index}
                                    className={`${index % 2 === 0
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
                                    
                                    <td className={`${GlobalStyle.tableData} flex items-center justify-center`}>
  {row.status === "Reject Pending4" && (
    <img
      src={Reject_Pending}
      alt="Reject Pending"
      className="w-5 h-5"
    />
  )}
</td>
                                    <td className={GlobalStyle.tableData}>{row.status}</td>
                                    <td className={GlobalStyle.tableData}>{row.account_no}</td>
                                    <td className={GlobalStyle.tableData}>{row.filtered_reason}</td>
                                    <td className={GlobalStyle.tableData}>{row.rejected_on}</td>
                                    <td className={GlobalStyle.tableData}>{row.source_type}</td>
                                    <td className={GlobalStyle.tableData}>
                                        <div className="flex justify-center gap-2">
                                            <button
                                                className={GlobalStyle.buttonPrimary} // Prevents text from wrapping
                                            // onClick={() => navigate("/drc/Re-assign-DRC")}
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
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
                        Reject all
                    </label>

                    <Link
                        className={`${GlobalStyle.buttonPrimary} ml-4`}
                        to="/lod/ftllod/ftllod/downloadcreateftllod"
                    >
                        More Forward
                    </Link>
                </div>
            </div>

            {/* Pagination Section */}
            <div className={GlobalStyle.navButtonContainer}>
                <button
                    onClick={() => handlePrevNext("prev")}
                    disabled={currentPage === 1}
                    className={`${GlobalStyle.navButton} ${currentPage === 1 ? "cursor-not-allowed" : ""
                        }`}
                >
                    <FaArrowLeft />
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => handlePrevNext("next")}
                    disabled={currentPage === totalPages}
                    className={`${GlobalStyle.navButton} ${currentPage === totalPages ? "cursor-not-allowed" : ""
                        }`}
                >
                    <FaArrowRight />
                </button>
            </div>
        </div>
    );
<<<<<<< Updated upstream
}
=======
};




// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { FaArrowLeft, FaArrowRight, FaSearch } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import GlobalStyle from "../../assets/prototype/GlobalStyle.jsx"; // Import GlobalStyle
// import Reject_Pending from "../../assets/images/Reject_Pending.png";

// export default function RejectIncident() {
//   const navigate = useNavigate();

//   // Table data
//   const tableData = [
//     {
//       id: "RC001",
//       status: "Reject Pending",
//       account_no: "12345",
//       filtered_reason: "Credit-class = VIP",
//       rejected_on: "2024-11-01",
//       source_type: "pilot-suspended",
//     },
//     {
//       id: "RC002",
//       status: "Reject Pending",
//       account_no: "54321",
//       filtered_reason: "Customer Type = SLT",
//       rejected_on: "2024-11-01",
//       source_type: "pilot-suspended",
//     },
//     {
//       id: "RC003",
//       status: "Reject Pending",
//       account_no: "98765",
//       filtered_reason: "Credit-class = VIP",
//       rejected_on: "2024-11-01",
//       source_type: "pilot-suspended",
//     },
//   ];

//   // States
//   const [fromDate, setFromDate] = useState(null);
//   const [toDate, setToDate] = useState(null);
//   const [error, setError] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [filteredData, setFilteredData] = useState(tableData);

//   const rowsPerPage = 7;
//   const pages = Math.ceil(filteredData.length / rowsPerPage);

//   // Handle date validation
//   const handleFromDateChange = (date) => {
//     if (toDate && date > toDate) {
//       setError("The 'From' date cannot be later than the 'To' date.");
//     } else {
//       setError("");
//       setFromDate(date);
//     }
//   };

//   const handleToDateChange = (date) => {
//     if (fromDate && date < fromDate) {
//       setError("The 'To' date cannot be earlier than the 'From' date.");
//     } else {
//       setError("");
//       setToDate(date);
//     }
//   };

//   // Filter data
//   const handleFilter = () => {
//     const filtered = tableData.filter((row) => {
//       const rejectedDate = new Date(row.rejected_on);
//       const isWithinDateRange =
//         (!fromDate || rejectedDate >= fromDate) &&
//         (!toDate || rejectedDate <= toDate);
//       return isWithinDateRange;
//     });
//     setFilteredData(filtered);
//   };

//   // Search
//   const filteredSearchData = filteredData.filter((row) =>
//     Object.values(row)
//       .join(" ")
//       .toLowerCase()
//       .includes(searchQuery.toLowerCase())
//   );

//   // Pagination
//   const startIndex = (currentPage - 1) * rowsPerPage;
//   const paginatedData = filteredSearchData.slice(
//     startIndex,
//     startIndex + rowsPerPage
//   );

//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handleNextPage = () => {
//     if (currentPage < pages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   // Select all rows
//   const handleSelectAllRows = () => {
//     if (selectedRows.length === paginatedData.length) {
//       setSelectedRows([]);
//     } else {
//       setSelectedRows(paginatedData.map((row) => row.id));
//     }
//   };

//   const handleRowCheckboxChange = (id) => {
//     if (selectedRows.includes(id)) {
//       setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
//     } else {
//       setSelectedRows([...selectedRows, id]);
//     }
//   };

//   return (
//     <div className={GlobalStyle.fontPoppins}>
//       <div className="flex justify-between items-center w-full">
//         <h1 className={`${GlobalStyle.headingLarge} m-0`}>
//           Pending Reject Incidents
//         </h1>
//         <Link
//           className={`${GlobalStyle.buttonPrimary}`}
//           to="/lod/ftllod/ftllod/downloadcreateftllod"
//         >
//           Create Task
//         </Link>
//       </div>

//       {/* Filter Section */}
//       <div className="flex justify-between items-center gap-x-4 my-8">
//         <div className="flex items-center gap-2">
//           <h1 className="mr-2">Source:</h1>
//           <select className={GlobalStyle.selectBox}>
//             <option value="option1">Option 1</option>
//             <option value="option2">Option 2</option>
//             <option value="option3">Option 3</option>
//           </select>
//         </div>
//         <div className="flex items-center gap-2">
//           <div className={GlobalStyle.datePickerContainer}>
//             <label className={GlobalStyle.dataPickerDate}>Date:</label>
//             <div className="flex gap-2">
//               <DatePicker
//                 selected={fromDate}
//                 onChange={handleFromDateChange}
//                 dateFormat="dd/MM/yyyy"
//                 placeholderText="dd/MM/yyyy"
//                 className={GlobalStyle.inputText}
//               />
//               <DatePicker
//                 selected={toDate}
//                 onChange={handleToDateChange}
//                 dateFormat="dd/MM/yyyy"
//                 placeholderText="dd/MM/yyyy"
//                 className={GlobalStyle.inputText}
//               />
//             </div>
//           </div>
//           {error && <span className={GlobalStyle.errorText}>{error}</span>}
//         </div>
//         <button
//           className={`${GlobalStyle.buttonPrimary} h-[35px]`}
//           onClick={handleFilter}
//         >
//           Filter
//         </button>
//       </div>

//       {/* Table Section */}
//       <div className="flex flex-col">
//         <div className="flex justify-start mb-4">
//           <div className={GlobalStyle.searchBarContainer}>
//             <input
//               type="text"
//               placeholder="Search..."
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
//                 <th>
//                   <input
//                     type="checkbox"
//                     onChange={handleSelectAllRows}
//                     checked={
//                       selectedRows.length === paginatedData.length &&
//                       paginatedData.length > 0
//                     }
//                   />
//                 </th>
//                 <th>Id</th>
//                 <th>Status</th>
//                 <th>Account No</th>
//                 <th>Filtered Reason</th>
//                 <th>Rejected On</th>
//                 <th>Source Type</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {paginatedData.map((row, index) => (
//                 <tr
//                   key={index}
//                   className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
//                 >
//                   <td>
//                     <input
//                       type="checkbox"
//                       checked={selectedRows.includes(row.id)}
//                       onChange={() => handleRowCheckboxChange(row.id)}
//                     />
//                   </td>
//                   <td>{row.id}</td>
//                   <td>
//                     {row.status === "Reject Pending" && (
//                       <img
//                         src={Reject_Pending}
//                         alt="Reject Pending"
//                         className="w-5 h-5"
//                       />
//                     )}
//                   </td>
//                   <td>{row.account_no}</td>
//                   <td>{row.filtered_reason}</td>
//                   <td>{row.rejected_on}</td>
//                   <td>{row.source_type}</td>
//                   <td>
//                     <button
//                       className={`${GlobalStyle.buttonPrimary}`}
//                       onClick={() => console.log(`Rejected: ${row.id}`)}
//                     >
//                       Reject
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//               {paginatedData.length === 0 && (
//                 <tr>
//                   <td colSpan="8" className="text-center py-4">
//                     No data found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//         <div className="flex justify-between items-center my-4">
//           <button
//             className={`${GlobalStyle.buttonPrimary}`}
//             onClick={handlePrevPage}
//             disabled={currentPage === 1}
//           >
//             <FaArrowLeft />
//           </button>
//           <span>
//             Page {currentPage} of {pages}
//           </span>
//           <button
//             className={`${GlobalStyle.buttonPrimary}`}
//             onClick={handleNextPage}
//             disabled={currentPage === pages}
//           >
//             <FaArrowRight />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }








// export default function RejectIncident() {
  
//   // State and Variables
//   const [fromDate, setFromDate] = useState(null);
//   const [toDate, setToDate] = useState(null);
//   const [error, setError] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectAllData, setSelectAllData] = useState(false);
//   const [selectedRows, setSelectedRows] = useState([]);
//   const rowsPerPage = 7;

//   const [filteredData, setFilteredData] = useState(tableData); // Data after filters

//   // Sample Table Data
//   const tableData = [
//     // Your existing data
//   ];

//   // Handle Date Validation
//   const handleFromDateChange = (date) => {
//     if (toDate && date > toDate) {
//       setError("The 'From' date cannot be later than the 'To' date.");
//     } else {
//       setError("");
//       setFromDate(date);
//     }
//   };

//   const handleToDateChange = (date) => {
//     if (fromDate && date < fromDate) {
//       setError("The 'To' date cannot be earlier than the 'From' date.");
//     } else {
//       setError("");
//       setToDate(date);
//     }
//   };

//   // Handle Filtering
//   const applyFilters = () => {
//     const filtered = tableData.filter((row) => {
//       const matchesDate =
//         (!fromDate || new Date(row.rejected_on) >= fromDate) &&
//         (!toDate || new Date(row.rejected_on) <= toDate);
//       return matchesDate;
//     });
//     setFilteredData(filtered);
//     setCurrentPage(1); // Reset to first page after filtering
//   };

//   // Handle Search
//   const filteredSearchData = filteredData.filter((row) =>
//     Object.values(row)
//       .join(" ")
//       .toLowerCase()
//       .includes(searchQuery.toLowerCase())
//   );

//   // Pagination Logic
//   const pages = Math.ceil(filteredSearchData.length / rowsPerPage);
//   const startIndex = (currentPage - 1) * rowsPerPage;
//   const endIndex = startIndex + rowsPerPage;
//   const paginatedData = filteredSearchData.slice(startIndex, endIndex);

//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handleNextPage = () => {
//     if (currentPage < pages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   // Handle Checkbox Selection
//   const handleRowCheckboxChange = (id) => {
//     setSelectedRows((prev) =>
//       prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
//     );
//   };

//   const handleSelectAllDataChange = () => {
//     if (selectAllData) {
//       setSelectedRows([]);
//     } else {
//       setSelectedRows(filteredData.map((row) => row.id));
//     }
//     setSelectAllData(!selectAllData);
//   };

//   // Handle Reject Button
//   const handleReject = (id) => {
//     console.log(`Rejecting case ID: ${id}`);
//     // Add API call or logic here
//   };

//   return (
//     <div className={GlobalStyle.fontPoppins}>
//       <div className="flex justify-between items-center w-full">
//         <h1 className={`${GlobalStyle.headingLarge} m-0`}>
//           Pending Reject Incidents
//         </h1>
//         <Link
//           className={`${GlobalStyle.buttonPrimary}`}
//           to="/lod/ftllod/ftllod/downloadcreateftllod"
//         >
//           Create task and let me know
//         </Link>
//       </div>

//       {/* Filter Section */}
//       <div className="flex justify-between items-center gap-x-4 my-8">
//         {/* Source Selection */}
//         <div className="flex items-center gap-2">
//           <h1 className="mr-2">Source:</h1>
//           <select className={GlobalStyle.selectBox}>
//             <option value="option1">Option 1</option>
//             <option value="option2">Option 2</option>
//             <option value="option3">Option 3</option>
//           </select>
//         </div>

//         {/* Date Picker Section */}
//         <div className="flex items-center gap-2">
//           <div className={GlobalStyle.datePickerContainer}>
//             <label className={GlobalStyle.dataPickerDate}>Date:</label>
//             <div className="flex gap-2">
//               <DatePicker
//                 selected={fromDate}
//                 onChange={handleFromDateChange}
//                 dateFormat="dd/MM/yyyy"
//                 placeholderText="From"
//                 className={GlobalStyle.inputText}
//               />
//               <DatePicker
//                 selected={toDate}
//                 onChange={handleToDateChange}
//                 dateFormat="dd/MM/yyyy"
//                 placeholderText="To"
//                 className={GlobalStyle.inputText}
//               />
//             </div>
//           </div>
//           {error && <span className={GlobalStyle.errorText}>{error}</span>}
//         </div>

//         {/* Filter Button */}
//         <button
//           className={`${GlobalStyle.buttonPrimary} h-[35px]`}
//           onClick={applyFilters}
//         >
//           Filter
//         </button>
//       </div>

//       {/* Table Section */}
//       <div className="flex flex-col">
//         <div className="flex justify-start mb-4">
//           <div className={GlobalStyle.searchBarContainer}>
//             <input
//               type="text"
//               placeholder="Search by ID, Status, or Account No"
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
//                 <th className={GlobalStyle.tableHeader}>
//                   <input
//                     type="checkbox"
//                     checked={selectAllData}
//                     onChange={handleSelectAllDataChange}
//                   />
//                 </th>
//                 <th className={GlobalStyle.tableHeader}>Id</th>
//                 <th className={GlobalStyle.tableHeader}>Status</th>
//                 <th className={GlobalStyle.tableHeader}>Account No</th>
//                 <th className={GlobalStyle.tableHeader}>Filtered Reason</th>
//                 <th className={GlobalStyle.tableHeader}>Rejected On</th>
//                 <th className={GlobalStyle.tableHeader}>Source Type</th>
//                 <th className={GlobalStyle.tableHeader}></th>
//               </tr>
//             </thead>
//             <tbody>
//               {paginatedData.map((row) => (
//                 <tr key={row.id} className="border-b">
//                   <td>
//                     <input
//                       type="checkbox"
//                       checked={selectedRows.includes(row.id)}
//                       onChange={() => handleRowCheckboxChange(row.id)}
//                     />
//                   </td>
//                   <td>
//                     <a href={`#${row.id}`} className="hover:underline">
//                       {row.id}
//                     </a>
//                   </td>
//                   <td>{row.status}</td>
//                   <td>{row.account_no}</td>
//                   <td>{row.filtered_reason}</td>
//                   <td>{row.rejected_on}</td>
//                   <td>{row.source_type}</td>
//                   <td>
//                     <button
//                       className={GlobalStyle.buttonPrimary}
//                       onClick={() => handleReject(row.id)}
//                     >
//                       Reject
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//               {paginatedData.length === 0 && (
//                 <tr>
//                   <td colSpan="8" className="text-center py-4">
//                     No results found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center mt-4">
//         <button
//           className={GlobalStyle.buttonSecondary}
//           disabled={currentPage === 1}
//           onClick={handlePrevPage}
//         >
//           Previous
//         </button>
//         <span className="mx-4">
//           Page {currentPage} of {pages}
//         </span>
//         <button
//           className={GlobalStyle.buttonSecondary}
//           disabled={currentPage === pages}
//           onClick={handleNextPage}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }
>>>>>>> Stashed changes
