import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GlobalStyle from "../../assets/prototype/GlobalStyle";
import { getActiveServiceDetails } from "../../services/serviceType/ServiceTypeService";
import { assignServiceToDrc } from "../../services/drc_service/DRC_Service";
import {getDrcDetailsWithServicesById} from "../../services/drc/DRCService";
import activeIcon from "../../assets/images/active.svg";
import deactiveIcon from "../../assets/images/deactive.svg";

const DrcEnd = () => {
  const { drcId } = useParams();
  const [services, setServices] = useState([]);
  const [drcDetails, setDrcDetails] = useState({});
  const [newServiceType, setNewServiceType] = useState("");
  const [activeServiceTypes, setActiveServiceTypes] = useState([]);
  const [negotiation, setNegotiation] = useState(""); 
  const [setError] = useState(""); 
  const [endDate, setEndDate] = useState(""); 
  const [remark, setRemark] = useState("");
  const todayDate = new Date().toISOString().split("T")[0];

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
    } catch {}
  };

  const handleSaveClick = () => {
    if ((!endDate || !remark)) {
      alert("Please provide the end date and remarks.");
      return;
    }
    alert("Form submitted successfully!");
    console.log("Data saved:", {
      endDate: negotiation ? endDate : null,
      remark,
    });
  };

  return (
    <div className={GlobalStyle.fontPoppins}>
      <h1 className={GlobalStyle.headingLarge}>End DRC</h1>

      <div className="flex w-full justify-center">
        <div className={`${GlobalStyle.cardContainer} p-4`}>
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
                <label>0712453645</label>
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
                              service?.service_status === "Active"
                                ? activeIcon
                                : deactiveIcon
                            }
                            alt={service?.service_status}
                            className="w-5 h-5"
                            title={
                              service?.service_status === "Active"
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

            {/* End Date */}
            <div className="flex gap-4 items-center mb-6 justify-center">
              <label className="block font-medium mb-2">End Date</label>
              <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className={GlobalStyle.inputText}
            min={todayDate} 
            max={todayDate} 
          />
            </div>
            {/* Remark */}
            <div className="flex mb-6 justify-center gap-4">
              <label className={GlobalStyle.remarkTopic}>Remark</label>
              <textarea
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                className={`${GlobalStyle.remark}`}
                rows="5"
              ></textarea>
            </div>

            {/* Save Button */}
            <div className="flex justify-end w-full mt-6">
              <button className={GlobalStyle.buttonPrimary} 
              onClick={handleSaveClick}>
                Save
              </button>
            </div>
    </div>
  )
}

export default DrcEnd