import { useState, useEffect } from "react";
import {Link , useParams } from "react-router-dom";
import GlobalStyle from "../../assets/prototype/GlobalStyle";
import { getActiveServiceDetails } from "../../services/serviceType/ServiceTypeService";
import { assignServiceToDrc } from "../../services/drc_service/DRC_Service";
import {getDrcDetailsWithServicesById} from "../../services/drc/DRCService";
import activeIcon from "../../assets/images/active.svg";
import deactiveIcon from "../../assets/images/deactive.svg";
import edit_info from "../../assets/images/edit-info.svg"
import { FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa";

const DrcInfo = () => {
  const { drcId } = useParams();
  const [services, setServices] = useState([]);
  const [drcDetails, setDrcDetails] = useState({});
  const [newServiceType, setNewServiceType] = useState("");
  const [activeServiceTypes, setActiveServiceTypes] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 7;
  const [negotiation, setNegotiation] = useState("");
  const [remark, setRemark] = useState("");
  const [endDate, setEndDate] = useState(""); 
  const [error, setError] = useState(null);

  const logHistoryData = [
    { editOn: "mm/dd/yyyy", action: "Sensus BPO Services (Pvt) ltd...", editBy: "Damithri" },
    { editOn: "mm/dd/yyyy", action: "Central Management Services (Pvt) ltd...", editBy: "Saniru" },
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
    const fetchInitialData = async () => {
      try {
        const drcData = await getDrcDetailsWithServicesById(drcId);
        const activeServices = await getActiveServiceDetails();
        setDrcDetails(drcData);
        setServices(drcData.services_of_drc || []);
        setActiveServiceTypes(activeServices);
      } catch (error) {
        console.error("Error initializing data:", error.message);
        setError("Failed to load data. Please try again.");
      }
    };

    if (drcId) {
      fetchInitialData();
    }
  }, [drcId]);

  const handleAddService = async () => {
    if (!newServiceType) {
      setError("Please select a service type.");
      return;
    }

    const selectedService = activeServiceTypes.find(
      (service) => service.service_type === newServiceType
    );
    try {
      await assignServiceToDrc(drcId, selectedService.service_id);

      // Update services in UI
      setServices((prev) => [
        ...prev,
        {
          service_id: selectedService.service_id,
          service_type: selectedService.service_type,
          service_status: "Active",
        },
      ]);

      setNewServiceType("");
    } catch {  }
  };

  return (
    <div className={GlobalStyle.fontPoppins}>
      <h1 className={GlobalStyle.headingLarge}>More Info DRC</h1>

      <div className="flex w-full justify-center">
        <div className={`${GlobalStyle.cardContainer} p-4`}>
        <div className="flex justify-end">
            <Link to={`/config/drc-edit-details/${drcId}`}>
              <button>
              
                <img src={edit_info} title="Edit" className="w-6 h-6" />
              </button>
            </Link>
          </div>
          <table className="mb-8 w-full">
            <tbody>
              <tr>
                <td>
                  <label className={`${GlobalStyle.headingMedium}`}>
                    Added Date
                  </label>
                </td>
                <td> : </td>
                <td>
                  <span>
                    {drcDetails.create_dtm
                      ? new Date(drcDetails.create_dtm).toLocaleDateString()
                      : "N/A"}
                  </span>
                </td>
              </tr>

              <tr>
                <td>
                  <label className={`${GlobalStyle.headingMedium}`}>
                    Contact Number
                  </label>
                </td>
                <td> : </td>
                <td>
                <label>{drcDetails?.teli_no || "N/A"}</label>
                </td>
              </tr>
            </tbody>
          </table>

            <div className="flex flex-col mb-5">
            <span className={GlobalStyle.headingMedium}>Service Types:</span>
              <div className={GlobalStyle.tableContainer}>
                <table className={`${GlobalStyle.table} table-auto`}>
                  <thead className={GlobalStyle.thead}>
                    <tr>
                      <th className={GlobalStyle.tableHeader}>Service Type</th>
                      <th className={GlobalStyle.tableHeader}>Change On</th>
                      <th className={GlobalStyle.tableHeader}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {services?.map((service, index) => (
                      <tr
                        key={service?.id}
                        className={`${
                          index % 2 === 0
                            ? "bg-white bg-opacity-75"
                            : "bg-gray-50 bg-opacity-50"
                        } border-b`}
                      >
                        <td className={GlobalStyle.tableData}>
                          {service?.service_type}
                        </td>
                        <td className={GlobalStyle.tableData}>1/1/2025</td>
                        <td
                          className={`${GlobalStyle.tableData} flex justify-center`}
                        >
                          <div className="flex items-center justify-center gap-2">
                            <img
                              src={
                                service?.drc_service_status === "Active"
                                  ? activeIcon
                                  : deactiveIcon
                              }
                              alt={service?.drc_service_status}
                              className="w-5 h-5"
                              title={
                                service?.drc_service_status === "Active"
                                  ? "Active"
                                  : "Deactive"
                              }
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
            <Link to="/config/drc-end">
            <button
              className={`${GlobalStyle.buttonPrimary}`}
              onClick={() => {
                setNegotiation("end");
              }}
            >
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
                    {paginatedLogHistory.map((row, index) => (
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

export default DrcInfo;