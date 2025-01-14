// Purpose: This  is the post litigation log page.
// Created Date: 2024-12-02
// Created By: Buthmi Mithara Abeysena (buthmimithara1234@gmail.com)
// Last Modified Date: 2024-12-07
// Modified By: Buthmi Mithara Abeysena (buthmimithara1234@gmail.com)
// Version: node 22.2.0
// ui number : v4.4
// Dependencies: tailwind css
// Notes:This component displays a table with post-litigation case details, including Case ID, Amount, Status, and Submission Date. It uses alternating row styles and conditionally formats the status. An "Open" button is included for each row.


import React from 'react';
import GlobalStyle from '../../../../assets/prototype/GlobalStyle';
import { useNavigate} from "react-router-dom";

const PostLitigationLog = () => {

  const navigate = useNavigate();

  const data = [
    { caseID: '001', amount: '20,000', status: 'Up', submittedBy: 'Admin', submissionDtm: '2024-11-07' },
    { caseID: '', amount: '', status: '', submittedBy: '', submissionDtm: '' },
    { caseID: '', amount: '', status: '', submittedBy: '', submissionDtm: '' },
  ];

  const handleNavigation = () => {
    navigate('/lod/litigation');
  };

  return (
    <div className={`p-4 ${GlobalStyle.fontPoppins}`}>
      <h1 className={`${GlobalStyle.headingLarge} text-left`}>Post Litigation Log</h1>
    <div className="mt-8 ">
      {/* Table Section */}
      <div className={GlobalStyle.tableContainer}>
        <table className={GlobalStyle.table}>
          <thead className={GlobalStyle.thead}>
            <tr>
              <th className={GlobalStyle.tableHeader}>Case ID</th>
              <th className={GlobalStyle.tableHeader}>Amount (LKR)</th>
              <th className={GlobalStyle.tableHeader}>Status</th>
              <th className={GlobalStyle.tableHeader}>Submitted By</th>
              <th className={GlobalStyle.tableHeader}>Submission Dtm</th>
              <th className={GlobalStyle.tableHeader}></th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={row.caseID}
                className={index % 2 === 0 ? GlobalStyle.tableRowEven : GlobalStyle.tableRowOdd}
              >
                <td className={GlobalStyle.tableData}>{row.caseID}</td>
                <td className={GlobalStyle.tableData}>{row.amount}</td>
                <td className={GlobalStyle.tableData}>
                <span
                    className={`${
                      row.status === "Up" ? "text-green-500" : "text-red-500"
                    } font-bold`}
                  >
                    {row.status}
                </span>
                </td>
                <td className={GlobalStyle.tableData}>{row.submittedBy}</td>
                <td className={GlobalStyle.tableData}>{row.submissionDtm}</td>
                <td className="px-4 py-4 text-center">
                  <button className={`${GlobalStyle.buttonPrimary} mx-auto`} onClick={handleNavigation}>
                    Open
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
};

export default PostLitigationLog;
