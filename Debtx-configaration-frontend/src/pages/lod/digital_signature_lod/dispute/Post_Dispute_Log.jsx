/*Purpose: 6.3 Post Dispute Log
Created Date: 2024-12-03
Created By: Janendra Chamodi (apjanendra@gmail.com)
Last Modified Date: 2024-12-13
Modified By: ChatGPT
Version: React v18
UI Number: 6.3
Dependencies: Tailwind CSS
Notes: This template uses Tailwind CSS. */

import GlobalStyle from "../../../../assets/prototype/GlobalStyle";
import { FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useState } from "react";

const FltLodLog = () => {
  const logs = [
    { caseID: "001", amount: "20000", status: "Open", channel: "Online", remark: "Pending Review", submittedBy: "John Doe", submittedDTM: "2024-12-02" },
    { caseID: "002", amount: "20000", status: "Open", channel: "Branch", remark: "Follow-up Needed", submittedBy: "Jane Doe", submittedDTM: "2024-12-01" },
    { caseID: "003", amount: "20000", status: "Open", channel: "Online", remark: "Pending Review", submittedBy: "John Doe", submittedDTM: "2024-12-02" },
    { caseID: "004", amount: "20000", status: "Open", channel: "Branch", remark: "Follow-up Needed", submittedBy: "Jane Doe", submittedDTM: "2024-12-01" },
    { caseID: "005", amount: "20000", status: "Open", channel: "Online", remark: "Pending Review", submittedBy: "John Doe", submittedDTM: "2024-12-02" },
    { caseID: "006", amount: "20000", status: "Open", channel: "Branch", remark: "Follow-up Needed", submittedBy: "Jane Doe", submittedDTM: "2024-12-01" },
    { caseID: "007", amount: "20000", status: "Open", channel: "Online", remark: "Pending Review", submittedBy: "John Doe", submittedDTM: "2024-12-02" },
    { caseID: "008", amount: "20000", status: "Open", channel: "Branch", remark: "Follow-up Needed", submittedBy: "Jane Doe", submittedDTM: "2024-12-01" },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 7;

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
      <h2 className={`${GlobalStyle.headingLarge} mb-5`}>Post Dispute Log</h2>
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
              <th scope="col" className={GlobalStyle.tableHeader}>Case ID</th>
              <th scope="col" className={GlobalStyle.tableHeader}>Amount (LKR)</th>
              <th scope="col" className={GlobalStyle.tableHeader}>Status</th>
              <th scope="col" className={GlobalStyle.tableHeader}>Handed Over Channel</th>
              <th scope="col" className={GlobalStyle.tableHeader}>Remark</th>
              <th scope="col" className={GlobalStyle.tableHeader}>Submitted By</th>
              <th scope="col" className={GlobalStyle.tableHeader}>Submitted DTM</th>
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
                <td className={GlobalStyle.tableData}>{log.channel}</td>
                <td className={GlobalStyle.tableData}>{log.remark}</td>
                <td className={GlobalStyle.tableData}>{log.submittedBy}</td>
                <td className={GlobalStyle.tableData}>{log.submittedDTM}</td>
              </tr>
            ))}
            {paginatedData.length === 0 && (
              <tr>
                <td colSpan="7" className={GlobalStyle.tableData}>
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
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
