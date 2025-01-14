// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { FaSearch } from "react-icons/fa";
// import GlobalStyle from "../../assets/prototype/GlobalStyle.jsx"; // Importing GlobalStyle
// import DatePicker from "react-datepicker";
// import { List_CasesOwened_By_DRC } from "../../services/Ro/RO";

// export default function AssignedCaseListforDRC() {
//   const { drc_id } = useParams(); 
//   const [caseDetails, setCaseDetails] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCaseDetails = async () => {
//       try {
//         const response = await List_CasesOwened_By_DRC(drc_id);
//         setCaseDetails(response.data);
//         setIsLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setIsLoading(false);
//       }
//     };
//     fetchCaseDetails();
//   }, [drc_id]);

//   // State for search query and filtered data
//   const [searchQuery, setSearchQuery] = useState(""); 
//   const [filterValue, setFilterValue] = useState(""); // For Arrears Amount filter
//   const [filterRO, setRO] = useState(""); // For RO filter
//   const [fromDate, setFromDate] = useState(null); // For date range filtering
//   const [toDate, setToDate] = useState(null); 

//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const recordsPerPage = 5;

//   // Filter the case data based on search, date, and filter criteria
//   const filterData = () => {
//     let filtered = caseDetails;

//     if (filterValue) {
//       filtered = filtered.filter((item) => item.amount.includes(filterValue));
//     }

//     if (filterRO) {
//       filtered = filtered.filter((item) => item.ro.includes(filterRO));
//     }

//     if (fromDate) {
//       filtered = filtered.filter((item) => {
//         const itemDate = new Date(item.date);
//         return itemDate >= fromDate;
//       });
//     }

//     if (toDate) {
//       filtered = filtered.filter((item) => {
//         const itemExpireDate = new Date(item.expiredate);
//         return itemExpireDate <= toDate;
//       });
//     }

//     return filtered;
//   };

//   // Handle search functionality
//   const filteredData = filterData();
//   const filteredDataBySearch = filteredData.filter((row) =>
//     Object.values(row)
//       .join(" ")
//       .toLowerCase()
//       .includes(searchQuery.toLowerCase())
//   );

//   // Pagination Logic
//   const indexOfLastRecord = currentPage * recordsPerPage;
//   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
//   const currentData = filteredDataBySearch.slice(indexOfFirstRecord, indexOfLastRecord);
//   const totalPages = Math.ceil(filteredDataBySearch.length / recordsPerPage);

//   // Handling page change
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className={GlobalStyle.fontPoppins}>
//       {/* Title */}
//       <h1 className={GlobalStyle.headingLarge}>Case List</h1>

//       {/* Filter Section */}
//       <div className="flex gap-4 items-center flex-wrap mt-4">
//         <input
//           type="text"
//           value={filterValue}
//           onChange={(e) => setFilterValue(e.target.value)}
//           placeholder="Enter Arrears Amount"
//           className={GlobalStyle.inputText}
//         />
//         <input
//           type="text"
//           value={filterRO}
//           onChange={(e) => setRO(e.target.value)}
//           placeholder="Enter RO"
//           className={GlobalStyle.inputText}
//         />
//         <div className={`${GlobalStyle.datePickerContainer} flex items-center gap-2`}>
//           <label className={GlobalStyle.dataPickerDate}>Date</label>
//           <DatePicker
//             selected={fromDate}
//             onChange={(date) => setFromDate(date)}
//             dateFormat="dd/MM/yyyy"
//             placeholderText="dd/MM/yyyy"
//             className={GlobalStyle.inputText}
//           />
//           <DatePicker
//             selected={toDate}
//             onChange={(date) => setToDate(date)}
//             dateFormat="dd/MM/yyyy"
//             placeholderText="dd/MM/yyyy"
//             className={GlobalStyle.inputText}
//           />
//         </div>
//         <button onClick={filterData} className={GlobalStyle.buttonPrimary}>
//           Filter
//         </button>
//       </div>

//       {/* Search Section */}
//       <div className="flex justify-start mt-10 mb-4">
//         <div className={GlobalStyle.searchBarContainer}>
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className={GlobalStyle.inputSearch}
//           />
//           <FaSearch className={GlobalStyle.searchBarIcon} />
//         </div>
//       </div>

