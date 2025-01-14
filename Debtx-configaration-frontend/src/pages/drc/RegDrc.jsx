import { useState, useEffect } from "react";
import { registerDRCWithServices } from "../../services/drc_service/DRC_Service";
import { getActiveServiceDetails } from "../../services/serviceType/ServiceTypeService";
import GlobalStyle from "../../assets/prototype/GlobalStyle";
import remove from "../../assets/images/remove.svg";
import add from "../../assets/images/add.svg";
// import Swal from "sweetalert2";

const RegDrc = () => {
  const [drcName, setDrcName] = useState("");
  const [businessRegistration, setBusinessRegistration] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [activeServices, setActiveServices] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const services = await getActiveServiceDetails();
        setActiveServices(services);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load services. Please try again.",
          confirmButtonColor: "#d33",
        });
      }
    };

    fetchServices();
  }, []);

  const addServiceType = () => {
    if (!selectedService.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "Please select a service type to add.",
        confirmButtonColor: "#f1c40f",
      });
      return;
    }

    if (tableData.some((item) => item.serviceType === selectedService)) {
      Swal.fire({
        icon: "info",
        title: "Info",
        text: "Service already added.",
        confirmButtonColor: "#3498db",
      });
      return;
    }

    const service = activeServices.find(
      (service) => service.service_type === selectedService
    );

    if (!service) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Invalid service selected.",
        confirmButtonColor: "#d33",
      });
      return;
    }

    setTableData((prev) => [
      ...prev,
      { serviceType: service.service_type, serviceId: service.service_id },
    ]);
    setSelectedService("");
  };

  const handleRemove = (index) => {
    setTableData((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!drcName || !businessRegistration || !contactNumber) {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "Please fill in all required fields.",
        confirmButtonColor: "#f1c40f",
      });
      return;
    }

    if (tableData.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "Please add at least one service.",
        confirmButtonColor: "#f1c40f",
      });
      return;
    }

    const drcData = {
      DRC_Name: drcName,
      DRC_Business_Registration_Number: businessRegistration,
      Contact_Number: contactNumber,
      Services: tableData.map((item) => item.serviceId),
    };

    try {
      await registerDRCWithServices(drcData);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Company registered successfully with selected services!",
        confirmButtonColor: "#28a745",
      });

      // Clear the form
      setDrcName("");
      setBusinessRegistration("");
      setContactNumber("");
      setTableData([]);
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        "Failed to register the company. Please try again.";
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMsg,
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className={GlobalStyle.fontPoppins}>
      <div className={`${GlobalStyle.headingLarge} mb-8`}>
        <span>Register Debt Recovery Company</span>
      </div>
      <div className="flex justify-center">
        <div className={`${GlobalStyle.cardContainer} p-4`}>
          <table className="mb-8 w-full">
            <tbody>
              <tr>
                <td>
                  <label className={`${GlobalStyle.headingMedium}`}>DRC Name</label>
                </td>
                <td> : </td>
                <td>
                  <input
                    type="text"
                    className={`${GlobalStyle.inputText}`}
                    value={drcName}
                    onChange={(e) => setDrcName(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label className={`${GlobalStyle.headingMedium}`}>
                    Business Registration
                  </label>
                </td>
                <td> : </td>
                <td>
                  <input
                    type="text"
                    className={`${GlobalStyle.inputText}`}
                    value={businessRegistration}
                    onChange={(e) => setBusinessRegistration(e.target.value)}
                  />
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
                  <input
                    type="text"
                    className={`${GlobalStyle.inputText}`}
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label className={`${GlobalStyle.headingMedium}`}>
                    Service Types
                  </label>
                </td>
                <td> : </td>
                <td>
                  <select
                    className={`${GlobalStyle.selectBox}`}
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                  >
                    <option value="">Select a service</option>
                    {activeServices.map((service) => (
                      <option key={service.service_id} value={service.service_type}>
                        {service.service_type}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <button
                    className={GlobalStyle.tableData}
                    onClick={addServiceType}
                  >
                    <img src={add} title="Add" className="w-6 h-6" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <div className={`${GlobalStyle.tableContainer} mb-5`}>
            <table className={`${GlobalStyle.table} w-full`}>
              <thead className={GlobalStyle.thead}>
                <tr>
                  <th className={`${GlobalStyle.tableHeader} text-left`}>
                    Service Type
                  </th>
                  <th className={`${GlobalStyle.tableHeader}`}></th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((item, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0
                        ? "bg-white bg-opacity-75"
                        : "bg-gray-50 bg-opacity-50"
                    } border-b`}
                  >
                    <td className={`${GlobalStyle.tableData} p-3`}>
                      {item.serviceType}
                    </td>
                    <td className={`${GlobalStyle.tableData} flex justify-center`}>
                      <button onClick={() => handleRemove(index)}>
                        <img src={remove} title="Remove" className="w-6 h-6" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end">
            <button
              className={`${GlobalStyle.buttonPrimary}`}
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>

          {error && <div className="text-red-500 mt-4">{error}</div>}
          {success && <div className="text-green-500 mt-4">{success}</div>}
        </div>
      </div>
    </div>
  );
};

export default RegDrc;
