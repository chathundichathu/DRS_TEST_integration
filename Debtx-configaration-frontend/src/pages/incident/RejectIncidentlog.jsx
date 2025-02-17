import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { FaArrowLeft, FaArrowRight, FaSearch } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import GlobalStyle from "../../assets/prototype/GlobalStyle.jsx";
import 'react-datepicker/dist/react-datepicker.css';
import Incident_Reject from "../../assets/images/Incident_Reject.png"

export default function RejectIncidentlog() {
  const navigate = useNavigate();

  // Table data exactly matching the image
  const tableData = [
    {
      id: "RC001",
      status: "Direct LOD",
      account_no: "0115678",
      filtered_reason: "credit class",
      reject_owned: "9/10/2024",
      reject_by: "7634",
    },
    {
      id: "RC002",
      status: "Direct LOD",
      account_no: "0115678",
      filtered_reason: "customer type",
      reject_owned: "9/10/2024",
      reject_by: "3476",
    },
    {
      id: "RC003",
      status: "Direct LOD",
      account_no: "0115678",
      filtered_reason: "credit class",
      reject_owned: "9/10/2024",
      reject_by: "7634",
    },
  ];

  // Filter state
  const [fromDate, setFromDate] = useState(null); //for date
  const [toDate, setToDate] = useState(null);
  const [error, setError] = useState("");
  const [selectAllData, setSelectAllData] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0); // Changed to 0-based indexing
  const [selectedSource, setSelectedSource] = useState("");

  const rowsPerPage = 7; // Number of rows per page

  // validation for date
  const handleFromDateChange = (date) => {
    if (toDate && date > toDate) {
      setError("The 'From' date cannot be later than the 'To' date.");
    } else {
      setError("");
      setFromDate(date);
    }
  };

  // validation for date
  const handleToDateChange = (date) => {
    if (fromDate && date < fromDate) {
      setError("The 'To' date cannot be earlier than the 'From' date.");
    } else {
      setError("");
      setToDate(date);
    }
  };

  //search fuction
  const filteredData = tableData.filter((row) =>
    Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  // Calculate total pages
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

  const handleRowCheckboxChange = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleSelectAllDataChange = () => {
    if (selectAllData) {
      setSelectedRows([]); // Clear all selections
    } else {
      setSelectedRows(filteredData.map((row) => row.id)); // Select all visible rows
    }
    setSelectAllData(!selectAllData);
  };

  return (
    <div className={GlobalStyle.fontPoppins}>
      <div className="flex justify-between items-center w-full">
        <h1 className={`${GlobalStyle.headingLarge} m-0`}>
          Rejected Incident Log
        </h1>
      </div>

      {/* Filter Section */}
      <div className="flex flex-wrap gap-4 my-5 items-center justify-end">
        {/* Row 1: Source Dropdowns */}
        <div className="flex items-center gap-4 w-full justify-end">
          <select
            className={`${GlobalStyle.inputText} dropdownSmall`}
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
          >
            <option value="">Action Type</option>
            <option value="Pilot - Suspended">Pilot - Suspended</option>
            <option value="Special">Special</option>
            <option value="Product Terminate">Product Terminate</option>
          </select>

          <select
            className={`${GlobalStyle.inputText} dropdownSmall`}
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
          >
            <option value="">Status</option>
            <option value="Pilot - Suspended">Pilot - Suspended</option>
            <option value="Special">Special</option>
            <option value="Product Terminate">Product Terminate</option>
          </select>
        </div>

        {/* Row 2: Date Picker and Filter Button */}
        <div className="flex items-center gap-4 w-full justify-end">
          <div className="flex items-center gap-1">
            <label className="whitespace-nowrap">Date:</label>
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
            {error && <span className={GlobalStyle.errorText}>{error}</span>}
          </div>

          <button
            className={`${GlobalStyle.buttonPrimary} h-[35px]`}
            onClick={() => {}}
          >
            Filter
          </button>
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
        <div className={GlobalStyle.tableContainer}>
          <table className={GlobalStyle.table}>
            <thead className={GlobalStyle.thead}>
              <tr>
                <th scope="col" className={GlobalStyle.tableHeader}></th>
                <th scope="col" className={GlobalStyle.tableHeader}>
                  ID
                </th>
                <th scope="col" className={GlobalStyle.tableHeader}>
                  Status
                </th>
                <th scope="col" className={GlobalStyle.tableHeader}>
                  Account No.
                </th>
                <th scope="col" className={GlobalStyle.tableHeader}>
                  Filtered Reason
                </th>
                <th scope="col" className={GlobalStyle.tableHeader}>
                  Reject Owned
                </th>
                <th scope="col" className={GlobalStyle.tableHeader}>
                  Reject By
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
                  <td className={GlobalStyle.tableData}>
                    <input
                      type="checkbox"
                      className={"rounded-lg"}
                      checked={selectedRows.includes(row.id)}
                      onChange={() => handleRowCheckboxChange(row.id)}
                    />
                  </td>
                  <td className={GlobalStyle.tableData}>
                    <a href={`#${row.id}`} className="hover:underline">
                      {row.id}
                    </a>
                  </td>
                  <td className={GlobalStyle.tableData}>{row.status}</td>
                  <td className={GlobalStyle.tableData}>{row.account_no}</td>
                  <td className={GlobalStyle.tableData}>
                    {row.filtered_reason}
                  </td>

                  <td className={GlobalStyle.tableData}>{row.reject_owned}</td>
                  <td className={GlobalStyle.tableData}>{row.reject_by}</td>
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

      <div className="flex justify-end items-center w-full mt-6">
        {/* Select All Data Checkbox */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="rounded-lg"
            checked={
              selectAllData ||
              filteredData.every((row) => selectedRows.includes(row.id))
            } // Reflect selection state
            onChange={handleSelectAllDataChange}
          />
          Select All Data
        </label>

        <Link
          className={`${GlobalStyle.buttonPrimary} ml-4`}
          to="/lod/ftllod/ftllod/downloadcreateftllod"
        >
          Create Task Let Me Know
        </Link>
      </div>
    </div>
  );
}
