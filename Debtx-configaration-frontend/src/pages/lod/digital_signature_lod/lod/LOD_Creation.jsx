/*Purpose: 3.5 LOD
Created Date: 2024-12-03
Created By: Vihanga Eshan Jayarathna(vihangaeshan2002@gmail.com)
Last Modified Date: 2024-12-03
Modified By: Vihanga Eshan Jayarathna(vihangaeshan2002@gmail.com)
Last Modified Date: 2024-12-12
Modified By: Dilmith Siriwardena (jtdsiriwardena@gmail.com)
Version: React v18.3.1
ui number : 3.5
Dependencies: Tailwind css
Related Files: 
Notes: This template uses tailwind css. */

import { useState } from "react";
import GlobalStyle from "../../../../assets/prototype/GlobalStyle";
import { FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const DrcLog = () => {



  const handleNavigation = () => {
    navigate('/lod/Sup_LOD_Log');
  };

  const [enteredCount, setEnteredCount] = useState("");

  const cases = [
    { caseId: "C004", amount: 4500, failReason: "-" },
    { caseId: "C128", amount: 2300, failReason: "" },
    { caseId: "C342", amount: 1254, failReason: "" },
    { caseId: "C004", amount: 4500, failReason: "" },
    { caseId: "C128", amount: 2300, failReason: "" },
    { caseId: "C342", amount: 1254, failReason: "" },
    { caseId: "C004", amount: 4500, failReason: "" },
    { caseId: "C004", amount: 4500, failReason: "" },

  ];


  const handleCountChange = (e) => {
    setEnteredCount(e.target.value);
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [selectAllData, setSelectAllData] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const navigate = useNavigate();
  const rowsPerPage = 7;


  const filteredData = cases.filter((row) =>
    Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );


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
      setSelectedRows(cases.map((row) => row.caseId));
    }
    setSelectAllData(!selectAllData);
  };

  return (
    <div className={GlobalStyle.fontPoppins}>
      <div className=" p-6 ">
        {/* Title */}
        <h2 className={`${GlobalStyle.headingLarge} mb-5`}>LOD</h2>

        {/* Dropdown and Badge */}
        <div className="flex items-center justify-between mb-4">
          <select
            className={`${GlobalStyle.selectBox} mb-5`}
            defaultValue="LOD"
          >
            <option value="LOD">LOD</option>
            <option value="Another Option">Another Option</option>
          </select>
          <div className={GlobalStyle.countBarMainBox}>
            <span>LOD</span>
            <p className={GlobalStyle.countBarSubTopic}>2000</p>
          </div>
        </div>
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

        {/* Table */}
        <div className={GlobalStyle.tableContainer}>
          <table className={GlobalStyle.table}>
            <thead className={GlobalStyle.thead}>
              <tr>
                <th scope="col" className={GlobalStyle.tableHeader}></th>
                <th scope="col" className={GlobalStyle.tableHeader}>Case ID</th>
                <th scope="col" className={GlobalStyle.tableHeader}>Amount</th>
                <th scope="col" className={GlobalStyle.tableHeader}>Fail Reason</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0
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
                  <td className={GlobalStyle.tableData}>{row.failReason}</td>
                  
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
              checked={selectAllData}
              onChange={handleSelectAllDataChange}
            />
            Select All Data
          </label>


        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end items-center gap-4">
          <input
            type="number"
            placeholder="Enter Count"
            className={GlobalStyle.inputText}
            value={enteredCount}
            onChange={handleCountChange}
          />
          <button

            className={GlobalStyle.buttonPrimary}
            onClick={handleNavigation}
          >
            Create LOD
          </button>

        </div>
      </div>
    </div>
  );
};

export default DrcLog;
