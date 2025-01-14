/* 
Purpose: This template is used for the 2.11 Sup - Mediation Board Responselog.
Created Date: 2024-12-02
Created By: Naflan (naflanm084@gmail.com)
Last Modified Date : 2024 - 12 - 11
Modified Date: 2024-12-06
Modified Date: 2024-12-03
Modified By:  Naflan (naflanm084@gmail.com)
Version: node v18.18.0
ui number : v1.0.1
Dependencies: tailwind css
Related Files:
Notes: this page includes a filter, search bar and a table
*/

import { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaSearch } from "react-icons/fa";
import DatePicker from "react-datepicker";
import GlobalStyle from "../../assets/prototype/GlobalStyle.jsx"; // Importing GlobalStyle

const MediationBoardResponseLog = () => {
  // Sample data for the table
  const randomdata = [
    {
      status: "Settled",
      caseId: "Case1235",
      lastResponse: "10/12/2024",
      drc: "CMS",
      assignedRO: "K.L.Gamage",
    },
    {
      status: "Pending",
      caseId: "Case1236",
      lastResponse: "15/11/2024",
      drc: "TCM",
      assignedRO: "J.D.Perera",
    },
    {
      status: "In Progress",
      caseId: "Case1237",
      lastResponse: "20/11/2024",
      drc: "RE",
      assignedRO: "A.M.Silva",
    },
    {
      status: "Closed",
      caseId: "Case1238",
      lastResponse: "25/10/2024",
      drc: "CO LAN",
      assignedRO: "P.L.Jayasinghe",
    },
    {
      status: "Resolved",
      caseId: "Case1239",
      lastResponse: "05/11/2024",
      drc: "ACCIVA",
      assignedRO: "M.N.Kumara",
    },
    {
      status: "Pending",
      caseId: "Case1240",
      lastResponse: "05/11/2024",
      drc: "VISONCOM",
      assignedRO: "M.N.Dulan",
    },
    {
      status: "Pending",
      caseId: "Case1241",
      lastResponse: "05/11/2024",
      drc: "PROMPT",
      assignedRO: "M.N.json",
    },
  ];

  const [filteredData, setFilteredData] = useState(randomdata || []);
  const [selectedStatus, setSelectedStatus] = useState("Settled");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handleFromDateChange = (date) => {
    if (toDate && date > toDate) {
      setError("The 'From' date cannot be later than the 'To' date.");
    } else {
      setError("");
      setFromDate(date);
    }
  };

  const handleToDateChange = (date) => {
    if (fromDate && date < fromDate) {
      setError("The 'To' date cannot be earlier than the 'From' date.");
    } else {
      setError("");
      setToDate(date);
    }
  };

  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleFilter = () => {
    const from = fromDate ? new Date(fromDate.setHours(0, 0, 0, 0)) : null;
    const to = toDate ? new Date(toDate.setHours(0, 0, 0, 0)) : null;

    const filtered = randomdata.filter((row) => {
      const lastResponseDate = new Date(
        row.lastResponse.split("/").reverse().join("-")
      );
      const matchesStatus = selectedStatus
        ? row.status === selectedStatus
        : true;
      const matchesDate =
        (!from || lastResponseDate >= from) && (!to || lastResponseDate <= to);

      return matchesStatus && matchesDate;
    });

    setFilteredData(filtered);
    setCurrentPage(1);
  };

  // Filter rows based on the search query
  const filteredRows = currentRows.filter((row) =>
    Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 ">
      {/* Title */}
      <h2 className={`${GlobalStyle.headingLarge} mb-10`}>
        Mediation Board Response Log
      </h2>

      {/* Filter Section */}
      <div className="flex items-center justify-start gap-4 mb-6"> {/* Reduced gap */}
        <h1 className="text-[18px]">Status:</h1>
        <select
          className={`${GlobalStyle.selectBox} h-[55px] mb-4 w-[187px]`}
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="Settled">Settled</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>
        <div className="flex flex-col mb-4">
          <div className={`${GlobalStyle.datePickerContainer}`}>
            <label className={`${GlobalStyle.datePickerContainer}`}>Date </label>
            <DatePicker
              selected={fromDate}
              onChange={handleFromDateChange}
              dateFormat="dd/MM/yyyy"
              placeholderText="dd/MM/yyyy"
              className={`${GlobalStyle.inputText}`}
            />
            <DatePicker
              selected={toDate}
              onChange={handleToDateChange}
              dateFormat="dd/MM/yyyy"
              placeholderText="dd/MM/yyyy"
              className={`${GlobalStyle.inputText} `}
            />
          </div>
          {error && <span className={GlobalStyle.errorText}>{error}</span>}
        </div>
        <button
          className={`${GlobalStyle.buttonPrimary} mb-4`}
          onClick={handleFilter}
        >
          Filter
        </button>
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
      <div className={`${GlobalStyle.tableContainer}`}>
        <table className={`${GlobalStyle.table}`}>
          <thead className={GlobalStyle.thead}>
            <tr>
              <th scope="col" className={`${GlobalStyle.tableHeader} px-6 py-3`}>
                Status
              </th>
              <th scope="col" className={`${GlobalStyle.tableHeader} px-6 py-3`}>
                Case ID
              </th>
              <th scope="col" className={`${GlobalStyle.tableHeader} px-6 py-3`}>
                Last Response On
              </th>
              <th scope="col" className={`${GlobalStyle.tableHeader} px-6 py-3`}>
                DRC
              </th>
              <th scope="col" className={`${GlobalStyle.tableHeader} px-6 py-3`}>
                Assigned RO
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredRows.map((row, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0
                    ? GlobalStyle.tableRowEven
                    : GlobalStyle.tableRowOdd
                }`}
              >
                <td className={GlobalStyle.tableData}>{row.status}</td>
                <td className={GlobalStyle.tableData}>{row.caseId}</td>
                <td className={GlobalStyle.tableData}>{row.lastResponse}</td>
                <td className={GlobalStyle.tableData}>{row.drc}</td>
                <td className={GlobalStyle.tableData}>{row.assignedRO}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className={GlobalStyle.navButtonContainer}>
  <button
    className={GlobalStyle.navButton}
    onClick={() => handlePageChange("prev")}
    disabled={currentPage === 1}
  >
    <FaArrowLeft />
  </button>

  {/* Page display between arrows */}
  <span>
    Page {currentPage} of {totalPages}
  </span>

  <button
    className={GlobalStyle.navButton}
    onClick={() => handlePageChange("next")}
    disabled={currentPage === totalPages}
  >
    <FaArrowRight />
  </button>
</div>

      {/* Export Button */}
      <button
        className={`${GlobalStyle.buttonPrimary} ${GlobalStyle.exportButton} absolute bottom-16 right-24`} // Decreased 'right' value to move it further left
        onClick={() => console.log("Exporting...")}
      >
        Export
      </button>
    </div>
  );
};

export default MediationBoardResponseLog;




