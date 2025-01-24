// import DatePicker from "react-datepicker";
// import { FaArrowLeft, FaArrowRight, FaSearch } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import GlobalStyle from "../../assets/prototype/GlobalStyle.jsx"; // Import GlobalStyle
// import Reject_Pending from "../../assets/images/Reject_Pending.png";

// export default function DRCcaseList() {
//     const navigate = useNavigate();

//     // Table data
//     const tableData = [
//         {
//             id: "RC001",
//             status: "Reject Pending4",
//             account_no: "12345",
//             filtered_reason: "Credit-class = VIP",
//             rejected_on: "2024-11-01",
//             source_type: "pilot-suspended",
//         },
//         {
//             id: "RC002",
//             status: "Reject Pending4",
//             account_no: "12345",
//             filtered_reason: "Customer Type = slt",
//             rejected_on: "2024-11-01",
//             source_type: "pilot-suspended",
//         },
//         {
//             id: "RC003",
//             status: "Reject Pending4",
//             account_no: "12345",
//             filtered_reason: "Credit-class = VIP",
//             rejected_on: "2024-11-01",
//             source_type: "pilot-suspended",
//         }
//         , {
//             id: "RC001",
//             status: "Reject Pending4",
//             account_no: "12345",
//             filtered_reason: "Credit-class = VIP",
//             rejected_on: "2024-11-01",
//             source_type: "pilot-suspended",
//         },
//         {
//             id: "RC003",
//             status: "Reject Pending4",
//             account_no: "12345",
//             filtered_reason: "Customer Type = slt",
//             rejected_on: "2024-11-01",
//             source_type: "pilot-suspended",
//         },
//         {
//             id: "RC002",
//             status: "Reject Pending4",
//             account_no: "12345",
//             filtered_reason: "Credit-class = VIP",
//             rejected_on: "2024-11-01",
//             source_type: "pilot-suspended",
//         },
//         {
//             id: "RC001",
//             status: "Reject Pending4",
//             account_no: "12345",
//             filtered_reason: "Credit-class = VIP",
//             rejected_on: "2024-11-01",
//             source_type: "pilot-suspended",
//         },
//         {
//             id: "RC001",
//             status: "Reject Pending4",
//             account_no: "12345",
//             filtered_reason: "Customer segment =2467",
//             rejected_on: "2024-11-01",
//             source_type: "pilot-suspended",
//         },
//     ];

//     // Filter state
//     const [startDate, setStartDate] = useState(null);
//     const [endDate, setEndDate] = useState(null);
//     const [filteredData, setFilteredData] = useState(tableData);
//     const [selectAllData, setSelectAllData] = useState(false);
//     const [selectedRows, setSelectedRows] = useState([]);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [currentPage, setCurrentPage] = useState(1);

//     //search fuction 1
//     const filteredSearchData = filteredData.filter((row) =>
//         Object.values(row)
//             .join(" ")
//             .toLowerCase()
//             .includes(searchQuery.toLowerCase())
//     );

//     // Pagination state
//     const itemsPerPage = 7;
//     const totalPages = Math.ceil(filteredSearchData.length / itemsPerPage);

//     // Filter handler
//     const handleFilter = () => {
//         if (startDate && endDate) {
//             const filtered = tableData.filter((row) => {
//                 const assignedDate = new Date(row.assignedDate);
//                 const endDate1 = new Date(row.endDate);
//                 return assignedDate >= startDate && endDate1 <= endDate;
//             });
//             setFilteredData(filtered);
//         } else {
//             setFilteredData(tableData); // Reset if dates are not selected
//         }
//     };

//     // Pagination handler
//     const handlePrevNext = (direction) => {
//         if (direction === "prev" && currentPage > 1) {
//             setCurrentPage(currentPage - 1);
//         }
//         if (direction === "next" && currentPage < totalPages) {
//             setCurrentPage(currentPage + 1);
//         }
//     };

//     // Paginated data
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     const paginatedData = filteredSearchData.slice(startIndex, endIndex);

//     const handleRowCheckboxChange = (caseId) => {
//         if (selectedRows.includes(caseId)) {
//             setSelectedRows(selectedRows.filter((id) => id !== caseId));
//         } else {
//             setSelectedRows([...selectedRows, caseId]);
//         }
//     };

