/*Purpose:6.1 Dispute_Submission
Created Date: 2024-12-03
Created By: Vihanga Eshan Jayarathna(vihangaeshan2002@gmail.com)
Last Modified Date: 2024-12-03
Modified By: Vihanga Eshan Jayarathna(vihangaeshan2002@gmail.com)
Version: React v18.3.1
ui number : 6.2
Dependencies: Tailwind css
Related Files: 
Notes: This template uses tailwind css. */

import { useNavigate } from "react-router-dom";
import GlobalStyle from "../../../../assets/prototype/GlobalStyle";

const FltLodLog = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission if inside a form
    navigate("/lod/digital_signature_lod/dispute/Post_Dispute_Log");
  };

  return (
    <div className={GlobalStyle.fontPoppins}>
      <h2 className={`${GlobalStyle.headingLarge} mb-5`}>Dispute Submission</h2>
      <div className="flex justify-center">
      <div className={`${GlobalStyle.cardContainer}`}>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className={GlobalStyle.headingMedium}>Case ID: 001</label>
          </div>
          <div className="mb-4 flex items-center space-x-4">
            <label className={GlobalStyle.headingSmall}>Handover Channel</label>
            <div className="flex gap-4">
              <select className={GlobalStyle.selectBox}>
                <option>select 1</option>
                <option>select 2</option>
                <option>select 3</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className={GlobalStyle.remarkTopic}>Remark</label>
            <textarea
              value=""
              className={`${GlobalStyle.remark} w-full`}
              rows="5"
            ></textarea>
          </div>

          <div className="text-right">
            <button type="submit" className={GlobalStyle.buttonPrimary}>
              Submit
            </button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
};

export default FltLodLog;
