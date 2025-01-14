/*Purpose: 6.1 Dispute Log
Created Date: 2024-12-03
Created By: Dilmith Siriwardena (jtdsiriwardena@gmail.com)
Last Modified Date: 2024-12-13
Modified By: Dilmith Siriwardena (jtdsiriwardena@gmail.com)
Version: React v18
ui number : 6.1
Dependencies: Tailwind CSS
Related Files: 
Notes: This template uses Tailwind CSS */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GlobalStyle from "../../../../assets/prototype/GlobalStyle";
import { FaSearch } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const FltLodLog = () => {
  const handleOpenClick = () => {
    navigate("/lod/digital_signature_lod/dispute/Dispute_Submission");
  };

  const [caseID, setCaseID] = useState("");
  const [status, setStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const rowsPerPage = 7;

  const logs = [
    { caseID: "001", amount: "20000", status: "Open" },
    { caseID: "002", amount: "15000", status: "Closed" },
    { caseID: "003", amount: "30000", status: "Pending" },
    { caseID: "004", amount: "20000", status: "Open" },
    { caseID: "005", amount: "15000", status: "Closed" },
    { caseID: "006", amount: "30000", status: "Pending" },
    { caseID: "007", amount: "20000", status: "Open" },
    { caseID: "008", amount: "15000", status: "Closed" },
  ];

  const handleFilter = () => {};

  const filteredData = logs.filter((row) =>
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

  return (
    <div className={GlobalStyle.fontPoppins}>
      <h2 className={GlobalStyle.headingLarge}>Dispute Log</h2>

      {/* Filters */}
      <div className="flex justify-end mb-8">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Case ID"
            value={caseID}
            onChange={(e) => setCaseID(e.target.value)}
            className={GlobalStyle.inputText}
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={GlobalStyle.selectBox}
          >
            <option value="">Status</option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
            <option value="Pending">Pending</option>
          </select>
          <button onClick={handleFilter} className={GlobalStyle.buttonPrimary}>
            Filter
          </button>
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

      {/* table */}
      <div className={GlobalStyle.tableContainer}>
        <table className={GlobalStyle.table}>
          <thead className={GlobalStyle.thead}>
            <tr>
              <th scope="col" className={GlobalStyle.tableHeader}>
                Case ID
              </th>
              <th scope="col" className={GlobalStyle.tableHeader}>
                Amount
              </th>
              <th scope="col" className={GlobalStyle.tableHeader}>
                Status
              </th>
              <th scope="col" className={GlobalStyle.tableHeader}></th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((log, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0
                    ? "bg-white bg-opacity-75"
                    : "bg-gray-50 bg-opacity-50"
                } border-b`}
              >
                <td className={GlobalStyle.tableData}>{log.caseID}</td>
                <td className={GlobalStyle.tableData}>{log.amount}</td>
                <td className={GlobalStyle.tableData}>{log.status}</td>
                <td className={GlobalStyle.tableData}>
                  <button
                    className={GlobalStyle.buttonPrimary}
                    onClick={handleOpenClick}
                  >
                    Open
                  </button>
                </td>
              </tr>
            ))}
            {paginatedData.length === 0 && (
              <tr>
                <td colSpan="4" className={GlobalStyle.tableData}>
                  No logs found
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
    </div>
  );
};

export default FltLodLog;
