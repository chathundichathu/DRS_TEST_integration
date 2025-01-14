// import { useState } from "react";
// import GlobalStyle from "../../assets/prototype/GlobalStyle";
// import { FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa";
// import add from "../../assets/images/add.svg";
// import remove from "../../assets/images/remove.svg";
// import google from "../../assets/images/google.png";
// import facebook from "../../assets/images/facebook.png";

// const RoEditDetails = () => {
//   const [showPopup, setShowPopup] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [newServiceType, setNewServiceType] = useState("");
//   const [contactnumber, setContactNumber] = useState("");
//   const [remark, setRemark] = useState("");
//   const [loginmethod, setLoginMethod] = useState("");
//   const [currentPage, setCurrentPage] = useState(0);
//   const [selectedMethod, setSelectedMethod] = useState("");
//   const [accountDetails, setAccountDetails] = useState("");
//   const [checkboxStatus, setCheckboxStatus] = useState(true);
//   const rowsPerPage = 7;

//   const dummyData = {
//     addeddate: "12/01/2024",
//     recoveryofficername: "RO Name",
//     nic: "200045608621",
//     contactnumber: "",
//     remark:"",
//     loginmethod: "",
//   };

//   const [services, setServices] = useState([
//     { id: 1, name: "AD", changeOn: "1/1/2025", enabled: true, isNew: false },
//     { id: 2, name: "GM", changeOn: "1/1/2025", enabled: true, isNew: false },
//     { id: 3, name: "KU", changeOn: "1/1/2025", enabled: false, isNew: false },
//   ]);

//   const logHistoryData = [
//     { editOn: "mm/dd/yyyy", action: "Sensus BPO Services (Pvt) Ltd", editBy: "Damithri" },
//     { editOn: "mm/dd/yyyy", action: "Central Management Services (PVT) Ltd", editBy: "Saniru" },
//   ];

//   const filteredLogHistory = logHistoryData.filter((row) =>
//     Object.values(row)
//       .join(" ")
//       .toLowerCase()
//       .includes(searchQuery.toLowerCase())
//   );

//   const pages = Math.ceil(filteredLogHistory.length / rowsPerPage);
//   const startIndex = currentPage * rowsPerPage;
//   const endIndex = startIndex + rowsPerPage;
//   const paginatedLogHistory = filteredLogHistory.slice(startIndex, endIndex);

//   const handlePrevPage = () => {
//     if (currentPage > 0) setCurrentPage(currentPage - 1);
//   };

//   const handleNextPage = () => {
//     if (currentPage < pages - 1) setCurrentPage(currentPage + 1);
//   };

//   const toggleService = (id) => {
//     setServices((prevServices) =>
//       prevServices.map((service) =>
//         service.id === id ? { ...service, enabled: !service.enabled } : service
//       )
//     );
//   };

//   const addService = () => {
//     if (newServiceType) {
//       const newService = {
//         id: services.length + 1,
//         name: newServiceType,
//         enabled: false,
//         isNew: true,
//       };
//       setServices([...services, newService]);
//       setNewServiceType("");
//     }
//   };

//   const removeService = (id) => {
//     setServices((prevServices) =>
//       prevServices.filter((service) => service.id !== id || !service.isNew)
//     );
//   };

//   const handleSaveClick = () => {
//     if (!contactnumber || !loginmethod) {
//       alert("Please fill in all required fields.");
//       return;
//     }
//     alert("Form submitted successfully!");
//     console.log("Data saved:", {
//       contactnumber,
//       loginmethod,
//     });
//   };

//   const handleMethodChange = (method) => {
//     setSelectedMethod(method);
//     setAccountDetails("");
//   };

//   const handleCheckboxChange = () => {
//     setCheckboxStatus(!checkboxStatus);
//   };

//   return (
//     <div className={GlobalStyle.fontPoppins}>
//       <div className={`${GlobalStyle.headingLarge} mb-4`}>
//         <span>RO Edit Details</span>
//       </div>

//       <div className="flex w-full justify-center">
//         <div className={`${GlobalStyle.cardContainer} p-4`}>
//           <div className="relative mb-10">
//             <div className="mb-2 text-end">
//               <span>{checkboxStatus ? "Enabled" : "Disabled"}</span>
//             </div>
//             <label className="absolute top-8 right-2 inline-flex items-center cursor-pointer">
//               <input
//                 type="checkbox"
//                 className="sr-only peer"
//                 onChange={handleCheckboxChange}
//               />
//               <div className="w-11 h-6 bg-green-600 rounded-full peer peer-focus:ring-4 peer-focus:ring-green-300 peer-checked:bg-red-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
//             </label>
//           </div>

