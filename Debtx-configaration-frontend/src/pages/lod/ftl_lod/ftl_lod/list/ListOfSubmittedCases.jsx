// Purpose: This template is the list of lod submited cases page.
// Created Date: 2024-12-05
// Created By: vishmi (vishmirangana1003@gmail.com)
// Last Modified Date: 2024-12-07
// Modified By: vishmi (vishmirangana1003@gmail.com)
// Version: node 22.2.0
// ui number : v3.1.6
// Dependencies: tailwind css
// Notes : This interface use for show the list of ftl lod submitted cases and, through this on create the settlement plan.

import { useState } from "react";
import { FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import DatePicker from "react-datepicker";
import GlobalStyle from "../../../../../assets/prototype/GlobalStyle";

const ListLodSubmittedCases = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 7; // Number of rows per page

  const data = [
    {
      Status: "open",
      CaseID: "C001",
      Amount: "54,00",
      LODSubmittedDate: "mm/dd/yyyy",
    },
    { Status: "-", CaseID: "C002", Amount: "-", LODSubmittedDate: "" },
    { Status: "", CaseID: "C003", Amount: "43,750", LODSubmittedDate: "" },
    {
      Status: "open",
      CaseID: "C004",
      Amount: "10,000",
      LODSubmittedDate: "mm/dd/yyyy",
    },
    {
      Status: "closed",
      CaseID: "C005",
      Amount: "23,450",
      LODSubmittedDate: "",
    },
    { Status: "open", CaseID: "C006", Amount: "5,000", LODSubmittedDate: "" },
    {
      Status: "closed",
      CaseID: "C007",
      Amount: "12,340",
      LODSubmittedDate: "",
    },
    {
      Status: "open",
      CaseID: "C008",
      Amount: "15,000",
      LODSubmittedDate: "mm/dd/yyyy",
    },
    { Status: "-", CaseID: "C009", Amount: "-", LODSubmittedDate: "" },
  ];

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
        <h1 className={`${GlobalStyle.headingLarge} mb-6`}>
          List of FTL LOD Submitted Cases
        </h1>

        <div className="relative w-full">
          <div className="flex mb-9 gap-4 pl-[500px]">
            <div className=" gap-4">
              <select className={GlobalStyle.selectBox}>
                <option>Arrears Band</option>
                <option>select 1</option>
                <option>select 2</option>
                <option>select 3</option>
              </select>
            </div>

            {/* Date Picker Section */}
            <div className="">
              <div className={GlobalStyle.datePickerContainer}>
                <label className={GlobalStyle.dataPickerDate}>Date </label>
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
                placeholder=""
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
                  <tr className="text-[18px]">
                    <th scope="col" className={GlobalStyle.tableHeader}>
                      <input type="checkbox" className="rounded-lg" />
                    </th>
                    <th scope="col" className={GlobalStyle.tableHeader}>
                      Status
                    </th>
                    <th scope="col" className={GlobalStyle.tableHeader}>
                      Case ID
                    </th>
                    <th scope="col" className={GlobalStyle.tableHeader}>
                      Amount
                    </th>
                    <th scope="col" className={GlobalStyle.tableHeader}>
                      LOD Submitted Date
                    </th>
                    <th scope="col" className={GlobalStyle.tableHeader}>
                      Settlement
                    </th>
                  </tr>
                </thead>
                <tbody className="text-[16px]">
                  {paginatedData.map((row, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0
                          ? GlobalStyle.tableRowEven
                          : GlobalStyle.tableRowOdd
                      } border-b`}
                    >
                      <td className={GlobalStyle.tableData}>
                        <input type="checkbox" className="rounded-lg" />
                      </td>
                      <td className={GlobalStyle.tableData}>{row.Status}</td>
                      <td className={GlobalStyle.tableData}>{row.CaseID}</td>
                      <td className={GlobalStyle.tableData}>{row.Amount}</td>
                      <td className={GlobalStyle.tableData}>
                        {row.LODSubmittedDate}
                      </td>
                      <td className={GlobalStyle.tableData}>
                        <button className={GlobalStyle.buttonPrimary}>
                          Create
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

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
                currentPage + 1 >= totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
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

export default ListLodSubmittedCases;
