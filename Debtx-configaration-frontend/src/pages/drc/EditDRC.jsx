import { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import GlobalStyle from "../../assets/prototype/GlobalStyle";

const EditDRC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [status, setStatus] = useState("");
  const [drc, setDrc] = useState("");
  const [appliedFilters, setAppliedFilters] = useState({ status: "", drc: "" });
  const rowsPerPage = 7;

  // Dummy data for dropdown
  const drcs = ["Sensus", "CMS"];
  const rtoms = ["company 1", "company 2"];

  const data = [
    {
      abbreviation: "AB",
      drc: "Sensus",
    },
    {
      abbreviation: "KU",
      drc: "CMS",
    },
  ];

  const [isDisabled, setIsDisabled] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleDisableClick = () => {
    setIsDisabled(true);
    setPopupMessage("The Disabled successfully!");
    setShowPopup(true);
  };

  const handleSaveClick = () => {
    setPopupMessage("Changes saved successfully!");
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleFilter = () => {
    setAppliedFilters({ status, drc });
    setCurrentPage(0);
  };

  // Function to filter and search data
  const filteredData = data.filter((row) => {
    const matchesSearchQuery = Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      !appliedFilters.status || row.status === appliedFilters.status;
    const matchesDrc =
      !appliedFilters.drc || row.drc_name === appliedFilters.drc;

    return matchesSearchQuery && matchesStatus && matchesDrc;
  });

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
      <div className="mb-5">
        <h1 className={`${GlobalStyle.headingLarge} mb-1`}>Edit DRC:</h1>
        <span className={`${GlobalStyle.headingMedium} mb-4`}>
          Sensus - Sensus BPO Service (Pvt) Ltd.
        </span>
        <div className="flex justify-end items-center">
          {!isDisabled ? (
            <button
              className={`${GlobalStyle.buttonPrimary} ml-auto mb-4`}
              onClick={handleDisableClick}
            >
              Disable
            </button>
          ) : (
            <button
              className={`${GlobalStyle.buttonPrimary} ml-auto mb-4 bg-gray-500 cursor-not-allowed`}
              disabled
            >
              Disabled
            </button>
          )}
        </div>
        <div className="relative w-full">
          {/* Drop Down section */}
          <div className="flex flex-col">
            <div className="mb-10 flex justify-end">
              <div className="flex gap-4">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className={GlobalStyle.selectBox}
                >
                  <option value="">DRC</option>
                  {drcs.map((statusOption, index) => (
                    <option key={index} value={statusOption}>
                      {statusOption}
                    </option>
                  ))}
                </select>

                <select
                  value={drc}
                  onChange={(e) => setDrc(e.target.value)}
                  className={GlobalStyle.selectBox}
                >
                  <option value="">RTOM</option>
                  {rtoms.map((drcOption, index) => (
                    <option key={index} value={drcOption}>
                      {drcOption}
                    </option>
                  ))}
                </select>

                <button
                  onClick={handleFilter}
                  className={`${GlobalStyle.buttonPrimary} flex items-center gap-2`}
                >
                  Filter
                </button>
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
                    <th scope="col" className={GlobalStyle.tableHeader}>
                      Abbreviation
                    </th>
                    <th scope="col" className={GlobalStyle.tableHeader}>
                      DRC
                    </th>
                    <th scope="col" className={GlobalStyle.tableHeader}>
                      DRC
                    </th>
                    <th scope="col" className={GlobalStyle.tableHeader}>
                      DRC
                    </th>
                    <th scope="col" className={GlobalStyle.tableHeader}>
                      DRC
                    </th>
                    <th scope="col" className={GlobalStyle.tableHeader}>
                      DRC
                    </th>
                    <th scope="col" className={GlobalStyle.tableHeader}>
                      DRC
                    </th>
                    <th scope="col" className={GlobalStyle.tableHeader}>
                      DRC
                    </th>
                    <th scope="col" className={GlobalStyle.tableHeader}>
                      DRC
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
                        {row.abbreviation}
                      </td>
                      <td className={GlobalStyle.tableData}>{row.drc}</td>
                      <td className={GlobalStyle.tableData}>{row.drc}</td>
                      <td className={GlobalStyle.tableData}>{row.drc}</td>
                      <td className={GlobalStyle.tableData}>{row.drc}</td>
                      <td className={GlobalStyle.tableData}>{row.drc}</td>
                      <td className={GlobalStyle.tableData}>{row.drc}</td>
                      <td className={GlobalStyle.tableData}>{row.drc}</td>
                      <td className={GlobalStyle.tableData}>{row.drc}</td>
                    </tr>
                  ))}
                  {paginatedData.length === 0 && (
                    <tr>
                      <td colSpan="7" className="text-center py-4">
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
      {showPopup && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-lg w-1/3">
            <div className="text-center">
              <p className="text-xl text-green-600">{popupMessage}</p>
              <button
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md"
                onClick={closePopup}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-between items-center mb-4">
        <Link to="/config/drc-edit-history">
          <button className={`${GlobalStyle.buttonPrimary}`}>
            Edit History
          </button>
        </Link>
        <button
          className={`${GlobalStyle.buttonPrimary}`}
          onClick={handleSaveClick}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditDRC;
