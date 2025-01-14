/* Purpose : This template is used for the 2.9.1 - Mediation Board Sending Requests
Created Date : 2024 - 12 - 02
Created By : U.H.Nandali Linara (nadalilinara5@gmail.com)
Last Modified Date : 2024 - 12 - 06
Modified Date : 2024 - 12 - 03
Created By : U.H.Nandali Linara (nadalilinara5@gmail.com)
Version : v20.16.0
ui number : 
Dependencies : tailwind css
Related Files : (routes)
 */

import { useState } from "react";
import DatePicker from "react-datepicker";
import { FaArrowLeft, FaArrowRight, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import GlobalStyle from "../../assets/prototype/GlobalStyle.jsx"; // Import GlobalStyle

const MediationBoardSendingRequests = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const [selectAllData, setSelectAllData] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const rowsPerPage = 7;

  const data = [
    {
      caseId: "C001",
      createdDate: "2024-12-03",
      actionType : "Action",
      drc : "ABCD",
      requestedDate :"mm/dd/yyyy"
    },
    {
      caseId: "C002",
      createdDate: "2024-12-04",
      actionType : "Action",
      drc : "ABCD",
      requestedDate :"mm/dd/yyyy"
    },
    {
      caseId: "C003",
      createdDate: "2024-12-05",
      actionType : "Action",
      drc : "ABCD",
      requestedDate :"mm/dd/yyyy"
    },
    {
      caseId: "C003",
      createdDate: "2024-12-05",
      actionType : "Action",
      drc : "ABCD",
      requestedDate :"mm/dd/yyyy"
    },
    {
      caseId: "C003",
      createdDate: "2024-12-05",
      actionType : "Action",
      drc : "ABCD",
      requestedDate :"mm/dd/yyyy"
    },
    {
      caseId: "C003",
      createdDate: "2024-12-05",
      actionType : "Action",
      drc : "ABCD",
      requestedDate :"mm/dd/yyyy"
    },
    {
      caseId: "C003",
      createdDate: "2024-12-05",
      actionType : "Action",
      drc : "ABCD",
      requestedDate :"mm/dd/yyyy"
    },
    {
      caseId: "C003",
      createdDate: "2024-12-05",
      actionType : "Action",
      drc : "ABCD",
      requestedDate :"mm/dd/yyyy"
    },
  ];

  const filteredData = data.filter((row) =>
    Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

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

  const handleNavigation = () => {
    navigate("/lod/ftl-log/preview");
  };

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

  const startIndex = currentPage * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

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
    <div className={GlobalStyle.fontPoppins}>
      <div className="">
        <h1 className={`${GlobalStyle.headingLarge} mb-6`}>Mediation Board Sending Request </h1>
        <div className="relative w-full">
          <div className="flex items-center gap-4 justify-end mb-1">
            {/* Dropdown */}
            <div className="mb-10">
            <div className="flex gap-8 items-center mb-4">
              <div className="flex gap-2 items-center">
                <label className={GlobalStyle.headingMedium}>Status</label>
                <select className={GlobalStyle.selectBox}>
                  <option></option>
                  <option> Requested </option>
                  <option> Collected </option>
                </select>
              </div>

            {/* Date Picker Section */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <label className={GlobalStyle.dataPickerDate}>Date</label>
                <DatePicker
                  selected={fromDate}
                  onChange={handleFromDateChange}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="dd/MM/yyyy"
                  className={GlobalStyle.inputText}
                />
                <DatePicker
                  selected={toDate}
                  onChange={handleToDateChange}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="dd/MM/yyyy"
                  className={GlobalStyle.inputText}
                />
              </div>
              {error && (
                <span className={`${GlobalStyle.errorText} mt-2`}>{error}</span>
              )}
            </div>

            {/* Filter Button */}
            <div>
              <button className={GlobalStyle.buttonPrimary}>Filter</button>
            </div>
          </div>
            </div>
          </div>

           {/* Table Section */}
           <div className="flex flex-col">
            {/* Search Bar Section */}
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

            {/* table */}
            <div className={GlobalStyle.tableContainer}>
              <table className={GlobalStyle.table}>
                <thead className={GlobalStyle.thead}>
                  <tr>
                    <th scope="col" className={GlobalStyle.tableHeader}>
                      Case ID
                    </th>
                    <th scope="col" className={GlobalStyle.tableHeader}>
                      Created Date
                    </th>
                    <th scope="col" className={GlobalStyle.tableHeader}>
                      Action Type
                    </th>
                    <th scope="col" className={GlobalStyle.tableHeader}>
                      DRC
                    </th>
                    <th scope="col" className={GlobalStyle.tableHeader}>
                      Requested date
                    </th>
                    <th scope="col" className={GlobalStyle.tableHeader}>
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
                      <td className={GlobalStyle.tableData}>{row.caseId}</td>
                      <td className={GlobalStyle.tableData}>{row.createdDate}</td>
                      <td className={GlobalStyle.tableData}>{row.actionType}</td>
                      <td className={GlobalStyle.tableData}>{row.drc}</td>
                      <td className={GlobalStyle.tableData}>{row.requestedDate}</td>
                      <td
                        className={`${GlobalStyle.tableData} text-center px-6 py-4`}
                      >
                        <button className={GlobalStyle.buttonPrimary}>
                           Open
                        </button>
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
          </div>

          {/* Navigation Buttons */}
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
      </div>
    </div>
  );
}

export default MediationBoardSendingRequests;
