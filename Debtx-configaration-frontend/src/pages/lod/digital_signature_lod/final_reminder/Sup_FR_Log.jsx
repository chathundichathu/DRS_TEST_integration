/*Purpose: 3.8 Sup - Final Reminder Log
Created Date: 2024-12-03
Created By: Janendra Chamodi (apjanendra@gmail.com)
Last Modified Date: 2024-12-03
Modified By: Janendra Chamodi (apjanendra@gmail.com)
Version: React v18
ui number : 3.8
Dependencies: Tailwind css
Related Files: 
Notes: This template uses tailwind css. */

import { useNavigate } from 'react-router-dom';
import GlobalStyle from '../../../../assets/prototype/GlobalStyle';
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import {FaArrowLeft, FaArrowRight } from "react-icons/fa";

const FltLodLog = () => {

  const handleNavigation = () => {
    navigate('/lod/cr-update-fr');
  };

   const [searchQuery, setSearchQuery] = useState("");
   const [currentPage, setCurrentPage] = useState(0);
   const navigate = useNavigate();
   const rowsPerPage = 7;

  const logs = [
    { batchNo: "FR001", caseNo: "C002", createdBy: "A.B.Perera", createdDTM: "2024.11.05" },
    { batchNo: "FR002", caseNo: "C017", createdBy: "A.B.Perera", createdDTM: "2024.11.05" },
    { batchNo: "FR003", caseNo: "C032", createdBy: "A.B.Perera", createdDTM: "2024.11.05" },
    { batchNo: "FR004", caseNo: "C002", createdBy: "A.B.Perera", createdDTM: "2024.11.05" },
    { batchNo: "FR005", caseNo: "C017", createdBy: "A.B.Perera", createdDTM: "2024.11.05" },
    { batchNo: "FR006", caseNo: "C032", createdBy: "A.B.Perera", createdDTM: "2024.11.05" },
    { batchNo: "FR007", caseNo: "C002", createdBy: "A.B.Perera", createdDTM: "2024.11.05" },
    { batchNo: "FR008", caseNo: "C017", createdBy: "A.B.Perera", createdDTM: "2024.11.05" },
  ];

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
      <h2 className={`${GlobalStyle.headingLarge} mb-5`}>Final Reminder Submission Log</h2>
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
              <th scope="col" className={GlobalStyle.tableHeader}>Final Reminder Batch No</th>
              <th scope="col" className={GlobalStyle.tableHeader}>Case No</th>
              <th scope="col" className={GlobalStyle.tableHeader}>Created By</th>
              <th scope="col" className={GlobalStyle.tableHeader}>Created DTM</th>
              <th scope="col" className={GlobalStyle.tableHeader}></th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((log, index) => (
              <tr key={index} className={index % 2 === 0 ? GlobalStyle.tableRowEven : GlobalStyle.tableRowOdd}>
                <td className={GlobalStyle.tableData}>{log.batchNo}</td>
                <td className={GlobalStyle.tableData}>{log.caseNo}</td>
                <td className={GlobalStyle.tableData}>{log.createdBy}</td>
                <td className={GlobalStyle.tableData}>{log.createdDTM}</td>
                <td className={GlobalStyle.tableData}>
                  <button
                    className={`${GlobalStyle.buttonPrimary} `}
                    onClick={handleNavigation}
                  >
                    Open
                  </button>
                </td>
              </tr>
            ))}
            {paginatedData.length === 0 && (
              <tr>
                <td colSpan="5" className={GlobalStyle.tableData}>
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
    </div>

  );
};

export default FltLodLog;
