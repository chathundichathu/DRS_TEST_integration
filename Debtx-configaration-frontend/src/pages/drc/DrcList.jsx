import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import GlobalStyle from "../../assets/prototype/GlobalStyle";
import { getDRCDetailsWithServices } from "../../services/drc/DRCService";
import more_info from "../../assets/images/more-info.svg";
import activeIcon from "../../assets/images/active.svg";
import deactiveIcon from "../../assets/images/deactive.svg";
import user_add from "../../assets/images/user-add.svg"


const DrcList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const rowsPerPage = 7;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDRCDetailsWithServices();
        const formattedData = response.data.mongoData.map((item) => ({
          drcId: item.drc_id || "N/A",
          drcName: item.drc_name || "N/A",
          contactNo: item.teli_no || "N/A",
          serviceCount: Array.isArray(item.services_of_drc)
            ? item.services_of_drc.length
            : 0,
          status: item.drc_status || "N/A",
        }));
        setData(formattedData);
        setFilteredData(formattedData);
        setLoading(false);
      } catch {
        setError("Failed to fetch DRC details. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilter = () => {
    let tempData = data;

    if (statusFilter) {
      tempData = tempData.filter(
        (item) => item.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    if (companyFilter) {
      tempData = tempData.filter(
        (item) =>
          item.drcName.toLowerCase().includes(companyFilter.toLowerCase())
      );
    }

    if (searchQuery) {
      tempData = tempData.filter((item) =>
        item.drcName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredData(tempData);
    setCurrentPage(0);
  };
 
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  
    let tempData = data;
  
  
    if (query) {
      tempData = tempData.filter((item) =>
        item.drcName.toLowerCase().includes(query)
      );
    }
  
    setFilteredData(tempData);
    setCurrentPage(0);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className={GlobalStyle.fontPoppins}>
      <div className={`${GlobalStyle.headingLarge} mb-8`}>
        <span>Debt Recovery Company List</span>
      </div>

      <div className="flex justify-end mb-5">
        <Link to="/config/regi-drc">
          <button>
            <img src={user_add} title="Add RO" className="w-8 h-8" />
          </button>
        </Link>
      </div>

      <div className="flex items-center gap-4 justify-end mb-5">
        <div>
          <select
            className={GlobalStyle.selectBox}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div>
          <select
            className={GlobalStyle.selectBox}
            value={companyFilter}
            onChange={(e) => setCompanyFilter(e.target.value)}
          >
            <option value="">Company</option>
            {data.map((item) => (
              <option key={item.drcId} value={item.drcName}>
                {item.drcName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <button className={GlobalStyle.buttonPrimary} onClick={handleFilter}>
            Filter
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="flex flex-col">
        
        <div className="mb-4 flex justify-start">
          <div className={GlobalStyle.searchBarContainer}>
            <input
              type="text"
              placeholder=""
              value={searchQuery}
              onChange={handleSearch}
              className={GlobalStyle.inputSearch}
            />
            <FaSearch className={GlobalStyle.searchBarIcon} />
          </div>
        </div>

        <div className={GlobalStyle.tableContainer}>
          <table className={GlobalStyle.table}>
            <thead className={GlobalStyle.thead}>
              <tr>
                <th className={GlobalStyle.tableHeader}>DRC ID</th>
                <th className={GlobalStyle.tableHeader}>Status</th>
                <th className={GlobalStyle.tableHeader}>DRC Name</th>
                <th className={GlobalStyle.tableHeader}>Contact No.</th>
                <th className={GlobalStyle.tableHeader}>Service Count</th>
                <th className={GlobalStyle.tableHeader}></th>
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
                  <td className={GlobalStyle.tableData}>{row.drcId}</td>    
                   <td className={GlobalStyle.tableData}>
                   <div className="flex items-center justify-center gap-2">
                       <img
                        src={
                          row.status === "Active" ? activeIcon : deactiveIcon
                        }
                        alt={row.status}
                        className="w-5 h-5"
                        title={row.status === "Active" ? "Active" : "Deactive"}
                      />
                    </div>
                  </td>
                  <td className={GlobalStyle.tableData}><Link to="/config/drc's-info">{row.drcName}</Link></td>
                  <td className={GlobalStyle.tableData}>{row.contactNo}</td>
                  <td className={GlobalStyle.tableData}>{row.serviceCount}</td>
                  <td className={GlobalStyle.tableData}>
                     <div className="flex gap-4 items-center">
                       <Link to={`/config/drc-info/${row.drcId}`}>
                       
                        <img
                          src={more_info}
                          title="More Info"
                          className="w-6 h-6"
                        />
                      </Link>
                    </div>
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

export default DrcList;
