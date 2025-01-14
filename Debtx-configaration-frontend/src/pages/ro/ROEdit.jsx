import { useState,useEffect } from "react";
import GlobalStyle from "../../assets/prototype/GlobalStyle";
import { FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import {GetRODetailsByID} from "../../services/Ro/RO"
const ROEdit = () => {
    const { roId } = useParams(); 
    const [roDetails, setRoDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState(""); // for searching
    const [currentPage, setCurrentPage] = useState(0);
    const rowsPerPage = 7;
  
  
    useEffect(() => {
        const fetchRODetails = async () => {
          try {
            const response = await GetRODetailsByID(roId);
            setRoDetails(response.data);
            console.log(response.data);
            setIsLoading(false);
          } catch (err) {
            setError(err.message);
            setIsLoading(false);
          }
        };
        fetchRODetails();
    }, [roId]);
    
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    //dummy data for table
    const data = [
      {
        editOn: "mm/dd/yyyy",
        action: "Added new RTOM Area",
        editBy: "Damithri",
      },
      {
        editOn: "mm/dd/yyyy",
        action: "Disabled RO",
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
          <span>Edit History - {roDetails.ro_name}</span>
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
                {roDetails.remark.map((row, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0
                        ? "bg-white bg-opacity-75"
                        : "bg-gray-50 bg-opacity-50"
                    } border-b`}
                  >
                    <td className={GlobalStyle.tableData}>{row.remark_date.split("T")[0]}</td>
                    <td className={GlobalStyle.tableData}>{row.remark}</td>
                    <td className={GlobalStyle.tableData}>{row.remark_edit_by}</td>
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

export default ROEdit;
