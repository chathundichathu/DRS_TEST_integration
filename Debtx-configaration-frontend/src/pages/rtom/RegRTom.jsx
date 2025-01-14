// import { useState } from "react";
// import axios from "axios";
// import GlobalStyle from "../../assets/prototype/GlobalStyle";

// const RegRTom = () => {
//   // State to store form values
//   const [formData, setFormData] = useState({
//     area_name: "",
//     rtom_abbreviation: "",
//     rtom_contact_number: "",
//     rtom_fax_number: "",
//   });

//   // State to handle success or error messages
//   const [message, setMessage] = useState("");

//   // Handle input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   // Submit the form
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Send POST request to backend
//       const response = await axios.post("http://localhost:5000/api/RTOM/Register_RTOM", formData);

//       if (response.data.status === "success") {
//         setMessage("RTOM registered successfully!");
//       } else {
//         setMessage("Failed to register RTOM.");
//       }
//     } catch (error) {
//       console.error("Error while registering RTOM:", error);
//       setMessage("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <div className={GlobalStyle.fontPoppins}>
//       <div className={`${GlobalStyle.headingLarge} mb-8`}>
//         <span>Register new RTOM Area</span>
//       </div>
//       <div className="flex justify-center">
//         <div className={`${GlobalStyle.cardContainer} p-4`}>
//           <form onSubmit={handleSubmit}>
//             <table className="mb-8 w-full">
//               <tbody>
//                 <tr>
//                   <td>
//                     <label className={`${GlobalStyle.headingMedium}`}>RTOM Name</label>
//                   </td>
//                   <td>:</td>
//                   <td>
//                     <input
//                       type="text"
//                       name="area_name"
//                       value={formData.area_name}
//                       onChange={handleInputChange}
//                       className={`${GlobalStyle.inputText}`}
//                       required
//                     />
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>
//                     <label className={`${GlobalStyle.headingMedium}`}>Abbreviation</label>
//                   </td>
//                   <td>:</td>
//                   <td>
//                     <input
//                       type="text"
//                       name="rtom_abbreviation"
//                       value={formData.rtom_abbreviation}
//                       onChange={handleInputChange}
//                       className={`${GlobalStyle.inputText}`}
//                       required
//                     />
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>
//                     <label className={`${GlobalStyle.headingMedium}`}>Telephone Number</label>
//                   </td>
//                   <td>:</td>
//                   <td>
//                     <input
//                       type="text"
//                       name="rtom_contact_number"
//                       value={formData.rtom_contact_number}
//                       onChange={handleInputChange}
//                       className={`${GlobalStyle.inputText}`}
//                       required
//                     />
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>
//                     <label className={`${GlobalStyle.headingMedium}`}>Fax No</label>
//                   </td>
//                   <td>:</td>
//                   <td>
//                     <input
//                       type="text"
//                       name="rtom_fax_number"
//                       value={formData.rtom_fax_number}
//                       onChange={handleInputChange}
//                       className={`${GlobalStyle.inputText}`}
//                       required
//                     />
//                   </td>
//                 </tr>
//               </tbody>
//             </table>

//             <div className="flex justify-end">
//               <button type="submit" className={`${GlobalStyle.buttonPrimary}`}>
//                 Submit
//               </button>
//             </div>
//           </form>

//           {message && <div className="mt-4">{message}</div>}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegRTom;


// import { useState } from "react";
// // import axios from "axios";
// import GlobalStyle from "../../assets/prototype/GlobalStyle";
// import { registerRTOM } from "../../services/rtom/RtomService";

// const RegRTom = () => {
//   // State to store form values
//   const [formData, setFormData] = useState({
//     area_name: "",
//     rtom_abbreviation: "",
//     rtom_contact_number: "",
//     rtom_fax_number: "",
//   });

//   // State to handle success or error messages
//   const [message, setMessage] = useState("");

//   // Handle input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   // Submit the form
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Send POST request to backend
//       const response = await (registerRTOM(), formData);

