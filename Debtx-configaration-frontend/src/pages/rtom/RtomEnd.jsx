// import { useState } from "react";
// import GlobalStyle from "../../assets/prototype/GlobalStyle";

// const RtomEnd = () => {
//     const [negotiation, setNegotiation] = useState("");
//     const [endDate, setEndDate] = useState(""); 
//     const [remark, setRemark] = useState("");
//     const todayDate = new Date().toISOString().split("T")[0];
  
//     const dummyData = {
//       addeddate: " 12/01/2024",
//       rtomname: " RTOM Name",
//       abbreviation: "200045608621 ",
//       telephoneno: "0754295463",
//       faxno: "0114528673",
//     };
  
//     const handleSaveClick = () => {
//       if ((!endDate || !remark)) {
//         alert("Please provide the end date and remarks.");
//         return;
//       }
//       alert("Form submitted successfully!");
//       console.log("Data saved:", {
//         endDate: negotiation ? endDate : null,
//         remark,
//       });
//     };
  
//   return (
//     <div className={GlobalStyle.fontPoppins}>
//       <div className={`${GlobalStyle.headingLarge} mb-8`}>
//         <span>End RTOM</span>
//       </div>

//       <div className="flex justify-center">
//         {/* Card Container */}
//         <div className={`${GlobalStyle.cardContainer} p-4`}>
//           <table className="mb-8 w-full">
//             <tbody>
//               <tr>
//                 <td>
//                   <label className={`${GlobalStyle.headingMedium}`}>
//                     Added Date
//                   </label>
//                 </td>
//                 <td> : </td>
//                 <td>
//                   <label>{dummyData.addeddate}</label>
//                 </td>
//               </tr>
//               <tr>
//                 <td>
//                   <label className={`${GlobalStyle.headingMedium}`}>
//                     RTOM Name
//                   </label>
//                 </td>
//                 <td> : </td>
//                 <td>
//                   <label>{dummyData.rtomname}</label>
//                 </td>
//               </tr>
//               <tr>
//                 <td></td>
//               </tr>
//               <tr>
//                 <td>
//                   <label className={`${GlobalStyle.headingMedium}`}>
//                     Abbreviation
//                   </label>
//                 </td>
//                 <td> : </td>
//                 <td>
//                   <label>{dummyData.abbreviation}</label>
//                 </td>
//               </tr>
//               <tr>
//                 <td></td>
//               </tr>
//               <tr>
//                 <td>
//                   <label className={`${GlobalStyle.headingMedium}`}>
//                     Telephone No
//                   </label>
//                 </td>
//                 <td> : </td>
//                 <td>
//                   <label>{dummyData.telephoneno}</label>
//                 </td>
//               </tr>
//               <tr>
//                 <td></td>
//               </tr>
//               <tr>
//                 <td>
//                   <label className={`${GlobalStyle.headingMedium}`}>
//                     Fax No
//                   </label>
//                 </td>
//                 <td> : </td>
//                 <td>
//                   <label>{dummyData.faxno}</label>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
        
//           <div>
//             {/* End Date */}
//             <div className="flex gap-4 items-center mb-6 justify-center">
//               <label className="block font-medium mb-2">End Date</label>
//               <input
//             type="date"
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//             className={GlobalStyle.inputText}
//             min={todayDate} 
//             max={todayDate} 
//           />
//             </div>
//             {/* Remark */}
//             <div className="flex mb-6 justify-center gap-4">
//               <label className={GlobalStyle.remarkTopic}>Remark</label>
//               <textarea
//                 value={remark}
//                 onChange={(e) => setRemark(e.target.value)}
//                 className={`${GlobalStyle.remark}`}
//                 rows="5"
//               ></textarea>
//             </div>

//             {/* Save Button */}
//             <div className="flex justify-end w-full mt-6">
//               <button className={GlobalStyle.buttonPrimary} 
//               onClick={handleSaveClick}>
//                 Save
//               </button>
//             </div>
//           </div>
//       </div>
//   )
// }

// export default RtomEnd



import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GlobalStyle from "../../assets/prototype/GlobalStyle";
import { getRTOMDetailsById, suspendRTOM } from "../../services/rtom/RtomService";

