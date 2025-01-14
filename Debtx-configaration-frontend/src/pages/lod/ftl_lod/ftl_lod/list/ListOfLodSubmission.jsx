// Purpose: This template is the list of LOD submission page.
// Created Date: 2024-12-05
// Created By: Vishmi (vishmirangana1003@gmail.com)
// Last Modified Date: 2024-12-07
// Modified By: Vishmi (vishmirangana1003@gmail.com)
// Version: Node 22.2.0
// UI Version: v3.1.5
// Dependencies: Tailwind CSS
// Notes: This interface use for show the list of ftl lod submission.

import { useState } from "react";
import { FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import DatePicker from "react-datepicker";
import GlobalStyle from "../../../../../assets/prototype/GlobalStyle";

const ListOfLodSubmission = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 7; // Number of rows per page

  const data = [
    {
      FTLLODBatchNo: "FTL001",
      ProssesCount: "100",
      createdBy: "A.B. Perera",
      CreatedOn: "2024.11.05",
    },
    // Additional dummy data for testing
    {
      FTLLODBatchNo: "FTL002",
      ProssesCount: "200",
      createdBy: "C.D. Silva",
      CreatedOn: "2024.11.06",
    },
    {
      FTLLODBatchNo: "FTL003",
      ProssesCount: "150",
      createdBy: "E.F. Fernando",
      CreatedOn: "2024.11.07",
    },
  ];

  // Filter data based on the search query
  const filteredData = data.filter((row) =>
    Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage + 1 < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

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

  return (
    <div className={GlobalStyle.fontPoppins}>
      <div className="flex flex-col items-start justify-start min-h-screen p-4">
        <h1 className={`${GlobalStyle.headingLarge} mb-6`}>List of FTL LOD Submission</h1>

        <div className="relative w-full">
          <div className="flex mb-9 gap-4 pl-[600px]">
            {/* Date Picker Section */}
            <div className="flex flex-col">
              <div className={GlobalStyle.datePickerContainer}>
                <label className={GlobalStyle.dataPickerDate}>Date</label>
                <DatePicker
                  selected={fromDate}
                  onChange={handleFromDateChange}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="From Date"
                  className={GlobalStyle.inputText}
                />
                <DatePicker
                  selected={toDate}
                  onChange={handleToDateChange}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="To Date"
                  className={GlobalStyle.inputText}
                />
              </div>
              {error && <span className={GlobalStyle.errorText}>{error}</span>}
            </div>
            <div>
              <button className={GlobalStyle.buttonPrimary}>Filter</button>
            </div>
            </div>

          {/* Search Bar Section */}
          <div className="mb-4 flex pl-[960px]">
            <div className={GlobalStyle.searchBarContainer}>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={GlobalStyle.inputSearch}
              />
              <FaSearch className={GlobalStyle.searchBarIcon} />
            </div>
          </div>
        

        {/* Table Section */}
        <div className="flex items-center justify-center">
          <div className={GlobalStyle.tableContainer}>
            <table className={GlobalStyle.table}>
              <thead className={GlobalStyle.thead}>
                <tr>
                  <th className={GlobalStyle.tableHeader}>
                    <input type="checkbox" className="rounded-lg" />
                  </th>
                  <th className={GlobalStyle.tableHeader}>FTL LOD Batch No</th>
                  <th className={GlobalStyle.tableHeader}>Prosses Count</th>
                  <th className={GlobalStyle.tableHeader}>Created By</th>
                  <th className={GlobalStyle.tableHeader}>Created On</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((row, index) => (
                  <tr
                    key={index}
                    className={
                      index % 2 === 0
                        ? GlobalStyle.tableRowEven
                        : GlobalStyle.tableRowOdd
                    }
                  >
                    <td className={GlobalStyle.tableData}>
                      <input type="checkbox" className="rounded-lg" />
                    </td>
                    <td className={GlobalStyle.tableData}>
                      {row.FTLLODBatchNo || "-"}
                    </td>
                    <td className={GlobalStyle.tableData}>
                      {row.ProssesCount || "-"}
                    </td>
                    <td className={GlobalStyle.tableData}>
                      {row.createdBy || "-"}
                    </td>
                    <td className={GlobalStyle.tableData}>
                      {row.CreatedOn || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        

        {/* Pagination Section */}
        <div className={GlobalStyle.navButtonContainer}>
          <button
            onClick={handlePrevPage}
            className={`${GlobalStyle.navButton} ${
              currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={currentPage === 0}
          >
            <FaArrowLeft />
          </button>
          <span className="text-lg text-gray-700 font-medium">
            {currentPage + 1}
          </span>
          <button
            onClick={handleNextPage}
            className={`${GlobalStyle.navButton} ${
              currentPage + 1 >= totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={currentPage + 1 >= totalPages}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ListOfLodSubmission;