//       if (response.data.status === "success") {
//         setMessage("RTOM registered successfully!");
//       } else {
//         setMessage("Failed to register RTOM.");
//       }
//     } catch (error) {
//       console.error("Error while registering RTOM:", error);
//       setMessage("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <div className={GlobalStyle.fontPoppins}>
//       <div className={`${GlobalStyle.headingLarge} mb-8`}>
//         <span>Register new RTOM Area</span>
//       </div>
//       <div className="flex justify-center">
//         <div className={`${GlobalStyle.cardContainer} p-4`}>
//           <form onSubmit={handleSubmit}>
//             <table className="mb-8 w-full">
//               <tbody>
//                 <tr>
//                   <td>
//                     <label className={`${GlobalStyle.headingMedium}`}>RTOM Name</label>
//                   </td>
//                   <td>:</td>
//                   <td>
//                     <input
//                       type="text"
//                       name="area_name"
//                       value={formData.area_name}
//                       onChange={handleInputChange}
//                       className={`${GlobalStyle.inputText}`}
//                       required
//                     />
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>
//                     <label className={`${GlobalStyle.headingMedium}`}>Abbreviation</label>
//                   </td>
//                   <td>:</td>
//                   <td>
//                     <input
//                       type="text"
//                       name="rtom_abbreviation"
//                       value={formData.rtom_abbreviation}
//                       onChange={handleInputChange}
//                       className={`${GlobalStyle.inputText}`}
//                       required
//                     />
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>
//                     <label className={`${GlobalStyle.headingMedium}`}>Telephone Number</label>
//                   </td>
//                   <td>:</td>
//                   <td>
//                     <input
//                       type="text"
//                       name="rtom_contact_number"
//                       value={formData.rtom_contact_number}
//                       onChange={handleInputChange}
//                       className={`${GlobalStyle.inputText}`}
//                       required
//                     />
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>
//                     <label className={`${GlobalStyle.headingMedium}`}>Fax No</label>
//                   </td>
//                   <td>:</td>
//                   <td>
//                     <input
//                       type="text"
//                       name="rtom_fax_number"
//                       value={formData.rtom_fax_number}
//                       onChange={handleInputChange}
//                       className={`${GlobalStyle.inputText}`}
//                       required
//                     />
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>
//                     <label className={`${GlobalStyle.headingMedium}`}>Created By</label>
//                   </td>
//                   <td>:</td>
//                   <td>
//                     <input
//                       type="text"
//                       name="created_by"
//                       value={formData.created_by}
//                       onChange={handleInputChange}
//                       className={`${GlobalStyle.inputText}`}
//                       required
//                     />
//                   </td>
//                 </tr>
//               </tbody>
//             </table>

//             <div className="flex justify-end">
//               <button type="submit" className={`${GlobalStyle.buttonPrimary}`}>
//                 Submit
//               </button>
//             </div>
//           </form>

//           {message && <div className="mt-4">{message}</div>}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegRTom;


import { useState } from "react";
import GlobalStyle from "../../assets/prototype/GlobalStyle";
import { registerRTOM } from "../../services/rtom/RtomService";

const RegRTom = () => {
  const [formData, setFormData] = useState({
    area_name: "",
    rtom_abbreviation: "",
    rtom_contact_number: "",
    rtom_fax_number: "",
    // created_by: "",
  });

  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Pass formData to registerRTOM
      const response = await registerRTOM(formData);

      if (response.status === "success") {
        setMessage("RTOM registered successfully!");
      } else {
        setMessage(response.message || "Failed to register RTOM.");
      }
    } catch (error) {
      console.error("Error while registering RTOM:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className={GlobalStyle.fontPoppins}>
      <div className={`${GlobalStyle.headingLarge} mb-8`}>
        <span>Register new RTOM Area</span>
      </div>
      <div className="flex justify-center">
        <div className={`${GlobalStyle.cardContainer} p-4`}>
          <form onSubmit={handleSubmit}>
            <table className="mb-8 w-full">
              <tbody>
                <tr>
                  <td>
                    <label className={`${GlobalStyle.headingMedium}`}>RTOM Name</label>
                  </td>
                  <td>:</td>
                  <td>
                    <input
                      type="text"
                      name="area_name"
                      value={formData.area_name}
                      onChange={handleInputChange}
                      className={`${GlobalStyle.inputText}`}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className={`${GlobalStyle.headingMedium}`}>Abbreviation</label>
                  </td>
                  <td>:</td>
                  <td>
                    <input
                      type="text"
                      name="rtom_abbreviation"
                      value={formData.rtom_abbreviation}
                      onChange={handleInputChange}
                      className={`${GlobalStyle.inputText}`}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className={`${GlobalStyle.headingMedium}`}>Telephone Number</label>
                  </td>
                  <td>:</td>
                  <td>
                    <input
                      type="text"
                      name="rtom_contact_number"
                      value={formData.rtom_contact_number}
                      onChange={handleInputChange}
                      className={`${GlobalStyle.inputText}`}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className={`${GlobalStyle.headingMedium}`}>Fax No</label>
                  </td>
                  <td>:</td>
                  <td>
                    <input
                      type="text"
                      name="rtom_fax_number"
                      value={formData.rtom_fax_number}
                      onChange={handleInputChange}
                      className={`${GlobalStyle.inputText}`}
                      required
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="flex justify-end">
              <button type="submit" className={`${GlobalStyle.buttonPrimary}`}>
                Submit
              </button>
            </div>
          </form>

          {message && <div className="mt-4">{message}</div>}
        </div>
      </div>
    </div>
  );
};

export default RegRTom;
