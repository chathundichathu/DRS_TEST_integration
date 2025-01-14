// Purpose: This  is the litigation log page.
// Created Date: 2024-12-05
// Created By: Buthmi Mithara Abeysena (buthmimithara1234@gmail.com)
// Last Modified Date: 2024-12-07
// Modified By: Buthmi Mithara Abeysena (buthmimithara1234@gmail.com)
// Version: node 22.2.0
// ui number : v4.1
// Dependencies: tailwind css
// Notes:This component displays a filtered list of litigation cases based on Case ID and Status. It allows navigation to the Litigation Submission page by passing the selected case ID via React Router's `navigate` function. The table dynamically highlights the status and shows a "No results found" message if the filter yields no matches.


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GlobalStyle from "../../../../assets/prototype/GlobalStyle";

const LitigationLog = () => {
  const [caseId, setCaseId] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const data = [
    { caseId: "001", amount: 20000, status: "up" },
    { caseId: "002", amount: 15000, status: "down" },
    { caseId: "003", amount: 10000, status: "up" },
  ];

  const filteredData = data.filter((row) => {
    return (
      row.caseId.includes(caseId) &&
      (status === "" || row.status.toLowerCase() === status.toLowerCase())
    );
  });

  const handleOpen = (caseId) => {
    navigate("/lod/ftl_lod/litigation/LitigationSubmission", { state: { caseId } });
  };

  return (
    <div className={`p-4 ${GlobalStyle.fontPoppins}`}>
      <h1 className={`${GlobalStyle.headingLarge} text-left`}>Litigation Log</h1>
      <div className="flex justify-end gap-4 items-center mb-8">
        <input
          type="text"
          placeholder="Case ID"
          value={caseId}
          onChange={(e) => setCaseId(e.target.value)}
          className={GlobalStyle.inputText}
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={GlobalStyle.selectBox}
        >
          <option value="">All</option>
          <option value="select 1">select 1</option>
          <option value="select 2">select 2</option>
        </select>
        <button className={GlobalStyle.buttonPrimary}>Filter</button>
      </div>

      <div className={GlobalStyle.tableContainer}>
        <table className={GlobalStyle.table}>
          <thead className={GlobalStyle.thead}>
            <tr>
              <th scope="col" className={GlobalStyle.tableHeader}>
                Case ID
              </th>
              <th scope="col" className={GlobalStyle.tableHeader}>
                Amount (LKR)
              </th>
              <th scope="col" className={GlobalStyle.tableHeader}>
                Status
              </th>
              <th scope="col" className={GlobalStyle.tableHeader}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr
                key={index}
                className={
                  index % 2 === 0
                    ? GlobalStyle.tableRowEven
                    : GlobalStyle.tableRowOdd
                }
              >
                <td className={GlobalStyle.tableData}>{row.caseId}</td>
                <td className={GlobalStyle.tableData}>
                  {row.amount.toLocaleString()}
                </td>
                <td className={GlobalStyle.tableData}>
                  <span
                    className={`${
                      row.status === "up" ? "text-green-500" : "text-red-500"
                    } font-bold`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  <button
                    className={`${GlobalStyle.buttonPrimary} mx-auto`}
                    onClick={() => handleOpen(row.caseId)}
                  >
                    Open
                  </button>
                </td>
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan="9" className={GlobalStyle.errorText}>
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LitigationLog;
