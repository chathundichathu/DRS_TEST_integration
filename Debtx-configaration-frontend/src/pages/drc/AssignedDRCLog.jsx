// Purpose: This template is used for the Assigned DRC Log page (1.16).
// Created Date: 2024-12-02
// Created By: H.P.R Chandrasekara (hprchandrasekara@gmail.com)
// Last Modified Date: 2024-12-06
// Modified Date: 2024-12-03
// Modified By: H.P.R Chandrasekara (hprchandrasekara@gmail.com)
// Version: node 11
// ui number : 1.15
// Dependencies: tailwind css
// Related Files:  app.js (routes)
// Notes:.

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import GlobalStyle from "../../assets/prototype/GlobalStyle.jsx";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaSearch } from "react-icons/fa";

export default function AssignedDRCLog() {
  // Initial Data
  const initialData1 = [
    {
      drc: "TCM",
      range1: "67",
      range2: "34",
      range3: "65",
      range4: "578",
      range5: "100",
    },
    {
      drc: "CMS",
      range1: "67",
      range2: "56",
      range3: "245",
      range4: "789",
      range5: "12",
    },
    {
      drc: "ACCIV",
      range1: "67",
      range2: "56",
      range3: "245",
      range4: "789",
      range5: "12",
    },
    {
      drc: "VISIONCOM",
      range1: "67",
      range2: "56",
      range3: "245",
      range4: "789",
      range5: "12",
    },
    {
      drc: "PROMPT",
      range1: "67",
      range2: "56",
      range3: "245",
      range4: "789",
      range5: "12",
    },
    {
      drc: "RE",
      range1: "67",
      range2: "56",
      range3: "245",
      range4: "789",
      range5: "12",
    },
  ];

  const initialData2 = [
    {
      drc: "TCM",
      service: "Peo-TV",
      amount: "150",
      date: "2024-11-05",
      assignedBy: "ABCD",
      approvedBy: "ABCD",
    },
    {
      drc: "CMS",
      service: "Internet",
      amount: "200",
      date: "2024-11-10",
      assignedBy: "EFGH",
      approvedBy: "EFGH",
    },
    {
      drc: "ACCIV",
      service: "Mobile",
      amount: "100",
      date: "2024-11-20",
      assignedBy: "IJKL",
      approvedBy: "IJKL",
    },
    {
      drc: "CMS",
      service: "Internet",
      amount: "200",
      date: "2024-11-10",
      assignedBy: "EFGH",
      approvedBy: "EFGH",
    },
    {
      drc: "ACCIV",
      service: "Mobile",
      amount: "100",
      date: "2024-11-20",
      assignedBy: "IJKL",
      approvedBy: "IJKL",
    },
  ];

  // State Variables
  const [drcFilter, setDrcFilter] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredData1, setFilteredData1] = useState(initialData1);
  const [filteredData2, setFilteredData2] = useState(initialData2);
  const [searchQuery1, setSearchQuery1] = useState(""); // for searching
  const [searchQuery2, setSearchQuery2] = useState(""); // for searching
  const [currentPage1, setCurrentPage1] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);

  //search fuction 1
  const filteredSearchData1 = filteredData1.filter((row) =>
    Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery1.toLowerCase())
  );

  //search fuction 2
  const filteredSearchData2 = filteredData2.filter((row) =>
    Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery2.toLowerCase())
  );

  // Pagination state1
  const itemsPerPage1 = 4;
  const totalPages1 = Math.ceil(filteredSearchData1.length / itemsPerPage1);

  // Pagination state2
  const itemsPerPage2 = 4;
  const totalPages2 = Math.ceil(filteredSearchData2.length / itemsPerPage2);

  // Handle Filtering Logic
  const applyFilters = () => {
    // Filter data1 based on DRC filter
    const filtered1 = initialData1.filter((item) =>
      drcFilter
        ? item.drc.toLowerCase().includes(drcFilter.toLowerCase())
        : true
    );

    // Filter data2 based on DRC and date range filters
    const filtered2 = initialData2.filter((item) => {
      const itemDate = new Date(item.date);
      const isDrcMatch = drcFilter
        ? item.drc.toLowerCase().includes(drcFilter.toLowerCase())
        : true;
      const isDateInRange =
        (!startDate || itemDate >= startDate) &&
        (!endDate || itemDate <= endDate);

      return isDrcMatch && isDateInRange;
    });

    setFilteredData1(filtered1);
    setFilteredData2(filtered2);
  };

  // Pagination handler
  const handlePrevNext1 = (direction) => {
    if (direction === "prev" && currentPage1 > 1) {
      setCurrentPage1(currentPage1 - 1);
    }
    if (direction === "next" && currentPage1 < totalPages1) {
      setCurrentPage1(currentPage1 + 1);
    }
  };

  const startIndex1 = (currentPage1 - 1) * itemsPerPage1;
  const endIndex1 = startIndex1 + itemsPerPage1;
  const paginatedData1 = filteredSearchData1.slice(startIndex1, endIndex1);

  // Pagination handler2
  const handlePrevNext2 = (direction) => {
    if (direction === "prev" && currentPage2 > 1) {
      setCurrentPage2(currentPage2 - 1);
    }
    if (direction === "next" && currentPage2 < totalPages2) {
      setCurrentPage2(currentPage2 + 1);
    }
  };

  const startIndex2 = (currentPage2 - 1) * itemsPerPage2;
  const endIndex2 = startIndex2 + itemsPerPage2;
  const paginatedData2 = filteredSearchData2.slice(startIndex2, endIndex2);

  return (
    <div className={`p-4 ${GlobalStyle.fontPoppins}`}>
      <h1 className={`${GlobalStyle.headingLarge}`}>Assigned DRC Log</h1>

      {/* Filter Section */}
      <div className="flex justify-end gap-10 my-8">
        <div className="flex gap-4 h-[35px] mt-2">
          <h1>DRC</h1>
          <select
            className={GlobalStyle.selectBox}
            value={drcFilter}
            onChange={(e) => setDrcFilter(e.target.value)}
          >
            <option value="" selected>
              ALL
            </option>
            <option value="CMS">CMS</option>
            <option value="TCM">TCM</option>
            <option value="RE">RE</option>
            <option value="CO LAN">CO LAN</option>
            <option value="ACCIVA">ACCIVA</option>
            <option value="VISONCOM">VISONCOM</option>
            <option value="PROMPT">PROMPT</option>
          </select>
        </div>

        <div className="flex flex-col items-center mb-4">
          <div className={GlobalStyle.datePickerContainer}>
            <label className={GlobalStyle.dataPickerDate}>Date </label>

            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="dd/mm/yyyy"
              className={GlobalStyle.inputText}
            />

            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="dd/mm/yyyy"
              className={GlobalStyle.inputText}
            />
          </div>
        </div>

        <button
          onClick={applyFilters}
          className={`${GlobalStyle.buttonPrimary} h-[35px] mt-2`}
        >
          Filter
        </button>
      </div>

      {/* Table for Data1 */}
      <div className="flex flex-col">
        <div className="flex justify-start mb-4">
          <div className={GlobalStyle.searchBarContainer}>
            <input
              type="text"
              placeholder=""
              value={searchQuery1}
              onChange={(e) => setSearchQuery1(e.target.value)}
              className={GlobalStyle.inputSearch}
            />
            <FaSearch className={GlobalStyle.searchBarIcon} />
          </div>
        </div>

        <div className={`${GlobalStyle.tableContainer}  `}>
          <table className={GlobalStyle.table}>
            <thead className={`${GlobalStyle.thead}`}>
              <tr className="border border-[#0087FF] border-opacity-15">
                <th
                  rowSpan="2"
                  scope="col"
                  className={`${GlobalStyle.tableHeader}`}
                >
                  DRC
                </th>
                <th
                  colSpan="5"
                  scope="col"
                  className={`${GlobalStyle.tableHeader}`}
                >
                  Case Amount (LKR)
                </th>
              </tr>
              <tr className="border border-[#0087FF] border-opacity-15">
                <th className={GlobalStyle.tableHeader}>5,000 - 10,000</th>
                <th className={GlobalStyle.tableHeader}>10,000 - 25,000</th>
                <th className={GlobalStyle.tableHeader}>25,000 - 50,000</th>
                <th className={GlobalStyle.tableHeader}>50,000 - 100,000</th>
                <th className={GlobalStyle.tableHeader}>100,000+</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData1.map((item, index) => (
                <tr
                  key={index}
                  className={
                    index % 2 === 0
                      ? GlobalStyle.tableRowEven
                      : GlobalStyle.tableRowOdd
                  }
                >
                  <td className={GlobalStyle.tableData}>
                    <Link to={`/drc/case-list`} className={GlobalStyle.link}>
                      {item.drc}
                    </Link>
                  </td>
                  <td className={GlobalStyle.tableData}>{item.range1}</td>
                  <td className={GlobalStyle.tableData}>{item.range2}</td>
                  <td className={GlobalStyle.tableData}>{item.range3}</td>
                  <td className={GlobalStyle.tableData}>{item.range4}</td>
                  <td className={GlobalStyle.tableData}>{item.range5}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className={`${GlobalStyle.navButtonContainer} mb-14`}>
        <button
          onClick={() => handlePrevNext1("prev")}
          disabled={currentPage1 === 1}
          className={`${GlobalStyle.navButton} ${
            currentPage1 === 1 ? "cursor-not-allowed" : ""
          }`}
        >
          <FaArrowLeft />
        </button>
        <span>
          Page {currentPage1} of {totalPages1}
        </span>
        <button
          onClick={() => handlePrevNext1("next")}
          disabled={currentPage1 === totalPages1}
          className={`${GlobalStyle.navButton} ${
            currentPage1 === totalPages1 ? "cursor-not-allowed" : ""
          }`}
        >
          <FaArrowRight />
        </button>
      </div>

      {/* Table for Data2 */}
      <div className="flex flex-col">
        <div className="flex justify-start mb-4">
          <div className={GlobalStyle.searchBarContainer}>
            <input
              type="text"
              placeholder=""
              value={searchQuery2}
              onChange={(e) => setSearchQuery2(e.target.value)}
              className={GlobalStyle.inputSearch}
            />
            <FaSearch className={GlobalStyle.searchBarIcon} />
          </div>
        </div>
        <div className={`${GlobalStyle.tableContainer}  `}>
          <table className={GlobalStyle.table}>
            <thead className={`${GlobalStyle.thead}`}>
              <tr className="border border-[#0087FF] border-opacity-15">
                <th
                  rowSpan="2"
                  scope="col"
                  className={`${GlobalStyle.tableHeader}`}
                >
                  DRC
                </th>
                <th className={GlobalStyle.tableHeader}>Service</th>
                <th className={GlobalStyle.tableHeader}>Amount </th>
                <th className={GlobalStyle.tableHeader}>Date</th>
                <th className={GlobalStyle.tableHeader}>Assigned By</th>
                <th className={GlobalStyle.tableHeader}>Approved By</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData2.map((item, index) => (
                <tr
                  key={index}
                  className={
                    index % 2 === 0
                      ? GlobalStyle.tableRowEven
                      : GlobalStyle.tableRowOdd
                  }
                >
                  <td className={GlobalStyle.tableData}>{item.drc}</td>
                  <td className={GlobalStyle.tableData}>{item.service}</td>
                  <td className={GlobalStyle.tableData}>{item.amount}</td>
                  <td className={GlobalStyle.tableData}>{item.date}</td>
                  <td className={GlobalStyle.tableData}>{item.assignedBy}</td>
                  <td className={GlobalStyle.tableData}>{item.approvedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`${GlobalStyle.navButtonContainer} mb-14`}>
        <button
          onClick={() => handlePrevNext2("prev")}
          disabled={currentPage2 === 1}
          className={`${GlobalStyle.navButton} ${
            currentPage2 === 1 ? "cursor-not-allowed" : ""
          }`}
        >
          <FaArrowLeft />
        </button>
        <span>
          Page {currentPage2} of {totalPages2}
        </span>
        <button
          onClick={() => handlePrevNext2("next")}
          disabled={currentPage2 === totalPages2}
          className={`${GlobalStyle.navButton} ${
            currentPage2 === totalPages2 ? "cursor-not-allowed" : ""
          }`}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}