//     const handleSelectAllDataChange = () => {
//         if (selectAllData) {
//             setSelectedRows([]);
//         } else {
//             setSelectedRows(data.map((row) => row.caseId));
//         }
//         setSelectAllData(!selectAllData);
//     };

//     return (
//         <div className={`p-4 ${GlobalStyle.fontPoppins}`}>
//             <div className="flex justify-between items-center w-full">
//                 <h1 className={`${GlobalStyle.headingLarge} m-0`}>Incidents Open for Distribution</h1>
//                 <Link
//                     className={`${GlobalStyle.buttonPrimary}`}
//                     to="/lod/ftllod/ftllod/downloadcreateftllod"
//                 >
//                     Create task and let me know
//                 </Link>
//             </div>

//             {/* Filter Section */}
//             <div className="flex justify-end gap-10 my-12">
            
//                 <div className="flex flex-col">
                    
//                     <div className="flex flex-col mb-4">
                        
//                         <div className={GlobalStyle.datePickerContainer}>
//                             <label className={GlobalStyle.dataPickerDate}>Date </label>
//                             <DatePicker
//                                 selected={startDate}
//                                 onChange={(date) => setStartDate(date)}
//                                 dateFormat="dd/MM/yyyy"
//                                 placeholderText="dd/MM/yyyy"
//                                 className={GlobalStyle.inputText}
//                             />
//                             <DatePicker
//                                 selected={endDate}
//                                 onChange={(date) => setEndDate(date)}
//                                 dateFormat="dd/MM/yyyy"
//                                 placeholderText="dd/MM/yyyy"
//                                 className={GlobalStyle.inputText}
//                             />
//                         </div>

//                     </div>
//                 </div>
//                 <button
//                     className={`${GlobalStyle.buttonPrimary} h-[35px] mt-2`}
//                     onClick={handleFilter}
//                 >
//                     Filter
//                 </button>
//             </div>

//             {/* Table Section */}
//             <div className="flex flex-col">
//                 <div className="flex justify-start mb-4">
//                     <div className={GlobalStyle.searchBarContainer}>
//                         <input
//                             type="text"
//                             placeholder=""
//                             value={searchQuery}
//                             onChange={(e) => setSearchQuery(e.target.value)}
//                             className={GlobalStyle.inputSearch}
//                         />
//                         <FaSearch className={GlobalStyle.searchBarIcon} />
//                     </div>
//                 </div>{" "}
//                 <div className={GlobalStyle.tableContainer}>
//                     <table className={`${GlobalStyle.table}`}>
//                         <thead className={GlobalStyle.thead}>
//                             <tr>
//                                 <th scope="col" className={GlobalStyle.tableHeader}>
//                                     Id
//                                 </th>
//                                 <th scope="col" className={GlobalStyle.tableHeader}>
//                                     Status
//                                 </th>
//                                 <th scope="col" className={GlobalStyle.tableHeader}>
//                                     Account No
//                                 </th>
//                                 <th scope="col" className={GlobalStyle.tableHeader}>
//                                     Filtered Reason
//                                 </th>
//                                 <th scope="col" className={GlobalStyle.tableHeader}>
//                                     Rejected On
//                                 </th>
//                                 <th scope="col" className={GlobalStyle.tableHeader}>
//                                     Source Type
//                                 </th>
//                                 <th scope="col" className={GlobalStyle.tableHeader}></th>

