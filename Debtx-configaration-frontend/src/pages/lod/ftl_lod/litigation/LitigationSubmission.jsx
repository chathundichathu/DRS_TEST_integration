// Purpose: This  is the litigation submission page.
// Created Date: 2024-12-06
// Created By: Buthmi Mithara Abeysena (buthmimithara1234@gmail.com)
// Last Modified Date: 2024-12-07
// Modified By: Buthmi Mithara Abeysena (buthmimithara1234@gmail.com)
// Version: node 22.2.0
// ui number : v4.2
// Dependencies: tailwind css
// Notes :This component handles the litigation submission page, where users can select RTOM and DRC files for a specific case using dropdowns. It retrieves the `caseId` from `location.state` and manages file selection via React state. The form submits the selected files and logs them to the console.


import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import GlobalStyle from "../../../../assets/prototype/GlobalStyle";

const LitigationSubmission = () => {
  const location = useLocation();
  const { caseId } = location.state || {}; // Get caseId from location.state
  const [rtomFile, setRtomFile] = useState("");
  const [drcFile, setDrcFile] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("RTOM File:", rtomFile);
    console.log("DRC File:", drcFile);
  };

  const handleNavigation = () => {
    navigate('/lod/ftl_lod/litigation/PostLitigationLog');
  };

  return (
    <div className={`p-4 ${GlobalStyle.fontPoppins}`}>
      <h1 className={`${GlobalStyle.headingLarge} text-left`}>Litigation Submission</h1>
      <form
        onSubmit={handleSubmit}
        className={`${GlobalStyle.cardContainer} mx-auto mt-11`}
      >
        <div className="mb-11 mt-5">
          <p className={`${GlobalStyle.headingMedium} font-bold text-left`}>
            Case ID: {caseId}
          </p>
        </div>
        <div className="mb-6 flex gap-4">
          <label htmlFor="rtomFile" className={GlobalStyle.headingSmall}>
            RTOM Customer File
          </label>
          <select
            id="rtomFile"
            value={rtomFile}
            onChange={(e) => setRtomFile(e.target.value)}
            className={GlobalStyle.selectBox}
          >
            <option value="" disabled>
              Select
            </option>
            <option value="requested">Requsted</option>
            <option value="collected">Collected</option>
            <option value="withOutAggrement">With out aggrement</option>
          </select>
        </div>
        <div className="mb-8 flex gap-28">
          <label htmlFor="drcFile" className={GlobalStyle.headingSmall}>
            DRC File
          </label>
          <select
            id="drcFile"
            value={drcFile}
            onChange={(e) => setDrcFile(e.target.value)}
            className={GlobalStyle.selectBox}
          >
            <option value="" disabled>
              Select
            </option>
            <option value="requested">Requsted</option>
            <option value="collected">Collected</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button type="submit" className={GlobalStyle.buttonPrimary} onClick={handleNavigation}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default LitigationSubmission;