//           <table className="mb-4 w-full">
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
//                     Recovery Officer Name
//                   </label>
//                 </td>
//                 <td> : </td>
//                 <td>
//                   <label>{dummyData.recoveryofficername}</label>
//                 </td>
//               </tr>
//               <tr>
//                 <td>
//                   <label className={`${GlobalStyle.headingMedium}`}>NIC</label>
//                 </td>
//                 <td> : </td>
//                 <td>
//                   <label>{dummyData.nic}</label>
//                 </td>
//               </tr>
//               <tr>
//                 <td>
//                   <label className={`${GlobalStyle.headingMedium}`}>
//                     Contact Number
//                   </label>
//                 </td>
//                 <td> : </td>
//                 <td>
//                   <input
//                     type="text"
//                     className={`${GlobalStyle.inputText}`}
//                     value={contactnumber}
//                     onChange={(e) => setContactNumber(e.target.value)}
//                   />
//                 </td>
//               </tr>
//               <tr>
//                 <td>
//                   <label className={`${GlobalStyle.headingMedium}`}>
//                     Remark
//                   </label>
//                 </td>
//                 <td> : </td>
//                 <td>
//                 <textarea
//                   value=""
//                   className={`${GlobalStyle.remark} w-64`}
//                   rows="2"
//                 ></textarea>
//                 </td>
//               </tr>
//               <tr>
//                 <td>
//                   <label className={`${GlobalStyle.headingMedium}`}>
//                     Login Method
//                   </label>
//                 </td>
//                 <td> : </td>
//                 <td className="flex gap-4 items-center">
//                   <label className="flex items-center gap-2">
//                     <input
//                       type="radio"
//                       name="loginMethod"
//                       value="Google"
//                       checked={selectedMethod === "Google"}
//                       onChange={() => handleMethodChange("Google")}
//                     />
//                     <img src={google} alt="Google" className="w-6 h-6" />
//                   </label>
//                   <label className="flex items-center gap-2">
//                     <input
//                       type="radio"
//                       name="loginMethod"
//                       value="Facebook"
//                       checked={selectedMethod === "Facebook"}
//                       onChange={() => handleMethodChange("Facebook")}
//                     />
//                     <img src={facebook} alt="Facebook" className="w-6 h-6" />
//                   </label>
//                 </td>
//               </tr>
//               {selectedMethod && (
//                 <tr>
//                   <td>
//                     <label className={`${GlobalStyle.headingMedium}`}>
//                       Account Details
//                     </label>
//                   </td>
//                   <td> : </td>
//                   <td>
//                     <input
//                       type="text"
//                       className={`${GlobalStyle.inputText}`}
//                       placeholder={`${selectedMethod}`}
//                       value={accountDetails}
//                       onChange={(e) => setAccountDetails(e.target.value)}
//                     />
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>

//           <div className="flex flex-col mb-5">
//             <span className={GlobalStyle.headingMedium}>RTOM Area:</span>
//             <div className={GlobalStyle.tableContainer}>
//               <table className={`${GlobalStyle.table} table-auto`}>
//                 <thead className={GlobalStyle.thead}>
//                   <tr>
//                     <th className={GlobalStyle.tableHeader}>RTOM Area</th>
//                     <th className={GlobalStyle.tableHeader}>Change On</th>
//                     <th className={GlobalStyle.tableHeader}></th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {services.map((service, index) => (
//                     <tr
//                       key={index}
//                       className={`${
//                         index % 2 === 0
//                           ? "bg-white bg-opacity-75"
//                           : "bg-gray-50 bg-opacity-50"
//                       } border-b`}
//                     >
//                       <td className={GlobalStyle.tableData}>{service.name}</td>
//                       <td className={GlobalStyle.tableData}>
//                         {service.changeOn}
//                       </td>
//                       <td
//                         className={`${GlobalStyle.tableData} flex justify-center gap-2`}
//                       >
//                         <label className="inline-flex relative items-center cursor-pointer">
//                           <input
//                             type="checkbox"
//                             className="sr-only peer"
//                             checked={service.enabled}
//                             onChange={() => toggleService(service.id)}
//                           />
//                           <div className="w-11 h-6 bg-gray-500 rounded-full peer peer-focus:ring-4 peer-focus:ring-green-300 peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
//                         </label>
//                         {service.isNew && (
//                           <button onClick={() => removeService(service.id)}>
//                             <img
//                               src={remove}
//                               title="Remove"
//                               className="w-6 h-6"
//                             />
//                           </button>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           <table className="mb-8 w-full">
//             <tbody>
//               <tr>
//                 <td>
//                   <label className={`${GlobalStyle.headingMedium}`}>
//                     RTOM Area
//                   </label>
//                 </td>
//                 <td> : </td>
//                 <td>
//                   <select
//                     className={`${GlobalStyle.selectBox}`}
//                     value={newServiceType}
//                     onChange={(e) => setNewServiceType(e.target.value)}
//                   >
//                     <option value="">RTOM</option>
//                     <option value="AD">AD</option>
//                     <option value="GM">GM</option>
//                     <option value="KU">KU</option>
//                   </select>
//                 </td>
//                 <td>
//                   <div className="flex justify-end">
//                     <button onClick={addService}>
//                       <img src={add} title="Add" className="w-6 h-6" />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             </tbody>
//           </table>

//           {/* Save Button */}
//           <div className="flex justify-end items-center">
//             <button
//               className={`${GlobalStyle.buttonPrimary} ml-auto`}
//               onClick={handleSaveClick}
//             >
//               Save
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-col">
//         {/* Log History Button */}
//         <div className="flex justify-start">
//           <button
//             className={`${GlobalStyle.buttonPrimary}`}
//             onClick={() => setShowPopup(true)}
//           >
//             Log History
//           </button>
//         </div>
//       </div>

