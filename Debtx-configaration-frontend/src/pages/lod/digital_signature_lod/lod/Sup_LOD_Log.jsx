/*Purpose: 3.6 Sup - LOD Log
Created Date: 2024-12-03
Created By: Janendra Chamodi (apjanendra@gmail.com)
Last Modified Date: 2024-12-03
Modified By: Janendra Chamodi (apjanendra@gmail.com)
Last Modified Date: 2024-12-12
Modified By: Dilmith Siriwardena (jtdsiriwardena@gmail.com)
Version: React v18
ui number : 3.6
Dependencies: Tailwind css
Related Files: 
Notes: This template uses tailwind css. */

import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import GlobalStyle from '../../../../assets/prototype/GlobalStyle';
import {FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa";

const FltLodLog = () => {




  const logs = [
    { batchNo: "LOD001", caseNo: "C004", createdBy: "A.P.Perera", createdDTM: "2024.11.05" },
    { batchNo: "LOD001", caseNo: "C028", createdBy: "A.P.Perera", createdDTM: "2024.11.05" },
    { batchNo: "LOD001", caseNo: "C067", createdBy: "A.P.Perera", createdDTM: "2024.11.05" },
    { batchNo: "LOD001", caseNo: "C004", createdBy: "A.P.Perera", createdDTM: "2024.11.05" },
    { batchNo: "LOD001", caseNo: "C028", createdBy: "A.P.Perera", createdDTM: "2024.11.05" },
    { batchNo: "LOD001", caseNo: "C067", createdBy: "A.P.Perera", createdDTM: "2024.11.05" },
    { batchNo: "LOD001", caseNo: "C004", createdBy: "A.P.Perera", createdDTM: "2024.11.05" },
    { batchNo: "LOD001", caseNo: "C004", createdBy: "A.P.Perera", createdDTM: "2024.11.05" },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const rowsPerPage = 7;

  const navi = () => {
    navigate("/lod/ftl-log/preview");
  };

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
      <h2 className={`${GlobalStyle.headingLarge} mb-5`}>LOD Submission Log</h2>
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
            
              <th scope="col" className={GlobalStyle.tableHeader}>LOD Batch No</th>
              <th scope="col" className={GlobalStyle.tableHeader}>Case No</th>
              <th scope="col" className={GlobalStyle.tableHeader}>Created By</th>
              <th scope="col" className={GlobalStyle.tableHeader}>Created DTM</th>
              <th scope="col" className={GlobalStyle.tableHeader}></th>
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
                    <a href={`#${row.batchNo}`} className="hover:underline">
                      {row.batchNo}
                    </a>
                  </td>
                  <td className={GlobalStyle.tableData}>{row.caseNo}</td>
                  <td className={GlobalStyle.tableData}>{row.createdBy}</td>
                  <td className={GlobalStyle.tableData}>{row.createdDTM}</td>
                  <td
                    className={`${GlobalStyle.tableData} text-center px-6 py-4`}
                  >
                    <button
                      className={`${GlobalStyle.buttonPrimary} mx-auto`}
                      onClick={navi}
                    >
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
