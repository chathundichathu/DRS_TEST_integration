/* Purpose: This template is used for the 1.13 - DRC Assign Manager Approval.
Created Date: 2024-12-03
Created By: Geeth (eshaneperera@gmail.com)
Last Modified Date: 2024-12-11
Modified Date: 2024-12-06
Modified Date: 2024-12-03
Modified By: Geeth(eshaneperera@gmail.com)
Version: node 20
ui number : v1.0.1
Dependencies: tailwind css
Related Files: (routes)
Notes: This page includes a filter and a table */

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaArrowLeft, FaArrowRight, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import GlobalStyle from "../../assets/prototype/GlobalStyle.jsx"; // Importing GlobalStyle

const DRCApproval = () => {
  // Sample data for the table
  const data = [
    {
      caseId: "C001",
      createdDate: "2024.11.05",
      actionType: "Action",
      drc: "CMS",
      approvedBy: "Pending",
      approvedOn: "mm/dd/yyyy",
    },
    {
      caseId: "C002",
      createdDate: "2024.11.06",
      actionType: "Review",
      drc: "RE",
      approvedBy: "Pending",
      approvedOn: "mm/dd/yyyy",
    },
    {
      caseId: "C003",
      createdDate: "2024.11.07",
      actionType: "Assignment",
      drc: "CO LAN",
      approvedBy: "Pending",
      approvedOn: "mm/dd/yyyy",
    },
    {
      caseId: "C004",
      createdDate: "2024.11.08",
      actionType: "Verification",
      drc: "ACCIVA",
      approvedBy: "Pending",
      approvedOn: "mm/dd/yyyy",
    },
    {
      caseId: "C005",
      createdDate: "2024.11.09",
      actionType: "Approval",
      drc: "PROMPT",
      approvedBy: "Pending",
      approvedOn: "mm/dd/yyyy",
    },
  ];

  // State for filters and table
  const [selectedDRC, setSelectedDRC] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [filteredData, setFilteredData] = useState(data);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentData = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  // Handle filter action
  const handleFilter = () => {
    const filtered = data.filter((item) => {
      const createdDateValid =
        !fromDate || new Date(item.createdDate) >= new Date(fromDate);
      const approvedOnValid =
        !toDate ||
        item.approvedOn === "mm/dd/yyyy" ||
        new Date(item.approvedOn) <= new Date(toDate);
      const drcValid = !selectedDRC || item.drc === selectedDRC;
      return createdDateValid && approvedOnValid && drcValid;
    });
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to the first page after filtering
  };

  // Handle pagination
  const handlePrevNext = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle checkbox selection
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState(new Set());

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedRows(new Set(currentData.map((_, index) => index)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleRowSelect = (index) => {
    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(index)) {
      newSelectedRows.delete(index);
    } else {
      newSelectedRows.add(index);
    }
    setSelectedRows(newSelectedRows);
  };

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleApprove = () => {
    if (selectedRows.size > 0) {
      setIsModalOpen(true); // Open modal if at least one row is selected
      setTimeout(() => {
        closeModal(); // Redirect after 2 seconds
      }, 2000); // Adjusted to 2 seconds
    }
  };

  const closeModal = () => {
    navigate("/drc/re-assign-DRC"); // Redirect after approval
  };

  // Filtering the data based on search query
  const filteredDataBySearch = filteredData.filter((row) =>
    Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className={GlobalStyle.fontPoppins}>
      {/* Title */}
      <h1 className={GlobalStyle.headingLarge}>DRC Assign Approval</h1>

      {/* Filter Section */}
      <div className="flex items-center justify-end gap-4 mt-20 mb-4">
        {/* DRC Select Dropdown */}
        <select
          className={GlobalStyle.selectBox}
          value={selectedDRC}
          onChange={(e) => setSelectedDRC(e.target.value)}
        >
          <option value="">DRC</option>
          {["CMS", "TCM", "RE", "CO LAN", "ACCIVA", "VISONCOM", "PROMPT"].map(
            (drc) => (
              <option key={drc} value={drc}>
                {drc}
              </option>
            )
          )}
        </select>
        
        {/* Date Picker */}
        <div className="flex flex-col mb-4">
          <div className={GlobalStyle.datePickerContainer}>
            <label className={GlobalStyle.dataPickerDate}>Date </label>
            <DatePicker
              selected={fromDate}
              onChange={(date) => setFromDate(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="dd/MM/yyyy"
              className={GlobalStyle.inputText}
            />
            <DatePicker
              selected={toDate}
              onChange={(date) => setToDate(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="dd/MM/yyyy"
              className={GlobalStyle.inputText}
            />
          </div>
        </div>

        {/* Filter Button */}
        <button
          onClick={handleFilter}
          className={`${GlobalStyle.buttonPrimary}`}
        >
          Filter
        </button>
      </div>

      {/* Search Section */}
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

      {/* Table Section */}
      <div className={GlobalStyle.tableContainer}>
        <table className={GlobalStyle.table}>
          <thead className={GlobalStyle.thead}>
            <tr>
              <th className={GlobalStyle.tableHeader}></th>
              <th className={GlobalStyle.tableHeader}>Case ID</th>
              <th className={GlobalStyle.tableHeader}>Created Date</th>
              <th className={GlobalStyle.tableHeader}>Action Type</th>
              <th className={GlobalStyle.tableHeader}>DRC</th>
              <th className={GlobalStyle.tableHeader}>Approved By</th>
              <th className={GlobalStyle.tableHeader}>Approved On</th>
            </tr>
          </thead>
          <tbody>
            {filteredDataBySearch.map((item, index) => (
              <tr
                key={item.caseId}
                className={
                  index % 2 === 0
                    ? GlobalStyle.tableRowEven
                    : GlobalStyle.tableRowOdd
                }
              >
                <td className="text-center">
                  <input
                    type="checkbox"
                    checked={selectedRows.has(index)}
                    onChange={() => handleRowSelect(index)}
                    className="mx-auto"
                  />
                </td>
                <td className={GlobalStyle.tableData}>{item.caseId}</td>
                <td className={GlobalStyle.tableData}>{item.createdDate}</td>
                <td className={GlobalStyle.tableData}>{item.actionType}</td>
                <td className={GlobalStyle.tableData}>{item.drc}</td>
                <td className={GlobalStyle.tableData}>{item.approvedBy}</td>
                <td className={GlobalStyle.tableData}>{item.approvedOn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      <div className={GlobalStyle.navButtonContainer}>
        <button
          onClick={() => handlePrevNext("prev")}
          disabled={currentPage === 1}
          className={`${GlobalStyle.navButton} ${
            currentPage === 1 ? "cursor-not-allowed" : ""
          }`}
        >
          <FaArrowLeft />
        </button>
        <span className={`${GlobalStyle.pageIndicator} mx-4`}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePrevNext("next")}
          disabled={currentPage === totalPages}
          className={`${GlobalStyle.navButton} ${
            currentPage === totalPages ? "cursor-not-allowed" : ""
          }`}
        >
          <FaArrowRight />
        </button>
      </div>

      {/* Select All Data Checkbox and Approve Button */}
      <div className="flex justify-end gap-4 mt-4">
        {/* Select All Data Checkbox */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="rounded-lg"
            checked={selectAll}
            onChange={handleSelectAll}
          />
          Select All Data
        </label>

        {/* Approve Button */}
        <button
          onClick={handleApprove}
          className={GlobalStyle.buttonPrimary}
          disabled={selectedRows.size === 0} // Disable if no rows are selected
        >
          Approve
        </button>
      </div>

      {/* Modal Section */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 text-center bg-white rounded-lg shadow-lg">
            {" "}
            {/* Added text-center here */}
            <h2 className="text-xl font-bold">Successfully Approved</h2>
            <p>Redirecting...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DRCApproval;
