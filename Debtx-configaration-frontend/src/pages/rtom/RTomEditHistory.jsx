import { useState, useEffect } from "react";
import { FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import GlobalStyle from '../../assets/prototype/GlobalStyle';
import { updateRTOMStatus, updateRTOMDetails } from "../../services/rtom/RtomService";

const RTomEditHistory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState("");
  // const [data, setData] = useState([]);

  const rowsPerPage = 7;

  const data = [
    {
      editon: "mm/dd/yyyy",
      action: "Added new RTOM area",
      editby: "Damithri",
    },
    {
      editon: "mm/dd/yyyy",
      action: "Disable RO",
      editby: "Saniru",
    },
  ];

  useEffect(() => {
      const fetchData = async () => {
        try {
          const details_response = await updateRTOMDetails();
          const status_response = await updateRTOMStatus();
          const { data } = { details_response, status_response }; // Properly access response
    
          const formattedData = data.map((item) => ({
            rtomId: item.rtom_id || "N/A",
            areaName: item.area_name || "N/A",
            rtomAbbreviation: item.rtom_abbreviation || "N/A",
            contactNumber: item.rtom_contact_number || "N/A",
            status: item.rtom_status || "N/A",
            faxNumber: item.rtom_fax_number || "N/A",
          }));
    
          setData(formattedData);
          setLoading(false);
        } catch (error) {
          setError("Failed to fetch RTOM details. Please try again later.");
          setLoading(false);
        }
      };
    
      fetchData();
    }, []);

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
      <h1 className={`${GlobalStyle.headingLarge} mb-6`}>Edit History AP (Ampara)</h1>
      <div className="relative w-full">

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
                    <th scope="col" className={GlobalStyle.tableHeader}>Edit On</th>
                    <th scope="col" className={GlobalStyle.tableHeader}>Action</th>
                    <th scope="col" className={GlobalStyle.tableHeader}>Edit By</th>
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
                      <td className={GlobalStyle.tableData}>{row.updated_date}</td>
                      <td className={GlobalStyle.tableData}>{row.action}</td>
                      <td className={GlobalStyle.tableData}>{row.updated_by}</td>
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
  )
}

export default RTomEditHistory;