//       {showPopup && (
//         <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-md shadow-lg w-3/4">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-bold">Log History</h2>
//               <button
//                 className="text-red-500 text-lg font-bold"
//                 onClick={() => setShowPopup(false)}
//               >
//                 ×
//               </button>
//             </div>
//             <div>
//               <div className="mb-4 flex justify-start">
//                 <div className={GlobalStyle.searchBarContainer}>
//                   <input
//                     type="text"
//                     placeholder=""
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className={GlobalStyle.inputSearch}
//                   />
//                   <FaSearch className={GlobalStyle.searchBarIcon} />
//                 </div>
//               </div>
//               <div className={GlobalStyle.tableContainer}>
//                 <table className={GlobalStyle.table}>
//                   <thead className={GlobalStyle.thead}>
//                     <tr>
//                       <th className={GlobalStyle.tableHeader}>Edit On</th>
//                       <th className={GlobalStyle.tableHeader}>Action</th>
//                       <th className={GlobalStyle.tableHeader}>Edit By</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {paginatedLogHistory.map((row, index) => (
//                       <tr
//                         key={index}
//                         className={`${
//                           index % 2 === 0
//                             ? "bg-white bg-opacity-75"
//                             : "bg-gray-50 bg-opacity-50"
//                         } border-b`}
//                       >
//                         <td className={GlobalStyle.tableData}>{row.editOn}</td>
//                         <td className={GlobalStyle.tableData}>{row.action}</td>
//                         <td className={GlobalStyle.tableData}>{row.editBy}</td>
//                       </tr>
//                     ))}
//                     {paginatedLogHistory.length === 0 && (
//                       <tr>
//                         <td colSpan="3" className="text-center py-4">
//                           No results found
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//               {filteredLogHistory.length > rowsPerPage && (
//                 <div className={GlobalStyle.navButtonContainer}>
//                   <button
//                     className={GlobalStyle.navButton}
//                     onClick={handlePrevPage}
//                     disabled={currentPage === 0}
//                   >
//                     <FaArrowLeft />
//                   </button>
//                   <span>
//                     Page {currentPage + 1} of {pages}
//                   </span>
//                   <button
//                     className={GlobalStyle.navButton}
//                     onClick={handleNextPage}
//                     disabled={currentPage === pages - 1}
//                   >
//                     <FaArrowRight />
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RoEditDetails;


//Test 13

// import { useState, useEffect } from "react";
// import axios from "axios";
// import GlobalStyle from "../../assets/prototype/GlobalStyle";
// import { FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa";
// import add from "../../assets/images/add.svg";
// import remove from "../../assets/images/remove.svg";
// import google from "../../assets/images/google.png";
// import facebook from "../../assets/images/facebook.png";
// import { useParams } from "react-router-dom";

// const RoEditDetails = () => {
//   const [showPopup, setShowPopup] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [contactnumber, setContactNumber] = useState("");
//   const [remark, setRemark] = useState("");
//   const [loginmethod, setLoginMethod] = useState("");
//   const [currentPage, setCurrentPage] = useState(0);
//   const [selectedMethod, setSelectedMethod] = useState("");
//   const [accountDetails, setAccountDetails] = useState("");
//   const [checkboxStatus, setCheckboxStatus] = useState(true);
//   const [services, setServices] = useState([]);
//   const [selectedRTOM, setSelectedRTOM] = useState("");
//   const [dummyData, setDummyData] = useState({
//     addeddate: "",
//     recoveryofficername: "",
//     nic: "",
//     contactnumber: "",
//     remark: "",
//     loginmethod: "",
//   });
//   const [logHistoryData, setLogHistoryData] = useState([]);
//   const [initialCheckboxStatus, setInitialCheckboxStatus] = useState(true);
//   const rowsPerPage = 7;
//   const { roId } = useParams(); // Extract roId from the URL
//   // var roidentity = 33;
//   const roidentity = parseInt(roId, 10); // Convert to integer if needed

//   const rtomAreas = [
//     { rtom_id: 21, rtom_name: "Maskeliya" },
//     { rtom_id: 22, rtom_name: "Kuliyapitiya" },
//     { rtom_id: 24, rtom_name: "Kurunegala" },
//     { rtom_id: 25, rtom_name: "Kekanadura" },
//   ];

//   const API_BASE_URL = "http://localhost:5000/api/recovery_officer";

//   useEffect(() => {
//     const fetchDetails = async () => {
//       try {
//         const response = await axios.post(`${API_BASE_URL}/RO_Details_By_ID`, {
//           ro_id: roidentity,
//         });
//         const data = response.data.data;

//         setDummyData({
//           addeddate: new Date(data.createdAt).toLocaleDateString(),
//           recoveryofficername: data.ro_name,
//           nic: data.ro_nic,
//           contactnumber: data.ro_contact_no,
//           remark: data.remark[0]?.remark || "",
//           loginmethod: data.login_type,
//         });
//         setContactNumber(data.ro_contact_no);
//         setLoginMethod(data.login_type);
//         setRemark("");
//         setAccountDetails(data.login_user_id);
//         setSelectedMethod(data.login_type);

//         const lastStatus = data.ro_status[data.ro_status.length - 1];
//         setInitialCheckboxStatus(lastStatus?.status === "Active");
//         setCheckboxStatus(lastStatus?.status === "Active");

//         setServices(
//           data.rtoms_for_ro.map((item) => {
//             const lastRTOMStatus =
//               item.status && item.status.length > 0
//                 ? item.status[item.status.length - 1]
//                 : null;
//             return {
//               id: item.rtom_id,
//               name: item.name,
//               changeOn: lastRTOMStatus ? new Date(lastRTOMStatus.rtoms_for_ro_status_date).toLocaleDateString() : "",
//               enabled: lastRTOMStatus ? lastRTOMStatus.status === "Active" : false,
//               initialEnabled: lastRTOMStatus ? lastRTOMStatus.status === "Active" : false,
//               isNew: false,
//             };
//           })
//         );

//         setLogHistoryData(
//           data.remark.map((r) => ({
//             editOn: new Date(r.remark_date).toLocaleDateString(),
//             action: r.remark,
//             editBy: r.remark_edit_by,
//           }))
//         );
//       } catch (error) {
//         console.error("Error fetching recovery officer details:", error);
//         alert("Failed to fetch data.");
//       }
//     };
//     fetchDetails();
//   }, [roidentity]);

