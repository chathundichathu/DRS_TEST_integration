// Purpose: This template is used for the FLT LOD.
// Created Date: 2024-12-03
// Created By: Shyamal (warnakulaisuru@gmail.com)
// Last Modified Date: 2024-12-03
// Modified By: Shyamal (warnakulaisuru@gmail.com)
// Last Modified Date: 2024-12-10
// Modified By: Shyamal (warnakulaisuru@gmail.com)
// Version: node 20.11.1
// ui number : v3.1.2
// Dependencies: tailwind css
// Related Files: register.jsx (router)
// Notes: This template uses a tailwind css form for the registration fields.

import { useState } from "react";
import { FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate } from "react-router-dom";
import GlobalStyle from "../../../../assets/prototype/GlobalStyle";

const List = () => {
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
      amount: "54,000",
      failReason: "-",
      status: "open",
    },
    {
      caseId: "C002",
      amount: "-",
      failReason: "-",
      status: "-",
    },
    {
      caseId: "C005",
      amount: "43,750",
      failReason: "-",
      status: "-",
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

  const navi = () => {
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
        <h1 className={GlobalStyle.headingLarge}>FTL LOD</h1>
        <div className="relative w-full">
          <div className="flex items-center gap-4 justify-end mb-10">
            {/* Dropdown */}
            <div>
              <select className={GlobalStyle.selectBox}>
                <option>Arrears Band</option>
                <option>select 1</option>
                <option>select 2</option>
                <option>select 3</option>
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

          <div className="mb-10">
            <div className="flex gap-8 items-center mb-4">
              <div className="flex gap-2 items-center">
                <label className={GlobalStyle.headingMedium}>Template</label>
                <select className={GlobalStyle.selectBox}>
                  <option> </option>
                  <option>select 1</option>
                  <option>select 2</option>
                  <option>select 3</option>
                </select>
              </div>

              <div className="flex gap-2 items-center">
                <label className={GlobalStyle.headingMedium}>
                  Signature owner
                </label>
                <select className={GlobalStyle.selectBox}>
                  <option> </option>
                  <option>select 1</option>
                  <option>select 2</option>
                  <option>select 3</option>
                </select>
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
                    <th scope="col" className={GlobalStyle.tableHeader}></th>
                    <th scope="col" className={GlobalStyle.tableHeader}>
                      Case ID
                    </th>
                    <th scope="col" className={GlobalStyle.tableHeader}>
                      Amount
                    </th>
                    <th scope="col" className={GlobalStyle.tableHeader}>
                      Fail Reason
                    </th>
                    <th scope="col" className={GlobalStyle.tableHeader}>
                      Status
                    </th>
                    <th scope="col" className={GlobalStyle.tableHeader}></th>
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
                          checked={selectedRows.includes(row.caseId)}
                          onChange={() => handleRowCheckboxChange(row.caseId)}
                        />
                      </td>
                      <td className={GlobalStyle.tableData}>
                        <a href={`#${row.caseId}`} className="hover:underline">
                          {row.caseId}
                        </a>
                      </td>
                      <td className={GlobalStyle.tableData}>{row.amount}</td>
                      <td className={GlobalStyle.tableData}>
                        {row.failReason}
                      </td>
                      <td className={GlobalStyle.tableData}>{row.status}</td>
                      <td
                        className={`${GlobalStyle.tableData} text-center px-6 py-4`}
                      >
                        <button
                          className={`${GlobalStyle.buttonPrimary} mx-auto`}
                          onClick={navi}
                        >
                          Preview
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

      <div className="flex justify-end items-center w-full mt-6">
        {/* Select All Data Checkbox */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="rounded-lg"
            checked={selectAllData}
            onChange={handleSelectAllDataChange}
          />
          Select All Data
        </label>

        <Link
          className={`${GlobalStyle.buttonPrimary} ml-4`}
          to="/lod/ftllod/ftllod/downloadcreateftllod"
        >
          Create
        </Link>
      </div>
    </div>
  );
}

export default List;