//                             </tr>
//                         </thead>
//                         <tbody>
//                             {paginatedData.map((row, index) => (
//                                 <tr
//                                     key={index}
//                                     className={`${index % 2 === 0
//                                         ? "bg-white bg-opacity-75"
//                                         : "bg-gray-50 bg-opacity-50"
//                                         } border-b`}
//                                 >
//                                     <td className={GlobalStyle.tableData}>
//                                         <input
//                                             type="checkbox"
//                                             className={"rounded-lg"}
//                                             checked={selectedRows.includes(row.caseId)}
//                                             onChange={() => handleRowCheckboxChange(row.caseId)}
//                                         />
//                                     </td>
//                                     <td className={GlobalStyle.tableData}>
//                                         <a href={`#${row.id}`} className="hover:underline">
//                                             {row.id}
//                                         </a>
//                                     </td>
//                                     <td className={GlobalStyle.tableData}>
//                     <div
//                       className="flex justify-center items-center h-full"
//                       title={row.status}
//                       aria-label={row.status}
//                     >
//                       {row.status === "Reject Pending" && (
//                         <img src={Reject_Pending} alt="Reject Pending" className="w-5 h-5" />
//                       )}
//                     </div>
//                   </td>
//                                     <td className={GlobalStyle.tableData}>{row.status}</td>
//                                     <td className={GlobalStyle.tableData}>{row.account_no}</td>
//                                     <td className={GlobalStyle.tableData}>{row.filtered_reason}</td>
//                                     <td className={GlobalStyle.tableData}>{row.rejected_on}</td>
//                                     <td className={GlobalStyle.tableData}>{row.source_type}</td>
//                                     <td className={GlobalStyle.tableData}>
//                                         <div className="flex justify-center gap-2">
//                                             <button
//                                                 className={GlobalStyle.buttonPrimary} // Prevents text from wrapping
//                                             // onClick={() => navigate("/drc/Re-assign-DRC")}
//                                             >
//                                                 Reject
//                                             </button>
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//                 <div className="flex justify-end items-center w-full mt-6">
//                     {/* Select All Data Checkbox */}
//                     <label className="flex items-center gap-2">
//                         <input
//                             type="checkbox"
//                             className="rounded-lg"
//                             checked={selectAllData}
//                             onChange={handleSelectAllDataChange}
//                         />
//                         Reject all
//                     </label>

//                     <Link
//                         className={`${GlobalStyle.buttonPrimary} ml-4`}
//                         to="/lod/ftllod/ftllod/downloadcreateftllod"
//                     >
//                         More Forward
//                     </Link>
//                 </div>
//             </div>

//             {/* Pagination Section */}
//             <div className={GlobalStyle.navButtonContainer}>
//                 <button
//                     onClick={() => handlePrevNext("prev")}
//                     disabled={currentPage === 1}
//                     className={`${GlobalStyle.navButton} ${currentPage === 1 ? "cursor-not-allowed" : ""
//                         }`}
//                 >
//                     <FaArrowLeft />
//                 </button>
//                 <span>
//                     Page {currentPage} of {totalPages}
//                 </span>
//                 <button
//                     onClick={() => handlePrevNext("next")}
//                     disabled={currentPage === totalPages}
//                     className={`${GlobalStyle.navButton} ${currentPage === totalPages ? "cursor-not-allowed" : ""
//                         }`}
//                 >
//                     <FaArrowRight />
//                 </button>
//             </div>
//         </div>
//     );
// }


