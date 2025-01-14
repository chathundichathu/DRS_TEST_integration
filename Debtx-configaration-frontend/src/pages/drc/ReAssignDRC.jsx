// Purpose: This template is used for the Re-Assign DRC page(1.16).
// Created Date: 2024-12-03
// Created By: H.P.R Chandrasekara (hprchandrasekara@gmail.com)
// Last Modified Date : 2024 - 12 - 12
// Modified Date: 2024-12-03
// Modified By: H.P.R Chandrasekara (hprchandrasekara@gmail.com)
// Version: node 11
// ui number : 1.16
// Dependencies: tailwind css
// Related Files:  app.js (routes)
// Notes:.

import { useState } from "react";
import GlobalStyle from "../../assets/prototype/GlobalStyle.jsx";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaArrowLeft, FaArrowRight, FaSearch } from "react-icons/fa";

export default function ReAssignDRC() {
  const negotiationDetails = [
    {
      date: "2024.11.04",
      drc: "------",
      ro: "------",
      remark: "------",
    },
    {
      date: "2024.11.05",
      drc: "------",
      ro: "------",
      remark: "------",
    },
    {
      date: "2024.11.06",
      drc: "------",
      ro: "------",
      remark: "------",
    },
    {
      date: "2024.11.06",
      drc: "------",
      ro: "------",
      remark: "------",
    },
    {
      date: "2024.11.06",
      drc: "------",
      ro: "------",
      remark: "------",
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalContent, setModalContent] = useState({
    detail1: "",
    detail2: "",
    detail3: "",
  });

  const handleBulletClick = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const filteredSearchData = negotiationDetails.filter((row) =>
    Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const itemsPerPage = 4;
  const totalPages = Math.ceil(filteredSearchData.length / itemsPerPage);

  const handlePrevNext = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredSearchData.slice(startIndex, endIndex);
  return (
    <div className={`p-4 ${GlobalStyle.fontPoppins}`}>
      <h1 className={`${GlobalStyle.headingLarge} mb-5`}>Re-Assign DRC</h1>

      {/* card box*/}
      <div className={`${GlobalStyle.cardContainer}`}>
        <p className="mb-2">
          <strong>Case ID:</strong>
        </p>
        <p className="mb-2">
          <strong>Customer Ref:</strong>{" "}
        </p>
        <p className="mb-2">
          <strong>Account no:</strong>{" "}
        </p>
        <p className="mb-2">
          <strong>Arrears Amount:</strong>{" "}
        </p>
        <p className="mb-2">
          <strong>Last Payment Date:</strong>{" "}
        </p>
      </div>

      <div className="flex gap-5 my-10">
        <h2 className={`${GlobalStyle.headingMedium}`}>Last RO Detail</h2>

        {/* Bullets inside white background */}

        <div className="bg-white w-[472px] h-[78px] rounded-[10px] relative p-4 shadow-xl mb-6  bg-opacity-15 border-2 border-zinc-300 ">
          <div className="absolute bottom-2 right-4">
            <HiDotsHorizontal
              onClick={() =>
                handleBulletClick({
                  detail1: "Detail 1 content",
                  detail2: "Detail 2 content",
                  detail3: "Detail 3 content",
                })
              }
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className={`${GlobalStyle.headingMedium} mb-5`}>
          Last Negotiation Detail
        </h2>
        <div className="flex flex-col">
          <div className="flex justify-start mb-4">
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
          <div className={GlobalStyle.tableContainer}>
            <table className={GlobalStyle.table}>
              <thead className={GlobalStyle.thead}>
                <tr>
                  <th scope="col" className={GlobalStyle.tableHeader}>
                    Date
                  </th>
                  <th scope="col" className={GlobalStyle.tableHeader}>
                    DRC
                  </th>
                  <th scope="col" className={GlobalStyle.tableHeader}>
                    RO
                  </th>
                  <th scope="col" className={GlobalStyle.tableHeader}>
                    Remark
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((detail, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0
                        ? "bg-white bg-opacity-75"
                        : "bg-gray-50 bg-opacity-50"
                    } border-b`}
                  >
                    <td className={GlobalStyle.tableData}>{detail.date}</td>
                    <td className={GlobalStyle.tableData}>{detail.drc}</td>
                    <td className={GlobalStyle.tableData}>{detail.ro}</td>
                    <td className={GlobalStyle.tableData}>{detail.remark}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className={`${GlobalStyle.navButtonContainer} mb-14`}>
          <button
            onClick={() => handlePrevNext("prev")}
            disabled={currentPage === 1}
            className={`${GlobalStyle.navButton} ${
              currentPage === 1 ? "cursor-not-allowed" : ""
            }`}
          >
            <FaArrowLeft />
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePrevNext("next")}
            disabled={currentPage === totalPages}
            className={`${GlobalStyle.navButton} ${
              currentPage === totalPages ? "cursor-not-allowed" : ""
            }`}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-9">
        <h1 className={`${GlobalStyle.headingMedium}`}>Assign DRC</h1>
        <select className={GlobalStyle.selectBox}>
          <option value="" disabled selected hidden>
            DRC
          </option>{" "}
          {/* This adds DRC as a placeholder */}
          <option>CMS</option>
          <option>TCM</option>
          <option>RE</option>
          <option>CO LAN</option>
          <option>ACCIVA</option>
          <option>VISONCOM</option>
          <option>PROMPT</option>
        </select>
      </div>

      <div className="flex items-end justify-end">
        <button className={`${GlobalStyle.buttonPrimary}`}>Submit</button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[400px]">
            <h2 className="text-xl font-semibold text-center">
              Last RO Detail
            </h2>
            <div className="flex flex-col mt-4">
              <label className="mb-2">Detail 1</label>
              <input
                type="text"
                value={modalContent.detail1}
                readOnly
                className="p-2 mb-4 border rounded"
              />
              <label className="mb-2">Detail 2</label>
              <input
                type="text"
                value={modalContent.detail2}
                readOnly
                className="p-2 mb-4 border rounded"
              />
              <label className="mb-2">Detail 3</label>
              <input
                type="text"
                value={modalContent.detail3}
                readOnly
                className="p-2 mb-4 border rounded"
              />
            </div>
            <button
              className={`${GlobalStyle.buttonPrimary}`}
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
