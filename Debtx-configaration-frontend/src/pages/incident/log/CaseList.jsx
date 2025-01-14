/*
Purpose: 
Created Date: 2024-12-3
Created By: Chamath Jayasanka - chamathjayasanka20@gmail.com
Last Modified Date: 2024-12-03
Modified By: Chamath Jayasanka - chamathjayasanka20@gmail.com
Version: node 11
ui number : 
Dependencies: tailwind css
Related Files: 
Notes: 

*/


import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const CaseList = () => {
  const navigate = useNavigate();

  const handleRowClick = (id, rowData) => {
    navigate(`/incident/log/case-details/${id}`, { state: { rowData } });
  };

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");

  const [rtomOptions, setRtomOptions] = useState([]);
  const [drcOptions, setDrcOptions] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);

  const [selectedRtom, setSelectedRtom] = useState("");
  const [selectedDrc, setSelectedDrc] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    // Fetch RTOM options
    fetch("<RTOM_ENDPOINT>")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch RTOM options");
        }
        return response.json();
      })
      .then((data) => {
        setRtomOptions(data);
      })
      .catch((error) => console.error("Error fetching RTOM options", error));

    // Fetch DRC options
    fetch("<DRC_ENDPOINT>")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch DRC options");
        }
        return response.json();
      })
      .then((data) => {
        setDrcOptions(data);
      })
      .catch((error) => console.error("Error fetching DRC options", error));

    // Fetch Status options
    fetch("<STATUS_ENDPOINT>")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch Status options");
        }
        return response.json();
      })
      .then((data) => {
        setStatusOptions(data);
      })
      .catch((error) => console.error("Error fetching Status options", error));
  }, []);

  const handleFromDateChange = (date) => {
    if (toDate && date > toDate) {
      setError("The 'From' date cannot be later than the 'To' date.");
    } else {
      setError("");
      setFromDate(date);
    }
  };

  const handleToDateChange = (date) => {
    if (fromDate && date < fromDate) {
      setError("The 'To' date cannot be earlier than the 'From' date.");
    } else {
      setError("");
      setToDate(date);
    }
  };

  const data = [
    {
      id: "RC001",
      status: "FTL",
      accountNo: "01115678",
      serviceType: "PEO TV",
      amount: "54,000",
      agent: "CMS",
      rtom: "AD",
      createdDate: "11/12/2024",
      lastPaidDate: "11/12/2024",
    },
    {
      id: "RC002",
      status: "Write Off",
      accountNo: "8765946",
      serviceType: "LTE",
      amount: "-",
      agent: "Prompt",
      rtom: "GM",
      createdDate: "23/4/2023",
      lastPaidDate: "23/4/2023",
    },
  ];

  const filteredData = data.filter((row) =>
    Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handleExport = () => {
    console.log("Exporting data...");
    // Implement export logic here (e.g., CSV download, etc.)
  };

  return (
    <div className="p-6 min-h-screen opacity-80 font-poppins">
      <div className="bg-white rounded-lg shadow p-6">
        {/* Title */}
        <h2 className="text-[40px] font-semibold mb-8">Case List</h2>

        {/* Filter Section */}
        <div className="p-6 rounded-lg">
          <div className="bg-blue-50 p-6 rounded-b-lg mb-8">
            <div className="flex flex-wrap gap-4 mb-4">


              <select className="w-64 px-4 py-2 border rounded-lg mb-4">
                <option value="" disabled selected >Select</option>
                <option value="">Account No</option>
                <option value="">Case ID</option>
              </select>



              <input
                type="text"
                id="accountNumber"
                placeholder="Enter Here"
                className="w-64 px-4 py-2 border rounded-lg mb-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              {/* RTOM Dropdown */}
              <select
                className="w-64 px-4 py-2 border rounded-lg mb-4"
                value={selectedRtom}
                onChange={(e) => setSelectedRtom(e.target.value)}
              >
                <option value="" disabled selected>RTOM</option>
                {rtomOptions.map((option, index) => (
                  <option key={index} value={option.rtom}>
                    {option.rtom}
                  </option>
                ))}
              </select>

              <select className="w-64 px-4 py-2 border rounded-lg mb-4">
                <option value="" disabled selected>Arrears Band</option>
                <option value="">5,000-10,000</option>
                <option value="">10,000-25,000</option>
                <option value="">25,000-50,000</option>
                <option value="">50,000-100,000</option>
                <option value="">100,000</option>

              </select>



              {/* DRC Dropdown */}
              <select
                className="w-64 px-4 py-2 border rounded-lg mb-4"
                value={selectedDrc}
                onChange={(e) => setSelectedDrc(e.target.value)}
              >
                <option value="" disabled selected>DRC</option>
                {drcOptions.map((option, index) => (
                  <option key={index} value={option.drc}>
                    {option.drc}
                  </option>
                ))}
              </select>

              {/* Status Dropdown */}

              {/*

              <select
                className="w-64 px-4 py-2 border rounded-lg mb-4"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="" disabled selected>Status</option>
                {statusOptions.map((option, index) => (
                  <option key={index} value={option.status}>
                    {option.status}
                  </option>
                ))}
              </select>

              */}
              <select className="w-64 px-4 py-2 border rounded-lg mb-4">
                <option value="" disabled selected >Status</option>
                <option value="">Status 1</option>
                <option value="">Status 2</option>
                <option value="">Status 3</option>
                <option value="">Status 4</option>
                <option value="">Status 5</option>
              </select>

              <select className="w-64 px-4 py-2 border rounded-lg mb-4">
                <option value="" disabled selected>Service Type</option>
                <option value="">Service Type 1</option>
                <option value="">Service Type 2</option>
              </select>

              {/* Date Range Pickers */}
              <div className="flex gap-4 items-center p-2 border border-gray-300 bg-opacity-50 rounded-lg w-fit">
                <label className="text-gray-600 font-medium">Date</label>
                <DatePicker
                  selected={fromDate}
                  onChange={handleFromDateChange}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="dd/MM/yyyy"
                  className="border rounded-lg w-40 h-10 px-4 text-sm text-gray-700"
                />
                <DatePicker
                  selected={toDate}
                  onChange={handleToDateChange}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="dd/MM/yyyy"
                  className="border rounded-lg w-40 h-10 px-4 text-sm text-gray-700"
                />
              </div>

            </div>

            {/* Filter Button */}
            <div className="flex justify-end mt-4">
              <button className="bg-[#002342] text-white px-8 py-2 rounded-lg shadow hover:bg-[#1a3b55]">
                Filter
              </button>
            </div>
            {error && <span className="text-red-500 mt-2">{error}</span>}
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-hidden rounded-lg shadow-md border border-[#0087FF] border-opacity-15 bg-[#77BFFF] bg-opacity-25">
          <table className="min-w-full text-sm text-left text-gray-500">
            <thead className="text-sm text-[#718EBF] uppercase bg-gray-50 bg-opacity-75">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Account No.</th>
                <th className="px-6 py-3">Service Type</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Agent</th>
                <th className="px-6 py-3">RTOM</th>
                <th className="px-6 py-3">Created Date</th>
                <th className="px-6 py-3">Last Paid Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } border-b hover:bg-blue-50 transition-all`}
                >
                  <td
                    className="px-6 py-4 text-blue-600 hover:underline cursor-pointer"
                    onClick={() => handleRowClick(row.id, row)}
                  >
                    {row.id}
                  </td>
                  <td className="px-6 py-4">{row.status}</td>
                  <td className="px-6 py-4">{row.accountNo}</td>
                  <td className="px-6 py-4">{row.serviceType}</td>
                  <td className="px-6 py-4">{row.amount}</td>
                  <td className="px-6 py-4">{row.agent}</td>
                  <td className="px-6 py-4">{row.rtom}</td>
                  <td className="px-6 py-4">{row.createdDate}</td>
                  <td className="px-6 py-4">{row.lastPaidDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        <div className="mt-6 flex justify-center items-center gap-6">
          <button
            className="flex items-center gap-2 px-2 py-2 text-[#00256A] border-2 border-[#00256A] rounded-full hover:bg-blue-100 transition-all"
          >
            <FaArrowLeft />
          </button>
          <div className="px-3 py-2 border-2 border-[#00256A] rounded-full text-[#00256A]">
            1
          </div>
          <button
            className="flex items-center gap-2 px-2 py-2 text-[#00256A] border-2 border-[#00256A] rounded-full hover:bg-blue-100 transition-all"
          >
            <FaArrowRight />
          </button>



        </div>

        <div className="flex justify-end mt-4">
          <button

            className="bg-[#002342] text-white px-8 py-2 rounded-lg shadow hover:bg-[#1a3b55]"
          >
            Export
          </button>
        </div>

      </div>
    </div>
  );

};

export default CaseList;
