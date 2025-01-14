/* Purpose : This template is used for the 2.9.2 - Mediation Board Sending Requests
Created Date : 2024 - 12 - 03
Created By : U.H.Nandali Linara (nadalilinara5@gmail.com)
Last Modified Date : 2024 - 12 - 06
Version : v20.16.0
ui number : 
Dependencies : tailwind css
Related Files : (routes)
*/

import { useState } from "react";
import GlobalStyle from "../../assets/prototype/GlobalStyle";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MediationBoardAccept = () => {
  const [negotiation, setNegotiation] = useState("");
  const [courtNo, setCourtNo] = useState("");
  const [remark, setRemark] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  const navigate = useNavigate();
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

  return (
    <div className={GlobalStyle.fontPoppins}>
      <div className="flex flex-col min-h-screen p-4">
        <h1 className={GlobalStyle.headingLarge}>Mediation Board Accept</h1>

        {/* Case Details */}
        <div className={`${GlobalStyle.cardContainer}`}>
          <p className="mb-2">
            <strong>Case ID:</strong>
          </p>
          <p className="mb-2">
            <strong>Customer Ref:</strong>
          </p>
          <p className="mb-2">
            <strong>Account no:</strong>
          </p>
          <p className="mb-2">
            <strong>Arrears Amount:</strong>
          </p>
          <p className="mb-2">
            <strong>Last Payment Date:</strong>
          </p>
        </div>

        {/* Negotiation Details */}
        <div className="mb-4">
          <p className="block font-medium mb-2">Negotiation Details:</p>

          {/* Search Bar */}
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

          {/* Data Table */}
          <div className={GlobalStyle.tableContainer}>
            <table className={GlobalStyle.table}>
              <thead className={GlobalStyle.thead}>
                <tr>
                  <th scope="col" className={GlobalStyle.tableHeader}>Date</th>
                  <th scope="col" className={GlobalStyle.tableHeader}>Negotiation</th>
                  <th scope="col" className={GlobalStyle.tableHeader}>Remark</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((row, index) => (
                  <tr
                    key={row.caseId}
                    className={
                      index % 2 === 0
                        ? "bg-white bg-opacity-75"
                        : "bg-gray-50 bg-opacity-50"
                    }
                  >
                    <td className={GlobalStyle.tableData}>{row.date}</td>
                    <td className={GlobalStyle.tableData}>{row.negotiation}</td>
                    <td className={GlobalStyle.tableData}>{row.remark}</td>
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
        {/* Pagination Controls */}
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            className={`${
              currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
            } ${GlobalStyle.buttonSecondary}`}
          >
           
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === pages - 1}
            className={`${
              currentPage === pages - 1 ? "opacity-50 cursor-not-allowed" : ""
            } ${GlobalStyle.buttonSecondary}`}
          >
          
          </button>
        </div>

        {/* Negotiation Options */}
        <div className="mt-6">
          <p className="block font-medium mb-2">Mediation Board Accept </p>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="Yes"
                checked={negotiation === "Yes"}
                onChange={() => setNegotiation("Yes")}
                className="mr-2"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="No"
                checked={negotiation === "No"}
                onChange={() => setNegotiation("No")}
                className="mr-2"
              />
              No
            </label>
          </div>
        </div>

        

        <div className="flex items-center justify-end gap-4">
        <button className={GlobalStyle.buttonPrimary}>Withdraw</button>
        <button className={GlobalStyle.buttonPrimary}>Submit</button>
      </div>
      </div>

    </div>
  );
};

export default MediationBoardAccept;
