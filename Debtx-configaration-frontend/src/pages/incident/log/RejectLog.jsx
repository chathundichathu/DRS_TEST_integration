/*Purpose: This template is used for the 1.7 Sup - Reject Log page.
Created Date: 2024-12-02
Created By: Chamithu (chamithujayathilaka2003@gmail.com)
Last Modified Date: 2024-12-02
Modified By: Chamithu (chamithujayathilaka2003@gmail.com)
Version: node 20
ui number : v1.0.1
Dependencies: tailwind css
Related Files: (routes)
Notes:  */

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const RejectLog = () => {
  const [source, setSource] = useState("");
  const [status, setStatus] = useState("");
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const incidents = [
    { id: "RC001", accountNo: "0115678", reason: "Credit Class = VIP", date: "01-Jan-2024", status: "Open" },
    { id: "RC002", accountNo: "8765946", reason: "Customer Type = SLT", date: "15-Jan-2024", status: "Open" },
    { id: "RC003", accountNo: "3754918", reason: "Customer Segment = 2467", date: "05-Feb-2024", status: "Open" },
    { id: "RC004", accountNo: "5738192", reason: "Credit Class = Standard", date: "12-Feb-2024", status: "Closed" },
    { id: "RC005", accountNo: "4782931", reason: "Customer Type = SLT", date: "20-Feb-2024", status: "Rejected" },
    { id: "RC006", accountNo: "3827492", reason: "Customer Segment = 3421", date: "25-Feb-2024", status: "Open" },
    { id: "RC007", accountNo: "2948371", reason: "Credit Class = VIP", date: "28-Feb-2024", status: "Rejected" },
  ];

  const totalPages = Math.ceil(incidents.length / recordsPerPage);

  const handleFilter = () => {
    alert("Filter button clicked");
  };

  const filteredData = incidents; // Since search bar is removed, all data is shown

  const currentRecords = filteredData.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  return (
    <div className="p-4 font-poppins min-h-screen opacity-80">
      {/* Updated font size and font style */}
      <h1 className="text-[40px] font-poppins mb-8">Reject Incident Log</h1>

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
            <option value="Rejected">Rejected</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        {/* Date Picker Section */}
        <div className="flex gap-4 items-center">
          <label className="text-gray-600 font-medium">Date From:</label>
          <DatePicker
            selected={dateFrom}
            onChange={setDateFrom}
            dateFormat="dd/MM/yyyy"
            placeholderText="dd/MM/yyyy"
            className="border rounded w-40 h-10 p-2 text-sm text-gray-700 bg-white bg-opacity-75"
          />
          <label className="text-gray-600 font-medium">To:</label>
          <DatePicker
            selected={dateTo}
            onChange={setDateTo}
            dateFormat="dd/MM/yyyy"
            placeholderText="dd/MM/yyyy"
            className="border rounded w-40 h-10 p-2 text-sm text-gray-700 bg-white bg-opacity-75"
          />
        </div>

        {/* Filter Button */}
        <button
          className="bg-[#002342] text-white px-8 py-2 rounded-lg shadow hover:bg-[#001F2B]"
          onClick={handleFilter}
        >
          Filter
        </button>
      </div>

      {/* Table Section */}
      <div className="overflow-hidden rounded-lg shadow-md border border-[#0087FF] border-opacity-15 bg-[#77BFFF] bg-opacity-25">
        <table className="min-w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-[#718EBF] uppercase bg-gray-50 bg-opacity-75">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Account No.</th>
              <th className="px-6 py-3">Filtered Reason</th>
              <th className="px-6 py-3">Rejected on</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((incident, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0
                    ? "bg-white bg-opacity-75"
                    : "bg-gray-50 bg-opacity-50"
                } border-b`}
              >
                <td className="px-6 py-4 font-bold text-black">{incident.id}</td>
                <td className="px-6 py-4">{incident.accountNo}</td>
                <td className="px-6 py-4">{incident.reason}</td>
                <td className="px-6 py-4">{incident.date}</td>
                <td className="px-6 py-4">{incident.status}</td>
              </tr>
            ))}
            {currentRecords.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      <div className="flex justify-center items-center gap-6 p-4">
        {/* Previous Page Link */}
        <button
          className="flex items-center gap-2 px-2 py-2 text-[#00256A] border-2 border-[#00256A] rounded-full hover:bg-blue-100 transition-all"
          onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
        >
          <FaArrowLeft />
        </button>
        {/* Next Page Link */}
        <button
          className="flex items-center gap-2 px-2 py-2 text-[#00256A] border-2 border-[#00256A] rounded-full hover:bg-blue-100 transition-all"
          onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default RejectLog;