//       {/* Table Section */}
//       <div className={GlobalStyle.tableContainer}>
//         <table className={GlobalStyle.table}>
//           <thead className={GlobalStyle.thead}>
//             <tr>
//               <th className={GlobalStyle.tableHeader}>Case ID</th>
//               <th className={GlobalStyle.tableHeader}>Status</th>
//               <th className={GlobalStyle.tableHeader}>Date</th>
//               <th className={GlobalStyle.tableHeader}>Amount</th>
//               <th className={GlobalStyle.tableHeader}>Action</th>
//               <th className={GlobalStyle.tableHeader}>RTOM Area</th>
//               <th className={GlobalStyle.tableHeader}>Expire Date</th>
//               <th className={GlobalStyle.tableHeader}>RO</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentData.map((item, index) => (
//               <tr
//                 key={item.caseId}
//                 className={index % 2 === 0 ? GlobalStyle.tableRowEven : GlobalStyle.tableRowOdd}
//               >
//                 <td className={`${GlobalStyle.tableData} text-black hover:underline cursor-pointer`}>
//                   {item.caseId}
//                 </td>
//                 <td className={GlobalStyle.tableData}>{item.status}</td>
//                 <td className={GlobalStyle.tableData}>{item.date}</td>
//                 <td className={GlobalStyle.tableData}>{item.amount}</td>
//                 <td className={GlobalStyle.tableData}>{item.action}</td>
//                 <td className={GlobalStyle.tableData}>{item.rtomArea}</td>
//                 <td className={GlobalStyle.tableData}>{item.expiredate}</td>
//                 <td className={GlobalStyle.tableData}>{item.ro}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center mt-4">
//         <button
//           className={`${GlobalStyle.paginationButton} ${currentPage === 1 ? 'disabled' : ''}`}
//           onClick={() => paginate(currentPage - 1)}
//           disabled={currentPage === 1}
//         >
//           Previous
//         </button>
//         <span className="mx-2">{currentPage}</span>
//         <button
//           className={`${GlobalStyle.paginationButton} ${currentPage === totalPages ? 'disabled' : ''}`}
//           onClick={() => paginate(currentPage + 1)}
//           disabled={currentPage === totalPages}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }




import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import GlobalStyle from "../../assets/prototype/GlobalStyle.jsx"; // Importing GlobalStyle
import DatePicker from "react-datepicker";
import { List_CasesOwened_By_DRC } from "../../services/Ro/RO"; // Importing the API call

export default function AssignedCaseListforDRC() {
  const { drc_id } = useParams(); // Get drc_id from URL params
  const [caseDetails, setCaseDetails] = useState([]); // Default to empty array
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch case details from API when component mounts or drc_id changes
  useEffect(() => {
    const fetchRODetails = async () => {
      try {
        const response = await List_CasesOwened_By_DRC(drc_id);
        if (response && response.data) {
          setCaseDetails(response.data); // Assuming response.data is the array of cases
        } else {
          setError("No data found");
        }
        setIsLoading(false);
      } catch (err) {
        setError("Error fetching details of RO: " + (err.message || err));
        setIsLoading(false);
      }
    };
    fetchRODetails();
  }, [drc_id]);

  // State for search query
  const [searchQuery, setSearchQuery] = useState("");

  // Filtered data based on search query
  const filteredData = caseDetails.filter((item) =>
    item.Case_details.case_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={GlobalStyle.fontPoppins}>
      {/* Title */}
      <h1 className={GlobalStyle.headingLarge}>Case List</h1>

      <div className="flex-col items-end gap-4 mt-8">
        <div className="flex gap-4 ">
          <div style={{ marginTop: '6px' }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search by Case ID`}
              className={`${GlobalStyle.inputText} `}
            />
          </div>

          <div className={GlobalStyle.datePickerContainer}>
            <label className={GlobalStyle.dataPickerDate}>Date</label>
            <DatePicker
              dateFormat="dd/MM/yyyy"
              placeholderText="dd/MM/yyyy"
              className={GlobalStyle.inputText}
            />
            <DatePicker
              dateFormat="dd/MM/yyyy"
              placeholderText="dd/MM/yyyy"
              className={GlobalStyle.inputText}
            />
          </div>

          <div style={{ marginTop: '6px' }}>
            <button className={`${GlobalStyle.buttonPrimary}`}>
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="flex justify-start mt-10 mb-4">
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

      {/* Table Section */}
      <div className={GlobalStyle.tableContainer}>
        <table className={GlobalStyle.table}>
          <thead className={GlobalStyle.thead}>
            <tr>
              <th className={GlobalStyle.tableHeader}>Case ID</th>
              <th className={GlobalStyle.tableHeader}>Status</th>
              <th className={GlobalStyle.tableHeader}>Date</th>
              <th className={GlobalStyle.tableHeader}>Amount</th>
              <th className={GlobalStyle.tableHeader}>Action</th>
              <th className={GlobalStyle.tableHeader}>RTOM Area</th>
              <th className={GlobalStyle.tableHeader}>Expire Date</th>
              <th className={GlobalStyle.tableHeader}>RO</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr
                key={index}
                className={
                  index % 2 === 0
                    ? GlobalStyle.tableRowEven
                    : GlobalStyle.tableRowOdd
                }
              >
                <td className={`${GlobalStyle.tableData}  text-black hover:underline cursor-pointer`}>
                  {item.Case_details.case_id}
                </td>
                <td className={GlobalStyle.tableData}>
                  {item.Case_details.case_current_status}
                </td>
                <td className={GlobalStyle.tableData}>
                  {item.Case_details.created_dtm.split("T")[0]}
                </td>
                <td className={GlobalStyle.tableData}>
                  {item.Case_details.arrears_amount}
                </td>
                <td className={GlobalStyle.tableData}>
                  {item.Case_details.action_type}
                </td>
                <td className={GlobalStyle.tableData}>
                  {item.Case_details.area}
                </td>
                <td className={GlobalStyle.tableData}>
                  {item.Case_details.expire_dtm
                    ? item.Case_details.expire_dtm.split("T")[0]
                    : ""}
                </td>
                <td className={GlobalStyle.tableData}></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