//   const filteredLogHistory = logHistoryData.filter((row) =>
//     Object.values(row)
//       .join(" ")
//       .toLowerCase()
//       .includes(searchQuery.toLowerCase())
//   );

//   const pages = Math.ceil(filteredLogHistory.length / rowsPerPage);
//   const startIndex = currentPage * rowsPerPage;
//   const endIndex = startIndex + rowsPerPage;
//   const paginatedLogHistory = filteredLogHistory.slice(startIndex, endIndex);

//   const handlePrevPage = () => {
//     if (currentPage > 0) setCurrentPage(currentPage - 1);
//   };

//   const handleNextPage = () => {
//     if (currentPage < pages - 1) setCurrentPage(currentPage + 1);
//   };

//   const toggleService = (id) => {
//     setServices((prevServices) =>
//       prevServices.map((service) =>
//         service.id === id ? { ...service, enabled: !service.enabled } : service
//       )
//     );
//   };

//   const addService = () => {
//     const selectedRTOMArea = rtomAreas.find(
//       (area) => area.rtom_name === selectedRTOM
//     );

//     if (selectedRTOMArea) {
//       const newService = {
//         id: selectedRTOMArea.rtom_id,
//         name: selectedRTOMArea.rtom_name,
//         changeOn: new Date().toLocaleDateString(),
//         enabled: false,
//         isNew: true,
//       };
//       setServices([...services, newService]);
//       setSelectedRTOM("");
//     } else {
//       alert("Invalid RTOM area selected.");
//     }
//   };

//   const removeService = (id) => {
//     setServices((prevServices) =>
//       prevServices.filter((service) => service.id !== id || !service.isNew)
//     );
//   };

//   const handleSaveClick = async () => {
//     try {
//       const rtomsForRO = services
//         .filter(
//           (service) =>
//             service.isNew || service.enabled !== service.initialEnabled
//         )
//         .map((service) => ({
//           rtom_id: service.id,
//           status: service.enabled ? "Active" : "Inactive",
//         }));

//       const roStatus =
//         checkboxStatus !== initialCheckboxStatus
//           ? {
//               status: checkboxStatus ? "Active" : "Inactive",
//               ro_status_edit_by: "Admin",
//             }
//           : null;

//       const payload = {
//         ro_id: roidentity,
//         ro_contact_no: contactnumber,
//         remark,
//         remark_edit_by: "Admin",
//         login_type: loginmethod,
//         login_user_id: accountDetails,
//         ...(roStatus && { ro_status: roStatus }),
//         ...(rtomsForRO.length > 0 && { rtoms_for_ro: rtomsForRO }),
//       };

//       const response = await axios.patch(
//         `${API_BASE_URL}/Change_RO_profile`,
//         payload
//       );
//       alert(response.data.message || "Data updated successfully!");
//     } catch (error) {
//       console.error("Error updating recovery officer profile:", error);
//       alert("Failed to save changes.");
//     }
//   };

//   const handleMethodChange = (method) => {
//     setSelectedMethod(method);
//     setLoginMethod(method);
//     setAccountDetails("");
//   };

//   const handleCheckboxChange = () => {
//     setCheckboxStatus(!checkboxStatus);
//   };

//Test 14 Working Code

// import { useState, useEffect } from "react";
// import GlobalStyle from "../../assets/prototype/GlobalStyle";
// import add from "../../assets/images/add.svg";
// import remove from "../../assets/images/remove.svg";
// import google from "../../assets/images/google.png";
// import facebook from "../../assets/images/facebook.png";
// import { useParams } from "react-router-dom";
// import {
//   fetchRODataByID,
//   editRecoveryOfficer,
// } from "../../services/Ro/RO"; // Import the required functions

// const RoEditDetails = () => {
//   const [contactnumber, setContactNumber] = useState("");
//   const [remark, setRemark] = useState("");
//   const [loginmethod, setLoginMethod] = useState("");
//   const [selectedMethod, setSelectedMethod] = useState("");
//   const [accountDetails, setAccountDetails] = useState("");
//   const [checkboxStatus, setCheckboxStatus] = useState(true);
//   const [services, setServices] = useState([]);
//   const [selectedRTOM, setSelectedRTOM] = useState("");
//   const [dummyData, setDummyData] = useState({
//     addeddate: "",
//     recoveryofficername: "",
//     nic: "",
//     contactnumber: "",
//     remark: "",
//     loginmethod: "",
//   });
//   const [initialCheckboxStatus, setInitialCheckboxStatus] = useState(true);
//   const { roId } = useParams(); // Extract roId from the URL
//   const roidentity = parseInt(roId, 10); // Convert to integer if needed

//   const rtomAreas = [
//     { rtom_id: 2, rtom_name: "Matara" },
//     { rtom_id: 21, rtom_name: "Maskeliya" },
//     { rtom_id: 22, rtom_name: "Kuliyapitiya" },
//     { rtom_id: 24, rtom_name: "Kurunegala" },
//     { rtom_id: 25, rtom_name: "Kekanadura" },
//   ];

//   useEffect(() => {
//     const fetchDetails = async () => {
//       try {
//         const response = await fetchRODataByID(roidentity);
//         const data = response.data;

//         setDummyData({
//           addeddate: new Date(data.createdAt).toLocaleDateString(),
//           recoveryofficername: data.ro_name,
//           nic: data.ro_nic,
//           contactnumber: data.ro_contact_no,
//           remark: data.remark[0]?.remark || "",
//           loginmethod: data.login_type,
//         });
//         setContactNumber(data.ro_contact_no);
//         setLoginMethod(data.login_type);
//         setRemark("");
//         setAccountDetails(data.login_user_id);
//         setSelectedMethod(data.login_type);

