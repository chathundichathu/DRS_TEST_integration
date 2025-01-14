/*Purpose: This template is used for the 1.6 Sup - Incident Log page.
Created Date: 2024-12-02
Created By: Chamithu (chamithujayathilaka2003@gmail.com)
Last Modified Date: 2024-12-04
Modified Date: 2024-12-03
Modified By: Chamithu (chamithujayathilaka2003@gmail.com)
Version: node 20
ui number : v1.0.1
Dependencies: tailwind css
Related Files: (routes)
Notes:  */

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const IncidentLog = () => {
  const [source, setSource] = useState("");
  const [status, setStatus] = useState("");
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const incidents = [
    { id: "RC001", accountNo: "0115678", reason: "Credit Class = VIP", date: "01-Jan-2024", status: "Open" },
    { id: "RC001", accountNo: "8765946", reason: "Customer Type = SLT", date: "15-Jan-2024", status: "Reject" },
    { id: "RC001", accountNo: "3754918", reason: "Customer Segment = 2467", date: "05-Feb-2024", status: "Close" },
    { id: "RC002", accountNo: "1234567", reason: "Credit Class = Standard", date: "10-Feb-2024", status: "Open" },
    { id: "RC003", accountNo: "9876543", reason: "Customer Type = VIP", date: "12-Feb-2024", status: "Reject" },
    { id: "RC004", accountNo: "4567890", reason: "Customer Segment = 1234", date: "20-Feb-2024", status: "Close" },
  ];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = incidents.slice(indexOfFirstItem, indexOfLastItem);

  const filteredData = currentItems.filter((incident) =>
    Object.values(incident)
      .join(" ")
      .toLowerCase()
      .includes(source.toLowerCase() || status.toLowerCase())
  );

  const handleFilter = () => {
    alert("Filter button clicked");
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(incidents.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="p-4 font-poppins opacity-80">
      <h2 className="text-[40px] font-semibold mb-8">Incident Log</h2>

      {/* Filter Section */}
      <div className="flex flex-wrap items-center gap-6 mb-8">
        <div className="flex items-center gap-2">
          <label className="text-lg font-bold text-black">Source:</label>
          <select
            className="block w-32 h-10 rounded-md border border-black shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          >
            <option value="">Select</option>
            <option value="source1">Source 1</option>
            <option value="source2">Source 2</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-lg font-bold text-black">Status:</label>
          <select
            className="block w-32 h-10 rounded-md border border-black shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Open">Open</option>
            <option value="Reject">Reject</option>
            <option value="Close">Close</option>
          </select>
        </div>

        {/* Date Pickers */}
        <div className="flex gap-4 items-center p-2 rounded border border-gray-300 bg-blue-50 bg-opacity-50 w-fit">
          <label className="text-gray-600 font-medium">From:</label>
          <DatePicker
            selected={dateFrom}
            onChange={(date) => setDateFrom(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="dd/MM/yyyy"
            className="border rounded w-40 h-10 p-2 text-sm text-gray-700 bg-white bg-opacity-75"
          />
          <label className="text-gray-600 font-medium">To:</label>
          <DatePicker
            selected={dateTo}
            onChange={(date) => setDateTo(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="dd/MM/yyyy"
            className="border rounded w-40 h-10 p-2 text-sm text-gray-700 bg-white bg-opacity-75"
          />
        </div>

        {/* Filter Button */}
        <button
  className="px-5 py-1 text-[#00256A] border-2 border-[#00256A] rounded-full hover:bg-[#00256A] hover:text-white transition-all"
  onClick={handleFilter}
>
  Filter
</button>


      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg shadow-md border border-[#0087FF] border-opacity-15 bg-[#77BFFF] bg-opacity-25">
  <table className="min-w-full text-sm text-left text-gray-500">
    <thead className="text-xs text-[#718EBF] uppercase bg-gray-50 bg-opacity-75">
      <tr>
        <th className="px-6 py-3 text-center text-[18px] text-[#718EBF] uppercase bg-gray-50 bg-opacity-75">ID</th>
        <th className="px-6 py-3 text-center text-[18px] text-[#718EBF] uppercase bg-gray-50 bg-opacity-75">Account No.</th>
        <th className="px-6 py-3 text-center text-[18px] text-[#718EBF] uppercase bg-gray-50 bg-opacity-75">Filtered Reason</th>
        <th className="px-6 py-3 text-center text-[18px] text-[#718EBF] uppercase bg-gray-50 bg-opacity-75">Created On</th>
        <th className="px-6 py-3 text-center text-[18px] text-[#718EBF] uppercase bg-gray-50 bg-opacity-75">Status</th>
      </tr>
    </thead>
    <tbody>
      {filteredData.map((incident, index) => (
        <tr
          key={index}
          className={`${index % 2 === 0 ? "bg-white bg-opacity-75" : "bg-gray-50 bg-opacity-50"} border-b`}
        >
          <td className="px-6 py-4 text-center text-[16px]">{incident.id}</td>
          <td className="px-6 py-4 text-center text-[16px]">{incident.accountNo}</td>
          <td className="px-6 py-4 text-center text-[16px]">{incident.reason}</td>
          <td className="px-6 py-4 text-center text-[16px]">{incident.date}</td>
          <td className="px-6 py-4 text-center text-[16px]">{incident.status}</td>
        </tr>
      ))}
      {filteredData.length === 0 && (
        <tr>
          <td colSpan="5" className="text-center py-4 text-[16px]">No results found</td>
        </tr>
      )}
    </tbody>
  </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-6 p-4">
  {/* Previous Page Link */}
  <button
    className="flex items-center gap-2 px-2 py-2 text-[#00256A] border-2 border-[#00256A] rounded-full hover:bg-blue-100 transition-all"
    onClick={handlePreviousPage}
    disabled={currentPage === 1}
  >
    <FaArrowLeft />
  </button>
  
  {/* Current Page Display (Removed) */}
  {/* You can comment or delete this part if you don't want the current page to be shown */}
  
  {/* Next Page Link */}
  <button
    className="flex items-center gap-2 px-2 py-2 text-[#00256A] border-2 border-[#00256A] rounded-full hover:bg-blue-100 transition-all"
    onClick={handleNextPage}
    disabled={currentPage === Math.ceil(incidents.length / itemsPerPage)}
  >
    <FaArrowRight />
  </button>
</div>

    </div>
  );
};

export default IncidentLog;