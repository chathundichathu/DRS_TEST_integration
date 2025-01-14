// Purpose: This template is the download create ftl lod page.
// Created Date: 2024-12-03
// Created By: vishmi (vishmirangana1003@gmail.com)
// Last Modified Date: 2024-12-07
// Modified By: vishmi (vishmirangana1003@gmail.com)
// Version: node 22.2.0
// ui number : v3.1.4
// Dependencies: tailwind css
// Notes : This interface use for download the created ftl lod,( can download individual and all data)

import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import React from 'react';
import GlobalStyle from "../../../../assets/prototype/GlobalStyle";
import { useNavigate } from "react-router-dom";

const DownloadCreateFtlLod = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const data = [
    {
      caseId: "C004",
      createdBy: "A.B.Perera",
    },
    {
      caseId: "C022",
      createdBy: "A.B.Perera",
    },
  ];

  const filteredData = data.filter((row) =>
    Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const navi = () => {
    navigate("/lod/ftllod/ftllod/list/listlodsubmission");
  };

  return (
    <div className={GlobalStyle.fontPoppins}>
    <div className="flex flex-col items-start justify-start min-h-screen p-4 ">
      <h1 className={`${GlobalStyle.headingLarge} mb-6`}>Download Created FTL LOD</h1>
      <div className="relative w-full">
        
        {/* Search Bar Section */}
        <div className="mb-6 flex pl-[800px]">
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
        <div className="flex items-center justify-center">
        <div className={GlobalStyle.tableContainer}>
            <table className={GlobalStyle.table}>
            <thead className={GlobalStyle.thead}>
            <tr>
                <th scope="col" className={GlobalStyle.tableHeader}>
                    <input type="checkbox" className="rounded-lg" />
                </th>
                <th scope="col" className={GlobalStyle.tableHeader}>Case ID</th>
                <th scope="col" className={GlobalStyle.tableHeader}>Created By</th>
                <th scope="col" className={GlobalStyle.tableHeader}>Download</th>
            </tr>
            </thead>
            <tbody>
               {filteredData.map((row, index) => (
             <tr key={index}
                className={`${
                index % 2 === 0 ? GlobalStyle.tableRowEven : GlobalStyle.tableRowOdd
                } border-b`}
             >
                <td className={GlobalStyle.tableData}>
                <input type="checkbox" className="rounded-lg" />
                </td>
                <td className={GlobalStyle.tableData}>
                <a href={`#${row.caseId}`} className="hover:underline">
                    {row.caseId}
                </a>
                </td>
                <td className={GlobalStyle.tableData}>{row.createdBy}</td>
                <td className={GlobalStyle.tableData}>
            <button className={GlobalStyle.buttonPrimary}>
                Download
            </button>
                </td>
             </tr>
            ))}
        
            </tbody>
            </table>
        </div>
        </div>

      </div>

      <div className="flex pl-[1000px] w-full mt-7">
        <button className={GlobalStyle.buttonPrimary} onClick={navi}>
          Download All
        </button>
      </div>
    </div>
    </div>
  );
}

export default DownloadCreateFtlLod;
