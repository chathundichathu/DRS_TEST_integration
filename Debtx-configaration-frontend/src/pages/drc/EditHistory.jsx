import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GlobalStyle from "../../assets/prototype/GlobalStyle";
import { FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa";

const EditHistory = () => {
    
    const [searchQuery, setSearchQuery] = useState(""); // for searching
    const [currentPage, setCurrentPage] = useState(0);
    const navigate = useNavigate();
    const rowsPerPage = 7;
  
  
    //dummy data for table
    const data = [
      {
        editOn: "mm/dd/yyyy",
        action: "Sensus BPO Services (Pvt) ltd...",
        editBy: "Damithri",
      },
      {
        editOn: "mm/dd/yyyy",
        action: "Central Management Services (Pvt) ltd...",
        editBy: "Saniru",
      },
       ];
  
    //search fuction
    const filteredData = data.filter((row) =>
      Object.values(row)
        .join(" ")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  
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
  
    return (
      <div className={GlobalStyle.fontPoppins}>
        <div className={`${GlobalStyle.headingLarge} mb-8`}>
          <span>Edit History - Sensus BPO Service (Pvt) Ltd</span>
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
                      Edit On
                  </th>
                  <th scope="col" className={GlobalStyle.tableHeader}>
                    Action
                  </th>
                  <th scope="col" className={GlobalStyle.tableHeader}>
                    Edit By
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
                    <td className={GlobalStyle.tableData}>{row.editOn}</td>
                    <td className={GlobalStyle.tableData}>{row.action}</td>
                    <td className={GlobalStyle.tableData}>{row.editBy}</td>
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
  
    );
}

export default EditHistory
