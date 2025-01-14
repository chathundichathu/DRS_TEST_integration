// Purpose: This template is the litigation negotiation  page.
// Created Date: 2024-12-05
// Created By: vishmi (vishmirangana1003@gmail.com)
// Last Modified Date: 2024-12-07
// Modified By: vishmi (vishmirangana1003@gmail.com)
// Version: node 22.2.0
// ui number : v4.6
// Dependencies: tailwind css
// Notes: This interface use for litigation negotiation. In this have to radio button it's called Yes and No. Through this radio button, if it is Yes can create the settelment plan, if it is No can write off. 

import { useState } from "react";
import GlobalStyle from "../../../../assets/prototype/GlobalStyle";

const LitigationNegotiation = () => {
  const [negotiation, setNegotiation] = useState(""); // Default to empty
  const [courtNo, setCourtNo] = useState("");
  const [remark, setRemark] = useState("");

  return (
    <div className={GlobalStyle.fontPoppins}>
    <div className="flex flex-col min-h-screen p-4">
      <h1 className={GlobalStyle.headingLarge}>Litigation Negotiation</h1>
      <div className={`${GlobalStyle.cardContainer}`}>
        <p className="mb-2"><strong>Case ID:</strong></p>
        <p className="mb-2"><strong>Customer Ref:</strong></p>
        <p className="mb-2"><strong>Account no:</strong></p>
        <p className="mb-2"><strong>Arrears Amount:</strong></p>
        <p className="mb-2"><strong>Last Payment Date:</strong></p>
      </div>
      <div className="mb-6">
        <p className="block font-medium mb-2">Negotiation:</p>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="Yes"
              checked={negotiation === "Yes"}
              onChange={() => setNegotiation("Yes")}
              className="mr-2"
            />
            Yes
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="No"
              checked={negotiation === "No"}
              onChange={() => setNegotiation("No")}
              className="mr-2"
            />
            No
          </label>
        </div>
      </div>
      {negotiation && (
        <div>
          <div className="flex gap-4 items-center mb-6">
            <label className="block font-medium mb-2">Court No</label>
            <input
              type="text"
              value={courtNo}
              onChange={(e) => setCourtNo(e.target.value)}
              className={GlobalStyle.inputText}
            />
          </div>
          <div className="mb-6">
            <label className={GlobalStyle.remarkTopic}>Remark</label>
            <textarea
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              className={`${GlobalStyle.remark}`}
              rows="5"
            ></textarea>
          </div>
          <div className="flex justify-end w-full mt-6">
            {negotiation === "Yes" ? (
              <button className={GlobalStyle.buttonPrimary}>
                Create Settlement Plan
              </button>
            ) : (
              <button className={GlobalStyle.buttonPrimary}>
                Write Off
              </button>
            )}
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default LitigationNegotiation;
