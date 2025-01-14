import { useState, useEffect } from "react";
import { FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { getAllServices, changeServiceStatus } from "../../services/serviceType/ServiceTypeService";
import { RegisterServiceType } from "../../services/service_type/servicetype";
import GlobalStyle from "../../assets/prototype/GlobalStyle";
import activeIcon from "../../assets/images/active.svg";
import deactiveIcon from "../../assets/images/deactive.svg";
import save from "../../assets/images/save.svg";
import edit_info from "../../assets/images/edit-info.svg";

const ServiceTypesList = () => {
  const [serviceType, setServiceType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);
  const rowsPerPage = 7;
  const [appliedFilters, setAppliedFilters] = useState({ status: "" });

  useEffect(() => {
    const getServiceDetails = async () => {
      try {
        const response = await getAllServices();
        const formattedData = response?.data?.mongo?.map((row) => ({
          serviceId: row.service_id || "N/A",
          serviceType: row.service_type || "N/A",
          status: row.service_status || "N/A",
          isEditing: false,
          editedStatus: row.service_status,
        }));
        setData(formattedData);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      }
    };
    getServiceDetails();
  }, []);

  const handleAddServiceType = async (e) => {
    // e.preventDefault();
    if (!serviceType) {
      console.log("Please enter a service type.");
      return;
    }

    try {
      const result = await RegisterServiceType(serviceType);
      console.log("Service Type Registered: ", result);
      setServiceType("");
    } catch (error) {
      console.error("Error during registration: ", error.message);
    }
  };

  const handleFilter = () => {
    setAppliedFilters({ status });
    setCurrentPage(0);
  };

  const filteredData = data.filter((row) => {
    const matchesSearchQuery = Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      !appliedFilters.status || row.status === appliedFilters.status;

    return matchesSearchQuery && matchesStatus;
  });

  const pages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = currentPage * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

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

  const handleEdit = (serviceId) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.serviceId === serviceId ? { ...row, isEditing: true } : row
      )
    );
  };

  const handleStatusChange = (serviceId, newStatus) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.serviceId === serviceId ? { ...row, editedStatus: newStatus } : row
      )
    );
  };

  const handleSave = async(row) => {
    // setData((prevData) =>
    //   prevData.map((row) =>
    //     row.serviceId === serviceId
    //       ? { ...row, status: row.editedStatus, isEditing: false }
    //       : row
    //   )
    // );
    try{
        const serviceId = row.serviceId;
        const serviceStatus = row.editedStatus;
        const result  =  await changeServiceStatus(serviceId, serviceStatus)
        console.log("Service status successfully updated", result)
        window.location.reload()
    }catch(error){
        console.log("Error updating service status" , error)
    }
  };

  return (
    <div className={GlobalStyle.fontPoppins}>
      <h1 className={GlobalStyle.headingLarge}>Service Types List</h1>
      <div className="flex justify-end gap-4 items-center mb-8">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={GlobalStyle.selectBox}
        >
          <option value="">Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <button
          onClick={handleFilter}
          className={`${GlobalStyle.buttonPrimary} flex items-center gap-2`}
        >
          Filter
        </button>
      </div>

      <div className="flex flex-col">
        <div className="mb-4 flex justify-start">
          <div className={GlobalStyle.searchBarContainer}>
            <input
              type="text"
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
                <th className={GlobalStyle.tableHeader}>Service ID</th>
                <th className={GlobalStyle.tableHeader}>Status</th>
                <th className={GlobalStyle.tableHeader}>Service Type</th>
                <th className={GlobalStyle.tableHeader}></th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row) => (
                <tr
                  key={row.serviceId}
                  className={`${
                    data.indexOf(row) % 2 === 0
                      ? "bg-white bg-opacity-75"
                      : "bg-gray-50 bg-opacity-50"
                  } border-b`}
                >
                  <td className={GlobalStyle.tableData}>
                    <a href={`#${row.serviceId}`} className="hover:underline">
                      {row.serviceId}
                    </a>
                  </td>
                  <td className={GlobalStyle.tableData}>
                    {row.isEditing ? (
                      <select
                        value={row.editedStatus}
                        onChange={(e) =>
                          handleStatusChange(row.serviceId, e.target.value)
                        }
                        className={`${GlobalStyle.selectBox} w-20 h-7 text-[12px] text-center`}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    ) : (
                      <span>
                        {row.status === "Active" ? (
                          <img
                            src={activeIcon}
                            title="Active"
                            className="h-6 w-6 inline-block"
                          />
                        ) : (
                          <img
                            src={deactiveIcon}
                            title="Inactive"
                            className="h-6 w-6 inline-block"
                          />
                        )}
                      </span>
                    )}
                  </td>

                  <td className={GlobalStyle.tableData}>{row.serviceType}</td>
                  <td className={GlobalStyle.tableData}>
                    {row.isEditing ? (
                      <button onClick={() => handleSave(row)}>
                        <img src={save} alt="Save" className="w-6 h-6" />
                      </button>
                    ) : (
                      <button onClick={() => handleEdit(row.serviceId)}>
                        <img src={edit_info} alt="Edit" className="w-6 h-6" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {paginatedData.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-4">
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

      <form onSubmit={handleAddServiceType}>
        <div className="mt-8 flex justify-center">
          <div className="flex items-center gap-4">
            <h2>Service type</h2>
            <input
              type="text"
              name="service_type"
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className={GlobalStyle.inputText}
            />
            <button className={GlobalStyle.buttonPrimary} type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ServiceTypesList;