// Purpose: This template is used for the FLT LOD Log.
// Created Date: 2024-12-02
// Created By: Shyamal (warnakulaisuru@gmail.com)
// Last Modified Date: 2024-12-03
// Modified By: Shyamal (warnakulaisuru@gmail.com)
// Last Modified Date: 2024-12-11
// Modified By: Shyamal (warnakulaisuru@gmail.com)
// Version: node 20.11.1
// ui number : v3.1.1
// Dependencies: tailwind css
// Related Files: register.jsx (router)
// Notes: This template uses a tailwind css form for the registration fields.

import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import GlobalStyle from "../../../../assets/prototype/GlobalStyle";

const FltLodLog = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const data = [
    {
      caseId: "C002",
      accountNo: "11111111",
      amount: "4500",
      createdDate: "mm/dd/yyyy",
      failedReason: "Reason",
      failedDate: "mm/dd/yyyy",
      handledDrc: "Yes",
    },
    {
      caseId: "C022",
      accountNo: "22222222",
      amount: "2300",
      createdDate: "mm/dd/yyyy",
      failedReason: "Reason",
      failedDate: "mm/dd/yyyy",
      handledDrc: "No",
    },
    {
      caseId: "C067",
      accountNo: "55555555",
      amount: "7000",
      createdDate: "mm/dd/yyyy",
      failedReason: "Reason",
      failedDate: "mm/dd/yyyy",
      handledDrc: "Yes",
    },
  ];

  const filteredData = data.filter((row) =>
    Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`${GlobalStyle.fontPoppins}container mx-auto p-6`}>
      {/* Title */}
      <h1 className={`${GlobalStyle.headingLarge} mb-5`}>FTL LOD Log</h1>

      {/* case count Bar */}
      <div className={`${GlobalStyle.caseCountBar} mb-8`}>
        <div className="flex">
          <span className={GlobalStyle.countBarTopic}>Case count</span>
        </div>
        <div className={GlobalStyle.countBarSubTopicContainer}>
          <div className={GlobalStyle.countBarMainBox}>
            <span>Total:</span>
            <p className={GlobalStyle.countBarMainTopic}>1259</p>
          </div>
          <div className={GlobalStyle.countBarSubBox}>
            <span>5,000 - 10,000</span>
            <p className={GlobalStyle.countBarSubTopic}>100</p>
          </div>
          <div className={GlobalStyle.countBarSubBox}>
            <span>10,000 - 25,000</span>
            <p className={GlobalStyle.countBarSubTopic}>250</p>
          </div>
          <div className={GlobalStyle.countBarSubBox}>
            <span>25,000 - 50,000</span>
            <p className={GlobalStyle.countBarSubTopic}>800</p>
          </div>
          <div className={GlobalStyle.countBarSubBox}>
            <span>50,000 - 100,000</span>
            <p className={GlobalStyle.countBarSubTopic}>61</p>
          </div>
          <div className={GlobalStyle.countBarSubBox}>
            <span>&gt; 100,000</span>
            <p className={GlobalStyle.countBarSubTopic}>98</p>
          </div>
        </div>
      </div>

      {/* Search Bar Section */}
      <div className="mb-4 flex justify-start">
        <div className={GlobalStyle.searchBarContainer}>
          <input
            type="text"
            placeholder=""
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={GlobalStyle.inputSearch}
          />
          <FaSearch className={GlobalStyle.searchBarIcon} />
        </div>
      </div>

      {/* Table Section */}
      <div className={GlobalStyle.tableContainer}>
        <table className={GlobalStyle.table}>
          <thead className={GlobalStyle.thead}>
            <tr>
              <th scope="col" className={GlobalStyle.tableHeader}>
                Case ID
              </th>
              <th scope="col" className={GlobalStyle.tableHeader}>
                Account No
              </th>
              <th scope="col" className={GlobalStyle.tableHeader}>
                Amount
              </th>
              <th scope="col" className={GlobalStyle.tableHeader}>
                Created Date
              </th>
              <th scope="col" className={GlobalStyle.tableHeader}>
                Failed Reason
              </th>
              <th scope="col" className={GlobalStyle.tableHeader}>
                Failed Date
              </th>
              <th scope="col" className={GlobalStyle.tableHeader}>
                Handled DRC
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((row, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0
                      ? "bg-white bg-opacity-75"
                      : "bg-gray-50 bg-opacity-50"
                  } border-b`}
                >
                  <td className={GlobalStyle.tableData}>{row.caseId}</td>
                  <td className={GlobalStyle.tableData}>{row.accountNo}</td>
                  <td className={GlobalStyle.tableData}>{row.amount}</td>
                  <td className={GlobalStyle.tableData}>{row.createdDate}</td>
                  <td className={GlobalStyle.tableData}>{row.failedReason}</td>
                  <td className={GlobalStyle.tableData}>{row.failedDate}</td>
                  <td className={GlobalStyle.tableData}>{row.handledDrc}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end w-full mt-6">
        <Link className={GlobalStyle.buttonPrimary} to="/lod/ftl-list">
          Next
        </Link>
      </div>
    </div>
  );
};

export default FltLodLog;
