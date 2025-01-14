/* Purpose: 3.4 F2-Function
Created Date: 2024-12-03
Created By: Vihanga Eshan Jayarathna (vihangaeshan2002@gmail.com)
Last Modified Date: 2024-12-03
Modified By: Vihanga Eshan Jayarathna (vihangaeshan2002@gmail.com)
Last Modified Date: 2024-12-12
Modified By: Dilmith Siriwardena (jtdsiriwardena@gmail.com)
Version: React v18.3.1
UI Number: 3.4
Dependencies: Tailwind CSS
Related Files:
Notes: This template uses Tailwind CSS. */

import { useState } from "react";

import GlobalStyle from "../../../assets/prototype/GlobalStyle";
import { FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const Lodlog = () => {
  const [selection, setSelection] = useState("");

  const cases = [
    { caseId: "4500", amount: 4500, status: "Create" },
    { caseId: "2300", amount: 2300, status: "Create" },
    { caseId: "2300", amount: 2300, status: "Create" },
    { caseId: "4500", amount: 4500, status: "Create" },
    { caseId: "2300", amount: 2300, status: "Create" },
    { caseId: "2300", amount: 2300, status: "Create" },
    { caseId: "4500", amount: 4500, status: "Create" },
    { caseId: "4500", amount: 4500, status: "Create" },

  ];

  const handleOpenClick = () => {
    if (selection === "lod") {
      navigate("/lod/lod-creation");
    } else if (selection === "reminder") {
      navigate("/final_riminder/fr_creation");
    } else {
      alert("Please select a valid option.");
    }
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [selectAllData, setSelectAllData] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const navigate = useNavigate();
  const rowsPerPage = 7;

  const navi = () => {
    navigate("/lod/ftl-log/preview");
  };


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
      {/* Page Title */}
      <h1 className={`${GlobalStyle.headingLarge} mb-5`}>F2 Function</h1>

      {/* Summary Section */}
      <div className="flex justify-center">
      <div className={`${GlobalStyle.miniCaseCountBar}`}>
        <div className={GlobalStyle.miniCountBarSubTopicContainer}>
          <div className={GlobalStyle.miniCountBarMainBox}>
            <span>Total:</span>
            <p className={GlobalStyle.miniCountBarMainTopic}>1259</p>
          </div>
          <div className="text-3xl font-bold text-gray-600 flex items-center justify-center">
            :
          </div>
          <div className={GlobalStyle.miniCountBarMainBox}>
            <span>LOD</span>
            <p className={GlobalStyle.miniCountBarMainTopic}>100</p>
          </div>
          <div className={GlobalStyle.miniCountBarMainBox}>
            <span>Final Reminder</span>
            <p className={GlobalStyle.miniCountBarMainTopic}>250</p>
          </div>
        </div>
      </div>
      </div>


      {/* Export Button */}
      <div className="mt-6 text-right mb-5">
        <button className={GlobalStyle.buttonPrimary}>
          Export All
        </button>
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
      {/* Case List Table */}
      <div className={GlobalStyle.tableContainer}>
        <table className={GlobalStyle.table}>
          <thead className={GlobalStyle.thead}>
            <tr>
              <th scope="col" className={GlobalStyle.tableHeader}>

              </th>
              <th scope="col" className={GlobalStyle.tableHeader}>Case ID</th>
              <th scope="col" className={GlobalStyle.tableHeader}>Amount</th>
              <th scope="col" className={GlobalStyle.tableHeader}>Status</th>
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
                <td className={GlobalStyle.tableData}>{row.status}</td>
                <td
                  className={`${GlobalStyle.tableData} text-center px-6 py-4`}
                >
                  <button
                    className={`${GlobalStyle.buttonPrimary} mx-auto`}
                    onClick={navi}
                  >
                    Create
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

        {/* <Link
          className={`${GlobalStyle.buttonPrimary} ml-4`}
          to="/lod/ftllod/ftllod/downloadcreateftllod"
        >
          Create
        </Link> */}
      </div>

      {/* Dropdown Section */}
      <div className="flex justify-center mt-6">
        <div className="flex items-center">
          <label htmlFor="f2-selection" className={`${GlobalStyle.headingMedium} mr-4`}>
            F2 Selection:
          </label>
          <select
            id="f2-selection"
            className={`${GlobalStyle.selectBox} mr-4`}
            value={selection}
            onChange={(e) => setSelection(e.target.value)}
          >
            <option value="">Select Option</option>
            <option value="lod">LOD</option>
            <option value="reminder">Final Reminder</option>
          </select>
          <button
            className={GlobalStyle.buttonPrimary}
            onClick={handleOpenClick}
          >
            Open
          </button>
        </div>
      </div>
    </div>
  );
};

export default Lodlog;
