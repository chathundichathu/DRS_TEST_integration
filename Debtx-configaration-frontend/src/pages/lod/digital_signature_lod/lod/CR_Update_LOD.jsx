/*Purpose: 3.12.2 Customer Response for LOD
Created Date: 2024-12-03
Created By: Dilmith Siriwardena (jtdsiriwardena@gmail.com)
Last Modified Date: 2024-12-03
Modified By: Dilmith Siriwardena (jtdsiriwardena@gmail.com)
Version: React v18
ui number : 3.12.2
Dependencies: Tailwind CSS
Related Files: 
Notes: This template uses Tailwind CSS */

import { useState } from "react";
import GlobalStyle from "../../../../assets/prototype/GlobalStyle";


const CustomerResponseForFinalReminder = () => {
  const [selectedOption, setSelectedOption] = useState("");
  return (
    <div className={GlobalStyle.fontPoppins}>
    <div className="min-h-screen p-6">
      <h1 className={`${GlobalStyle.headingLarge} mb-5`}>Customer Response for LOD</h1>
      <div className="max-w-4xl mx-auto bg-blue-100 p-8 rounded-lg shadow-lg">

        {/* Customer Info Section */}
        <div className="bg-white p-4 rounded-lg shadow mb-6 border border-black">
          <p className={`${GlobalStyle.headingSmall} mb-2 `}>
            <strong>Case ID:</strong>
          </p>
          <p className={`${GlobalStyle.headingSmall} mb-2 `}>
            <strong>Customer Ref:</strong>
          </p>
          <p className={`${GlobalStyle.headingSmall} mb-2 `}>
            <strong>Account No:</strong>
          </p>
          <p className={`${GlobalStyle.headingSmall} mb-2 `}>
            <strong>Arrears Amount:</strong>
          </p>
          <p>
            <strong>Last Payment Date:</strong>
          </p>
        </div>

        {/* Response Type Section */}
        <div className="flex items-center space-x-6 ml-40">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="response"
              value="dispute"
              className="hidden"
              onChange={() => setSelectedOption("dispute")}
              checked={selectedOption === "dispute"}
            />
            <span
              className={`w-4 h-4 border-2 rounded-full flex items-center justify-center ${
                selectedOption === "dispute" ? "border-black bg-[#002342]" : "border-gray-600"
              }`}
            >
              {selectedOption === "dispute" && (
                <span className="w-2 h-2 bg-white rounded-full"></span>
              )}
            </span>
            <span className={`${GlobalStyle.headingSmall} ml-2 `}>Dispute</span>
          </label>

          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="response"
              value="settlement"
              className="hidden"
              onChange={() => setSelectedOption("settlement")}
              checked={selectedOption === "settlement"}
            />
            <span
              className={`w-4 h-4 border-2 rounded-full flex items-center justify-center ${
                selectedOption === "settlement" ? "border-black bg-[#002342]" : "border-gray-600"
              }`}
            >
              {selectedOption === "settlement" && (
                <span className="w-2 h-2 bg-white rounded-full"></span>
              )}
            </span>
            <span className={`${GlobalStyle.headingSmall} ml-2 `}>Settlement</span>
          </label>
        </div>

        {/* Conditional Rendering */}
        {selectedOption === "dispute" && (
          <div className="mb-6 mt-6">
            {/* Remark Section */}
            <label htmlFor="remark" className={`${GlobalStyle.remarkTopic} block mb-2 `}>
              Remark
            </label>
            <textarea
              id="remark"
              rows="4"
              className="w-96 rounded-lg p-4 focus:outline-none focus:ring focus:ring-blue-300 border border-black ml-40"
              placeholder="Enter your remark here"
            ></textarea>

            {/* Submit Button */}
            <div className="text-right mt-4">
              <button className={`${GlobalStyle.buttonPrimary} `}>
                Submit
              </button>
            </div>
          </div>
        )}

        {selectedOption === "settlement" && (
          <div className="text-right mt-6">
            {/* Create Settlement Plan Button */}
            <button className={`${GlobalStyle.buttonPrimary} `}>
              Create Settlement Plan
            </button>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default CustomerResponseForFinalReminder;