import DatePicker from "react-datepicker";
import { FaArrowLeft, FaArrowRight, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import GlobalStyle from "../../assets/prototype/GlobalStyle.jsx";
import Reject_Pending from "../../assets/images/Reject_Pending.png";

export default function DRCcaseList() {
  const navigate = useNavigate();

  const tableData = [
    {
      id: "RC001",
      status: "Reject Pending",
      account_no: "12345",
      filtered_reason: "Credit-class = VIP",
      rejected_on: "2024-11-01",
      source_type: "pilot-suspended",
    },
    {
      id: "RC002",
      status: "Reject Pending",
      account_no: "12345",
      filtered_reason: "Customer Type = slt",
      rejected_on: "2024-11-01",
      source_type: "pilot-suspended",
    },
    {
      id: "RC003",
      status: "Reject Pending",
      account_no: "12345",
      filtered_reason: "Credit-class = VIP",
      rejected_on: "2024-11-01",
      source_type: "pilot-suspended",
    },
    {
      id: "RC001",
      status: "Reject Pending",
      account_no: "12345",
      filtered_reason: "Credit-class = VIP",
      rejected_on: "2024-11-01",
      source_type: "pilot-suspended",
    },
    {
      id: "RC003",
      status: "Reject Pending",
      account_no: "12345",
      filtered_reason: "Customer Type = slt",
      rejected_on: "2024-11-01",
      source_type: "pilot-suspended",
    },
    {
      id: "RC002",
      status: "Reject Pending",
      account_no: "12345",
      filtered_reason: "Credit-class = VIP",
      rejected_on: "2024-11-01",
      source_type: "pilot-suspended",
    },
    {
      id: "RC001",
      status: "Reject Pending",
      account_no: "12345",
      filtered_reason: "Credit-class = VIP",
      rejected_on: "2024-11-01",
      source_type: "pilot-suspended",
    },
    {
      id: "RC001",
      status: "Reject Pending",
      account_no: "12345",
      filtered_reason: "Customer segment =2467",
      rejected_on: "2024-11-01",
      source_type: "pilot-suspended",
    },
  ];

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredData, setFilteredData] = useState(tableData);
  const [selectAllData, setSelectAllData] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredSearchData = filteredData.filter((row) =>
    Object.values(row).join(" ").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const itemsPerPage = 7;
  const totalPages = Math.ceil(filteredSearchData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredSearchData.slice(startIndex, endIndex);

  const handleRowCheckboxChange = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((id) => id !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleSelectAllDataChange = () => {
    if (selectAllData) {
      setSelectedRows([]);
    } else {
      setSelectedRows(tableData.map((row) => row.id));
    }
    setSelectAllData(!selectAllData);
  };

  const handlePrevNext = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className={`p-4 ${GlobalStyle.fontPoppins}`}>
      <div className="flex justify-between items-center w-full">
        <h1 className={`${GlobalStyle.headingLarge} m-0`}>Pending Reject Incident </h1>
        <Link
          className={`${GlobalStyle.buttonPrimary}`}
          to="/lod/ftllod/ftllod/downloadcreateftllod"
        >
          Create task and let me know
        </Link>
      </div>

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
          onClick={() => {
            if (startDate && endDate) {
              const filtered = tableData.filter((row) => {
                const assignedDate = new Date(row.rejected_on);
                return assignedDate >= startDate && assignedDate <= endDate;
              });
              setFilteredData(filtered);
            } else {
              setFilteredData(tableData);
            }
          }}
        >
          Filter
        </button>
      </div>

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
        </div>

        <div className={GlobalStyle.tableContainer}>
          <table className={`${GlobalStyle.table}`}>
            <thead className={GlobalStyle.thead}>
              <tr>
                <th scope="col" className={GlobalStyle.tableHeader}>Id</th>
                <th scope="col" className={GlobalStyle.tableHeader}>Status</th>
                <th scope="col" className={GlobalStyle.tableHeader}>Account No</th>
                <th scope="col" className={GlobalStyle.tableHeader}>Filtered Reason</th>
                <th scope="col" className={GlobalStyle.tableHeader}>Rejected On</th>
                <th scope="col" className={GlobalStyle.tableHeader}>Source Type</th>
                <th scope="col" className={GlobalStyle.tableHeader}></th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-white bg-opacity-75" : "bg-gray-50 bg-opacity-50"} border-b`}
                >
                  <td className={GlobalStyle.tableData}>
                    <input
                      type="checkbox"
                      className="rounded-lg"
                      checked={selectedRows.includes(row.id)}
                      onChange={() => handleRowCheckboxChange(row.id)}
                    />
                  </td>
                  <td className={GlobalStyle.tableData}>
                    <div
                      className="flex justify-center items-center h-full"
                      title={row.status}
                      aria-label={row.status}
                    >
                      {row.status === "Reject Pending" && (
                        <img src={Reject_Pending} alt="Reject Pending" className="w-5 h-5" />
                      )}
                    </div>
                  </td>
                  <td className={GlobalStyle.tableData}>{row.account_no}</td>
                  <td className={GlobalStyle.tableData}>{row.filtered_reason}</td>
                  <td className={GlobalStyle.tableData}>{row.rejected_on}</td>
                  <td className={GlobalStyle.tableData}>{row.source_type}</td>
                  <td className={GlobalStyle.tableData}>
                    <div className="flex justify-center gap-2">
                      <button className={GlobalStyle.buttonPrimary}>Reject</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end items-center w-full mt-6">
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

      <div className={GlobalStyle.navButtonContainer}>
        <button
          onClick={() => handlePrevNext("prev")}
          disabled={currentPage === 1}
          className={`${GlobalStyle.navButton} ${currentPage === 1 ? "cursor-not-allowed" : ""}`}
        >
          <FaArrowLeft />
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => handlePrevNext("next")}
          disabled={currentPage === totalPages}
          className={`${GlobalStyle.navButton} ${currentPage === totalPages ? "cursor-not-allowed" : ""}`}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}