//         const lastStatus = data.ro_status[data.ro_status.length - 1];
//         setInitialCheckboxStatus(lastStatus?.status === "Active");
//         setCheckboxStatus(lastStatus?.status === "Active");

//         setServices(
//           data.rtoms_for_ro.map((item) => {
//             const lastRTOMStatus =
//               item.status && item.status.length > 0
//                 ? item.status[item.status.length - 1]
//                 : null;
//             return {
//               id: item.rtom_id,
//               name: item.name,
//               changeOn: lastRTOMStatus ? new Date(lastRTOMStatus.rtoms_for_ro_status_date).toLocaleDateString() : "",
//               enabled: lastRTOMStatus ? lastRTOMStatus.status === "Active" : false,
//               initialEnabled: lastRTOMStatus ? lastRTOMStatus.status === "Active" : false,
//               isNew: false,
//             };
//           }) || []
//         );
//       } catch (error) {
//         console.error("Error fetching recovery officer details:", error);
//         alert("Failed to fetch data.");
//       }
//     };
//     fetchDetails();
//   }, [roidentity]);


//   const toggleService = (id) => {
//     setServices((prevServices) =>
//       prevServices.map((service) =>
//         service.id === id ? { ...service, enabled: !service.enabled } : service
//       )
//     );
//   };

//   const addService = () => {
//     const selectedRTOMArea = rtomAreas.find(
//       (area) => area.rtom_name === selectedRTOM
//     );
  
//     if (selectedRTOMArea) {
//       const alreadyExists = services.some(
//         (service) => service.id === selectedRTOMArea.rtom_id
//       );
  
//       if (alreadyExists) {
//         alert("This RTOM area is already in the table.");
//         return;
//       }
  
//       const newService = {
//         id: selectedRTOMArea.rtom_id,
//         name: selectedRTOMArea.rtom_name,
//         changeOn: new Date().toLocaleDateString(),
//         enabled: false,
//         isNew: true,
//       };
//       setServices([...services, newService]);
//       setSelectedRTOM("");
//     } else {
//       alert("Invalid RTOM area selected.");
//     }
//   };
  

//   const removeService = (id) => {
//     setServices((prevServices) =>
//       prevServices.filter((service) => service.id !== id || !service.isNew)
//     );
//   };

//   const handleSaveClick = async () => {
//     try {
//       const rtomsForRO = services
//         .filter(
//           (service) =>
//             service.isNew || service.enabled !== service.initialEnabled
//         )
//         .map((service) => ({
//           rtom_id: service.id,
//           status: service.enabled ? "Active" : "Inactive",
//         }));

//       const roStatus =
//         checkboxStatus !== initialCheckboxStatus
//           ? {
//               status: checkboxStatus ? "Active" : "Inactive",
//               ro_status_edit_by: "Admin",
//             }
//           : null;

//       const payload = {
//         ro_id: roidentity,
//         ro_contact_no: contactnumber,
//         remark,
//         remark_edit_by: "Admin",
//         login_type: loginmethod,
//         login_user_id: accountDetails,
//         ...(roStatus && { ro_status: roStatus }),
//         ...(rtomsForRO.length > 0 && { rtoms_for_ro: rtomsForRO }),
//       };

//       const response = await editRecoveryOfficer(payload);
//       alert(response.data.message || "Data updated successfully!");
//     } catch (error) {
//       console.error("Error updating recovery officer profile:", error);
//       alert("Failed to save changes.");
//     }
//   };

//   const handleMethodChange = (method) => {
//     setSelectedMethod(method);
//     setLoginMethod(method);
//     setAccountDetails("");
//   };

//   const handleCheckboxChange = () => {
//     setCheckboxStatus(!checkboxStatus);
//   };


//   return (
//     <div className={GlobalStyle.fontPoppins}>
//       <div className={`${GlobalStyle.headingLarge} mb-4`}>
//         <span>RO Edit Details</span>
//       </div>

//       <div className="flex w-full justify-center">
//         <div className={`${GlobalStyle.cardContainer} p-4`}>
//           <div className="relative mb-10">
//             <div className="mb-2 text-end">
//               <span>{checkboxStatus ? "Enabled" : "Disabled"}</span>
//             </div>
//             <label className="absolute top-8 right-2 inline-flex items-center cursor-pointer">
//               <input
//                 type="checkbox"
//                 className="sr-only peer"
//                 onChange={handleCheckboxChange}
//                 checked={checkboxStatus}
//               />
//               <div
//                 className={`w-11 h-6 rounded-full peer ${
//                   checkboxStatus
//                     ? "bg-green-600 peer-focus:ring-green-300"
//                     : "bg-red-600 peer-focus:ring-red-300"
//                 } peer-focus:ring-4`}
//               >
//                 <div
//                   className={`absolute top-0.5 left-0.5 bg-white border-gray-300 border rounded-full h-5 w-5 transition-all ${
//                     checkboxStatus
//                       ? "translate-x-full peer-checked:border-white"
//                       : ""
//                   }`}
//                 ></div>
//               </div>
//             </label>
//           </div>

