import { useState } from 'react';
import { FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import GlobalStyle from '../../assets/prototype/GlobalStyle'

const RTomLog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 7;

  const data = [
    {
        abbreviation: "AB",
        drc: "Sensu..",
    },
    {
        abbreviation: "KU",
        drc: "CMS",
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

  return (
    <div className={GlobalStyle.fontPoppins}>
        <div className="">
          <h1 className={`${GlobalStyle.headingLarge} mb-6`}>RTom Log</h1>
          <div className="relative w-full">
            <div className="flex items-center gap-6 justify-end mb-10">
                {/* Dropdown */}
                <div>
                    <select className={GlobalStyle.selectBox}>
                        <option>DRC</option>
                        <option>select 1</option>
                        <option>select 2</option>
                        <option>select 3</option>
                    </select>
                </div>

                <div>
                    <select className={GlobalStyle.selectBox}>
                        <option>RTom</option>
                        <option>select 1</option>
                        <option>select 2</option>
                        <option>select 3</option>
                    </select>
                </div>

                {/* Filter Button */}
                <div>
                    <button className={GlobalStyle.buttonPrimary}>Filter</button>
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
                    <th scope="col" className={GlobalStyle.tableHeader}>Abbreviation</th>
                    <th scope="col" className={GlobalStyle.tableHeader}>DRC</th>
                    <th scope="col" className={GlobalStyle.tableHeader}>DRC</th>
                    <th scope="col" className={GlobalStyle.tableHeader}>DRC</th>
                    <th scope="col" className={GlobalStyle.tableHeader}>DRC</th>
                    <th scope="col" className={GlobalStyle.tableHeader}>DRC</th>
                    <th scope="col" className={GlobalStyle.tableHeader}>DRC</th>
                    <th scope="col" className={GlobalStyle.tableHeader}>DRC</th>
                    <th scope="col" className={GlobalStyle.tableHeader}>DRC</th>
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
                      <td className={GlobalStyle.tableData}>{row.abbreviation}</td>
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
    </div>
  )
}

export default RTomLog