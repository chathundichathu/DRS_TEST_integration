/* Purpose: This template is used for the 1.5 - Incident filter - Reject Incidents page.
Created Date: 2024-12-02
Created By: Chamithu (chamithujayathilaka2003@gmail.com)
Last Modified Date: 2024-12-02
Modified By: Chamithu (chamithujayathilaka2003@gmail.com)
Version: node 20
ui number : v1.0.1
Dependencies: tailwind css
Related Files: (routes)
Notes: */
import React, { useState } from 'react';
import { FaDownload, FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Importing icons
import { useNavigate } from 'react-router-dom'; // Importing useNavigate from react-router-dom for navigation
import DatePicker from 'react-datepicker';
import GlobalStyle from "../../../assets/prototype/GlobalStyle.jsx";
import 'react-datepicker/dist/react-datepicker.css';

const RejectIncidents = () => {
  const [source, setSource] = useState('');
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null); 
  const [error, setError] = useState("");
  const [selectedIncidents, setSelectedIncidents] = useState([]);
  const [incidentStatus, setIncidentStatus] = useState('Rejected'); // Default to "Rejected" status

  const incidents = [
    { id: 'RC001', accountNo: '0115678', reason: 'Credit Class = VIP', date: '01-Jan-2024', status: 'Rejected' },
    { id: 'RC002', accountNo: '8765946', reason: 'Customer Type = SLT', date: '15-Jan-2024', status: 'Rejected' },
    { id: 'RC003', accountNo: '3754918', reason: 'Customer Segment = 2467', date: '05-Feb-2024', status: 'Rejected' },
  ];

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleReject = (id) => {
    alert(`Reject clicked for ID: ${id}`);
  };

  const handleRejectAll = () => {
    alert('Reject All clicked');
  };

  const handleMoveForward = () => {
    alert('Move Forward clicked');
  };

  const handleCheckboxChange = (id) => {
    setSelectedIncidents((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter(item => item !== id)
        : [...prevSelected, id]
    );
  };

  const filteredIncidents = incidents.filter((incident) => {
    return incident.status === incidentStatus;
  });

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

  const handleDirectLOD = () => {
    navigate('/incident/log/directlod'); // Navigate to Direct LOD page
  };

  // New handler to navigate to incident details page
  const handleOpenIncidents = () => {
    navigate('/pages/incident/details'); // Navigate to incident details page
  };

  

  return (
    <div className="p-6 min-h-screen opacity-80 font-poppins">
        <h2 className={`${GlobalStyle.headingLarge} mb-5`}>Rejected Incident Details</h2>

        {/* Open Incidents and Reject Incidents Buttons */}
        <div className="flex mb-5">
          <button
            className="bg-blue-50 text-black px-8 py-3 rounded-tl-lg rounded-tr-lg shadow hover:bg-[#1a3b55] hover:text-white"
            onClick={handleOpenIncidents} // Trigger navigation to incident details page
          >
            Open Incidents
          </button>
          <button
            className="bg-blue-50 text-black font-bold px-8 py-3 rounded-tl-lg rounded-tr-lg shadow hover:bg-[#1a3b55] hover:text-white"
            onClick={() => setIncidentStatus('Rejected')}
          >
            Reject Incidents
          </button>

          <button
            className="bg-blue-50 text-black px-8 py-3 rounded-tl-lg rounded-tr-lg shadow hover:bg-[#1a3b55] hover:text-white"
            onClick={handleDirectLOD} // Trigger navigation to Direct LOD
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
             className={GlobalStyle.buttonPrimary}
              onClick={handleRejectAll}
            >
              Filter
            </button>
          </div>
        </div>

        <div className={GlobalStyle.tableContainer}>
        <table className={GlobalStyle.table}>
        <thead className={GlobalStyle.thead}>
            <tr>
              <th scope="col" className={GlobalStyle.tableHeader}>Select</th>
              <th scope="col" className={GlobalStyle.tableHeader}>ID</th>
              <th scope="col" className={GlobalStyle.tableHeader}>Account No.</th>
              <th scope="col" className={GlobalStyle.tableHeader}>Reason</th>
              <th scope="col" className={GlobalStyle.tableHeader}>Rejected On</th>
              <th scope="col" className={GlobalStyle.tableHeader}>Status</th>
              <th scope="col" className={GlobalStyle.tableHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredIncidents.map((incident, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? GlobalStyle.tableRowEven : GlobalStyle.tableRowOdd} border-b`}
              >
                <td className={GlobalStyle.tableData}>
                  <input
                    type="checkbox"
                    checked={selectedIncidents.includes(incident.id)}
                    onChange={() => handleCheckboxChange(incident.id)}
                    className="form-checkbox w-6 h-6"
                  />
                </td>
                <td className={`${GlobalStyle.tableData} text-blue-600 hover:underline cursor-pointer `} >{incident.id}</td>
                <td className={GlobalStyle.tableData}>{incident.accountNo}</td>
                <td className={GlobalStyle.tableData}>{incident.reason}</td>
                <td className={GlobalStyle.tableData}>{incident.date}</td>
                <td className={GlobalStyle.tableData}>{incident.status}</td>
                <td className={GlobalStyle.tableData}>
                  <button
                    className={GlobalStyle.buttonPrimary}
                    onClick={() => handleReject(incident.id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

        {/* Download, Reject All, Move Forward Buttons */}
        <div className="mt-8 flex justify-end items-center gap-6">
          <div className="flex items-center">
            <FaDownload size={30} className="text-blue-600 cursor-pointer" />
          </div>
          <button
            className={GlobalStyle.buttonPrimary}
            onClick={() => window.location.href = '/incident/log/rejectlog'}
          >
            Reject All
          </button>
          <button
            className={GlobalStyle.buttonPrimary}
            onClick={() => window.location.href = '/pages/incident/details'}
          >
            Move Forward
          </button>
        </div>
      </div>
  );
};

export default RejectIncidents;