//           <table className="mb-4 w-full">
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
//                     Recovery Officer Name
//                   </label>
//                 </td>
//                 <td> : </td>
//                 <td>
//                   <label>{dummyData.recoveryofficername}</label>
//                 </td>
//               </tr>
//               <tr>
//                 <td>
//                   <label className={`${GlobalStyle.headingMedium}`}>NIC</label>
//                 </td>
//                 <td> : </td>
//                 <td>
//                   <label>{dummyData.nic}</label>
//                 </td>
//               </tr>
//               <tr>
//                 <td>
//                   <label className={`${GlobalStyle.headingMedium}`}>
//                     Contact Number
//                   </label>
//                 </td>
//                 <td> : </td>
//                 <td>
//                   <input
//                     type="text"
//                     className={`${GlobalStyle.inputText}`}
//                     value={contactnumber}
//                     onChange={(e) => setContactNumber(e.target.value)}
//                   />
//                 </td>
//               </tr>
//               <tr>
//                 <td>
//                   <label className={`${GlobalStyle.headingMedium}`}>
//                     Remark
//                   </label>
//                 </td>
//                 <td> : </td>
//                 <td>
//                   <textarea
//                     value={remark}
//                     onChange={(e) => setRemark(e.target.value)}
//                     className={`${GlobalStyle.remark} w-64`}
//                     rows="2"
//                   ></textarea>
//                 </td>
//               </tr>
//               <tr>
//                 <td>
//                   <label className={`${GlobalStyle.headingMedium}`}>
//                     Login Method
//                   </label>
//                 </td>
//                 <td> : </td>
//                 <td className="flex gap-4 items-center">
//                   <label className="flex items-center gap-2">
//                     <input
//                       type="radio"
//                       name="loginMethod"
//                       value="Google"
//                       checked={selectedMethod === "Google"}
//                       onChange={() => handleMethodChange("Google")}
//                     />
//                     <img src={google} alt="Google" className="w-6 h-6" />
//                   </label>
//                   <label className="flex items-center gap-2">
//                     <input
//                       type="radio"
//                       name="loginMethod"
//                       value="Facebook"
//                       checked={selectedMethod === "Facebook"}
//                       onChange={() => handleMethodChange("Facebook")}
//                     />
//                     <img src={facebook} alt="Facebook" className="w-6 h-6" />
//                   </label>
//                 </td>
//               </tr>
//               {selectedMethod && (
//                 <tr>
//                   <td>
//                     <label className={`${GlobalStyle.headingMedium}`}>
//                       Account Details
//                     </label>
//                   </td>
//                   <td> : </td>
//                   <td>
//                     <input
//                       type="text"
//                       className={`${GlobalStyle.inputText}`}
//                       value={accountDetails}
//                       onChange={(e) => setAccountDetails(e.target.value)}
//                     />
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>

//           <div className="flex flex-col mb-5">
//             <span className={GlobalStyle.headingMedium}>RTOM Area:</span>
//             <div className={GlobalStyle.tableContainer}>
//               <table className={`${GlobalStyle.table} table-auto`}>
//                 <thead className={GlobalStyle.thead}>
//                   <tr>
//                     <th className={GlobalStyle.tableHeader}>RTOM Area</th>
//                     <th className={GlobalStyle.tableHeader}>Change On</th>
//                     <th className={GlobalStyle.tableHeader}>Status</th>
//                     <th className={GlobalStyle.tableHeader}></th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {services.map((service, index) => (
//                     <tr
//                       key={index}
//                       className={`${
//                         index % 2 === 0
//                           ? "bg-white bg-opacity-75"
//                           : "bg-gray-50 bg-opacity-50"
//                       } border-b`}
//                     >
//                       <td className={GlobalStyle.tableData}>{service.name}</td>
//                       <td className={GlobalStyle.tableData}>
//                         {service.changeOn}
//                       </td>
//                       <td className={GlobalStyle.tableData}>
//                         <label className="inline-flex relative items-center cursor-pointer">
//                           <input
//                             type="checkbox"
//                             className="sr-only peer"
//                             checked={service.enabled}
//                             onChange={() => toggleService(service.id)}
//                           />
//                           <div className="w-11 h-6 bg-gray-500 rounded-full peer peer-focus:ring-4 peer-focus:ring-green-300 peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
//                         </label>
//                       </td>
//                       <td className={GlobalStyle.tableData}>
//                         {service.isNew && (
//                           <button onClick={() => removeService(service.id)}>
//                             <img
//                               src={remove}
//                               title="Remove"
//                               className="w-6 h-6"
//                             />
//                           </button>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           <table className="mb-8 w-full">
//             <tbody>
//               <tr>
//                 <td>
//                   <label className={`${GlobalStyle.headingMedium}`}>
//                     Add RTOM Area
//                   </label>
//                 </td>
//                 <td> : </td>
//                 <td>
//                   <select
//                     className={`${GlobalStyle.selectBox}`}
//                     value={selectedRTOM}
//                     onChange={(e) => setSelectedRTOM(e.target.value)}
//                   >
//                     <option value="">Select RTOM Area</option>
//                     {rtomAreas.map((area) => (
//                       <option key={area.rtom_id} value={area.rtom_name}>
//                         {area.rtom_name}
//                       </option>
//                     ))}
//                   </select>
//                 </td>
//                 <td>
//                   <div className="flex justify-end">
//                     <button onClick={addService}>
//                       <img src={add} title="Add" className="w-6 h-6" />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             </tbody>
//           </table>

//           <div className="flex justify-end items-center">
//             <button
//               className={`${GlobalStyle.buttonPrimary} ml-auto`}
//               onClick={handleSaveClick}
//             >
//               Save
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RoEditDetails;



