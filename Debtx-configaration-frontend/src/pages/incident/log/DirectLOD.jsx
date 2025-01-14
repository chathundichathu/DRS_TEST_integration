/*Purpose: This template is used for the 1.5.2  page.
Created Date: 2024-12-04
Created By: Chamithu (chamithujayathilaka2003@gmail.com)
Last Modified Date: 2024-12-05
Modified Date: 2024-12-0
Modified By: Chamithu (chamithujayathilaka2003@gmail.com)
Version: node 20
ui number : v1.0.1
Dependencies: tailwind css
Related Files: (routes)
Notes:  */

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import for navigation
import { FaDownload, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import GlobalStyle from "../../../assets/prototype/GlobalStyle.jsx";

const IncidentDetails = () => {
  const [source, setSource] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null); 
  const [error, setError] = useState("");
  const [selectedIncidents, setSelectedIncidents] = useState([]);
  const [incidentStatus, setIncidentStatus] = useState("Direct LD");
  const [currentPage, setCurrentPage] = useState(1);
  const incidentsPerPage = 2;
  const navigate = useNavigate(); // For navigation

  const incidents = [
    { id: "RC001", accountNo: "0115678", reason: "Credit Class = VIP", amount: "500", status: "Direct LD" },
    { id: "RC002", accountNo: "8765946", reason: "Customer Type = SLT", amount: "590", status: "Direct LD" },
    { id: "RC003", accountNo: "3754918", reason: "Customer Segment = 2467", amount: "900", status: "Direct LD" },
    { id: "RC004", accountNo: "2415678", reason: "Segment = Premium", amount: "750", status: "Direct LD" },
  ];

  const filteredIncidents = incidents.filter(
    (incident) => incident.status === incidentStatus
  );

  const totalPages = Math.ceil(filteredIncidents.length / incidentsPerPage);

  const handleReject = (id) => {
    alert(`Reject clicked for ID: ${id}`);
  };

  const handleRejectAll = () => {
    alert("Reject All clicked");
  };

  const handleMoveForward = () => {
    alert("Move Forward clicked");
  };

  const handleCheckboxChange = (id) => {
    setSelectedIncidents((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIncidents.length === filteredIncidents.length) {
      setSelectedIncidents([]);
    } else {
      setSelectedIncidents(filteredIncidents.map((incident) => incident.id));
    }
  };

  const handlePrevNext = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (direction === "next" && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const currentData = filteredIncidents.slice(
    (currentPage - 1) * incidentsPerPage,
    currentPage * incidentsPerPage
  );

 // validation for date
 const handleFromDateChange = (date) => {
  if (toDate && date > toDate) {
    setError("The 'From' date cannot be later than the 'To' date.");
  } else {
    setError("");
    setFromDate(date);
  }
};

// validation for date
const handleToDateChange = (date) => {
  if (fromDate && date < fromDate) {
    setError("The 'To' date cannot be earlier than the 'From' date.");
  } else {
    setError("");
    setToDate(date);
  }
};

  // New export function
  const handleExport = () => {
    alert("Export functionality not implemented yet");
  };

  // Handle Proceed All functionality
  const handleProceedAll = () => {
    alert("Proceed All clicked for selected incidents");
  };

  return (
    <div className={`${GlobalStyle.fontPoppins} p-6 min-h-screen opacity-80`}>
      <div>
        <div className="flex justify-between items-center mb-8">
          <h1 className={GlobalStyle.headingLarge}>
            Incident Details
          </h1>
          {/* Export Button */}
          <button
            onClick={handleExport}
            className={GlobalStyle.buttonPrimary}
          >
            Export
          </button>
        </div>

        {/* Open Incidents, Reject Incidents, and Direct LOD Buttons */}
        <div className="flex mb-5 gap-0">
          <button
            className="bg-blue-50 text-black px-8 py-3 rounded-tl-lg shadow hover:bg-[#1a3b55] hover:text-white"
            onClick={() => navigate("/pages/incident/details")} // Updated to navigate to /pages/incident/details
          >
            Open Incidents
          </button>
          <button
            className="bg-blue-50 text-black px-8 py-3 shadow hover:bg-[#1a3b55] hover:text-white"
            onClick={() => navigate("/incident/log/rejectincidents")}
          >
            Reject Incidents
          </button>
          <button
            className="bg-blue-50 text-black font-bold px-8 py-3 rounded-tr-lg shadow hover:bg-[#1a3b55] hover:text-white"
            onClick={() => alert("Direct LOD clicked")}
          >
            Direct LOD
          </button>
        </div>

        {/* Filter Section */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-6 mb-0">
            <div className="flex items-center gap-2">
              <label className="text-lg font-bold text-black">Source:</label>
              <select
                className={GlobalStyle.selectBox}
                value={source}
                onChange={(e) => setSource(e.target.value)}
              >
                <option value="">Select</option>
                <option value="source1">Source 1</option>
                <option value="source2">Source 2</option>
              </select>
            </div>

            <div className="flex flex-col mb-4">
        <div className={GlobalStyle.datePickerContainer}>
          <label className={GlobalStyle.dataPickerDate}>Date </label>
          <DatePicker
            selected={fromDate}
            onChange={handleFromDateChange}
            dateFormat="dd/MM/yyyy"
            placeholderText="dd/MM/yyyy"
            className={GlobalStyle.inputText}
          />
          <DatePicker
            selected={toDate}
            onChange={handleToDateChange}
            dateFormat="dd/MM/yyyy"
            placeholderText="dd/MM/yyyy"
            className={GlobalStyle.inputText}
          />
        </div>
        {error && <span className={GlobalStyle.errorText}>{error}</span>}
      </div>
              

            <button
             className="px-5 py-1 text-[#00256A] border-2 border-[#00256A] rounded-full hover:bg-[#00256A] hover:text-white transition-all"
              onClick={handleRejectAll}
            >
              Filter
            </button>
          </div>
        </div>

        {/* Table */}

       <div className={GlobalStyle.tableContainer}>
        <table className={GlobalStyle.table}>
          <thead className={GlobalStyle.thead}>
            <tr>
              <th className={GlobalStyle.tableHeader}>
                <input
                  type="checkbox"
                  checked={selectedIncidents.length === filteredIncidents.length}
                  onChange={handleSelectAll}
                  className="form-checkbox w-6 h-6"
                />
              </th>
              <th scope="col" className={GlobalStyle.tableHeader}>ID</th>
              <th scope="col" className={GlobalStyle.tableHeader}>Account No.</th>
              <th scope="col" className={GlobalStyle.tableHeader}>Reason</th>
              <th scope="col" className={GlobalStyle.tableHeader}>Amount</th>
              <th scope="col" className={GlobalStyle.tableHeader}>Status</th>
              <th scope="col" className={GlobalStyle.tableHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((incident, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } ${GlobalStyle.tableRowEven}`}
              >
                <td className={GlobalStyle.tableData}>
                  <input
                    type="checkbox"
                    checked={selectedIncidents.includes(incident.id)}
                    onChange={() => handleCheckboxChange(incident.id)}
                    className="form-checkbox w-6 h-6"
                  />
                </td>
                <td className={GlobalStyle.tableData}>
                  {incident.id}
                </td>
                <td className={GlobalStyle.tableData}>{incident.accountNo}</td>
                <td className={GlobalStyle.tableData}>{incident.reason}</td>
                <td className={GlobalStyle.tableData}>{incident.amount}</td>
                <td className={GlobalStyle.tableData}>{incident.status}</td>
                <td className={GlobalStyle.tableData}>
                  <button
                    className={GlobalStyle.buttonPrimary}
                    onClick={() => handleReject(incident.id)}
                  >
                    Proceed
                   </button>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

        {/* Pagination */}
        <div className={GlobalStyle.navButtonContainer}>
  <button
    onClick={() => handlePrevNext("prev")}
    className={GlobalStyle.navButton}
    disabled={currentPage === 1}
  >
    <FaArrowLeft />
  </button>
  <span className="text-lg font-semibold">{}</span>
  <button
    onClick={() => handlePrevNext("next")}
    className={GlobalStyle.navButton}
    disabled={currentPage === totalPages}
  >
    <FaArrowRight />
  </button>
</div>

        {/* Proceed All Button */}
        <div className="mt-6 flex justify-end">
          <button
            className={GlobalStyle.buttonPrimary}
            onClick={() => window.location.href = '/drc/F2'}
          >
            Proceed All
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncidentDetails;
