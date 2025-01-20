import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSearch, FaArrowLeft, FaArrowRight} from "react-icons/fa";
import DatePicker from "react-datepicker";
import { List_CasesOwened_By_DRC } from "../../services/Ro/RO";
import GlobalStyle from "../../assets/prototype/GlobalStyle.jsx";
// import "react-datepicker/dist/react-datepicker.css";

export default function AssignedCaseListforDRC() {
  const location = useLocation();
  const navigate = useNavigate();
  const drc_id = location.pathname.split('/').pop();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cases, setCases] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterValues, setFilterValues] = useState({
    arrearsAmount: "",
    ro: "",
    fromDate: null,
    toDate: null
  });
  const [isFiltering, setIsFiltering] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);

  const recordsPerPage = 7;

  useEffect(() => {
    const fetchCases = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await List_CasesOwened_By_DRC(drc_id);
        
        if (response.status === "success" && response.data && response.data.length > 0) {
          setCases(response.data);
          setTotalRecords(response.data.length);
        } else {
          setError("No cases found for this DRC ID");
          setCases([]);
          setTotalRecords(0);
        }
      } catch (error) {
        setError("Failed to fetch cases. Please try again later.");
        console.error("Error fetching cases:", error);
        setCases([]);
        setTotalRecords(0);
      } finally {
        setLoading(false);
      }
    };

    if (drc_id) {
      fetchCases();
    }
  }, [drc_id]);

  // Date validation handlers
  const handleFromDateChange = (date) => {
    if (filterValues.toDate && date > filterValues.toDate) {
      setError("The 'From' date cannot be later than the 'To' date.");
    } else {
      setError("");
      handleFilterChange('fromDate', date);
    }
  };

  const handleToDateChange = (date) => {
    if (filterValues.fromDate && date < filterValues.fromDate) {
      setError("The 'To' date cannot be earlier than the 'From' date.");
    } else {
      setError("");
      handleFilterChange('toDate', date);
    }
  };

  const getFilteredData = () => {
    if (!isFiltering) return cases;
    
    return cases.filter(item => {
      const matchesAmount = !filterValues.arrearsAmount || 
        (item.current_arrears_amount && 
         item.current_arrears_amount.toString().includes(filterValues.arrearsAmount));

      const matchesRO = !filterValues.ro || 
        (item.ro && item.ro.toLowerCase().includes(filterValues.ro.toLowerCase()));

      const itemCreatedDate = item.created_dtm ? new Date(item.created_dtm) : null;
      const itemExpireDate = item.expire_dtm ? new Date(item.expire_dtm) : null;

      const matchesDateRange = (!filterValues.fromDate || !itemCreatedDate || itemCreatedDate >= filterValues.fromDate) &&
        (!filterValues.toDate || !itemExpireDate || itemExpireDate <= filterValues.toDate);

      return matchesAmount && matchesRO && matchesDateRange;
    });
  };

  const searchedData = getFilteredData().filter(item => {
    if (!searchQuery.trim()) return true;
    return Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
  });

  const totalPages = Math.ceil(searchedData.length / recordsPerPage);
  const currentData = searchedData.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (field, value) => {
    setFilterValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFilterSubmit = () => {
    setIsFiltering(true);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilterValues({
      arrearsAmount: "",
      ro: "",
      fromDate: null,
      toDate: null
    });
    setIsFiltering(false);
    setCurrentPage(1);
    setSearchQuery("");
  };

  const handleCaseIdClick = (caseId) => {
    navigate(`/drc/cases-details/${caseId}`);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatAmount = (amount) => {
    if (amount == null) return "";
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  if (loading) return <div className={GlobalStyle.paragraph}>Loading...</div>;
  if (error) return <div className={GlobalStyle.errorText}>{error}</div>;

  return (
    <div className={GlobalStyle.fontPoppins}>
      <h1 className={GlobalStyle.headingLarge}>Case List</h1>
      
      <div className="flex items-center gap-4 flex-wrap">
        <input
          type="text"
          value={filterValues.arrearsAmount}
          onChange={(e) => handleFilterChange('arrearsAmount', e.target.value)}
          placeholder="Enter Arrears Amount"
          className={GlobalStyle.inputText}
        />
        <input
          type="text"
          value={filterValues.ro}
          onChange={(e) => handleFilterChange('ro', e.target.value)}
          placeholder="Enter RO"
          className={GlobalStyle.inputText}
        />

        <div className="flex items-center gap-2">
          <DatePicker
            selected={filterValues.fromDate}
            onChange={handleFromDateChange}
            dateFormat="dd/MM/yyyy"
            placeholderText="dd/MM/yyyy"
            className={GlobalStyle.inputText}
          />
          <DatePicker
            selected={filterValues.toDate}
            onChange={handleToDateChange}
            dateFormat="dd/MM/yyyy"
            placeholderText="dd/MM/yyyy"
            className={GlobalStyle.inputText}
          />
          {error && <span className={GlobalStyle.errorText}>{error}</span>}
        </div>

          <button
            onClick={handleFilterSubmit}
            className={`${GlobalStyle.buttonPrimary} flex-shrink-0`}
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
            onChange={handleSearchChange}
            placeholder=""
            className={GlobalStyle.inputSearch}
          />
          <FaSearch className={GlobalStyle.searchBarIcon} />
        </div>
      </div>

      <div className={GlobalStyle.tableContainer}>
        <table className={GlobalStyle.table}>
          <thead className={GlobalStyle.thead}>
            <tr>
              <th scope="col" className={GlobalStyle.tableHeader}>Case ID</th>
              <th scope="col" className={GlobalStyle.tableHeader}>Status</th>
              <th scope="col" className={GlobalStyle.tableHeader}>Date</th>
              <th scope="col" className={GlobalStyle.tableHeader}>Amount</th>
              <th scope="col" className={GlobalStyle.tableHeader}>Action</th>
              <th scope="col" className={GlobalStyle.tableHeader}>RTOM Area</th>
              <th scope="col" className={GlobalStyle.tableHeader}>Expire Date</th>
              <th scope="col" className={GlobalStyle.tableHeader}>RO</th>
            </tr>
          </thead>
          <tbody>
          {currentData.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center py-4">
                    No results found
                  </td>
                </tr>
            ) : (
              currentData.map((item, index) => (
                <tr key={item._id} className={index % 2 === 0 ? "bg-white bg-opacity-75" : "bg-gray-50 bg-opacity-50"}>
                  <td 
                    className={`${GlobalStyle.tableData} hover:underline cursor-pointer text-black-600`}
                    onClick={() => handleCaseIdClick(item.case_id)}
                  >
                    {item.case_id}
                  </td>
                  <td className={GlobalStyle.tableData}>{item.case_current_status}</td>
                  <td className={GlobalStyle.tableData}>{formatDate(item.created_dtm)}</td>
                  <td className={GlobalStyle.tableData}>{formatAmount(item.current_arrears_amount)}</td>
                  <td className={GlobalStyle.tableData}>{item.action}</td>
                  <td className={GlobalStyle.tableData}>{item.area}</td>
                  <td className={GlobalStyle.tableData}>{formatDate(item.expire_dtm)}</td>
                  <td className={GlobalStyle.tableData}>{item.ro}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      </div>

      {/* Navigation Buttons */}
      {searchedData.length > recordsPerPage && (
        <div className={GlobalStyle.navButtonContainer}>
          <button
            className={GlobalStyle.navButton}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <FaArrowLeft />
          </button>
          <span className={GlobalStyle.headingMedium}>
            Page {currentPage} of {totalPages || 1}
          </span>
          <button
            className={GlobalStyle.navButton}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            <FaArrowRight />
          </button>
        </div>
      )}
    </div>
  );
}


// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { FaSearch } from "react-icons/fa";
// import GlobalStyle from "../../assets/prototype/GlobalStyle.jsx"; // Importing GlobalStyle
// import DatePicker from "react-datepicker";
// import { List_CasesOwened_By_DRC } from "../../services/Ro/RO"; // Importing the API call

// export default function AssignedCaseListforDRC() {
//   const { drc_id } = useParams(); // Get drc_id from URL params
//   const [caseDetails, setCaseDetails] = useState([]); // Default to empty array
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch case details from API when component mounts or drc_id changes
//   useEffect(() => {
//     const fetchRODetails = async () => {
//       try {
//         const response = await List_CasesOwened_By_DRC(drc_id);
//         if (response && response.data) {
//           setCaseDetails(response.data); // Assuming response.data is the array of cases
//         } else {
//           setError("No data found");
//         }
//         setIsLoading(false);
//       } catch (err) {
//         setError("Error fetching details of RO: " + (err.message || err));
//         setIsLoading(false);
//       }
//     };
//     fetchRODetails();
//   }, [drc_id]);

//   // State for search query
//   const [searchQuery, setSearchQuery] = useState("");

//   // Filtered data based on search query
//   const filteredData = caseDetails.filter((item) =>
//     item.Case_details.case_id.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className={GlobalStyle.fontPoppins}>
//       {/* Title */}
//       <h1 className={GlobalStyle.headingLarge}>Case List</h1>

//       <div className="flex-col items-end gap-4 mt-8">
//         <div className="flex gap-4 ">
//           <div style={{ marginTop: '6px' }}>
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder={`Search by Case ID`}
//               className={`${GlobalStyle.inputText} `}
//             />
//           </div>

//           <div className={GlobalStyle.datePickerContainer}>
//             <label className={GlobalStyle.dataPickerDate}>Date</label>
//             <DatePicker
//               dateFormat="dd/MM/yyyy"
//               placeholderText="dd/MM/yyyy"
//               className={GlobalStyle.inputText}
//             />
//             <DatePicker
//               dateFormat="dd/MM/yyyy"
//               placeholderText="dd/MM/yyyy"
//               className={GlobalStyle.inputText}
//             />
//           </div>

//           <div style={{ marginTop: '6px' }}>
//             <button className={`${GlobalStyle.buttonPrimary}`}>
//               Filter
//             </button>
//           </div>
//         </div>
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
//             {filteredData.map((item, index) => (
//               <tr
//                 key={index}
//                 className={
//                   index % 2 === 0
//                     ? GlobalStyle.tableRowEven
//                     : GlobalStyle.tableRowOdd
//                 }
//               >
//                 <td className={`${GlobalStyle.tableData}  text-black hover:underline cursor-pointer`}>
//                   {item.Case_details.case_id}
//                 </td>
//                 <td className={GlobalStyle.tableData}>
//                   {item.Case_details.case_current_status}
//                 </td>
//                 <td className={GlobalStyle.tableData}>
//                   {item.Case_details.created_dtm.split("T")[0]}
//                 </td>
//                 <td className={GlobalStyle.tableData}>
//                   {item.Case_details.arrears_amount}
//                 </td>
//                 <td className={GlobalStyle.tableData}>
//                   {item.Case_details.action_type}
//                 </td>
//                 <td className={GlobalStyle.tableData}>
//                   {item.Case_details.area}
//                 </td>
//                 <td className={GlobalStyle.tableData}>
//                   {item.Case_details.expire_dtm
//                     ? item.Case_details.expire_dtm.split("T")[0]
//                     : ""}
//                 </td>
//                 <td className={GlobalStyle.tableData}></td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
