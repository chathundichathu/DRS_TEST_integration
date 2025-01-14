import { useState, useEffect } from "react";
import GlobalStyle from "../../assets/prototype/GlobalStyle";
import { Link, useParams } from "react-router-dom";
import { GetRODetailsByID } from "../../services/Ro/RO";
import { FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import edit_info from "../../assets/images/edit-info.svg"
import activeIcon from "../../assets/images/active.svg";
import deactiveIcon from "../../assets/images/deactive.svg";

const RODetails = () => {
  const { roId } = useParams();  
  const [roDetails, setRoDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 7; 

  const [tableData] = useState([
    { rtomArea: "AD", changeOn: "1/1/2025", status: false },
    { rtomArea: "GM", changeOn: "1/1/2025", status: false },
    { rtomArea: "KU", changeOn: "1/1/2025", status: false },
  ]);

  const logHistoryData = [
    { editOn: "mm/dd/yyyy", action: "Sensus BPO Services (Pvt) Ltd", editBy: "Damithri" },
    { editOn: "mm/dd/yyyy", action: "Central Management Services (PVT) Ltd", editBy: "Saniru" },
  ];

  const filteredLogHistory = logHistoryData.filter((row) =>
    Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const pages = Math.ceil(filteredLogHistory.length / rowsPerPage);
  const startIndex = currentPage * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedLogHistory = filteredLogHistory.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < pages - 1) setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    const fetchRODetails = async () => {
      try {
        const response = await GetRODetailsByID(roId);
        setRoDetails(response.data);
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

  return (
    <div className={GlobalStyle.fontPoppins}>
      <div className={`${GlobalStyle.headingLarge} mb-4`}>
        <span>RO Details</span>
      </div>
      <div className="flex justify-center">
        <div className={`${GlobalStyle.cardContainer} p-4 mb-8`}>
          <div className="flex justify-end">
            <Link to={`/config/ro-edit-details/${roId}`}>
              <button>
                <img src={edit_info} title="Edit" className="w-6 h-6" />
              </button>
            </Link>
          </div>
          <table className="mb-8 w-fit">
            <tbody>
              <tr>
                <td>
                  <label className={`${GlobalStyle.headingMedium}`}>
                    Added Date
                  </label>
                </td>
                <td> : </td>
                <td>
                  <label> {roDetails.createdAt.split("T")[0]}</label>
                </td>
              </tr>
              <tr>
                <td>
                  <label className={`${GlobalStyle.headingMedium}`}>
                    Recovery Officer Name
                  </label>
                </td>
                <td> : </td>
                <td>
                  <label>{roDetails.ro_name}</label>
                </td>
              </tr>
              <tr>
                <td>
                  <label className={`${GlobalStyle.headingMedium}`}>NIC</label>
                </td>
                <td> : </td>
                <td>
                  <label>{roDetails.ro_nic}</label>
                </td>
              </tr>
              <tr>
                <td>
                  <label className={`${GlobalStyle.headingMedium}`}>
                    Contact Number &nbsp;
                  </label>
                </td>
                <td> : </td>
                <td>
                  <label>{roDetails.ro_contact_no}</label>
                </td>
              </tr>
              <tr>
                <td>
                  <label className={`${GlobalStyle.headingMedium}`}>
                    Login Method
                  </label>
                </td>
                <td> : </td>
                <td>
                  <label>{roDetails.login_type}</label>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex flex-col mb-5">
            <span className={GlobalStyle.headingMedium}>RTOM Area:</span>
            <div className={GlobalStyle.tableContainer}>
              <table className={`${GlobalStyle.table} w-full`}>
                <thead className={GlobalStyle.thead}>
                  <tr>
                    <th className={`${GlobalStyle.tableHeader} text-left`}>
                      RTOM Area
                    </th>
                    <th className={`${GlobalStyle.tableHeader} text-left`}>
                      Change On
                    </th>
                    <th className={`${GlobalStyle.tableHeader}`}></th>
                  </tr>
                </thead>
                <tbody>
                  {roDetails.rtoms_for_ro.map((item, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0
                          ? "bg-white bg-opacity-75"
                          : "bg-gray-50 bg-opacity-50"
                      } border-b`}
                    >
                      <td className={`${GlobalStyle.tableData} p-3`}>
                        {item.name}
                      </td>
                      <td className={`${GlobalStyle.tableData} p-3`}>
                        {item.status[0].rtoms_for_ro_status_date.split("T")[0]}
                      </td>
                      <td className={GlobalStyle.tableData}>
                    <div className="flex items-center justify-center gap-2">
                      <img
                        src={item.status[0].status === "Active" ? activeIcon : deactiveIcon}
                        alt={item.status[0].status}
                        className="w-5 h-5"
                        title={item.status[0].status === "Active" ? "Active" : "Deactive"}
                      />
                    </div>
                  </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

          {/* End Button */}
          <div className="flex justify-end mb-4">
            <Link to="/config/ro-end">
              <button className={GlobalStyle.buttonPrimary}>
              End
              </button>
            </Link>
          </div>

      
        {/* Log History Button */}
        <div className="flex justify-start">
          <button
            className={`${GlobalStyle.buttonPrimary}`}
            onClick={() => setShowPopup(true)}
          >
            Log History
          </button>
        </div>
      

      {showPopup && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-lg w-3/4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Log History</h2>
              <button
                className="text-red-500 text-lg font-bold"
                onClick={() => setShowPopup(false)}
              >
                ×
              </button>
            </div>
            <div>
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
                      <th className={GlobalStyle.tableHeader}>Edit On</th>
                      <th className={GlobalStyle.tableHeader}>Action</th>
                      <th className={GlobalStyle.tableHeader}>Edit By</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roDetails.remark.slice(-2).map((row, index) => (
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
                    {paginatedLogHistory.length === 0 && (
                      <tr>
                        <td colSpan="3" className="text-center py-4">
                          No results found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              {filteredLogHistory.length > rowsPerPage && (
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
      )}
    </div>
  );
};

export default RODetails;