import { useState, useEffect } from "react";
import GlobalStyle from "../../assets/prototype/GlobalStyle";
import add from "../../assets/images/add.svg";
import remove from "../../assets/images/remove.svg";
import google from "../../assets/images/google.png";
import facebook from "../../assets/images/facebook.png";
import { useParams } from "react-router-dom";
import {
  fetchRODataByID,
  editRecoveryOfficer,
} from "../../services/Ro/RO"; // Import the required functions
import { getAllActiveRTOMs } from "../../services/rtom/RtomService"; // Import the required functions from RTOM

const RoEditDetails = () => {
  const [contactnumber, setContactNumber] = useState("");
  const [remark, setRemark] = useState("");
  const [loginmethod, setLoginMethod] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [accountDetails, setAccountDetails] = useState("");
  const [checkboxStatus, setCheckboxStatus] = useState(true);
  const [services, setServices] = useState([]);
  const [selectedRTOM, setSelectedRTOM] = useState("");
  const [rtomAreas, setRtomAreas] = useState([]);
  const [dummyData, setDummyData] = useState({
    addeddate: "",
    recoveryofficername: "",
    nic: "",
    contactnumber: "",
    remark: "",
    loginmethod: "",
  });
  const [initialCheckboxStatus, setInitialCheckboxStatus] = useState(true);
  const { roId } = useParams(); // Extract roId from the URL
  const roidentity = parseInt(roId, 10); // Convert to integer if needed

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetchRODataByID(roidentity);
        const data = response.data;

        setDummyData({
          addeddate: new Date(data.createdAt).toLocaleDateString(),
          recoveryofficername: data.ro_name,
          nic: data.ro_nic,
          contactnumber: data.ro_contact_no,
          remark: data.remark[0]?.remark || "",
          loginmethod: data.login_type,
        });
        setContactNumber(data.ro_contact_no);
        setLoginMethod(data.login_type);
        setRemark("");
        setAccountDetails(data.login_user_id);
        setSelectedMethod(data.login_type);

        const lastStatus = data.ro_status[data.ro_status.length - 1];
        setInitialCheckboxStatus(lastStatus?.status === "Active");
        setCheckboxStatus(lastStatus?.status === "Active");

        setServices(
          data.rtoms_for_ro.map((item) => {
            const lastRTOMStatus =
              item.status && item.status.length > 0
                ? item.status[item.status.length - 1]
                : null;
            return {
              id: item.rtom_id,
              name: item.name,
              changeOn: lastRTOMStatus ? new Date(lastRTOMStatus.rtoms_for_ro_status_date).toLocaleDateString() : "",
              enabled: lastRTOMStatus ? lastRTOMStatus.status === "Active" : false,
              initialEnabled: lastRTOMStatus ? lastRTOMStatus.status === "Active" : false,
              isNew: false,
            };
          }) || []
        );
        // Fetch Active RTOM Areas
        const rtomResponse = await getAllActiveRTOMs();
        setRtomAreas(
          rtomResponse.data.map((area) => ({
            rtom_id: area.rtom_id,
            rtom_name: area.area_name,
          }))
        );
      } catch (error) {
        console.error("Error fetching recovery officer details:", error);
        alert("Failed to fetch data.");
      }
    };
    fetchDetails();
  }, [roidentity]);

  const toggleService = (id) => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service.id === id ? { ...service, enabled: !service.enabled } : service
      )
    );
  };

  const addService = () => {
    const selectedRTOMArea = rtomAreas.find(
      (area) => area.rtom_name === selectedRTOM
    );
  
    if (selectedRTOMArea) {
      const alreadyExists = services.some(
        (service) => service.id === selectedRTOMArea.rtom_id
      );
  
      if (alreadyExists) {
        alert("This RTOM area is already in the table.");
        return;
      }
  
      const newService = {
        id: selectedRTOMArea.rtom_id,
        name: selectedRTOMArea.rtom_name,
        changeOn: new Date().toLocaleDateString(),
        enabled: false,
        isNew: true,
      };
      setServices([...services, newService]);
      setSelectedRTOM("");
    } else {
      alert("Invalid RTOM area selected.");
    }
  };
  

  const removeService = (id) => {
    setServices((prevServices) =>
      prevServices.filter((service) => service.id !== id || !service.isNew)
    );
  };

  const handleSaveClick = async () => {
    try {
      const rtomsForRO = services
        .filter(
          (service) =>
            service.isNew || service.enabled !== service.initialEnabled
        )
        .map((service) => ({
          rtom_id: service.id,
          status: service.enabled ? "Active" : "Inactive",
        }));

      const roStatus =
        checkboxStatus !== initialCheckboxStatus
          ? {
              status: checkboxStatus ? "Active" : "Inactive",
              ro_status_edit_by: "Admin",
            }
          : null;

      const payload = {
        ro_id: roidentity,
        ro_contact_no: contactnumber,
        remark,
        remark_edit_by: "Admin",
        login_type: loginmethod,
        login_user_id: accountDetails,
        ...(roStatus && { ro_status: roStatus }),
        ...(rtomsForRO.length > 0 && { rtoms_for_ro: rtomsForRO }),
      };

      const response = await editRecoveryOfficer(payload);
      alert(response.data.message || "Data updated successfully!");
    } catch (error) {
      console.error("Error updating recovery officer profile:", error);
      alert("Failed to save changes.");
    }
  };

  const handleMethodChange = (method) => {
    setSelectedMethod(method);
    setLoginMethod(method);
    setAccountDetails("");
  };

  const handleCheckboxChange = () => {
    setCheckboxStatus(!checkboxStatus);
  };


  return (
    <div className={GlobalStyle.fontPoppins}>
      <div className={`${GlobalStyle.headingLarge} mb-4`}>
        <span>RO Edit Details</span>
      </div>

      <div className="flex w-full justify-center">
        <div className={`${GlobalStyle.cardContainer} p-4`}>
          <div className="relative mb-10">
            <div className="mb-2 text-end">
              <span>{checkboxStatus ? "Enabled" : "Disabled"}</span>
            </div>
            <label className="absolute top-8 right-2 inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                onChange={handleCheckboxChange}
                checked={checkboxStatus}
              />
              <div
                className={`w-11 h-6 rounded-full peer ${
                  checkboxStatus
                    ? "bg-green-600 peer-focus:ring-green-300"
                    : "bg-red-600 peer-focus:ring-red-300"
                } peer-focus:ring-4`}
              >
                <div
                  className={`absolute top-0.5 left-0.5 bg-white border-gray-300 border rounded-full h-5 w-5 transition-all ${
                    checkboxStatus
                      ? "translate-x-full peer-checked:border-white"
                      : ""
                  }`}
                ></div>
              </div>
            </label>
          </div>

          <table className="mb-4 w-full">
            <tbody>
              <tr>
                <td>
                  <label className={`${GlobalStyle.headingMedium}`}>
                    Added Date
                  </label>
                </td>
                <td> : </td>
                <td>
                  <label>{dummyData.addeddate}</label>
                </td>
              </tr>
              <tr>
                <td>
                  <label className={`${GlobalStyle.headingMedium}`}>
                    Recovery Officer Name
                  </label>
                </td>
                <td> : </td>
                <td>
                  <label>{dummyData.recoveryofficername}</label>
                </td>
              </tr>
              <tr>
                <td>
                  <label className={`${GlobalStyle.headingMedium}`}>NIC</label>
                </td>
                <td> : </td>
                <td>
                  <label>{dummyData.nic}</label>
                </td>
              </tr>
              <tr>
                <td>
                  <label className={`${GlobalStyle.headingMedium}`}>
                    Contact Number
                  </label>
                </td>
                <td> : </td>
                <td>
                  <input
                    type="text"
                    className={`${GlobalStyle.inputText}`}
                    value={contactnumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label className={`${GlobalStyle.headingMedium}`}>
                    Remark
                  </label>
                </td>
                <td> : </td>
                <td>
                  <textarea
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                    className={`${GlobalStyle.remark} w-64`}
                    rows="2"
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>
                  <label className={`${GlobalStyle.headingMedium}`}>
                    Login Method
                  </label>
                </td>
                <td> : </td>
                <td className="flex gap-4 items-center">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="loginMethod"
                      value="Google"
                      checked={selectedMethod === "Google"}
                      onChange={() => handleMethodChange("Google")}
                    />
                    <img src={google} alt="Google" className="w-6 h-6" />
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="loginMethod"
                      value="Facebook"
                      checked={selectedMethod === "Facebook"}
                      onChange={() => handleMethodChange("Facebook")}
                    />
                    <img src={facebook} alt="Facebook" className="w-6 h-6" />
                  </label>
                </td>
              </tr>
              {selectedMethod && (
                <tr>
                  <td>
                    <label className={`${GlobalStyle.headingMedium}`}>
                      Account Details
                    </label>
                  </td>
                  <td> : </td>
                  <td>
                    <input
                      type="text"
                      className={`${GlobalStyle.inputText}`}
                      value={accountDetails}
                      onChange={(e) => setAccountDetails(e.target.value)}
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="flex flex-col mb-5">
            <span className={GlobalStyle.headingMedium}>RTOM Area:</span>
            <div className={GlobalStyle.tableContainer}>
              <table className={`${GlobalStyle.table} table-auto`}>
                <thead className={GlobalStyle.thead}>
                  <tr>
                    <th className={GlobalStyle.tableHeader}>RTOM Area</th>
                    <th className={GlobalStyle.tableHeader}>Change On</th>
                    <th className={GlobalStyle.tableHeader}>Status</th>
                    <th className={GlobalStyle.tableHeader}></th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0
                          ? "bg-white bg-opacity-75"
                          : "bg-gray-50 bg-opacity-50"
                      } border-b`}
                    >
                      <td className={GlobalStyle.tableData}>{service.name}</td>
                      <td className={GlobalStyle.tableData}>
                        {service.changeOn}
                      </td>
                      <td className={GlobalStyle.tableData}>
                        <label className="inline-flex relative items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={service.enabled}
                            onChange={() => toggleService(service.id)}
                          />
                          <div className="w-11 h-6 bg-gray-500 rounded-full peer peer-focus:ring-4 peer-focus:ring-green-300 peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                        </label>
                      </td>
                      <td className={GlobalStyle.tableData}>
                        {service.isNew && (
                          <button onClick={() => removeService(service.id)}>
                            <img
                              src={remove}
                              title="Remove"
                              className="w-6 h-6"
                            />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <table className="mb-8 w-full">
            <tbody>
              <tr>
                <td>
                  <label className={`${GlobalStyle.headingMedium}`}>
                    Add RTOM Area
                  </label>
                </td>
                <td> : </td>
                <td>
                  <select
                    className={`${GlobalStyle.selectBox}`}
                    value={selectedRTOM}
                    onChange={(e) => setSelectedRTOM(e.target.value)}
                  >
                    <option value="">Select RTOM Area</option>
                    {rtomAreas.map((area) => (
                      <option key={area.rtom_id} value={area.rtom_name}>
                        {area.rtom_name}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <div className="flex justify-end">
                    <button onClick={addService}>
                      <img src={add} title="Add" className="w-6 h-6" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="flex justify-end items-center">
            <button
              className={`${GlobalStyle.buttonPrimary} ml-auto`}
              onClick={handleSaveClick}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoEditDetails;
