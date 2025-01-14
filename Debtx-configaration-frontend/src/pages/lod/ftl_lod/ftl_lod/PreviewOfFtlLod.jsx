// Purpose: This template is the Preview of ftl lod page.
// Created Date: 2024-12-01
// Created By: vishmi (vishmirangana1003@gmail.com)
// Last Modified Date: 2024-12-07
// Modified By: vishmi (vishmirangana1003@gmail.com)
// Version: node 22.2.0
// ui number : v3.1.3
// Dependencies: tailwind css
// Notes: This is only the interface, for the real time use need to add react pdf viewer and connect with the backend.

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import React from 'react';
import GlobalStyle from "../../../../assets/prototype/GlobalStyle";


const PreviewOfFtlLod = () => {
  const navigate = useNavigate(); // Initialize navigate function

  return (
    <div className={GlobalStyle.fontPoppins}>
    <div className="flex flex-col  min-h-screen p-4">
      <h1 className={`${GlobalStyle.headingLarge} mb-6`}>Create FTL LOD Individual</h1>
      <div className="flex justify-center w-full mb-6">
        <div className="w-[48rem] h-[32rem] bg-gray-300 bg-opacity-30 flex items-center justify-center shadow-lg rounded-3xl">
          <p className={GlobalStyle.headingSmall}>Preview of FTL LOD</p>
        </div>
      </div>
      <div className="flex justify-end w-full mb-6">
        {/* Add navigate to the button */}
        <button
          className={GlobalStyle.buttonPrimary}
          onClick={() => navigate("/lod/ftllod/ftllod/downloadcreateftllod")} // Navigate to the PDF page
        >
          Create Pdf
        </button>
      </div>
      <div className="flex justify-center items-center gap-6 p-4">
        {/* Previous Page Link */}
        <button
          className={GlobalStyle.navButton}
          onClick={() => navigate("#")}
        >
          <FaArrowLeft />
        </button>
        {/* Next Page Link */}
        <button
          className={GlobalStyle.navButton}
          onClick={() => navigate("#")}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
    </div>
  );
}

export default PreviewOfFtlLod;