import GlobalStyle from "../../assets/prototype/GlobalStyle";
import { useState } from "react";

export default function Mediation_board_response() {
  const [caseDetails, setCaseDetails] = useState({
    caseId: "",
    customerRef: "",
    accountNo: "",
    arrearsAmount: "",
    lastPaymentDate: "",
  });

  const [textareaValue, setTextareaValue] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [settleOption, setSettleOption] = useState("");
  const [showSettlementPlan, setShowSettlementPlan] = useState(false);

  const handleCustomerRepresentedChange = (event) => {
    setSelectedOption(event.target.value);
    // Display "Settle: Yes/No" checkbox only if "Yes" is selected
    if (event.target.value === "Yes") {
      setSettleOption(""); // Reset settle option
    }
  };

  const handleSettleChange = (event) => {
    setSettleOption(event.target.value);
  };

  return (
    <div className={GlobalStyle.fontPoppins}>
      <div className="mb-6">
        <h1 className={GlobalStyle.headingLarge}>Meditation Board Response</h1>
      </div>
      {/* card box*/}
      <div className={`${GlobalStyle.cardContainer}`}>
        <p className="mb-2">
          <strong>Case ID:{caseDetails.caseId}</strong>
        </p>
        <p className="mb-2">
          <strong>Customer Ref:{caseDetails.customerRef}</strong>{" "}
        </p>
        <p className="mb-2">
          <strong>Account no:{caseDetails.accountNo}</strong>{" "}
        </p>
        <p className="mb-2">
          <strong>Arrears Amount:{caseDetails.arrearsAmount}</strong>{" "}
        </p>
        <p className="mb-2">
          <strong>Last Payment Date:{caseDetails.lastPaymentDate}</strong>{" "}
        </p>
      </div>

      <div className="mb-6">
        <h1 className={GlobalStyle.fontPoppins}>
          Customer Represented:
          <label>
            <input
              type="radio"
              name="yesNo"
              value="Yes"
              checked={selectedOption === "Yes"}
              onChange={handleCustomerRepresentedChange}
            />
            Yes
          </label>
          <label style={{ marginLeft: "10px" }}>
            <input
              type="radio"
              name="yesNo"
              value="No"
              checked={selectedOption === "No"}
              onChange={handleCustomerRepresentedChange}
            />
            No
          </label>
        </h1>
      </div>
      {/* remark box */}
      <div className="mb-6">
        <label className={GlobalStyle.remarkTopic}>Comment: </label>
        <textarea
          value={textareaValue}
          onChange={(e) => setTextareaValue(e.target.value)}
          className={`${GlobalStyle.remark}`}
          rows="5"
        ></textarea>
      </div>

      {selectedOption === "Yes" && (
        <div className="mb-6">
          <fieldset>
            <legend className={GlobalStyle.headingMedium}>Settle:</legend>
            <label>
              <input
                type="radio"
                name="settle"
                value="Yes"
                checked={settleOption === "Yes"}
                onChange={handleSettleChange}
              />
              Yes
            </label>
            <label style={{ marginLeft: "10px" }}>
              <input
                type="radio"
                name="settle"
                value="No"
                checked={settleOption === "No"}
                onChange={handleSettleChange}
              />
              No
            </label>
          </fieldset>
        </div>
      )}

      <div className="flex justify-end items-center w-full mt-6">
        <button className={`${GlobalStyle.buttonPrimary} ml-4`}>Submit</button>
      </div>

      {showSettlementPlan && (
        <div className="flex justify-end items-center w-full mt-6">
          <button className={`${GlobalStyle.buttonSecondary} ml-4`}>
            Create Settlement Plan
          </button>
        </div>
      )}
    </div>
  );
}
