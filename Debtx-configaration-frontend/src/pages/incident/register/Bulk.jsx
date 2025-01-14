import React, { useState } from 'react';
import GlobalStyle from '../../../assets/prototype/GlobalStyle';

const Upload = () => {
  const [selectedAction, setSelectedAction] = useState("");

  const handleSubmit = () => {
    if (selectedAction === "incidentCreation") {
      window.location.href = '/pages/incident/file-download';
    } else if (selectedAction === "distributeToDRC") {
      window.location.href = '/pages/incident/details';
    }else if (selectedAction === "incidentReject") {
      window.location.href = '/incident/log/rejectlog';
    }else {
      alert("Please select 'Incident Creation' to proceed.");
    }
  };

  return (
    <div
      className="flex flex-col items-center pt-16 font-poppins"
      style={{ opacity: 0.95 }}
    >
      {/* Title */}
      <h1 className={`${GlobalStyle.headingLarge} pb-6`}>File Upload</h1>

      {/* Container */}
      <div className="w-full max-w-3xl p-12 bg-blue-50 rounded-lg shadow-md">
        {/* Action Type Dropdown */}
        <div className="mb-6 flex justify-center">
          <select
            id="actionType"
            className={`${GlobalStyle.selectBox} w-fit`}
            value={selectedAction}
            onChange={(e) => setSelectedAction(e.target.value)}
          >
            <option value="" disabled>
              ACTION TYPE
            </option>
            <option value="incidentCreation">Incident Creation</option>
            <option value="distributeToDRC">Distribute to DRC</option>
            <option value="validityPeriodExtend">Validity Period Extend</option>
            <option value="holdCases">Hold Cases</option>
            <option value="incidentReject">Incident Reject</option>
          </select>
        </div>

        {/* File Input */}
        <div className="mb-6 flex items-center justify-center">
          <label
            htmlFor="file"
            className="px-6 py-3 text-black bg-white border border-black rounded-l-lg cursor-pointer hover:bg-gray-100 w-40 text-center font-bold"
          >
            File
          </label>
          <input
            type="file"
            id="file"
            className="hidden"
          />
          <input
            type="text"
            placeholder="No file chosen"
            readOnly
            className="block w-full px-5 py-3 bg-gray-200 text-gray-600 border-2 border-[#0056A2] border-opacity-30 rounded-r-lg"
            style={{ height: "calc(3rem + 2px)", width: "calc(100% - 10rem)" }}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="button"
            className={GlobalStyle.buttonPrimary}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Upload;