const RtomEnd = () => {
  const { rtomId } = useParams();
  const [endDate, setEndDate] = useState(""); 
  const [remark, setRemark] = useState("");
  const [rtomDetails, setRtomDetails] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const todayDate = new Date().toISOString().split("T")[0];
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRTOMDetailsById(rtomId);

        const formattedDetails = {
          areaName: data.area_name || "N/A",
          rtomAbbreviation: data.rtom_abbreviation || "N/A",
          contactNumber: data.rtom_contact_number || "N/A",
          faxNumber: data.rtom_fax_number || "N/A",
          addedDate: data.created_dtm || "N/A",
        };

        setRtomDetails(formattedDetails);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch RTOM details. Please try again later.",error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [rtomId]);

  const handleSaveClick = async () => {
    if (!endDate || !remark) {
      alert("Please provide the suspension date and remarks.");
      return;
    }
  
    const payload = {
      rtom_id: rtomId,
      rtom_end_date: endDate,
      reason: remark,
    };
  
    console.log("Payload being sent:", payload); // Debug log
  
    try {
      const response = await suspendRTOM(rtomId, endDate, remark);
      console.log("API Response:", response); // Debug log
  
      if (response.status === "success") {
        alert("RTOM has been successfully suspended.");
        console.log("Data saved:", { rtom_end_date: endDate, remark });
      } else {
        alert(response.message || "Failed to suspend RTOM.");
      }
    } catch (error) {
      console.error("Error while suspending RTOM:", error.response || error.message);
  
      // Display detailed error information
      if (error.response) {
        alert(`Error: ${error.response.data.message || "An error occurred."}`);
      } else {
        alert("An error occurred. Please try again later.");
      }
    }
  };
  

  {error && (
    <div className="text-red-500 text-center mb-4">
      <p>{error}</p>
    </div>
  )}

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  
  return (
    <div className={GlobalStyle.fontPoppins}>
      <div className={`${GlobalStyle.headingLarge} mb-8`}>
        <span>End RTOM - {rtomDetails.areaName}</span>
      </div>

      <div className="flex justify-center">
        {/* Card Container */}
        <div className={`${GlobalStyle.cardContainer} p-4`}>
          <table className="mb-8 w-full">
            <tbody>
              <tr>
                <td>
                  <label className={`${GlobalStyle.headingMedium}`}>
                    Added Date
                  </label>
                </td>
                <td> : </td>
                <td>
                  <label>{rtomDetails.addedDate}</label>
                </td>
              </tr>
              <tr>
                <td>
                  <label className={`${GlobalStyle.headingMedium}`}>
                    RTOM Name
                  </label>
                </td>
                <td> : </td>
                <td>
                  <label>{rtomDetails.areaName}</label>
                </td>
              </tr>
              <tr>
                <td></td>
              </tr>
              <tr>
                <td>
                  <label className={`${GlobalStyle.headingMedium}`}>
                    Abbreviation
                  </label>
                </td>
                <td> : </td>
                <td>
                  <label>{rtomDetails.rtomAbbreviation}</label>
                </td>
              </tr>
              <tr>
                <td></td>
              </tr>
              <tr>
                <td>
                  <label className={`${GlobalStyle.headingMedium}`}>
                    Telephone No
                  </label>
                </td>
                <td> : </td>
                <td>
                  <label>{rtomDetails.contactNumber}</label>
                </td>
              </tr>
              <tr>
                <td></td>
              </tr>
              <tr>
                <td>
                  <label className={`${GlobalStyle.headingMedium}`}>
                    Fax No
                  </label>
                </td>
                <td> : </td>
                <td>
                  <label>{rtomDetails.faxNumber}</label>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
        
      <div>
        {/* End Date */}
        <div className="flex gap-4 items-center mb-6 justify-center">
          <label className="block font-medium mb-2">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className={GlobalStyle.inputText}
            min={todayDate} // Set minimum as today
            max={todayDate} // Restrict selection to today
          />
        </div>
        {/* Remark */}
        <div className="flex mb-6 justify-center gap-4">
          <label className={GlobalStyle.remarkTopic}>Remark</label>
          <textarea
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            className={`${GlobalStyle.remark}`}
            rows="5"
          ></textarea>
        </div>

        {/* Save Button */}
        <div className="flex justify-end w-full mt-6">
          <button className={GlobalStyle.buttonPrimary} 
          onClick={handleSaveClick}>
            Save
          </button>
        </div>
      </div>
  </div>
  )
}

export default RtomEnd