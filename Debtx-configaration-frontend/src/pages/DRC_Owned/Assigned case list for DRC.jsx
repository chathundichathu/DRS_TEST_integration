import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import GlobalStyle from "../../assets/prototype/GlobalStyle.jsx"; // Importing GlobalStyle
import DatePicker from "react-datepicker";
import { List_CasesOwened_By_DRC } from "../../services/Ro/RO";

export default function AssignedCaseListforDRC() {
  const { drc_id } = useParams();  
  const [caseDetails, setCaseDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [filterValue, setFilterValue] = useState(""); // Filter value state

  useEffect(() => {
    const fetchCaseDetails = async () => {
      try {
        const response = await List_CasesOwened_By_DRC(drc_id);
        setCaseDetails(response.data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };
    fetchCaseDetails();
  }, [drc_id]);

  // Search and filter logic
  const filteredData = caseDetails.filter((item) => {
    const searchValue = searchQuery.toLowerCase();
    const filterAmount = filterValue.toLowerCase();
    const caseData = item.case_details || {};

    return (
      (!searchQuery || Object.values(caseData).join(" ").toLowerCase().includes(searchValue)) &&
      (!filterValue || (caseData.arrears_amount || "").toString().toLowerCase().includes(filterAmount))
    );
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={GlobalStyle.fontPoppins}>
      {/* Title */}
      <h1 className={GlobalStyle.headingLarge}>Case List</h1>

      {/* Filters */}
      <div className="flex-col items-end gap-4 mt-8">
        <div className="flex gap-4">
          <div style={{ marginTop: '6px' }}>
            <input
              type="text"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              placeholder="Enter Arrears Amount"
              className={GlobalStyle.inputText}
            />
          </div>
          <div className="flex items-center">
            <label className={GlobalStyle.dataPickerDate}>Date</label>
            <DatePicker
              dateFormat="dd/MM/yyyy"
              placeholderText="From Date"
              className={GlobalStyle.inputText}
            />
            <DatePicker
              dateFormat="dd/MM/yyyy"
              placeholderText="To Date"
              className={GlobalStyle.inputText}
            />
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
            placeholder="Search..."
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
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => {
                const caseData = item.case_details || {};
                return (
                  <tr
                    key={index}
                    className={
                      index % 2 === 0
                        ? GlobalStyle.tableRowEven
                        : GlobalStyle.tableRowOdd
                    }
                  >
                    <td className={`${GlobalStyle.tableData} text-black hover:underline cursor-pointer`}>
                      {caseData.case_id }
                    </td>
                    <td className={GlobalStyle.tableData}>
                      {caseData.case_current_status}
                    </td>
                    <td className={GlobalStyle.tableData}>
                      {caseData.created_dtm?.split("T")[0] }
                    </td>
                    <td className={GlobalStyle.tableData}>
                      {caseData.arrears_amount }
                    </td>
                    <td className={GlobalStyle.tableData}>
                      {caseData.action_type }
                    </td>
                    <td className={GlobalStyle.tableData}>
                      {caseData.area }
                    </td>
                    <td className={GlobalStyle.tableData}>
                      {caseData.expire_dtm?.split("T")[0] }
                    </td>
                    <td className={GlobalStyle.tableData}>
                      {caseData.ro }
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8" className={GlobalStyle.tableData}>
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}


// /*Purpose: This template is used for the 2.1- Assigned case list for DRC
// Created Date: 2025-01-07
// Created By: Chamithu (chamithujayathilaka2003@gmail.com)
// Last Modified Date: 2025-01-07
// Version: node 20
// ui number : 2.1
// Dependencies: tailwind css
// Related Files: (routes)
// Notes: The following page conatins the code for the assigned case list for DRC  */


// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { FaArrowLeft, FaArrowRight, FaSearch } from "react-icons/fa";
// import GlobalStyle from "../../assets/prototype/GlobalStyle.jsx"; // Importing GlobalStyle
// import DatePicker from "react-datepicker";
// import {List_CasesOwened_By_DRC} from "../../services/Ro/RO"; 
// export default function AssignedCaseListforDRC() {
//   const { drc_id } = useParams();  
//   const [caseDetails, setCaseDetails] = useState();
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);


//   useEffect(() => {
//       const fetchRODetails = async () => {
//         try {
//           const response = await List_CasesOwened_By_DRC(drc_id);
//           setCaseDetails(response.data);
//           // console.log(caseDetails[0].case_details.case_id);
//           setIsLoading(false);
//         } catch (err) {
//           setError(err.message);
//           setIsLoading(false);
//         }
//       };
//       fetchRODetails();
//     }, [drc_id]);

//     // Data for the table
//   const data = [
//     {
//       caseId: "C001",
//       status: "Pending",
//       date: "2024.11.05",
//       amount: "15,000",
//       action: "Arrears Collect",
//       rtomArea: "Kegalle",
//       expiredate: "2024.12.20",
//       ro:"Silva Perera"
      
//     },
    
//     {
//       caseId: "C002",
//       status: "Pending",
//       date: "2024.11.05",
//       amount: "50,000",
//       action: "Arrears Collect",
//       rtomArea: "Colombo",
//       expiredate: "2024.11.20",
//       ro:"P.B.Silva"
//     },
//     {
//       caseId: "C003",
//       status: "Pending",
//       date: "2025.01.01",
//       amount: "30,000",
//       action: "Arrears Collect",
//       rtomArea: "Kegalle",
//       expiredate: "2025.02.10",
//       ro:"Silva Perera"
//     },
//       {
//       caseId: "C004",
//       status: "Pending",
//       date: "2025.01.01",
//       amount: "15,000",
//       action: "Arrears Collect",
//       rtomArea: "Kegalle",
//       expiredate: "2025.01.20",
//       ro:"P.B.Silva"
//       },
//   ];

//   // State for search query and filtered data
//   const [searchQuery, setSearchQuery] = useState(""); // State for search query
//   // const [filteredData, setFilteredData] = useState(data);
//   const [filterValue, setFilterValue] = useState(""); // This holds the filter value based on selected filter type

//   // Pagination state
//   // const [currentPage, setCurrentPage] = useState(1);
//   // const recordsPerPage = 5;
//   // const indexOfLastRecord = currentPage * recordsPerPage;
//   // const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
//   // const currentData = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);
//   // const totalPages = Math.ceil(filteredData.length / recordsPerPage);

//   // Filter state for Amount, Account No, Case ID, Status, and Date
//   // const [filterRO, setRO] = useState("");
//   // const [fromDate, setFromDate] = useState(null);
//   // const [toDate, setToDate] = useState(null);

//   // Filtering the data based on filter the date and other filters
//   // const filterData = () => {
//   //   let tempData = data;
//   //   if (filterValue) {
//   //     tempData = tempData.filter((item) =>
//   //       item.amount.includes(filterValue)
//   //     );
//   //   }
//   //   if (filterRO) {
//   //     tempData = tempData.filter((item) =>
//   //       item.ro.includes(filterRO)
//   //     );
//   //   }
//   //   if (fromDate) {
//   //       tempData = tempData.filter((item) => {
//   //         const itemDate = new Date(item.date);
//   //         return itemDate >= fromDate;
//   //       });
//   //     }
//   //     if (toDate) {
//   //       tempData = tempData.filter((item) => {
//   //         const itemExpireDate = new Date(item.expiredate);
//   //         return itemExpireDate <= toDate;
//   //       });
//   //     }
//   //   setFilteredData(tempData);
    
//   // };

//   // Search Section
//   // const filteredDataBySearch = currentData.filter((row) =>
//   //   Object.values(row)
//   //     .join(" ")
//   //     .toLowerCase()
//   //     .includes(searchQuery.toLowerCase())
//   // );

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className={GlobalStyle.fontPoppins}>
//       {/* Title */}
//       <h1 className={GlobalStyle.headingLarge}>Case List</h1>
//       <div className=" flex-col items-end  gap-4 mt-8">

//         <div className="flex gap-4 ">
//           <div style={{ marginTop: '6px' }}>
//             <input
//               type="text"
//               value={filterValue}
//               onChange={(e) => setFilterValue(e.target.value)}
//               placeholder={`Enter Arreas Amount `}
//               className={`${GlobalStyle.inputText} `}
//             />
//           </div>
//           <div style={{ marginTop: '6px' }}>
//             <input
//               type="text"
//               // value={filterRO}
//               // onChange={(e) => setRO(e.target.value)}
//               placeholder={`Enter RO `}
//               className={`${GlobalStyle.inputText}  `}
//             />
//           </div>
//             <div className={GlobalStyle.datePickerContainer}>
//               <label className={GlobalStyle.dataPickerDate}>Date</label>
//               <DatePicker
//                 // selected={fromDate}
//                 // onChange={(date) => setFromDate(date)}
//                 dateFormat="dd/MM/yyyy"
//                 placeholderText="dd/MM/yyyy"
//                 className={GlobalStyle.inputText}
//               />
//               <DatePicker
//                 // selected={toDate}
//                 // onChange={(date) => setToDate(date)}
//                 dateFormat="dd/MM/yyyy"
//                 placeholderText="dd/MM/yyyy"
//                 className={GlobalStyle.inputText}
//               />
//             </div>
            
          
//           <div  style={{ marginTop: '6px' }}>
//           <button
//             // onClick={filterData}
//             className={`${GlobalStyle.buttonPrimary}`}
//           >
//             Filter
//           </button>
//         </div>
          
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
//           {caseDetails.map((item, index) => (
//             <tr key={index}
//                 className={
//                   index % 2 === 0
//                     ? GlobalStyle.tableRowEven
//                     : GlobalStyle.tableRowOdd
//                 }
//               >
//                 <td className={`${GlobalStyle.tableData}  text-black hover:underline cursor-pointer`}>{item.case_details.case_id}</td>
//                 <td className={GlobalStyle.tableData}>{item.case_details.case_current_status}</td>
//                 <td className={GlobalStyle.tableData}>{item.case_details.created_dtm.split("T")[0]}</td>
//                 <td className={GlobalStyle.tableData}>{item.case_details.arrears_amount}</td>
//                 <td className={GlobalStyle.tableData}>{item.case_details.action_type}</td>
//                 <td className={GlobalStyle.tableData}>{item.case_details.area}</td>
//                 <td className={GlobalStyle.tableData}>{item.case_details && item.case_details.expire_dtm
//                     ? item.case_details.expire_dtm.split("T")[0]
//                     : "N/A"}
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
